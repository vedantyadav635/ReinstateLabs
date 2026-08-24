import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import {
  appointmentRequired,
  contactRequired,
  emptyInquiry,
  maxLengths,
  validateInquiry,
  type InquiryFields,
} from "@/lib/inquiry";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendInquiryNotification } from "@/lib/resend";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const GENERIC_ERROR = `Something went wrong. Please try again or email us directly at ${site.email}.`;

const fieldCaps: Partial<Record<keyof InquiryFields, number>> = {
  name: maxLengths.name,
  company: maxLengths.company,
  email: maxLengths.email,
  phone: maxLengths.phone,
  service: 60,
  projectType: 60,
  budget: 40,
  message: maxLengths.message,
  website: 200,
};

/**
 * Receives an inquiry from either form, re-runs the same validation the
 * client did (so a malformed request cannot get through with JS disabled),
 * rejects bot traffic, stores the lead in Supabase, and emails a
 * notification. The database write is the source of truth — an email
 * failure is logged but never rolls back or hides a stored lead.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Request body must be JSON." },
      { status: 400 },
    );
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json(
      { ok: false, message: "Request body must be an object." },
      { status: 400 },
    );
  }

  const body = payload as Partial<InquiryFields> & { form?: string };
  const values: InquiryFields = { ...emptyInquiry };

  for (const key of Object.keys(emptyInquiry) as (keyof InquiryFields)[]) {
    const raw = body[key];
    const cap = fieldCaps[key] ?? maxLengths.message;
    values[key] = typeof raw === "string" ? raw.slice(0, cap) : "";
  }

  // Honeypot: real visitors never see or fill this field. A filled value
  // means a bot — pretend success so it never learns to adapt, but do not
  // store the record or send a notification.
  if (values.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const variant: "appointment" | "contact" = body.form === "contact" ? "contact" : "appointment";
  const required = variant === "contact" ? contactRequired : appointmentRequired;
  const errors = validateInquiry(values, required);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Fields the current form does not collect are stored as NULL, never as
  // fabricated defaults — the contact form never sets service/project
  // type/budget, so they stay blank here regardless of variant.
  const record = {
    form_type: variant,
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim() || null,
    phone: values.phone.trim() || null,
    service: values.service.trim() || null,
    project_type: values.projectType.trim() || null,
    budget_range: values.budget.trim() || null,
    message: values.message.trim(),
    status: "new",
  };

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("inquiries").insert(record);
    if (error) {
      console.error("[inquiries] Supabase insert failed", error);
      return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 500 });
    }
  } catch (error) {
    console.error("[inquiries] Supabase insert threw", error);
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 500 });
  }

  try {
    await sendInquiryNotification(variant, values);
  } catch (error) {
    // The lead is already stored — do not fail the request over a mail
    // provider hiccup, just log it so it can be followed up on manually.
    console.error("[inquiries] Resend notification failed", error);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

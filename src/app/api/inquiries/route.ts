import { NextResponse } from "next/server";
import {
  appointmentRequired,
  contactRequired,
  emptyInquiry,
  validateInquiry,
  type InquiryFields,
} from "@/lib/inquiry";

/**
 * Receives an inquiry from either form and re-runs the same validation the
 * client did, so a malformed request cannot get through by disabling
 * JavaScript. Delivery (email, CRM) is deliberately not wired here — the
 * endpoint is the seam that a mail provider plugs into.
 */
export async function POST(request: Request) {
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
    values[key] = typeof raw === "string" ? raw.slice(0, 4000) : "";
  }

  const required = body.form === "contact" ? contactRequired : appointmentRequired;
  const errors = validateInquiry(values, required);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  console.info("[inquiry]", {
    form: body.form === "contact" ? "contact" : "appointment",
    name: values.name,
    company: values.company,
    email: values.email,
    service: values.service,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

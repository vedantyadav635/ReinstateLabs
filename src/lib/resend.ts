import { Resend } from "resend";
import { site } from "@/lib/site";
import type { InquiryFields } from "@/lib/inquiry";

/** Lazily constructed so a missing key only fails the request that sends mail. */
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(apiKey);
}

function formatSubmittedAt(): string {
  return new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

function appointmentEmailBody(values: InquiryFields): string {
  return `NEW APPOINTMENT REQUEST

Name: ${values.name.trim()}
Email: ${values.email.trim()}
Company: ${values.company.trim() || "—"}
Phone: ${values.phone.trim() || "—"}

Service: ${values.service}
Project Type: ${values.projectType}
Budget Range: ${values.budget}

Message:
${values.message.trim()}

Submitted: ${formatSubmittedAt()}

This is an appointment REQUEST, not a confirmed appointment. Reply to the visitor to schedule a time.`;
}

function contactEmailBody(values: InquiryFields): string {
  return `NEW CONTACT MESSAGE

Name: ${values.name.trim()}
Email: ${values.email.trim()}
Company: ${values.company.trim() || "—"}
Phone: ${values.phone.trim() || "—"}

Message:
${values.message.trim()}

Submitted: ${formatSubmittedAt()}`;
}

/**
 * Sends the internal notification for a stored inquiry. Called after the
 * Supabase insert succeeds — the lead is already saved, so a failure here is
 * logged and swallowed rather than surfaced as a failed submission.
 */
export async function sendInquiryNotification(
  variant: "appointment" | "contact",
  values: InquiryFields,
): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL || site.email;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  const resend = getResend();
  const isAppointment = variant === "appointment";

  await resend.emails.send({
    from,
    to,
    replyTo: values.email.trim(),
    subject: isAppointment
      ? `Appointment Request — ${values.name.trim()}`
      : `Contact Form Submission — ${values.name.trim()}`,
    text: isAppointment ? appointmentEmailBody(values) : contactEmailBody(values),
  });
}

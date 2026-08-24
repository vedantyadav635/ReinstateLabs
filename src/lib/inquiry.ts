/**
 * Inquiry shape + validation shared by the appointment form, the contact form
 * and the API route, so client and server never disagree about what is valid.
 */

export const serviceOptions = [
  "Software Engineering",
  "Web Applications",
  "AI & Machine Learning",
  "Data & Analytics",
  "Cloud & Infrastructure",
  "Automation",
  "Marketing",
] as const;

export const projectTypeOptions = [
  "New product",
  "Existing product",
  "Modernisation / migration",
  "Proof of concept",
  "Ongoing engineering support",
] as const;

export const budgetOptions = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $60k",
  "$60k – $150k",
  "$150k+",
  "Not decided yet",
] as const;

export interface InquiryFields {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  projectType: string;
  budget: string;
  message: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryFields, string>>;

export const emptyInquiry: InquiryFields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  projectType: "",
  budget: "",
  message: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE = /^[+()\-\s\d]{7,20}$/;

/**
 * `required` lists the fields a given form enforces — the contact form asks for
 * less than the appointment form, but both run through the same rules.
 */
export function validateInquiry(
  values: InquiryFields,
  required: readonly (keyof InquiryFields)[],
): InquiryErrors {
  const errors: InquiryErrors = {};
  const need = new Set(required);

  const name = values.name.trim();
  if (need.has("name")) {
    if (!name) errors.name = "Please tell us your name.";
    else if (name.length < 2) errors.name = "That name looks too short.";
  }

  if (need.has("company") && !values.company.trim()) {
    errors.company = "Please add your company or organisation.";
  }

  const email = values.email.trim();
  if (need.has("email")) {
    if (!email) errors.email = "We need an email address to reply to.";
    else if (!EMAIL.test(email)) errors.email = "That email address is not valid.";
  }

  const phone = values.phone.trim();
  if (phone && !PHONE.test(phone)) {
    errors.phone = "Use digits, spaces, and + ( ) - only.";
  } else if (need.has("phone") && !phone) {
    errors.phone = "Please add a number we can reach you on.";
  }

  if (need.has("service") && !serviceOptions.includes(values.service as never)) {
    errors.service = "Choose the closest service area.";
  }

  if (
    need.has("projectType") &&
    !projectTypeOptions.includes(values.projectType as never)
  ) {
    errors.projectType = "Choose a project type.";
  }

  if (need.has("budget") && !budgetOptions.includes(values.budget as never)) {
    errors.budget = "Choose an indicative range.";
  }

  const message = values.message.trim();
  if (need.has("message")) {
    if (!message) errors.message = "A couple of sentences is enough to start.";
    else if (message.length < 20)
      errors.message = `A little more detail helps — ${20 - message.length} characters to go.`;
    else if (message.length > 4000) errors.message = "Please keep this under 4000 characters.";
  }

  return errors;
}

export const appointmentRequired = [
  "name",
  "company",
  "email",
  "service",
  "projectType",
  "budget",
  "message",
] as const satisfies readonly (keyof InquiryFields)[];

export const contactRequired = [
  "name",
  "email",
  "message",
] as const satisfies readonly (keyof InquiryFields)[];

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
  /** Honeypot. Real visitors never see or fill this — a non-empty value means a bot. */
  website: string;
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
  website: "",
};

/** Server- and client-shared field length caps. */
export const maxLengths = {
  name: 100,
  company: 150,
  email: 254,
  phone: 30,
  message: 4000,
} as const;

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
  if (!errors.name && name.length > maxLengths.name) {
    errors.name = `Please keep this under ${maxLengths.name} characters.`;
  }

  const company = values.company.trim();
  if (need.has("company") && !company) {
    errors.company = "Please add your company or organisation.";
  } else if (company.length > maxLengths.company) {
    errors.company = `Please keep this under ${maxLengths.company} characters.`;
  }

  const email = values.email.trim();
  if (need.has("email")) {
    if (!email) errors.email = "We need an email address to reply to.";
    else if (!EMAIL.test(email)) errors.email = "That email address is not valid.";
  }
  if (!errors.email && email.length > maxLengths.email) {
    errors.email = `Please keep this under ${maxLengths.email} characters.`;
  }

  const phone = values.phone.trim();
  if (phone && !PHONE.test(phone)) {
    errors.phone = "Use digits, spaces, and + ( ) - only.";
  } else if (need.has("phone") && !phone) {
    errors.phone = "Please add a number we can reach you on.";
  }
  if (!errors.phone && phone.length > maxLengths.phone) {
    errors.phone = `Please keep this under ${maxLengths.phone} characters.`;
  }

  if (need.has("service")) {
    if (!serviceOptions.includes(values.service as never)) {
      errors.service = "Choose the closest service area.";
    }
  } else if (values.service && !serviceOptions.includes(values.service as never)) {
    errors.service = "Choose a valid service area.";
  }

  if (need.has("projectType")) {
    if (!projectTypeOptions.includes(values.projectType as never)) {
      errors.projectType = "Choose a project type.";
    }
  } else if (values.projectType && !projectTypeOptions.includes(values.projectType as never)) {
    errors.projectType = "Choose a valid project type.";
  }

  if (need.has("budget")) {
    if (!budgetOptions.includes(values.budget as never)) {
      errors.budget = "Choose an indicative range.";
    }
  } else if (values.budget && !budgetOptions.includes(values.budget as never)) {
    errors.budget = "Choose a valid budget range.";
  }

  const message = values.message.trim();
  if (need.has("message")) {
    if (!message) errors.message = "A couple of sentences is enough to start.";
    else if (message.length < 20)
      errors.message = `A little more detail helps — ${20 - message.length} characters to go.`;
  }
  if (!errors.message && message.length > maxLengths.message) {
    errors.message = `Please keep this under ${maxLengths.message} characters.`;
  }

  return errors;
}

export const appointmentRequired = [
  "name",
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

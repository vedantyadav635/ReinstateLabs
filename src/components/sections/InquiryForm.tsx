"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import {
  appointmentRequired,
  budgetOptions,
  contactRequired,
  emptyInquiry,
  projectTypeOptions,
  serviceOptions,
  validateInquiry,
  type InquiryErrors,
  type InquiryFields,
} from "@/lib/inquiry";
import { easing } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ChoiceField, TextAreaField, TextField } from "@/components/ui/Field";

type Status = "idle" | "submitting" | "success" | "error";
type Variant = "appointment" | "contact";

const fieldOrder: (keyof InquiryFields)[] = [
  "name",
  "company",
  "email",
  "phone",
  "service",
  "projectType",
  "budget",
  "message",
];

export function InquiryForm({ variant }: { variant: Variant }) {
  const isAppointment = variant === "appointment";
  const required = isAppointment ? appointmentRequired : contactRequired;

  const [values, setValues] = useState<InquiryFields>(emptyInquiry);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof InquiryFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isRequired = (field: keyof InquiryFields) =>
    (required as readonly (keyof InquiryFields)[]).includes(field);

  const setField = (field: keyof InquiryFields) => (value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      // Clear an error as soon as the field becomes valid again.
      if (errors[field]) {
        const revalidated = validateInquiry(next, required);
        setErrors((current) => ({ ...current, [field]: revalidated[field] }));
      }
      return next;
    });
  };

  const handleBlur = (field: keyof InquiryFields) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const result = validateInquiry(values, required);
    setErrors((current) => ({ ...current, [field]: result[field] }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = validateInquiry(values, required);
    setErrors(result);
    setTouched(
      fieldOrder.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
    );

    const firstInvalid = fieldOrder.find((field) => result[field]);
    if (firstInvalid) {
      const node = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstInvalid}"]`,
      );
      node?.focus();
      node?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    setServerMessage(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, form: variant }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const data = (await response.json().catch(() => null)) as
        | { errors?: InquiryErrors; message?: string }
        | null;

      if (data?.errors) {
        setErrors(data.errors);
        setStatus("idle");
        setServerMessage("Some details still need attention.");
        return;
      }

      setStatus("error");
      setServerMessage(
        data?.message ?? "We could not send that. Please try again in a moment.",
      );
    } catch {
      setStatus("error");
      setServerMessage(
        "The request did not reach us. Check your connection and try again.",
      );
    }
  };

  const reset = () => {
    setValues(emptyInquiry);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setServerMessage(null);
  };

  const errorFor = (field: keyof InquiryFields) =>
    touched[field] ? errors[field] : undefined;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easing.outExpo }}
        role="status"
        className="relative border border-line-strong p-8 md:p-12"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ember" />
        <span className="flex size-11 items-center justify-center rounded-full border border-ember text-ember">
          <Check strokeWidth={1.75} className="size-5" />
        </span>
        <h3 className="display-sm mt-8 uppercase">Request received</h3>
        <p className="lede mt-5 max-w-[44ch]">
          Thank you, {values.name.trim().split(" ")[0] || "there"}. Your enquiry
          is with us. We read every one ourselves and reply from a real address —
          expect a response to {values.email.trim()}.
        </p>
        <dl className="mt-10 grid gap-px border-t border-line bg-line sm:grid-cols-2">
          {[
            { label: "Name", value: values.name },
            { label: "Company", value: values.company || "—" },
            { label: "Service", value: values.service || "General enquiry" },
            { label: "Budget", value: values.budget || "Not specified" },
          ].map((row) => (
            <div key={row.label} className="bg-ink px-5 py-4">
              <dt className="label text-mute-deep">{row.label}</dt>
              <dd className="mt-2 text-[0.9375rem] text-paper-dim">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <MagneticButton variant="outline" onClick={reset} arrow={false}>
            Send another enquiry
          </MagneticButton>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-12">
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          value={values.name}
          error={errorFor("name")}
          required={isRequired("name")}
          autoComplete="name"
          placeholder="Your full name"
          onChange={setField("name")}
          onBlur={handleBlur("name")}
        />
        <TextField
          label="Company"
          name="company"
          value={values.company}
          error={errorFor("company")}
          required={isRequired("company")}
          autoComplete="organization"
          placeholder="Where you work"
          onChange={setField("company")}
          onBlur={handleBlur("company")}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          error={errorFor("email")}
          required={isRequired("email")}
          autoComplete="email"
          placeholder="you@company.com"
          onChange={setField("email")}
          onBlur={handleBlur("email")}
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={values.phone}
          error={errorFor("phone")}
          required={isRequired("phone")}
          autoComplete="tel"
          placeholder="+91 00000 00000"
          onChange={setField("phone")}
          onBlur={handleBlur("phone")}
        />
      </div>

      {isAppointment ? (
        <div className="space-y-10 border-t border-line pt-12">
          <ChoiceField
            label="Service"
            name="service"
            value={values.service}
            options={serviceOptions}
            error={errorFor("service")}
            required
            onChange={(value) => {
              setField("service")(value);
              setTouched((prev) => ({ ...prev, service: true }));
            }}
          />
          <ChoiceField
            label="Project type"
            name="projectType"
            value={values.projectType}
            options={projectTypeOptions}
            error={errorFor("projectType")}
            required
            onChange={(value) => {
              setField("projectType")(value);
              setTouched((prev) => ({ ...prev, projectType: true }));
            }}
          />
          <ChoiceField
            label="Budget range"
            name="budget"
            value={values.budget}
            options={budgetOptions}
            error={errorFor("budget")}
            required
            hint="An indication is enough. It tells us what shape of solution is realistic."
            onChange={(value) => {
              setField("budget")(value);
              setTouched((prev) => ({ ...prev, budget: true }));
            }}
          />
        </div>
      ) : null}

      <div className="border-t border-line pt-12">
        <TextAreaField
          label="Message"
          name="message"
          value={values.message}
          error={errorFor("message")}
          required={isRequired("message")}
          rows={6}
          maxLength={4000}
          placeholder={
            isAppointment
              ? "What are you building, what exists today, and what does success look like?"
              : "Tell us what you have in mind."
          }
          onChange={setField("message")}
          onBlur={handleBlur("message")}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        <p className="max-w-[36ch] text-[0.8125rem] leading-relaxed text-mute-deep">
          We use your details only to reply to this enquiry. Nothing is shared
          with anyone else.
        </p>

        <div className="flex items-center gap-5">
          <AnimatePresence>
            {serverMessage ? (
              <motion.p
                role="alert"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[0.8125rem] text-ember-soft"
              >
                <AlertCircle aria-hidden strokeWidth={1.7} className="size-4 shrink-0" />
                {serverMessage}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <MagneticButton
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            arrow={status !== "submitting"}
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Sending
              </span>
            ) : isAppointment ? (
              "Request appointment"
            ) : (
              "Send message"
            )}
          </MagneticButton>
        </div>
      </div>
    </form>
  );
}

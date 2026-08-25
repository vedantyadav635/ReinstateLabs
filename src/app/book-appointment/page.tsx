import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/lib/site";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book a call with ReinstateLabs. Tell us what you are building and we will come back with an honest read on scope, sequence and risk.",
  alternates: { canonical: "/book-appointment" },
  openGraph: {
    title: "Book an Appointment — ReinstateLabs",
    description:
      "Tell us what you are building. We will come back with an honest read on scope, sequence and risk.",
    url: "/book-appointment",
  },
};

const expectations = [
  {
    title: "You send the brief",
    body: "The form below. Rough is fine — we would rather have the real constraints than a polished summary.",
  },
  {
    title: "We read it properly",
    body: "A person reads every enquiry and replies with times. No auto-responder, no sales sequence.",
  },
  {
    title: "A 45-minute call",
    body: "We ask about the problem, the systems around it and the deadline. You leave with a view on approach whether or not we work together.",
  },
  {
    title: "A written response",
    body: "If it looks like a fit, you get scope, sequence, risks and an indicative range in writing.",
  },
];

export default function BookAppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Book an appointment"
        lines={["Start with", "a conversation"]}
        lede="No pitch deck, no discovery fee. Send us the problem and we will tell you what we would do about it — including when the honest answer is that you do not need us."
        meta={[
          { label: "Format", value: "45 min · Remote" },
          { label: "Cost", value: "None" },
          { label: "Zones", value: "IST · CET · EST" },
        ]}
      />

      <Section space="base" labelledBy="booking-heading">
        <SectionHeading index={1} eyebrow="Enquiry">
          Required fields are marked. Everything else helps us prepare.
        </SectionHeading>

        <div className="content-gap mt-14 grid lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+3.5rem)]">
              <h2 id="booking-heading" className="display-sm uppercase">
                What happens next
              </h2>

              <ol className="mt-10">
                {expectations.map((step, i) => (
                  <ScrollReveal
                    key={step.title}
                    as="li"
                    delay={i * 0.07}
                    distance={18}
                    className="border-t border-line py-5"
                  >
                    <div className="flex gap-4">
                      <span className="label pt-1 text-ember">{pad(i + 1)}</span>
                      <div>
                        <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-paper">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[0.875rem] leading-relaxed text-mute">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </ol>

              <div className="mt-10 border-t border-line pt-6">
                <p className="label text-mute-deep">Prefer email</p>
                <p className="mt-3 text-[0.9375rem]">
                  <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
                </p>
                <p className="mt-2 text-[0.9375rem]">
                  <TextLink href={`tel:${site.phoneHref}`}>{site.phone}</TextLink>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <InquiryForm variant="appointment" />
          </div>
        </div>
      </Section>
    </>
  );
}

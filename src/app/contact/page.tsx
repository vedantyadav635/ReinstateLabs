import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextLink } from "@/components/ui/TextLink";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ReinstateLabs — email, phone, or a short message. We reply personally.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — ReinstateLabs",
    description: "Email, phone, or a short message. We reply personally.",
    url: "/contact",
  },
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
    note: "The fastest route to a real answer.",
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    icon: Phone,
    note: "Weekdays, 10:00–19:00 IST.",
  },
  {
    label: "Location",
    value: site.location,
    href: null,
    icon: MapPin,
    note: site.locationDetail,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section space="base" labelledBy="contact-heading">
        <SectionHeading index={1} eyebrow="Direct" />

        <h1 className="sr-only">Contact ReinstateLabs</h1>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 id="contact-heading" className="display-sm uppercase">
              Reach us
            </h2>

            <ul className="mt-10">
              {channels.map((channel, i) => (
                <ScrollReveal
                  key={channel.label}
                  as="li"
                  delay={i * 0.08}
                  distance={18}
                  className="group border-t border-line py-6"
                >
                  <div className="flex items-start gap-4">
                    <channel.icon
                      aria-hidden
                      strokeWidth={1.5}
                      className="mt-1 size-4 shrink-0 text-mute-deep transition-colors duration-500 group-hover:text-ember"
                    />
                    <div>
                      <p className="label text-mute-deep">{channel.label}</p>
                      <p className="mt-2 text-[1.0625rem] tracking-[-0.015em]">
                        {channel.href ? (
                          <TextLink href={channel.href}>{channel.value}</TextLink>
                        ) : (
                          <span className="text-paper-dim">{channel.value}</span>
                        )}
                      </p>
                      <p className="mt-2 text-[0.875rem] text-mute">{channel.note}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </ul>

            <div className="mt-10 border-t border-line pt-6">
              <p className="label text-mute-deep">Elsewhere</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
                {site.social.map((social) => (
                  <li key={social.label}>
                    <TextLink href={social.href} arrow>
                      {social.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 border border-line p-6">
              <p className="text-[0.9375rem] leading-relaxed text-paper-dim">
                Know you want to talk it through? Skip the message and put time in
                the diary instead.
              </p>
              <div className="mt-6">
                <MagneticButton href={site.cta.href} variant="outline">
                  {site.cta.label}
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="display-sm uppercase">Send a message</h2>
            <p className="lede mt-5 max-w-[44ch]">
              Name, email and a few sentences is all we need. The rest we will
              ask about in the reply.
            </p>
            <div className="mt-12">
              <InquiryForm variant="contact" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { CapabilityIndex } from "@/components/sections/CapabilityIndex";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Capabilities across AI and machine learning, software engineering, web applications, cloud infrastructure, automation, data and product engineering — and how ReinstateLabs puts them together.",
  alternates: { canonical: "/what-we-do" },
  openGraph: {
    title: "What We Do — ReinstateLabs",
    description:
      "AI, software engineering, web applications, cloud, automation, data and product engineering, and how they fit together.",
    url: "/what-we-do",
  },
};

export default function WhatWeDoPage() {
  return (
    <>
      <Section id="capabilities" space="base" labelledBy="capabilities-heading">
        <SectionHeading index={1} eyebrow="Capability index">
          Seven practices. Each is a real team competency, not a keyword.
        </SectionHeading>

        <div className="mb-16 mt-12 md:mb-24 md:mt-16">
          <AnimatedText
            as="h2"
            id="capabilities-heading"
            lines={["What we build"]}
            className="display-lg uppercase"
          />
        </div>

        <CapabilityIndex />
      </Section>
    </>
  );
}

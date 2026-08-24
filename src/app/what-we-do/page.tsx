import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { CapabilityIndex } from "@/components/sections/CapabilityIndex";
import { capabilities } from "@/lib/content";
import { site } from "@/lib/site";

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

const capabilitiesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: capabilities.map((capability, i) => ({
    "@type": "Service",
    position: i + 1,
    name: capability.title,
    description: capability.summary,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/what-we-do#${capability.id}`,
  })),
};

export default function WhatWeDoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled structured data mirroring the capabilities below.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(capabilitiesSchema) }}
      />

      <Section id="capabilities" space="base" labelledBy="capabilities-heading">
        <SectionHeading index={1} eyebrow="Capability index">
          Seven practices. Each is a real team competency, not a keyword.
        </SectionHeading>

        <div className="mb-16 mt-12 md:mb-24 md:mt-16">
          <AnimatedText
            as="h1"
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

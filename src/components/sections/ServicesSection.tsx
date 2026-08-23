import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { ServiceIndex } from "@/components/services/ServiceIndex";
import { TextLink } from "@/components/ui/TextLink";

export function ServicesSection({ index = 1 }: { index?: number }) {
  return (
    <Section id="services" space="base" labelledBy="services-heading">
      <SectionHeading index={index} eyebrow="What we do">
        Five practices, run by one team. Most projects use more than one.
      </SectionHeading>

      <div className="mb-16 mt-12 flex flex-wrap items-end justify-between gap-8 md:mb-20 md:mt-16">
        <AnimatedText
          as="h2"
          id="services-heading"
          lines={["Capabilities"]}
          className="display-lg uppercase"
        />
        <TextLink href="/what-we-do" arrow className="label pb-3">
          Full capability index
        </TextLink>
      </div>

      <ServiceIndex />
    </Section>
  );
}

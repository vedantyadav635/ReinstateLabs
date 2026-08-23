import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";

export function ProcessSection({ index = 3 }: { index?: number }) {
  return (
    <Section id="process" space="base" labelledBy="process-heading">
      <SectionHeading index={index} eyebrow="Process">
        Five stages. The same shape whether the engagement runs six weeks or a
        year.
      </SectionHeading>

      <div className="mb-16 mt-12 md:mb-24 md:mt-16">
        <AnimatedText
          as="h2"
          id="process-heading"
          lines={["From problem", "to production"]}
          className="display-lg uppercase"
        />
      </div>

      <ProcessTimeline />
    </Section>
  );
}

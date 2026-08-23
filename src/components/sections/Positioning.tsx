import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollHighlightText } from "@/components/animations/ScrollHighlightText";

/**
 * The philosophy statement. Deliberately the quietest section on the page —
 * one sentence at scale, with nothing else competing with it.
 */
export function Positioning() {
  return (
    <Section id="approach" space="wide" tone="raised" labelledBy="positioning-heading">
      <SectionHeading index={2} eyebrow="Position">
        What we believe about building software, stated plainly.
      </SectionHeading>

      <h2 id="positioning-heading" className="sr-only">
        How ReinstateLabs approaches technology
      </h2>

      <div className="mt-12 md:mt-16">
        <ScrollHighlightText
          text="Technology should remove complexity, not add to it. We build systems that are useful on day one and still maintainable in year three."
          accentWords={["remove", "complexity,"]}
          className="max-w-[24ch] font-display text-[clamp(1.75rem,3.7vw,3.25rem)] font-semibold uppercase leading-[1.02] tracking-[-0.035em] text-paper md:max-w-[30ch]"
        />
      </div>
    </Section>
  );
}

import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { techGroups } from "@/lib/content";
import { pad } from "@/lib/utils";

interface TechEcosystemProps {
  index?: number;
  heading?: readonly string[];
  intro?: string;
}

/**
 * The stack, presented as a labelled index rather than a wall of logos. Each
 * row is a discipline; the tools sit inside it as plain type.
 */
export function TechEcosystem({
  index = 4,
  heading = ["The stack", "we work in"],
  intro = "We are not tied to a single vendor. These are the tools we reach for most often, chosen because they are proven, well documented and easy to hire for.",
}: TechEcosystemProps) {
  return (
    <Section id="stack" tone="raised" labelledBy="stack-heading">
      <SectionHeading index={index} eyebrow="Technology" />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <AnimatedText
            as="h2"
            id="stack-heading"
            lines={heading}
            className="display-md uppercase"
          />
          <p className="lede mt-7 max-w-[42ch]">{intro}</p>
        </div>

        <div className="lg:col-span-7">
          <dl>
            {techGroups.map((group, i) => (
              <ScrollReveal
                key={group.label}
                delay={i * 0.06}
                distance={18}
                className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line py-6 sm:grid-cols-[8rem_minmax(0,1fr)] md:py-7"
              >
                <dt className="label flex items-baseline gap-3 text-mute-deep">
                  <span className="text-ember/70">{pad(i + 1)}</span>
                  {group.label}
                </dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="group inline-flex items-center gap-2 text-[0.9375rem] text-paper-dim transition-colors duration-300 hover:text-paper"
                    >
                      <span
                        aria-hidden
                        className="size-[3px] scale-0 rounded-full bg-ember transition-transform duration-300 group-hover:scale-100"
                      />
                      {item}
                    </span>
                  ))}
                </dd>
              </ScrollReveal>
            ))}
          </dl>
          <div className="border-t border-line pt-6">
            <p className="text-[0.875rem] leading-relaxed text-mute">
              Selection is a decision, not a habit. If your team already runs
              something that works, we build with it rather than around it.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

import type { ReactNode } from "react";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  /** Rendered as an h1; one entry per masked line. */
  lines: readonly string[];
  lede: string;
  /** Optional key/value rail along the bottom edge. */
  meta?: readonly { label: string; value: string }[];
  children?: ReactNode;
  className?: string;
}

/**
 * Interior page header. Shares the hero's structure — eyebrow rail, masked
 * headline, lower rail — at a smaller scale, so pages feel like one family
 * without repeating the homepage's full-screen statement.
 */
export function PageHero({
  eyebrow,
  lines,
  lede,
  meta,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pb-20 pt-[calc(var(--nav-h)+4.5rem)] md:pb-28 md:pt-[calc(var(--nav-h)+7rem)]",
        className,
      )}
      aria-labelledby="page-heading"
    >
      <div
        aria-hidden
        className="tech-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(110%_80%_at_20%_0%,black,transparent_72%)]"
      />
      <div aria-hidden className="noise-layer -z-10" />

      <div className="shell-wide">
        <ScrollReveal distance={14} duration={0.6} className="border-t border-line pt-4">
          <p className="label flex items-center gap-3 text-mute">
            <span className="rl-blink size-[5px] rounded-full bg-ember" aria-hidden />
            {eyebrow}
          </p>
        </ScrollReveal>

        <div className="mt-14 md:mt-20">
          <AnimatedText
            as="h1"
            id="page-heading"
            lines={lines}
            trigger="mount"
            delay={0.12}
            className="display-lg max-w-[16ch] uppercase"
          />
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-8 lg:grid-cols-12">
          <ScrollReveal distance={20} delay={0.2} className="lg:col-span-6">
            <p className="lede max-w-[52ch]">{lede}</p>
          </ScrollReveal>

          {children ? (
            <ScrollReveal distance={20} delay={0.3} className="lg:col-span-3">
              {children}
            </ScrollReveal>
          ) : null}

          {meta ? (
            <ScrollReveal
              distance={20}
              delay={0.35}
              className={cn("self-end", children ? "lg:col-span-3" : "lg:col-span-4 lg:col-start-9")}
            >
              <dl>
                {meta.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2"
                  >
                    <dt className="label text-mute-deep">{row.label}</dt>
                    <dd className="label text-paper-dim">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

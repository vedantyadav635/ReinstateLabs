"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { site } from "@/lib/site";

interface CTASectionProps {
  heading?: readonly string[];
  body?: string;
  eyebrow?: string;
}

/**
 * Closing call to action. A single ember arc rises out of the lower edge as the
 * section is scrolled through — the one dramatic gesture on the page.
 */
export function CTASection({
  heading = ["Have an idea", "worth building?"],
  body = "Tell us the problem in plain language. We will tell you honestly whether we are the right team to solve it, and what it would take.",
  eyebrow = "Next step",
}: CTASectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const arcY = useTransform(scrollYProgress, [0, 1], ["18%", "-14%"]);
  const arcScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 1.1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.6, 0.25]);

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-ink-sunken section-py-wide"
    >
      <motion.div
        aria-hidden
        style={{ opacity: gridOpacity }}
        className="tech-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_top,black,transparent_72%)]"
      />
      <motion.div
        aria-hidden
        style={{ y: arcY, scale: arcScale }}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
      >
        <svg
          viewBox="0 0 1200 600"
          className="w-[200%] max-w-none sm:w-[140%] md:w-[110%]"
          fill="none"
          role="presentation"
        >
          <defs>
            <linearGradient id="rl-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c86345" stopOpacity="0" />
              <stop offset="50%" stopColor="#c86345" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#c86345" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="600" cy="600" r="520" stroke="url(#rl-arc)" strokeWidth="1.5" />
          <circle cx="600" cy="600" r="420" stroke="#edeae4" strokeOpacity="0.07" />
          <circle cx="600" cy="600" r="320" stroke="#edeae4" strokeOpacity="0.05" />
        </svg>
      </motion.div>
      <div className="noise-layer -z-10" aria-hidden />

      <div className="shell-wide relative">
        <p className="label mb-8 flex items-center gap-3 text-mute sm:mb-12 md:mb-16">
          <span className="rl-blink size-[5px] rounded-full bg-ember" aria-hidden />
          {eyebrow}
        </p>

        <AnimatedText
          as="h2"
          id="cta-heading"
          lines={heading}
          className="display-lg max-w-[16ch] uppercase text-balance"
        />

        <div className="content-gap mt-8 grid border-t border-line pt-8 sm:mt-12 sm:pt-10 lg:grid-cols-12">
          <p className="lede max-w-[48ch] lg:col-span-6">{body}</p>

          <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center lg:col-span-6 lg:justify-end">
            <MagneticButton href={site.cta.href} size="lg" className="w-full sm:w-auto text-center justify-center">
              {site.cta.label}
            </MagneticButton>
            <MagneticButton href="/contact" size="lg" variant="outline" arrow={false} className="w-full sm:w-auto text-center justify-center">
              Start a conversation
            </MagneticButton>
          </div>
        </div>

        <ScrollReveal delay={0.15} distance={14} className="mt-8 sm:mt-12">
          <a
            href={`mailto:${site.email}`}
            className="label inline-flex items-center gap-3 text-mute transition-colors duration-300 hover:text-paper break-all"
          >
            <span className="h-px w-8 shrink-0 bg-ember" aria-hidden />
            {site.email}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

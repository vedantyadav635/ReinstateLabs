"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { capabilities } from "@/lib/content";
import { pad, cn } from "@/lib/utils";
import { easing } from "@/lib/motion";
import { ServiceVisual, type VisualVariant } from "@/components/services/ServiceVisual";

/** Capability id → diagram. Kept here so content stays presentation-free. */
const diagrams: Record<string, VisualVariant> = {
  "software-engineering": "stack",
  "web-applications": "viewport",
  "ai-ml": "lattice",
  "data-analytics": "warehouse",
  "cloud-infrastructure": "topology",
  automation: "flow",
  marketing: "loop",
};

function Block({
  capability,
  index,
  onActive,
}: {
  capability: (typeof capabilities)[number];
  index: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -50% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <article
      ref={ref}
      id={capability.id}
      className="scroll-mt-[calc(var(--nav-h)+3rem)] border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20"
    >
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-[34ch]">
          <p className="label text-ember">{pad(index + 1)}</p>
          <h2 className="display-sm mt-5 uppercase md:text-[2.125rem]">{capability.title}</h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-paper-dim">
            {capability.summary}
          </p>
        </div>

        <div className="relative hidden w-32 shrink-0 md:block md:w-40">
          <motion.div
            data-rl-reveal
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: easing.outExpo }}
            className="aspect-square border border-line p-3"
          >
            <ServiceVisual variant={diagrams[capability.id] ?? "lattice"} />
          </motion.div>
        </div>
      </div>

      <ul className="mt-10 grid border-t border-line md:grid-cols-2">
        {capability.points.map((point) => (
          <li
            key={point}
            className="group flex items-start gap-4 border-b border-line py-4 pr-4 transition-colors duration-500 hover:bg-ink-raised md:px-5 md:[&:nth-child(odd)]:border-r"
          >
            <span
              aria-hidden
              className="mt-[0.55em] h-px w-4 shrink-0 bg-mute-deep transition-[width,background-color] duration-500 group-hover:w-7 group-hover:bg-ember"
            />
            <span className="text-[0.9375rem] leading-relaxed text-mute transition-colors duration-500 group-hover:text-paper-dim">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * The full capability index. A sticky contents rail tracks which block is in
 * view; each block carries its own schematic so the page reads as a technical
 * document rather than a list of services.
 */
export function CapabilityIndex() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
      <nav aria-label="Capabilities" className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+3.5rem)]">
          <p className="label border-b border-line pb-4 text-mute-deep">Index</p>
          <ul className="mt-5 space-y-1">
            {capabilities.map((capability, i) => (
              <li key={capability.id}>
                <a
                  href={`#${capability.id}`}
                  className={cn(
                    "group flex items-baseline gap-3 py-1.5 text-[0.9375rem] transition-colors duration-300",
                    active === i ? "text-paper" : "text-mute hover:text-paper-dim",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[0.6875rem] tracking-[0.16em] transition-colors duration-300",
                      active === i ? "text-ember" : "text-mute-deep",
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="relative">
                    {capability.title}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active === i ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="lg:col-span-9">
        {capabilities.map((capability, i) => (
          <Block key={capability.id} capability={capability} index={i} onActive={setActive} />
        ))}
      </div>
    </div>
  );
}

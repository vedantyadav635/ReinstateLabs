"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/lib/content";
import { pad, cn } from "@/lib/utils";
import { easing } from "@/lib/motion";

function Step({
  index,
  onEnter,
  active,
  children,
}: {
  index: number;
  onEnter: (index: number) => void;
  active: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li
      ref={ref}
      className={cn(
        "border-t border-line py-10 transition-opacity duration-700 md:py-14",
        active ? "opacity-100" : "opacity-45",
      )}
    >
      {children}
    </li>
  );
}

/**
 * Scroll-driven process. A sticky left column holds the current stage while the
 * stages themselves move past on the right; the rail on the far left tracks
 * overall progress through the section.
 */
export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const current = processSteps[active];

  return (
    <div ref={containerRef} className="content-gap relative grid lg:grid-cols-12">
      {/* Sticky stage readout */}
      <div aria-hidden className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+3.5rem)]">
          <div className="flex gap-8">
            {/* Progress rail */}
            <div className="relative w-px shrink-0 bg-line" aria-hidden>
              <motion.div
                className="absolute inset-x-0 top-0 origin-top bg-ember"
                style={{ scaleY: progress, height: "100%" }}
              />
              {processSteps.map((step, i) => (
                <span
                  key={step.index}
                  className={cn(
                    "absolute -left-[3px] size-[7px] rounded-full border transition-colors duration-500",
                    i <= active ? "border-ember bg-ember" : "border-line bg-ink",
                  )}
                  style={{ top: `${(i / (processSteps.length - 1)) * 100}%` }}
                />
              ))}
            </div>

            <div className="min-h-[18rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: easing.outExpo }}
                >
                  <p className="font-display text-[clamp(5rem,7vw,7.5rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-ember/85">
                    {pad(current.index)}
                  </p>
                  <p className="display-md mt-6 font-display uppercase">{current.title}</p>
                  <p className="lede mt-5 max-w-[34ch]">{current.summary}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Stages */}
      <ol className="lg:col-span-7">
        {processSteps.map((step, i) => (
          <Step key={step.index} index={i} onEnter={setActive} active={active === i}>
            <div className="flex items-baseline gap-4 lg:hidden">
              <span className="label text-ember">{pad(step.index)}</span>
              <h3 className="display-sm uppercase">{step.title}</h3>
            </div>
            <h3 className="hidden font-display text-[clamp(1.5rem,1.6vw,1.75rem)] font-semibold uppercase tracking-[-0.03em] lg:block">
              <span className="mr-4 align-middle font-mono text-[0.6875rem] tracking-[0.16em] text-ember">
                {pad(step.index)}
              </span>
              {step.title}
            </h3>
            <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-paper-dim lg:mt-6">
              {step.detail}
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2">
              {step.outputs.map((output) => (
                <li
                  key={output}
                  className="label rounded-full border border-line px-3 py-1.5 text-mute"
                >
                  {output}
                </li>
              ))}
            </ul>
          </Step>
        ))}
      </ol>
    </div>
  );
}

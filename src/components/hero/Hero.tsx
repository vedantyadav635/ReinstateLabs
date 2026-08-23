"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextLink } from "@/components/ui/TextLink";
import { HeroVisual } from "./HeroVisual";

const HEADLINE = ["Systems that", "earn their", "keep."] as const;

const COORDINATES = [
  { label: "Lat", value: "18.5204° N" },
  { label: "Lng", value: "73.8567° E" },
  { label: "Zones", value: "IST · CET · EST" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.6 });
  const pointerY = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.6 });

  const handlePointer = (event: React.PointerEvent) => {
    if (reduced || event.pointerType !== "mouse") return;
    const { innerWidth, innerHeight } = window;
    rawX.set((event.clientX / innerWidth - 0.5) * 44);
    rawY.set((event.clientY / innerHeight - 0.5) * 32);
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointer}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]"
      aria-labelledby="hero-heading"
    >
      {/* Structural ground: fine grid, faded away from the centre. */}
      <div
        aria-hidden
        className="tech-grid absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(120%_85%_at_50%_35%,black,transparent_78%)]"
      />
      <div aria-hidden className="noise-layer -z-10" />
      <div className="-z-10">
        <HeroVisual
          pointerX={pointerX}
          pointerY={pointerY}
          scrollY={visualY}
          scrollOpacity={visualOpacity}
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative flex flex-1 flex-col justify-between pb-10 pt-9 md:pb-12 md:pt-12"
      >
        {/* Headline */}
        <div className="py-10 md:py-12">
          <h1 id="hero-heading" className="sr-only">
            ReinstateLabs — systems that earn their keep
          </h1>
          <AnimatedText
            as="div"
            aria-hidden
            lines={HEADLINE}
            trigger="mount"
            delay={0.2}
            stagger={0.09}
            className="display-xl uppercase"
          />
        </div>

        {/* Lower rail: statement, actions, coordinates */}
        <div className="grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
          <div
            className="rl-fade-up lg:col-span-6 xl:col-span-5"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="lede max-w-[46ch]">
              ReinstateLabs designs and builds software, AI systems, cloud
              infrastructure and automation for companies that need technology to
              work in production — not in a demo.
            </p>
          </div>

          <div
            className="rl-fade-up flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-start xl:col-span-4"
            style={{ animationDelay: "0.82s" }}
          >
            <MagneticButton href="/book-appointment" size="lg">
              Book an Appointment
            </MagneticButton>
            {/* Secondary action is a link, not a second pill — two pills of
                different widths read as an unresolved pair. */}
            <TextLink href="/what-we-do" arrow className="ml-2 text-[0.9375rem] text-paper-dim">
              Explore what we do
            </TextLink>
          </div>

          <dl
            className="rl-fade-up hidden gap-1 self-end lg:col-span-2 lg:block xl:col-span-3"
            style={{ animationDelay: "0.94s" }}
          >
            {COORDINATES.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 border-b border-line py-1.5">
                <dt className="label text-mute-deep">{row.label}</dt>
                <dd className="label text-paper-dim">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

    </section>
  );
}

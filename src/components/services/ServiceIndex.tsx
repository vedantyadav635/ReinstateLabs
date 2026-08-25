"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { pad, cn } from "@/lib/utils";
import { easing } from "@/lib/motion";
import { ServiceVisual } from "./ServiceVisual";

/**
 * The services list. Rows respond to hover *and* keyboard focus, so the reveal
 * is not mouse-only. On touch and reduced-motion the description is simply
 * always visible.
 */
export function ServiceIndex() {
  const [active, setActive] = useState<number | null>(null);
  const [pointerReady, setPointerReady] = useState(false);
  const reduced = useReducedMotion();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 180, damping: 24, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 180, damping: 24, mass: 0.5 });

  const handleMove = (event: React.PointerEvent) => {
    if (reduced || event.pointerType !== "mouse") return;
    cursorX.set(event.clientX + 28);
    cursorY.set(event.clientY - 116);
    if (!pointerReady) setPointerReady(true);
  };

  const activeService = active !== null ? services[active] : null;

  return (
    <div className="relative" onPointerMove={handleMove}>
      <ul className="border-t border-line">
        {services.map((service, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;
          return (
            <li key={service.id} className="border-b border-line">
              <div
                onClick={() => setActive((prev) => (prev === i ? null : i))}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActive(i);
                }}
                onPointerLeave={() => setActive(null)}
                className="group relative isolate block cursor-pointer py-7 md:py-9"
              >
                {/* Row wash — replaces the "card" entirely. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-[calc(var(--shell-gutter)*-0.5)] inset-y-0 -z-10 origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(200,99,69,0.10),transparent_65%)] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive && "scale-x-100",
                  )}
                />

                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-5 gap-y-4 lg:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,20rem)_auto] lg:items-center lg:gap-x-8">
                  <span
                    className={cn(
                      "label pt-2 transition-colors duration-500 lg:pt-0",
                      isActive ? "text-ember" : dimmed ? "text-mute-deep" : "text-mute",
                    )}
                  >
                    {pad(service.index)}
                  </span>

                  <h3
                    className={cn(
                      "display-sm uppercase transition-[color,transform] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:text-[clamp(1.5rem,2.9vw,2.625rem)]",
                      isActive && "text-paper lg:translate-x-3",
                      dimmed && "text-mute",
                    )}
                  >
                    {service.title}
                  </h3>

                  {/* Redirection button: only clicking the arrow navigates to what-we-do */}
                  <Link
                    href={`/what-we-do#${service.anchor}`}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Learn more about ${service.title}`}
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 lg:order-last",
                      isActive
                        ? "border-ember bg-ember text-ink"
                        : "border-line text-mute hover:border-ember hover:text-ember",
                    )}
                  >
                    <ArrowUpRight strokeWidth={1.6} className="size-4" />
                  </Link>

                  <p
                    className={cn(
                      "col-span-2 col-start-2 max-w-[46ch] text-[0.9375rem] leading-relaxed transition-colors duration-500 lg:col-span-1 lg:col-start-3 lg:row-start-1",
                      isActive ? "text-paper-dim" : "text-mute",
                    )}
                  >
                    {service.short}
                  </p>
                </div>

                {/* Deliverables unfurl in place — no accordion chrome. */}
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: easing.outExpo }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-6 lg:pl-[6.5rem]">
                        {service.deliverables.map((item) => (
                          <li key={item} className="label text-mute">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Cursor-anchored diagram. Desktop pointers only. */}
      <AnimatePresence>
        {activeService && pointerReady && !reduced ? (
          <motion.div
            key={activeService.id}
            aria-hidden
            style={{ x: smoothX, y: smoothY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
            transition={{ duration: 0.4, ease: easing.outExpo }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden size-56 border border-line-strong bg-ink-raised/90 p-5 backdrop-blur-md lg:block"
          >
            <div className="flex h-full flex-col">
              <span className="label text-mute-deep">{pad(activeService.index)} / Schematic</span>
              <div className="flex-1 py-3">
                <ServiceVisual variant={activeService.visual} />
              </div>
              <span className="label truncate text-ember">{activeService.title}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

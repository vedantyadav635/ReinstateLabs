"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easing } from "@/lib/motion";
import { site } from "@/lib/site";

const SESSION_KEY = "rl-intro-played";
const DURATION = 1500;

/**
 * One-time intro. Plays only on the first visit of a browser session, is
 * skipped entirely for reduced motion, and never blocks input for longer than
 * its own wipe — the page underneath is already interactive.
 */
export function Loader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;

    setVisible(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      // Ease-out so the counter decelerates into 100.
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const timeout = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, DURATION);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          aria-hidden
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: easing.inOutQuint } }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-sunken px-[var(--shell-gutter)] pb-10 pt-[var(--nav-h)]"
        >
          <div className="noise-layer" />

          <div className="flex flex-1 items-center">
            <p className="font-display text-[clamp(2.5rem,9vw,7rem)] font-semibold uppercase leading-[0.84] tracking-[-0.05em]">
              {[site.wordmark.top, site.wordmark.bottom].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "108%" }}
                    animate={{
                      y: "0%",
                      transition: { duration: 1, ease: easing.outExpo, delay: 0.08 + i * 0.09 },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-px w-full bg-line">
              <motion.div
                className="h-px bg-ember"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: { duration: DURATION / 1000, ease: easing.outQuart },
                }}
                style={{ originX: 0 }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="label text-mute-deep">Initialising</span>
              <span className="label tabular-nums text-paper">
                {String(count).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

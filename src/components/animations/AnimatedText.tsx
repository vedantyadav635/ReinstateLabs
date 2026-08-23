"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing, viewportOnce } from "@/lib/motion";

interface AnimatedTextProps {
  /** Each entry becomes one masked line. */
  lines: readonly string[];
  id?: string;
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  /**
   * `view` waits for the block to scroll in and animates with Motion.
   * `mount` plays immediately and animates with CSS, so above-the-fold
   * headlines paint with the stylesheet rather than waiting for hydration.
   */
  trigger?: "view" | "mount";
  delay?: number;
  stagger?: number;
  /** Reveal word-by-word instead of a whole line at once. */
  splitWords?: boolean;
  /** Hide from assistive tech when a plain-text heading is provided elsewhere. */
  "aria-hidden"?: boolean;
}

/**
 * Masked type reveal — the site's primary headline treatment. Lines slide out
 * from behind an overflow-clipped box so the entrance reads as typography
 * rather than as an animation effect.
 */
export function AnimatedText({
  lines,
  id,
  className,
  lineClassName,
  as = "h2",
  trigger = "view",
  delay = 0,
  stagger = 0.085,
  splitWords = false,
  "aria-hidden": ariaHidden,
}: AnimatedTextProps) {
  const reduced = useReducedMotion();
  const Wrapper = as;

  if (reduced) {
    return (
      <Wrapper id={id} className={className} aria-hidden={ariaHidden}>
        {lines.map((line) => (
          <span key={line} className={cn("block", lineClassName)}>
            {line}{" "}
          </span>
        ))}
      </Wrapper>
    );
  }

  const words = (line: string) => line.split(" ");

  /* ---- CSS path: no hydration dependency, used above the fold ---- */
  if (trigger === "mount") {
    let unit = -1;
    return (
      <Wrapper id={id} className={className} aria-hidden={ariaHidden}>
        {lines.map((line) => (
          <span
            key={line}
            className={cn("block overflow-hidden pb-[0.06em]", lineClassName)}
          >
            {splitWords ? (
              <span className="inline-flex flex-wrap">
                {words(line).map((word, w) => {
                  unit += 1;
                  return (
                    <span
                      key={`${word}-${w}`}
                      className="rl-line-in inline-block whitespace-pre"
                      style={{ animationDelay: `${delay + unit * stagger}s` }}
                    >
                      {word}{" "}
                    </span>
                  );
                })}
              </span>
            ) : (
              (() => {
                unit += 1;
                return (
                  <span
                    className="rl-line-in block"
                    style={{ animationDelay: `${delay + unit * stagger}s` }}
                  >
                    {line}{" "}
                  </span>
                );
              })()
            )}
          </span>
        ))}
      </Wrapper>
    );
  }

  /* ---- Motion path: scroll-triggered ---- */
  let unitIndex = -1;

  return (
    <Wrapper id={id} className={className} aria-hidden={ariaHidden}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {lines.map((line) => (
          <span
            key={line}
            className={cn("block overflow-hidden pb-[0.06em]", lineClassName)}
          >
            {splitWords ? (
              <span className="inline-flex flex-wrap">
                {words(line).map((word, w) => {
                  unitIndex += 1;
                  return (
                    <motion.span
                      key={`${word}-${w}`}
                      className="inline-block whitespace-pre"
                      data-rl-reveal
                      variants={{
                        hidden: { y: "108%" },
                        visible: {
                          y: "0%",
                          transition: {
                            duration: 1,
                            ease: easing.outExpo,
                            delay: delay + unitIndex * stagger,
                          },
                        },
                      }}
                    >
                      {word}{" "}
                    </motion.span>
                  );
                })}
              </span>
            ) : (
              (() => {
                unitIndex += 1;
                return (
                  <motion.span
                    className="block"
                    data-rl-reveal
                    variants={{
                      hidden: { y: "108%" },
                      visible: {
                        y: "0%",
                        transition: {
                          duration: 1.05,
                          ease: easing.outExpo,
                          delay: delay + unitIndex * stagger,
                        },
                      },
                    }}
                  >
                    {line}{" "}
                  </motion.span>
                );
              })()
            )}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}

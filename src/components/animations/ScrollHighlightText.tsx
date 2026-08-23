"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollHighlightTextProps {
  text: string;
  className?: string;
  /** Words rendered in the accent colour once revealed. */
  accentWords?: readonly string[];
}

const strip = (word: string) => word.replace(/[^a-z]/gi, "").toLowerCase();

function Word({
  word,
  range,
  progress,
  accent,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span
        style={{ opacity }}
        className={cn("inline-block", accent && "text-ember")}
      >
        {word}
      </motion.span>
    </span>
  );
}

/**
 * Reveals a statement word-by-word as it passes through the viewport. Used once,
 * for the positioning section — the effect loses its weight if repeated.
 */
export function ScrollHighlightText({
  text,
  className,
  accentWords = [],
}: ScrollHighlightTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.42"],
  });

  const words = text.split(" ");
  const accents = new Set(accentWords.map(strip));

  if (reduced) {
    return (
      <p className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={cn("mr-[0.28em] inline-block", accents.has(strip(word)) && "text-ember")}
          >
            {word}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1.6) / words.length;
        return (
          <Word
            key={`${word}-${i}`}
            word={word}
            range={[start, Math.min(end, 1)]}
            progress={scrollYProgress}
            accent={accents.has(strip(word))}
          />
        );
      })}
    </p>
  );
}

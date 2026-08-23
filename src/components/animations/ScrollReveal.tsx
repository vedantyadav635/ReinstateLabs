"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { easing, viewportOnce } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  /** Distance travelled, in px. Larger for section-level blocks. */
  distance?: number;
  direction?: Direction;
  delay?: number;
  duration?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Standard scroll-in for blocks of content. Honours reduced motion by
 * rendering the resting state immediately.
 */
export function ScrollReveal({
  children,
  distance = 28,
  direction = "up",
  delay = 0,
  duration = 0.85,
  as = "div",
  ...rest
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  if (reduced) {
    return <Component {...rest}>{children}</Component>;
  }

  return (
    <Component
      data-rl-reveal
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: easing.outExpo }}
      {...rest}
    >
      {children}
    </Component>
  );
}

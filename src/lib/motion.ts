import type { Transition, Variants } from "framer-motion";

/** Shared easing curves so motion across the site reads as one system. */
export const easing = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuint: [0.83, 0, 0.17, 1],
  outQuart: [0.25, 1, 0.5, 1],
} as const;

export const transition = {
  /** Section-level entrances. */
  major: { duration: 1.05, ease: easing.outExpo } satisfies Transition,
  /** Element-level entrances. */
  medium: { duration: 0.75, ease: easing.outExpo } satisfies Transition,
  /** Hover / state changes. */
  micro: { duration: 0.42, ease: easing.outExpo } satisfies Transition,
};

/** Viewport config used by every scroll-triggered block. */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: transition.medium },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.medium },
};

/** Parent for staggered children; children use `fadeUp`. */
export const stagger = (delayChildren = 0, staggerChildren = 0.075): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

/** Masked line reveal used by AnimatedText. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.05, ease: easing.outExpo } },
};

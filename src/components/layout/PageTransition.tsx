"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easing } from "@/lib/motion";

/**
 * Route change treatment: a single ember hairline sweeps across the top while
 * the incoming page fades up. Deliberately short — a full curtain between
 * pages would cost more than it adds.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const firstRender = useRef(true);
  const [sweeping, setSweeping] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduced) return;
    setSweeping(true);
    const timeout = window.setTimeout(() => setSweeping(false), 700);
    return () => window.clearTimeout(timeout);
  }, [pathname, reduced]);

  if (reduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence>
        {sweeping ? (
          <motion.span
            key={pathname}
            aria-hidden
            className="fixed inset-x-0 top-0 z-[90] h-px origin-left bg-ember"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, transition: { duration: 0.55, ease: easing.outQuart } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          />
        ) : null}
      </AnimatePresence>

      {/*
        Opacity only: animating `y` here would leave a transform on the
        wrapper, which makes every `position: fixed` descendant resolve
        against this element instead of the viewport.
      */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: easing.outExpo }}
      >
        {children}
      </motion.div>
    </>
  );
}

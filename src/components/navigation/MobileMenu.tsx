"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { pad } from "@/lib/utils";
import { easing } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const panel = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.75, ease: easing.inOutQuint },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.55, ease: easing.inOutQuint, delay: 0.08 },
  },
};

const item = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, ease: easing.outExpo, delay: 0.18 + i * 0.06 },
  }),
  exit: { y: "110%", transition: { duration: 0.35, ease: easing.inOutQuint } },
};

/**
 * Full-viewport menu that wipes up from the bottom edge. Traps focus and locks
 * scroll while open; closes on Escape.
 */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !ref.current) return;
      const focusables = ref.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink-sunken lg:hidden"
    >
      <div aria-hidden className="tech-grid absolute inset-0 opacity-40" />
      <div className="noise-layer" aria-hidden />

      <div className="shell-wide relative flex h-full flex-col justify-between pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(var(--nav-h)+1.5rem)]">
        <nav aria-label="Mobile" className="mt-auto">
          <ul>
            {site.nav.map((navItem, i) => (
              <li key={navItem.href} className="border-t border-line">
                <span className="block overflow-hidden py-1">
                  <motion.span
                    custom={i}
                    variants={item}
                    className="block"
                  >
                    <Link
                      href={navItem.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-4 py-3"
                    >
                      <span className="label text-mute-deep">{pad(i + 1)}</span>
                      <span className="display-md font-display uppercase transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                        {navItem.label}
                      </span>
                    </Link>
                  </motion.span>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-7 border-t border-line pt-7">
          <MagneticButton href={site.cta.href} size="lg" fullWidth>
            {site.cta.label}
          </MagneticButton>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-1">
              <p className="label text-mute-deep">Direct</p>
              <a href={`mailto:${site.email}`} className="block text-paper-dim">
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="block text-paper-dim">
                {site.phone}
              </a>
            </div>
            <ul className="flex gap-5">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label text-mute transition-colors hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

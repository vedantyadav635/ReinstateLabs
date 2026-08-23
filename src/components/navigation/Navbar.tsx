"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCondensed(latest > 24);
    // Hide on sustained downward scroll, reveal instantly on the way back up.
    setHidden(latest > 320 && latest > previous + 2);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-105%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
          condensed && !menuOpen
            ? "border-b border-line bg-ink/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            condensed ? "h-16 md:h-[4.25rem]" : "h-[var(--nav-h)]",
          )}
        >
          <Wordmark />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {site.nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative py-2 text-[0.9375rem] tracking-[-0.01em] text-paper-dim transition-colors duration-300 hover:text-paper aria-[current=page]:text-paper"
                >
                  <span className="relative">
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full origin-left bg-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MagneticButton href={site.cta.href} size="md" variant="solid">
                {site.cta.label}
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="group relative flex h-11 items-center gap-3 rounded-full border border-line-strong px-4 text-paper transition-colors duration-300 hover:border-paper/35 lg:hidden"
            >
              <span className="label">{menuOpen ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative flex h-3 w-4 flex-col justify-between">
                <span
                  className={cn(
                    "h-px w-full origin-center bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-current transition-opacity duration-300",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full origin-center bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading position. Appears only once the bar has condensed. */}
        <motion.span
          aria-hidden
          style={{ scaleX: progress }}
          className={cn(
            "absolute inset-x-0 bottom-0 block h-px origin-left bg-ember transition-opacity duration-500",
            condensed && !menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}

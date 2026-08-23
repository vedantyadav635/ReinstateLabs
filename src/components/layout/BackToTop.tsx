"use client";

import { ArrowUpRight } from "lucide-react";

export function BackToTop() {
  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      className="label group inline-flex items-center gap-2 text-mute transition-colors hover:text-paper"
    >
      Back to top
      <ArrowUpRight
        aria-hidden
        strokeWidth={1.6}
        className="size-3.5 -rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[3px]"
      />
    </button>
  );
}

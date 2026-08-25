import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Vertical rhythm. `tight` for supporting blocks, `wide` for statements. */
  space?: "tight" | "base" | "wide";
  /** Slightly raised ground, used to break the page into movements. */
  tone?: "base" | "raised" | "sunken";
  labelledBy?: string;
}

const spacing = {
  tight: "section-py-tight",
  base: "section-py-base",
  wide: "section-py-wide",
} as const;

const tones = {
  base: "",
  raised: "bg-ink-raised",
  sunken: "bg-ink-sunken",
} as const;

export function Section({
  id,
  children,
  className,
  space = "base",
  tone = "base",
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative", spacing[space], tones[tone], className)}
    >
      <div className="shell-wide relative">{children}</div>
    </section>
  );
}

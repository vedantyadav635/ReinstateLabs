import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { pad } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface SectionHeadingProps {
  /** Section number rendered in the left margin, e.g. 2 → "02". */
  index?: number;
  eyebrow: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "between";
}

/**
 * The recurring editorial header: a hairline, a numbered mono label, and
 * optional trailing content on the right.
 */
export function SectionHeading({
  index,
  eyebrow,
  children,
  className,
  align = "between",
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      distance={16}
      duration={0.7}
      className={cn("border-t border-line pt-4", className)}
    >
      <div
        className={cn(
          "flex flex-wrap items-baseline gap-x-6 gap-y-2",
          align === "between" && "justify-between",
        )}
      >
        <p className="label flex items-center gap-3 text-mute">
          {index !== undefined ? (
            <span className="text-ember">{pad(index)}</span>
          ) : null}
          <span>{eyebrow}</span>
        </p>
        {children ? (
          <p className="label max-w-[38ch] text-mute-deep normal-case tracking-normal font-sans text-[0.8125rem] leading-relaxed">
            {children}
          </p>
        ) : null}
      </div>
    </ScrollReveal>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Stacked two-line wordmark. The lockup is the identity — no icon, no glyph.
 * The ember rule under "LABS" is the only ornament.
 */
export function Wordmark({
  className,
  size = "sm",
  asLink = true,
}: {
  className?: string;
  size?: "sm" | "lg";
  asLink?: boolean;
}) {
  const inner = (
    <span
      className={cn(
        "block font-display font-semibold uppercase leading-[0.82] tracking-[-0.045em]",
        size === "sm" ? "text-[0.9375rem] md:text-[1rem]" : "text-[clamp(2rem,5vw,3.5rem)]",
        className,
      )}
    >
      <span className="block">{site.wordmark.top}</span>
      <span className="flex items-baseline gap-1.5">
        <span>{site.wordmark.bottom}</span>
        <span
          aria-hidden
          className={cn(
            "mb-[0.22em] block bg-ember transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            size === "sm" ? "h-[2px] w-2.5 group-hover/mark:w-5" : "h-[3px] w-8",
          )}
        />
      </span>
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className="group/mark inline-block rounded-sm"
    >
      {inner}
    </Link>
  );
}

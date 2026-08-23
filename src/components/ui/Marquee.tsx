import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  /** Seconds for one full cycle. */
  duration?: number;
  className?: string;
  reverse?: boolean;
}

/**
 * CSS-only ticker — two identical tracks translated by -50%, so it loops
 * seamlessly without a JS frame loop. Pauses under prefers-reduced-motion.
 */
export function Marquee({ items, duration = 46, className, reverse }: MarqueeProps) {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden={undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="label px-8 text-paper-dim">{item}</span>
          <span aria-hidden className="size-[3px] rounded-full bg-ember" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-line py-5",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="rl-marquee-track flex min-w-max"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {row}
        <div aria-hidden>{row}</div>
      </div>
    </div>
  );
}

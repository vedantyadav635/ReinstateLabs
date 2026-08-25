import { cn } from "@/lib/utils";

/**
 * Fixed vertical hairlines spanning the true viewport. Deliberately NOT tied
 * to the content shell/gutter — this is a decorative architectural backdrop,
 * not a boundary content is expected to align with. Content sits above it
 * with its own independent padding, so nothing ever touches a line.
 */
export function GridLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <div className="grid h-full w-full grid-cols-2 md:grid-cols-4">
        <span className="border-l border-line" />
        <span className="border-l border-line" />
        <span className="hidden border-l border-line md:block" />
        <span className="hidden border-l border-line md:block" />
      </div>
      <span className="absolute inset-y-0 right-0 w-px bg-line" />
    </div>
  );
}

/** Small L-shaped corner ticks used to frame key blocks. */
export function CornerTicks({ className }: { className?: string }) {
  const tick = "absolute size-2.5 border-line-strong";
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(tick, "left-0 top-0 border-l border-t")} />
      <span className={cn(tick, "right-0 top-0 border-r border-t")} />
      <span className={cn(tick, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(tick, "bottom-0 right-0 border-b border-r")} />
    </span>
  );
}

/** Very low-opacity film grain, layered over dark fields. */
export function Noise({ className }: { className?: string }) {
  return <span aria-hidden className={cn("noise-layer opacity-[0.35]", className)} />;
}

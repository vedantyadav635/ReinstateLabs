"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Trailing arrow that slides on hover. */
  arrow?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  /** Stretch to the container — used in the mobile menu. */
  fullWidth?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  solid: "bg-paper text-ink hover:text-paper",
  outline: "border border-line-strong text-paper hover:text-ink",
  ghost: "text-paper-dim hover:text-paper",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-[3.375rem] px-8 text-[1rem]",
};

/**
 * Primary call to action. Follows the cursor slightly on pointer devices and
 * wipes its fill from the bottom on hover; both are disabled for reduced motion
 * and coarse pointers.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  size = "md",
  className,
  arrow = true,
  disabled,
  ariaLabel,
  fullWidth,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  const handleMove = (event: React.PointerEvent) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 14);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const fill =
    variant === "ghost"
      ? null
      : (
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100",
              variant === "solid" ? "bg-ember" : "bg-paper",
            )}
          />
        );

  const inner = (
    <motion.span
      ref={ref}
      style={reduced ? undefined : { x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
    >
      {fill}
      <span className="relative z-10">{children}</span>
      {arrow ? (
        <span className="relative z-10 overflow-hidden" aria-hidden>
          <ArrowRight
            className="size-[1.05em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[130%] motion-reduce:group-hover:translate-x-0"
            strokeWidth={1.75}
          />
          <ArrowRight
            className="absolute inset-0 size-[1.05em] -translate-x-[130%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 motion-reduce:hidden"
            strokeWidth={1.75}
          />
        </span>
      ) : null}
    </motion.span>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          className={cn("inline-flex rounded-full", fullWidth && "w-full")}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={cn("inline-flex rounded-full", fullWidth && "w-full")}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex rounded-full disabled:pointer-events-none disabled:opacity-45",
        fullWidth && "w-full",
      )}
    >
      {inner}
    </button>
  );
}

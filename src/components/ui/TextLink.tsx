import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Diagonal arrow for outbound / cross-page links. */
  arrow?: boolean;
  external?: boolean;
}

/** Inline link with an underline that draws in from the left on hover. */
export function TextLink({ href, children, className, arrow, external }: TextLinkProps) {
  const content = (
    <>
      <span className="link-rule">{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.5}
          className="size-[1em] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-[3px] group-hover/link:-translate-y-[3px]"
        />
      ) : null}
    </>
  );

  const classes = cn(
    "group/link inline-flex items-center gap-1.5 text-paper-dim transition-colors duration-300 hover:text-paper",
    className,
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";

/* -------------------------------------------------------------------------
 * Deterministic geometry. Everything is computed from fixed constants so the
 * server and client render identical markup — no randomness, no hydration gap.
 * ---------------------------------------------------------------------- */

const SIZE = 620;
const C = SIZE / 2;

const polygon = (radius: number, sides: number, rotation: number) =>
  Array.from({ length: sides }, (_, i) => {
    const angle = (i / sides) * Math.PI * 2 + (rotation * Math.PI) / 180;
    return `${(C + Math.cos(angle) * radius).toFixed(2)},${(C + Math.sin(angle) * radius).toFixed(2)}`;
  }).join(" ");

interface Node {
  x: number;
  y: number;
  accent: boolean;
  r: number;
}

/** Nodes sit on three rings at fixed angles — a schematic, not a particle field. */
const NODE_SPEC: readonly [radius: number, angle: number, accent: boolean][] = [
  [96, -90, true],
  [96, -18, false],
  [96, 54, false],
  [96, 126, false],
  [96, 198, false],
  [178, -54, false],
  [178, 6, true],
  [178, 66, false],
  [178, 126, false],
  [178, 186, false],
  [178, 246, false],
  [258, -30, false],
  [258, 42, false],
  [258, 114, true],
  [258, 186, false],
  [258, 258, false],
];

const EDGES: readonly [number, number][] = [
  [0, 5],
  [0, 6],
  [1, 6],
  [1, 7],
  [2, 7],
  [2, 8],
  [3, 8],
  [3, 9],
  [4, 10],
  [5, 11],
  [6, 12],
  [7, 12],
  [8, 13],
  [9, 14],
  [10, 15],
  [5, 6],
  [7, 8],
  [9, 10],
  [11, 12],
  [13, 14],
];

interface HeroVisualProps {
  /** Pointer offsets in the range -1…1, supplied by the hero section. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scrollY: MotionValue<number>;
  scrollOpacity: MotionValue<number>;
}

export function HeroVisual({
  pointerX,
  pointerY,
  scrollY,
  scrollOpacity,
}: HeroVisualProps) {
  const reduced = useReducedMotion();

  const nodes = useMemo<Node[]>(
    () =>
      NODE_SPEC.map(([radius, angle, accent]) => {
        const rad = (angle * Math.PI) / 180;
        return {
          x: C + Math.cos(rad) * radius,
          y: C + Math.sin(rad) * radius,
          accent,
          r: accent ? 3.4 : 2.2,
        };
      }),
    [],
  );

  const spin = reduced ? {} : { rotate: 360 };
  const spinTransition = { duration: 190, repeat: Infinity, ease: "linear" as const };

  return (
    <motion.div
      aria-hidden
      style={{ y: scrollY, opacity: scrollOpacity }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-[3%] lg:pr-[5%]"
    >
      <motion.div
        style={reduced ? undefined : { x: pointerX, y: pointerY }}
        className="relative aspect-square w-[min(120vw,52rem)] max-w-none md:w-[min(72vw,46rem)]"
      >
        {/* Soft ember bloom — the only glow on the site, kept very low. */}
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(226,85,43,0.11),transparent_66%)] blur-2xl" />

        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 size-full overflow-visible"
          role="presentation"
        >
          <defs>
            <linearGradient id="rl-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#edeae4" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#edeae4" stopOpacity="0.06" />
            </linearGradient>
            <radialGradient id="rl-fade" cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="rl-mask">
              <rect width={SIZE} height={SIZE} fill="url(#rl-fade)" />
            </mask>
          </defs>

          <g mask="url(#rl-mask)">
            {/* Outer measurement rings, counter-rotating slowly. */}
            <motion.g
              animate={spin}
              transition={spinTransition}
              style={{ originX: "50%", originY: "50%" }}
            >
              <circle
                cx={C}
                cy={C}
                r={292}
                fill="none"
                stroke="#edeae4"
                strokeOpacity="0.09"
                strokeDasharray="2 10"
              />
              <circle
                cx={C}
                cy={C}
                r={258}
                fill="none"
                stroke="#edeae4"
                strokeOpacity="0.07"
              />
              {[0, 90, 180, 270].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={angle}
                    x1={C + Math.cos(rad) * 250}
                    y1={C + Math.sin(rad) * 250}
                    x2={C + Math.cos(rad) * 300}
                    y2={C + Math.sin(rad) * 300}
                    stroke="#e2552b"
                    strokeOpacity="0.55"
                    strokeWidth="1"
                  />
                );
              })}
            </motion.g>

            {/* Nested polygons — the structural core of the mark. */}
            <motion.g
              animate={reduced ? {} : { rotate: -360 }}
              transition={{ duration: 260, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50%", originY: "50%" }}
            >
              {[
                { r: 210, sides: 6, rot: 0, opacity: 0.16 },
                { r: 168, sides: 6, rot: 18, opacity: 0.13 },
                { r: 126, sides: 6, rot: 36, opacity: 0.1 },
                { r: 84, sides: 6, rot: 54, opacity: 0.08 },
              ].map((ring) => (
                <polygon
                  key={ring.r}
                  points={polygon(ring.r, ring.sides, ring.rot)}
                  fill="none"
                  stroke="#edeae4"
                  strokeOpacity={ring.opacity}
                  strokeWidth="1"
                />
              ))}
            </motion.g>

            {/* Node graph. */}
            <g>
              {EDGES.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  x1={nodes[a].x}
                  y1={nodes[a].y}
                  x2={nodes[b].x}
                  y2={nodes[b].y}
                  stroke="url(#rl-edge)"
                  strokeWidth="1"
                />
              ))}
              {nodes.map((node, i) => (
                <motion.g
                  key={i}
                  animate={
                    reduced
                      ? {}
                      : { opacity: node.accent ? [0.55, 1, 0.55] : [0.35, 0.8, 0.35] }
                  }
                  transition={{
                    duration: 4.5 + (i % 5) * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.35,
                  }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={node.accent ? "#e2552b" : "#edeae4"}
                  />
                  {node.accent ? (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 6}
                      fill="none"
                      stroke="#e2552b"
                      strokeOpacity="0.4"
                    />
                  ) : null}
                </motion.g>
              ))}
            </g>

            {/* Centre reticle. */}
            <g>
              <circle cx={C} cy={C} r={26} fill="none" stroke="#edeae4" strokeOpacity="0.22" />
              <line x1={C - 40} y1={C} x2={C - 12} y2={C} stroke="#edeae4" strokeOpacity="0.3" />
              <line x1={C + 12} y1={C} x2={C + 40} y2={C} stroke="#edeae4" strokeOpacity="0.3" />
              <line x1={C} y1={C - 40} x2={C} y2={C - 12} stroke="#edeae4" strokeOpacity="0.3" />
              <line x1={C} y1={C + 12} x2={C} y2={C + 40} stroke="#edeae4" strokeOpacity="0.3" />
              <circle cx={C} cy={C} r={3} fill="#e2552b" />
            </g>
          </g>
        </svg>

        {/* Scan line — a single sweeping hairline reads as instrumentation. */}
        <div className="absolute inset-x-[8%] inset-y-[16%] overflow-hidden [mask-image:radial-gradient(circle,black_40%,transparent_72%)]">
          <div className="rl-sweep h-px w-full bg-[linear-gradient(90deg,transparent,rgba(226,85,43,0.85),transparent)] motion-reduce:hidden" />
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easing } from "@/lib/motion";
import { pad } from "@/lib/utils";

/** The layers we design against, top to bottom. */
const layers = [
  {
    label: "Experience",
    blocks: ["Web app", "Internal tools", "Dashboards"],
    note: "What people touch",
  },
  {
    label: "Application",
    blocks: ["API gateway", "Domain services", "Jobs & queues"],
    note: "Where the rules live",
  },
  {
    label: "Intelligence",
    blocks: ["Retrieval", "Models", "Evaluation"],
    note: "Where judgement is applied",
  },
  {
    label: "Data",
    blocks: ["Operational store", "Warehouse", "Event log"],
    note: "The single record",
  },
  {
    label: "Platform",
    blocks: ["Infrastructure as code", "CI/CD", "Observability"],
    note: "How it stays up",
  },
];

const ROW_H = 96;
const TOP = 40;
const LEFT = 172;
const BLOCK_W = 236;
const GAP = 28;

export function SystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();

  const width = LEFT + BLOCK_W * 3 + GAP * 2 + 40;
  const height = TOP + ROW_H * layers.length + 24;

  return (
    <div ref={ref}>
      {/* Wide schematic — desktop and tablet. */}
      <div className="hidden overflow-x-auto md:block">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[46rem]"
          role="img"
          aria-label="System architecture: experience, application, intelligence, data and platform layers, connected top to bottom."
          fill="none"
        >
          {/* Vertical spine linking every layer. */}
          <motion.line
            x1={LEFT - 44}
            y1={TOP + 12}
            x2={LEFT - 44}
            y2={TOP + ROW_H * (layers.length - 1) + 52}
            stroke="#c86345"
            strokeOpacity={0.55}
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={inView || reduced ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.4, ease: easing.outQuart }}
          />

          {layers.map((layer, li) => {
            const y = TOP + li * ROW_H;
            return (
              <g key={layer.label}>
                <motion.line
                  x1={0}
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="#edeae4"
                  strokeOpacity={0.1}
                  initial={reduced ? undefined : { pathLength: 0 }}
                  animate={inView || reduced ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1, delay: li * 0.1, ease: easing.outQuart }}
                />

                <circle cx={LEFT - 44} cy={y + 34} r={4} fill="#c86345" />

                <text
                  x={0}
                  y={y + 26}
                  fill="#8a8a91"
                  className="font-mono"
                  fontSize="11"
                  letterSpacing="1.8"
                >
                  {pad(li + 1)}
                </text>
                <text
                  x={30}
                  y={y + 26}
                  fill="#edeae4"
                  className="font-mono"
                  fontSize="11"
                  letterSpacing="1.8"
                >
                  {layer.label.toUpperCase()}
                </text>
                <text x={30} y={y + 48} fill="#78787f" fontSize="12">
                  {layer.note}
                </text>

                {layer.blocks.map((block, bi) => {
                  const x = LEFT + bi * (BLOCK_W + GAP);
                  return (
                    <motion.g
                      key={block}
                      data-rl-reveal
                      initial={reduced ? undefined : { opacity: 0, y: 10 }}
                      animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
                      transition={{
                        duration: 0.7,
                        delay: 0.2 + li * 0.09 + bi * 0.05,
                        ease: easing.outExpo,
                      }}
                    >
                      <rect
                        x={x}
                        y={y + 16}
                        width={BLOCK_W}
                        height={44}
                        stroke="#edeae4"
                        strokeOpacity={bi === 0 ? 0.3 : 0.14}
                      />
                      <rect
                        x={x}
                        y={y + 16}
                        width={3}
                        height={44}
                        fill={bi === 0 ? "#c86345" : "#edeae4"}
                        fillOpacity={bi === 0 ? 0.9 : 0.18}
                      />
                      <text x={x + 18} y={y + 43} fill="#b9b6b0" fontSize="14">
                        {block}
                      </text>
                    </motion.g>
                  );
                })}

                {li < layers.length - 1 ? (
                  <line
                    x1={LEFT + BLOCK_W / 2}
                    y1={y + 60}
                    x2={LEFT + BLOCK_W / 2}
                    y2={y + ROW_H + 16}
                    stroke="#edeae4"
                    strokeOpacity={0.14}
                    strokeDasharray="3 5"
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stacked equivalent — mobile. */}
      <ol className="md:hidden">
        {layers.map((layer, li) => (
          <li key={layer.label} className="border-t border-line py-6">
            <div className="flex items-baseline gap-3">
              <span className="label text-ember">{pad(li + 1)}</span>
              <h3 className="label text-paper">{layer.label}</h3>
            </div>
            <p className="mt-2 text-[0.875rem] text-mute-deep">{layer.note}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {layer.blocks.map((block) => (
                <li
                  key={block}
                  className="border border-line px-3 py-1.5 text-[0.8125rem] text-paper-dim"
                >
                  {block}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

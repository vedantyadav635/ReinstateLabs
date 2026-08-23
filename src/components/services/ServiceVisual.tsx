import { cn } from "@/lib/utils";

export type VisualVariant =
  | "lattice"
  | "stack"
  | "viewport"
  | "topology"
  | "flow"
  | "warehouse"
  | "loop";

const stroke = "#edeae4";
const ember = "#e2552b";

/**
 * One abstract diagram per service. Each is a schematic of the thing itself —
 * a model lattice, a service stack, a layout frame, a network topology, a
 * pipeline — rather than decoration.
 */
export function ServiceVisual({
  variant,
  className,
}: {
  variant: VisualVariant;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      role="presentation"
      className={cn("size-full", className)}
      fill="none"
    >
      {variant === "lattice" ? <Lattice /> : null}
      {variant === "stack" ? <Stack /> : null}
      {variant === "viewport" ? <Viewport /> : null}
      {variant === "topology" ? <Topology /> : null}
      {variant === "flow" ? <Flow /> : null}
      {variant === "warehouse" ? <Warehouse /> : null}
      {variant === "loop" ? <Loop /> : null}
    </svg>
  );
}

/* AI — a three-layer network with weighted edges. */
function Lattice() {
  const layers = [
    [40, 62, 84, 106],
    [30, 56, 82, 108, 134],
    [56, 88, 120],
  ];
  const xs = [34, 80, 126];
  return (
    <g>
      {layers[0].map((y0, i) =>
        layers[1].map((y1, j) => (
          <line
            key={`a${i}-${j}`}
            x1={xs[0]}
            y1={y0}
            x2={xs[1]}
            y2={y1}
            stroke={stroke}
            strokeOpacity={(i + j) % 3 === 0 ? 0.45 : 0.12}
          />
        )),
      )}
      {layers[1].map((y1, i) =>
        layers[2].map((y2, j) => (
          <line
            key={`b${i}-${j}`}
            x1={xs[1]}
            y1={y1}
            x2={xs[2]}
            y2={y2}
            stroke={stroke}
            strokeOpacity={(i + j) % 4 === 0 ? 0.5 : 0.1}
          />
        )),
      )}
      {layers.map((layer, li) =>
        layer.map((y, i) => (
          <circle
            key={`n${li}-${i}`}
            cx={xs[li]}
            cy={y}
            r={li === 1 && i === 2 ? 4 : 2.8}
            fill={li === 1 && i === 2 ? ember : stroke}
          />
        )),
      )}
    </g>
  );
}

/* Software — stacked service tiers with a call arrow. */
function Stack() {
  const rows = [30, 58, 86, 114];
  return (
    <g>
      {rows.map((y, i) => (
        <g key={y}>
          <rect
            x={26}
            y={y}
            width={108}
            height={20}
            stroke={stroke}
            strokeOpacity={i === 1 ? 0.6 : 0.22}
          />
          <line
            x1={26 + 14 + i * 6}
            y1={y}
            x2={26 + 14 + i * 6}
            y2={y + 20}
            stroke={stroke}
            strokeOpacity={0.18}
          />
        </g>
      ))}
      <rect x={26} y={58} width={16} height={20} fill={ember} fillOpacity={0.9} />
      <path d="M80 122 L80 138 M74 132 L80 138 L86 132" stroke={ember} strokeOpacity={0.8} />
    </g>
  );
}

/* Digital products — an interface frame with a live column. */
function Viewport() {
  return (
    <g>
      <rect x={22} y={26} width={116} height={94} stroke={stroke} strokeOpacity={0.32} />
      <line x1={22} y1={42} x2={138} y2={42} stroke={stroke} strokeOpacity={0.32} />
      <circle cx={31} cy={34} r={2} fill={stroke} fillOpacity={0.5} />
      <circle cx={39} cy={34} r={2} fill={stroke} fillOpacity={0.28} />
      <rect x={32} y={54} width={44} height={54} stroke={ember} strokeOpacity={0.75} />
      {[56, 66, 76, 86].map((y, i) => (
        <line
          key={y}
          x1={88}
          y1={y}
          x2={i % 2 === 0 ? 128 : 112}
          y2={y}
          stroke={stroke}
          strokeOpacity={0.3}
        />
      ))}
      <line x1={88} y1={100} x2={122} y2={100} stroke={stroke} strokeOpacity={0.14} />
      <line x1={22} y1={132} x2={138} y2={132} stroke={stroke} strokeOpacity={0.12} />
    </g>
  );
}

/* Cloud — a region/zone topology. */
function Topology() {
  const nodes = [
    { x: 80, y: 40, r: 5, accent: true },
    { x: 40, y: 78, r: 3.4, accent: false },
    { x: 120, y: 78, r: 3.4, accent: false },
    { x: 58, y: 118, r: 3.4, accent: false },
    { x: 102, y: 118, r: 3.4, accent: false },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 4],
    [1, 2],
  ];
  return (
    <g>
      <rect x={20} y={22} width={120} height={116} stroke={stroke} strokeOpacity={0.12} strokeDasharray="3 6" />
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={stroke}
          strokeOpacity={0.28}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.accent ? ember : stroke} />
          {n.accent ? (
            <circle cx={n.x} cy={n.y} r={12} stroke={ember} strokeOpacity={0.35} />
          ) : null}
        </g>
      ))}
    </g>
  );
}

/* Automation — a pipeline with a decision branch. */
function Flow() {
  return (
    <g>
      <rect x={18} y={68} width={26} height={24} stroke={stroke} strokeOpacity={0.4} />
      <path d="M44 80 H66" stroke={stroke} strokeOpacity={0.35} />
      <path d="M78 68 L90 80 L78 92 L66 80 Z" stroke={ember} strokeOpacity={0.85} />
      <path d="M90 80 H112" stroke={stroke} strokeOpacity={0.35} />
      <rect x={112} y={68} width={26} height={24} stroke={stroke} strokeOpacity={0.4} />
      <path d="M78 68 V44 H126 V62" stroke={stroke} strokeOpacity={0.22} strokeDasharray="3 5" />
      <path d="M78 92 V116 H126 V100" stroke={stroke} strokeOpacity={0.22} strokeDasharray="3 5" />
      <circle cx={126} cy={62} r={2.4} fill={stroke} fillOpacity={0.5} />
      <circle cx={126} cy={100} r={2.4} fill={stroke} fillOpacity={0.5} />
      <circle cx={31} cy={80} r={2.6} fill={stroke} fillOpacity={0.6} />
      <circle cx={125} cy={80} r={2.6} fill={ember} />
    </g>
  );
}

/* Data — sources converging into a modelled store, then out to a reader. */
function Warehouse() {
  const sources = [40, 66, 92];
  return (
    <g>
      {sources.map((y) => (
        <g key={y}>
          <rect x={16} y={y - 8} width={20} height={16} stroke={stroke} strokeOpacity={0.35} />
          <path
            d={`M36 ${y} H52 Q62 ${y} 62 ${y < 66 ? 60 : 74} L62 ${y < 66 ? 60 : 74}`}
            stroke={stroke}
            strokeOpacity={0.25}
          />
        </g>
      ))}
      <rect x={62} y={52} width={36} height={44} stroke={ember} strokeOpacity={0.8} />
      <line x1={62} y1={66} x2={98} y2={66} stroke={ember} strokeOpacity={0.4} />
      <line x1={62} y1={80} x2={98} y2={80} stroke={ember} strokeOpacity={0.4} />
      <path d="M98 74 H120" stroke={stroke} strokeOpacity={0.3} />
      <rect x={120} y={62} width={22} height={24} stroke={stroke} strokeOpacity={0.4} />
      <line x1={125} y1={80} x2={125} y2={70} stroke={stroke} strokeOpacity={0.6} />
      <line x1={131} y1={80} x2={131} y2={66} stroke={ember} strokeOpacity={0.9} />
      <line x1={137} y1={80} x2={137} y2={73} stroke={stroke} strokeOpacity={0.6} />
      <line x1={16} y1={118} x2={142} y2={118} stroke={stroke} strokeOpacity={0.12} />
    </g>
  );
}

/* Product engineering — a build/measure loop with one open arc. */
function Loop() {
  return (
    <g>
      <path
        d="M80 34 A46 46 0 1 1 42 56"
        stroke={stroke}
        strokeOpacity={0.32}
      />
      <path d="M80 34 A46 46 0 0 1 118 56" stroke={ember} strokeOpacity={0.9} />
      <path d="M74 28 L80 34 L74 40" stroke={ember} strokeOpacity={0.9} />
      {[
        [80, 34],
        [122, 62],
        [106, 112],
        [54, 112],
        [38, 62],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 4 : 2.8} fill={i === 0 ? ember : stroke} />
      ))}
      <circle cx={80} cy={80} r={9} stroke={stroke} strokeOpacity={0.2} />
      <circle cx={80} cy={80} r={2.4} fill={stroke} fillOpacity={0.55} />
    </g>
  );
}

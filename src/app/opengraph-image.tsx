import { ImageResponse } from "next/og";

export const alt = "ReinstateLabs — a technology studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, drawn rather than photographed — same ink/ember system as the
 * site so a shared link is recognisably ours.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(237,234,228,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,234,228,0.07) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -160,
            top: 120,
            width: 620,
            height: 620,
            borderRadius: 620,
            border: "1px solid rgba(226,85,43,0.45)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -60,
            top: 220,
            width: 420,
            height: 420,
            borderRadius: 420,
            border: "1px solid rgba(237,234,228,0.1)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#e2552b", display: "flex" }} />
          <div
            style={{
              color: "#7d7d84",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Technology Studio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#edeae4",
              fontSize: 116,
              lineHeight: 1,
              letterSpacing: -5,
              fontWeight: 700,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Systems that
          </div>
          <div
            style={{
              color: "#edeae4",
              fontSize: 116,
              lineHeight: 1.05,
              letterSpacing: -5,
              fontWeight: 700,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            earn their keep.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(237,234,228,0.14)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              color: "#edeae4",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -1,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            ReinstateLabs
          </div>
          <div style={{ color: "#7d7d84", fontSize: 22, letterSpacing: 3, display: "flex" }}>
            SOFTWARE · AI · INFRASTRUCTURE
          </div>
        </div>
      </div>
    ),
    size,
  );
}

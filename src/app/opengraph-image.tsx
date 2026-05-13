import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { CALCULATOR_COUNT_LABEL } from "@/constants/stats";

export const runtime = "edge";
export const alt = `${SITE.name} — ${CALCULATOR_COUNT_LABEL} calculators in one place`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #0a0f1c 0%, #0D9488 60%, #6366F1 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "white",
            color: "#0D9488",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 800,
          }}
        >
          ₹
        </div>
        <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>{SITE.name}</span>
      </div>
      <div
        style={{
          marginTop: 60,
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: -2,
          lineHeight: 1.05,
          maxWidth: 1000,
        }}
      >
        {CALCULATOR_COUNT_LABEL} calculators.
        <br />
        One fast, private app.
      </div>
      <div
        style={{
          marginTop: 32,
          fontSize: 28,
          opacity: 0.85,
          maxWidth: 900,
          lineHeight: 1.3,
        }}
      >
        Finance, math, health, conversion, date & crypto — built for everyday math.
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          gap: 16,
          fontSize: 22,
          opacity: 0.85,
        }}
      >
        <span
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          Free
        </span>
        <span
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          Works offline
        </span>
        <span
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          Zero tracking
        </span>
      </div>
    </div>,
    { ...size },
  );
}

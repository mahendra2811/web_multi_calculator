import { ImageResponse } from "next/og";
import { getCalculatorBySlug, getCategoryBySlug } from "@/constants/calculators";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_COLOR: Record<string, string> = {
  finance: "#0D9488",
  math: "#6366F1",
  health: "#22C55E",
  converter: "#F59E0B",
  datetime: "#06B6D4",
  crypto: "#A855F7",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getCalculatorBySlug(slug);
  const cat = meta ? getCategoryBySlug(meta.category) : null;
  const color = meta ? (CATEGORY_COLOR[meta.category] ?? "#0D9488") : "#0D9488";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "70px",
        background: `linear-gradient(135deg, #0a0f1c 0%, ${color} 100%)`,
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "white",
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            fontWeight: 800,
          }}
        >
          ₹
        </div>
        <span style={{ fontSize: 30, fontWeight: 700 }}>{SITE.name}</span>
        {cat && (
          <span
            style={{
              marginLeft: 12,
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {cat.name}
          </span>
        )}
      </div>
      <div
        style={{
          marginTop: 80,
          fontSize: 80,
          fontWeight: 800,
          letterSpacing: -2,
          lineHeight: 1,
          maxWidth: 1050,
        }}
      >
        {meta?.name ?? "Calculator"}
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          opacity: 0.9,
          maxWidth: 950,
          lineHeight: 1.3,
        }}
      >
        {meta?.shortDesc ?? "Open this calculator on CalcMaster"}
      </div>
      <div
        style={{
          marginTop: "auto",
          fontSize: 22,
          opacity: 0.85,
        }}
      >
        calcmaster.pooniya.com/calculator/{slug}
      </div>
    </div>,
    { ...size },
  );
}

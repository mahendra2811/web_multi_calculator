import { ImageResponse } from "next/og";
import { getBlogProvider } from "@/lib/blog/provider";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
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
  const provider = await getBlogProvider();
  const post = await provider.get(slug);
  const color = post?.category ? (CATEGORY_COLOR[post.category] ?? "#0D9488") : "#0D9488";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "70px",
        background: `linear-gradient(135deg, #0a0f1c 0%, ${color}aa 100%)`,
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "white",
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          ₹
        </div>
        <span style={{ fontSize: 28, fontWeight: 700 }}>{SITE.name} · Blog</span>
      </div>
      <div
        style={{
          marginTop: 60,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: -1.5,
          lineHeight: 1.05,
          maxWidth: 1050,
        }}
      >
        {post?.title ?? "Blog post"}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 26,
          opacity: 0.85,
          maxWidth: 950,
          lineHeight: 1.35,
        }}
      >
        {post?.excerpt ?? ""}
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 24,
          fontSize: 22,
          opacity: 0.85,
        }}
      >
        {post?.category && (
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {post.category}
          </span>
        )}
        <span>{post?.readingMinutes ?? 5} min read</span>
      </div>
    </div>,
    { ...size },
  );
}

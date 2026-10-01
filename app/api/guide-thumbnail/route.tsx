import { ImageResponse } from "next/og";
import { GUIDE_THUMBNAILS } from "@/app/lib/guideThumbnails";

export const runtime = "edge";

const palettes = {
  ranking: { bg: "#102f26", accent: "#b8f26d", soft: "#285b49" },
  comparison: { bg: "#19364d", accent: "#b9e5ff", soft: "#315d79" },
  channel: { bg: "#4b244f", accent: "#f4c4ff", soft: "#704477" },
  information: { bg: "#493821", accent: "#ffe09b", soft: "#725b35" },
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") ?? "";
  const config = GUIDE_THUMBNAILS[slug];
  if (!config) return new Response("Not found", { status: 404 });

  const palette = palettes[config.theme];
  const origin = url.origin;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: palette.bg, color: "white", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: 999, right: -110, top: -165, background: palette.soft, opacity: 0.75 }} />
        <div style={{ position: "absolute", width: 340, height: 340, borderRadius: 999, right: 160, bottom: -210, border: `2px solid ${palette.accent}`, opacity: 0.32 }} />
        <div style={{ width: "58%", padding: "66px 0 58px 68px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 3, color: palette.accent }}>{config.eyebrow}</div>
          <div style={{ display: "flex", whiteSpace: "pre-wrap", marginTop: 28, fontSize: 64, lineHeight: 1.12, fontWeight: 900, letterSpacing: -3 }}>{config.title}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "auto", gap: 16 }}>
            <div style={{ display: "flex", borderRadius: 999, padding: "12px 22px", background: palette.accent, color: palette.bg, fontSize: 24, fontWeight: 800 }}>{config.highlight}</div>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 700, opacity: 0.82 }}>ProteinLab</div>
          </div>
        </div>
        <div style={{ width: "42%", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "42px 36px 34px 0", position: "relative" }}>
          {config.productImages.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={`${origin}${src}`} alt="" width={235} height={430} style={{ objectFit: "contain", position: index === 0 ? "relative" : "absolute", right: index === 0 ? 110 : 40 + index * 92, bottom: index === 0 ? 0 : 26 + index * 6, transform: `rotate(${(index - 1) * 5}deg)`, filter: "drop-shadow(0 22px 24px rgba(0,0,0,.28))" }} />
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" } },
  );
}

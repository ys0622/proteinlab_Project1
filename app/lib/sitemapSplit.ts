import buildSitemap from "@/app/sitemap";
import googleIndexKeep from "@/app/data/googleIndexKeep.json";

/**
 * 구글 서치콘솔 진단용 분할 사이트맵(2026-10-20). /sitemap.xml(네이버 제출본)은 그대로 두고,
 * 같은 항목을 종류별로 나눠 /sitemap-{group}.xml 로 내보낸다. 서치콘솔에서 묶음별 색인률을 따로 보기 위해서다.
 */
export type SitemapGroup = "compare" | "guides" | "hubs" | "products" | "google";

// 구글 색인 허용 목록만 담은 구글 제출용 사이트맵(2026-10-26, middleware의 googlebot noindex와 같은 목록).
const GOOGLE_KEEP = new Set<string>(googleIndexKeep.paths);
const pathOf = (url: string) => url.replace(/^https?:\/\/[^/]+/, "") || "/";

function groupOf(url: string): SitemapGroup {
  const path = url.replace(/^https?:\/\/[^/]+/, "");
  if (path.startsWith("/product/")) return "products";
  if (path.startsWith("/compare/")) return "compare";
  if (path.startsWith("/guides/")) return "guides";
  return "hubs";
}

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function renderSitemapGroup(group: SitemapGroup): Promise<Response> {
  const all = await buildSitemap();
  const entries = group === "google" ? all.filter((entry) => GOOGLE_KEEP.has(pathOf(entry.url))) : all.filter((entry) => groupOf(entry.url) === group);
  const body = entries
    .map((entry) => {
      const lastmod = entry.lastModified ? `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>` : "";
      const changefreq = entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : "";
      const priority = entry.priority != null ? `<priority>${entry.priority}</priority>` : "";
      return `<url><loc>${escapeXml(entry.url)}</loc>${lastmod}${changefreq}${priority}</url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

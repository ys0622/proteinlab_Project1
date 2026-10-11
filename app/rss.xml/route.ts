import feedPageMeta from "../data/feedPageMeta.json";
import { RECENT_REVISIONS } from "../lib/recentRevisions";

const SITE_URL = "https://proteinlab.kr";
const MAX_ITEMS = 60;

const META = feedPageMeta as Record<string, { title: string; description: string }>;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// 실제로 내용이 바뀐 페이지만, 최근 수정일 순으로 낸다. pubDate는 요청 시각이 아니라 기록된 수정일이다.
function getFeedItems() {
  const latest = new Map<string, string>();
  for (const batch of RECENT_REVISIONS) {
    for (const path of batch.paths) {
      const current = latest.get(path);
      if (!current || batch.date > current) latest.set(path, batch.date);
    }
  }
  return [...latest.entries()]
    .filter(([path]) => META[path]?.title)
    .sort((a, b) => b[1].localeCompare(a[1]) || a[0].localeCompare(b[0]))
    .slice(0, MAX_ITEMS)
    .map(([path, date]) => ({ path, date, ...META[path] }));
}

export async function GET() {
  const items = getFeedItems();
  const lastBuild = items.length > 0 ? new Date(items[0].date + "T00:00:00+09:00") : new Date("2026-10-11T00:00:00+09:00");
  const itemsXml = items
    .map((item) => {
      const url = `${SITE_URL}${item.path}`;
      return [
        "<item>",
        `<title>${escapeXml(item.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${escapeXml(item.description)}</description>`,
        `<pubDate>${new Date(item.date + "T00:00:00+09:00").toUTCString()}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>ProteinLab</title>
<link>${SITE_URL}</link>
<description>단백질 음료, 단백질 바, 단백질 요거트 비교 및 가이드</description>
<language>ko</language>
<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
${itemsXml}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

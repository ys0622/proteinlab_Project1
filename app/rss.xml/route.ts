const SITE_URL = "https://proteinlab.kr";

type FeedItem = {
  title: string;
  description: string;
  path: string;
};

const feedItems: FeedItem[] = [
  {
    title: "ProteinLab 홈",
    description: "단백질 음료, 단백질 바, 단백질 요거트 비교 페이지입니다.",
    path: "/",
  },
  {
    title: "단백질 요거트 비교",
    description: "단백질 요거트 45개를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다.",
    path: "/yogurt",
  },
  {
    title: "단백질 랭킹",
    description: "단백질 음료, 단백질 바, 단백질 요거트 순위를 비교합니다.",
    path: "/ranking",
  },
  {
    title: "단백질 추천",
    description: "나에게 맞는 단백질 음료, 바, 요거트를 추천합니다.",
    path: "/recommend",
  },
  {
    title: "고단백 단백질 요거트 추천",
    description: "단백질 함량이 높은 단백질 요거트를 비교합니다.",
    path: "/curation/yogurt-high-protein",
  },
  {
    title: "저당 단백질 요거트 추천",
    description: "당류 부담이 적은 단백질 요거트를 비교합니다.",
    path: "/curation/yogurt-low-sugar",
  },
  {
    title: "그릭 단백질 요거트 추천",
    description: "그릭 타입 단백질 요거트를 비교합니다.",
    path: "/curation/yogurt-greek",
  },
  {
    title: "드링킹 단백질 요거트 추천",
    description: "마시는 단백질 요거트를 비교합니다.",
    path: "/curation/yogurt-drinking",
  },
  {
    title: "대용량 단백질 요거트 추천",
    description: "400g 이상 대용량 단백질 요거트를 비교합니다.",
    path: "/curation/yogurt-bulk",
  },
  {
    title: "단백질 요거트 추천 기준",
    description: "단백질 요거트를 고를 때 그릭, 드링킹, 대용량을 어떻게 나눠 봐야 하는지 정리합니다.",
    path: "/guides/product-selection-comparison/protein-yogurt-guide",
  },
  {
    title: "그릭요거트 추천 기준",
    description: "그릭요거트의 단백질 함량, 단백질 밀도, 당류 기준을 정리합니다.",
    path: "/guides/product-selection-comparison/greek-yogurt-guide",
  },
  {
    title: "저당 단백질 요거트 추천 기준",
    description: "당류 5g 이하 기준으로 저당 단백질 요거트를 비교하는 방법을 정리합니다.",
    path: "/guides/product-selection-comparison/low-sugar-yogurt-guide",
  },
  {
    title: "드링킹 단백질 요거트 추천 기준",
    description: "드링킹 단백질 요거트의 용량, 단백질, 당류 비교 기준을 정리합니다.",
    path: "/guides/product-selection-comparison/drinking-yogurt-guide",
  },
  {
    title: "단백질 요거트 순위 읽는 법",
    description: "단백질 요거트 랭킹과 등급 기준을 해석하는 방법을 정리합니다.",
    path: "/guides/product-selection-comparison/protein-yogurt-ranking-guide",
  },
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const now = new Date().toUTCString();
  const itemsXml = feedItems
    .map((item) => {
      const url = `${SITE_URL}${item.path}`;
      return [
        "<item>",
        `<title>${escapeXml(item.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${escapeXml(item.description)}</description>`,
        `<pubDate>${now}</pubDate>`,
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
<lastBuildDate>${now}</lastBuildDate>
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

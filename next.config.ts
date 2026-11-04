import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  staticPageGenerationTimeout: 180,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    cpus: 1,
  },
  images: {
    unoptimized: true, // Cloudflare Images 바인딩 없이 배포 (Windows 호환)
  },
  // 2026-11-05: 영구 이동은 308 대신 301. 네이버 검색로봇의 308 처리는 공식 문서로 확인되지 않음(구글은 둘을 같게 본다).
  async redirects() {
    return [
      {
        source: "/drink",
        destination: "/drinks",
        statusCode: 301,
      },
      {
        // 2026-10-31 Scott: 이벤트/핫딜(10월 조회 18·쿠팡 클릭 0) → 매일 자동 갱신되는 골드박스로 대체
        source: "/official-events",
        destination: "/goldbox",
        statusCode: 301,
      },
      {
        source: "/feed",
        destination: "/rss.xml",
        statusCode: 301,
      },
      {
        source: "/insights/history",
        destination: "/guides/market-insights/protein-market-history",
        statusCode: 301,
      },
      {
        source: "/guides/insights/history",
        destination: "/guides/market-insights/protein-market-history",
        statusCode: 301,
      },
      {
        source: "/guides/protein-basics/protein-absorption",
        destination: "/guides/basics/digestion",
        statusCode: 301,
      },
      {
        source: "/guides/protein-basics/protein-intake-amount",
        destination: "/guides/basics/daily-requirement",
        statusCode: 301,
      },
      {
        source: "/guides/protein-basics/protein-health-impact",
        destination: "/guides/basics/immunity-hormone",
        statusCode: 301,
      },
      {
        source: "/guides/protein-basics/protein-types",
        destination: "/guides/basics/protein-drink-vs-powder",
        statusCode: 301,
      },
      {
        source: "/guides/protein-basics/protein-basics-overview",
        destination: "/guides/basics/role-overview",
        statusCode: 301,
      },
      // 2026-10-14 가이드 통합: 같은 주제 페이지를 대표 페이지로 모은다(docs/guide-consolidation-plan-2026-10-14.md).
      { source: "/guides/fitness-lifestyle/marathon-protein-guide", destination: "/guides/running/race-week", statusCode: 301 },
      { source: "/guides/fitness-lifestyle/running-protein-guide", destination: "/guides/running/basics", statusCode: 301 },
      { source: "/guides/basics/protein-deficiency-self-check", destination: "/guides/basics/deficiency-symptoms", statusCode: 301 },
      { source: "/guides/product-selection-comparison/nutrition-comparison", destination: "/guides/product-selection-comparison/nutrition-criteria", statusCode: 301 },
      { source: "/guides/fitness-lifestyle/convenience-store-workout-protein", destination: "/guides/product-selection-comparison/convenience-store-protein-guide", statusCode: 301 },
      { source: "/guides/intake-strategy-health/protein-drink-meal-replacement", destination: "/guides/intake-strategy-health/meal-replacement-strategy", statusCode: 301 },
      { source: "/guides/intake-strategy-health/diet-protein-drink-strategy", destination: "/guides/product-selection-comparison/diet-protein-drink-guide", statusCode: 301 },
      { source: "/guides/product-selection-comparison/protein-bar-guide", destination: "/guides/product-selection-comparison/protein-bar-top10", statusCode: 301 },
      { source: "/guides/product-selection-comparison/protein-yogurt-guide", destination: "/guides/product-selection-comparison/protein-yogurt-top5", statusCode: 301 },
      { source: "/guides/product-selection-comparison/protein-yogurt-ranking-guide", destination: "/guides/product-selection-comparison/protein-yogurt-top5", statusCode: 301 },
      { source: "/guides/product-selection-comparison/newcare-water-vs-rtd", destination: "/guides/product-selection-comparison/newcare-protein-water-guide", statusCode: 301 },
      { source: "/compare/doctoru-vs-benof-softbar", destination: "/compare/doctoru-vs-benof-bar", statusCode: 301 },
      { source: "/guides/fitness-lifestyle/spring-diet-protein-guide", destination: "/guides/intake-strategy-health/weight-management-protein", statusCode: 301 },
      { source: "/guides/fitness-lifestyle/spring-running-start-guide", destination: "/guides/running/basics", statusCode: 301 },
      { source: "/guides/intake-strategy-health/protein-drink-mainstream-shift", destination: "/guides/market-insights/protein-drink-trend-2026", statusCode: 301 },
      { source: "/guides/product-selection-comparison/newcare-low-sugar-guide", destination: "/guides/product-selection-comparison/newcare-allprotein", statusCode: 301 },
      { source: "/guides/product-selection-comparison/newcare-box-value", destination: "/guides/product-selection-comparison/newcare-allprotein", statusCode: 301 },
      // 2026-10-24 Scott 승인: 네이버 '프로티원' 노출을 두 페이지가 나눠 가져 비교 페이지로 모은다(docs/funnel-naver-analysis-2026-10-24.md).
      { source: "/guides/product-selection-comparison/proteone-protein-shake", destination: "/compare/proteone-vs-itthefit-shake", statusCode: 301 },
    ];
  },
};

export default nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}

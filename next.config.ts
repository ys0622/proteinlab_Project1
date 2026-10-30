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
  async redirects() {
    return [
      {
        source: "/drink",
        destination: "/drinks",
        permanent: true,
      },
      {
        // 2026-10-31 Scott: 이벤트/핫딜(10월 조회 18·쿠팡 클릭 0) → 매일 자동 갱신되는 골드박스로 대체
        source: "/official-events",
        destination: "/goldbox",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/rss.xml",
        permanent: true,
      },
      {
        source: "/insights/history",
        destination: "/guides/market-insights/protein-market-history",
        permanent: true,
      },
      {
        source: "/guides/insights/history",
        destination: "/guides/market-insights/protein-market-history",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-absorption",
        destination: "/guides/basics/digestion",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-intake-amount",
        destination: "/guides/basics/daily-requirement",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-health-impact",
        destination: "/guides/basics/immunity-hormone",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-types",
        destination: "/guides/basics/protein-drink-vs-powder",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-basics-overview",
        destination: "/guides/basics/role-overview",
        permanent: true,
      },
      // 2026-10-14 가이드 통합: 같은 주제 페이지를 대표 페이지로 모은다(docs/guide-consolidation-plan-2026-10-14.md).
      { source: "/guides/fitness-lifestyle/marathon-protein-guide", destination: "/guides/running/race-week", permanent: true },
      { source: "/guides/fitness-lifestyle/running-protein-guide", destination: "/guides/running/basics", permanent: true },
      { source: "/guides/basics/protein-deficiency-self-check", destination: "/guides/basics/deficiency-symptoms", permanent: true },
      { source: "/guides/product-selection-comparison/nutrition-comparison", destination: "/guides/product-selection-comparison/nutrition-criteria", permanent: true },
      { source: "/guides/fitness-lifestyle/convenience-store-workout-protein", destination: "/guides/product-selection-comparison/convenience-store-protein-guide", permanent: true },
      { source: "/guides/intake-strategy-health/protein-drink-meal-replacement", destination: "/guides/intake-strategy-health/meal-replacement-strategy", permanent: true },
      { source: "/guides/intake-strategy-health/diet-protein-drink-strategy", destination: "/guides/product-selection-comparison/diet-protein-drink-guide", permanent: true },
      { source: "/guides/product-selection-comparison/protein-bar-guide", destination: "/guides/product-selection-comparison/protein-bar-top10", permanent: true },
      { source: "/guides/product-selection-comparison/protein-yogurt-guide", destination: "/guides/product-selection-comparison/protein-yogurt-top5", permanent: true },
      { source: "/guides/product-selection-comparison/protein-yogurt-ranking-guide", destination: "/guides/product-selection-comparison/protein-yogurt-top5", permanent: true },
      { source: "/guides/product-selection-comparison/newcare-water-vs-rtd", destination: "/guides/product-selection-comparison/newcare-protein-water-guide", permanent: true },
      { source: "/compare/doctoru-vs-benof-softbar", destination: "/compare/doctoru-vs-benof-bar", permanent: true },
      { source: "/guides/fitness-lifestyle/spring-diet-protein-guide", destination: "/guides/intake-strategy-health/weight-management-protein", permanent: true },
      { source: "/guides/fitness-lifestyle/spring-running-start-guide", destination: "/guides/running/basics", permanent: true },
      { source: "/guides/intake-strategy-health/protein-drink-mainstream-shift", destination: "/guides/market-insights/protein-drink-trend-2026", permanent: true },
      { source: "/guides/product-selection-comparison/newcare-low-sugar-guide", destination: "/guides/product-selection-comparison/newcare-allprotein", permanent: true },
      { source: "/guides/product-selection-comparison/newcare-box-value", destination: "/guides/product-selection-comparison/newcare-allprotein", permanent: true },
      // 2026-10-24 Scott 승인: 네이버 '프로티원' 노출을 두 페이지가 나눠 가져 비교 페이지로 모은다(docs/funnel-naver-analysis-2026-10-24.md).
      { source: "/guides/product-selection-comparison/proteone-protein-shake", destination: "/compare/proteone-vs-itthefit-shake", permanent: true },
    ];
  },
};

export default nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}

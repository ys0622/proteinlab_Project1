import type { MetadataRoute } from "next";
import { getAllCompareLandings } from "./data/compareLandings";
import { getAllSearchTopics } from "./data/searchTopics";
import { getAllCurations } from "./lib/curationSystem";
import { getBrandSummary } from "./lib/brandHubs";
import { getAllPickSlugs } from "./data/picksConfig";
import { getAllCompareGuideConfigs } from "./guides/product-selection-comparison/compareGuideContent";
import {
  mockProducts,
  barProductsWithGrades,
  shakeProducts,
  yogurtProductsWithGrades,
} from "./data/products";

const SITE_URL = "https://proteinlab.kr";

// Known last-modified dates for key pages (avoid lying to Google with new Date())
const PAGE_DATES: Record<string, string> = {
  "/": "2026-06-28",
  "/drinks": "2026-07-15",
  "/bars": "2026-07-15",
  "/shake": "2026-07-15",
  "/yogurt": "2026-07-15",
  "/products": "2026-06-28",
  "/ranking": "2026-07-15",
  "/trending": "2026-07-03",
  "/recommend": "2026-07-15",
  "/guides": "2026-07-20",
  "/guides/market-insights/new-product-analysis": "2026-08-17",
  "/guides/intake-strategy-health/protein-drink-daily": "2026-07-20",
  "/guides/intake-strategy-health/protein-drink-diarrhea": "2026-07-20",
  "/guides/intake-strategy-health/protein-drink-empty-stomach": "2026-07-20",
  "/guides/intake-strategy-health/protein-drink-sugar": "2026-07-20",
  "/guides/intake-strategy-health/protein-drink-weight-gain": "2026-07-20",
  "/guides/product-selection-comparison/protein-drink-vs-protein-shake": "2026-07-20",
  "/guides/basics/daily-requirement": "2026-06-01",
  "/guides/basics/deficiency-symptoms": "2026-06-01",
  "/guides/basics/digestion": "2026-06-01",
  "/guides/basics/immunity-hormone": "2026-06-01",
  "/guides/basics/muscle": "2026-06-01",
  "/guides/basics/protein-deficiency-self-check": "2026-06-01",
  "/guides/basics/protein-drink-vs-powder": "2026-06-01",
  "/guides/basics/role-overview": "2026-06-01",
  "/official-events": "2026-06-28",
  "/compare": "2026-07-15",
  "/topics": "2026-07-20",
  "/brands": "2026-06-01",
  "/about": "2026-03-01",
  "/contact": "2026-03-01",
  "/privacy": "2026-03-01",
  "/disclaimer": "2026-03-01",
  "/cookie-settings": "2026-03-01",
  "/grade-criteria": "2026-06-01",
  "/search": "2026-06-01",
};

const FALLBACK_GUIDE_DATE = "2026-06-01";
const FALLBACK_PRODUCT_DATE = "2026-07-15";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/disclaimer",
  "/cookie-settings",
  "/drinks",
  "/bars",
  "/products",
  "/recommend",
  "/ranking",
  "/trending",
  "/grade-criteria",
  "/guides",
  "/official-events",
  "/compare",
  "/shake",
  "/yogurt",
  "/topics",
  "/brands",
  "/search",
] as const;

const REDIRECT_ONLY_ROUTES = new Set([
  "/curation/running/bar",
  "/curation/running/drink",
  "/guides/basics",
  "/guides/by-goal",
  "/guides/how-to-choose",
  "/guides/how-to-choose/checklist",
  "/guides/ingredients",
  "/guides/ingredients/bcaa-guide",
  "/guides/ingredients/zero-sugar-allulose",
  "/guides/product-selection-comparison/doctoru-lineup",
]);

// Static guide routes — generated from app/guides directory (no fs at runtime)
const STATIC_GUIDE_ROUTES: string[] = [
  "/guides/basics/daily-requirement",
  "/guides/basics/deficiency-symptoms",
  "/guides/basics/digestion",
  "/guides/basics/immunity-hormone",
  "/guides/basics/muscle",
  "/guides/basics/protein-deficiency-self-check",
  "/guides/basics/protein-drink-vs-powder",
  "/guides/basics/role-overview",
  "/guides/fitness-lifestyle/beginner-workout-guide",
  "/guides/fitness-lifestyle/commute-protein-guide",
  "/guides/fitness-lifestyle/convenience-store-workout-protein",
  "/guides/fitness-lifestyle/marathon-distance-strategy",
  "/guides/fitness-lifestyle/marathon-protein-guide",
  "/guides/fitness-lifestyle/office-worker-protein-routine",
  "/guides/fitness-lifestyle/running-protein-category-guide",
  "/guides/fitness-lifestyle/running-protein-guide",
  "/guides/fitness-lifestyle/sports-nutrition-guide",
  "/guides/fitness-lifestyle/spring-diet-protein-guide",
  "/guides/fitness-lifestyle/spring-outdoor-protein-snack-guide",
  "/guides/fitness-lifestyle/spring-running-start-guide",
  "/guides/fitness-lifestyle/strength-training-protein",
  "/guides/intake-strategy-health/diet-protein-drink-strategy",
  "/guides/intake-strategy-health/high-protein-side-effects",
  "/guides/intake-strategy-health/lean-massup-protein-intake",
  "/guides/intake-strategy-health/light-protein-under-20g",
  "/guides/intake-strategy-health/protein-drink-mainstream-shift",
  "/guides/intake-strategy-health/meal-replacement-strategy",
  "/guides/intake-strategy-health/morning-protein-drink",
  "/guides/intake-strategy-health/muscle-maintenance-protein",
  "/guides/intake-strategy-health/night-protein-drink",
  "/guides/intake-strategy-health/post-workout-protein",
  "/guides/intake-strategy-health/pre-workout-protein",
  "/guides/intake-strategy-health/protein-50g-at-once",
  "/guides/intake-strategy-health/protein-drink-daily",
  "/guides/intake-strategy-health/protein-drink-diarrhea",
  "/guides/intake-strategy-health/protein-drink-empty-stomach",
  "/guides/intake-strategy-health/protein-drink-meal-replacement",
  "/guides/intake-strategy-health/protein-drink-sugar",
  "/guides/intake-strategy-health/protein-drink-weight-gain",
  "/guides/intake-strategy-health/protein-drink-without-exercise",
  "/guides/intake-strategy-health/protein-timing",
  "/guides/intake-strategy-health/senior-protein-strategy",
  "/guides/intake-strategy-health/weight-management-protein",
  "/guides/market-insights/brand-analysis",
  "/guides/market-insights/global-protein-market",
  "/guides/market-insights/ingredient-trends",
  "/guides/market-insights/new-product-analysis",
  "/guides/market-insights/protein-drink-ad-checklist",
  "/guides/market-insights/protein-content-interest-data",
  "/guides/market-insights/protein-drink-trend-2026",
  "/guides/market-insights/protein-market-history",
  "/guides/market-insights/protein-rtd-market",
  "/guides/market-insights/seoulmilk-protein-energy",
  "/guides/product-selection-comparison/convenience-protein-bar",
  "/guides/product-selection-comparison/convenience-store-protein-guide",
  "/guides/product-selection-comparison/danbaekhani-protein-shake",
  "/guides/product-selection-comparison/danbaek-lineup",
  "/guides/product-selection-comparison/danbaek-vs-himune",
  "/guides/product-selection-comparison/danbaek-vs-selexs",
  "/guides/product-selection-comparison/diet-protein-bar",
  "/guides/product-selection-comparison/diet-protein-drink-guide",
  "/guides/product-selection-comparison/diet-protein-shake",
  "/guides/product-selection-comparison/diet-protein-yogurt",
  "/guides/product-selection-comparison/doctoru-40g-vs-takefit-monster-43g",
  "/guides/product-selection-comparison/drinking-yogurt-guide",
  "/guides/product-selection-comparison/dryou-lineup",
  "/guides/product-selection-comparison/flymill-protein-shake",
  "/guides/product-selection-comparison/flymill-vs-danbaekhani",
  "/guides/product-selection-comparison/greek-vs-protein-yogurt",
  "/guides/product-selection-comparison/greek-yogurt-guide",
  "/guides/product-selection-comparison/high-protein-40g-comparison",
  "/guides/product-selection-comparison/high-protein-50g-comparison",
  "/guides/product-selection-comparison/himune-lineup",
  "/guides/product-selection-comparison/labnoshe-slim-shake",
  "/guides/product-selection-comparison/labnosh-lineup",
  "/guides/product-selection-comparison/lactose-free-protein-drink",
  "/guides/product-selection-comparison/low-calorie-protein-products-guide",
  "/guides/product-selection-comparison/low-sugar-protein-drink-guide",
  "/guides/product-selection-comparison/low-sugar-protein-products-guide",
  "/guides/product-selection-comparison/low-sugar-protein-shake-guide",
  "/guides/product-selection-comparison/low-sugar-yogurt-guide",
  "/guides/product-selection-comparison/meal-replacement-protein-bar-guide",
  "/guides/product-selection-comparison/meal-replacement-protein-shake-guide",
  "/guides/product-selection-comparison/morning-protein-products-guide",
  "/guides/product-selection-comparison/morning-protein-shake",
  "/guides/product-selection-comparison/newcare-41g-vs-25g",
  "/guides/product-selection-comparison/newcare-allprotein",
  "/guides/product-selection-comparison/newcare-box-value",
  "/guides/product-selection-comparison/newcare-for-50s",
  "/guides/product-selection-comparison/newcare-low-sugar-guide",
  "/guides/product-selection-comparison/newcare-plant-vs-lactosefree",
  "/guides/product-selection-comparison/newcare-protein-water-guide",
  "/guides/product-selection-comparison/newcare-vs-hymune",
  "/guides/product-selection-comparison/newcare-vs-sellex",
  "/guides/product-selection-comparison/newcare-water-vs-rtd",
  "/guides/product-selection-comparison/nutrition-comparison",
  "/guides/product-selection-comparison/nutrition-criteria",
  "/guides/product-selection-comparison/oliveyoung-protein-products-guide",
  "/guides/product-selection-comparison/oliveyoung-protein-shake",
  "/guides/product-selection-comparison/post-workout-protein-shake-guide",
  "/guides/product-selection-comparison/protein-bar-guide",
  "/guides/product-selection-comparison/protein-bar-top10",
  "/guides/product-selection-comparison/protein-category-guide",
  "/guides/product-selection-comparison/protein-density-ranking",
  "/guides/product-selection-comparison/protein-drink-beginners-guide",
  "/guides/product-selection-comparison/protein-drink-box-value",
  "/guides/product-selection-comparison/protein-drink-by-content",
  "/guides/product-selection-comparison/protein-drink-by-flavor",
  "/guides/product-selection-comparison/protein-drink-for-50s",
  "/guides/product-selection-comparison/protein-drink-for-diabetes",
  "/guides/product-selection-comparison/protein-drink-guide",
  "/guides/product-selection-comparison/protein-drink-taste-tips",
  "/guides/product-selection-comparison/protein-drink-top10",
  "/guides/product-selection-comparison/protein-drink-vs-protein-shake",
  "/guides/product-selection-comparison/protein-shake-calorie-ranking",
  "/guides/product-selection-comparison/protein-shake-for-women",
  "/guides/product-selection-comparison/protein-shake-guide",
  "/guides/product-selection-comparison/protein-shake-top7",
  "/guides/product-selection-comparison/protein-yogurt-guide",
  "/guides/product-selection-comparison/protein-yogurt-ranking-guide",
  "/guides/product-selection-comparison/protein-yogurt-top5",
  "/guides/product-selection-comparison/proteone-protein-shake",
  "/guides/product-selection-comparison/ranking-content",
  "/guides/product-selection-comparison/recommendation-lists",
  "/guides/product-selection-comparison/selexs-lineup",
  "/guides/product-selection-comparison/selex-vs-himune",
  "/guides/product-selection-comparison/selex-vs-takefit-vs-himune",
  "/guides/product-selection-comparison/takefit-lineup",
  "/guides/product-selection-comparison/takefit-vs-himune",
  "/guides/product-selection-comparison/unsweetened-greek-yogurt-guide",
  "/guides/running/basics",
  "/guides/running/race-week",
  "/guides/tools",
].filter((r) => !REDIRECT_ONLY_ROUTES.has(r));

const STATIC_CURATION_ROUTES: string[] = [
  "/curation/running",
].filter((r) => !REDIRECT_ONLY_ROUTES.has(r));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const compareGuideLastModified = new Map(
    getAllCompareGuideConfigs().map((config) => [
      `/guides/product-selection-comparison/${config.slug}`,
      config.updatedAt ? new Date(config.updatedAt) : new Date(FALLBACK_GUIDE_DATE),
    ]),
  );

  const curationRoutes = getAllCurations().map((curation) => `/curation/${curation.slug}`);
  const topicRoutes = getAllSearchTopics().map((topic) => `/topics/${topic.slug}`);
  const compareRoutes = getAllCompareLandings().map((landing) => `/compare/${landing.slug}`);
  const pickRoutes = getAllPickSlugs().map((slug) => `/picks/${slug}`);

  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...STATIC_GUIDE_ROUTES,
      ...STATIC_CURATION_ROUTES,
      ...curationRoutes,
      ...topicRoutes,
      ...compareRoutes,
      ...pickRoutes,
    ]),
  );

  const allProducts = [
    ...mockProducts,
    ...barProductsWithGrades,
    ...shakeProducts,
    ...yogurtProductsWithGrades,
  ];
  const productRoutes = allProducts
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug! }));
  const brandEntries: MetadataRoute.Sitemap = getBrandSummary(allProducts).map((brand) => ({
    url: `${SITE_URL}/brands/${brand.slug}`,
    lastModified: new Date("2026-03-01"),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const staticEntries: MetadataRoute.Sitemap = allRoutes.map((route) => {
    const configDate = compareGuideLastModified.get(route);
    const knownDate = PAGE_DATES[route];
    const lastModified = configDate ?? (knownDate ? new Date(knownDate) : new Date(FALLBACK_GUIDE_DATE));
    return {
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency:
        route === "/" || route === "/drinks" || route === "/bars" || route === "/yogurt" || route === "/shake" || route === "/ranking"
          ? ("daily" as const)
          : route.startsWith("/guides/") || route.startsWith("/curation/") || route.startsWith("/topics/") || route.startsWith("/compare/") || route.startsWith("/picks/")
            ? ("weekly" as const)
            : ("monthly" as const),
      priority:
        route === "/"
          ? 1
          : route === "/guides" || route === "/recommend" || route === "/ranking"
            ? 0.9
            : route === "/drinks" || route === "/bars" || route === "/yogurt" || route === "/shake"
              ? 0.88
              : route.startsWith("/curation/")
                ? 0.85
                : route.startsWith("/picks/")
                  ? 0.84
                  : route.startsWith("/topics/")
                    ? 0.83
                    : route.startsWith("/compare/")
                      ? 0.82
                      : route.startsWith("/guides/")
                        ? 0.8
                        : 0.7,
    };
  });

  const productEntries: MetadataRoute.Sitemap = productRoutes.map(({ slug }) => ({
    url: `${SITE_URL}/product/${slug}`,
    lastModified: new Date(FALLBACK_PRODUCT_DATE),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...brandEntries, ...productEntries];
}

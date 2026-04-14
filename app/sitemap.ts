import fs from "node:fs/promises";
import path from "node:path";
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
const APP_DIR = path.join(process.cwd(), "app");

const staticRoutes = [
  "/",
  "/drinks",
  "/bars",
  "/recommend",
  "/ranking",
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

async function collectStaticRoutesFromApp(relativeDir: string, basePath: string) {
  const routes = new Set<string>();

  async function walk(currentDir: string, segments: string[]) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    const hasPage = entries.some((entry) => entry.isFile() && entry.name === "page.tsx");
    const route = `${basePath}${segments.length ? `/${segments.join("/")}` : ""}`;

    if (hasPage && !REDIRECT_ONLY_ROUTES.has(route)) {
      routes.add(route);
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith("[")) continue;
      await walk(path.join(currentDir, entry.name), [...segments, entry.name]);
    }
  }

  await walk(path.join(APP_DIR, relativeDir), []);
  return [...routes];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const compareGuideLastModified = new Map(
    getAllCompareGuideConfigs().map((config) => [
      `/guides/product-selection-comparison/${config.slug}`,
      config.updatedAt ? new Date(config.updatedAt) : new Date(),
    ]),
  );

  const [guideRoutes, curationStaticRoutes] = await Promise.all([
    collectStaticRoutesFromApp("guides", "/guides"),
    collectStaticRoutesFromApp("curation", "/curation"),
  ]);

  const curationRoutes = getAllCurations().map((curation) => `/curation/${curation.slug}`);
  const topicRoutes = getAllSearchTopics().map((topic) => `/topics/${topic.slug}`);
  const compareRoutes = getAllCompareLandings().map((landing) => `/compare/${landing.slug}`);
  const pickRoutes = getAllPickSlugs().map((slug) => `/picks/${slug}`);
  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...guideRoutes,
      ...curationStaticRoutes,
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
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.72,
  }));

  const staticEntries: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: compareGuideLastModified.get(route) ?? new Date(),
    changeFrequency:
      route.startsWith("/guides/") ||
      route.startsWith("/curation/") ||
      route.startsWith("/topics/") ||
      route.startsWith("/compare/") ||
      route.startsWith("/picks/")
        ? "weekly"
        : "daily",
    priority:
      route === "/"
        ? 1
        : route === "/guides" || route === "/recommend" || route === "/ranking"
          ? 0.9
          : route === "/drinks" || route === "/bars" || route === "/yogurt" || route === "/shake"
            ? 0.88
            : route === "/products"
              ? 0.85
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
  }));

  const productEntries: MetadataRoute.Sitemap = productRoutes.map(({ slug }) => ({
    url: `${SITE_URL}/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticEntries, ...brandEntries, ...productEntries];
}

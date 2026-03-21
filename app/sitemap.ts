import fs from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getAllCompareLandings } from "./data/compareLandings";
import { getAllSearchTopics } from "./data/searchTopics";
import { getAllCurations } from "./lib/curationSystem";
import { getBrandSummary } from "./lib/brandHubs";
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
  "/favorites",
] as const;

async function collectStaticRoutesFromApp(relativeDir: string, basePath: string) {
  const routes = new Set<string>();

  async function walk(currentDir: string, segments: string[]) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    const hasPage = entries.some((entry) => entry.isFile() && entry.name === "page.tsx");

    if (hasPage) {
      routes.add(`${basePath}${segments.length ? `/${segments.join("/")}` : ""}`);
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
  const [guideRoutes, curationStaticRoutes] = await Promise.all([
    collectStaticRoutesFromApp("guides", "/guides"),
    collectStaticRoutesFromApp("curation", "/curation"),
  ]);

  const curationRoutes = getAllCurations().map((curation) => `/curation/${curation.slug}`);
  const topicRoutes = getAllSearchTopics().map((topic) => `/topics/${topic.slug}`);
  const compareRoutes = getAllCompareLandings().map((landing) => `/compare/${landing.slug}`);
  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...guideRoutes,
      ...curationStaticRoutes,
      ...curationRoutes,
      ...topicRoutes,
      ...compareRoutes,
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
    lastModified: new Date(),
    changeFrequency:
      route.startsWith("/guides/") ||
      route.startsWith("/curation/") ||
      route.startsWith("/topics/") ||
      route.startsWith("/compare/")
        ? "weekly"
        : "daily",
    priority:
      route === "/"
        ? 1
        : route === "/guides" || route === "/recommend" || route === "/ranking"
          ? 0.9
          : route.startsWith("/curation/")
            ? 0.85
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

#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const today = new Date().toISOString().slice(0, 10);

const productFiles = [
  ["drink", "app/data/drinkProductsData.json"],
  ["bar", "app/data/barProductsData.json"],
  ["yogurt", "app/data/yogurtProductsData.json"],
  ["shake", "app/data/shakeProductsData.json"],
];

const topLandingPages = [
  {
    priority: 1,
    path: "/compare/proteone-vs-itthefit-shake",
    sourceFiles: ["app/compare/[slug]/page.tsx", "app/data/compareLandings.ts"],
    products: ["proteone-proteinshake-choco-40", "itthefit-proteinshake-double-choco-40"],
  },
  {
    priority: 2,
    path: "/compare/takefit-vs-hymune-drink",
    sourceFiles: ["app/compare/[slug]/page.tsx", "app/data/compareLandings.ts"],
    products: ["takefit-max-choco-250", "hymune-balance-active-deepchoco-250"],
  },
  {
    priority: 3,
    path: "/guides/intake-strategy-health/night-protein-drink",
    sourceFiles: ["app/guides/intake-strategy-health/night-protein-drink/page.tsx"],
    products: [],
  },
  {
    priority: 4,
    path: "/guides/product-selection-comparison/protein-bar-top10",
    sourceFiles: [
      "app/guides/product-selection-comparison/protein-bar-top10/page.tsx",
      "app/guides/product-selection-comparison/proteinBarContent.ts",
    ],
    products: [],
  },
  {
    priority: 5,
    path: "/guides/product-selection-comparison/protein-drink-top10",
    sourceFiles: [
      "app/guides/product-selection-comparison/protein-drink-top10/page.tsx",
      "app/guides/product-selection-comparison/proteinDrinkTop10Content.ts",
    ],
    products: [],
  },
  {
    priority: 6,
    path: "/guides/product-selection-comparison/low-sugar-protein-drink-guide",
    sourceFiles: ["app/guides/product-selection-comparison/low-sugar-protein-drink-guide/page.tsx"],
    products: [],
  },
  {
    priority: 7,
    path: "/compare/newcare-vs-sellex-drink",
    sourceFiles: ["app/compare/[slug]/page.tsx", "app/data/compareLandings.ts"],
    products: ["newcare-all-protein-choco-245", "sellex-profit-milk-vanilla-250"],
  },
  {
    priority: 8,
    path: "/compare/takefit-max-vs-takefit-monster",
    sourceFiles: ["app/compare/[slug]/page.tsx", "app/data/compareLandings.ts"],
    products: ["takefit-max-goso-250", "takefit-monster-goso-350"],
  },
  {
    priority: 9,
    path: "/product/newcare-all-protein-41g",
    sourceFiles: ["app/product/[slug]/page.tsx"],
    products: ["newcare-all-protein-41g"],
  },
  {
    priority: 10,
    path: "/product/labnosh-protein-max-choco-400",
    sourceFiles: ["app/product/[slug]/page.tsx"],
    products: ["labnosh-protein-max-choco-400"],
  },
];

function readText(relativePath) {
  const path = join(root, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8").replace(/^\uFEFF/, "") : "";
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function ensureDocs() {
  const docsPath = join(root, "docs");
  if (!existsSync(docsPath)) {
    throw new Error("docs directory is missing");
  }
}

function walkFiles(relativeDir, predicate, results = []) {
  const absoluteDir = join(root, relativeDir);
  if (!existsSync(absoluteDir)) return results;
  for (const entry of readdirSync(absoluteDir)) {
    const absolute = join(absoluteDir, entry);
    const relative = join(relativeDir, entry).replaceAll("\\", "/");
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      walkFiles(relative, predicate, results);
    } else if (predicate(relative)) {
      results.push(relative);
    }
  }
  return results;
}

function countMatches(text, regex) {
  return [...text.matchAll(regex)].length;
}

function hasAny(product, keys) {
  return keys.some((key) => product[key] != null && product[key] !== "");
}

function toSlugLabel(slug) {
  return String(slug ?? "")
    .split("-")
    .filter(Boolean)
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function hasProductImage(product) {
  return hasAny(product, ["image", "imageUrl", "thumbnail", "thumbnailUrl", "img", "imagePath"]);
}

function normalizeUrl(value) {
  if (!value || value === "#") return "";
  return String(value).trim();
}

function classifyUrl(value) {
  const url = normalizeUrl(value);
  if (!url) return "MISSING";
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (host === "link.coupang.com" || host.endsWith(".link.coupang.com")) return "COUPANG_AFFILIATE_OR_SHORTLINK";
    if (host.includes("coupang.com")) return "COUPANG_REGULAR";
    if (host.includes("naver.com")) return "NAVER";
    return "OTHER";
  } catch {
    return "INVALID";
  }
}

function findEventOccurrences() {
  const files = [
    ...walkFiles("app", (file) => /\.(tsx?|jsx?)$/.test(file)),
    ...walkFiles("lib", (file) => /\.(tsx?|jsx?)$/.test(file)),
    ...walkFiles("components", (file) => /\.(tsx?|jsx?)$/.test(file)),
  ];
  const eventNames = [
    "pageView",
    "productCardClick",
    "internalCtaClick",
    "affiliateClick",
    "retailerClick",
    "compareAdd",
    "compareView",
    "filterApply",
    "sortApply",
    "recommendStart",
    "recommendComplete",
  ];

  return eventNames.map((eventName) => {
    const occurrences = [];
    for (const file of files) {
      const text = readText(file);
      const count = countMatches(text, new RegExp(`\\b${eventName}\\s*\\(`, "g"));
      if (count > 0) occurrences.push({ file, count });
    }
    return { eventName, occurrences };
  });
}

function loadProducts() {
  return productFiles.flatMap(([category, file]) => readJson(file).map((product) => ({ ...product, category })));
}

function makeCtaCoverageReport(productsBySlug) {
  const rows = topLandingPages.map((page) => {
    const sourceText = page.sourceFiles.map(readText).join("\n");
    const trackedLinkCount = countMatches(sourceText, /<TrackedLink\b/g);
    const productHrefCount = countMatches(sourceText, /\/product\//g);
    const compareHrefCount = countMatches(sourceText, /\/compare/g);
    const retailerMentions = countMatches(sourceText, /retailerClick|coupang|purchase|구매처|구매/g);
    const productCoverage = page.products.map((slug) => (productsBySlug.has(slug) ? "OK" : `MISSING:${slug}`)).join(", ");
    const status =
      trackedLinkCount > 0 && (productHrefCount > 0 || page.path.startsWith("/product/"))
        ? "OK_STATIC"
        : trackedLinkCount > 0
          ? "REVIEW_TARGET"
          : "WEAK_OR_UNKNOWN";
    const recommendedAction =
      status === "OK_STATIC"
        ? "Keep; verify event delivery in browser."
        : "Review whether product-detail and compare CTAs are visible above or within the first decision section.";
    return { ...page, trackedLinkCount, productHrefCount, compareHrefCount, retailerMentions, productCoverage, status, recommendedAction };
  });

  const body = `# Lightweight CTA Coverage Report

Generated: ${today}

Scope: static scan of the selected top SEO landing pages. No UI or runtime code was changed.

| Priority | Path | Source | TrackedLink count | Product href count | Compare href count | Retailer mentions | Product coverage | Status | Recommended action |
|---:|---|---|---:|---:|---:|---:|---|---|---|
${rows
  .map(
    (row) =>
      `| ${row.priority} | ${row.path} | ${row.sourceFiles.join("<br>")} | ${row.trackedLinkCount} | ${row.productHrefCount} | ${row.compareHrefCount} | ${row.retailerMentions} | ${row.productCoverage || "DYNAMIC_OR_NOT_SPECIFIED"} | ${row.status} | ${row.recommendedAction} |`,
  )
  .join("\n")}

## Notes

- Compare and product-detail pages use shared dynamic routes, so static counts represent the shared implementation, not a browser rendering of each final URL.
- WEAK_OR_UNKNOWN means the page deserves manual review before changing layout.
- Verified affiliate purchase CTA remains blocked until ProteinLab-only Coupang links are available.
`;

  writeFileSync(join(root, "docs/lightweight-cta-coverage-report.md"), body, "utf8");
  return rows;
}

function makeMissingDataReport(products) {
  const rows = products.map((product) => {
    const missing = [];
    if (!product.slug) missing.push("slug");
    if (!product.name) missing.push("name");
    if (!product.brand) missing.push("brand");
    if (product.proteinPerServing == null) missing.push("proteinPerServing");
    if (product.sugar == null) missing.push("sugar");
    if (product.calories == null) missing.push("calories");
    if (!product.capacity) missing.push("capacity");
    if (!product.density) missing.push("density");
    if (!normalizeUrl(product.coupangUrl)) missing.push("coupangUrl");
    const needsImageMapReview = !hasProductImage(product);
    const protein = Number(product.proteinPerServing ?? 0);
    const priority =
      protein >= 40 || topLandingPages.some((page) => page.products.includes(product.slug))
        ? "HIGH"
        : missing.length >= 3
          ? "MEDIUM"
          : "LOW";
    return {
      product,
      priority,
      missing,
      needsImageMapReview,
      linkStatus: classifyUrl(product.coupangUrl),
    };
  });

  const issueRows = rows.filter((row) => row.missing.length > 0 || row.linkStatus === "INVALID");
  const highRows = issueRows.filter((row) => row.priority === "HIGH");
  const imageMapReviewRows = rows.filter((row) => row.needsImageMapReview);
  const byCategory = products.reduce((summary, product) => {
    summary[product.category] = (summary[product.category] ?? 0) + 1;
    return summary;
  }, {});

  const body = `# Product Detail Missing Data Report

Generated: ${today}

Scope: static product JSON scan. No product values were changed.

## Summary

| Metric | Count |
|---|---:|
| Total products | ${products.length} |
| Products with any checked issue | ${issueRows.length} |
| HIGH-priority issue products | ${highRows.length} |
| Products without explicit image field in JSON | ${imageMapReviewRows.length} |
| Drinks | ${byCategory.drink ?? 0} |
| Shakes | ${byCategory.shake ?? 0} |
| Bars | ${byCategory.bar ?? 0} |
| Yogurts | ${byCategory.yogurt ?? 0} |

## High-priority issue products

| Product ID | Working label | Category | Protein g | Link status | Missing fields |
|---|---|---|---:|---|---|
${highRows
  .slice(0, 80)
  .map(
    ({ product, linkStatus, missing }) =>
      `| ${product.slug} | ${toSlugLabel(product.slug)} | ${product.category} | ${product.proteinPerServing ?? ""} | ${linkStatus} | ${missing.join(", ") || "None"} |`,
  )
  .join("\n") || "| None |  |  |  |  |  |"}

## All checked issue products

| Product ID | Working label | Category | Protein g | Link status | Missing fields |
|---|---|---|---:|---|---|
${issueRows
  .slice(0, 120)
  .map(
    ({ product, linkStatus, missing }) =>
      `| ${product.slug} | ${toSlugLabel(product.slug)} | ${product.category} | ${product.proteinPerServing ?? ""} | ${linkStatus} | ${missing.join(", ") || "None"} |`,
  )
  .join("\n") || "| None |  |  |  |  |  |"}

## Field definitions

- coupangUrl means an existing general purchase URL, not a verified ProteinLab-only affiliate mapping.
- HIGH priority is assigned to selected landing-page products and products with 40g+ protein.
- Image fields are summarized separately because ProteinLab may resolve product images through a shared image map rather than each product JSON row.
`;

  writeFileSync(join(root, "docs/product-detail-missing-data-report.md"), body, "utf8");
  return { issueRows, highRows };
}

function makePurchaseLinkQualityReport(products) {
  const rows = products.map((product) => {
    const urls = [
      ["coupangUrl", product.coupangUrl],
      ["naverUrl", product.naverUrl],
      ["officialUrl", product.officialUrl],
      ["productUrl", product.productUrl],
    ].map(([field, value]) => ({ field, value: normalizeUrl(value), type: classifyUrl(value) }));
    const issueTypes = urls.filter((url) => ["INVALID", "MISSING"].includes(url.type));
    return { product, urls, issueTypes };
  });
  const urlCounts = new Map();
  for (const row of rows) {
    for (const url of row.urls) {
      if (url.value) urlCounts.set(url.value, (urlCounts.get(url.value) ?? 0) + 1);
    }
  }
  const duplicateUrls = [...urlCounts.entries()].filter(([, count]) => count > 1);
  const coupangSummary = rows.reduce((summary, row) => {
    const type = row.urls.find((url) => url.field === "coupangUrl")?.type ?? "MISSING";
    summary[type] = (summary[type] ?? 0) + 1;
    return summary;
  }, {});

  const body = `# Purchase Link Quality Report

Generated: ${today}

Scope: static scan of existing purchase URL fields. No links were changed.

## Summary

| Metric | Count |
|---|---:|
| Total products | ${products.length} |
| Coupang missing | ${coupangSummary.MISSING ?? 0} |
| Coupang shortlink / affiliate-looking URL | ${coupangSummary.COUPANG_AFFILIATE_OR_SHORTLINK ?? 0} |
| Coupang regular URL | ${coupangSummary.COUPANG_REGULAR ?? 0} |
| Invalid URL fields | ${rows.reduce((sum, row) => sum + row.urls.filter((url) => url.type === "INVALID").length, 0)} |
| Duplicate non-empty URLs | ${duplicateUrls.length} |

## Duplicate URL candidates

| URL | Reuse count |
|---|---:|
${duplicateUrls
  .slice(0, 80)
  .map(([url, count]) => `| ${url} | ${count} |`)
  .join("\n") || "| None | 0 |"}

## Products needing purchase-link review

| Product ID | Working label | Category | Coupang type | Current Coupang URL |
|---|---|---|---|---|
${rows
  .filter((row) => {
    const coupang = row.urls.find((url) => url.field === "coupangUrl");
    return !coupang?.value || coupang.type === "INVALID";
  })
  .slice(0, 120)
  .map((row) => {
    const coupang = row.urls.find((url) => url.field === "coupangUrl");
    return `| ${row.product.slug} | ${toSlugLabel(row.product.slug)} | ${row.product.category} | ${coupang?.type ?? "MISSING"} | ${coupang?.value ?? ""} |`;
  })
  .join("\n")}

## Notes

- This report does not validate whether an external page still points to the correct SKU.
- Existing Coupang shortlinks must not be treated as verified ProteinLab-only affiliate links.
`;

  writeFileSync(join(root, "docs/purchase-link-quality-report.md"), body, "utf8");
  return { duplicateUrls, coupangSummary };
}

function makeEventConsistencyReport() {
  const events = findEventOccurrences();
  const body = `# GA4 Event Implementation Consistency Report

Generated: ${today}

Scope: static scan of event helper call sites. No analytics code was changed.

| Event helper | Call-site count | Files |
|---|---:|---|
${events
  .map(
    (event) =>
      `| ${event.eventName} | ${event.occurrences.reduce((sum, item) => sum + item.count, 0)} | ${event.occurrences.map((item) => `${item.file} (${item.count})`).join("<br>") || "None"} |`,
  )
  .join("\n")}

## Static interpretation

- affiliateClick has no active call-site in product purchase UI while dedicated ProteinLab affiliate links are missing.
- Current purchase buttons are expected to use retailerClick until verified affiliate mappings are applied.
- Browser and GA4 DebugView validation are still required before treating event delivery as verified.
`;

  writeFileSync(join(root, "docs/ga4-event-implementation-consistency.md"), body, "utf8");
  return events;
}

function makeTopProductImprovementCandidates(productsBySlug) {
  const priorityIds = [
    "labnosh-protein-max-choco-400",
    "newcare-all-protein-41g",
    "takefit-monster-goso-350",
    "newcare-all-protein-choco-245",
    "hymune-balance-active-deepchoco-250",
    "sellex-profit-milk-vanilla-250",
    "takefit-max-choco-250",
    "takefit-max-goso-250",
    "itthefit-proteinshake-double-choco-40",
    "proteone-proteinshake-choco-40",
    "danbaek-drink-darkchoco-330",
    "danbaek-drink-doublechoco-350",
    "dryou-protein-40g-choco-350",
    "dryou-protein-40g-strawberry-350",
    "hymune-ultra-400",
    "labnosh-protein-max-strawberry-400",
    "newcare-all-protein-41g-coffee-350",
    "newcare-all-protein-41g-savory-350",
    "sellex-profit-sports-wildchoco-350",
    "takefit-extreme-450",
  ];

  const rows = priorityIds
    .map((slug) => productsBySlug.get(slug))
    .filter(Boolean)
    .map((product) => {
      const strengths = [];
      const cautions = [];
      if ((product.proteinPerServing ?? 0) >= 40) strengths.push("high protein amount");
      if ((product.sugar ?? 99) <= 3) strengths.push("low sugar");
      if ((product.calories ?? 999) <= 130) strengths.push("low calorie");
      if (product.sugar == null) cautions.push("sugar missing");
      if (product.calories == null) cautions.push("calories missing");
      if (!normalizeUrl(product.coupangUrl)) cautions.push("purchase URL missing");
      const compareCta =
        product.category === "drink"
          ? "/compare/takefit-vs-hymune-drink"
          : product.category === "shake"
            ? "/compare/proteone-vs-itthefit-shake"
            : "/compare";
      return { product, strengths, cautions, compareCta };
    });

  const body = `# Top Product Detail Improvement Candidates

Generated: ${today}

Scope: planning only. No product detail UI or content was changed.

| Rank | Product ID | Working label | Category | Protein g | Strengths to mention if data-backed | Cautions to review | Suggested compare/internal CTA |
|---:|---|---|---|---:|---|---|---|
${rows
  .map(
    ({ product, strengths, cautions, compareCta }, index) =>
      `| ${index + 1} | ${product.slug} | ${toSlugLabel(product.slug)} | ${product.category} | ${product.proteinPerServing ?? ""} | ${strengths.join(", ") || "review category-relative metric"} | ${cautions.join(", ") || "None from checked fields"} | ${compareCta} |`,
  )
  .join("\n")}

## How to use this

- Use this as a product-detail copy and CTA planning list, not as a completed content change.
- Only mention strengths that are directly supported by product data.
- Add affiliate purchase CTA only after verified ProteinLab-only links exist.
`;

  writeFileSync(join(root, "docs/top-product-detail-improvement-candidates.md"), body, "utf8");
  return rows;
}

ensureDocs();
const products = loadProducts();
const productsBySlug = new Map(products.map((product) => [product.slug, product]));

const ctaRows = makeCtaCoverageReport(productsBySlug);
const missingData = makeMissingDataReport(products);
const purchaseLinks = makePurchaseLinkQualityReport(products);
const events = makeEventConsistencyReport();
const topProducts = makeTopProductImprovementCandidates(productsBySlug);

console.log(
  JSON.stringify(
    {
      generated: [
        "docs/lightweight-cta-coverage-report.md",
        "docs/product-detail-missing-data-report.md",
        "docs/purchase-link-quality-report.md",
        "docs/ga4-event-implementation-consistency.md",
        "docs/top-product-detail-improvement-candidates.md",
      ],
      totalProducts: products.length,
      ctaPages: ctaRows.length,
      productsWithIssues: missingData.issueRows.length,
      highPriorityProductIssues: missingData.highRows.length,
      duplicatePurchaseUrls: purchaseLinks.duplicateUrls.length,
      eventHelpers: events.length,
      topProductCandidates: topProducts.length,
    },
    null,
    2,
  ),
);

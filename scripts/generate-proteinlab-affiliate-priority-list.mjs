#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const today = new Date().toISOString().slice(0, 10);

const productFiles = [
  ["drink", "app/data/drinkProductsData.json"],
  ["bar", "app/data/barProductsData.json"],
  ["yogurt", "app/data/yogurtProductsData.json"],
  ["shake", "app/data/shakeProductsData.json"],
];

const topLandingProductIds = new Set([
  "proteone-proteinshake-choco-40",
  "itthefit-proteinshake-double-choco-40",
  "takefit-max-choco-250",
  "hymune-balance-active-deepchoco-250",
  "newcare-all-protein-choco-245",
  "sellex-profit-milk-vanilla-250",
  "takefit-max-goso-250",
  "takefit-monster-goso-350",
  "newcare-all-protein-41g",
  "labnosh-protein-max-choco-400",
]);

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8").replace(/^\uFEFF/, ""));
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function getProteinNumber(product) {
  const direct = Number(product.proteinPerServing);
  if (Number.isFinite(direct)) return direct;

  const fromName = String(product.name ?? product.slug ?? "").match(/(\d+(?:\.\d+)?)\s*g/i);
  return fromName ? Number(fromName[1]) : 0;
}

function toSlugLabel(slug) {
  return String(slug ?? "")
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (/^\d+(?:\.\d+)?$/.test(part)) return part;
      if (/^\d+(?:\.\d+)?g$/i.test(part)) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function isUltraHighProtein(product, protein) {
  if (product.category === "drink") return protein >= 35;
  if (product.category === "shake") return protein >= 40;
  if (product.category === "bar") return protein >= 20;
  if (product.category === "yogurt") return protein >= 18;
  return protein >= 35;
}

function isHighProtein(product, protein) {
  if (product.category === "drink") return protein >= 25;
  if (product.category === "shake") return protein >= 30;
  if (product.category === "bar") return protein >= 15;
  if (product.category === "yogurt") return protein >= 12;
  return protein >= 25;
}

function scoreProduct(product, record) {
  const protein = getProteinNumber(product);
  const hasCurrentCoupangUrl = Boolean(product.coupangUrl);
  const topLandingConnected = topLandingProductIds.has(product.slug);
  const ultraHighProtein = isUltraHighProtein(product, protein);
  const highProtein = isHighProtein(product, protein);
  const reasons = [];
  let score = 0;

  if (topLandingConnected) {
    score += 60;
    reasons.push("top_landing_connected");
  }
  if (hasCurrentCoupangUrl) {
    score += 25;
    reasons.push("has_existing_coupang_url");
  }
  if (ultraHighProtein) {
    score += 30;
    reasons.push("ultra_high_protein");
  } else if (highProtein) {
    score += 15;
    reasons.push("high_protein");
  }

  const categoryWeight = {
    drink: 12,
    shake: 10,
    bar: 8,
    yogurt: 6,
  }[product.category] ?? 0;
  score += categoryWeight;

  if (record?.status === "ACTIVE" && record.affiliateUrl) {
    score -= 1000;
    reasons.push("already_active");
  }

  return { score, protein, hasCurrentCoupangUrl, topLandingConnected, ultraHighProtein, highProtein, reasons };
}

const products = productFiles.flatMap(([category, file]) =>
  readJson(file).map((product) => ({ ...product, category })),
);
const store = readJson("app/data/affiliateLinks.proteinlab.json");
const recordsByProductId = new Map(
  (store.records ?? [])
    .filter((record) => record.site === "proteinlab" && record.retailer === "coupang")
    .map((record) => [record.productId, record]),
);

const rows = products
  .map((product) => {
    const record = recordsByProductId.get(product.slug);
    const scoring = scoreProduct(product, record);
    const status = record?.status ?? "PENDING";
    const tier =
      scoring.topLandingConnected || scoring.score >= 75
        ? "P1"
        : scoring.score >= 45
          ? "P2"
          : scoring.hasCurrentCoupangUrl
            ? "P3"
            : "BACKLOG";

    return {
      priority_tier: tier,
      priority_score: scoring.score,
      product_id: product.slug,
      product_slug_label: toSlugLabel(product.slug),
      product_name: product.name ?? "",
      brand: product.brand ?? "",
      category: product.category,
      protein_g: scoring.protein || "",
      current_url: product.coupangUrl ?? "",
      new_proteinlab_url: status === "ACTIVE" ? record.affiliateUrl : "",
      affiliate_link_id: status === "ACTIVE" ? record.affiliateLinkId : "",
      channel_id: record?.channelId ?? "proteinlab",
      status,
      priority_reason: scoring.reasons.filter((reason) => reason !== "already_active").join(";"),
      recommended_action:
        status === "ACTIVE"
          ? "No action unless replacing the verified ProteinLab link."
          : scoring.hasCurrentCoupangUrl
            ? "Issue a new ProteinLab-only Coupang Partners link and paste it here."
            : "Find the Coupang product page first, then issue a ProteinLab-only Partners link.",
      notes: "",
    };
  })
  .filter((row) => row.status !== "ACTIVE")
  .sort((a, b) => {
    const tierOrder = { P1: 0, P2: 1, P3: 2, BACKLOG: 3 };
    return (
      tierOrder[a.priority_tier] - tierOrder[b.priority_tier] ||
      b.priority_score - a.priority_score ||
      a.category.localeCompare(b.category) ||
      a.product_id.localeCompare(b.product_id)
    );
  });

const headers = [
  "priority_tier",
  "priority_score",
  "product_id",
  "product_slug_label",
  "product_name",
  "brand",
  "category",
  "protein_g",
  "current_url",
  "new_proteinlab_url",
  "affiliate_link_id",
  "channel_id",
  "status",
  "priority_reason",
  "recommended_action",
  "notes",
];

writeFileSync(
  join(root, "docs/proteinlab-affiliate-priority-input.csv"),
  `${[headers.join(","), ...rows.map((row) => headers.map((header) => csv(row[header])).join(","))].join("\n")}\n`,
  "utf8",
);

const p1Rows = rows.filter((row) => row.priority_tier === "P1");
writeFileSync(
  join(root, "docs/proteinlab-affiliate-p1-input.csv"),
  `${[headers.join(","), ...p1Rows.map((row) => headers.map((header) => csv(row[header])).join(","))].join("\n")}\n`,
  "utf8",
);

const counts = rows.reduce(
  (summary, row) => {
    summary[row.priority_tier] = (summary[row.priority_tier] ?? 0) + 1;
    return summary;
  },
  {},
);

const top20 = rows.slice(0, 20);
const markdown = `# ProteinLab Affiliate Link Priority Plan

Generated: ${today}

This is a lightweight monetization update. It does not change UI, product data, existing purchase links, or GA4 events.

## Priority rules

| Tier | Meaning | Recommended handling |
|---|---|---|
| P1 | Connected to selected SEO landing pages or very high priority by score | Create these ProteinLab-only Coupang Partners links first |
| P2 | High protein and/or commercially strong product with useful existing URL coverage | Process after P1 |
| P3 | Existing Coupang URL is present but product is not otherwise high priority | Batch process when time allows |
| BACKLOG | No strong conversion signal yet | Leave pending until content, traffic, or product priority changes |

## Scoring inputs

- Selected top SEO landing-page products
- Ultra-high or high protein threshold by category
- Existing Coupang URL availability
- Category-level commercial priority

No arbitrary affiliate URL was generated. \`new_proteinlab_url\` and \`affiliate_link_id\` must be filled only with verified ProteinLab-only Coupang Partners values.

Use \`product_slug_label\` as the readable working label when the source product name is difficult to read in a spreadsheet program.

## Current counts

| Tier | Product count |
|---|---:|
| P1 | ${counts.P1 ?? 0} |
| P2 | ${counts.P2 ?? 0} |
| P3 | ${counts.P3 ?? 0} |
| BACKLOG | ${counts.BACKLOG ?? 0} |

## First 20 products to process

| Rank | Tier | Product ID | Category | Protein g | Reason |
|---:|---|---|---|---:|---|
${top20
  .map(
    (row, index) =>
      `| ${index + 1} | ${row.priority_tier} | ${row.product_id} | ${row.category} | ${row.protein_g || ""} | ${row.priority_reason || ""} |`,
  )
  .join("\n")}

## Files

- Input CSV: \`docs/proteinlab-affiliate-priority-input.csv\`
- P1-only input CSV: \`docs/proteinlab-affiliate-p1-input.csv\`
- Full input CSV remains available at: \`docs/proteinlab-affiliate-link-input.csv\`

## Next operation

Fill only P1 rows first. After verified values are entered, run:

\`\`\`bash
npm run apply:affiliate-link-input
npm run audit:affiliate-links
\`\`\`
`;

writeFileSync(join(root, "docs/proteinlab-affiliate-priority-plan.md"), markdown, "utf8");

console.log(
  JSON.stringify(
    {
      outputCsv: "docs/proteinlab-affiliate-priority-input.csv",
      outputP1Csv: "docs/proteinlab-affiliate-p1-input.csv",
      outputPlan: "docs/proteinlab-affiliate-priority-plan.md",
      totalPendingRows: rows.length,
      p1Rows: p1Rows.length,
      tiers: counts,
      top20: top20.map((row) => row.product_id),
    },
    null,
    2,
  ),
);

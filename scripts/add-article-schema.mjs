// add-article-schema.mjs
// Adds Article JSON-LD + canonical to all guide pages missing them
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const GUIDES_DIR = path.join(ROOT, "app", "guides");
const SITE_URL = "https://proteinlab.kr";

// Pages that are hub/listing/tool pages — skip Article schema
const SKIP_PATHS = new Set([
  "app/guides/page.tsx",
  "app/guides/basics/page.tsx",
  "app/guides/by-goal/page.tsx",
  "app/guides/fitness-lifestyle/page.tsx",
  "app/guides/how-to-choose/page.tsx",
  "app/guides/ingredients/page.tsx",
  "app/guides/intake-strategy-health/page.tsx",
  "app/guides/market-insights/page.tsx",
  "app/guides/product-selection-comparison/page.tsx",
  "app/guides/tools/page.tsx",
  "app/guides/[track]/page.tsx",
  "app/guides/[track]/[slug]/page.tsx",
]);

function getGitDates(filePath) {
  try {
    const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
    const first = execSync(`git -C "${ROOT}" log --follow --diff-filter=A --format="%cs" -- "${rel}" 2>/dev/null`, { encoding: "utf8" }).trim().split("\n").filter(Boolean).pop();
    const last = execSync(`git -C "${ROOT}" log --format="%cs" -- "${rel}" 2>/dev/null`, { encoding: "utf8" }).trim().split("\n").filter(Boolean)[0];
    return {
      datePublished: first || "2026-03-01",
      dateModified: last || "2026-05-29",
    };
  } catch {
    return { datePublished: "2026-03-01", dateModified: "2026-05-29" };
  }
}

function filePathToUrl(filePath) {
  const rel = path.relative(path.join(ROOT, "app"), filePath).replace(/\\/g, "/");
  const urlPath = rel.replace(/\/page\.tsx$/, "");
  return `${SITE_URL}/${urlPath}`;
}

function extractTitle(content) {
  // _pageTitle = "..."
  const m1 = content.match(/_pageTitle\s*=\s*"([^"]+)"/);
  if (m1) return m1[1];
  // title: "..." in metadata (first occurrence)
  const m2 = content.match(/\btitle:\s*"([^"]+)"/);
  if (m2) return m2[1];
  return "";
}

function extractDescription(content) {
  const m1 = content.match(/_pageDesc\s*=\s*"([^"]+)"/);
  if (m1) return m1[1];
  // description: \n  "..."  (multiline)
  const m2 = content.match(/\bdescription:\s*\n\s*"([^"]+)"/);
  if (m2) return m2[1];
  const m3 = content.match(/\bdescription:\s*"([^"]+)"/);
  if (m3) return m3[1];
  return "";
}

function hasArticleSchema(content) {
  return content.includes("buildGuideJsonLd") ||
    content.includes('"@type": "Article"') ||
    content.includes("'@type': 'Article'");
}

function hasCanonical(content) {
  return content.includes("canonical:");
}

function addCanonicalToMetadata(content, canonicalUrl) {
  // Add alternates.canonical to metadata block
  // Find metadata export and add canonical after the opening brace
  return content.replace(
    /(export const metadata\s*=\s*\{)/,
    `$1\n  alternates: { canonical: "${canonicalUrl}" },`
  );
}

function addImport(content) {
  if (content.includes("buildGuideJsonLd")) return content;
  // Add import after the last existing import
  return content.replace(
    /(import[^;]+;\n)(?!import)/,
    `$1import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";\n`
  );
}

function addJsonLdToComponent(content, title, description, url, datePublished, dateModified) {
  // 1. Add const jsonLd = buildGuideJsonLd(...) inside the component function
  // Find the export default function and insert after its opening {
  if (content.includes("const jsonLd = buildGuideJsonLd")) return content;

  const jsonLdCall = `  const jsonLd = buildGuideJsonLd({
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    url: ${JSON.stringify(url)},
    datePublished: "${datePublished}",
    dateModified: "${dateModified}",
  });\n`;

  // Find the default export function body
  content = content.replace(
    /(export default function \w+\([^)]*\)\s*\{)/,
    `$1\n${jsonLdCall}`
  );

  // 2. Add script tags before <Header />
  if (!content.includes("jsonLd.map")) {
    content = content.replace(
      /(\s*)(<Header\s*\/>)/,
      `$1{jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}\n$1$2`
    );
  }

  return content;
}

function processFile(filePath) {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, "/");

  if (SKIP_PATHS.has(relPath)) return "skipped";
  if (!fs.existsSync(filePath)) return "not_found";

  let content = fs.readFileSync(filePath, "utf8");

  if (hasArticleSchema(content)) return "already_has";

  const url = filePathToUrl(filePath);
  const title = extractTitle(content);
  const description = extractDescription(content);

  if (!title) {
    console.warn(`  WARN: No title found in ${relPath}`);
    return "no_title";
  }

  const { datePublished, dateModified } = getGitDates(filePath);

  let modified = content;

  // Add canonical if missing
  if (!hasCanonical(modified)) {
    modified = addCanonicalToMetadata(modified, url);
  }

  // Add import
  modified = addImport(modified);

  // Add JSON-LD
  modified = addJsonLdToComponent(modified, title, description, url, datePublished, dateModified);

  if (modified === content) {
    console.warn(`  WARN: No changes made to ${relPath} — check structure`);
    return "no_change";
  }

  fs.writeFileSync(filePath, modified, "utf8");
  return "updated";
}

// Find all guide page.tsx files
function findGuidePages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findGuidePages(fullPath));
    } else if (entry.name === "page.tsx") {
      results.push(fullPath);
    }
  }
  return results;
}

const pages = findGuidePages(GUIDES_DIR);
const stats = { skipped: 0, already_has: 0, updated: 0, no_change: 0, no_title: 0, not_found: 0 };

for (const page of pages) {
  const result = processFile(page);
  stats[result] = (stats[result] || 0) + 1;
  if (result === "updated") {
    console.log(`  ✓ ${path.relative(ROOT, page).replace(/\\/g, "/")}`);
  } else if (result === "no_change" || result === "no_title") {
    console.log(`  ! ${result}: ${path.relative(ROOT, page).replace(/\\/g, "/")}`);
  }
}

console.log("\n=== Summary ===");
console.log(JSON.stringify(stats, null, 2));

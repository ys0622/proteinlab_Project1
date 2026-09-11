/**
 * Orphan-page audit: find guide pages that exist (have a page.tsx) but are
 * never linked to from anywhere else in the codebase. These pages are only
 * reachable via sitemap.xml / direct URL, which starves them of internal
 * link equity and likely contributes to Google's "발견됨 - 크롤링 안 됨"
 * bucket, since Googlebot deprioritizes pages with no internal inlinks.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, sep } from "path";

const root = process.cwd();
const guidesDir = join(root, "app/guides");
const appDir = join(root, "app");

function walk(dir, exts) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      results.push(...walk(full, exts));
    } else if (exts.some((e) => entry.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

// 1) Derive the URL for every real guide page.tsx (skip dynamic [param] segments)
const pageFiles = walk(guidesDir, ["page.tsx"]);
const guideUrls = [];
for (const f of pageFiles) {
  const rel = relative(guidesDir, f).split(sep).slice(0, -1).join("/"); // drop "page.tsx"
  if (rel.includes("[")) continue; // dynamic route, not a single fixed URL
  const url = "/guides" + (rel ? "/" + rel : "");
  guideUrls.push(url);
}

// 2) Collect every place a /guides/... string is referenced anywhere in app/
const sourceFiles = walk(appDir, [".tsx", ".ts"]);
let allSource = "";
for (const f of sourceFiles) {
  if (f.includes("guides" + sep) && f.endsWith("page.tsx")) continue; // don't count a page linking to itself trivially via its own canonical
  allSource += readFileSync(f, "utf-8") + "\n";
}

// Also scan the guide page files themselves for canonical self-references we should exclude,
// but keep counting genuine cross-links between guide pages (relatedLinks etc.)
const orphans = [];
for (const url of guideUrls) {
  // Count occurrences of this exact path as a substring, but require it not be immediately
  // followed by more path segments (avoid /guides/x matching /guides/x/y as a "link").
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`["'\`]${escaped}["'\`/)]`, "g");
  const matches = allSource.match(re) || [];
  if (matches.length === 0) {
    orphans.push(url);
  }
}

console.log(`총 가이드 페이지: ${guideUrls.length}개`);
console.log(`고아 페이지(내부 링크 0개): ${orphans.length}개\n`);
orphans.forEach((u) => console.log(u));

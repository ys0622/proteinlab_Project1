/**
 * Improved thin-content audit: many product-selection-comparison pages are
 * thin wrappers around a shared config object exported from
 * compareGuideContent.ts (rendered via ComparisonGuidePage). Count Hangul
 * chars per exported config block instead of per page.tsx file, then map
 * each config back to the page(s) that import it.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const root = process.cwd();
const compareDir = join(root, "app/guides/product-selection-comparison");
const contentFiles = [
  "compareGuideContent.ts",
  "proteinBarContent.ts",
  "proteinCategoryContent.ts",
  "proteinDrinkTop10Content.ts",
  "proteinShakeLifestyleContent.ts",
  "proteinYogurtContent.ts",
];

function countHangul(text) {
  const matches = text.match(/[가-힣]/g);
  return matches ? matches.length : 0;
}

// 1) Split every shared content file into per-export blocks
const configBlocks = {};
for (const fname of contentFiles) {
  const content = readFileSync(join(compareDir, fname), "utf-8");
  const exportRegex = /^export const (\w+)/gm;
  const markers = [];
  let m;
  while ((m = exportRegex.exec(content)) !== null) {
    markers.push({ name: m[1], start: m.index });
  }
  for (let i = 0; i < markers.length; i++) {
    const end = i + 1 < markers.length ? markers[i + 1].start : content.length;
    const block = content.slice(markers[i].start, end);
    configBlocks[markers[i].name] = countHangul(block);
  }
}

// 2) Find every page.tsx under product-selection-comparison and figure out
//    which config (if any) it imports, plus its own inline Hangul count.
function findPageFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) results.push(...findPageFiles(full));
    else if (entry === "page.tsx") results.push(full);
  }
  return results;
}

const pageFiles = findPageFiles(compareDir);
const results = pageFiles.map((f) => {
  const src = readFileSync(f, "utf-8");
  const inlineCount = countHangul(src);
  const importMatch = src.match(/(\w+Config)\s*}\s*from/) || src.match(/{\s*(\w+Config)/);
  const configName = importMatch ? importMatch[1] : null;
  const configCount = configName ? (configBlocks[configName] ?? null) : null;
  return {
    path: relative(root, f),
    configName,
    totalHangul: configCount !== null ? configCount : inlineCount,
    resolvedFromSharedConfig: configCount !== null,
  };
});

results.sort((a, b) => a.totalHangul - b.totalHangul);

console.log("=== product-selection-comparison 콘텐츠 분량 (적은 순, 하위 25개) ===");
for (const r of results.slice(0, 25)) {
  console.log(`${r.totalHangul}자\t${r.path}\t${r.configName ?? "(inline)"}`);
}

console.log("\n총 페이지:", results.length);

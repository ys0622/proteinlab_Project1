/**
 * One-off audit: estimate the amount of actual Korean prose content on each
 * guide page by counting Hangul characters in the raw source file. This is a
 * rough proxy (imports/classNames/hrefs are all ASCII so they don't inflate
 * the count) used to find "thin content" pages that Google may be declining
 * to index (Search Console: "크롤링됨 - 현재 색인 생성되지 않음").
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const root = process.cwd();
const guidesDir = join(root, "app/guides");

function findPageFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...findPageFiles(full));
    } else if (entry === "page.tsx") {
      results.push(full);
    }
  }
  return results;
}

function countHangul(text) {
  const matches = text.match(/[가-힣]/g);
  return matches ? matches.length : 0;
}

const files = findPageFiles(guidesDir);
const results = files.map((f) => {
  const content = readFileSync(f, "utf-8");
  return { path: relative(root, f), hangulCount: countHangul(content) };
});

results.sort((a, b) => a.hangulCount - b.hangulCount);

console.log("=== 가장 콘텐츠 적은 순 (하위 30개) ===");
for (const r of results.slice(0, 30)) {
  console.log(`${r.hangulCount}자\t${r.path}`);
}

console.log("\n=== 전체 통계 ===");
console.log("총 페이지 수:", results.length);
console.log("중앙값:", results[Math.floor(results.length / 2)].hangulCount);
console.log("최소:", results[0].hangulCount, results[0].path);
console.log("최대:", results[results.length - 1].hangulCount, results[results.length - 1].path);

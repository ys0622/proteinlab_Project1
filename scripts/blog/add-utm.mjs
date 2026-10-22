#!/usr/bin/env node
/**
 * 원고 article.md 의 proteinlab.kr 링크에 UTM을 붙인다(2026-10-22). GA4에서 블로그 유입과 쿠팡 클릭을 글별로 나눠 보기 위해서다.
 * utm_source=naver_blog, utm_medium=blog, utm_campaign=<원고 ID>. 이미 utm_ 이 있는 링크는 그대로 둔다.
 * 사용: node scripts/blog/add-utm.mjs <원고ID> [<원고ID> ...]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT = "C:/Users/ys062/Desktop/네이버 블로그/프로틴랩/content";
const ids = process.argv.slice(2);
if (!ids.length) { console.error("사용: node scripts/blog/add-utm.mjs <원고ID> ..."); process.exit(1); }

for (const id of ids) {
  const file = join(CONTENT, id, "article.md");
  const md = readFileSync(file, "utf-8");
  let n = 0;
  const out = md.replace(/\]\((https:\/\/proteinlab\.kr[^)\s]*)\)/g, (all, url) => {
    if (/[?&]utm_/.test(url)) return all;
    const [path, hash = ""] = url.split("#");
    n++;
    const tagged = `${path}${path.includes("?") ? "&" : "?"}utm_source=naver_blog&utm_medium=blog&utm_campaign=${id}`;
    return `](${tagged}${hash ? "#" + hash : ""})`;
  });
  if (n) writeFileSync(file, out);
  console.log(`${id}: 링크 ${n}개에 UTM 추가`);
}

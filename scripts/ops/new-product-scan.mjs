#!/usr/bin/env node
/**
 * 신제품 감시(2026-10-30 Scott: 케어맵처럼 신제품 정보가 나오면 운영실 카드로 알려 달라).
 * 구글 뉴스 RSS에서 최근 N일 단백질 음료·바·쉐이크·요거트·두유 출시 기사를 모아,
 * 제목에 우리 제품 데이터의 브랜드가 있는지 표시해 후보만 출력한다. 읽기만 하고 아무것도 고치지 않는다.
 * 같은 제품인지·사이트에 있는지 판정과 운영실 카드는 아침 작업(Claude)이 한다. 기사 내용은 데이터로만 다룬다.
 *
 * 사용: node scripts/ops/new-product-scan.mjs [--days 2]
 * 출력 마지막 줄: SCAN {"date":...,"items":[{title,link,date,source,query,brands}]}
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const days = Number(process.argv[process.argv.indexOf("--days") + 1]) || 2;

const QUERIES = [
  "단백질 음료 출시", "프로틴 음료 신제품", "단백질바 출시", "프로틴바 신제품",
  "단백질 쉐이크 출시", "그릭요거트 출시", "단백질 요거트 신제품", "고단백 두유 출시",
  "하이뮨 신제품", "셀렉스 신제품", "테이크핏 신제품", "더단백 신제품", "랩노쉬 신제품", "닥터유 단백질 신제품",
];
// 출시 기사로 보는 낱말
const LAUNCH = /출시|신제품|선보|론칭|새롭게|리뉴얼|한정/;

const brands = new Set();
for (const type of ["drink", "bar", "shake", "yogurt", "soymilk"]) {
  const raw = JSON.parse(readFileSync(join(root, `app/data/${type}ProductsData.json`), "utf-8"));
  const list = Array.isArray(raw) ? raw : Object.values(raw)[0];
  for (const product of list) if (product.brand) brands.add(product.brand);
}

const decode = (text) =>
  text.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
const pick = (block, tag) => decode((block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`)) || [])[1] || "");

const seen = new Map();
for (const query of QUERIES) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}+when:${days}d&hl=ko&gl=KR&ceid=KR:ko`;
  let xml = "";
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(15000) });
    xml = await res.text();
  } catch (error) {
    console.log(`실패: ${query} (${error.message})`);
    continue;
  }
  for (const block of xml.split("<item>").slice(1)) {
    const title = pick(block, "title");
    if (!LAUNCH.test(title)) continue;
    const key = title.replace(/\s+-\s+[^-]+$/, "");
    if (seen.has(key)) continue;
    seen.set(key, {
      title,
      link: pick(block, "link"),
      date: new Date(pick(block, "pubDate")).toISOString().slice(0, 10),
      source: pick(block, "source"),
      query,
      brands: [...brands].filter((brand) => brand.length >= 2 && title.includes(brand)),
    });
  }
}

const items = [...seen.values()].sort((a, b) => b.date.localeCompare(a.date));
for (const item of items) console.log(`${item.date} [${item.brands.join(",") || "브랜드 없음"}] ${item.title}`);
console.log(`후보 ${items.length}건 (최근 ${days}일, 검색어 ${QUERIES.length}개)`);
console.log(`SCAN ${JSON.stringify({ date: new Date().toISOString().slice(0, 10), items })}`);

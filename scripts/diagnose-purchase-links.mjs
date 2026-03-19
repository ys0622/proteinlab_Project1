#!/usr/bin/env node
/**
 * 구매 링크(쿠팡/네이버/공식몰) 상태 진단 스크립트
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../app/data");

const BRAND_OFFICIAL_MALL = {
  "그릭데이": "https://greekday.co.kr/",
  "그린비아": "https://www.vegemil.co.kr/greenbia/",
  "곰곰": "https://www.coupang.com/",
  "뉴케어": "https://www.wellife.co.kr/",
  "닥터유": "https://dryoumall.com/",
  "단백하니": "https://dailyprotein.co.kr/",
  "더단백": "https://www.wellife.co.kr/",
  "랩노쉬": "https://labnosh.com/",
  "룩트": "https://www.lukt.co.kr/",
  "롯데웰푸드": "https://www.lottefoodmall.com/",
  "마이밀": "https://www.wellife.co.kr/",
  "마이프로틴": "https://www.myprotein.co.kr/",
  "매일 바이오": "https://direct.maeil.com/",
  "베노프": "https://benope.com/",
  "비에스엔": "https://www.bsn.co.kr/",
  "상하목장": "https://direct.maeil.com/m/brand/sangha",
  "서울우유": "https://www.na100shop.com/",
  "세븐일레븐": "https://www.7-eleven.co.kr/",
  "셀렉스": "https://www.selexmall.com/",
  "솔브앤고": "https://www.cjthemarket.com/",
  "씨알로": "https://crfood.co.kr/",
  "얼티브": "https://emart.ssg.com/",
  "연세유업": "https://www.yonseidairy.com/",
  "오늘단백": "https://on-protein.com/",
  "오트몬드": "https://harimmall.com/",
  "올가니카": "https://www.organica.co.kr/",
  "요플레": "https://www.bing.co.kr/",
  "요프로": "https://www.bing.co.kr/",
  "온단백": "https://dailyprotein.co.kr/",
  "커클랜드": "https://www.costco.co.kr/",
  "칼로바이": "https://www.calobye.shop/",
  "켈로그": "https://www.kelloggs.co.kr/",
  "크라운": "https://www.crown.co.kr/",
  "테이크핏": "https://foodismall.com/",
  "파스퇴르": "https://www.lottefoodmall.com/?act=main.pasteur",
  "포스트": "https://www.postmall.co.kr/",
  "프로틴방앗간": "https://dailyprotein.co.kr/",
  "풀무원다논": "https://shop.pulmuone.com/",
  "하이뮨": "https://www.hy-proteinmall.com/",
  "함소아제약": "https://www.hamsoamall.co.kr/",
  "후디스": "https://foodismall.com/",
  "힘내고": "https://dailyprotein.co.kr/",
  "YOZM": "https://yozm.co.kr/",
  "퀘스트 뉴트리션": "https://www.questnutrition.com/",
};

function getCoupangProductParams(url) {
  try {
    const parsed = new URL(url);
    const pageKey = parsed.pathname.match(/\/vp\/products\/(\d+)/)?.[1];
    const itemId = parsed.searchParams.get("itemId");
    const vendorItemId = parsed.searchParams.get("vendorItemId");
    if (!pageKey || !itemId || !vendorItemId) return null;
    return { pageKey, itemId, vendorItemId };
  } catch {
    return null;
  }
}

function classifyCoupangUrl(val) {
  if (!val || val === "#") return "없음";
  try {
    const url = new URL(val);
    const host = url.hostname.toLowerCase();
    if (url.href.includes("np/search")) return "비정상(np/search)";
    if (host.includes("link.coupang.com")) return "정상";
    if (host.includes("coupang.com") && url.pathname.includes("/vp/products/")) {
      const params = getCoupangProductParams(val);
      if (params) return "정상";
      return "비정상(lptag/itemId/vendorItemId 없음)";
    }
    if (host.includes("coupang.com")) return "비정상(일반 coupang)";
  } catch {}
  return "비정상";
}

function classifyOfficialUrl(url) {
  if (!url || url === "#") return "없음";
  try {
    const u = new URL(url);
    const path = u.pathname.toLowerCase();
    if (path === "/" || path === "/index.do" || path === "" || path === "/index.html")
      return "비정상(메인페이지)";
    if (path.includes("/brand/") && !path.includes("/product/")) return "비정상(브랜드 목록)";
    if (path.includes("/product/") || path.includes("/shop_view/") || path.includes("/m/product/"))
      return "정상";
    if (u.hostname.includes("coupang.com")) return "비정상(쿠팡 메인)";
    return "비정상(상세 아님)";
  } catch {}
  return "비정상";
}

function loadProducts() {
  const drink = JSON.parse(readFileSync(join(DATA_DIR, "drinkProductsData.json"), "utf8"));
  const bar = JSON.parse(readFileSync(join(DATA_DIR, "barProductsData.json"), "utf8"));
  const yogurt = JSON.parse(readFileSync(join(DATA_DIR, "yogurtProductsData.json"), "utf8"));
  return [
    ...drink.map((p) => ({ ...p, productType: "drink" })),
    ...bar.map((p) => ({ ...p, productType: "bar" })),
    ...yogurt.map((p) => ({ ...p, productType: "yogurt" })),
  ];
}

function main() {
  const products = loadProducts();
  const results = [];

  for (const p of products) {
    const rawCoupang = p.coupangUrl ?? (p.productUrl && p.productUrl.includes("coupang.com") ? p.productUrl : null);
    const coupangStatus = rawCoupang ? classifyCoupangUrl(rawCoupang) : "없음";
    const officialUrl = BRAND_OFFICIAL_MALL[p.brand] ?? null;
    const officialStatus = classifyOfficialUrl(officialUrl);
    results.push({
      slug: p.slug,
      name: `${p.brand} ${p.name}`,
      brand: p.brand,
      category: p.productType || "drink",
      coupangStatus,
      naverStatus: "비정상(검색결과페이지)", // 시스템이 항상 search.shopping.naver.com 사용
      officialStatus,
    });
  }

  const byCategory = { drink: [], bar: [], yogurt: [] };
  for (const r of results) {
    byCategory[r.category].push(r);
  }

  const coupangOk = results.filter((r) => r.coupangStatus === "정상").length;
  const coupangBad = results.filter((r) => r.coupangStatus.startsWith("비정상")).length;
  const coupangNone = results.filter((r) => r.coupangStatus === "없음").length;
  const officialOk = results.filter((r) => r.officialStatus === "정상").length;
  const officialBad = results.filter((r) => r.officialStatus.startsWith("비정상")).length;
  const officialNone = results.filter((r) => r.officialStatus === "없음").length;

  const total = results.length;

  console.log("=== 구매 링크 진단 보고서 ===\n");
  console.log("## 카테고리별 상세\n");

  for (const [cat, items] of Object.entries(byCategory)) {
    console.log(`### ${cat} (${items.length}개)\n`);
    console.log("| slug | 제품명 | coupangUrl | naverUrl | officialUrl |");
    console.log("|------|--------|------------|----------|-------------|");
    for (const r of items) {
      const name = r.name.length > 25 ? r.name.slice(0, 22) + "..." : r.name;
      console.log(`| ${r.slug} | ${name} | ${r.coupangStatus} | ${r.naverStatus} | ${r.officialStatus} |`);
    }
    console.log("");
  }

  console.log("## 전체 통계\n");
  console.log(`- 전체 제품: ${total}개`);
  console.log(`- coupangUrl 정상: ${coupangOk} (${((coupangOk / total) * 100).toFixed(1)}%)`);
  console.log(`- coupangUrl 비정상: ${coupangBad}`);
  console.log(`- coupangUrl 없음: ${coupangNone}`);
  console.log(`- naverUrl: 전체 비정상 (검색결과페이지 동적생성)`);
  console.log(`- officialUrl 정상: ${officialOk} (${((officialOk / total) * 100).toFixed(1)}%)`);
  console.log(`- officialUrl 비정상: ${officialBad}`);
  console.log(`- officialUrl 없음: ${officialNone} (브랜드 미등록)`);

  const badCoupangTypes = {};
  for (const r of results) {
    if (r.coupangStatus.startsWith("비정상")) {
      const key = r.coupangStatus;
      badCoupangTypes[key] = (badCoupangTypes[key] || 0) + 1;
    }
  }
  const badOfficialTypes = {};
  for (const r of results) {
    if (r.officialStatus.startsWith("비정상") || r.officialStatus === "없음") {
      const key = r.officialStatus === "없음" ? "없음(브랜드미등록)" : r.officialStatus;
      badOfficialTypes[key] = (badOfficialTypes[key] || 0) + 1;
    }
  }

  console.log("\n## 문제 링크 유형 TOP3\n");
  const coupangSorted = Object.entries(badCoupangTypes).sort((a, b) => b[1] - a[1]);
  const allSorted = [
    ...coupangSorted.map(([k, v]) => ({ type: `쿠팡: ${k}`, count: v })),
    { type: "네이버: 검색결과페이지(전체)", count: total },
    ...Object.entries(badOfficialTypes)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => ({ type: `공식몰: ${k}`, count: v })),
  ].sort((a, b) => b.count - a.count);
  allSorted.slice(0, 5).forEach((x, i) => console.log(`${i + 1}. ${x.type}: ${x.count}개`));
}

main();

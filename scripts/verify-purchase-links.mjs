#!/usr/bin/env node
/**
 * 구매 링크 동작 검증
 * - 버튼 href, URL 유효성, 금지 패턴 확인
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DATA_DIR = join(ROOT, "app/data");

const BRAND_OFFICIAL_DOMAINS = {
  "그릭데이": ["greekday.co.kr", "m.greekday.co.kr"],
  "룩트": ["lukt.co.kr", "www.lukt.co.kr"],
  "후디스": ["foodismall.com"],
  "YOZM": ["yozm.co.kr"],
  "매일 바이오": ["direct.maeil.com"],
};

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

function isValidCoupangUrl(val) {
  if (!val || val === "#") return false;
  try {
    const url = new URL(val);
    const host = url.hostname.toLowerCase();
    if (url.href.includes("np/search")) return false;
    if (host.includes("link.coupang.com")) return true;
    if (host.includes("coupang.com") && url.pathname.includes("/vp/products/")) {
      return getCoupangProductParams(val) !== null;
    }
  } catch {}
  return false;
}

function isCoupangSearchOrMain(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    if (u.href.includes("np/search")) return true;
    const path = u.pathname.replace(/\/$/, "") || "/";
    if (path === "/" || path === "/index" || path === "/index.html") return true;
  } catch {}
  return false;
}

function isNaverSearchOrMain(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host.includes("search.naver.com")) return true;
    if (host.includes("search.shopping.naver.com") && u.pathname.includes("/search")) return true;
    const path = u.pathname.replace(/\/$/, "") || "/";
    if (path === "/" || path === "/index") return true;
  } catch {}
  return false;
}

function isOfficialMainPage(url, brand) {
  if (!url) return false;
  try {
    const u = new URL(url);
    const path = u.pathname.toLowerCase().replace(/\/$/, "") || "/";
    if (path === "/" || path === "/index" || path === "/index.do" || path === "/index.html") return true;
    if (path.includes("/brand/") && !path.includes("/product/") && !path.includes("/shop_view/") && !path.includes("/m/product/")) return true;
  } catch {}
  return false;
}

function isOfficialProductDetail(url, brand) {
  if (!url || url === "#") return false;
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    const path = u.pathname.toLowerCase();
    const domains = BRAND_OFFICIAL_DOMAINS[brand];
    if (!domains) return false;
    const match = domains.some((d) => host === d.replace(/^www\./, "") || host.endsWith("." + d));
    if (!match) return false;
    if (path.includes("/product/") || path.includes("/shop_view/") || path.includes("/m/product/")) return true;
    if (path.includes("productView.do") || path.includes("productCode=")) return true;
  } catch {}
  return false;
}

function isNaverProductDetail(url) {
  if (!url || url === "#") return false;
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host.includes("smartstore.naver.com") && u.pathname.includes("/products/")) return true;
    if (host.includes("shopping.naver.com") && !u.pathname.includes("/search")) return true;
  } catch {}
  return false;
}

function main() {
  const products = loadProducts();
  const override = JSON.parse(readFileSync(join(DATA_DIR, "productOverrideLocal.json"), "utf8"));

  const results = [];
  const issues = [];

  for (const p of products) {
    const o = override[p.slug] ?? {};
    const coupangUrl = o.coupangUrl ?? p.coupangUrl ?? (p.productUrl && p.productUrl.includes("coupang.com") ? p.productUrl : null);
    const naverUrl = o.naverUrl ?? null;
    const officialUrl = o.officialUrl ?? p.officialUrl ?? null;

    const coupangHref = coupangUrl && isValidCoupangUrl(coupangUrl) ? coupangUrl : null;
    const naverHref = naverUrl && naverUrl !== "#" && naverUrl !== "" ? naverUrl : null;
    const officialHref = officialUrl && officialUrl !== "#" && officialUrl !== "" ? officialUrl : null;

    const productIssues = [];

    // 빈 링크 클릭 가능 (href가 "" 또는 "#"인데 버튼이 활성화되는 경우)
    if (naverUrl === "#" || naverUrl === "") {
      productIssues.push({ type: "naver", issue: "empty_but_active", href: naverUrl });
    }
    if (officialUrl === "#" || officialUrl === "") {
      productIssues.push({ type: "official", issue: "empty_but_active", href: officialUrl });
    }

    // 쿠팡 검증
    if (coupangHref) {
      if (isCoupangSearchOrMain(coupangHref)) {
        productIssues.push({ type: "coupang", issue: "search/main", href: coupangHref });
      } else if (!coupangHref.startsWith("http")) {
        productIssues.push({ type: "coupang", issue: "invalid_url", href: coupangHref });
      }
    }

    // 네이버 검증
    if (naverHref) {
      if (isNaverSearchOrMain(naverHref)) {
        productIssues.push({ type: "naver", issue: "search/main", href: naverHref });
      } else if (!isNaverProductDetail(naverHref) && !naverHref.startsWith("http")) {
        productIssues.push({ type: "naver", issue: "invalid_or_search", href: naverHref });
      }
    }

    // 공식몰 검증
    if (officialHref) {
      if (isOfficialMainPage(officialHref, p.brand)) {
        productIssues.push({ type: "official", issue: "main_page", href: officialHref });
      } else if (!isOfficialProductDetail(officialHref, p.brand)) {
        const domains = BRAND_OFFICIAL_DOMAINS[p.brand];
        if (!domains) {
          productIssues.push({ type: "official", issue: "unknown_brand", href: officialHref });
        } else {
          productIssues.push({ type: "official", issue: "not_product_detail", href: officialHref });
        }
      }
    }

    if (coupangUrl === "#" || coupangUrl === "") {
      productIssues.push({ type: "coupang", issue: "empty_but_active", href: coupangUrl });
    }

    const hasIssues = productIssues.length > 0;
    results.push({
      slug: p.slug,
      brand: p.brand,
      name: p.name,
      coupangHref,
      naverHref,
      officialHref,
      hasIssues,
      issues: productIssues,
    });

    if (hasIssues) {
      issues.push({ slug: p.slug, brand: p.brand, name: p.name, issues: productIssues });
    }
  }

  const okCount = results.filter((r) => !r.hasIssues).length;
  const withLinksCount = results.filter((r) => r.coupangHref || r.naverHref || r.officialHref).length;
  const allNullOk = results.filter((r) => !r.coupangHref && !r.naverHref && !r.officialHref && !r.hasIssues).length;

  console.log("=== 구매 링크 검증 결과 ===\n");
  console.log(`정상 동작 제품 수: ${okCount} / ${results.length}`);
  console.log(`링크 1개 이상 있는 제품: ${withLinksCount}개`);
  console.log(`모든 링크 null (비활성화 정상): ${allNullOk}개\n`);

  if (issues.length > 0) {
    console.log("--- 문제 있는 제품 리스트 ---\n");
    issues.forEach(({ slug, brand, name, issues: iss }) => {
      console.log(`[${slug}] ${brand} ${name}`);
      iss.forEach((i) => console.log(`  - ${i.type}: ${i.issue} | ${(i.href || "").slice(0, 80)}...`));
      console.log("");
    });

    const byIssue = {};
    issues.forEach(({ slug, issues: iss }) => {
      iss.forEach((i) => {
        const key = `${i.type}:${i.issue}`;
        if (!byIssue[key]) byIssue[key] = [];
        byIssue[key].push(slug);
      });
    });

    const top10 = [];
    Object.entries(byIssue).forEach(([key, slugs]) => {
      slugs.forEach((s) => {
        const r = results.find((x) => x.slug === s);
        if (r) top10.push({ slug: s, issueKey: key, ...r.issues.find((i) => `${i.type}:${i.issue}` === key) });
      });
    });
    const uniqueSlugs = [...new Set(top10.map((x) => x.slug))];
    console.log("--- 즉시 수정 필요 TOP 10 ---\n");
    uniqueSlugs.slice(0, 10).forEach((slug, i) => {
      const r = results.find((x) => x.slug === slug);
      const iss = r?.issues ?? [];
      console.log(`${i + 1}. ${slug} (${r?.brand} ${r?.name})`);
      iss.forEach((x) => console.log(`   ${x.type}: ${x.issue}`));
    });
  } else {
    console.log("문제 있는 제품: 없음");
    console.log("\n즉시 수정 필요: 없음");
  }
}

main();

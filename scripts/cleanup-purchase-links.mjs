#!/usr/bin/env node
/**
 * 구매 링크 자동 정리 스크립트
 * - 잘못된 링크 제거
 * - 가능한 경우 정상 링크로 교체
 * - 불확실한 경우 null 처리
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../app/data");

const BRAND_OFFICIAL_DOMAINS = {
  "그릭데이": ["greekday.co.kr", "m.greekday.co.kr"],
  "그린비아": ["vegemil.co.kr"],
  "닥터유": ["dryoumall.com"],
  "랩노쉬": ["labnosh.com"],
  "룩트": ["lukt.co.kr", "www.lukt.co.kr"],
  "후디스": ["foodismall.com"],
  "테이크핏": ["foodismall.com"],
  "YOZM": ["yozm.co.kr"],
  "매일 바이오": ["direct.maeil.com"],
  "상하목장": ["direct.maeil.com"],
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

function isOfficialMallProductDetail(productUrl, brand) {
  if (!productUrl || productUrl === "#") return false;
  try {
    const u = new URL(productUrl);
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    const path = u.pathname.toLowerCase();

    const domains = BRAND_OFFICIAL_DOMAINS[brand];
    if (!domains) return false;
    const match = domains.some((d) => host === d.replace(/^www\./, "") || host.endsWith("." + d));
    if (!match) return false;

    if (path === "/" || path === "/index.do" || path === "" || path === "/index.html") return false;
    if (path.includes("/brand/") && !path.includes("/product/") && !path.includes("/m/product/"))
      return false;
    if (
      path.includes("/product/") ||
      path.includes("/shop_view/") ||
      path.includes("/m/product/")
    )
      return true;
  } catch {}
  return false;
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
  const output = [];
  let fixedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;
  const slugsToRemoveCoupang = [];

  for (const p of products) {
    const rawCoupang =
      p.coupangUrl ?? (p.productUrl && p.productUrl.includes("coupang.com") ? p.productUrl : null);
    const rawProductUrl = p.productUrl;

    let coupangUrl = null;
    let naverUrl = null;
    let officialUrl = null;
    let status = "unchanged";

    if (rawCoupang && isValidCoupangUrl(rawCoupang)) {
      coupangUrl = rawCoupang;
    } else if (rawCoupang) {
      coupangUrl = null;
      slugsToRemoveCoupang.push(p.slug);
      status = "removed";
      removedCount++;
    }

    if (rawProductUrl && isOfficialMallProductDetail(rawProductUrl, p.brand)) {
      officialUrl = rawProductUrl;
      if (status === "unchanged") {
        status = "fixed";
        fixedCount++;
      }
    }

    if (status === "unchanged") {
      unchangedCount++;
    }

    output.push({
      slug: p.slug,
      coupangUrl,
      naverUrl,
      officialUrl,
      status,
    });
  }

  const yogurtData = JSON.parse(
    readFileSync(join(DATA_DIR, "yogurtProductsData.json"), "utf8"),
  );
  let yogurtModified = false;
  for (const slug of slugsToRemoveCoupang) {
    const idx = yogurtData.findIndex((x) => x.slug === slug);
    if (idx >= 0 && yogurtData[idx].productUrl?.includes("coupang.com")) {
      yogurtData[idx].productUrl = "#";
      yogurtModified = true;
    }
  }
  for (const item of output) {
    if (item.status === "fixed" && item.officialUrl) {
      const idx = yogurtData.findIndex((x) => x.slug === item.slug);
      if (idx >= 0) {
        yogurtData[idx].officialUrl = item.officialUrl;
        yogurtModified = true;
      }
    }
  }
  if (yogurtModified) {
    writeFileSync(
      join(DATA_DIR, "yogurtProductsData.json"),
      JSON.stringify(yogurtData, null, 2),
      "utf8",
    );
  }

  const result = {
    summary: {
      fixed: fixedCount,
      removed: removedCount,
      unchanged: unchangedCount,
      total: output.length,
    },
    items: output,
  };
  writeFileSync(
    join(__dirname, "../docs/purchase-links-cleanup-result.json"),
    JSON.stringify(result, null, 2),
    "utf8",
  );

  console.log(JSON.stringify(result, null, 2));
  console.error("\n--- 정리 결과 ---");
  console.error(`자동 수정된 항목 수: ${fixedCount}`);
  console.error(`제거된 항목 수: ${removedCount}`);
  console.error(`변경 없음: ${unchangedCount}`);
  console.error(`yogurtProductsData.json 업데이트: ${yogurtModified ? "완료" : "없음"}`);
}

main();

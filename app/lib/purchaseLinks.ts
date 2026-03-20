/**
 * Purchase link helpers.
 * - Coupang: coupangUrl 기반만 사용. 검색 URL fallback 없음.
 * - Naver: product-name search results.
 * - Official mall: brand homepage when known.
 */

const BRAND_OFFICIAL_MALL: Record<string, string> = {
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
};

const COUPANG_PARTNERS_TAG =
  process.env.NEXT_PUBLIC_COUPANG_LPTAG ||
  process.env.COUPANG_LPTAG ||
  process.env.NEXT_PUBLIC_COUPANG_PARTNERS_TAG ||
  process.env.COUPANG_PARTNERS_TAG ||
  "";
const COUPANG_PARTNERS_SUB_ID =
  process.env.NEXT_PUBLIC_COUPANG_PARTNERS_SUB_ID || process.env.COUPANG_PARTNERS_SUB_ID || "proteinlab";

export type CoupangLinkCategory = "drink" | "bar" | "yogurt" | "shake" | "guide" | "ranking";

const KNOWN_SOURCE_COUPANG_URLS_BY_SLUG: Record<string, string> = {
  "newcare-all-protein-choco-245":
    "https://www.coupang.com/vp/products/8391141735?itemId=24971392807&vendorItemId=91994723764",
  "newcare-all-protein-banana-245":
    "https://www.coupang.com/vp/products/8391213192?itemId=24256029913&vendorItemId=91994723751",
  "newcare-all-protein-savory-245":
    "https://www.coupang.com/vp/products/8391180879?itemId=24963749598&vendorItemId=91994723799",
  "newcare-all-protein-plant-savory-250":
    "https://www.coupang.com/vp/products/9413959502?itemId=27972525769&vendorItemId=94930425876",
  "newcare-olprotein-water-lemon-350":
    "https://www.coupang.com/vp/products/8888082152?itemId=26687416262&vendorItemId=93659473043",
  "newcare-olprotein-water-apple-350":
    "https://www.coupang.com/vp/products/8888082215?itemId=26554259073&vendorItemId=93659473038",
  "newcare-all-protein-41g":
    "https://www.coupang.com/vp/products/8869229030?itemId=26181687745&vendorItemId=93475736005",
};

const COUPANG_SUB_ID_BY_CATEGORY: Record<CoupangLinkCategory, string> = {
  drink: "drink",
  bar: "bar",
  yogurt: "yogurt",
  shake: "shake",
  guide: "guide",
  ranking: "ranking",
};

function getCoupangSubId(category?: CoupangLinkCategory | null): string {
  if (!category) {
    return COUPANG_PARTNERS_SUB_ID;
  }

  return COUPANG_SUB_ID_BY_CATEGORY[category] ?? COUPANG_PARTNERS_SUB_ID;
}

export function isValidExternalUrl(value?: string | null): value is string {
  if (!value || value === "#") return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isCoupangUrl(value?: string | null): value is string {
  if (!isValidExternalUrl(value)) return false;

  try {
    return new URL(value).hostname.toLowerCase().includes("coupang.com");
  } catch {
    return false;
  }
}

export function isCoupangPartnersUrl(value?: string | null): value is string {
  if (!isValidExternalUrl(value)) return false;

  try {
    return new URL(value).hostname.toLowerCase().includes("link.coupang.com");
  } catch {
    return false;
  }
}

type CoupangProductParams = {
  pageKey: string;
  itemId: string;
  vendorItemId: string;
};

function buildCoupangTraceId(params: CoupangProductParams): string {
  const seed = `${params.pageKey}:${params.itemId}:${params.vendorItemId}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return `PL-${params.pageKey}-${hash.toString(16)}`;
}

function getCoupangProductParams(url: string): CoupangProductParams | null {
  try {
    const parsed = new URL(url);
    const pageKey = parsed.pathname.match(/\/vp\/products\/(\d+)/)?.[1];
    const itemId = parsed.searchParams.get("itemId");
    const vendorItemId = parsed.searchParams.get("vendorItemId");

    if (!pageKey || !itemId || !vendorItemId) {
      return null;
    }

    return { pageKey, itemId, vendorItemId };
  } catch {
    return null;
  }
}

export function extractCoupangProductParams(url?: string | null): CoupangProductParams | null {
  if (!isValidExternalUrl(url)) {
    return null;
  }

  if (!isCoupangUrl(url)) {
    return null;
  }

  return getCoupangProductParams(url);
}

export function normalizeCoupangUrl(value?: string | null): string | null {
  if (!isValidExternalUrl(value)) {
    return null;
  }

  if (isCoupangPartnersUrl(value)) {
    return value;
  }

  if (!isCoupangUrl(value)) {
    return value;
  }

  const params = getCoupangProductParams(value);
  if (!params) {
    return value;
  }

  const normalized = new URL(`https://www.coupang.com/vp/products/${params.pageKey}`);
  normalized.searchParams.set("itemId", params.itemId);
  normalized.searchParams.set("vendorItemId", params.vendorItemId);
  return normalized.toString();
}

function buildCoupangPartnersProductUrl(
  productUrl: string,
  category?: CoupangLinkCategory | null,
): string | null {
  if (!COUPANG_PARTNERS_TAG) {
    return null;
  }

  const params = getCoupangProductParams(productUrl);
  if (!params) {
    return null;
  }

  const url = new URL("https://link.coupang.com/re/AFFSDP");
  url.searchParams.set("lptag", COUPANG_PARTNERS_TAG);
  const subId = getCoupangSubId(category);
  if (subId) {
    url.searchParams.set("subid", subId);
  }
  url.searchParams.set("pageKey", params.pageKey);
  url.searchParams.set("itemId", params.itemId);
  url.searchParams.set("vendorItemId", params.vendorItemId);
  url.searchParams.set("traceid", buildCoupangTraceId(params));

  return url.toString();
}

export function getCoupangRedirectHref(
  coupangUrl?: string | null,
  category?: CoupangLinkCategory | null,
  slug?: string | null,
): string | null {
  const sourceUrl = normalizeCoupangUrl(coupangUrl) ?? getKnownSourceCoupangUrlBySlug(slug);
  if (!sourceUrl || !isValidCoupangLink(sourceUrl)) {
    return null;
  }

  const params = extractCoupangProductParams(sourceUrl);
  if (!params) {
    return null;
  }

  const redirectUrl = new URL("/api/out/coupang", "https://proteinlab.kr");
  redirectUrl.searchParams.set("pageKey", params.pageKey);
  redirectUrl.searchParams.set("itemId", params.itemId);
  redirectUrl.searchParams.set("vendorItemId", params.vendorItemId);
  if (category) {
    redirectUrl.searchParams.set("category", category);
  }
  if (slug) {
    redirectUrl.searchParams.set("slug", slug);
  }
  return `${redirectUrl.pathname}${redirectUrl.search}`;
}

function buildSearchName(brand: string, name: string): string {
  return name.startsWith(brand) ? name : `${brand} ${name}`;
}

/**
 * coupangUrl이 유효한 쿠팡 파트너스/상품 링크인지 검증.
 * np/search 포함 시 false (검색 URL은 수익 미발생).
 */
export function isValidCoupangLink(value?: string | null): boolean {
  if (!value || value === "#") return false;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (host.includes("link.coupang.com")) return true;
    if (host.includes("coupang.com") && url.pathname.includes("/vp/products/")) {
      const params = getCoupangProductParams(value);
      return params !== null;
    }
    if (url.href.includes("np/search")) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[purchaseLinks] np/search URL은 파트너스 수익이 발생하지 않습니다:", value);
      }
      return false;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * coupangUrl만 사용. 검색 fallback 없음.
 * 유효하지 않으면 null 반환.
 */
export function getPreferredCoupangUrl(
  coupangUrl?: string | null,
  category?: CoupangLinkCategory | null,
): string | null {
  const normalizedCoupangUrl = normalizeCoupangUrl(coupangUrl);
  if (!normalizedCoupangUrl || normalizedCoupangUrl === "#") return null;
  if (!isValidCoupangLink(normalizedCoupangUrl)) return null;

  if (isCoupangPartnersUrl(normalizedCoupangUrl)) return normalizedCoupangUrl;

  if (isCoupangUrl(normalizedCoupangUrl)) {
    return buildCoupangPartnersProductUrl(normalizedCoupangUrl, category) ?? normalizedCoupangUrl;
  }

  return null;
}

export function getKnownSourceCoupangUrlBySlug(slug?: string | null): string | null {
  if (!slug) return null;
  return KNOWN_SOURCE_COUPANG_URLS_BY_SLUG[slug] ?? null;
}

export function getCoupangDestinationUrl(
  coupangUrl?: string | null,
  category?: CoupangLinkCategory | null,
  slug?: string | null,
): string | null {
  const knownSourceUrl = getKnownSourceCoupangUrlBySlug(slug);
  const preferred = getPreferredCoupangUrl(coupangUrl, category);
  if (preferred) {
    return preferred;
  }

  const normalized = normalizeCoupangUrl(coupangUrl);
  if (normalized && isValidCoupangLink(normalized)) {
    return normalized;
  }

  return knownSourceUrl;
}

export function getNaverSearchUrl(brand: string, name: string): string {
  const query = encodeURIComponent(buildSearchName(brand, name));
  return `https://search.shopping.naver.com/search/all?query=${query}`;
}

export function getOfficialMallUrl(brand: string): string | null {
  return BRAND_OFFICIAL_MALL[brand] ?? null;
}

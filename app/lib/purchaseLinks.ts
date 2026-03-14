/**
 * Purchase link helpers.
 * - Coupang: prefer a product-specific Coupang Partners deep link when possible.
 * - Fallback: use Coupang search results when product metadata is insufficient.
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

function buildSearchName(brand: string, name: string): string {
  return name.startsWith(brand) ? name : `${brand} ${name}`;
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

function buildCoupangPartnersProductUrl(productUrl: string): string | null {
  if (!COUPANG_PARTNERS_TAG) {
    return null;
  }

  const params = getCoupangProductParams(productUrl);
  if (!params) {
    return null;
  }

  const url = new URL("https://link.coupang.com/re/AFFSDP");
  url.searchParams.set("lptag", COUPANG_PARTNERS_TAG);
  if (COUPANG_PARTNERS_SUB_ID) {
    url.searchParams.set("subid", COUPANG_PARTNERS_SUB_ID);
  }
  url.searchParams.set("pageKey", params.pageKey);
  url.searchParams.set("itemId", params.itemId);
  url.searchParams.set("vendorItemId", params.vendorItemId);

  return url.toString();
}

export function getCoupangSearchUrl(brand: string, name: string): string {
  const query = encodeURIComponent(buildSearchName(brand, name));
  return `https://www.coupang.com/np/search?component=&q=${query}`;
}

export function getPreferredCoupangUrl(
  brand: string,
  name: string,
  productUrl?: string | null,
): string {
  if (isCoupangPartnersUrl(productUrl)) {
    return productUrl;
  }

  if (isCoupangUrl(productUrl)) {
    return buildCoupangPartnersProductUrl(productUrl) ?? productUrl;
  }

  return getCoupangSearchUrl(brand, name);
}

export function getNaverSearchUrl(brand: string, name: string): string {
  const query = encodeURIComponent(buildSearchName(brand, name));
  return `https://search.shopping.naver.com/search/all?query=${query}`;
}

export function getOfficialMallUrl(brand: string): string | null {
  return BRAND_OFFICIAL_MALL[brand] ?? null;
}

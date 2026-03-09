/**
 * Purchase link helpers.
 * - Coupang: prefer a product-specific Coupang/Coupang Partners URL when available.
 * - Fallback: use normal Coupang search results instead of an affiliate search landing.
 * - Naver: product-name search results.
 * - Official mall: brand homepage when known.
 */

const BRAND_OFFICIAL_MALL: Record<string, string> = {
  빙그레: "https://smartstore.naver.com/bingtft",
  랩노쉬: "https://labnosh.com/",
  마이밀: "https://www.wellife.co.kr/",
  뉴케어: "https://www.wellife.co.kr/",
  셀렉스: "https://www.selexmall.com/",
  얼티브: "https://www.cjthemarket.com/",
  오늘단백: "https://harimmall.com/",
  칼로바이: "https://www.calobye.shop/",
  닥터유: "https://dryoumall.com/",
  파스퇴르: "https://www.lottefoodmall.com/?act=main.pasteur",
  테이크핏: "https://foodismall.com/",
  커클랜드: "https://www.costco.co.kr/",
  온단백: "https://on-protein.com/",
  프로틴방앗간: "https://dailyprotein.co.kr/",
  하루단백바: "https://dailyprotein.co.kr/",
  베노프: "https://benope.com/",
  BSN: "https://www.bsn.co.kr/",
  마이프로틴: "https://www.myprotein.co.kr/",
  롯데웰푸드: "https://www.lottefoodmall.com/",
  오가니카: "https://www.organica.co.kr/",
  켈로그: "https://www.kelloggs.co.kr/",
  코어푸드: "https://crfood.co.kr/",
  연세유업: "https://www.yonseidairy.com/",
  서울우유: "https://www.na100shop.com/",
  그린비아: "https://www.vegemil.co.kr/greenbia/",
  함소아제약: "https://www.hamsoamall.co.kr/",
  노브랜드: "https://emart.ssg.com/",
};

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

export function getCoupangSearchUrl(brand: string, name: string): string {
  const query = encodeURIComponent(buildSearchName(brand, name));
  return `https://www.coupang.com/np/search?component=&q=${query}`;
}

export function getPreferredCoupangUrl(
  brand: string,
  name: string,
  productUrl?: string | null
): string {
  if (isCoupangUrl(productUrl)) {
    return productUrl;
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

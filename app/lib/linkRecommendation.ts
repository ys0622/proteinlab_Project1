/**
 * 구매 링크 추천 provider
 * - 현재: mock/stub 구현
 * - 추후: getCoupangLinkCandidates, getNaverLinkCandidates, getOfficialLinkCandidates를
 *   실제 검색 API로 교체
 */

export type LinkRecommendationType = "coupang" | "naver" | "official";

export interface LinkRecommendationResult {
  title: string;
  url: string;
  type: LinkRecommendationType;
  reason?: string;
}

/** 검색 쿼리 생성: brand + name 우선 */
export function buildSearchQuery(brand: string, name: string): string {
  const b = (brand ?? "").trim();
  const n = (name ?? "").trim();
  if (!n) return "";
  return b ? `${b} ${n}` : n;
}

/** 쿠팡 URL 유효성: link.coupang.com 또는 vp/products+itemId+vendorItemId, np/search 제외 */
export function isValidCoupangRecommendUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (u.href.includes("np/search")) return false;
    if (host.includes("link.coupang.com")) return true;
    if (host.includes("coupang.com") && u.pathname.includes("/vp/products/")) {
      const pageKey = u.pathname.match(/\/vp\/products\/(\d+)/)?.[1];
      const itemId = u.searchParams.get("itemId");
      const vendorItemId = u.searchParams.get("vendorItemId");
      return !!(pageKey && itemId && vendorItemId);
    }
  } catch {}
  return false;
}

/** 네이버 URL 유효성: smartstore/shopping 상품 상세, search 제외 */
export function isValidNaverRecommendUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host.includes("search.naver.com")) return false;
    if (host.includes("search.shopping.naver.com") && u.pathname.includes("/search")) return false;
    if (host.includes("smartstore.naver.com") && u.pathname.includes("/products/")) return true;
    if (host.includes("shopping.naver.com") && !u.pathname.includes("/search")) return true;
  } catch {}
  return false;
}

/** 공식몰 URL 유효성: 브랜드 도메인 상품 상세, 메인/카테고리 제외 */
const BRAND_OFFICIAL_DOMAINS: Record<string, string[]> = {
  "그릭데이": ["greekday.co.kr", "m.greekday.co.kr"],
  "룩트": ["lukt.co.kr", "www.lukt.co.kr"],
  "후디스": ["foodismall.com"],
  "YOZM": ["yozm.co.kr"],
  "매일 바이오": ["direct.maeil.com"],
  "상하목장": ["direct.maeil.com"],
};

export function isValidOfficialRecommendUrl(url: string, brand: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    const path = u.pathname.toLowerCase();
    const domains = BRAND_OFFICIAL_DOMAINS[brand];
    if (!domains) return false;
    const match = domains.some((d) => host === d.replace(/^www\./, "") || host.endsWith("." + d));
    if (!match) return false;
    if (path === "/" || path === "/index" || path === "/index.do" || path === "") return false;
    if (path.includes("/brand/") && !path.includes("/product/") && !path.includes("/shop_view/") && !path.includes("/m/product/")) return false;
    return path.includes("/product/") || path.includes("/shop_view/") || path.includes("/m/product/") || path.includes("productView.do");
  } catch {}
  return false;
}

/** Provider: 쿠팡 링크 후보 (현재 mock) */
export async function getCoupangLinkCandidates(query: string): Promise<LinkRecommendationResult[]> {
  if (!query.trim()) return [];
  // TODO: 실제 쿠팡 검색 API 연동
  return [];
}

/** Provider: 네이버 링크 후보 (현재 mock) */
export async function getNaverLinkCandidates(query: string): Promise<LinkRecommendationResult[]> {
  if (!query.trim()) return [];
  // TODO: 실제 네이버 쇼핑 검색 API 연동
  return [];
}

/** 공식몰 mock 샘플 (후디스/그릭데이/YOZM/매일바이오/룩트 - 브랜드별 1개 예시) */
const OFFICIAL_MOCK_SAMPLES: Record<string, LinkRecommendationResult[]> = {
  "후디스": [
    { title: "후디스 그릭요거트 플레인 80g", url: "https://foodismall.com/product/%ED%9B%84%EB%94%94%EC%8A%A4-%EA%B7%B8%EB%A6%AD%EC%9A%94%EA%B1%B0%ED%8A%B8-%ED%94%8C%EB%A0%88%EC%9D%B8-80gx16ea/278/", type: "official", reason: "후디스몰 상품 상세" },
  ],
  "그릭데이": [
    { title: "그릭데이 그릭요거트 라이트 450g", url: "https://greekday.co.kr/product/%EA%B7%B8%EB%A6%AD%EB%8D%B0%EC%9D%B4-%EA%B7%B8%EB%A6%AD%EC%9A%94%EA%B1%B0%ED%8A%B8-%EB%9D%BC%EC%9D%B4%ED%8A%B8-450g/13/", type: "official", reason: "그릭데이 공식몰 상품 상세" },
  ],
  "YOZM": [
    { title: "요즘 그릭요거트 플레인 450g", url: "https://yozm.co.kr/product/%EC%9A%94%EC%A6%98-%EA%B7%B8%EB%A6%AD%EC%9A%94%EA%B1%B0%ED%8A%B8-%ED%94%8C%EB%A0%88%EC%9D%B8-450g/68/category/112/display/1/", type: "official", reason: "YOZM 공식몰 상품 상세" },
  ],
  "매일 바이오": [
    { title: "매일 바이오 그릭 그릭델라이트 바나나 80g", url: "https://direct.maeil.com/m/product/productView.do?productCode=P20719", type: "official", reason: "매일 바이오 공식몰 상품 상세" },
  ],
  "룩트": [
    { title: "룩트 아이슬란딕 그릭 100g", url: "https://lukt.co.kr/shop_view/209", type: "official", reason: "룩트 공식몰 상품 상세" },
  ],
};

/** Provider: 공식몰 링크 후보 (현재 mock - 브랜드별 샘플) */
export async function getOfficialLinkCandidates(
  query: string,
  brand: string
): Promise<LinkRecommendationResult[]> {
  if (!query.trim() || !brand.trim()) return [];
  const b = brand.trim();
  const samples = OFFICIAL_MOCK_SAMPLES[b];
  if (samples) return [...samples];
  return [];
}

/** 통합: type별 provider 호출 후 필터링 */
export async function getLinkRecommendations(
  brand: string,
  name: string,
  type: LinkRecommendationType
): Promise<LinkRecommendationResult[]> {
  const query = buildSearchQuery(brand, name);
  if (!query) return [];

  let raw: LinkRecommendationResult[] = [];
  if (type === "coupang") {
    raw = await getCoupangLinkCandidates(query);
  } else if (type === "naver") {
    raw = await getNaverLinkCandidates(query);
  } else {
    raw = await getOfficialLinkCandidates(query, brand);
  }

  const filtered = raw.filter((r) => {
    if (type === "coupang") return isValidCoupangRecommendUrl(r.url);
    if (type === "naver") return isValidNaverRecommendUrl(r.url);
    return isValidOfficialRecommendUrl(r.url, brand);
  });

  return filtered.slice(0, 5);
}

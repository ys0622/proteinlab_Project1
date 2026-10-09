import type { ProductDetailProps } from "../data/products";
import newProductsRaw from "../data/newProducts.json";
import {
  getCoupangBestSellerBonus,
  getQualityScore,
  isExcludedFromPopularityRanking,
} from "./productScoring";

// reason은 카드에 붙는 배지 근거다. site_interest는 배지를 달지 않는다.
export type DiscoveryReason = "coupang_best" | "recently_added" | "site_interest";
export type DiscoveryProduct = { product: ProductDetailProps; reason: DiscoveryReason };

const addedDates = new Map(
  (newProductsRaw as { slug: string; addedAt: string }[]).map(({ slug, addedAt }) => [slug, addedAt]),
);
const RECENT_DAYS = 30;

// 점수 구성(합계 100점 + 신제품 최대 6점). 조회수는 표본이 작아 로그로 완만하게 반영하고,
// 쿠팡 판매순이 확인되면 가장 믿을 만한 신호로 본다. 영양 품질은 동점·소표본의 순서를 잡는다.
const WEIGHT_VIEWS = 0.5;
const WEIGHT_COUPANG = 0.3;
const WEIGHT_QUALITY = 0.2;
const NEW_PRODUCT_MAX_POINTS = 6;
const MAX_PER_BRAND = 2;

function daysSinceAdded(product: ProductDetailProps, now: number): number | null {
  // For KV-created products this is assigned by the server, not supplied by a visitor.
  const createdAt = product.createdAt ?? addedDates.get(product.slug);
  if (!createdAt) return null;
  const created = Date.parse(createdAt);
  const days = Math.floor((now - created) / 86_400_000);
  return Number.isFinite(days) && days >= 0 && days < RECENT_DAYS ? days : null;
}

/**
 * 홈 "지금 인기 제품" 선정.
 * 점수 = 최근 7일 조회수(로그) 50% + 쿠팡 판매순 30% + 영양 품질(카테고리 내 백분위) 20% + 신제품 소량 가점.
 * 쿠팡 판매순은 API 매칭 순위와 수동 캡처 순위(21일 감쇠) 중 높은 쪽을 쓴다. 둘 다 없으면 0점이다.
 * 신호가 하나도 없는 제품은 신호가 있는 제품이 모두 소진된 뒤에만 채운다. 브랜드당 최대 2개.
 */
export function selectHomeDiscovery(
  products: ProductDetailProps[],
  views: Record<string, number>,
  coupangRanks: Record<string, number>,
  now = Date.now(),
  limit = 10,
): DiscoveryProduct[] {
  const eligible = products.filter((product) => product.slug && !isExcludedFromPopularityRanking(product));
  if (eligible.length === 0) return [];

  const maxViews = Math.max(1, ...eligible.map((product) => views[product.slug] ?? 0));
  const qualities = eligible.map(getQualityScore);
  const sortedQualities = [...qualities].sort((a, b) => a - b);
  const percentile = (quality: number) =>
    sortedQualities.filter((value) => value < quality).length / Math.max(1, sortedQualities.length - 1);

  const scored = eligible.map((product, index) => {
    const viewCount = views[product.slug] ?? 0;
    const viewPoints = (100 * Math.log1p(viewCount)) / Math.log1p(maxViews);

    const apiRank = coupangRanks[product.slug];
    const apiPoints = Number.isInteger(apiRank) && apiRank > 0 ? 100 - Math.min(apiRank, 100) + 1 : 0;
    const manualPoints = Math.min(100, getCoupangBestSellerBonus(product.slug) / 4.2);
    const coupangPoints = Math.max(apiPoints, manualPoints);

    const age = daysSinceAdded(product, now);
    const newPoints = age === null ? 0 : NEW_PRODUCT_MAX_POINTS * (1 - age / RECENT_DAYS);
    const qualityPoints = 100 * percentile(qualities[index]);

    const score = WEIGHT_VIEWS * viewPoints + WEIGHT_COUPANG * coupangPoints + WEIGHT_QUALITY * qualityPoints + newPoints;
    const hasSignal = viewCount > 0 || coupangPoints > 0 || newPoints > 0;
    const reason: DiscoveryReason = coupangPoints > 0 ? "coupang_best" : newPoints > 0 ? "recently_added" : "site_interest";
    return { product, score, hasSignal, reason, viewCount, coupangPoints };
  });

  scored.sort(
    (a, b) =>
      Number(b.hasSignal) - Number(a.hasSignal) ||
      b.score - a.score ||
      b.coupangPoints - a.coupangPoints ||
      b.viewCount - a.viewCount ||
      a.product.name.localeCompare(b.product.name),
  );

  const result: DiscoveryProduct[] = [];
  const brandCounts = new Map<string, number>();
  for (const entry of scored) {
    if (result.length >= limit) break;
    const used = brandCounts.get(entry.product.brand) ?? 0;
    if (used >= MAX_PER_BRAND) continue;
    brandCounts.set(entry.product.brand, used + 1);
    result.push({ product: entry.product, reason: entry.reason });
  }
  return result;
}

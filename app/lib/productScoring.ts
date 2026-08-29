import type { ProductDetailProps } from "../data/products";
import newProductsRaw from "../data/newProducts.json";
import tvAdProductsRaw from "../data/tvAdProducts.json";

interface NewProductEntry {
  slug: string;
  addedAt: string; // "YYYY-MM-DD"
}

interface TvAdProductEntry {
  slug: string;
  model: string;
  year: number;
  boostRanking?: boolean;
}

const NEW_PRODUCTS: NewProductEntry[] = newProductsRaw as NewProductEntry[];
const TV_AD_PRODUCTS: TvAdProductEntry[] = tvAdProductsRaw as TvAdProductEntry[];
const TV_AD_SLUGS = new Set(TV_AD_PRODUCTS.map((p) => p.slug));
const TV_AD_BOOST_SLUGS = new Set(TV_AD_PRODUCTS.filter((p) => p.boostRanking).map((p) => p.slug));

// TV 광고 중인 제품에 주는 고정 보너스 (조회수 20회 수준)
const TV_AD_BONUS = 200;

/** 현재 TV 광고 중인 제품인지 확인 (배지 표시용 — 순위 반영 여부와 무관) */
export function isTvAdProduct(slug: string | undefined): boolean {
  if (!slug) return false;
  return TV_AD_SLUGS.has(slug);
}

/** TV 광고 보너스 — boostRanking이 true인 제품만 순위에 반영 (신제품 감쇠와 달리 광고 기간 동안 고정) */
export function getTvAdBonus(slug: string | undefined): number {
  if (!slug) return 0;
  return TV_AD_BOOST_SLUGS.has(slug) ? TV_AD_BONUS : 0;
}

// 신제품 보너스 유효 기간 (일)
const NEW_PRODUCT_WINDOW_DAYS = 30;
// 최대 신제품 보너스 (조회수 30회 수준)
const NEW_PRODUCT_MAX_BONUS = 300;

/** 신제품 감쇠 보너스 — 추가 후 30일간 선형 감소 */
export function getNewProductBonus(slug: string | undefined): number {
  if (!slug) return 0;
  const entry = NEW_PRODUCTS.find((p) => p.slug === slug);
  if (!entry) return 0;

  const addedAt = new Date(entry.addedAt);
  const now = new Date();
  const daysSinceAdded = Math.floor((now.getTime() - addedAt.getTime()) / (1000 * 60 * 60 * 24));

  if (daysSinceAdded >= NEW_PRODUCT_WINDOW_DAYS) return 0;

  // 선형 감쇠: 추가 당일 300점 → 30일 후 0점
  const ratio = 1 - daysSinceAdded / NEW_PRODUCT_WINDOW_DAYS;
  return Math.round(NEW_PRODUCT_MAX_BONUS * ratio);
}

/** 용량(mL/g) 파싱 */
function parseCapacityMl(capacity: string | undefined): number {
  if (!capacity) return 0;
  const m = capacity.match(/(\d+(?:\.\d+)?)\s*(?:mL|ml|g)/i);
  return m ? parseFloat(m[1]) : 0;
}

/**
 * 하이브리드 점수
 *
 *   = 실제 조회수 × 10          (조회수가 쌓일수록 비중 ↑)
 *   + 품질 점수                 (단백질 밀도, 단백질량, 당류 기반)
 *   + 신제품 감쇠 보너스        (추가 후 30일간 최대 300점)
 */
export function hybridScore(
  product: ProductDetailProps,
  views: number,
): number {
  // ── 품질 점수 ──────────────────────────────────────
  const ml = parseCapacityMl(product.capacity);
  const density = ml > 0 ? (product.proteinPerServing / ml) * 100 : 0;

  const qualityScore =
    density * 15                        // 단백질 밀도 (핵심 지표)
    + product.proteinPerServing * 2     // 단백질 총량
    - (product.sugar ?? 5) * 3         // 당류 패널티
    - (product.calories ?? 150) * 0.04;// 칼로리 패널티

  // ── 조회수 점수 ───────────────────────────────────
  const viewScore = views * 10;

  // ── 신제품 보너스 ─────────────────────────────────
  const newBonus = getNewProductBonus(product.slug);

  // ── TV 광고 보너스 ────────────────────────────────
  const adBonus = getTvAdBonus(product.slug);

  return viewScore + qualityScore + newBonus + adBonus;
}

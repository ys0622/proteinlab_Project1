/**
 * 제품 데이터 통합 조회 (JSON + KV 신규)
 * - JSON 원본 + product-new:* 병합
 * - getProductBySlugAsync: 상세용 (JSON → KV new 순)
 * - getProductsByCategoryAsync: 목록용 (카테고리별)
 */
import type { ProductDetailProps } from "@/app/data/products";
import {
  mockProducts,
  barProductsWithGrades,
  shakeProducts,
  yogurtProductsWithGrades,
} from "@/app/data/products";
import { getAllNewProductsFromKV } from "./productKV";
import { withProductOverride } from "./productOverride";

export type ProductCategory = "drink" | "bar" | "yogurt" | "shake";

function toProductDetailProps(raw: Record<string, unknown>): ProductDetailProps {
  const p = raw as unknown as ProductDetailProps;
  return {
    ...p,
    slug: String(p.slug ?? ""),
    brand: String(p.brand ?? ""),
    name: String(p.name ?? ""),
    capacity: String(p.capacity ?? ""),
    tags: Array.isArray(p.tags) ? p.tags : [],
    proteinPerServing: Number(p.proteinPerServing) || 0,
    density: String(p.density ?? ""),
    productType: (p.productType as ProductCategory) ?? "drink",
  };
}

/** JSON에 slug 존재 여부 */
export function slugExistsInJson(slug: string): boolean {
  return (
    mockProducts.some((p) => p.slug === slug) ||
    barProductsWithGrades.some((p) => p.slug === slug) ||
    yogurtProductsWithGrades.some((p) => p.slug === slug) ||
    shakeProducts.some((p) => p.slug === slug)
  );
}

/** slug로 제품 조회 (JSON 우선 + override, 없으면 KV 신규) */
export async function getProductBySlugAsync(
  slug: string
): Promise<ProductDetailProps | null> {
  const fromJson =
    barProductsWithGrades.find((p) => p.slug === slug) ??
    yogurtProductsWithGrades.find((p) => p.slug === slug) ??
    shakeProducts.find((p) => p.slug === slug) ??
    mockProducts.find((p) => p.slug === slug) ??
    null;

  if (fromJson) return withProductOverride(fromJson);

  const fromKV = await getAllNewProductsFromKV();
  const found = fromKV.find((p) => (p.slug as string) === slug);
  if (found) return toProductDetailProps(found);

  return null;
}

// 목록 페이지는 요청마다 제품 override를 KV에서 1건씩(전체 ~380회) 읽고 신규 제품도 순차 조회해서
// TTFB가 1~4초로 늘어졌다. Worker 인스턴스는 요청 사이에 살아 있으므로 결과를 짧게 메모리에 둔다.
// admin 화면은 이 함수를 쓰지 않아 override 수정은 최대 60초 안에 목록에 반영된다.
const CATEGORY_CACHE_TTL_MS = 60_000;
const categoryCache = new Map<
  ProductCategory,
  { at: number; value: Promise<ProductDetailProps[]> }
>();

/** 카테고리별 제품 목록 (JSON + KV 신규, JSON 제품에 override 적용, 60초 메모리 캐시) */
export function getProductsByCategoryAsync(
  category: ProductCategory
): Promise<ProductDetailProps[]> {
  const hit = categoryCache.get(category);
  if (hit && Date.now() - hit.at < CATEGORY_CACHE_TTL_MS) return hit.value;

  const value = loadProductsByCategory(category);
  categoryCache.set(category, { at: Date.now(), value });
  value.catch(() => categoryCache.delete(category));
  return value;
}

async function loadProductsByCategory(
  category: ProductCategory
): Promise<ProductDetailProps[]> {
  const base =
    category === "drink"
      ? mockProducts
      : category === "bar"
        ? barProductsWithGrades
        : category === "yogurt"
          ? yogurtProductsWithGrades
          : shakeProducts;

  const kvNew = await getAllNewProductsFromKV();
  const newInCategory = kvNew
    .filter((p) => (p.productType as string) === category)
    .map(toProductDetailProps);

  const baseSlugs = new Set(base.map((p) => p.slug));
  const appended = newInCategory.filter((p) => !baseSlugs.has(p.slug));

  const withOverrides = await Promise.all(
    base.map((p) => withProductOverride(p))
  );
  return [...withOverrides, ...appended];
}

/** 전체 제품 (JSON + KV 신규, 카테고리별 병합) */
export async function getAllProductsAsync(): Promise<ProductDetailProps[]> {
  const [drinks, bars, yogurts, shakes] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
  ]);
  return [...drinks, ...bars, ...yogurts, ...shakes];
}

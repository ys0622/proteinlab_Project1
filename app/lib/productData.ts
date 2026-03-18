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
  yogurtProductsWithGrades,
} from "@/app/data/products";
import { getAllNewProductsFromKV } from "./productKV";
import { withProductOverride } from "./productOverride";

export type ProductCategory = "drink" | "bar" | "yogurt";

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
    yogurtProductsWithGrades.some((p) => p.slug === slug)
  );
}

/** slug로 제품 조회 (JSON 우선 + override, 없으면 KV 신규) */
export async function getProductBySlugAsync(
  slug: string
): Promise<ProductDetailProps | null> {
  const fromJson =
    barProductsWithGrades.find((p) => p.slug === slug) ??
    yogurtProductsWithGrades.find((p) => p.slug === slug) ??
    mockProducts.find((p) => p.slug === slug) ??
    null;

  if (fromJson) return withProductOverride(fromJson);

  const fromKV = await getAllNewProductsFromKV();
  const found = fromKV.find((p) => (p.slug as string) === slug);
  if (found) return toProductDetailProps(found);

  return null;
}

/** 카테고리별 제품 목록 (JSON + KV 신규, JSON 제품에 override 적용) */
export async function getProductsByCategoryAsync(
  category: ProductCategory
): Promise<ProductDetailProps[]> {
  const base =
    category === "drink"
      ? mockProducts
      : category === "bar"
        ? barProductsWithGrades
        : yogurtProductsWithGrades;

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
  const [drinks, bars, yogurts] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
  ]);
  return [...drinks, ...bars, ...yogurts];
}

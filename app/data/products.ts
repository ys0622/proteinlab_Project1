import type { ProductCardProps } from "../components/ProductCard";

/** 영양성분 상세 (1병/1개 기준) 항목 */
export interface NutritionDetailRow {
  label: string;
  value: string;
}

/** 상세 페이지용 확장 필드 */
export interface ProductDetailFields {
  slug: string;
  productType?: "drink" | "bar";
  manufacturer?: string;
  flavor?: string;
  bcaa?: string;
  proteinSource?: string;
  fat?: number;
  sodium?: number;
  calorieDensity?: string;
  drinkType?: string;
  gradeDescriptions?: [string, string, string];
  nutritionDetail?: NutritionDetailRow[];
}

export type ProductDetailProps = ProductCardProps & ProductDetailFields;

import { getDrinkProductsFromImageMap } from "./drinkProductsFromImageMap";
import { mockBarProducts } from "./barProductsFromProteinlab";
import { applyDrinkGrades, applyBarGrades } from "../lib/gradeCalculation";

/** 단백질 음료 목록: productImage slug와 일치, 등급은 proteinlab.kr 기준으로 산정 */
export const mockProducts: ProductDetailProps[] = applyDrinkGrades(getDrinkProductsFromImageMap());

/** proteinlab.kr/bars 기준 단백질바 59개 (원본) */
export { mockBarProducts } from "./barProductsFromProteinlab";

/** 단백질바 + 밀도/다이어트/퍼포먼스 등급 적용 (랭킹·상세용) */
export const barProductsWithGrades: ProductDetailProps[] = applyBarGrades(mockBarProducts);

/** 1병/1개 기준 영양성분 상세 */
export function getNutritionDetail(p: ProductDetailProps): NutritionDetailRow[] {
  if (p.nutritionDetail?.length) return p.nutritionDetail;
  return [
    { label: "열량", value: p.calories != null ? `${p.calories}kcal` : "—" },
    { label: "단백질", value: `${p.proteinPerServing}g` },
    { label: "당류", value: p.sugar !== undefined ? `${p.sugar}g` : "—" },
  ];
}

export function getAllProducts(): ProductDetailProps[] {
  return [...mockProducts, ...barProductsWithGrades];
}

export function getProductBySlug(slug: string): ProductDetailProps | null {
  const bar = barProductsWithGrades.find((p) => p.slug === slug);
  if (bar) return bar;
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export function enrichProductDetail(p: ProductDetailProps): ProductDetailProps {
  return p;
}

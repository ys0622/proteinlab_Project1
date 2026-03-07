import type { ProductCardProps } from "../components/ProductCard";

/** 영양성분 상세 (1병/1개 기준) 항목 */
export interface NutritionDetailRow {
  label: string;
  value: string;
}

/** proteinlab.kr 기반 1병 기준 영양성분 */
export interface NutritionPerBottle {
  caloriesKcal?: number;
  proteinG?: number;
  carbsG?: number;
  sugarsG?: number;
  fatG?: number;
  satFatG?: number;
  transFatG?: number;
  cholesterolMg?: number;
  sodiumMg?: number;
  fiberG?: number;
  bcaaMg?: number;
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
  nutritionPerBottle?: NutritionPerBottle;
}

export type ProductDetailProps = ProductCardProps & ProductDetailFields;

import { getDrinkProducts } from "./drinkProductsData";
import { getBarProducts } from "./barProductsData";
import { applyDrinkGrades, applyBarGrades } from "../lib/gradeCalculation";

/** 단백질 음료 목록: proteinlab.kr 동기화 데이터 기반, 등급 산정 */
export const mockProducts: ProductDetailProps[] = applyDrinkGrades(getDrinkProducts());

/** 단백질바: proteinlab.kr 동기화 데이터 기반 */
export const mockBarProducts: ProductDetailProps[] = getBarProducts();

/** 단백질바 + 밀도/다이어트/퍼포먼스 등급 적용 (랭킹·상세용) */
export const barProductsWithGrades: ProductDetailProps[] = applyBarGrades(mockBarProducts);

/** 1병/1개 기준 영양성분 상세 */
export function getNutritionDetail(p: ProductDetailProps): NutritionDetailRow[] {
  if (p.nutritionDetail?.length) return p.nutritionDetail;

  const n = p.nutritionPerBottle;
  if (n) {
    const rows: NutritionDetailRow[] = [
      { label: "열량", value: n.caloriesKcal != null ? `${n.caloriesKcal}kcal` : "—" },
      { label: "탄수화물", value: n.carbsG != null ? `${n.carbsG}g` : "—" },
      { label: "당류", value: n.sugarsG != null ? `${n.sugarsG}g` : "—" },
      { label: "단백질", value: n.proteinG != null ? `${n.proteinG}g` : "—" },
      { label: "지방", value: n.fatG != null ? `${n.fatG}g` : "—" },
      { label: "포화지방", value: n.satFatG != null ? `${n.satFatG}g` : "—" },
    ];
    if (n.transFatG != null) rows.push({ label: "트랜스지방", value: `${n.transFatG}g` });
    if (n.cholesterolMg != null) rows.push({ label: "콜레스테롤", value: `${n.cholesterolMg}mg` });
    rows.push({ label: "나트륨", value: n.sodiumMg != null ? `${n.sodiumMg}mg` : "—" });
    if (n.fiberG != null) rows.push({ label: "식이섬유", value: `${n.fiberG}g` });
    if (n.bcaaMg != null) rows.push({ label: "BCAA", value: `${n.bcaaMg}mg` });
    return rows;
  }

  /** 단백질바: barProductsData에 있는 필드 기준 (열량/당류/단백질/지방/나트륨 등) */
  if (p.productType === "bar") {
    return [
      { label: "열량", value: p.calories != null ? `${p.calories}kcal` : "—" },
      { label: "탄수화물", value: "—" },
      { label: "당류", value: p.sugar !== undefined ? `${p.sugar}g` : "—" },
      { label: "단백질", value: `${p.proteinPerServing}g` },
      { label: "지방", value: p.fat !== undefined ? `${p.fat}g` : "—" },
      { label: "포화지방", value: "—" },
      { label: "나트륨", value: p.sodium !== undefined ? `${p.sodium}mg` : "—" },
    ];
  }

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

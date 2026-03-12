import type { ProductCardProps } from "../components/ProductCard";

export interface NutritionDetailRow {
  label: string;
  value: string;
}

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

export interface ProductDetailFields {
  slug: string;
  productType?: "drink" | "bar";
  nutritionBasis?: "per_unit" | "per_pack" | "unknown";
  needsServingCheck?: boolean;
  servingCheckNote?: string;
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

export const mockProducts: ProductDetailProps[] = applyDrinkGrades(getDrinkProducts());
export const mockBarProducts: ProductDetailProps[] = getBarProducts();
export const barProductsWithGrades: ProductDetailProps[] = applyBarGrades(mockBarProducts);

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

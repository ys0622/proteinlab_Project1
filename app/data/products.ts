import type { ProductCardProps } from "../components/ProductCard";
import { applyBarGrades, applyDrinkGrades, applyYogurtGrades } from "../lib/gradeCalculation";
import { getBarProducts } from "./barProductsData";
import { getDrinkProducts } from "./drinkProductsData";
import { getYogurtProducts } from "./yogurtProductsData";

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
  productType?: "drink" | "bar" | "yogurt";
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
  yogurtType?: string;
  storageType?: string;
  lactoseFree?: boolean;
  proteinPer100g?: number;
  gradeDescriptions?: [string, string, string];
  nutritionDetail?: NutritionDetailRow[];
  nutritionPerBottle?: NutritionPerBottle;
}

export type ProductDetailProps = ProductCardProps & ProductDetailFields;

export const mockProducts: ProductDetailProps[] = applyDrinkGrades(getDrinkProducts());
export const mockBarProducts: ProductDetailProps[] = getBarProducts();
export const barProductsWithGrades: ProductDetailProps[] = applyBarGrades(mockBarProducts);
export const yogurtProducts: ProductDetailProps[] = getYogurtProducts();
export const yogurtProductsWithGrades: ProductDetailProps[] = applyYogurtGrades(yogurtProducts);

function formatValue(value: number | undefined, unit: string) {
  return value != null ? `${value}${unit}` : "-";
}

export function getNutritionDetail(p: ProductDetailProps): NutritionDetailRow[] {
  if (p.nutritionDetail?.length) return p.nutritionDetail;

  const n = p.nutritionPerBottle;
  if (n && p.productType === "yogurt") {
    return [
      { label: "칼로리", value: formatValue(n.caloriesKcal, "kcal") },
      { label: "탄수화물", value: formatValue(n.carbsG, "g") },
      { label: "당류", value: formatValue(n.sugarsG, "g") },
      { label: "단백질", value: formatValue(n.proteinG, "g") },
      { label: "지방", value: formatValue(n.fatG, "g") },
      { label: "포화지방", value: formatValue(n.satFatG, "g") },
      { label: "콜레스테롤", value: formatValue(n.cholesterolMg, "mg") },
      { label: "나트륨", value: formatValue(n.sodiumMg, "mg") },
      { label: "BCAA", value: formatValue(n.bcaaMg, "mg") },
    ];
  }

  if (n) {
    const rows: NutritionDetailRow[] = [
      { label: "칼로리", value: formatValue(n.caloriesKcal, "kcal") },
      { label: "탄수화물", value: formatValue(n.carbsG, "g") },
      { label: "당류", value: formatValue(n.sugarsG, "g") },
      { label: "단백질", value: formatValue(n.proteinG, "g") },
      { label: "지방", value: formatValue(n.fatG, "g") },
      { label: "포화지방", value: formatValue(n.satFatG, "g") },
    ];
    if (n.transFatG != null) rows.push({ label: "트랜스지방", value: `${n.transFatG}g` });
    if (n.cholesterolMg != null) rows.push({ label: "콜레스테롤", value: `${n.cholesterolMg}mg` });
    rows.push({ label: "나트륨", value: formatValue(n.sodiumMg, "mg") });
    if (n.fiberG != null) rows.push({ label: "식이섬유", value: `${n.fiberG}g` });
    if (n.bcaaMg != null) rows.push({ label: "BCAA", value: `${n.bcaaMg}mg` });
    return rows;
  }

  if (p.productType === "bar") {
    return [
      { label: "칼로리", value: formatValue(p.calories, "kcal") },
      { label: "탄수화물", value: "-" },
      { label: "당류", value: formatValue(p.sugar, "g") },
      { label: "단백질", value: `${p.proteinPerServing}g` },
      { label: "지방", value: formatValue(p.fat, "g") },
      { label: "포화지방", value: "-" },
      { label: "나트륨", value: formatValue(p.sodium, "mg") },
    ];
  }

  if (p.productType === "yogurt") {
    return [
      { label: "칼로리", value: formatValue(p.calories, "kcal") },
      { label: "탄수화물", value: "-" },
      { label: "당류", value: formatValue(p.sugar, "g") },
      { label: "단백질", value: `${p.proteinPerServing}g` },
      { label: "지방", value: formatValue(p.fat, "g") },
      { label: "포화지방", value: "-" },
      { label: "콜레스테롤", value: "-" },
      { label: "나트륨", value: formatValue(p.sodium, "mg") },
      { label: "BCAA", value: "-" },
    ];
  }

  return [
    { label: "칼로리", value: formatValue(p.calories, "kcal") },
    { label: "단백질", value: `${p.proteinPerServing}g` },
    { label: "당류", value: formatValue(p.sugar, "g") },
  ];
}

export function getAllProducts(): ProductDetailProps[] {
  return [...mockProducts, ...barProductsWithGrades, ...yogurtProductsWithGrades];
}

export function getProductBySlug(slug: string): ProductDetailProps | null {
  const bar = barProductsWithGrades.find((p) => p.slug === slug);
  if (bar) return bar;
  const yogurt = yogurtProductsWithGrades.find((p) => p.slug === slug);
  if (yogurt) return yogurt;
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export function enrichProductDetail(p: ProductDetailProps): ProductDetailProps {
  return p;
}

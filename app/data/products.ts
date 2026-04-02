import { applyBarGrades, applyDrinkGrades, applyShakeGrades, applyYogurtGrades } from "../lib/gradeCalculation";
import { getBarProducts } from "./barProductsData";
import { getDrinkProducts } from "./drinkProductsData";
import type {
  NutritionDetailRow,
  ProductDetailProps,
} from "./productTypes";
import { getShakeProducts } from "./shakeProductsData";
import { getYogurtProducts } from "./yogurtProductsData";

export type {
  NutritionDetailRow,
  NutritionPerBottle,
  ProductDetailFields,
  ProductDetailProps,
} from "./productTypes";

export const mockProducts: ProductDetailProps[] = applyDrinkGrades(getDrinkProducts());
export const mockBarProducts: ProductDetailProps[] = getBarProducts();
export const barProductsWithGrades: ProductDetailProps[] = applyBarGrades(mockBarProducts);
export const yogurtProducts: ProductDetailProps[] = getYogurtProducts();
export const yogurtProductsWithGrades: ProductDetailProps[] = applyYogurtGrades(yogurtProducts);
export const shakeProducts: ProductDetailProps[] = applyShakeGrades(getShakeProducts());

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

  if (n && p.productType === "drink") {
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
    rows.push({ label: "BCAA", value: `${n.bcaaMg ?? 0}mg` });
    return rows;
  }

  if (n && p.productType === "shake") {
    const rows: NutritionDetailRow[] = [
      { label: "칼로리", value: formatValue(n.caloriesKcal, "kcal") },
      { label: "탄수화물", value: formatValue(n.carbsG, "g") },
      { label: "당류", value: formatValue(n.sugarsG, "g") },
      { label: "단백질", value: formatValue(n.proteinG, "g") },
      { label: "지방", value: formatValue(n.fatG, "g") },
      { label: "포화지방", value: formatValue(n.satFatG, "g") },
      { label: "트랜스지방", value: formatValue(n.transFatG, "g") },
      { label: "콜레스테롤", value: formatValue(n.cholesterolMg, "mg") },
      { label: "나트륨", value: formatValue(n.sodiumMg, "mg") },
      { label: "식이섬유", value: formatValue(n.fiberG ?? 0, "g") },
      { label: "BCAA", value: formatValue(n.bcaaMg ?? 0, "mg") },
    ];
    return rows;
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
  return [...mockProducts, ...barProductsWithGrades, ...yogurtProductsWithGrades, ...shakeProducts];
}

export function getProductBySlug(slug: string): ProductDetailProps | null {
  const bar = barProductsWithGrades.find((p) => p.slug === slug);
  if (bar) return bar;
  const yogurt = yogurtProductsWithGrades.find((p) => p.slug === slug);
  if (yogurt) return yogurt;
  const shake = shakeProducts.find((p) => p.slug === slug);
  if (shake) return shake;
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export function enrichProductDetail(p: ProductDetailProps): ProductDetailProps {
  return p;
}

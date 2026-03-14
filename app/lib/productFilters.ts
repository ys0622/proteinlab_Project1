import type { ProductDetailProps } from "../data/products";

export function getCapacityMl(product: { capacity: string }): number {
  const match = product.capacity.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function getProteinSourceCategory(product: ProductDetailProps): "식물성" | "유청" | "혼합" {
  if (product.proteinSource === "식물성") return "식물성";

  const haystack = [product.proteinSource, product.name, ...(product.tags ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/식물성|비건|soy|pea|oat/.test(haystack)) return "식물성";
  if (product.proteinSource === "유청" || product.drinkType === "파우더") return "유청";
  return "혼합";
}

export function getTasteCategory(
  product: ProductDetailProps,
): "고소/견과" | "과일맛" | "바나나/바닐라" | "초콜릿/케이크" | "커피" | "기타" {
  const haystack = [product.name, product.flavor].filter(Boolean).join(" ").toLowerCase();

  if (/초코|초콜릿|케이크|쿠키/.test(haystack)) return "초콜릿/케이크";
  if (/커피|모카|라떼|에스프레소/.test(haystack)) return "커피";
  if (/바나나|바닐라/.test(haystack)) return "바나나/바닐라";
  if (/딸기|베리|복숭아|사과|감귤|망고|포도|블루베리/.test(haystack)) return "과일맛";
  if (/고소|견과|곡물|귀리|참깨|유자|치즈넛/.test(haystack)) return "고소/견과";
  return "기타";
}

export type VolumeRange = "200mL 이하" | "200~300mL" | "300~400mL" | "400mL 이상";

export function getVolumeRange(product: { capacity: string }): VolumeRange {
  const ml = getCapacityMl(product);
  if (ml <= 200) return "200mL 이하";
  if (ml <= 300) return "200~300mL";
  if (ml <= 400) return "300~400mL";
  return "400mL 이상";
}

export type ProteinRange =
  | "초고단백(30g 이상)"
  | "고단백(20g 이상)"
  | "일반단백(20g 미만)";

export function getProteinRange(product: { proteinPerServing: number }): ProteinRange {
  if (product.proteinPerServing >= 30) return "초고단백(30g 이상)";
  if (product.proteinPerServing >= 20) return "고단백(20g 이상)";
  return "일반단백(20g 미만)";
}

export type ProteinRangeBar =
  | "고단백(20g 이상)"
  | "중간단백(15~20g)"
  | "일반단백(15g 미만)";

export function getProteinRangeBar(product: { proteinPerServing: number }): ProteinRangeBar {
  if (product.proteinPerServing >= 20) return "고단백(20g 이상)";
  if (product.proteinPerServing >= 15) return "중간단백(15~20g)";
  return "일반단백(15g 미만)";
}

export type SugarRangeBar = "당류 0g" | "저당(5g 미만)" | "보통당(5~10g)" | "고당(10g 이상)";

export function getSugarRangeBar(product: { sugar?: number }): SugarRangeBar {
  const sugar = product.sugar ?? 0;
  if (sugar <= 0) return "당류 0g";
  if (sugar < 5) return "저당(5g 미만)";
  if (sugar <= 10) return "보통당(5~10g)";
  return "고당(10g 이상)";
}

export type WeightRangeBar = "50g 이하" | "50~60g" | "60g 이상";

export function getBarWeightRange(product: { capacity: string }): WeightRangeBar {
  const weight = getCapacityMl(product);
  if (weight <= 50) return "50g 이하";
  if (weight < 60) return "50~60g";
  return "60g 이상";
}

export type YogurtProteinRange =
  | "고단백(15g 이상)"
  | "중간단백(10~15g)"
  | "일반단백(10g 미만)";

export type YogurtSugarRange = "당류 0g" | "저당(5g 미만)" | "보통당(5~10g)" | "고당(10g 이상)";

export function getYogurtProteinRange(product: { proteinPerServing: number }): YogurtProteinRange {
  if (product.proteinPerServing >= 15) return "고단백(15g 이상)";
  if (product.proteinPerServing >= 10) return "중간단백(10~15g)";
  return "일반단백(10g 미만)";
}

export function getYogurtSugarRange(product: { sugar?: number }): YogurtSugarRange {
  const sugar = product.sugar ?? 0;
  if (sugar <= 0) return "당류 0g";
  if (sugar < 5) return "저당(5g 미만)";
  if (sugar <= 10) return "보통당(5~10g)";
  return "고당(10g 이상)";
}

export function getYogurtFlavorCategory(product: ProductDetailProps): string {
  return product.flavor?.trim() || "기타";
}

export function getYogurtTypeCategory(product: ProductDetailProps): string {
  return product.yogurtType?.trim() || "Protein yogurt";
}

export interface DrinkFilters {
  brand: string[];
  protein: string[];
  source: string[];
  taste: string[];
  volume: string[];
}

export const defaultDrinkFilters: DrinkFilters = {
  brand: [],
  protein: [],
  source: [],
  taste: [],
  volume: [],
};

export function filterDrinkProducts(
  products: ProductDetailProps[],
  filters: DrinkFilters,
): ProductDetailProps[] {
  return products.filter((product) => {
    if (product.productType !== "drink") return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    if (filters.protein.length > 0 && !filters.protein.includes(getProteinRange(product))) return false;
    if (filters.source.length > 0 && !filters.source.includes(getProteinSourceCategory(product))) return false;
    if (filters.taste.length > 0 && !filters.taste.includes(getTasteCategory(product))) return false;
    if (filters.volume.length > 0 && !filters.volume.includes(getVolumeRange(product))) return false;
    return true;
  });
}

export interface BarFilters {
  brand: string[];
  protein: string[];
  sugar: string[];
  weight: string[];
}

export const defaultBarFilters: BarFilters = {
  brand: [],
  protein: [],
  sugar: [],
  weight: [],
};

export function filterBarProducts(
  products: ProductDetailProps[],
  filters: BarFilters,
): ProductDetailProps[] {
  return products.filter((product) => {
    if (product.productType !== "bar") return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    if (filters.protein.length > 0 && !filters.protein.includes(getProteinRangeBar(product))) return false;
    if (filters.sugar.length > 0 && !filters.sugar.includes(getSugarRangeBar(product))) return false;
    if (filters.weight.length > 0 && !filters.weight.includes(getBarWeightRange(product))) return false;
    return true;
  });
}

export interface YogurtFilters {
  brand: string[];
  protein: string[];
  sugar: string[];
  yogurtType: string[];
  flavor: string[];
}

export const defaultYogurtFilters: YogurtFilters = {
  brand: [],
  protein: [],
  sugar: [],
  yogurtType: [],
  flavor: [],
};

export function filterYogurtProducts(
  products: ProductDetailProps[],
  filters: YogurtFilters,
): ProductDetailProps[] {
  return products.filter((product) => {
    if (product.productType !== "yogurt") return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    if (filters.protein.length > 0 && !filters.protein.includes(getYogurtProteinRange(product))) return false;
    if (filters.sugar.length > 0 && !filters.sugar.includes(getYogurtSugarRange(product))) return false;
    if (filters.yogurtType.length > 0 && !filters.yogurtType.includes(getYogurtTypeCategory(product))) return false;
    if (filters.flavor.length > 0 && !filters.flavor.includes(getYogurtFlavorCategory(product))) return false;
    return true;
  });
}

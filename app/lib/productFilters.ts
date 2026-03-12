import type { ProductDetailProps } from "../data/products";

/** 용량/중량 문자열에서 숫자 추출 */
export function getCapacityMl(product: { capacity: string }): number {
  const match = product.capacity.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

/** 단백질 급원: 식물성 / 우유 / 혼합 (음료용) */
export function getProteinSourceCategory(p: ProductDetailProps): "식물성" | "우유" | "혼합" {
  if (p.proteinSource === "식물성") return "식물성";
  const name = p.name + " " + (p.tags?.join(" ") ?? "");
  if (/비건|식물성|플랜트|오트|oat|식물성단백질/i.test(name)) return "식물성";
  if (p.proteinSource === "우유" || p.drinkType === "밀크형" || p.tags?.includes("밀크형")) return "우유";
  return "혼합";
}

/** 맛 카테고리 (음료용) */
export function getTasteCategory(p: ProductDetailProps): "곡물/견과" | "과일맛" | "밀크/바닐라" | "초콜릿/카카오" | "커피" | "기타" {
  const name = (p.name + " " + (p.flavor ?? "")).toLowerCase();
  if (/초콜릿|초코|카카오|모카|쇼콜라|딥초코|더블초코/i.test(name)) return "초콜릿/카카오";
  if (/커피|아메리카노|라떼|에스프레소|더블샷/i.test(name)) return "커피";
  if (/바나나|딸기|복숭아|사과|레몬|멜론|자몽|포도|청사과|백자몽|피치|샤인머스캣|핑크자몽|그린애플/i.test(name)) return "과일맛";
  if (/바닐라|밀크|오리지널|밀크쉐이크|밀크티|쿠키앤크림|밤티라미수|바닐라봉봉/i.test(name)) return "밀크/바닐라";
  if (/고소|견과|밤|맛밤|아몬드|호두|피스타치오|시리얼|쌀밥|햇반/i.test(name)) return "곡물/견과";
  return "기타";
}

/** 용량 구간 (음료, ml) */
export type VolumeRange = "200ml 이하" | "200~300ml" | "300~400ml" | "400ml 이상";

export function getVolumeRange(product: { capacity: string }): VolumeRange {
  const ml = getCapacityMl(product);
  if (ml <= 200) return "200ml 이하";
  if (ml <= 300) return "200~300ml";
  if (ml <= 400) return "300~400ml";
  return "400ml 이상";
}

/** 단백질 함량 구간 (음료·바 공통) */
export type ProteinRange = "초고함량(30g 이상)" | "고함량(20g 이상)" | "저함량(20g 미만)";

export function getProteinRange(p: { proteinPerServing: number }): ProteinRange {
  if (p.proteinPerServing >= 30) return "초고함량(30g 이상)";
  if (p.proteinPerServing >= 20) return "고함량(20g 이상)";
  return "저함량(20g 미만)";
}

/** 단백질 바 전용: 단백질 15g 이상 구간 */
export type ProteinRangeBar = "고함량(20g 이상)" | "고함량(15g 이상)" | "저함량(15g 미만)";

export function getProteinRangeBar(p: { proteinPerServing: number }): ProteinRangeBar {
  if (p.proteinPerServing >= 20) return "고함량(20g 이상)";
  if (p.proteinPerServing >= 15) return "고함량(15g 이상)";
  return "저함량(15g 미만)";
}

/** 단백질 바: 당류 구간 */
export type SugarRangeBar = "당류 0g" | "저당 5g 미만" | "보통 5~10g" | "당 10g 이상";

export function getSugarRangeBar(p: { sugar?: number }): SugarRangeBar {
  const s = p.sugar ?? 0;
  if (s <= 0) return "당류 0g";
  if (s < 5) return "저당 5g 미만";
  if (s <= 10) return "보통 5~10g";
  return "당 10g 이상";
}

/** 단백질 바: 중량 구간 */
export type WeightRangeBar = "50g 이하" | "50~60g" | "60g 이상";

export function getBarWeightRange(product: { capacity: string }): WeightRangeBar {
  const g = getCapacityMl(product);
  if (g <= 50) return "50g 이하";
  if (g < 60) return "50~60g";
  return "60g 이상";
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

export function filterDrinkProducts(products: ProductDetailProps[], filters: DrinkFilters): ProductDetailProps[] {
  return products.filter((p) => {
    if (p.productType === "bar") return false;
    if (filters.brand.length > 0 && !filters.brand.includes(p.brand)) return false;
    if (filters.protein.length > 0 && !filters.protein.includes(getProteinRange(p))) return false;
    if (filters.source.length > 0 && !filters.source.includes(getProteinSourceCategory(p))) return false;
    if (filters.taste.length > 0 && !filters.taste.includes(getTasteCategory(p))) return false;
    if (filters.volume.length > 0 && !filters.volume.includes(getVolumeRange(p))) return false;
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

export function filterBarProducts(products: ProductDetailProps[], filters: BarFilters): ProductDetailProps[] {
  return products.filter((p) => {
    if (p.productType !== "bar") return false;
    if (filters.brand.length > 0 && !filters.brand.includes(p.brand)) return false;
    if (filters.protein.length > 0 && !filters.protein.includes(getProteinRangeBar(p))) return false;
    if (filters.sugar.length > 0 && !filters.sugar.includes(getSugarRangeBar(p))) return false;
    if (filters.weight.length > 0 && !filters.weight.includes(getBarWeightRange(p))) return false;
    return true;
  });
}

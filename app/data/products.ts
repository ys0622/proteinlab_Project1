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

export const mockProducts: ProductDetailProps[] = [
  {
    slug: "newcare-all-protein-choco-245",
    brand: "뉴케어",
    name: "올프로틴 (초콜릿)",
    capacity: "245mL",
    variant: "락토프리",
    tags: ["팩", "밀크형", "락토프리"],
    proteinPerServing: 25,
    sugar: 0,
    density: "10.2g/100ml",
    productUrl: "#",
  },
  {
    slug: "newcare-all-protein-banana-245",
    brand: "뉴케어",
    name: "올프로틴 (바나나)",
    capacity: "245mL",
    variant: "락토프리",
    tags: ["팩", "밀크형", "락토프리"],
    proteinPerServing: 25,
    sugar: 0,
    density: "10.2g/100ml",
    productUrl: "#",
  },
  {
    slug: "danbaek-drink-coffee-250",
    brand: "더단백",
    name: "더단백 드링크 (커피)",
    capacity: "250mL",
    variant: "일반",
    tags: ["팩", "밀크형"],
    proteinPerServing: 20,
    sugar: 0,
    density: "8.0g/100ml",
    productUrl: "#",
  },
  {
    slug: "sellex-profit-milk-vanilla-250",
    brand: "셀렉스",
    name: "프로핏 (밀크 바닐라)",
    capacity: "250mL",
    variant: "일반",
    tags: ["팩", "밀크형"],
    proteinPerServing: 20,
    sugar: 0,
    density: "8.0g/100ml",
    productUrl: "#",
  },
  {
    slug: "sellex-profit-mocha-chocolate-250",
    brand: "셀렉스",
    name: "프로핏 (모카 초콜릿)",
    capacity: "250mL",
    variant: "일반",
    tags: ["팩", "밀크형"],
    proteinPerServing: 20,
    sugar: 0,
    density: "8.0g/100ml",
    productUrl: "#",
  },
  {
    slug: "danbaek-water-apple-400",
    brand: "더단백",
    name: "더단백 워터 프로틴 (청사과)",
    capacity: "400mL",
    variant: "일반",
    tags: ["PET", "워터형"],
    proteinPerServing: 25,
    sugar: 0,
    density: "6.3g/100ml",
    productUrl: "#",
  },
  {
    slug: "hymune-balance-active-milkshake-deepchoco-250",
    brand: "하이뮨",
    name: "프로틴 밸런스 액티브 (밀크쉐이크)",
    capacity: "250mL",
    variant: "일반",
    tags: ["팩", "밀크형"],
    proteinPerServing: 20,
    sugar: 0,
    density: "8.0g/100ml",
    productUrl: "#",
  },
  {
    slug: "ondanbaek-caramel-latte-250",
    brand: "오늘단백",
    name: "오늘단백 (카라멜라떼)",
    capacity: "250mL",
    variant: "일반",
    tags: ["팩", "밀크형"],
    proteinPerServing: 21,
    density: "8.4g/100ml",
    productUrl: "#",
  },
];

import { mockBarProducts } from "./barProductsFromProteinlab";

/** proteinlab.kr/bars 기준 단백질바 59개 */
export { mockBarProducts } from "./barProductsFromProteinlab";

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
  return [...mockProducts, ...mockBarProducts];
}

export function getProductBySlug(slug: string): ProductDetailProps | null {
  const bar = mockBarProducts.find((p) => p.slug === slug);
  if (bar) return bar;
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export function enrichProductDetail(p: ProductDetailProps): ProductDetailProps {
  return p;
}

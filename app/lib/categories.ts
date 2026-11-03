export type ProductCategory = "drink" | "bar" | "yogurt" | "shake" | "soymilk";
export type CatalogProductCategory = ProductCategory | "powder";

export interface CategoryMeta {
  label: string;
  description: string;
  order: number;
  href: string;
  icon: string;
}

export const CATEGORY_META: Record<CatalogProductCategory, CategoryMeta> = {
  drink: {
    label: "음료",
    description: "바로 마실 수 있는 단백질 RTD 음료 비교 (두유는 별도 카테고리)",
    order: 1,
    href: "/drinks",
    icon: "/category-icons/drink-v2.jpg",
  },
  bar: {
    label: "바",
    description: "간편하게 단백질을 보충할 수 있는 바 형태 제품 비교",
    order: 2,
    href: "/bars",
    icon: "/category-icons/bar-v2.jpg",
  },
  yogurt: {
    label: "요거트",
    description: "그릭요거트, 드링킹 요거트 등 단백질 함량이 강화된 요거트 제품 비교",
    order: 3,
    href: "/yogurt",
    icon: "/category-icons/yogurt-v2.jpg",
  },
  shake: {
    label: "쉐이크",
    description: "파우치형 중심의 간편 섭취 단백질 쉐이크 비교 (파우더 제외)",
    order: 4,
    href: "/shake",
    icon: "/category-icons/shake-v2.jpg",
  },
  soymilk: {
    label: "두유",
    description: "소포장 두유를 1팩 단백질(g) 기준으로 비교 · 등록 기준 5g 이상 (고단백 11g+ / 강화 8~10g / 일반 5~7g)",
    order: 5,
    href: "/soymilk",
    icon: "/category-icons/soymilk-v2.jpg",
  },
  powder: {
    label: "파우더",
    description: "단백질 파우더를 1회 제공량의 단백질·함량·당류·칼로리 기준으로 비교",
    order: 6,
    href: "/powder",
    icon: "/category-icons/powder-v2.jpg",
  },
};

export const ALL_CATEGORY_IDS = (Object.keys(CATEGORY_META) as CatalogProductCategory[]).sort(
  (a, b) => CATEGORY_META[a].order - CATEGORY_META[b].order,
);

/** 기존 랭킹·추천·트렌딩은 파우더를 지원하지 않으므로 기존 5개만 유지한다. */
export const ORDERED_CATEGORY_IDS: ProductCategory[] = ALL_CATEGORY_IDS.filter(
  (category): category is ProductCategory => category !== "powder",
);

export function getCategoryMeta(category: CatalogProductCategory): CategoryMeta {
  return CATEGORY_META[category];
}

export function getCategoryHref(category: CatalogProductCategory): string {
  return CATEGORY_META[category].href;
}

export function getCategoryLabel(category: CatalogProductCategory): string {
  return CATEGORY_META[category].label;
}

export function getCategoryDescription(category: CatalogProductCategory): string {
  return CATEGORY_META[category].description;
}

export function isProductCategory(value: string): value is CatalogProductCategory {
  return value in CATEGORY_META;
}

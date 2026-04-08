export type ProductCategory = "drink" | "bar" | "yogurt" | "shake";

export interface CategoryMeta {
  label: string;
  description: string;
  order: number;
  href: string;
  count: number;
}

export const CATEGORY_META: Record<ProductCategory, CategoryMeta> = {
  drink: {
    label: "음료",
    description: "바로 마실 수 있는 고단백 RTD 제품 비교",
    order: 1,
    href: "/drinks",
    count: 107,
  },
  bar: {
    label: "바",
    description: "간편하게 단백질을 보충할 수 있는 바 형태 제품 비교",
    order: 2,
    href: "/bars",
    count: 100,
  },
  yogurt: {
    label: "요거트",
    description: "그릭요거트, 드링킹 요거트 등 단백질 함량이 강화된 요거트 제품 비교",
    order: 3,
    href: "/yogurt",
    count: 57,
  },
  shake: {
    label: "쉐이크",
    description: "파우치형 중심의 간편 섭취 단백질 쉐이크 비교 (파우더 제외)",
    order: 4,
    href: "/shake",
    count: 88,
  },
};

export const ORDERED_CATEGORY_IDS = (Object.keys(CATEGORY_META) as ProductCategory[]).sort(
  (a, b) => CATEGORY_META[a].order - CATEGORY_META[b].order,
);

export function getCategoryMeta(category: ProductCategory): CategoryMeta {
  return CATEGORY_META[category];
}

export function getCategoryHref(category: ProductCategory): string {
  return CATEGORY_META[category].href;
}

export function getCategoryLabel(category: ProductCategory): string {
  return CATEGORY_META[category].label;
}

export function getCategoryDescription(category: ProductCategory): string {
  return CATEGORY_META[category].description;
}

export function isProductCategory(value: string): value is ProductCategory {
  return value in CATEGORY_META;
}

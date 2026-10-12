export type ProductCategory = "drink" | "bar" | "yogurt" | "shake" | "soymilk";

export interface CategoryMeta {
  label: string;
  description: string;
  order: number;
  href: string;
}

export const CATEGORY_META: Record<ProductCategory, CategoryMeta> = {
  drink: {
    label: "음료",
    description: "바로 마실 수 있는 단백질 RTD 음료 비교 (두유는 별도 카테고리)",
    order: 1,
    href: "/drinks",
  },
  bar: {
    label: "바",
    description: "간편하게 단백질을 보충할 수 있는 바 형태 제품 비교",
    order: 2,
    href: "/bars",
  },
  yogurt: {
    label: "요거트",
    description: "그릭요거트, 드링킹 요거트 등 단백질 함량이 강화된 요거트 제품 비교",
    order: 3,
    href: "/yogurt",
  },
  shake: {
    label: "쉐이크",
    description: "파우치형 중심의 간편 섭취 단백질 쉐이크 비교 (파우더 제외)",
    order: 4,
    href: "/shake",
  },
  soymilk: {
    label: "두유",
    description: "1팩 단백질 8g 이상인 고단백 두유만 등록 (일반 두유 제외, 함량 g 기준)",
    order: 5,
    href: "/soymilk",
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

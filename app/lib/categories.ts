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
    description: "바로 마시는 단백질 RTD 음료 비교 · 등록 기준 1병 단백질 8g 이상 (두유는 별도 카테고리)",
    order: 1,
    href: "/drinks",
    icon: "/category-icons/drink-v2.jpg",
  },
  bar: {
    label: "바",
    description: "간편하게 단백질을 보충하는 바 제품 비교 · 등록 기준 1개 단백질 5g 이상 (그 미만은 단백질 보조 간식으로 표시)",
    order: 2,
    href: "/bars",
    icon: "/category-icons/bar-v2.jpg",
  },
  yogurt: {
    label: "요거트",
    description: "그릭요거트, 드링킹 요거트 등 단백질을 강화한 요거트 비교 · 등록 기준 1개 단백질 5g 이상",
    order: 3,
    href: "/yogurt",
    icon: "/category-icons/yogurt-v2.jpg",
  },
  shake: {
    label: "쉐이크",
    description: "물·우유에 타 먹는 1회분 파우치·스틱 쉐이크 비교 · 등록 기준 1회 단백질 10g 이상 (통 제품은 파우더)",
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
    description: "스쿱으로 덜어 먹는 통·봉지 단백질 파우더를 1회 제공량의 단백질·함량·당류·칼로리 기준으로 비교 · 등록 기준 1회 단백질 10g 이상",
    order: 6,
    href: "/powder",
    icon: "/category-icons/powder-v2.jpg",
  },
};

export const ALL_CATEGORY_IDS = (Object.keys(CATEGORY_META) as CatalogProductCategory[]).sort(
  (a, b) => CATEGORY_META[a].order - CATEGORY_META[b].order,
);

/** 기존 랭킹·트렌딩 등 ProductCategory 기반 화면은 파우더를 지원하지 않으므로 기존 5개만 유지한다. 추천은 CatalogProductCategory를 사용한다. */
export const ORDERED_CATEGORY_IDS: ProductCategory[] = ALL_CATEGORY_IDS.filter(
  (category): category is ProductCategory => category !== "powder",
);

/** 단백질 바 등록 기준(2026-11-06). 이보다 적은 기존 제품은 지우지 않고 '단백질 보조 간식'으로 표시한다. */
export const BAR_MIN_PROTEIN_G = 5;

export function isProteinSnackBar(product: { productType?: string; proteinPerServing?: number | null }): boolean {
  return (
    product.productType === "bar" &&
    typeof product.proteinPerServing === "number" &&
    product.proteinPerServing < BAR_MIN_PROTEIN_G
  );
}

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

export type ProductCategory = "drink" | "bar" | "yogurt" | "shake" | "soymilk";
export type CatalogProductCategory = ProductCategory | "powder";

export interface CategoryMeta {
  label: string;
  description: string;
  /** 등록 기준 한 줄(카테고리 설명 팝업용). 자세한 기준은 /methodology */
  criteria: string;
  order: number;
  href: string;
  icon: string;
}

export const CATEGORY_META: Record<CatalogProductCategory, CategoryMeta> = {
  drink: {
    label: "음료",
    description: "바로 마실 수 있는 단백질 RTD 음료 비교 (두유는 별도 카테고리)",
    criteria: "1병 단백질 8g 이상",
    order: 1,
    href: "/drinks",
    icon: "/category-icons/drink-v2.jpg",
  },
  bar: {
    label: "바",
    description: "간편하게 단백질을 보충할 수 있는 바 형태 제품 비교",
    criteria: "1개 단백질 5g 이상",
    order: 2,
    href: "/bars",
    icon: "/category-icons/bar-v2.jpg",
  },
  yogurt: {
    label: "요거트",
    description: "그릭요거트, 드링킹 요거트 등 단백질 함량이 강화된 요거트 제품 비교",
    criteria: "1개 단백질 5g 이상",
    order: 3,
    href: "/yogurt",
    icon: "/category-icons/yogurt-v2.jpg",
  },
  shake: {
    label: "쉐이크",
    description: "물·우유에 타 먹는 1회분 파우치·스틱 쉐이크 비교 (통 제품은 파우더)",
    criteria: "1회 단백질 10g 이상",
    order: 4,
    href: "/shake",
    icon: "/category-icons/shake-v2.jpg",
  },
  soymilk: {
    label: "두유",
    description: "250mL 이하 소포장 두유를 1팩 단백질 기준으로 비교",
    criteria: "1팩 단백질 5g 이상",
    order: 5,
    href: "/soymilk",
    icon: "/category-icons/soymilk-v2.jpg",
  },
  powder: {
    label: "파우더",
    description: "스쿱으로 덜어 먹는 통·봉지 단백질 파우더 비교",
    criteria: "1회 단백질 10g 이상",
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

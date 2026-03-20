import { type ProductDetailProps } from "../data/products";
import { getPopularityScore } from "./productPopularity";

export type CurationCategory = "drink" | "bar" | "yogurt" | "shake";
export type CurationKind = "ingredient" | "goal" | "context";

type CurationFilter = (product: ProductDetailProps) => boolean;
type CurationSorter = (products: ProductDetailProps[]) => ProductDetailProps[];

export interface CurationGuideLink {
  href: string;
  title: string;
  description: string;
}

export interface PopularCurationEntry {
  slug: string;
  label: string;
  icon: string;
  href: string;
  weeklyClicks: number;
  description: string;
}

export interface CurationInfoSection {
  title: string;
  bullets: string[];
}

export interface CategoryLandingCopy {
  recommendationTitle: string;
  recommendationNote: string;
  comparisonTitle: string;
}

export interface CategoryCurationDefinition {
  category: CurationCategory;
  quickLabel?: string;
  quickIcon?: string;
  quickOrder?: number;
  filter: CurationFilter;
  recommend: CurationSorter;
  landingCopy?: CategoryLandingCopy;
}

export interface CurationDefinition {
  id: string;
  slug: string;
  label: string;
  icon: string;
  kind: CurationKind;
  categoryTargets: CurationCategory[];
  routeMode: "category-query" | "legacy-pick";
  legacyPathByCategory?: Partial<Record<CurationCategory, string>>;
  heroTitle?: string;
  heroDescription?: string;
  introText?: string;
  infoSections?: CurationInfoSection[];
  relatedLinksTitle?: string;
  relatedGuideLinks?: CurationGuideLink[];
  seoTitle?: string;
  seoDescription?: string;
  categories: Partial<Record<CurationCategory, CategoryCurationDefinition>>;
}

function parseDensityValue(density?: string): number {
  if (!density) return 0;
  const match = density.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function hasGrade(product: ProductDetailProps, keywords: string[]) {
  return product.gradeTags?.some((tag) => includesAny(tag, keywords)) ?? false;
}

function sortDrinkForRunning(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const waterBonusA = a.drinkType === "워터형" ? 1 : 0;
    const waterBonusB = b.drinkType === "워터형" ? 1 : 0;
    if (waterBonusA !== waterBonusB) return waterBonusB - waterBonusA;

    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (proteinDelta !== 0) return proteinDelta;

    return (a.sugar ?? 999) - (b.sugar ?? 999);
  });
}

function sortBarForRunning(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (proteinDelta !== 0) return proteinDelta;

    return (a.calories ?? 999) - (b.calories ?? 999);
  });
}

function sortDrinkForConvenience(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (proteinDelta !== 0) return proteinDelta;

    return (a.sugar ?? 999) - (b.sugar ?? 999);
  });
}

function sortBarForConvenience(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (proteinDelta !== 0) return proteinDelta;

    return (a.sugar ?? 999) - (b.sugar ?? 999);
  });
}

function sortByPopularity(
  products: ProductDetailProps[],
  productType: CurationCategory,
) {
  return [...products].sort((a, b) => {
    const aScore = getPopularityScore(a, productType) ?? 0;
    const bScore = getPopularityScore(b, productType) ?? 0;
    if (aScore !== bScore) return bScore - aScore;

    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    return (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
  });
}

function getCapacityValue(capacity?: string): number {
  if (!capacity) return 0;
  const match = capacity.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

function sortYogurtByProtein(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (proteinDelta !== 0) return proteinDelta;

    return (a.sugar ?? 999) - (b.sugar ?? 999);
  });
}

function sortYogurtByLowSugar(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    return (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
  });
}

function getFiberValue(product: ProductDetailProps) {
  return product.nutritionPerBottle?.fiberG ?? 0;
}

function getShakeFlavorText(product: ProductDetailProps) {
  return [product.name, product.flavor, product.variant, product.tags?.join(" ")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function isShakeCoffeeFlavor(product: ProductDetailProps) {
  const text = getShakeFlavorText(product);
  return includesAny(text, [
    "커피",
    "카페",
    "coffee",
    "espresso",
    "모카",
    "돌체",
    "밀크티",
    "milk tea",
    "earl",
    "얼그레이",
    "녹차라떼",
    "말차라떼",
    "green tea latte",
    "matcha latte",
  ]);
}

function isShakeGrainFlavor(product: ProductDetailProps) {
  const text = getShakeFlavorText(product);
  return includesAny(text, ["곡물", "미숫", "인절미", "흑임자", "참깨", "서리태", "콩", "grain", "cereal", "corn", "sesame", "고구마"]);
}

function isShakeDessertFlavor(product: ProductDetailProps) {
  const text = getShakeFlavorText(product);
  return includesAny(text, ["초코", "초콜릿", "쿠키", "크림", "바나나", "딸기", "멜론", "피스타치오", "초코무스", "berry", "cookie", "cream", "choco", "banana", "strawberry", "melon", "pistachio"]);
}

function sortShakeByProtein(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (proteinDelta !== 0) return proteinDelta;

    return (a.sugar ?? 999) - (b.sugar ?? 999);
  });
}

function sortShakeByLowSugar(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    return (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
  });
}

function sortShakeByFiber(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const fiberDelta = getFiberValue(b) - getFiberValue(a);
    if (fiberDelta !== 0) return fiberDelta;

    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    return (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
  });
}

function sortShakeForMealReplacement(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const fiberDelta = getFiberValue(b) - getFiberValue(a);
    if (fiberDelta !== 0) return fiberDelta;

    const proteinDelta = (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (proteinDelta !== 0) return proteinDelta;

    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    return (a.calories ?? 999) - (b.calories ?? 999);
  });
}

function sortShakeByFlavor(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    const proteinDelta = (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (proteinDelta !== 0) return proteinDelta;

    return parseDensityValue(b.density) - parseDensityValue(a.density);
  });
}

function isGreekYogurt(product: ProductDetailProps) {
  const haystack = `${product.name} ${product.yogurtType}`.toLowerCase();
  return haystack.includes("그릭");
}

function isDrinkingYogurt(product: ProductDetailProps) {
  const haystack = `${product.name} ${product.yogurtType} ${product.capacity}`.toLowerCase();
  return haystack.includes("드링크") || haystack.includes("drinking") || haystack.includes("ml");
}

function isBulkYogurt(product: ProductDetailProps) {
  return getCapacityValue(product.capacity) >= 400;
}

function recommendWithFallback(
  pools: ProductDetailProps[][],
  sorter: CurationSorter,
  limit = 6,
) {
  const merged: ProductDetailProps[] = [];
  const seen = new Set<string>();

  for (const pool of pools) {
    for (const product of sorter(pool)) {
      if (!product.slug || seen.has(product.slug)) continue;
      seen.add(product.slug);
      merged.push(product);
      if (merged.length >= limit) return merged;
    }
  }

  return merged;
}

function matchesConvenienceDrink(product: ProductDetailProps) {
  if (product.productType === "bar") return false;

  const combined = `${product.brand} ${product.name}`;
  return (
    ["더단백", "셀렉스", "하이뮨", "랩노쉬", "닥터유"].some((brand) =>
      product.brand.includes(brand),
    ) || combined.includes("뉴케어 올프로틴")
  );
}

function matchesConvenienceBar(product: ProductDetailProps) {
  return (
    product.productType === "bar" &&
    ["닥터유", "랩노쉬", "롯데웰푸드", "롯데"].some((brand) => product.brand.includes(brand))
  );
}

const curations: CurationDefinition[] = [
  {
    id: "popular",
    slug: "popular",
    label: "인기",
    icon: "🔥",
    kind: "context",
    categoryTargets: [],
    routeMode: "category-query",
    heroTitle: "이번주 인기 큐레이션",
    heroDescription:
      "다른 사용자가 많이 확인한 큐레이션을 모아 보여줍니다. ProteinLab에서는 인기 있는 큐레이션을 통해 제품 선택 기준을 빠르게 파악하고, 각 랜딩 페이지에서 음료와 단백질 바를 따로 비교할 수 있습니다.",
    introText: "많이 보는 큐레이션부터 빠르게 살펴보세요.",
    infoSections: [],
    relatedLinksTitle: "이번주 인기 큐레이션",
    seoTitle: "인기 큐레이션 | ProteinLab",
    seoDescription:
      "최근 많이 본 ProteinLab 큐레이션을 모아 보고, 각 랜딩 페이지에서 음료와 단백질 바를 따로 비교해보세요.",
    categories: {
      drink: {
        category: "drink",
        filter: (product) => product.productType === "drink",
        recommend: (products) =>
          sortByPopularity(
            products.filter((product) => product.productType === "drink"),
            "drink",
          ),
        landingCopy: {
          recommendationTitle: "인기 단백질 음료 추천",
          recommendationNote: "최근 많이 찾는 단백질 음료를 먼저 보여줍니다.",
          comparisonTitle: "인기 단백질 음료 비교",
        },
      },
      bar: {
        category: "bar",
        filter: (product) => product.productType === "bar",
        recommend: (products) =>
          sortByPopularity(products.filter((product) => product.productType === "bar"), "bar"),
        landingCopy: {
          recommendationTitle: "인기 단백질 바 추천",
          recommendationNote: "최근 많이 찾는 단백질 바를 먼저 보여줍니다.",
          comparisonTitle: "인기 단백질 바 비교",
        },
      },
      yogurt: {
        category: "yogurt",
        filter: (product) => product.productType === "yogurt",
        recommend: (products) =>
          sortByPopularity(products.filter((product) => product.productType === "yogurt"), "yogurt"),
        landingCopy: {
          recommendationTitle: "인기 단백질 요거트 추천",
          recommendationNote: "최근 많이 찾는 단백질 요거트를 먼저 보여줍니다.",
          comparisonTitle: "인기 단백질 요거트 비교",
        },
      },
      shake: {
        category: "shake",
        filter: (product) => product.productType === "shake",
        recommend: (products) =>
          sortByPopularity(products.filter((product) => product.productType === "shake"), "shake"),
        landingCopy: {
          recommendationTitle: "인기 단백질 쉐이크 추천",
          recommendationNote: "최근 많이 찾는 단백질 쉐이크를 먼저 보여줍니다.",
          comparisonTitle: "인기 단백질 쉐이크 비교",
        },
      },
    },
  },
  {
    id: "zero-sugar",
    slug: "zero-sugar",
    label: "당류 0g",
    icon: "🍬",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/zero-sugar" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "당류 0g",
        quickIcon: "🍬",
        quickOrder: 10,
        filter: (product) => product.productType === "drink" && (product.sugar ?? 0) <= 0,
        recommend: (products) => products.filter((product) => (product.sugar ?? 0) <= 0),
      },
    },
  },
  {
    id: "yogurt-high-protein",
    slug: "yogurt-high-protein",
    label: "고단백",
    icon: "💪",
    kind: "ingredient",
    categoryTargets: ["yogurt"],
    routeMode: "category-query",
    seoTitle: "고단백 단백질 요거트 추천 | ProteinLab",
    seoDescription:
      "단백질 함량이 높은 단백질 요거트를 비교합니다. 그릭요거트와 대용량 요거트까지 단백질, 당류, 칼로리 기준으로 확인해보세요.",
    categories: {
      yogurt: {
        category: "yogurt",
        quickLabel: "고단백",
        quickIcon: "💪",
        quickOrder: 10,
        filter: (product) => product.productType === "yogurt" && (product.proteinPerServing ?? 0) >= 15,
        recommend: (products) =>
          sortYogurtByProtein(
            products.filter(
              (product) => product.productType === "yogurt" && (product.proteinPerServing ?? 0) >= 15,
            ),
          ),
        landingCopy: {
          recommendationTitle: "추천 고단백 단백질 요거트",
          recommendationNote: "단백질 함량과 단백질 밀도를 우선으로 본 추천입니다.",
          comparisonTitle: "고단백 단백질 요거트 비교",
        },
      },
    },
  },
  {
    id: "yogurt-low-sugar",
    slug: "yogurt-low-sugar",
    label: "저당",
    icon: "🫐",
    kind: "ingredient",
    categoryTargets: ["yogurt"],
    routeMode: "category-query",
    seoTitle: "저당 단백질 요거트 추천 | ProteinLab",
    seoDescription:
      "당류 부담이 낮은 단백질 요거트를 비교합니다. 저당 그릭요거트, 드링킹 요거트, 대용량 제품까지 한 번에 확인해보세요.",
    categories: {
      yogurt: {
        category: "yogurt",
        quickLabel: "저당",
        quickIcon: "🫐",
        quickOrder: 20,
        filter: (product) => product.productType === "yogurt" && (product.sugar ?? 999) <= 5,
        recommend: (products) =>
          sortYogurtByLowSugar(
            products.filter((product) => product.productType === "yogurt" && (product.sugar ?? 999) <= 5),
          ),
        landingCopy: {
          recommendationTitle: "추천 저당 단백질 요거트",
          recommendationNote: "당류 부담을 줄이면서 단백질을 챙기기 좋은 제품 중심입니다.",
          comparisonTitle: "저당 단백질 요거트 비교",
        },
      },
    },
  },
  {
    id: "yogurt-greek",
    slug: "yogurt-greek",
    label: "그릭",
    icon: "🥣",
    kind: "context",
    categoryTargets: ["yogurt"],
    routeMode: "category-query",
    seoTitle: "그릭요거트 추천 | 단백질 요거트 비교 | ProteinLab",
    seoDescription:
      "단백질 함량이 높은 그릭요거트를 비교합니다. 꾸덕한 식감, 단백질 밀도, 당류 기준으로 단백질 요거트를 확인해보세요.",
    categories: {
      yogurt: {
        category: "yogurt",
        quickLabel: "그릭",
        quickIcon: "🥣",
        quickOrder: 30,
        filter: (product) => product.productType === "yogurt" && isGreekYogurt(product),
        recommend: (products) =>
          sortYogurtByProtein(products.filter((product) => product.productType === "yogurt" && isGreekYogurt(product))),
        landingCopy: {
          recommendationTitle: "추천 그릭 단백질 요거트",
          recommendationNote: "그릭 타입 중심으로 꾸덕함과 단백질 밀도를 함께 보기 좋습니다.",
          comparisonTitle: "그릭 단백질 요거트 비교",
        },
      },
    },
  },
  {
    id: "yogurt-drinking",
    slug: "yogurt-drinking",
    label: "드링킹",
    icon: "🥤",
    kind: "context",
    categoryTargets: ["yogurt"],
    routeMode: "category-query",
    seoTitle: "드링킹 단백질 요거트 추천 | ProteinLab",
    seoDescription:
      "마시기 편한 드링킹 단백질 요거트를 비교합니다. 휴대성, 단백질 함량, 당류 기준으로 드링킹 요거트를 확인해보세요.",
    categories: {
      yogurt: {
        category: "yogurt",
        quickLabel: "드링킹",
        quickIcon: "🥤",
        quickOrder: 40,
        filter: (product) => product.productType === "yogurt" && isDrinkingYogurt(product),
        recommend: (products) =>
          sortYogurtByProtein(
            products.filter((product) => product.productType === "yogurt" && isDrinkingYogurt(product)),
          ),
        landingCopy: {
          recommendationTitle: "추천 드링킹 단백질 요거트",
          recommendationNote: "빠르게 마시기 쉬운 타입을 단백질 기준으로 정리했습니다.",
          comparisonTitle: "드링킹 단백질 요거트 비교",
        },
      },
    },
  },
  {
    id: "yogurt-bulk",
    slug: "yogurt-bulk",
    label: "대용량",
    icon: "🧺",
    kind: "context",
    categoryTargets: ["yogurt"],
    routeMode: "category-query",
    seoTitle: "대용량 단백질 요거트 추천 | ProteinLab",
    seoDescription:
      "400g 이상 대용량 단백질 요거트를 비교합니다. 가성비, 단백질 밀도, 당류 기준으로 여러 번 나눠 먹는 요거트를 확인해보세요.",
    categories: {
      yogurt: {
        category: "yogurt",
        quickLabel: "대용량",
        quickIcon: "🧺",
        quickOrder: 50,
        filter: (product) => product.productType === "yogurt" && isBulkYogurt(product),
        recommend: (products) =>
          sortYogurtByProtein(products.filter((product) => product.productType === "yogurt" && isBulkYogurt(product))),
        landingCopy: {
          recommendationTitle: "추천 대용량 단백질 요거트",
          recommendationNote: "400g 이상 제품 중에서 단백질 밀도와 활용도를 먼저 봅니다.",
          comparisonTitle: "대용량 단백질 요거트 비교",
        },
      },
    },
  },
  {
    id: "light-protein-under-20",
    slug: "light-protein-under-20",
    label: "라이트 20g 미만",
    icon: "🥛",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/light-protein-under-20" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "라이트 20g 미만",
        quickIcon: "🥛",
        quickOrder: 20,
        filter: (product) => product.productType === "drink" && (product.proteinPerServing ?? 0) < 20,
        recommend: (products) => products.filter((product) => (product.proteinPerServing ?? 0) < 20),
      },
    },
  },
  {
    id: "high-protein-20",
    slug: "high-protein-20",
    label: "고단백 20g+",
    icon: "💪",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/high-protein-20" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "고단백 20g+",
        quickIcon: "💪",
        quickOrder: 30,
        filter: (product) => product.productType === "drink" && (product.proteinPerServing ?? 0) >= 20,
        recommend: (products) => products.filter((product) => (product.proteinPerServing ?? 0) >= 20),
      },
    },
  },
  {
    id: "high-protein",
    slug: "high-protein",
    label: "초고단백 30g+",
    icon: "🏋",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/high-protein" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "초고단백 30g+",
        quickIcon: "🏋",
        quickOrder: 40,
        filter: (product) => product.productType === "drink" && (product.proteinPerServing ?? 0) >= 30,
        recommend: (products) => products.filter((product) => (product.proteinPerServing ?? 0) >= 30),
      },
    },
  },
  {
    id: "protein-water",
    slug: "protein-water",
    label: "워터형",
    icon: "💧",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/protein-water" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "워터형",
        quickIcon: "💧",
        quickOrder: 50,
        filter: (product) => product.productType === "drink" && product.drinkType === "워터형",
        recommend: (products) => products.filter((product) => product.drinkType === "워터형"),
      },
    },
  },
  {
    id: "lactose-free",
    slug: "lactose-free",
    label: "락토프리",
    icon: "🥛",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/lactose-free" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "락토프리",
        quickIcon: "🥛",
        quickOrder: 60,
        filter: (product) => product.productType === "drink" && product.variant === "락토프리",
        recommend: (products) => products.filter((product) => product.variant === "락토프리"),
      },
    },
  },
  {
    id: "density-a",
    slug: "density-a",
    label: "단백질 밀도 A",
    icon: "⭐",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/value-a" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "단백질 밀도 A",
        quickIcon: "⭐",
        quickOrder: 70,
        filter: (product) =>
          product.productType === "drink" &&
          hasGrade(product, ["단백질 밀도 A", "밀도 A"]),
        recommend: (products) =>
          products.filter((product) => hasGrade(product, ["단백질 밀도 A", "밀도 A"])),
      },
    },
  },
  {
    id: "diet-a",
    slug: "diet-a",
    label: "다이어트 A",
    icon: "⚖",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/diet-a" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "다이어트 A",
        quickIcon: "⚖",
        quickOrder: 80,
        filter: (product) => product.productType === "drink" && hasGrade(product, ["다이어트 A"]),
        recommend: (products) => products.filter((product) => hasGrade(product, ["다이어트 A"])),
      },
    },
  },
  {
    id: "fitness-a",
    slug: "fitness-a",
    label: "퍼포먼스 A",
    icon: "⚡",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/fitness-a" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "퍼포먼스 A",
        quickIcon: "⚡",
        quickOrder: 90,
        filter: (product) => product.productType === "drink" && hasGrade(product, ["퍼포먼스 A"]),
        recommend: (products) => products.filter((product) => hasGrade(product, ["퍼포먼스 A"])),
      },
    },
  },
  {
    id: "vegan",
    slug: "vegan",
    label: "식물성",
    icon: "🌿",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/vegan" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "식물성",
        quickIcon: "🌿",
        quickOrder: 110,
        filter: (product) =>
          product.productType === "drink" &&
          ((product.proteinSource ?? "").includes("식물성") ||
            product.name.includes("식물성") ||
            product.tags?.includes("식물성") === true),
        recommend: (products) =>
          products.filter(
            (product) =>
              (product.proteinSource ?? "").includes("식물성") ||
              product.name.includes("식물성") ||
              product.tags?.includes("식물성") === true,
          ),
      },
    },
  },
  {
    id: "bar-high-protein-20",
    slug: "bar-high-protein-20",
    label: "고단백 20g+",
    icon: "💪",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-high-protein-20" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "고단백 20g+",
        quickIcon: "💪",
        quickOrder: 10,
        filter: (product) => product.productType === "bar" && (product.proteinPerServing ?? 0) >= 20,
        recommend: (products) => products.filter((product) => (product.proteinPerServing ?? 0) >= 20),
      },
    },
  },
  {
    id: "bar-high-protein-15",
    slug: "bar-high-protein-15",
    label: "고단백 15g+",
    icon: "🏋",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-high-protein-15" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "고단백 15g+",
        quickIcon: "🏋",
        quickOrder: 20,
        filter: (product) => product.productType === "bar" && (product.proteinPerServing ?? 0) >= 15,
        recommend: (products) => products.filter((product) => (product.proteinPerServing ?? 0) >= 15),
      },
    },
  },
  {
    id: "bar-low-sugar",
    slug: "bar-low-sugar",
    label: "저당",
    icon: "🍬",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-low-sugar" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "저당",
        quickIcon: "🍬",
        quickOrder: 30,
        filter: (product) => product.productType === "bar" && (product.sugar ?? 0) < 5,
        recommend: (products) => products.filter((product) => (product.sugar ?? 0) < 5),
      },
    },
  },
  {
    id: "bar-low-calorie",
    slug: "bar-low-calorie",
    label: "저칼로리",
    icon: "🥗",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-low-calorie" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "저칼로리",
        quickIcon: "🥗",
        quickOrder: 40,
        filter: (product) => product.productType === "bar" && (product.calories ?? 999) < 200,
        recommend: (products) => products.filter((product) => (product.calories ?? 999) < 200),
      },
    },
  },
  {
    id: "bar-choco",
    slug: "bar-choco",
    label: "초코",
    icon: "🍫",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-choco" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "초코",
        quickIcon: "🍫",
        quickOrder: 50,
        filter: (product) =>
          product.productType === "bar" &&
          /초코|초콜릿|choco|cacao/i.test(`${product.name} ${product.flavor ?? ""}`),
        recommend: (products) =>
          products.filter((product) =>
            /초코|초콜릿|choco|cacao/i.test(`${product.name} ${product.flavor ?? ""}`),
          ),
      },
    },
  },
  {
    id: "bar-nut",
    slug: "bar-nut",
    label: "견과",
    icon: "🥜",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-nut" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "견과",
        quickIcon: "🥜",
        quickOrder: 60,
        filter: (product) =>
          product.productType === "bar" &&
          /견과|아몬드|피넛|넛츠|너츠|호두|캐슈|피스타치오/i.test(
            `${product.name} ${product.flavor ?? ""} ${(product.tags ?? []).join(" ")}`,
          ),
        recommend: (products) =>
          products.filter((product) =>
            /견과|아몬드|피넛|넛츠|너츠|호두|캐슈|피스타치오/i.test(
              `${product.name} ${product.flavor ?? ""} ${(product.tags ?? []).join(" ")}`,
            ),
          ),
      },
    },
  },
  {
    id: "bar-no-nut",
    slug: "bar-no-nut",
    label: "무견과",
    icon: "🚫",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-no-nut" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "무견과",
        quickIcon: "🚫",
        quickOrder: 70,
        filter: (product) =>
          product.productType === "bar" &&
          !/견과|아몬드|피넛|넛츠|너츠|호두|캐슈|피스타치오/i.test(
            `${product.name} ${product.flavor ?? ""} ${(product.tags ?? []).join(" ")}`,
          ),
        recommend: (products) =>
          products.filter(
            (product) =>
              !/견과|아몬드|피넛|넛츠|너츠|호두|캐슈|피스타치오/i.test(
                `${product.name} ${product.flavor ?? ""} ${(product.tags ?? []).join(" ")}`,
              ),
          ),
      },
    },
  },
  {
    id: "bar-large",
    slug: "bar-large",
    label: "대용량",
    icon: "📦",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-large" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "대용량",
        quickIcon: "📦",
        quickOrder: 80,
        filter: (product) => product.productType === "bar" && parseInt(product.capacity, 10) >= 60,
        recommend: (products) => products.filter((product) => parseInt(product.capacity, 10) >= 60),
      },
    },
  },
  {
    id: "bar-small",
    slug: "bar-small",
    label: "소용량",
    icon: "🧃",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-small" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "소용량",
        quickIcon: "🧃",
        quickOrder: 90,
        filter: (product) => product.productType === "bar" && parseInt(product.capacity, 10) <= 50,
        recommend: (products) => products.filter((product) => parseInt(product.capacity, 10) <= 50),
      },
    },
  },
  {
    id: "bar-high-density",
    slug: "bar-high-density",
    label: "단백질 밀도 A",
    icon: "⭐",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-high-density" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "단백질 밀도 A",
        quickIcon: "⭐",
        quickOrder: 100,
        filter: (product) => product.productType === "bar" && parseDensityValue(product.density) >= 8,
        recommend: (products) => products.filter((product) => parseDensityValue(product.density) >= 8),
      },
    },
  },

  {
    id: "shake-high-protein",
    slug: "shake-high-protein",
    label: "고단백",
    icon: "💪",
    kind: "ingredient",
    categoryTargets: ["shake"],
    routeMode: "category-query",
    seoTitle: "고단백 단백질 쉐이크 추천 | ProteinLab",
    seoDescription:
      "단백질 20g 이상 파우치형 단백질 쉐이크를 비교합니다. ProteinLab에서 단백질, 당류, 칼로리, 식이섬유 기준으로 확인해보세요.",
    categories: {
      shake: {
        category: "shake",
        quickLabel: "고단백",
        quickIcon: "💪",
        quickOrder: 10,
        filter: (product) => product.productType === "shake" && (product.proteinPerServing ?? 0) >= 20,
        recommend: (products) =>
          sortShakeByProtein(
            products.filter(
              (product) => product.productType === "shake" && (product.proteinPerServing ?? 0) >= 20,
            ),
          ),
        landingCopy: {
          recommendationTitle: "추천 고단백 쉐이크",
          recommendationNote: "단백질 함량과 단백질 밀도를 우선으로 보기 좋은 제품을 먼저 보여줍니다.",
          comparisonTitle: "고단백 쉐이크 비교",
        },
      },
    },
  },
  {
    id: "shake-low-sugar",
    slug: "shake-low-sugar",
    label: "저당",
    icon: "🫐",
    kind: "ingredient",
    categoryTargets: ["shake"],
    routeMode: "category-query",
    seoTitle: "저당 단백질 쉐이크 추천 | ProteinLab",
    seoDescription:
      "당류 부담이 적은 파우치형 단백질 쉐이크를 비교합니다. ProteinLab에서 당류, 단백질, 칼로리를 함께 확인해보세요.",
    categories: {
      shake: {
        category: "shake",
        quickLabel: "저당",
        quickIcon: "🫐",
        quickOrder: 20,
        filter: (product) => product.productType === "shake" && (product.sugar ?? 999) <= 3,
        recommend: (products) =>
          sortShakeByLowSugar(
            products.filter((product) => product.productType === "shake" && (product.sugar ?? 999) <= 3),
          ),
        landingCopy: {
          recommendationTitle: "추천 저당 쉐이크",
          recommendationNote: "당류를 낮게 가져가면서 단백질을 챙기기 좋은 제품을 먼저 보여줍니다.",
          comparisonTitle: "저당 쉐이크 비교",
        },
      },
    },
  },
  {
    id: "shake-meal-replacement",
    slug: "shake-meal-replacement",
    label: "식사대용",
    icon: "🥣",
    kind: "goal",
    categoryTargets: ["shake"],
    routeMode: "category-query",
    seoTitle: "식사대용 단백질 쉐이크 추천 | ProteinLab",
    seoDescription:
      "포만감과 성분 균형을 고려해 식사대용으로 보기 좋은 파우치형 단백질 쉐이크를 비교합니다.",
    categories: {
      shake: {
        category: "shake",
        quickLabel: "식사대용",
        quickIcon: "🥣",
        quickOrder: 30,
        filter: (product) =>
          product.productType === "shake" &&
          (product.proteinPerServing ?? 0) >= 15 &&
          (product.calories ?? 0) >= 150 &&
          getFiberValue(product) >= 4,
        recommend: (products) =>
          sortShakeForMealReplacement(
            products.filter(
              (product) =>
                product.productType === "shake" &&
                (product.proteinPerServing ?? 0) >= 15 &&
                (product.calories ?? 0) >= 150 &&
                getFiberValue(product) >= 4,
            ),
          ),
        landingCopy: {
          recommendationTitle: "추천 식사대용 쉐이크",
          recommendationNote: "포만감에 영향을 주는 식이섬유와 단백질을 함께 보면서 고르기 좋은 제품을 먼저 보여줍니다.",
          comparisonTitle: "식사대용 쉐이크 비교",
        },
      },
    },
  },
  {
    id: "shake-high-fiber",
    slug: "shake-high-fiber",
    label: "식이섬유",
    icon: "🌾",
    kind: "ingredient",
    categoryTargets: ["shake"],
    routeMode: "category-query",
    seoTitle: "식이섬유 높은 단백질 쉐이크 추천 | ProteinLab",
    seoDescription:
      "식이섬유 함량이 높은 파우치형 단백질 쉐이크를 비교합니다. ProteinLab에서 단백질, 당류, 칼로리와 함께 확인해보세요.",
    categories: {
      shake: {
        category: "shake",
        quickLabel: "식이섬유",
        quickIcon: "🌾",
        quickOrder: 40,
        filter: (product) => product.productType === "shake" && getFiberValue(product) >= 5,
        recommend: (products) =>
          sortShakeByFiber(
            products.filter((product) => product.productType === "shake" && getFiberValue(product) >= 5),
          ),
        landingCopy: {
          recommendationTitle: "추천 식이섬유 쉐이크",
          recommendationNote: "식이섬유 함량이 높은 제품을 중심으로 당류와 단백질 균형까지 함께 보기 좋게 정리했습니다.",
          comparisonTitle: "식이섬유 쉐이크 비교",
        },
      },
    },
  },
  {
    id: "shake-coffee-latte",
    slug: "shake-coffee-latte",
    label: "커피·라떼",
    icon: "☕",
    kind: "context",
    categoryTargets: ["shake"],
    routeMode: "category-query",
    seoTitle: "커피·라떼 단백질 쉐이크 추천 | ProteinLab",
    seoDescription:
      "커피, 라떼, 밀크티 계열의 파우치형 단백질 쉐이크를 모아 비교합니다. ProteinLab에서 당류, 단백질, 밀도까지 같이 확인해보세요.",
    categories: {
      shake: {
        category: "shake",
        quickLabel: "커피·라떼",
        quickIcon: "☕",
        quickOrder: 50,
        filter: (product) => product.productType === "shake" && isShakeCoffeeFlavor(product),
        recommend: (products) =>
          sortShakeByFlavor(
            products.filter((product) => product.productType === "shake" && isShakeCoffeeFlavor(product)),
          ),
        landingCopy: {
          recommendationTitle: "추천 커피·라떼 쉐이크",
          recommendationNote: "커피향 계열 제품 중 당류와 단백질 균형이 좋은 순서로 먼저 보여줍니다.",
          comparisonTitle: "커피·라떼 쉐이크 비교",
        },
      },
    },
  },
  {
    id: "shake-grain-misugaru",
    slug: "shake-grain-misugaru",
    label: "곡물·미숫가루",
    icon: "🌾",
    kind: "context",
    categoryTargets: ["shake"],
    routeMode: "category-query",
    seoTitle: "곡물·미숫가루 단백질 쉐이크 추천 | ProteinLab",
    seoDescription:
      "곡물, 미숫가루, 흑임자 계열 파우치형 단백질 쉐이크를 비교합니다. 식사대용 관점에서 보기 좋은 제품을 ProteinLab 기준으로 정리했습니다.",
    categories: {
      shake: {
        category: "shake",
        quickLabel: "곡물·미숫가루",
        quickIcon: "🌾",
        quickOrder: 60,
        filter: (product) => product.productType === "shake" && isShakeGrainFlavor(product),
        recommend: (products) =>
          sortShakeForMealReplacement(
            products.filter((product) => product.productType === "shake" && isShakeGrainFlavor(product)),
          ),
        landingCopy: {
          recommendationTitle: "추천 곡물형 쉐이크",
          recommendationNote: "식사대용으로 보기 쉬운 곡물·미숫가루 계열 제품을 먼저 정리했습니다.",
          comparisonTitle: "곡물·미숫가루 쉐이크 비교",
        },
      },
    },
  },
  {
    id: "shake-dessert-flavor",
    slug: "shake-dessert-flavor",
    label: "초코·디저트",
    icon: "🍫",
    kind: "context",
    categoryTargets: ["shake"],
    routeMode: "category-query",
    seoTitle: "초코·디저트 단백질 쉐이크 추천 | ProteinLab",
    seoDescription:
      "초코, 쿠키, 과일 디저트 계열의 파우치형 단백질 쉐이크를 모아 비교합니다. 맛뿐 아니라 당류와 단백질 균형까지 같이 확인해보세요.",
    categories: {
      shake: {
        category: "shake",
        quickLabel: "초코·디저트",
        quickIcon: "🍫",
        quickOrder: 70,
        filter: (product) => product.productType === "shake" && isShakeDessertFlavor(product),
        recommend: (products) =>
          sortShakeByFlavor(
            products.filter((product) => product.productType === "shake" && isShakeDessertFlavor(product)),
          ),
        landingCopy: {
          recommendationTitle: "추천 디저트형 쉐이크",
          recommendationNote: "맛 만족감이 높은 계열 안에서도 당류와 단백질 균형이 괜찮은 제품을 먼저 보여줍니다.",
          comparisonTitle: "초코·디저트 쉐이크 비교",
        },
      },
    },
  },
  {
    id: "running",
    slug: "running",
    label: "러닝",
    icon: "🏃",
    kind: "goal",
    categoryTargets: ["drink", "bar"],
    routeMode: "category-query",
    heroTitle: "러닝 후 단백질 음료 추천",
    heroDescription:
      "러닝이나 마라톤 후에는 근육 회복과 에너지 보충이 중요합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 러닝 후 회복에 적합한 단백질 음료와 단백질 바를 비교할 수 있습니다.",
    introText: "러너에게 적합한 단백질 제품을 데이터 기준으로 확인하세요.",
    infoSections: [
      {
        title: "러닝 후 단백질이 필요한 이유",
        bullets: [
          "러닝 후에는 근육 손상 회복과 함께 에너지 보충이 필요합니다.",
          "운동 직후 단백질을 보충하면 근육 회복 루틴을 만들기 좋습니다.",
          "러닝 강도와 식사 간격에 따라 음료와 바를 나눠 보는 것이 편합니다.",
        ],
      },
      {
        title: "러너가 제품을 고르는 기준",
        bullets: [
          "단백질 함량: 운동 후 회복에 필요한 기준량을 확인합니다.",
          "당류: 필요 이상으로 높지 않은지 확인합니다.",
          "칼로리: 운동 강도와 식사 계획에 맞는지 확인합니다.",
          "단백질 밀도: 같은 열량에서 단백질을 얼마나 효율적으로 섭취하는지 봅니다.",
        ],
      },
      {
        title: "단백질 음료 vs 단백질 바",
        bullets: [
          "운동 직후에는 음료가 더 빠르고 가볍게 들어가는 경우가 많습니다.",
          "간식이나 이동 중 보충에는 단백질 바가 더 편할 수 있습니다.",
          "ProteinLab에서는 음료와 바를 섞지 않고 각각 따로 비교합니다.",
        ],
      },
      {
        title: "ProteinLab 데이터 기준",
        bullets: [
          "단백질 함량, 당류, 칼로리, 단백질 밀도를 기준으로 제품을 비교합니다.",
          "추천 제품은 조건이 부족할 때 완화 규칙을 적용해 최소 3개 이상 보이도록 구성합니다.",
        ],
      },
    ],
    relatedGuideLinks: [
      {
        href: "/guides/running/basics",
        title: "러너에게 좋은 단백질 선택 기준",
        description: "러닝 후 어떤 단백질 제품을 우선 봐야 하는지 데이터 기준으로 정리했습니다.",
      },
      {
        href: "/guides/running/race-week",
        title: "러닝 후 단백질 섭취 타이밍",
        description: "운동 직후와 일상 루틴에서 단백질을 언제 보충하면 좋은지 확인해보세요.",
      },
    ],
    seoTitle: "러닝 후 단백질 제품 추천 | ProteinLab",
    seoDescription:
      "러닝과 마라톤 후 회복에 적합한 단백질 음료와 단백질 바를 ProteinLab 데이터 기준으로 비교합니다.",
    categories: {
      drink: {
        category: "drink",
        quickLabel: "러닝",
        quickIcon: "🏃",
        quickOrder: 100,
        filter: (product) =>
          product.productType === "drink" &&
          (product.proteinPerServing ?? 0) >= 15 &&
          (product.proteinPerServing ?? 0) <= 25 &&
          (product.sugar ?? 999) <= 10,
        recommend: (products) =>
          recommendWithFallback(
            [
              products.filter(
                (product) =>
                  (product.proteinPerServing ?? 0) >= 15 &&
                  (product.proteinPerServing ?? 0) <= 25 &&
                  (product.sugar ?? 999) <= 10,
              ),
              products.filter(
                (product) =>
                  (product.proteinPerServing ?? 0) >= 12 &&
                  (product.proteinPerServing ?? 0) <= 25 &&
                  (product.sugar ?? 999) <= 12,
              ),
              products.filter(
                (product) => parseDensityValue(product.density) >= 6 && (product.sugar ?? 999) <= 12,
              ),
              products,
            ],
            sortDrinkForRunning,
          ),
        landingCopy: {
          recommendationTitle: "러너에게 추천하는 단백질 음료",
          recommendationNote:
            "워터형 여부, 단백질 밀도, 단백질 함량, 당류를 함께 고려해 러닝 후 회복에 보기 좋은 제품을 먼저 고릅니다.",
          comparisonTitle: "러닝에 적합한 단백질 음료 비교",
        },
      },
      bar: {
        category: "bar",
        quickLabel: "러닝",
        quickIcon: "🏃",
        quickOrder: 110,
        filter: (product) =>
          product.productType === "bar" &&
          (product.proteinPerServing ?? 0) >= 10 &&
          (product.proteinPerServing ?? 0) <= 20 &&
          (product.sugar ?? 999) <= 10,
        recommend: (products) =>
          recommendWithFallback(
            [
              products.filter(
                (product) =>
                  (product.proteinPerServing ?? 0) >= 10 &&
                  (product.proteinPerServing ?? 0) <= 20 &&
                  (product.sugar ?? 999) <= 10,
              ),
              products.filter(
                (product) =>
                  (product.proteinPerServing ?? 0) >= 8 &&
                  (product.proteinPerServing ?? 0) <= 20 &&
                  (product.sugar ?? 999) <= 12,
              ),
              products.filter(
                (product) => parseDensityValue(product.density) >= 4.5 && (product.sugar ?? 999) <= 12,
              ),
              products,
            ],
            sortBarForRunning,
          ),
        landingCopy: {
          recommendationTitle: "러너에게 추천하는 단백질 바",
          recommendationNote:
            "당류가 낮고 단백질 밀도와 단백질 함량이 좋은 제품을 먼저 볼 수 있도록 정리했습니다.",
          comparisonTitle: "러닝에 적합한 단백질 바 비교",
        },
      },
    },
  },
  {
    id: "convenience",
    slug: "convenience",
    label: "편의점",
    icon: "🏪",
    kind: "context",
    categoryTargets: ["drink", "bar"],
    routeMode: "category-query",
    heroTitle: "편의점 단백질 음료 추천",
    heroDescription:
      "CU, GS25, 세븐일레븐 등 편의점에서 쉽게 구매할 수 있는 단백질 음료와 단백질 바를 비교합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 편의점 단백질 제품을 확인할 수 있습니다.",
    introText: "편의점에서 쉽게 찾을 수 있는 단백질 제품을 비교해보세요.",
    infoSections: [
      {
        title: "편의점 단백질 제품을 볼 때",
        bullets: [
          "편의점에서는 다양한 단백질 음료와 단백질 바를 간편하게 구매할 수 있습니다.",
          "ProteinLab에서는 편의점에서 자주 판매되는 브랜드 제품을 기준으로 비교합니다.",
          "음료와 바는 절대 합치지 않고 각각 따로 비교합니다.",
        ],
      },
      {
        title: "비교 기준",
        bullets: [
          "단백질 함량",
          "당류",
          "칼로리",
          "단백질 밀도",
        ],
      },
      {
        title: "현재 적용 브랜드",
        bullets: [
          "단백질 음료: 더단백, 셀렉스, 하이뮨, 뉴케어 올프로틴, 랩노쉬, 닥터유 프로틴 드링크",
          "단백질 바: 닥터유 프로틴바, 랩노쉬 프로틴바, 롯데 프로틴바",
        ],
      },
    ],
    relatedGuideLinks: [
      {
        href: "/?curation=convenience",
        title: "편의점 단백질 음료 비교",
        description: "편의점에서 찾기 쉬운 단백질 음료만 모아 바로 비교해보세요.",
      },
      {
        href: "/bars?curation=convenience",
        title: "편의점 단백질 바 비교",
        description: "편의점 기준 브랜드의 단백질 바를 한 번에 비교해볼 수 있습니다.",
      },
    ],
    seoTitle: "편의점 단백질 제품 큐레이션 | ProteinLab",
    seoDescription:
      "편의점에서 쉽게 구매할 수 있는 단백질 음료와 단백질 바를 ProteinLab 데이터 기준으로 비교합니다.",
    categories: {
      drink: {
        category: "drink",
        quickLabel: "편의점",
        quickIcon: "🏪",
        quickOrder: 120,
        filter: matchesConvenienceDrink,
        recommend: (products) => sortDrinkForConvenience(products.filter(matchesConvenienceDrink)),
        landingCopy: {
          recommendationTitle: "편의점 단백질 음료 추천",
          recommendationNote:
            "단백질 밀도, 단백질 함량, 당류를 함께 고려해 편의점에서 보기 쉬운 제품을 먼저 보여줍니다.",
          comparisonTitle: "편의점 단백질 음료 비교",
        },
      },
      bar: {
        category: "bar",
        quickLabel: "편의점",
        quickIcon: "🏪",
        quickOrder: 120,
        filter: matchesConvenienceBar,
        recommend: (products) => sortBarForConvenience(products.filter(matchesConvenienceBar)),
        landingCopy: {
          recommendationTitle: "편의점 단백질 바 추천",
          recommendationNote:
            "단백질 밀도, 단백질 함량, 당류를 함께 고려해 편의점 기준 브랜드의 제품을 먼저 보여줍니다.",
          comparisonTitle: "편의점 단백질 바 비교",
        },
      },
    },
  },
];

const manualPopularCurations = [
  {
    slug: "running",
    weeklyClicks: 145,
    description: "러닝 후 회복에 맞는 단백질 음료와 단백질 바를 데이터 기준으로 비교합니다.",
  },
  {
    slug: "convenience",
    weeklyClicks: 98,
    description: "편의점에서 쉽게 찾을 수 있는 브랜드 중심으로 단백질 제품을 비교합니다.",
  },
  {
    slug: "zero-sugar",
    weeklyClicks: 75,
    description: "당류 부담을 줄이고 싶은 사용자를 위한 단백질 음료를 빠르게 확인할 수 있습니다.",
  },
] as const;

export function getAllCurations() {
  return curations;
}

export function getCurationDefinition(slug: string) {
  return curations.find((curation) => curation.slug === slug) ?? null;
}

export function getQuickCurations(category: CurationCategory) {
  const items = curations
    .map((curation) => {
      const categoryConfig = curation.categories[category];
      if (!categoryConfig?.quickLabel || !categoryConfig.quickIcon) return null;

      return {
        slug: curation.slug,
        label: categoryConfig.quickLabel,
        icon: categoryConfig.quickIcon,
        href: `/curation/${curation.slug}`,
        order: categoryConfig.quickOrder ?? 999,
      };
    })
    .filter(
      (item): item is { slug: string; label: string; icon: string; href: string; order: number } =>
        Boolean(item),
    )
    .sort((a, b) => a.order - b.order);

  return [
    {
      slug: "popular",
      label: "인기",
      icon: "🔥",
      href: "/curation/popular",
      order: -1,
    },
    ...items,
  ];
}

export function getPopularCurations(limit = 3): PopularCurationEntry[] {
  const items = manualPopularCurations
    .map<PopularCurationEntry | null>((entry) => {
      const definition = getCurationDefinition(entry.slug);
      if (!definition) return null;

      return {
        slug: definition.slug,
        label: definition.label,
        icon: definition.icon,
        href: `/curation/${definition.slug}`,
        weeklyClicks: entry.weeklyClicks,
        description: entry.description,
      };
    })
    .filter((item): item is PopularCurationEntry => item !== null);

  return items.slice(0, limit);
}

export function buildCategoryCurationHref(category: CurationCategory, slug: string) {
  if (category === "bar") return `/bars?curation=${slug}`;
  if (category === "yogurt") return `/yogurt?curation=${slug}`;
  if (category === "shake") return `/shake?curation=${slug}`;
  return `/?curation=${slug}`;
}

export function applyCurationToCategoryProducts(
  products: ProductDetailProps[],
  category: CurationCategory,
  slug?: string | null,
) {
  if (!slug) return products;
  const definition = getCurationDefinition(slug);
  const categoryConfig = definition?.categories[category];
  if (!categoryConfig) return products;
  return products.filter(categoryConfig.filter);
}

export function getRecommendedProductsForCuration(
  products: ProductDetailProps[],
  category: CurationCategory,
  slug: string,
  limit = 6,
) {
  const definition = getCurationDefinition(slug);
  const categoryConfig = definition?.categories[category];
  if (!categoryConfig) return [];
  return categoryConfig.recommend(products).slice(0, limit);
}

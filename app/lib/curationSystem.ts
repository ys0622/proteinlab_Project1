import type { ProductDetailProps } from "../data/products";

export type CurationCategory = "drink" | "bar";
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
    infoSections: [
      {
        title: "인기 큐레이션은 어떻게 정하나요?",
        bullets: [
          "가능하면 최근 7일 클릭 데이터를 기준으로 인기 큐레이션을 집계합니다.",
          "초기 단계에는 수동 우선순위를 함께 사용해 비어 있는 상태가 없도록 구성합니다.",
          "인기 큐레이션은 제품 리스트를 합치지 않고, 각 랜딩 페이지에서 음료와 단백질 바를 분리해 보여줍니다.",
        ],
      },
      {
        title: "이 페이지에서 할 수 있는 일",
        bullets: [
          "이번주 많이 본 큐레이션을 빠르게 확인할 수 있습니다.",
          "각 큐레이션 랜딩으로 이동해 추천 제품과 전체 비교를 이어서 볼 수 있습니다.",
          "러닝, 편의점, 저당처럼 목적이나 상황에 맞는 탐색 흐름을 바로 시작할 수 있습니다.",
        ],
      },
    ],
    relatedLinksTitle: "이번주 인기 큐레이션",
    seoTitle: "인기 큐레이션 | ProteinLab",
    seoDescription:
      "최근 많이 본 ProteinLab 큐레이션을 모아 보고, 각 랜딩 페이지에서 음료와 단백질 바를 따로 비교해보세요.",
    categories: {},
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
        filter: (product) => product.productType !== "bar" && (product.sugar ?? 0) <= 0,
        recommend: (products) => products.filter((product) => (product.sugar ?? 0) <= 0),
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
        filter: (product) => product.productType !== "bar" && (product.proteinPerServing ?? 0) < 20,
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
        filter: (product) => product.productType !== "bar" && (product.proteinPerServing ?? 0) >= 20,
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
        filter: (product) => product.productType !== "bar" && (product.proteinPerServing ?? 0) >= 30,
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
        filter: (product) => product.productType !== "bar" && product.drinkType === "워터형",
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
        filter: (product) => product.productType !== "bar" && product.variant === "락토프리",
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
          product.productType !== "bar" &&
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
        filter: (product) => product.productType !== "bar" && hasGrade(product, ["다이어트 A"]),
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
        filter: (product) => product.productType !== "bar" && hasGrade(product, ["퍼포먼스 A"]),
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
          product.productType !== "bar" &&
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
          /견과|아몬드|피넛|넛츠|호두|캐슈/i.test(
            `${product.name} ${product.flavor ?? ""} ${(product.tags ?? []).join(" ")}`,
          ),
        recommend: (products) =>
          products.filter((product) =>
            /견과|아몬드|피넛|넛츠|호두|캐슈/i.test(
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
          !/견과|아몬드|피넛|넛츠|호두|캐슈/i.test(
            `${product.name} ${product.flavor ?? ""} ${(product.tags ?? []).join(" ")}`,
          ),
        recommend: (products) =>
          products.filter(
            (product) =>
              !/견과|아몬드|피넛|넛츠|호두|캐슈/i.test(
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
          product.productType !== "bar" &&
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
  return category === "bar" ? `/bars?curation=${slug}` : `/?curation=${slug}`;
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

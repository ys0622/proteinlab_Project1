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

function hasGrade(product: ProductDetailProps, keywords: string[]) {
  return (
    product.gradeTags?.some((tag) => keywords.some((keyword) => tag.includes(keyword))) ?? false
  );
}

function sortDrinkForRunning(products: ProductDetailProps[]) {
  return [...products].sort((a, b) => {
    const waterBonusA = a.drinkType === "워터형" ? 1 : 0;
    const waterBonusB = b.drinkType === "워터형" ? 1 : 0;
    if (waterBonusA !== waterBonusB) return waterBonusB - waterBonusA;

    const densityDelta = parseDensityValue(b.density) - parseDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = b.proteinPerServing - a.proteinPerServing;
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

    const proteinDelta = b.proteinPerServing - a.proteinPerServing;
    if (proteinDelta !== 0) return proteinDelta;

    return (a.calories ?? 999) - (b.calories ?? 999);
  });
}

const curations: CurationDefinition[] = [
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
        recommend: (products) => [...products],
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
        filter: (product) => product.productType !== "bar" && product.proteinPerServing < 20,
        recommend: (products) => [...products],
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
        filter: (product) => product.productType !== "bar" && product.proteinPerServing >= 20,
        recommend: (products) => [...products],
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
        filter: (product) => product.productType !== "bar" && product.proteinPerServing >= 30,
        recommend: (products) => [...products],
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
        recommend: (products) => [...products],
      },
    },
  },
  {
    id: "lactose-free",
    slug: "lactose-free",
    label: "락토프리",
    icon: "🥤",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/lactose-free" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "락토프리",
        quickIcon: "🥤",
        quickOrder: 60,
        filter: (product) => product.productType !== "bar" && product.variant === "락토프리",
        recommend: (products) => [...products],
      },
    },
  },
  {
    id: "value-a",
    slug: "value-a",
    label: "가성비 A",
    icon: "💰",
    kind: "ingredient",
    categoryTargets: ["drink"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { drink: "/picks/value-a" },
    categories: {
      drink: {
        category: "drink",
        quickLabel: "가성비 A",
        quickIcon: "💰",
        quickOrder: 70,
        filter: (product) => product.productType !== "bar" && hasGrade(product, ["단백질 밀도 A", "밀도 A"]),
        recommend: (products) => [...products],
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
        recommend: (products) => [...products],
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
        recommend: (products) => [...products],
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
        recommend: (products) => [...products],
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
        filter: (product) => product.productType === "bar" && product.proteinPerServing >= 20,
        recommend: (products) => [...products],
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
        filter: (product) => product.productType === "bar" && product.proteinPerServing >= 15,
        recommend: (products) => [...products],
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
        recommend: (products) => [...products],
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
        recommend: (products) => [...products],
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
          product.productType === "bar" && /초코|초콜릿|choco|cacao/i.test(`${product.name} ${product.flavor ?? ""}`),
        recommend: (products) => [...products],
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
          /견과|아몬드|피넛|땅콩|너트|호두|캐슈/i.test(
            `${product.name} ${product.flavor ?? ""} ${(product.tags ?? []).join(" ")}`,
          ),
        recommend: (products) => [...products],
      },
    },
  },
  {
    id: "bar-no-nut",
    slug: "bar-no-nut",
    label: "무견과",
    icon: "🌰",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-no-nut" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "무견과",
        quickIcon: "🌰",
        quickOrder: 70,
        filter: (product) =>
          product.productType === "bar" &&
          !/견과|아몬드|피넛|땅콩|너트|호두|캐슈/i.test(
            `${product.name} ${product.flavor ?? ""} ${(product.tags ?? []).join(" ")}`,
          ),
        recommend: (products) => [...products],
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
        recommend: (products) => [...products],
      },
    },
  },
  {
    id: "bar-small",
    slug: "bar-small",
    label: "휴대용",
    icon: "🎒",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-small" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "휴대용",
        quickIcon: "🎒",
        quickOrder: 90,
        filter: (product) => product.productType === "bar" && parseInt(product.capacity, 10) <= 50,
        recommend: (products) => [...products],
      },
    },
  },
  {
    id: "bar-high-density",
    slug: "bar-high-density",
    label: "고밀도",
    icon: "📈",
    kind: "ingredient",
    categoryTargets: ["bar"],
    routeMode: "legacy-pick",
    legacyPathByCategory: { bar: "/picks/bar-high-density" },
    categories: {
      bar: {
        category: "bar",
        quickLabel: "고밀도",
        quickIcon: "📈",
        quickOrder: 100,
        filter: (product) => product.productType === "bar" && parseDensityValue(product.density) >= 8,
        recommend: (products) => [...products],
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
    heroTitle: "러닝 후 단백질 제품 큐레이션",
    heroDescription:
      "러닝이나 마라톤 후에는 근육 회복과 에너지 보충이 중요합니다. ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 러너에게 적합한 단백질 음료와 단백질 바를 비교할 수 있습니다.",
    introText:
      "ProteinLab의 러닝 큐레이션은 음료와 바를 섞지 않고, 각 카테고리 안에서 러닝 후 회복에 적합한 제품만 따로 비교하는 방식으로 구성됩니다.",
    infoSections: [
      {
        title: "러닝 후 단백질이 필요한 이유",
        bullets: [
          "러닝 후에는 미세한 근육 손상이 생기기 쉬워 회복용 단백질 보충이 중요합니다.",
          "장거리 러닝 뒤에는 글리코겐 보충과 함께 단백질을 넣어주는 편이 회복 루틴을 만들기 좋습니다.",
          "운동 직후 또는 식사와 가까운 타이밍에 단백질을 보충하면 일상 루틴으로 연결하기 쉽습니다.",
        ],
      },
      {
        title: "러너가 단백질 제품을 고르는 기준",
        bullets: [
          "단백질 함량: 운동 후 회복용 기준을 충족하는지 확인합니다.",
          "당류: 필요 이상으로 높지 않은지 확인합니다.",
          "칼로리: 운동 강도와 식사 계획에 맞는지 확인합니다.",
          "단백질 밀도: 같은 열량이나 용량에서 단백질을 얼마나 효율적으로 얻는지 봅니다.",
        ],
      },
      {
        title: "단백질 음료 vs 단백질 바",
        bullets: [
          "운동 직후에는 음료가 더 간편하고 부담이 적은 경우가 많습니다.",
          "이동 중이거나 간식처럼 챙기기에는 단백질 바가 더 편할 수 있습니다.",
          "러닝 직후에는 음료, 이후 간식 타이밍에는 바를 보는 방식으로 나눠 비교하는 편이 좋습니다.",
        ],
      },
      {
        title: "ProteinLab 데이터 기준",
        bullets: [
          "ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도를 함께 비교합니다.",
          "러닝 큐레이션도 이 데이터를 기준으로 음료와 바를 각각 따로 선별합니다.",
        ],
      },
    ],
    relatedGuideLinks: [
      {
        href: "/guides/running/basics",
        title: "러너에게 좋은 단백질 선택 기준",
        description: "러닝 후 회복용 제품을 볼 때 단백질, 당류, 칼로리, 소화 부담을 어떻게 볼지 정리했습니다.",
      },
      {
        href: "/guides/running/race-week",
        title: "러닝 후 단백질 섭취 타이밍",
        description: "운동 직후와 레이스 전후에 단백질을 언제, 어떤 방식으로 보충할지 확인해보세요.",
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
          product.proteinPerServing >= 15 &&
          product.proteinPerServing <= 25 &&
          (product.sugar ?? 999) <= 10,
        recommend: (products) => {
          const primary = sortDrinkForRunning(
            products.filter(
              (product) =>
                product.proteinPerServing >= 15 &&
                product.proteinPerServing <= 25 &&
                (product.sugar ?? 999) <= 10,
            ),
          );
          const relaxed = sortDrinkForRunning(
            products.filter(
              (product) =>
                product.proteinPerServing >= 12 &&
                product.proteinPerServing <= 25 &&
                (product.sugar ?? 999) <= 12,
            ),
          );
          const densityFallback = sortDrinkForRunning(
            products.filter(
              (product) => parseDensityValue(product.density) >= 6 && (product.sugar ?? 999) <= 12,
            ),
          );
          const rankedAll = sortDrinkForRunning(products);
          const merged: ProductDetailProps[] = [];
          const seen = new Set<string>();

          for (const pool of [primary, relaxed, densityFallback, rankedAll]) {
            for (const product of pool) {
              if (!product.slug || seen.has(product.slug)) continue;
              seen.add(product.slug);
              merged.push(product);
              if (merged.length >= 6) return merged;
            }
          }

          return merged;
        },
        landingCopy: {
          recommendationTitle: "러너에게 추천하는 단백질 음료",
          recommendationNote:
            "단백질 밀도, 단백질 함량, 당류, 워터형 여부를 함께 고려해 러닝 후 회복용으로 보기 좋은 제품을 먼저 골랐습니다.",
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
          product.proteinPerServing >= 10 &&
          product.proteinPerServing <= 20 &&
          (product.sugar ?? 999) <= 10,
        recommend: (products) => {
          const primary = sortBarForRunning(
            products.filter(
              (product) =>
                product.proteinPerServing >= 10 &&
                product.proteinPerServing <= 20 &&
                (product.sugar ?? 999) <= 10,
            ),
          );
          const relaxed = sortBarForRunning(
            products.filter(
              (product) =>
                product.proteinPerServing >= 8 &&
                product.proteinPerServing <= 20 &&
                (product.sugar ?? 999) <= 12,
            ),
          );
          const densityFallback = sortBarForRunning(
            products.filter(
              (product) => parseDensityValue(product.density) >= 4.5 && (product.sugar ?? 999) <= 12,
            ),
          );
          const rankedAll = sortBarForRunning(products);
          const merged: ProductDetailProps[] = [];
          const seen = new Set<string>();

          for (const pool of [primary, relaxed, densityFallback, rankedAll]) {
            for (const product of pool) {
              if (!product.slug || seen.has(product.slug)) continue;
              seen.add(product.slug);
              merged.push(product);
              if (merged.length >= 6) return merged;
            }
          }

          return merged;
        },
        landingCopy: {
          recommendationTitle: "러너에게 추천하는 단백질 바",
          recommendationNote:
            "당류가 낮고, 단백질 밀도와 단백질 함량이 좋은 제품을 우선순위로 정렬했습니다.",
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
    heroTitle: "편의점 단백질 제품 큐레이션",
    heroDescription:
      "편의점에서 접근하기 쉬운 브랜드 기준으로 단백질 음료와 단백질 바를 따로 비교할 수 있도록 준비한 큐레이션입니다.",
    introText:
      "현재는 유통 채널 데이터 대신 브랜드 기준으로 구성되어 있으며, 향후 판매 채널 필드가 추가되면 더 정확한 편의점 큐레이션으로 확장할 수 있습니다.",
    infoSections: [
      {
        title: "편의점 큐레이션 기준",
        bullets: [
          "초기 버전은 판매 채널 필드가 아니라 브랜드 기준으로 동작합니다.",
          "음료와 바는 항상 분리된 데이터셋 안에서 각각 따로 비교합니다.",
        ],
      },
    ],
    relatedGuideLinks: [],
    seoTitle: "편의점 단백질 제품 큐레이션 | ProteinLab",
    seoDescription: "편의점에서 찾기 쉬운 단백질 음료와 단백질 바를 브랜드 기준으로 비교합니다.",
    categories: {
      drink: {
        category: "drink",
        filter: (product) =>
          product.productType !== "bar" &&
          ["더단백", "셀렉스", "하이뮨", "뉴케어", "랩노쉬", "닥터유"].some((brand) =>
            product.brand.includes(brand),
          ),
        recommend: (products) => [...products],
      },
      bar: {
        category: "bar",
        filter: (product) =>
          product.productType === "bar" &&
          ["닥터유", "랩노쉬", "롯데"].some((brand) => product.brand.includes(brand)),
        recommend: (products) => [...products],
      },
    },
  },
];

export function getAllCurations() {
  return curations;
}

export function getCurationDefinition(slug: string) {
  return curations.find((curation) => curation.slug === slug) ?? null;
}

export function getQuickCurations(category: CurationCategory) {
  return curations
    .map((curation) => {
      const categoryConfig = curation.categories[category];
      if (!categoryConfig?.quickLabel || !categoryConfig.quickIcon) return null;

      return {
        slug: curation.slug,
        label: categoryConfig.quickLabel,
        icon: categoryConfig.quickIcon,
        href:
          curation.routeMode === "category-query"
            ? buildCategoryCurationHref(category, curation.slug)
            : curation.legacyPathByCategory?.[category] ?? buildCategoryCurationHref(category, curation.slug),
        order: categoryConfig.quickOrder ?? 999,
      };
    })
    .filter((item): item is { slug: string; label: string; icon: string; href: string; order: number } => Boolean(item))
    .sort((a, b) => a.order - b.order);
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
  return categoryConfig.recommend(products.filter(categoryConfig.filter)).slice(0, limit);
}

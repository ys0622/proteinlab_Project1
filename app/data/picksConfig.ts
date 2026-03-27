import type { ProductDetailProps } from "../data/products";
import { getProteinSourceCategory, getBarWeightRange } from "../lib/productFilters";
import picksContent from "./picksContent.json";

export type PickProductType = "drink" | "bar";

export interface PickContentData {
  description: string;
  recommendations: string[];
  criteria: string[];
  faq: { q: string; a: string }[];
}

export interface PickConfig {
  slug: string;
  title: string;
  description: string;
  productType: PickProductType;
  /** proteinlab.kr 기반 구조화된 콘텐츠 */
  contentData: PickContentData;
  /** SEO·랜딩용 본문 (레거시) */
  content: string;
  /** 해당 큐레이션에 맞는 제품만 필터 */
  filterProducts: (products: ProductDetailProps[]) => ProductDetailProps[];
}

const contentMap = picksContent as Record<string, PickContentData>;

function getContentData(slug: string): PickContentData {
  return contentMap[slug] ?? { description: "", recommendations: [], criteria: [], faq: [] };
}

type PickConfigBase = Omit<PickConfig, "contentData">;

/** 단백질 음료 큐레이션 */
const drinkPicks: PickConfigBase[] = [
  {
    slug: "zero-sugar",
    title: "당류 0g 단백질 음료 추천",
    description: "당류 0g 단백질 음료만 모아 비교합니다. 다이어트, 혈당 관리, 저당 음료를 찾을 때 한 번에 보기 좋습니다.",
    productType: "drink",
    content: "당을 넣지 않은 단백질 음료는 다이어트 중이거나 당 관리가 필요한 분들에게 적합합니다. 단백질 보충은 하면서 불필요한 당 섭취를 줄일 수 있는 제품들을 소개합니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && (p.sugar ?? 0) <= 0),
  },
  {
    slug: "light-protein-under-20",
    title: "라이트 단백질 20g 미만 음료 추천",
    description: "1병당 단백질 20g 미만의 가벼운 단백질 음료를 비교합니다. 부담 없이 마시는 라이트 보충용 제품을 찾을 때 보기 좋습니다.",
    productType: "drink",
    content: "단백질 20g 미만의 라이트한 단백질 음료는 간편 보충·간식용으로 적합합니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && p.proteinPerServing < 20),
  },
  {
    slug: "high-protein-20",
    title: "고단백 20g 이상 단백질 음료 추천",
    description: "1병당 단백질 20g 이상 고단백 단백질 음료를 비교합니다. 운동 후 보충, 근력 운동, 고단백 음료 추천에 맞는 페이지입니다.",
    productType: "drink",
    content: "고단백 단백질 음료는 운동 후 회복이나 근육 유지에 도움이 됩니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && p.proteinPerServing >= 20),
  },
  {
    slug: "high-protein",
    title: "초고단백 30g 이상 단백질 음료 추천",
    description: "1병당 단백질 30g 이상 초고단백 음료를 비교합니다. 강도 높은 운동과 고단백 보충용 제품을 찾을 때 유용합니다.",
    productType: "drink",
    content: "초고단백 단백질 음료는 한 병으로 30g 이상의 단백질을 보충할 수 있는 제품입니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && p.proteinPerServing >= 30),
  },
  {
    slug: "protein-water",
    title: "워터형 단백질 음료 추천",
    description: "워터형 단백질 음료를 비교합니다. 가벼운 맛과 낮은 칼로리, 수분·단백질 동시 보충용 제품을 찾을 때 보기 좋습니다.",
    productType: "drink",
    content: "워터형 단백질 음료는 밀크형보다 가볍고 당·지방이 적은 편입니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && p.drinkType === "워터형"),
  },
  {
    slug: "lactose-free",
    title: "락토프리 단백질 음료 추천",
    description: "락토프리 단백질 음료를 비교합니다. 유당 불내증, 우유 단백질 음료 부담, 소화가 편한 제품을 찾을 때 보기 좋습니다.",
    productType: "drink",
    content: "락토프리 단백질 음료는 유당이 제거되어 소화가 민감한 분들도 부담 없이 드실 수 있습니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && p.variant === "락토프리"),
  },
  {
    slug: "value-a",
    title: "단백질 밀도 A 등급 음료 추천",
    description: "단백질 밀도 A 등급 단백질 음료를 비교합니다. 용량 대비 단백질 함량이 높은 효율형 제품을 찾을 때 유용합니다.",
    productType: "drink",
    content: "단백질 밀도 A 등급은 용량 대비 단백질이 상위 그룹인 제품입니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && p.gradeTags?.some((t) => t.startsWith("밀도 A"))),
  },
  {
    slug: "diet-a",
    title: "다이어트 A 등급 단백질 음료 추천",
    description: "다이어트 A 등급 단백질 음료를 비교합니다. 칼로리와 당류 효율이 좋은 제품을 찾을 때 보기 좋습니다.",
    productType: "drink",
    content: "다이어트 A 등급은 칼로리·당 대비 단백질 효율이 우수한 제품입니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && p.gradeTags?.some((t) => t.startsWith("다이어트 A"))),
  },
  {
    slug: "fitness-a",
    title: "퍼포먼스 A 등급 단백질 음료 추천",
    description: "퍼포먼스 A 등급 단백질 음료를 비교합니다. 운동과 퍼포먼스 보충에 적합한 제품을 찾을 때 유용합니다.",
    productType: "drink",
    content: "퍼포먼스 A 등급은 단백질 밀도 기준 운동 보충에 적합한 상위 그룹 제품입니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && p.gradeTags?.some((t) => t.startsWith("퍼포먼스 A"))),
  },
  {
    slug: "vegan",
    title: "식물성 단백질 음료 추천",
    description: "식물성 단백질 음료를 비교합니다. 비건 단백질 음료나 우유 없이 만든 제품을 찾을 때 보기 좋습니다.",
    productType: "drink",
    content: "식물성 단백질 음료는 우유 알레르기·비건 식단에 맞는 제품입니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType !== "bar" && getProteinSourceCategory(p) === "식물성"),
  },
];

/** 단백질 바 큐레이션 */
const barPicks: PickConfigBase[] = [
  {
    slug: "bar-high-protein-20",
    title: "고단백 20g 이상 단백질 바 추천",
    description: "1개당 단백질 20g 이상 단백질 바를 비교합니다. 운동 후 보충과 고단백 간식, 식사 보완형 단백질 바를 찾을 때 유용합니다.",
    productType: "bar",
    content: "고단백 단백질 바는 한 개로 20g 이상의 단백질을 보충할 수 있어 이동 중·운동 후에 편리합니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && p.proteinPerServing >= 20),
  },
  {
    slug: "bar-high-protein-15",
    title: "고단백 15g 이상 단백질 바 추천",
    description: "1개당 단백질 15g 이상 단백질 바를 비교합니다. 간식형과 식사 보완형 중간 단계의 단백질 바를 찾을 때 보기 좋습니다.",
    productType: "bar",
    content: "15g 이상 단백질 바는 간편한 보충과 포만감을 동시에 원할 때 적합합니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && p.proteinPerServing >= 15),
  },
  {
    slug: "bar-low-sugar",
    title: "저당 단백질 바 추천",
    description: "저당 단백질 바를 비교합니다. 당류 5g 미만, 당류 0g 제품 중심으로 다이어트와 당 관리에 맞는 단백질 바를 찾을 때 유용합니다.",
    productType: "bar",
    content: "저당 단백질 바는 당 섭취를 줄이면서 단백질을 보충하고 싶을 때 선택할 수 있습니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && (p.sugar ?? 0) < 5),
  },
  {
    slug: "bar-low-calorie",
    title: "저칼로리 단백질 바 추천",
    description: "저칼로리 단백질 바를 비교합니다. 200kcal 미만 제품 중심으로 가벼운 단백질 간식이나 체중 관리용 제품을 찾을 때 보기 좋습니다.",
    productType: "bar",
    content: "저칼로리 단백질 바는 다이어트 중에도 부담 없이 단백질을 보충할 수 있는 제품입니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && (p.calories ?? 999) < 200),
  },
  {
    slug: "bar-choco",
    title: "초코 맛 단백질 바 추천",
    description: "초콜릿, 다크초코 맛 단백질 바를 비교합니다. 맛있게 먹는 단백질 간식과 보충용 제품을 찾을 때 보기 좋습니다.",
    productType: "bar",
    content: "초코 맛 단백질 바는 가장 인기 있는 맛으로, 간식처럼 먹기 좋습니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && /초콜릿|초코|다크|쵸코|choco/i.test(p.name + " " + (p.flavor ?? ""))),
  },
  {
    slug: "bar-nut",
    title: "견과류 단백질 바 추천",
    description: "견과류가 들어간 단백질 바를 비교합니다. 고소한 맛과 포만감이 있는 제품을 찾을 때 유용합니다.",
    productType: "bar",
    content: "견과류가 들어간 단백질 바는 고소한 맛과 지방·단백질 보충에 적합합니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && /견과|땅콩|아몬드|피넛|넛|호두|피스타치오/i.test(p.name + " " + (p.flavor ?? "") + (p.tags?.join(" ") ?? ""))),
  },
  {
    slug: "bar-no-nut",
    title: "무견과 단백질 바 추천",
    description: "무견과 단백질 바를 비교합니다. 견과류 알레르기가 있거나 견과 없이 만든 제품을 찾을 때 보기 좋습니다.",
    productType: "bar",
    content: "견과류를 넣지 않은 단백질 바는 알레르기가 있거나 견과를 피하고 싶을 때 선택할 수 있습니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && !/견과|땅콩|아몬드|피넛|넛|호두|피스타치오/i.test(p.name + " " + (p.flavor ?? "") + (p.tags?.join(" ") ?? ""))),
  },
  {
    slug: "bar-large",
    title: "대용량 단백질 바 추천",
    description: "60g 이상 대용량 단백질 바를 비교합니다. 한 개로 든든한 식사 보완형 제품을 찾을 때 유용합니다.",
    productType: "bar",
    content: "대용량 단백질 바는 60g 이상으로 한 개만으로도 포만감과 단백질 보충이 가능합니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && getBarWeightRange(p) === "60g 이상"),
  },
  {
    slug: "bar-small",
    title: "소용량 단백질 바 추천",
    description: "50g 이하 소용량 단백질 바를 비교합니다. 가벼운 간식형이나 소포장 보충용 제품을 찾을 때 보기 좋습니다.",
    productType: "bar",
    content: "소용량 단백질 바는 50g 이하로 가볍게 먹기 좋고 칼로리 부담이 적습니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) => list.filter((p) => p.productType === "bar" && getBarWeightRange(p) === "50g 이하"),
  },
  {
    slug: "bar-high-density",
    title: "고밀도 단백질 바 추천",
    description: "단백질 밀도가 높은 단백질 바를 비교합니다. 100kcal당 8g 이상 단백질 제품 중심으로 효율형 제품을 찾을 때 유용합니다.",
    productType: "bar",
    content: "고밀도 단백질 바는 칼로리 대비 단백질 비율이 높아 효율적인 보충에 적합합니다. (proteinlab.kr 콘텐츠 반영 예정)",
    filterProducts: (list) =>
      list.filter((p) => {
        if (p.productType !== "bar") return false;
        const match = (p.density ?? "").match(/(\d+(?:\.\d+)?)\s*g\/100kcal/);
        const gPer100kcal = match ? parseFloat(match[1]) : 0;
        return gPer100kcal >= 8;
      }),
  },
];

const allPicks: PickConfig[] = [...drinkPicks, ...barPicks].map((p) => ({
  ...p,
  contentData: getContentData(p.slug),
}));

export function getPickBySlug(slug: string): PickConfig | null {
  return allPicks.find((p) => p.slug === slug) ?? null;
}

export function getAllPickSlugs(): string[] {
  return allPicks.map((p) => p.slug);
}

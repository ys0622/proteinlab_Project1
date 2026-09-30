import { ComparisonGuidePage, buildGuideMetadata, type ComparePageConfig } from "../productCompareShared";

const config: ComparePageConfig = {
  slug: "delight-project-shake-flavors",
  title: "딜라이트 프로젝트 단백질 쉐이크 8종 비교 — 맛·단백질·당류",
  description: "딜라이트 프로젝트 단백질 쉐이크 8종을 단백질, 당류, 칼로리 기준으로 비교하고 저당·고단백·요거트 계열 추천 맛을 정리했습니다.",
  keywords: ["딜라이트 프로젝트 단백질 쉐이크", "딜라이트 프로젝트 쉐이크 맛", "딜라이트 프로젝트 성분"],
  badge: "맛별 비교",
  readingTime: "약 5분",
  updatedAt: "2026-09-30",
  intro: "딜라이트 프로젝트 쉐이크는 8가지 맛의 단백질이 18~22g, 당류는 2~6g입니다. 이름만 보고 고르기보다 성분 차이까지 함께 확인해보세요.",
  summary: [
    "단백질은 피스타치오초코가 22g으로 가장 높습니다.",
    "단백질 밀도는 멜론밀크가 13.1g/100kcal로 가장 높습니다.",
    "당류는 피스타치오초코 2g이 가장 낮고 옥수수카스테라·딸기요거트가 6g으로 가장 높습니다.",
  ],
  comparisonTitle: "8가지 맛 성분 비교",
  comparisonColumns: ["너티초코", "흑임자인절미", "고구마미숫가루", "옥수수카스테라", "피스타치오초코", "딸기요거트", "블루베리요거트", "멜론밀크"],
  comparisonRows: [
    { label: "단백질", values: ["19g", "19g", "19g", "18g", "22g", "20g", "18g", "21g"] },
    { label: "당류", values: ["3g", "3g", "4g", "6g", "2g", "6g", "4g", "3g"] },
    { label: "칼로리", values: ["180", "160", "165", "170", "185", "175", "180", "160"] },
    { label: "밀도", values: ["10.6", "11.9", "11.5", "10.6", "11.9", "11.4", "10.0", "13.1"] },
  ],
  methodologyNote: "1팩 기준 · 밀도는 g/100kcal",
  sections: [
    {
      title: "목적별 추천 맛",
      items: [
        { title: "단백질 총량", body: "피스타치오초코 22g, 멜론밀크 21g 순입니다. 한 팩의 단백질 총량을 우선하면 이 두 맛부터 보면 됩니다." },
        { title: "당류 관리", body: "피스타치오초코가 당류 2g으로 가장 낮습니다. 너티초코·흑임자인절미·멜론밀크도 3g으로 낮은 편입니다." },
        { title: "칼로리 효율", body: "멜론밀크는 160kcal에 단백질 21g으로 단백질 밀도가 가장 높습니다. 흑임자인절미도 160kcal로 부담이 낮습니다." },
      ],
    },
    {
      title: "맛 계열로 고르는 법",
      items: [
        { title: "고소한 곡물 계열", body: "흑임자인절미와 고구마미숫가루는 곡물 계열을 선호할 때 비교하기 좋습니다. 두 제품의 당류는 각각 3g, 4g입니다." },
        { title: "디저트 계열", body: "너티초코·피스타치오초코·옥수수카스테라는 디저트형 맛입니다. 이 중 성분 효율은 피스타치오초코가 가장 좋습니다." },
        { title: "상큼한 계열", body: "딸기요거트와 블루베리요거트는 과일·요거트 계열입니다. 당류는 각각 6g, 4g으로 차이가 있습니다." },
      ],
    },
  ],
  faq: [
    { question: "딜라이트 프로젝트 쉐이크 중 저당 맛은 무엇인가요?", answer: "피스타치오초코가 당류 2g으로 가장 낮고, 너티초코·흑임자인절미·멜론밀크가 3g입니다." },
    { question: "단백질이 가장 많은 맛은 무엇인가요?", answer: "피스타치오초코가 22g으로 가장 많고 멜론밀크가 21g으로 뒤를 잇습니다." },
  ],
  relatedGuides: [
    { title: "2026 쉐이크 신제품", href: "/guides/product-selection-comparison/protein-shake-new-products-2026", description: "다른 신규 브랜드와 함께 비교합니다." },
    { title: "딜라이트 프로젝트 브랜드", href: "/brands/delight-project", description: "8개 제품 상세를 한곳에서 확인합니다." },
    { title: "쉐이크 전체 비교", href: "/shake", description: "전체 쉐이크 필터와 순위를 확인합니다." },
  ],
  purchaseLinks: [
    { label: "피스타치오초코", slug: "delight-project-shake-pistachio-choco-45" },
    { label: "멜론밀크", slug: "delight-project-shake-melon-milk-45" },
    { label: "흑임자인절미", slug: "delight-project-shake-black-sesame-injeolmi-45" },
  ],
};

export const metadata = buildGuideMetadata(config);
export default function Page() { return <ComparisonGuidePage config={config} />; }

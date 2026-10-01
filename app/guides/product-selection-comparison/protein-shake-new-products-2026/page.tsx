import { ComparisonGuidePage, buildGuideMetadata, type ComparePageConfig } from "../productCompareShared";

const config: ComparePageConfig = {
  slug: "protein-shake-new-products-2026",
  title: "2026 단백질 쉐이크 신제품 24종 비교 — 저당·고단백·맛 기준",
  description: "딜라이트 프로젝트, 한손한끼, 매일한끼, 테이크핏 브레드밀, 스포식스 신제품 24종을 단백질·당류·칼로리와 용도 기준으로 비교합니다.",
  keywords: ["단백질 쉐이크 신제품", "단백질 쉐이크 비교", "저당 단백질 쉐이크", "고단백 쉐이크"],
  badge: "신제품 비교",
  readingTime: "약 6분",
  updatedAt: "2026-09-30",
  intro: "새로 등록된 쉐이크 24종은 같은 파우치형이어도 단백질 13.8~24g, 당류 1~7.7g으로 차이가 큽니다. 브랜드별 대표 수치를 먼저 비교하고 목적에 맞는 후보를 좁혀보세요.",
  summary: [
    "단백질 총량은 테이크핏 브레드밀 초코 브라우니·고소오트식빵이 24g으로 가장 높습니다.",
    "당류를 우선하면 매일한끼 곡물·스포식스 2종이 1g으로 가장 낮습니다.",
    "맛 선택 폭은 딜라이트 프로젝트가 8종으로 가장 넓고, 한손한끼와 매일한끼가 각각 5종입니다.",
  ],
  comparisonTitle: "브랜드별 대표 신제품 비교",
  comparisonColumns: ["딜라이트", "한손한끼", "매일한끼", "테이크핏", "스포식스"],
  comparisonRows: [
    { label: "대표 제품", values: ["멜론밀크", "곡물", "초코", "초코 브라우니", "고쇼율무"] },
    { label: "단백질", values: ["21g", "16.5g", "20g", "24g", "22g"] },
    { label: "당류", values: ["3g", "5.6g", "2g", "1.9g", "1g"] },
    { label: "칼로리", values: ["160kcal", "156kcal", "144kcal", "170kcal", "170kcal"] },
    { label: "등록 맛", values: ["8종", "5종", "5종", "4종", "2종"] },
  ],
  sections: [
    {
      title: "목적별로 먼저 볼 브랜드",
      items: [
        { title: "고단백 우선", body: "테이크핏 브레드밀은 맛에 따라 20~24g입니다. 총량을 우선하면 24g인 초코 브라우니와 고소오트식빵부터 비교하는 편이 빠릅니다." },
        { title: "저당 우선", body: "매일한끼 곡물과 스포식스 2종은 당류 1g입니다. 매일한끼 초코 2g, 테이크핏 전 맛 1.9g도 저당 후보입니다." },
        { title: "맛 선택 폭 우선", body: "딜라이트 프로젝트는 요거트·곡물·디저트 계열을 포함해 8종입니다. 한 브랜드에서 여러 맛을 바꿔 마시려는 경우 유리합니다." },
      ],
    },
    {
      title: "성분표에서 함께 확인할 점",
      items: [
        { title: "단백질만 보지 않기", body: "같은 20g 전후라도 칼로리와 당류가 다릅니다. 체중 관리 목적이면 단백질 밀도와 당류를 함께 확인하세요." },
        { title: "나트륨 차이 확인", body: "매일한끼 일부 맛과 테이크핏 브레드밀은 나트륨이 300mg 안팎입니다. 하루 식단 전체와 함께 보는 것이 좋습니다." },
        { title: "실제 섭취 맥락", body: "간식 보완인지 식사대용인지에 따라 필요한 포만감과 단백질 총량이 달라집니다. 가장 높은 수치가 항상 최선은 아닙니다." },
      ],
    },
  ],
  faq: [
    { question: "신제품 중 단백질이 가장 높은 제품은 무엇인가요?", answer: "현재 등록 제품 기준 테이크핏 브레드밀 초코 브라우니와 고소오트식빵이 각각 24g입니다." },
    { question: "당류가 가장 낮은 신제품은 무엇인가요?", answer: "매일한끼 곡물, 스포식스 너티초코와 고쇼율무가 각각 당류 1g입니다." },
  ],
  relatedGuides: [
    { title: "단백질 쉐이크 맛 추천", href: "/guides/product-selection-comparison/protein-shake-flavor-guide", description: "초코·곡물·과일·디저트 계열로 취향에 맞는 맛을 좁힙니다." },
    { title: "쉐이크 성분표 보는 법", href: "/guides/product-selection-comparison/protein-shake-nutrition-label-guide", description: "단백질·당류·칼로리를 어떤 순서로 볼지 확인합니다." },
    { title: "테이크핏 브레드밀 4종 비교", href: "/guides/product-selection-comparison/takefit-breadmeal-protein-shake", description: "단백질 20~24g인 네 가지 맛을 자세히 비교합니다." },
    { title: "쉐이크 전체 비교", href: "/shake", description: "전체 등록 쉐이크를 필터로 비교합니다." },
    { title: "쉐이크 TOP 7", href: "/guides/product-selection-comparison/protein-shake-top7", description: "기존 인기 제품과 함께 비교합니다." },
    { title: "쉐이크 칼로리 순위", href: "/guides/product-selection-comparison/protein-shake-calorie-ranking", description: "칼로리 기준으로 후보를 좁힙니다." },
  ],
  purchaseLinks: [
    { label: "테이크핏 초코 브라우니", slug: "takefit-breadmeal-shake-choco-brownie-45" },
    { label: "매일한끼 초코", slug: "maeilhankki-shake-choco-40" },
    { label: "스포식스 너티초코", slug: "sportsix-protein-shake-nutty-choco-45" },
  ],
};

export const metadata = buildGuideMetadata(config);
export default function Page() { return <ComparisonGuidePage config={config} />; }

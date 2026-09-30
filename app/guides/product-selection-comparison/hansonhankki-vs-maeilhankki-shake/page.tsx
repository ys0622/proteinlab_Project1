import { ComparisonGuidePage, buildGuideMetadata, type ComparePageConfig } from "../productCompareShared";

const config: ComparePageConfig = {
  slug: "hansonhankki-vs-maeilhankki-shake",
  title: "한손한끼 vs 매일한끼 단백질 쉐이크 비교 — 단백질·당류·칼로리",
  description: "한손한끼 Petit과 매일한끼 단백질 쉐이크 각 5종을 직접 비교합니다. 단백질, 당류, 칼로리와 맛별 차이를 확인하세요.",
  keywords: ["한손한끼 단백질 쉐이크", "매일한끼 단백질 쉐이크", "한손한끼 매일한끼 비교"],
  badge: "브랜드 직접 비교",
  readingTime: "약 5분",
  updatedAt: "2026-09-30",
  intro: "두 브랜드 모두 40g 파우치 5종이지만 성분 포지션은 다릅니다. 한손한끼는 단백질 13.8~16.5g, 매일한끼는 전 맛 20g으로 총량 차이가 분명합니다.",
  summary: [
    "단백질 총량은 매일한끼가 전 맛 20g으로 한손한끼 13.8~16.5g보다 높습니다.",
    "당류 최저치는 매일한끼 곡물 1g이며, 한손한끼에서는 딸기 1.8g이 가장 낮습니다.",
    "칼로리는 두 브랜드 모두 144~158kcal 범위로 비슷해 단백질 밀도는 매일한끼가 우세합니다.",
  ],
  comparisonTitle: "대표 맛 직접 비교",
  comparisonColumns: ["한손한끼 곡물", "한손한끼 딸기", "매일한끼 곡물", "매일한끼 초코"],
  comparisonRows: [
    { label: "단백질", values: ["16.5g", "15.2g", "20g", "20g"] },
    { label: "당류", values: ["5.6g", "1.8g", "1g", "2g"] },
    { label: "칼로리", values: ["156kcal", "151kcal", "145kcal", "144kcal"] },
    { label: "밀도", values: ["10.6", "10.1", "13.8", "13.9"] },
  ],
  methodologyNote: "1팩 기준 · 밀도는 g/100kcal",
  sections: [
    {
      title: "두 브랜드의 차이",
      items: [
        { title: "한손한끼 Petit", body: "13.8~16.5g의 단백질과 151~158kcal 구성입니다. 밤라떼·피스타치오초코처럼 디저트 계열 선택지가 특징입니다." },
        { title: "매일한끼", body: "모든 맛이 단백질 20g이며 144~153kcal입니다. 수치가 균일해 맛을 바꿔도 단백질 총량 관리가 쉽습니다." },
        { title: "결론", body: "고단백·저당 수치를 우선하면 매일한끼, 밤라떼나 피스타치오 같은 맛 취향을 우선하면 한손한끼부터 보는 편이 좋습니다." },
      ],
    },
    {
      title: "맛별로 고르는 기준",
      items: [
        { title: "곡물", body: "곡물끼리 비교하면 매일한끼가 단백질 20g·당류 1g으로 한손한끼 16.5g·5.6g보다 수치상 우세합니다." },
        { title: "딸기", body: "매일한끼 딸기는 단백질이 20g으로 높고, 한손한끼 딸기는 당류 1.8g으로 한손한끼 라인 중 가장 낮습니다." },
        { title: "초코", body: "매일한끼 초코는 144kcal·단백질 20g·당류 2g입니다. 한손한끼 초코는 157kcal·14g·7g입니다." },
      ],
    },
  ],
  faq: [
    { question: "한손한끼와 매일한끼 중 단백질이 더 높은 쪽은 어디인가요?", answer: "현재 등록된 5종 기준 매일한끼는 전 맛 20g이며, 한손한끼는 13.8~16.5g입니다." },
    { question: "저당으로 고르면 어떤 맛이 좋은가요?", answer: "전체에서는 매일한끼 곡물 1g이 가장 낮고, 한손한끼에서는 딸기 1.8g이 가장 낮습니다." },
  ],
  relatedGuides: [
    { title: "한손한끼 브랜드", href: "/brands/hansonhankki", description: "Petit 5종 제품 상세를 봅니다." },
    { title: "매일한끼 브랜드", href: "/brands/maeilhankki", description: "5종 성분표를 한눈에 봅니다." },
    { title: "2026 쉐이크 신제품", href: "/guides/product-selection-comparison/protein-shake-new-products-2026", description: "다른 신규 쉐이크와 함께 비교합니다." },
  ],
  purchaseLinks: [
    { label: "한손한끼 곡물", slug: "hansonhankki-petit-shake-grain-40" },
    { label: "매일한끼 곡물", slug: "maeilhankki-shake-grain-40" },
    { label: "매일한끼 초코", slug: "maeilhankki-shake-choco-40" },
  ],
};

export const metadata = buildGuideMetadata(config);
export default function Page() { return <ComparisonGuidePage config={config} />; }

import { ComparisonGuidePage, buildGuideMetadata, type ComparePageConfig } from "../productCompareShared";

const config: ComparePageConfig = {
  slug: "takefit-breadmeal-protein-shake",
  title: "테이크핏 브레드밀 단백질 쉐이크 4종 비교 | 맛·단백질·당류",
  description: "테이크핏 브레드밀 초코 브라우니, 바나나브륄레, 고소오트식빵, 고구마소보로 4종의 단백질·칼로리·당류를 비교하고 목적별 추천을 정리합니다.",
  keywords: ["테이크핏 브레드밀", "테이크핏 쉐이크", "테이크핏 단백질 쉐이크", "브레드밀 맛 추천", "브레드밀 성분"],
  badge: "브랜드 비교",
  readingTime: "약 5분",
  updatedAt: "2026-10-01",
  methodologyNote: "제품 영양정보 기준 · 1포 45g 비교",
  intro: "테이크핏 브레드밀은 빵과 디저트를 연상시키는 4가지 맛으로 구성되지만, 단백질은 맛에 따라 20g과 24g으로 차이가 있습니다. 네 제품 모두 당류 1.9g으로 같기 때문에 단백질 총량과 맛 취향을 중심으로 고르면 비교가 빠릅니다.",
  summary: [
    "초코 브라우니와 고소오트식빵은 단백질 24g으로 네 맛 중 가장 높습니다.",
    "바나나브륄레와 고구마소보로는 단백질 20g이며, 네 제품 모두 당류는 1.9g입니다.",
    "칼로리는 170~176kcal로 차이가 작아 고단백 우선인지 맛 다양성 우선인지로 고르는 편이 실용적입니다.",
  ],
  comparisonTitle: "테이크핏 브레드밀 4종 영양 비교",
  comparisonColumns: ["초코 브라우니", "바나나브륄레", "고소오트식빵", "고구마소보로"],
  comparisonRows: [
    { label: "단백질", values: ["24g", "20g", "24g", "20g"] },
    { label: "당류", values: ["1.9g", "1.9g", "1.9g", "1.9g"] },
    { label: "칼로리", values: ["170kcal", "176kcal", "172kcal", "174kcal"] },
    { label: "추천 기준", values: ["초코·고단백", "달콤한 맛", "고소함·고단백", "곡물 디저트"] },
  ],
  sections: [
    {
      title: "목적별 추천",
      items: [
        { title: "단백질 총량 우선", body: "초코 브라우니와 고소오트식빵이 각각 24g입니다. 운동을 병행하거나 한 팩의 단백질 효율을 먼저 보면 이 두 맛이 유리합니다." },
        { title: "처음 먹는 초코 취향", body: "익숙한 디저트 계열을 원하면 초코 브라우니가 가장 직관적입니다. 170kcal로 네 제품 중 칼로리도 가장 낮습니다." },
        { title: "곡물·빵 계열 취향", body: "고소오트식빵은 단백질 24g, 고구마소보로는 20g입니다. 단백질을 우선하면 오트식빵, 맛 변화를 원하면 고구마소보로가 맞습니다." },
      ],
    },
    {
      title: "비교할 때 놓치기 쉬운 점",
      items: [
        { title: "당류 차이는 없습니다", body: "네 맛 모두 당류 1.9g이므로 저당 기준에서는 우열이 없습니다. 단백질과 맛 취향이 실제 선택을 가르는 지표입니다." },
        { title: "칼로리 차이도 작습니다", body: "최저 170kcal, 최고 176kcal로 6kcal 차이입니다. 칼로리만으로 맛을 포기할 필요는 크지 않습니다." },
        { title: "식사대용은 전체 식단과 함께", body: "쉐이크 한 팩의 수치만으로 완전한 식사를 대신한다고 단정하기 어렵습니다. 포만감과 하루 전체 영양 구성을 함께 확인하세요." },
      ],
    },
  ],
  faq: [
    { question: "테이크핏 브레드밀 중 단백질이 가장 높은 맛은 무엇인가요?", answer: "초코 브라우니와 고소오트식빵이 각각 단백질 24g으로 가장 높습니다." },
    { question: "테이크핏 브레드밀 중 당류가 가장 낮은 맛은 무엇인가요?", answer: "네 가지 맛 모두 당류 1.9g으로 같습니다. 당류보다는 단백질 총량과 맛 취향으로 비교하는 편이 좋습니다." },
    { question: "다이어트용으로는 어떤 맛이 유리한가요?", answer: "칼로리는 170~176kcal로 차이가 작습니다. 한 팩의 단백질 효율을 함께 보면 170kcal·단백질 24g인 초코 브라우니가 먼저 비교할 후보입니다." },
  ],
  relatedGuides: [
    { title: "2026 쉐이크 신제품 24종", href: "/guides/product-selection-comparison/protein-shake-new-products-2026", description: "테이크핏을 포함한 신규 쉐이크를 브랜드별로 비교합니다." },
    { title: "저당 단백질 쉐이크", href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide", description: "당류 3g 이하 제품을 전체 브랜드에서 비교합니다." },
    { title: "단백질 쉐이크 추천 TOP 7", href: "/guides/product-selection-comparison/protein-shake-top7", description: "전체 쉐이크 중 종합 추천 후보를 확인합니다." },
    { title: "쉐이크 전체 비교", href: "/shake", description: "등록된 모든 쉐이크를 영양성분 기준으로 비교합니다." },
  ],
  purchaseLinks: [
    { label: "테이크핏 초코 브라우니", slug: "takefit-breadmeal-shake-choco-brownie-45" },
    { label: "테이크핏 고소오트식빵", slug: "takefit-breadmeal-shake-savory-oat-bread-45" },
    { label: "테이크핏 고구마소보로", slug: "takefit-breadmeal-shake-sweet-potato-soboro-45" },
  ],
};

export const metadata = buildGuideMetadata(config);

export default function Page() {
  return <ComparisonGuidePage config={config} />;
}

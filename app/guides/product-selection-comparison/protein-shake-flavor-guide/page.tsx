import { ComparisonGuidePage, buildGuideMetadata, type ComparePageConfig } from "../productCompareShared";

const config: ComparePageConfig = {
  slug: "protein-shake-flavor-guide",
  title: "단백질 쉐이크 맛 추천 | 초코·곡물·과일·디저트 비교 2026",
  description: "단백질 쉐이크를 초코, 곡물, 과일·요거트, 고구마·옥수수, 디저트 계열로 나눠 맛 취향과 단백질·당류 기준으로 추천합니다.",
  keywords: ["단백질 쉐이크 맛 추천", "맛있는 단백질 쉐이크", "프로틴 쉐이크 맛", "단백질 쉐이크 초코", "곡물 단백질 쉐이크"],
  badge: "맛별 추천",
  readingTime: "약 6분",
  updatedAt: "2026-10-01",
  methodologyNote: "ProteinLab 등록 파우치형 쉐이크의 맛 이름과 영양정보 기준",
  intro: "단백질 쉐이크는 성분이 좋아도 맛이 맞지 않으면 꾸준히 먹기 어렵습니다. 초코처럼 익숙한 맛부터 곡물, 과일·요거트, 고구마·옥수수, 디저트 계열까지 취향을 먼저 좁히고 그 안에서 단백질과 당류를 비교하면 실패 확률을 줄일 수 있습니다.",
  summary: [
    "처음이라면 초코 계열이 가장 무난하고, 고소한 맛을 좋아하면 곡물·율무·오트 계열이 비교하기 쉽습니다.",
    "새로운 맛을 원하면 딜라이트 프로젝트의 과일·요거트 계열과 테이크핏 브레드밀의 디저트 계열을 볼 수 있습니다.",
    "같은 맛 계열에서도 당류와 단백질 차이가 있으므로 맛을 고른 뒤 영양정보를 한 번 더 확인해야 합니다.",
  ],
  comparisonTitle: "맛 계열별 대표 후보",
  comparisonColumns: ["초코", "곡물·고소함", "과일·요거트", "고구마·옥수수", "디저트·빵"],
  comparisonRows: [
    { label: "대표 제품", values: ["테이크핏 초코 브라우니", "스포식스 고쇼율무", "딜라이트 딸기요거트", "매일한끼 자색고구마", "테이크핏 바나나브륄레"] },
    { label: "단백질", values: ["24g", "22g", "20g", "20g", "20g"] },
    { label: "당류", values: ["1.9g", "1g", "6g", "4g", "1.9g"] },
    { label: "잘 맞는 취향", values: ["익숙한 단맛", "고소한 곡물", "상큼한 맛", "구수한 단맛", "디저트 풍미"] },
  ],
  sections: [
    {
      title: "취향별로 고르는 순서",
      items: [
        { title: "처음이면 초코 계열", body: "초코는 브랜드 간 비교가 쉽고 가장 익숙한 계열입니다. 고단백·저당까지 함께 보면 테이크핏 초코 브라우니처럼 단백질 24g·당류 1.9g인 제품이 먼저 보입니다." },
        { title: "덜 달고 고소한 맛", body: "매일한끼 곡물은 당류 1g·145kcal, 스포식스 고쇼율무는 단백질 22g·당류 1g입니다. 달콤한 디저트 맛이 부담스러운 사람에게 맞습니다." },
        { title: "상큼하고 새로운 맛", body: "딜라이트 프로젝트는 딸기요거트·블루베리요거트·멜론밀크처럼 과일 계열 선택 폭이 넓습니다. 이 계열은 맛에 따라 당류 차이가 있으므로 성분표를 같이 봐야 합니다." },
      ],
    },
    {
      title: "박스 구매 전에 확인할 점",
      items: [
        { title: "맛 이름만으로 단맛을 단정하지 않기", body: "초코나 디저트 이름이 붙어도 당류가 낮은 제품이 있고, 과일·요거트 계열은 상대적으로 당류가 높을 수 있습니다. 실제 수치를 확인하세요." },
        { title: "한 가지보다 로테이션 고려", body: "매일 같은 맛을 마시면 쉽게 질릴 수 있습니다. 초코 한 종류와 곡물 또는 과일 계열을 번갈아 먹는 방식이 지속하기 편합니다." },
        { title: "처음에는 소량으로", body: "향과 질감은 영양성분표만으로 판단하기 어렵습니다. 처음 접하는 맛은 단품이나 소량 구성으로 확인한 뒤 묶음 구매를 고려하는 편이 안전합니다." },
      ],
    },
  ],
  faq: [
    { question: "단백질 쉐이크를 처음 먹는다면 어떤 맛이 무난한가요?", answer: "평소 초코 음료를 좋아한다면 초코 계열이 가장 비교하기 쉽습니다. 단맛이 부담스럽다면 곡물·율무·오트 계열을 먼저 볼 수 있습니다." },
    { question: "맛있는 쉐이크는 당류가 높은가요?", answer: "반드시 그렇지는 않습니다. 테이크핏 브레드밀 4종은 디저트 계열이지만 당류가 모두 1.9g입니다. 맛 이름보다 영양성분표의 당류를 직접 확인해야 합니다." },
    { question: "과일맛과 곡물맛 중 다이어트에는 무엇이 낫나요?", answer: "맛 계열만으로 판단할 수 없습니다. 같은 계열에서도 칼로리와 당류가 다르므로 개별 제품의 단백질·당류·칼로리를 함께 비교해야 합니다." },
  ],
  relatedGuides: [
    { title: "2026 쉐이크 신제품 24종", href: "/guides/product-selection-comparison/protein-shake-new-products-2026", description: "새로 등록된 다섯 브랜드의 전체 맛과 성분을 비교합니다." },
    { title: "딜라이트 프로젝트 8종", href: "/guides/product-selection-comparison/delight-project-shake-flavors", description: "과일·요거트·곡물·디저트 계열 8가지 맛을 자세히 봅니다." },
    { title: "테이크핏 브레드밀 4종", href: "/guides/product-selection-comparison/takefit-breadmeal-protein-shake", description: "빵과 디저트 계열 네 맛을 단백질과 당류 기준으로 비교합니다." },
    { title: "저당 단백질 쉐이크", href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide", description: "맛을 고른 뒤 당류 3g 이하 후보를 다시 좁힙니다." },
  ],
  purchaseLinks: [
    { label: "테이크핏 초코 브라우니", slug: "takefit-breadmeal-shake-choco-brownie-45" },
    { label: "스포식스 고쇼율무", slug: "sportsix-protein-shake-savory-yulmu-45" },
    { label: "딜라이트 멜론밀크", slug: "delight-project-shake-melon-milk-45" },
  ],
};

export const metadata = buildGuideMetadata(config);

export default function Page() {
  return <ComparisonGuidePage config={config} />;
}

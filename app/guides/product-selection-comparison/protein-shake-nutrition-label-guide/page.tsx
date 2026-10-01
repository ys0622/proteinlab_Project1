import { ComparisonGuidePage, buildGuideMetadata, type ComparePageConfig } from "../productCompareShared";

const config: ComparePageConfig = {
  slug: "protein-shake-nutrition-label-guide",
  title: "단백질 쉐이크 성분표 보는 법 | 단백질·당류·칼로리 기준",
  description: "단백질 쉐이크 영양성분표에서 단백질, 당류, 칼로리, 식이섬유, 나트륨을 어떤 순서로 확인해야 하는지 목적별 기준과 함께 설명합니다.",
  keywords: ["단백질 쉐이크 성분", "프로틴 쉐이크 성분", "단백질 쉐이크 영양성분", "단백질 쉐이크 고르는 법", "단백질 쉐이크 당류"],
  badge: "성분표 가이드",
  readingTime: "약 6분",
  updatedAt: "2026-10-01",
  methodologyNote: "제품 포장 영양정보의 1회 제공량 기준",
  intro: "단백질 쉐이크는 단백질 함량 하나만 보면 제품의 용도를 제대로 판단하기 어렵습니다. 한 팩의 제공량을 먼저 확인한 뒤 단백질, 칼로리, 당류, 식이섬유, 나트륨을 섭취 목적에 맞는 순서로 읽어야 실제로 비교할 수 있습니다.",
  summary: [
    "가장 먼저 1회 제공량과 단백질 총량을 확인하고, 다이어트 목적이면 당류와 칼로리를 함께 봅니다.",
    "식사대용 목적이라면 단백질뿐 아니라 식이섬유와 전체 열량도 확인해야 합니다.",
    "제품 간 비교는 반드시 같은 기준인 1팩 또는 1회 제공량으로 맞춰야 합니다.",
  ],
  comparisonTitle: "영양성분표 확인 순서",
  comparisonColumns: ["무엇을 보나", "먼저 볼 기준", "해석할 때 주의점"],
  comparisonRows: [
    { label: "1회 제공량", values: ["한 팩·한 포 용량", "제품 비교의 출발점", "100g 기준과 혼동하지 않기"] },
    { label: "단백질", values: ["1회 총 단백질", "보충량 확인", "높을수록 항상 좋은 것은 아님"] },
    { label: "당류", values: ["당류 g", "저당 목적이면 우선 확인", "맛 이름으로 추정하지 않기"] },
    { label: "칼로리", values: ["1회 총 열량", "간식·식사대용 구분", "낮으면 포만감도 약할 수 있음"] },
    { label: "식이섬유", values: ["식이섬유 g", "식사대용·포만감 참고", "표기되지 않은 제품도 있음"] },
    { label: "나트륨", values: ["나트륨 mg", "하루 식단과 함께 확인", "한 제품만 떼어 판단하지 않기"] },
  ],
  sections: [
    {
      title: "목적에 따라 보는 순서가 다릅니다",
      items: [
        { title: "운동 후 보충", body: "한 번에 섭취하는 단백질 총량을 먼저 보고, 이어서 칼로리와 당류를 확인합니다. 하루 전체 단백질 섭취량 안에서 부족한 만큼 보완하는 관점이 중요합니다." },
        { title: "다이어트 간식", body: "칼로리와 당류를 먼저 좁힌 뒤 단백질이 충분한지 확인합니다. 칼로리만 낮고 단백질이 부족하면 간식 대체 만족도가 낮을 수 있습니다." },
        { title: "아침·식사대용", body: "단백질과 칼로리 외에 식이섬유를 같이 확인해야 합니다. 쉐이크 하나만으로 모든 영양소가 충족된다고 단정하지 말고 전체 식단과 함께 판단하세요." },
      ],
    },
    {
      title: "성분 비교에서 자주 생기는 오류",
      items: [
        { title: "1팩과 100g 기준 혼동", body: "제품마다 용량이 달라 100g 기준과 1회 제공량 기준을 섞으면 실제 섭취량 비교가 왜곡됩니다. 먼저 기준 단위를 맞추세요." },
        { title: "단백질 숫자만 비교", body: "단백질이 높아도 열량과 당류, 나트륨이 목적에 맞지 않을 수 있습니다. 최소 세 가지 지표를 함께 보는 편이 좋습니다." },
        { title: "성분표와 원재료명 혼동", body: "영양성분표는 영양소의 양을, 원재료명은 사용된 재료와 알레르기 관련 정보를 확인하는 영역입니다. 두 항목의 역할이 다릅니다." },
      ],
    },
  ],
  faq: [
    { question: "단백질 쉐이크는 단백질이 몇 g이면 좋은가요?", answer: "모든 사람에게 같은 기준이 적용되지는 않습니다. 제품 한 팩의 단백질 총량을 하루 식사에서 섭취하는 양과 함께 보고, 자신의 섭취 목적에 맞게 부족분을 보완해야 합니다." },
    { question: "저당 단백질 쉐이크는 당류 몇 g부터 보면 되나요?", answer: "ProteinLab 비교에서는 제품을 빠르게 좁히기 위한 실용 기준으로 당류 3g 이하 구간을 먼저 보여줍니다. 제품의 공식 표시와 전체 식단도 함께 확인하세요." },
    { question: "칼로리가 가장 낮은 제품이 다이어트에 가장 좋은가요?", answer: "반드시 그렇지는 않습니다. 단백질과 식이섬유가 부족하면 포만감이 낮을 수 있으므로 칼로리와 함께 확인해야 합니다." },
    { question: "영양성분표만 보면 알레르기 정보도 알 수 있나요?", answer: "알레르기 유발 성분은 영양성분표가 아니라 제품의 원재료명과 알레르기 표시를 별도로 확인해야 합니다." },
  ],
  relatedGuides: [
    { title: "단백질 쉐이크 고르는 법", href: "/guides/product-selection-comparison/protein-shake-guide", description: "성분 기준을 실제 제품 선택 과정에 적용합니다." },
    { title: "저당 단백질 쉐이크", href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide", description: "당류 3g 이하 제품을 실제 수치로 비교합니다." },
    { title: "단백질 쉐이크 칼로리 순위", href: "/guides/product-selection-comparison/protein-shake-calorie-ranking", description: "등록 제품을 칼로리가 낮은 순서로 확인합니다." },
    { title: "2026 쉐이크 신제품 24종", href: "/guides/product-selection-comparison/protein-shake-new-products-2026", description: "새 제품의 단백질·당류·칼로리를 같은 기준으로 비교합니다." },
  ],
  purchaseLinks: [
    { label: "매일한끼 곡물 성분 확인", slug: "maeilhankki-shake-grain-40" },
    { label: "테이크핏 초코 브라우니 성분 확인", slug: "takefit-breadmeal-shake-choco-brownie-45" },
    { label: "딜라이트 멜론밀크 성분 확인", slug: "delight-project-shake-melon-milk-45" },
  ],
};

export const metadata = buildGuideMetadata(config);

export default function Page() {
  return <ComparisonGuidePage config={config} />;
}

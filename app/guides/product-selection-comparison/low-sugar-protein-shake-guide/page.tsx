import { ShakeGuidePage, buildShakeGuideMetadata } from "../shakeGuideShared";

export const metadata = buildShakeGuideMetadata(
  "저당 단백질 쉐이크",
  "당류가 낮은 단백질 쉐이크를 고를 때 단백질, 칼로리, 식이섬유까지 함께 보는 기준을 정리한 ProteinLab 가이드입니다.",
);

export default function LowSugarProteinShakeGuidePage() {
  return (
    <ShakeGuidePage
      title="저당 단백질 쉐이크"
      description="저당 단백질 쉐이크를 찾는 이유는 보통 비슷합니다. 당류 부담은 줄이고 싶지만, 단백질은 충분히 챙기고 싶기 때문입니다. 문제는 당류만 낮고 전체 성분 균형이 아쉬운 제품도 있다는 점입니다."
      breadcrumbLabel="저당 단백질 쉐이크"
      keyword="저당 단백질 쉐이크"
      hook="달지 않은 단백질 쉐이크를 찾고 있다면"
      hookBody={[
        "저당 단백질 쉐이크는 당류만 보고 고르면 오히려 단백질이 부족하거나 식사대용성까지 놓치는 경우가 있습니다.",
        "그래서 저당 기준은 첫 필터일 뿐이고, 단백질 함량과 전체 균형을 같이 보는 방식이 실제 선택에 더 도움이 됩니다.",
      ]}
      tlDrItems={[
        "저당 단백질 쉐이크는 당류 3g 이하 구간부터 먼저 보는 편이 효율적입니다.",
        "당류가 낮아도 단백질이 낮으면 의미가 줄어듭니다.",
        "식사대용까지 볼 거라면 식이섬유와 칼로리도 같이 확인해야 합니다.",
        "ProteinLab에서는 저당 쉐이크를 빠른 큐레이션으로 먼저 좁힐 수 있습니다.",
      ]}
      comparisonTitle="추천 기준 → 제품 예시 → 요약"
      comparisonCards={[
        { title: "1단계", body: "당류 3g 이하 제품부터 먼저 좁힙니다. 너무 넓게 보면 비교가 오히려 어려워집니다." },
        { title: "2단계", body: "그 안에서 단백질 20g 전후 제품을 다시 비교합니다. 저당이면서 단백질 효율이 있는지 보는 단계입니다." },
        { title: "3단계", body: "식사대용까지 볼 계획이면 식이섬유와 칼로리를 같이 확인합니다." },
      ]}
      criteriaItems={[
        { title: "당류", body: "저당 쉐이크를 찾는 가장 기본 조건입니다. ProteinLab에서는 3g 이하 구간부터 먼저 보기 쉽게 정리합니다." },
        { title: "단백질", body: "저당이어도 단백질이 낮으면 단백질 쉐이크로서 의미가 줄어듭니다. 당류를 좁힌 뒤 단백질 함량을 다시 비교해야 합니다." },
        { title: "칼로리", body: "다이어트 목적과 식사대용 목적에 따라 해석이 달라집니다. 너무 낮으면 포만감이 약하고, 너무 높으면 저당의 장점이 희석될 수 있습니다." },
        { title: "식이섬유", body: "저당 + 식사대용을 동시에 보고 싶다면 같이 봐야 하는 지표입니다. 포만감과 섭취 만족도를 끌어올리는 데 도움이 됩니다." },
      ]}
      products={[
        { name: "랩노쉬 슬림쉐이크 더블초코", protein: "20g", feature: "당류가 낮고 식이섬유까지 포함되어 저당 + 식사대용 기준을 같이 보기 좋습니다.", recommendedFor: "저당 기준과 식사대용 기준을 동시에 보는 사람" },
        { name: "단백하니 단백질쉐이크 시그니처", protein: "22g", feature: "고단백 중심이면서 당류 부담이 낮은 편이라 운동 후 보충용 저당 비교에도 잘 들어옵니다.", recommendedFor: "저당 기준과 운동 후 보충 기준을 같이 보는 사람" },
        { name: "플라이밀 프로틴쉐이크 딸기", protein: "제품 기준 확인", feature: "맛 선택 폭이 있는 라인업 중에서도 저당 비교 축으로 보기 쉬운 타입입니다.", recommendedFor: "맛 선택 폭과 저당 기준을 같이 보는 사람" },
      ]}
      closing="저당 단백질 쉐이크는 당류만 낮다고 좋은 제품이 되는 건 아닙니다. 단백질, 칼로리, 식이섬유까지 함께 봐야 실제로 만족도가 높은 제품을 고를 수 있습니다."
      internalLinks={[
        { label: "단백질 쉐이크 추천이 궁금하다면 → 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/protein-shake-guide" },
        { label: "식사대용 기준이 궁금하다면 → 식사대용 단백질 쉐이크", href: "/guides/product-selection-comparison/meal-replacement-protein-shake-guide" },
        { label: "음료와 비교가 궁금하다면 → 단백질 음료 vs 단백질 쉐이크", href: "/guides/product-selection-comparison/protein-drink-vs-protein-shake" },
      ]}
      ctaBody="ProteinLab 쉐이크 카테고리에서 저당 기준으로 제품을 바로 비교해보세요. 저당 큐레이션과 상세페이지를 같이 보면 당류만 낮은 제품과 균형이 좋은 제품을 구분하기 쉽습니다."
    />
  );
}

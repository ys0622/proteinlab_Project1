import { ShakeGuidePage, buildShakeGuideMetadata } from "../shakeGuideShared";

export const metadata = buildShakeGuideMetadata(
  "식사대용 단백질 쉐이크",
  "식사대용 단백질 쉐이크를 고를 때 단백질, 칼로리, 식이섬유, 당류를 어떻게 봐야 하는지 정리한 ProteinLab 가이드입니다.",
);

export default function MealReplacementProteinShakeGuidePage() {
  return (
    <ShakeGuidePage
      title="식사대용 단백질 쉐이크"
      description="식사대용 단백질 쉐이크는 운동용 보충 쉐이크와 보는 기준이 다릅니다. 단백질이 높아도 칼로리가 너무 낮거나 식이섬유가 부족하면 실제 한 끼 대체 용도로는 아쉬울 수 있습니다."
      breadcrumbLabel="식사대용 단백질 쉐이크"
      keyword="식사대용 단백질 쉐이크"
      hook="식사 대신 먹을 쉐이크를 찾고 있다면"
      hookBody={[
        "식사대용 단백질 쉐이크는 단백질만 높다고 끝나는 제품이 아닙니다. 포만감과 섭취 만족도를 생각하면 칼로리와 식이섬유까지 함께 봐야 합니다.",
        "특히 바쁜 아침이나 점심 대체용으로 고른다면 운동 직후 보충용 제품과 같은 기준으로 보면 오히려 만족도가 떨어질 수 있습니다.",
      ]}
      tlDrItems={[
        "식사대용 단백질 쉐이크는 단백질만 높다고 끝이 아닙니다.",
        "150kcal 이상, 단백질 15g 이상, 식이섬유 4g 이상 구간부터 먼저 보는 편이 실용적입니다.",
        "당류가 높으면 식사대용보다 간식형 제품에 가까워질 수 있습니다.",
        "ProteinLab에서는 식사대용 쉐이크를 빠른 큐레이션으로 먼저 좁혀볼 수 있습니다.",
      ]}
      comparisonTitle="식사대용 쉐이크 vs 운동 보충용 쉐이크"
      comparisonCards={[
        { title: "식사대용 쉐이크", body: "포만감, 칼로리, 식이섬유, 단백질 균형을 같이 봐야 합니다. 한 끼 대체 기준에 더 가깝습니다." },
        { title: "운동 후 보충용", body: "단백질 함량과 단백질 밀도를 더 우선합니다. 포만감보다 빠른 보충이 중요할 때가 많습니다." },
        { title: "공통 체크포인트", body: "당류가 지나치게 높지 않은지, 한 팩 기준 영양성분이 명확한지 같이 체크해야 합니다." },
      ]}
      criteriaItems={[
        { title: "단백질", body: "식사대용이라도 단백질이 너무 낮으면 대체 만족도가 떨어집니다. 최소 15g 이상부터 비교하는 편이 좋습니다." },
        { title: "칼로리", body: "너무 낮으면 한 끼를 대체하기 어렵고, 너무 높으면 오히려 부담이 커질 수 있습니다. 대략 150kcal 이상 구간부터 보는 편이 실용적입니다." },
        { title: "식이섬유", body: "식사대용 적합성을 판단할 때 핵심입니다. 포만감과 식감 만족도에 영향을 주기 때문에 4g 이상 여부를 같이 보는 편이 좋습니다." },
        { title: "당류", body: "당류가 높으면 식사대용보다는 달콤한 간식형 쉐이크에 가까워집니다. 당류가 낮으면서 성분 균형이 좋은지 같이 봐야 합니다." },
      ]}
      products={[
        { name: "랩노쉬 슬림쉐이크 더블초코", protein: "20g", feature: "식이섬유와 단백질 밸런스가 좋아 식사대용 쉐이크 맥락에서 보기 편합니다.", recommendedFor: "한 끼 대체 목적을 가장 우선하는 사람" },
        { name: "플라이밀 프로틴쉐이크 초코", protein: "22g", feature: "단백질 함량이 높고 식이섬유도 포함되어 범용적인 식사대용 후보로 보기 좋습니다.", recommendedFor: "식사대용과 단백질 보충을 같이 노리는 사람" },
        { name: "올더배러 단백질쉐이크 저당 17곡 미숫가루", protein: "24g", sugar: "1g", calories: "170kcal", feature: "곡물형 풍미에 저당·고단백 균형이 좋아 식사대용 맥락에서 비교하기 좋습니다.", recommendedFor: "달지 않은 곡물형 식사대용 쉐이크를 찾는 사람" },
      ]}
      closing="식사대용 단백질 쉐이크는 고단백보다 균형이 더 중요할 때가 많습니다. 칼로리, 식이섬유, 당류, 단백질을 함께 봐야 실제로 한 끼를 대체하기 쉬운 제품을 고를 수 있습니다."
      internalLinks={[
        { label: "단백질 쉐이크 전체 추천이 궁금하다면 → 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/protein-shake-guide" },
        { label: "저당 기준이 궁금하다면 → 저당 단백질 쉐이크", href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide" },
        { label: "운동 후 섭취 기준이 궁금하다면 → 운동 후 단백질 쉐이크", href: "/guides/product-selection-comparison/post-workout-protein-shake-guide" },
      ]}
      ctaBody="ProteinLab 쉐이크 카테고리에서 식사대용 기준으로 제품을 비교해보세요. 식사대용 큐레이션과 실제 제품 상세를 함께 보면 훨씬 빠르게 좁힐 수 있습니다."
    />
  );
}

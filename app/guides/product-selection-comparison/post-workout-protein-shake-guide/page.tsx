import { ShakeGuidePage, buildShakeGuideMetadata } from "../shakeGuideShared";

export const metadata = buildShakeGuideMetadata(
  "운동 후 단백질 쉐이크",
  "운동 후 단백질 쉐이크를 고를 때 단백질 함량, 당류, 칼로리, 단백질 밀도를 어떻게 봐야 하는지 정리한 ProteinLab 가이드입니다.",
);

export default function PostWorkoutProteinShakeGuidePage() {
  return (
    <ShakeGuidePage
      title="운동 후 단백질 쉐이크"
      description="운동 후 단백질 쉐이크는 편하게 먹을 수 있느냐도 중요하지만, 결국은 성분이 더 중요합니다. 단백질이 충분한지, 당류가 과하지 않은지, 칼로리 대비 단백질 효율이 괜찮은지를 같이 봐야 실제 보충용으로 적합한 제품을 고를 수 있습니다."
      breadcrumbLabel="운동 후 단백질 쉐이크"
      keyword="운동 후 단백질 쉐이크"
      hook="운동 후에 먹을 단백질 쉐이크를 찾는다면"
      hookBody={[
        "운동 후 쉐이크는 맛보다 보충 효율이 먼저입니다. 한 팩으로 단백질이 충분한지, 당류가 과하지 않은지, 불필요하게 무겁지는 않은지 확인해야 합니다.",
        "식사대용까지 겸할 계획이 아니라면 운동 후 보충용 쉐이크는 단백질 함량과 단백질 밀도를 더 우선해서 보는 편이 합리적입니다.",
      ]}
      tlDrItems={[
        "운동 후 단백질 쉐이크는 단백질 20g 전후를 먼저 봅니다.",
        "단백질 밀도가 높을수록 같은 칼로리에서 효율적으로 보기 쉽습니다.",
        "당류가 너무 높으면 운동 후 보충용으로는 아쉬울 수 있습니다.",
        "식사대용 목적이 아니라면 식이섬유보다 단백질 효율을 우선해도 됩니다.",
      ]}
      comparisonTitle="추천 기준 → 제품 예시 → 요약"
      comparisonCards={[
        { title: "단백질 20g 전후", body: "운동 후 한 팩으로 보충감을 만들기 쉬운 구간입니다. 너무 낮으면 보충 제품으로서 매력이 줄어듭니다." },
        { title: "단백질 밀도", body: "같은 칼로리라면 단백질이 더 많이 들어간 제품이 유리합니다. ProteinLab 등급에서도 중요한 축입니다." },
        { title: "당류 확인", body: "당류가 높아도 맛은 좋을 수 있지만 운동 후 보충용 기준으로는 아쉬울 수 있습니다. 고단백과 저당을 같이 보는 편이 좋습니다." },
      ]}
      criteriaItems={[
        { title: "단백질 함량", body: "운동 후 기준에서는 가장 먼저 볼 항목입니다. 20g 전후를 기준으로 비교를 시작하면 선택이 빨라집니다." },
        { title: "단백질 밀도", body: "칼로리 대비 단백질 효율을 보여주는 지표입니다. 같은 단백질 쉐이크라도 실제 효율 차이가 꽤 납니다." },
        { title: "당류", body: "단백질이 높아도 당류가 과하면 운동 후 보충용으로는 애매할 수 있습니다. 저당 기준과 함께 비교하면 실수가 줄어듭니다." },
        { title: "칼로리", body: "운동 직후 가볍게 보충할지, 식사까지 겸할지에 따라 해석이 달라집니다. 목적에 맞지 않게 과도하게 높거나 낮지 않은지 확인해야 합니다." },
      ]}
      products={[
        { name: "단백하니 단백질쉐이크 시그니처", protein: "22g", feature: "고단백 중심이라 운동 후 보충용 비교에 가장 먼저 넣기 좋은 타입입니다.", recommendedFor: "운동 후 보충 효율을 우선하는 사람" },
        { name: "플라이밀 프로틴쉐이크 초코", protein: "22g", feature: "단백질과 전체 균형이 무난해 운동 후에 비교하기 편합니다.", recommendedFor: "무난한 운동 후 쉐이크를 찾는 사람" },
        { name: "프로티원 단백쉐이크 초코", protein: "23g", sugar: "1g", calories: "128kcal", feature: "고단백·저당·저칼로리 균형이 좋아 운동 후 보충용 비교에 잘 들어옵니다.", recommendedFor: "단백질 밀도가 높은 운동 후 쉐이크를 찾는 사람" },
      ]}
      closing="운동 후 단백질 쉐이크는 단백질 함량만 보지 말고, 당류와 단백질 밀도까지 함께 보는 게 좋습니다. 그래야 같은 쉐이크라도 실제 보충 효율이 더 좋은 제품을 걸러낼 수 있습니다."
      internalLinks={[
        { label: "단백질 쉐이크 추천이 궁금하다면 → 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/protein-shake-guide" },
        { label: "저당 기준이 궁금하다면 → 저당 단백질 쉐이크", href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide" },
        { label: "섭취 타이밍 전체가 궁금하다면 → 운동 후 단백질 섭취", href: "/guides/intake-strategy-health/post-workout-protein" },
      ]}
      ctaBody="ProteinLab 쉐이크 카테고리에서 운동 후 보충용으로 보기 좋은 제품을 비교해보세요. 고단백, 저당, 단백질 밀도 기준을 빠르게 적용해볼 수 있습니다."
    />
  );
}

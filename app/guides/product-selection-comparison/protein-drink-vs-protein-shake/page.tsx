import { ShakeGuidePage, buildShakeGuideMetadata } from "../shakeGuideShared";

export const metadata = buildShakeGuideMetadata(
  "단백질 음료 vs 단백질 쉐이크",
  "단백질 음료와 단백질 쉐이크의 차이를 RTD 여부, 섭취감, 용도, 성분 기준으로 비교한 ProteinLab 가이드입니다.",
);

export default function ProteinDrinkVsProteinShakePage() {
  return (
    <ShakeGuidePage
      title="단백질 음료 vs 단백질 쉐이크"
      description="단백질 음료와 단백질 쉐이크는 비슷해 보여도 섭취 방식과 성분 구성이 다릅니다. ProteinLab에서는 단백질 음료는 RTD 제품, 단백질 쉐이크는 파우치형 중심의 간편 섭취형으로 나눠서 봅니다."
      breadcrumbLabel="단백질 음료 vs 단백질 쉐이크"
      keyword="단백질 음료 vs 단백질 쉐이크"
      hook="단백질 음료와 단백질 쉐이크, 뭐가 다른지 헷갈린다면"
      hookBody={[
        "둘 다 단백질을 보충하는 제품이지만, 실제로는 섭취감과 용도가 꽤 다릅니다. 바로 마시는 RTD가 필요한지, 식사대용까지 고려하는지가 선택 기준을 나눕니다.",
        "그래서 단백질 음료 vs 단백질 쉐이크는 어느 쪽이 무조건 더 좋다는 비교보다, 어떤 상황에서 무엇이 더 맞는지로 접근하는 편이 정확합니다.",
      ]}
      tlDrItems={[
        "단백질 음료는 바로 마시는 RTD 제품입니다.",
        "단백질 쉐이크는 파우치형 중심의 간편 섭취형입니다.",
        "운동 후 빠른 보충이면 단백질 음료가 편하고, 식사대용이면 쉐이크가 유리한 경우가 많습니다.",
        "두 카테고리 모두 당류와 단백질 밀도를 같이 봐야 실제 선택이 쉬워집니다.",
      ]}
      comparisonTitle="쉐이크 vs 음료 차이 표"
      comparisonRows={[
        { label: "형태", shake: "파우치형 중심, 간편 섭취형", drink: "RTD, 바로 마시는 형태" },
        { label: "섭취감", shake: "조금 더 묵직하고 식사대용 맥락이 많음", drink: "가볍고 빠르게 마시기 좋음" },
        { label: "주요 비교 기준", shake: "식사대용성, 식이섬유, 저당 여부", drink: "단백질 밀도, 저당, 즉시 섭취 편의성" },
        { label: "추천 상황", shake: "바쁜 아침, 한 끼 대체, 포만감 보완", drink: "운동 직후, 외출 중, 가볍게 보충" },
      ]}
      criteriaItems={[
        { title: "운동 후 빠른 보충", body: "바로 마실 수 있고 가벼운 RTD 단백질 음료가 더 잘 맞는 경우가 많습니다. 단백질 밀도와 당류를 먼저 보세요." },
        { title: "식사대용", body: "식이섬유와 칼로리 구성이 있는 단백질 쉐이크가 더 적합한 경우가 많습니다. 포만감과 섭취감 차이가 있습니다." },
        { title: "저당 기준", body: "단백질 음료와 쉐이크 모두 저당 제품이 있지만, 당류만 보지 말고 단백질 함량과 칼로리까지 같이 비교해야 합니다." },
        { title: "비교할 때 주의할 점", body: "둘 다 같은 단백질 제품이라고 묶어서 비교하면 용도 차이를 놓치기 쉽습니다. RTD인지, 식사대용 성격이 있는지 먼저 나눠보는 편이 좋습니다." },
      ]}
      products={[
        { name: "셀렉스 프로핏 밀크 바닐라", protein: "제품 기준 확인", feature: "RTD 형태로 바로 마시기 쉬워 운동 후 가볍게 접근하기 좋습니다.", recommendedFor: "운동 후 빠르게 마실 제품을 찾는 사람" },
        { name: "랩노쉬 슬림쉐이크 더블초코", protein: "20g", feature: "식이섬유가 포함되어 식사대용 맥락에서 보기 좋습니다.", recommendedFor: "한 끼 대체까지 고려하는 사람" },
        { name: "단백하니 단백질쉐이크 시그니처", protein: "22g", feature: "고단백 중심의 간편 섭취형이라 쉐이크 쪽 고단백 비교에 잘 들어옵니다.", recommendedFor: "쉐이크 형태로 단백질 보충 효율을 우선하는 사람" },
      ]}
      closing="단백질 음료와 단백질 쉐이크는 어느 쪽이 더 좋다고 단정하기보다 목적이 다르다고 보는 편이 맞습니다. 빠르게 마시고 끝내려면 음료, 포만감과 식사대용성까지 보려면 쉐이크가 더 잘 맞을 수 있습니다."
      internalLinks={[
        { label: "단백질 쉐이크 추천이 궁금하다면 → 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/protein-shake-guide" },
        { label: "단백질 음료 기준이 궁금하다면 → 단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
        { label: "운동 후 섭취 기준이 궁금하다면 → 운동 후 단백질 쉐이크", href: "/guides/product-selection-comparison/post-workout-protein-shake-guide" },
      ]}
      ctaBody="ProteinLab에서 단백질 음료와 단백질 쉐이크를 각각 비교해보고, 내 목적에 맞는 쪽을 선택해보세요. RTD 음료와 쉐이크를 같은 기준으로 섞어 보지 않도록 카테고리를 나눠서 볼 수 있습니다."
    />
  );
}

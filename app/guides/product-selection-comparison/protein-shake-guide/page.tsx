import { ShakeGuidePage, buildShakeGuideMetadata } from "../shakeGuideShared";

export const metadata = buildShakeGuideMetadata(
  "단백질 쉐이크 추천 가이드",
  "파우더 제외, 파우치형 중심의 간편 섭취 단백질 쉐이크를 비교할 때 단백질 함량, 당류, 칼로리, 식이섬유를 어떻게 봐야 하는지 정리했습니다.",
);

export default function ProteinShakeGuidePage() {
  return (
    <ShakeGuidePage
      title="단백질 쉐이크 추천 가이드"
      description="단백질 쉐이크는 제품마다 성분 차이가 크기 때문에, 단백질 함량만 보고 고르면 목적과 맞지 않는 제품을 고를 수 있습니다. ProteinLab 기준으로는 파우더가 아니라 파우치형 중심의 간편 섭취 단백질 쉐이크를 비교합니다."
      breadcrumbLabel="단백질 쉐이크 추천 가이드"
      keyword="단백질 쉐이크 추천"
      hook="단백질 쉐이크를 사려는데 뭐가 좋은지 모르겠다면"
      hookBody={[
        "단백질 쉐이크는 편하게 먹을 수 있다는 장점 때문에 많이 찾지만, 같은 쉐이크라도 단백질은 높은데 당류가 많은 제품이 있고, 식사대용으로는 괜찮지만 운동 후 보충용으로는 애매한 제품도 있습니다.",
        "그래서 단백질 쉐이크 추천은 인기나 맛보다 먼저 성분 기준을 정리하고 들어가는 편이 훨씬 효율적입니다.",
      ]}
      tlDrItems={[
        "단백질 쉐이크 추천은 단백질 g, 당류, 칼로리, 식이섬유를 같이 봐야 합니다.",
        "운동 후 보충용이면 단백질 함량과 단백질 밀도를 먼저 봅니다.",
        "식사대용이면 칼로리와 식이섬유까지 같이 확인해야 합니다.",
        "저당 제품을 원하면 당류 3g 이하 구간부터 비교하는 방식이 실용적입니다.",
      ]}
      comparisonTitle="추천 기준 → 제품 예시 → 요약"
      comparisonCards={[
        { title: "운동 후 보충용", body: "단백질 20g 전후, 당류 부담, 칼로리 대비 단백질 효율을 같이 보는 편이 좋습니다." },
        { title: "식사대용", body: "단백질만이 아니라 칼로리와 식이섬유까지 같이 봐야 한 끼 대체에 가까운 제품을 고를 수 있습니다." },
        { title: "저당 중심", body: "당류를 먼저 좁힌 뒤 단백질이 충분한지 다시 보는 순서가 비교 실수를 줄여줍니다." },
      ]}
      criteriaItems={[
        { title: "단백질 함량", body: "한 팩으로 얼마나 보충되는지를 보여주는 기본 지표입니다. 운동 후 기준으로는 20g 전후부터 먼저 비교하는 편이 좋습니다." },
        { title: "당류", body: "달게 느껴지는 제품일수록 당류가 높은 경우가 있습니다. 다이어트나 저당 기준이면 3g 이하부터 먼저 보는 편이 실용적입니다." },
        { title: "칼로리", body: "가벼운 보충용인지, 식사대용까지 노리는지에 따라 보는 방식이 달라집니다. 너무 낮으면 포만감이 아쉽고, 너무 높으면 간식형에 가까워질 수 있습니다." },
        { title: "식이섬유", body: "식사대용 적합성과 포만감을 판단할 때 중요합니다. 식사대용으로 보려면 4g 이상 여부를 같이 보는 편이 좋습니다." },
      ]}
      products={[
        { name: "단백하니 단백질쉐이크 시그니처", protein: "22g", feature: "고단백 중심으로 설계된 편이라 운동 후 보충용 비교에 잘 들어옵니다.", recommendedFor: "운동 후 단백질 보충 효율을 우선하는 사람" },
        { name: "랩노쉬 슬림쉐이크 더블초코", protein: "20g", feature: "당류가 낮고 식이섬유가 같이 들어 있어 식사대용과 저당 기준을 함께 보기 좋습니다.", recommendedFor: "저당 기준과 식사대용 기준을 같이 보는 사람" },
        { name: "플라이밀 프로틴쉐이크 초코", protein: "22g", feature: "단백질과 식이섬유 균형이 나쁘지 않아 범용적으로 비교하기 좋습니다.", recommendedFor: "한 팩으로 무난하게 단백질을 챙기고 싶은 사람" },
      ]}
      closing="단백질 쉐이크 추천은 무조건 단백질이 높은 제품을 고르는 문제가 아니라, 내 목적에 맞게 성분 균형을 보는 문제에 가깝습니다. 운동 후라면 단백질과 밀도, 식사대용이라면 칼로리와 식이섬유, 다이어트라면 당류까지 같이 보는 방식이 가장 실용적입니다."
      internalLinks={[
        { label: "단백질 쉐이크 추천이 궁금하다면 → 단백질 쉐이크 추천 가이드", href: "/guides/product-selection-comparison/protein-shake-guide" },
        { label: "식사대용 기준이 궁금하다면 → 식사대용 단백질 쉐이크", href: "/guides/product-selection-comparison/meal-replacement-protein-shake-guide" },
        { label: "음료와 차이가 궁금하다면 → 단백질 음료 vs 단백질 쉐이크", href: "/guides/product-selection-comparison/protein-drink-vs-protein-shake" },
      ]}
      ctaBody="ProteinLab 쉐이크 카테고리에서 파우치형 중심의 간편 섭취 단백질 쉐이크를 한 번에 비교해보세요. 추천, 큐레이션, 등급 정보까지 연결해서 볼 수 있습니다."
    />
  );
}

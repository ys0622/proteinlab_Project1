import { ShakeGuidePage, buildShakeGuideMetadata } from "../shakeGuideShared";

export const metadata = buildShakeGuideMetadata(
  "저당 단백질 쉐이크 추천 | 당류 3g 이하 제품 비교",
  "저당 단백질 쉐이크는 당류 3g 이하부터 먼저 좁히는 게 실용적입니다. 프로티원, 플라이밀, 단백하니처럼 저당이면서 단백질 균형이 좋은 제품을 비교해보세요.",
);

export default function LowSugarProteinShakeGuidePage() {
  return (
    <ShakeGuidePage
      title="저당 단백질 쉐이크"
      description="저당 단백질 쉐이크를 찾는 이유는 보통 비슷합니다. 당류 부담은 줄이고 싶지만, 단백질은 충분히 챙기고 싶기 때문입니다. 문제는 당류만 낮고 전체 성분 균형이 아쉬운 제품도 있다는 점입니다. 그래서 프로티원, 플라이밀, 단백하니처럼 숫자 차이가 분명한 브랜드를 같이 보면 실제 선택이 훨씬 쉬워집니다."
      breadcrumbLabel="저당 단백질 쉐이크"
      keyword="저당 단백질 쉐이크"
      hook="달지 않은 단백질 쉐이크를 찾고 있다면"
      hookBody={[
        "저당 단백질 쉐이크는 당류만 보고 고르면 오히려 단백질이 부족하거나 식사대용성까지 놓치는 경우가 있습니다.",
        "그래서 저당 기준은 첫 필터일 뿐이고, 단백질 함량과 전체 균형을 같이 보는 방식이 실제 선택에 더 도움이 됩니다. 이 단계에서 프로티원, 플라이밀, 단백하니 브랜드 페이지로 다시 들어가면 훨씬 빨리 좁힐 수 있습니다.",
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
        { name: "잇더핏 단백질쉐이크 더블초코", protein: "21.3g", sugar: "0.6g", calories: "122kcal", feature: "당류 0.6g으로 저당 기준 최상위권입니다. 칼로리도 낮아 다이어트 목적에 적합합니다.", recommendedFor: "당류를 최대한 낮추고 싶은 사람" },
        { name: "프로티원 단백쉐이크 초코", protein: "23g", sugar: "1g", calories: "128kcal", feature: "당류 1g·칼로리 128kcal로 저당·저칼로리 균형이 좋습니다.", recommendedFor: "저당이면서 단백질 효율도 챙기고 싶은 사람" },
        { name: "플라이밀 프로틴쉐이크 피넛버터", protein: "24g", sugar: "1.2g", calories: "179kcal", feature: "당류가 낮고 단백질 24g으로 저당 고단백 기준을 동시에 만족합니다.", recommendedFor: "저당 기준과 고단백을 같이 보는 사람" },
      ]}
      closing="저당 단백질 쉐이크는 당류만 낮다고 좋은 제품이 되는 건 아닙니다. 단백질, 칼로리, 식이섬유까지 함께 봐야 실제로 만족도가 높은 제품을 고를 수 있습니다."
      internalLinks={[
        { label: "프로티원 저당 라인이 궁금하다면 → 프로티원 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/proteone-protein-shake" },
        { label: "플라이밀 피넛버터 기준이 궁금하다면 → 플라이밀 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/flymill-protein-shake" },
        { label: "단백하니 저당 라인업이 궁금하다면 → 단백하니 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/danbaekhani-protein-shake" },
        { label: "랩노쉬 슬림쉐이크가 궁금하다면 → 랩노쉬 슬림쉐이크 추천", href: "/guides/product-selection-comparison/labnoshe-slim-shake" },
        { label: "단백질 쉐이크 추천이 궁금하다면 → 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/protein-shake-guide" },
        { label: "식사대용 기준이 궁금하다면 → 식사대용 단백질 쉐이크", href: "/guides/product-selection-comparison/meal-replacement-protein-shake-guide" },
        { label: "음료와 비교가 궁금하다면 → 단백질 음료 vs 단백질 쉐이크", href: "/guides/product-selection-comparison/protein-drink-vs-protein-shake" },
      ]}
      ctaBody="ProteinLab 쉐이크 카테고리에서 저당 기준으로 제품을 바로 비교해보세요. 저당 큐레이션과 브랜드 페이지를 같이 보면 당류만 낮은 제품과 균형이 좋은 제품을 훨씬 쉽게 구분할 수 있습니다."
      faqItems={[
        { question: "저당 단백질 쉐이크 기준이 몇 g인가요?", answer: "ProteinLab에서는 당류 3g 이하를 저당 기준으로 분류합니다. 제품마다 저당 표기 기준이 다를 수 있으니 성분표에서 직접 확인하는 것이 정확합니다." },
        { question: "저당 쉐이크는 다이어트에 효과적인가요?", answer: "당류를 줄이는 것은 다이어트에 도움이 될 수 있지만, 전체 칼로리와 단백질 균형도 함께 봐야 합니다. 저당이어도 칼로리가 높으면 효과가 제한될 수 있습니다." },
        { question: "저당이라고 표시된 제품은 모두 믿어도 되나요?", answer: "저당 표기 기준이 제품마다 다를 수 있습니다. 반드시 영양성분표에서 당류 절대값(g)을 직접 확인하는 것이 중요합니다." },
        { question: "단백질이 높으면서 당류도 낮은 제품이 있나요?", answer: "있습니다. 잇더핏 더블초코(당류 0.6g·단백질 21.3g), 프로티원 초코(당류 1g·단백질 23g) 등이 고단백·저당 기준을 동시에 만족하는 제품입니다." },
      ]}
    />
  );
}

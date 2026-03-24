import type { CompareMetricRow, ComparePageConfig, RelatedGuideLink } from "./productCompareShared";
import { formatCalories100, formatDensity, getDrinkProduct } from "./productCompareShared";

const sellex = getDrinkProduct("sellex-profit-milk-vanilla-250");
const hymune = getDrinkProduct("hymune-balance-active-deepchoco-250");
const takefitMax = getDrinkProduct("takefit-max-choco-250");
const takefitMonster = getDrinkProduct("takefit-monster-goso-350");
const newcare41 = getDrinkProduct("newcare-all-protein-41g");
const dryou40 = getDrinkProduct("dryou-protein-40g-choco-350");
const newcare25 = getDrinkProduct("newcare-all-protein-choco-245");
const newcareWater = getDrinkProduct("newcare-olprotein-water-lemon-350");
const sellexLactoseFree = getDrinkProduct("sellex-protein-lactosefree-original-190");
const sellexAmericano = getDrinkProduct("sellex-profit-whey-protein-americano-330");
const rankingRows = [
  takefitMonster,
  getDrinkProduct("takefit-monster-chocobanana-350"),
  newcare41,
  getDrinkProduct("danbaek-drink-doublechoco-350"),
  getDrinkProduct("dryou-protein-40g-strawberry-350"),
  dryou40,
  getDrinkProduct("danbaek-drink-darkchoco-330"),
  newcare25,
  getDrinkProduct("newcare-all-protein-banana-245"),
  getDrinkProduct("newcare-all-protein-savory-245"),
  getDrinkProduct("7eleven-junghoo-choco-protein-330"),
  getDrinkProduct("7eleven-junghoo-vanilla-protein-330"),
  getDrinkProduct("takefit-max-goso-250"),
  takefitMax,
  getDrinkProduct("takefit-max-banana-250"),
  getDrinkProduct("takefit-max-pumpkin-250"),
  getDrinkProduct("dryou-protein-drink-choco-250"),
  getDrinkProduct("dryou-protein-drink-banana-250"),
  getDrinkProduct("solveandgo-protamin-savory-250"),
  getDrinkProduct("dryou-protein-drink-strawberry-250"),
];

function articleJsonLd(config: ComparePageConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.description,
    inLanguage: "ko-KR",
    mainEntityOfPage: `https://proteinlab.kr/guides/product-selection-comparison/${config.slug}`,
    author: { "@type": "Organization", name: "ProteinLab" },
    publisher: {
      "@type": "Organization",
      name: "ProteinLab",
      logo: { "@type": "ImageObject", url: "https://proteinlab.kr/proteinlab-logo.png" },
    },
    dateModified: "2026-03-24",
  };
}

function faqJsonLd(config: ComparePageConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (config.faq ?? []).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildComparisonRows(rows: CompareMetricRow[]) {
  return rows;
}

const commonRelated: RelatedGuideLink[] = [
  {
    title: "단백질 음료 선택 가이드",
    href: "/guides/product-selection-comparison/protein-drink-guide",
    description: "브랜드보다 먼저 어떤 숫자를 봐야 하는지 기준부터 확인합니다.",
  },
  {
    title: "영양성분 비교",
    href: "/guides/product-selection-comparison/nutrition-comparison",
    description: "단백질, 당류, 칼로리, 지방을 읽는 순서를 먼저 정리합니다.",
  },
];

export const selexVsHimuneConfig: ComparePageConfig = {
  slug: "selex-vs-himune",
  title: "셀렉스 vs 하이뮨 비교",
  description: "셀렉스와 하이뮨 대표 RTD 단백질 음료를 단백질, 당류, 칼로리, 지방, 나트륨 기준으로 직접 비교합니다.",
  keywords: ["셀렉스 하이뮨 비교", "셀렉스 vs 하이뮨", "하이뮨 셀렉스 차이", "단백질 음료 비교"],
  badge: "브랜드 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 대표 RTD 250mL 기준",
  intro: "둘 다 250mL에 단백질 20g급 RTD라서 수치상은 비슷해 보이지만, 나트륨·지방·브랜드 포지셔닝은 꽤 다릅니다. ProteinLab DB 기준 대표 제품을 바로 비교하면 선택이 훨씬 쉬워집니다.",
  summary: [
    "체중 관리와 저칼로리 쪽이면 하이뮨 딥초코가 약간 더 가볍습니다.",
    "나트륨과 음용 부담은 하이뮨이 더 낮고, 식이섬유와 브랜드 인지도는 셀렉스 프로핏 쪽이 강합니다.",
    "운동 후 무난한 보충은 셀렉스, 일상용 저부담 RTD는 하이뮨으로 정리하면 빠릅니다.",
  ],
  comparisonTitle: "핵심 수치 비교",
  comparisonColumns: ["셀렉스 프로핏", "하이뮨 액티브"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${sellex.proteinPerServing}g`, `${hymune.proteinPerServing}g`] },
    { label: "용량", values: [sellex.capacity ?? "-", hymune.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(sellex), formatDensity(hymune)] },
    { label: "당류", values: [`${sellex.sugar}g`, `${hymune.sugar}g`] },
    { label: "칼로리", values: [`${sellex.calories}kcal`, `${hymune.calories}kcal`] },
    { label: "지방", values: [`${sellex.fat ?? "-"}g`, `${hymune.fat ?? "-"}g`] },
    { label: "나트륨", values: [`${sellex.sodium ?? "-"}mg`, `${hymune.sodium ?? "-"}mg`] },
    { label: "제조사", values: [sellex.manufacturer ?? "-", hymune.manufacturer ?? "-"] },
    { label: "대표 RTD 라인 맛 수", values: ["7종", "9종"] },
  ]),
  sections: [
    {
      title: "제품 소개",
      items: [
        { title: "셀렉스", body: "매일유업 대표 단백질 RTD 라인입니다. 프로핏 계열은 고단백, 저당, 간편 보충 이미지가 강하고 운동 후 보충 검색과 잘 맞습니다." },
        { title: "하이뮨", body: "일동후디스 대표 라인입니다. 액티브 라인은 20g급 RTD로 정리되어 있고 일상 보충이나 식사 사이 간격 메우기 용도로 많이 비교됩니다." },
        { title: "해석 포인트", body: "대표 제품끼리 보면 단백질 총량은 같고, 하이뮨이 칼로리와 나트륨이 조금 더 낮습니다. 대신 셀렉스는 식이섬유와 브랜드 인지도가 강점입니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "운동 후 보충용", body: "셀렉스 프로핏이 무난합니다. 단백질 20g에 당류 0g이고, 운동 후 보충용으로 익숙한 제품군이라 선택이 쉽습니다." },
        { title: "일상용 저부담 RTD", body: "하이뮨 액티브가 조금 더 가볍습니다. 104kcal, 지방 0.7g, 나트륨 150mg 수준이라 매일 마실 때 부담이 덜합니다." },
        { title: "맛 선택 폭", body: "대표 RTD 라인 기준으로 하이뮨 액티브 쪽 맛 수가 더 많습니다. 맛 다양성을 우선하면 하이뮨이 유리합니다." },
      ],
    },
    {
      title: "이럴 때는 해석이 달라집니다",
      items: [
        { title: "바나나·딸기 계열을 고를 때", body: "같은 브랜드라도 맛에 따라 당류와 칼로리가 더 올라갈 수 있습니다. 대표 RTD 1종 비교 결과를 전체 라인업 전체에 그대로 적용하면 안 됩니다." },
        { title: "식사대용으로 마실 때", body: "두 제품 모두 기본적으로는 보충용 RTD에 가깝습니다. 포만감과 총열량이 먼저라면 식사보완형 라인을 따로 보는 편이 더 정확합니다." },
        { title: "박스 가격을 중시할 때", body: "실구매가는 프로모션과 묶음 수량에 따라 변동폭이 큽니다. 그래서 이 페이지는 영양 기준 중심으로 먼저 비교하고, 가격은 구매 링크에서 최종 확인하는 흐름이 맞습니다." },
      ],
    },
  ],
  faq: [
    { question: "셀렉스와 하이뮨 중 다이어트에는 어떤 쪽이 더 낫나", answer: "대표 RTD 기준으로는 하이뮨 액티브가 칼로리와 나트륨이 조금 더 낮아 더 가볍습니다. 다만 차이는 크지 않아 맛 선호와 가격까지 같이 보는 편이 좋습니다." },
    { question: "운동 직후에는 셀렉스가 더 낫나", answer: "보충용 이미지와 사용 경험 기준으로는 셀렉스 프로핏이 더 직관적입니다. 하지만 대표 제품 수치만 보면 하이뮨도 단백질 20g, 당류 0g이라 큰 차이는 아닙니다." },
    { question: "하이뮨은 식사대용으로 봐도 되나", answer: "액티브 라인은 기본적으로 보충용 RTD에 더 가깝습니다. 식사대용을 원하면 포만감과 총열량이 더 높은 라인업을 따로 보는 편이 정확합니다." },
  ],
  relatedGuides: [
    commonRelated[0],
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "테이크핏까지 포함해 3개 브랜드를 한 번에 비교합니다." },
    commonRelated[1],
  ],
  purchaseLinks: [
    { label: "셀렉스 프로핏 박스 보기", slug: sellex.slug },
    { label: "하이뮨 액티브 박스 보기", slug: hymune.slug },
  ],
};
selexVsHimuneConfig.jsonLd = [articleJsonLd(selexVsHimuneConfig), faqJsonLd(selexVsHimuneConfig)];

export const highProtein40gConfig: ComparePageConfig = {
  slug: "high-protein-40g-comparison",
  title: "단백질 음료 40g 이상 3종 비교",
  description: "테이크핏 몬스터, 뉴케어 올프로틴 41g, 닥터유 프로 단백질 드링크 40g을 단백질, 당류, 칼로리, 밀도 기준으로 비교합니다.",
  keywords: ["단백질 음료 40g", "고단백 단백질 음료 비교", "테이크핏 몬스터", "뉴케어 올프로틴 41g", "닥터유 40g"],
  badge: "고단백 비교",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 350mL 40g급 RTD 기준",
  intro: "세 제품 모두 350mL 한 병에 40g 전후 단백질을 담은 고단백 RTD입니다. 스펙은 비슷해 보여도 칼로리, 지방, 당류와 브랜드 포지셔닝이 달라서 목적별 선택이 갈립니다.",
  summary: [
    "단백질 총량과 밀도 1위는 테이크핏 몬스터입니다.",
    "균형형 보충과 락토프리 접근성은 뉴케어 올프로틴 41g이 강합니다.",
    "맛 위주 진입과 초코 음용감은 닥터유 40g이 유리하지만 칼로리는 가장 높습니다.",
  ],
  comparisonTitle: "40g 이상 RTD 비교표",
  comparisonColumns: ["테이크핏 몬스터", "뉴케어 올프로틴 41g", "닥터유 40g"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${takefitMonster.proteinPerServing}g`, `${newcare41.proteinPerServing}g`, `${dryou40.proteinPerServing}g`] },
    { label: "용량", values: [takefitMonster.capacity ?? "-", newcare41.capacity ?? "-", dryou40.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(takefitMonster), formatDensity(newcare41), formatDensity(dryou40)] },
    { label: "당류", values: [`${takefitMonster.sugar}g`, `${newcare41.sugar}g`, `${dryou40.sugar}g`] },
    { label: "지방", values: [`${takefitMonster.fat ?? "-"}g`, `${newcare41.fat ?? "-"}g`, `${dryou40.fat ?? "-"}g`] },
    { label: "칼로리", values: [`${takefitMonster.calories}kcal`, `${newcare41.calories}kcal`, `${dryou40.calories}kcal`] },
    { label: "나트륨", values: [`${takefitMonster.sodium ?? "-"}mg`, `${newcare41.sodium ?? "-"}mg`, `${dryou40.sodium ?? "-"}mg`] },
    { label: "대표 맛 수", values: ["2종", "1종", "2종"] },
  ]),
  sections: [
    {
      title: "제품별 포지셔닝",
      items: [
        { title: "테이크핏 몬스터", body: "43g로 총량 1위입니다. 당류 1g, 지방 1g 수준이라 운동 직후에 단백질만 강하게 채우려는 사용자에게 가장 직관적입니다." },
        { title: "뉴케어 올프로틴 41g", body: "41g급이면서 락토프리 변형으로 관리되는 점이 강점입니다. 칼로리와 지방은 조금 더 높지만 균형영양식 브랜드 성격이 살아 있습니다." },
        { title: "닥터유 40g", body: "40g급 입문용으로 접근하기 좋지만 지방 6.5g, 258kcal라 다이어트용으로는 덜 유리합니다. 맛 만족도를 우선하면 검토할 가치가 있습니다." },
      ],
    },
    {
      title: "목적별 최종 추천",
      items: [
        { title: "운동 직후 단백질 집중 보충", body: "테이크핏 몬스터가 가장 깔끔합니다. 밀도 12.3g/100mL로 세 제품 중 최고이고 칼로리도 가장 안정적입니다." },
        { title: "단백질 + 락토프리 접근성", body: "뉴케어 올프로틴 41g이 더 적합합니다. 유당 민감도가 있거나 일반 밀크형 RTD가 부담스러우면 우선순위가 올라갑니다." },
        { title: "맛 위주 첫 진입", body: "닥터유 40g은 초코 음용감 장점이 있지만 칼로리와 지방을 함께 감수해야 합니다. 체중 관리 중이라면 1순위로 두기 어렵습니다." },
      ],
    },
    {
      title: "이런 사람에게는 안 맞습니다",
      items: [
        { title: "칼로리 제한이 빡빡한 다이어트 중", body: "40g급 제품은 대부분 칼로리도 같이 올라갑니다. 단백질 총량이 목적보다 과하면 오히려 과잉 보충이 될 수 있습니다." },
        { title: "하루 단백질 섭취가 이미 충분한 경우", body: "식사와 다른 보충으로 단백질을 이미 채우고 있다면 40g RTD는 필요 이상일 수 있습니다. 20g급이나 워터형으로 낮추는 편이 더 효율적입니다." },
        { title: "맛보다 깔끔한 음용감을 원하는 경우", body: "닥터유 40g처럼 진한 초코형은 만족도가 높지만 무겁게 느껴질 수 있습니다. 이런 경우 테이크핏 몬스터 쪽이 더 낫습니다." },
      ],
    },
  ],
  faq: [
    { question: "40g 제품 중 운동 직후 한 병만 고르면 무엇이 낫나", answer: "ProteinLab DB 기준으로는 테이크핏 몬스터가 가장 단순명확합니다. 단백질 총량 43g, 밀도 12.3g/100mL, 당류 1g이라 보충 목적에 가장 잘 맞습니다." },
    { question: "뉴케어 올프로틴 41g은 왜 추천되나", answer: "락토프리 변형으로 관리되고 균형형 보충 맥락이 있어 일반 밀크형 RTD가 부담스러운 사용자에게 선택지가 됩니다. 다만 칼로리와 지방은 테이크핏 몬스터보다 높습니다." },
    { question: "닥터유 40g은 다이어트용으로 괜찮나", answer: "1병 기준 258kcal, 지방 6.5g이라 다이어트용으로는 우선순위가 낮습니다. 맛과 포만감은 장점이지만 체중 관리 목적이라면 더 가벼운 제품이 낫습니다." },
  ],
  relatedGuides: [
    { title: "단백질 음료 100mL당 단백질 순위", href: "/guides/product-selection-comparison/protein-density-ranking", description: "40g 제품이 전체 RTD에서 어느 정도 밀도인지 확인합니다." },
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "브랜드 대표 20g급 제품과 비교해 차이를 읽습니다." },
    commonRelated[1],
  ],
  purchaseLinks: [
    { label: "테이크핏 몬스터 박스 보기", slug: takefitMonster.slug },
    { label: "뉴케어 올프로틴 41g 박스 보기", slug: newcare41.slug },
    { label: "닥터유 40g 박스 보기", slug: dryou40.slug },
  ],
};
highProtein40gConfig.jsonLd = [articleJsonLd(highProtein40gConfig), faqJsonLd(highProtein40gConfig)];

export const proteinDensityRankingConfig: ComparePageConfig = {
  slug: "protein-density-ranking",
  title: "단백질 음료 100mL당 단백질 함량 순위",
  description: "ProteinLab DB 기준으로 단백질 음료의 100mL당 단백질 함량을 계산해 상위 제품을 정리했습니다.",
  keywords: ["단백질 밀도", "단백질 음료 가성비", "단백질 음료 효율", "100mL당 단백질"],
  badge: "데이터 랭킹",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 단백질 ÷ 용량 × 100 계산",
  intro: "같은 한 병 기준으로는 190mL부터 350mL까지 용량 차이가 커서 직접 비교가 어렵습니다. 그래서 ProteinLab DB에서 단백질 ÷ 용량 × 100 방식으로 정규화해 상위 제품을 다시 계산했습니다.",
  summary: [
    "현재 RTD 상위권은 40g 이상 고단백 라인이 거의 장악하고 있습니다.",
    "테이크핏 몬스터는 12.3g/100mL로 전체 1위권입니다.",
    "밀도만 보면 선택이 쉬워 보이지만, 칼로리와 지방을 같이 봐야 실제 가성비 해석이 완성됩니다.",
  ],
  comparisonTitle: "상위 20개 밀도 순위",
  comparisonColumns: ["제품", "100mL당 단백질", "용량", "100mL당 칼로리"],
  comparisonRows: buildComparisonRows(
    rankingRows.map((product, index) => ({
      label: `${index + 1}위`,
      values: [`${product.brand} ${product.name}`, formatDensity(product), product.capacity ?? "-", formatCalories100(product)],
    })),
  ),
  sections: [
    {
      title: "순위 해석",
      items: [
        { title: "상위 5개 공통점", body: "350mL 전후 대용량 고단백 RTD가 상위권을 차지합니다. 총 단백질이 40g 안팎으로 높고, 운동 후 보충 목적에 맞춘 설계가 많습니다." },
        { title: "10위권 이후 특징", body: "25g급 뉴케어, 24g급 테이크핏 맥스, 닥터유 일반 드링크처럼 균형형 RTD가 들어옵니다. 이 구간부터는 밀도와 칼로리 균형이 더 중요해집니다." },
        { title: "주의할 점", body: "밀도 상위권이라도 칼로리 100mL당 수치가 높으면 다이어트 가성비는 다르게 읽어야 합니다. 같은 11g대 밀도라도 뉴케어 41g과 닥터유 40g의 체감은 다릅니다." },
      ],
    },
    {
      title: "이 순위를 어떻게 쓰면 좋은가",
      items: [
        { title: "비슷한 용도끼리 마지막 비교용", body: "단백질 밀도는 후보군을 어느 정도 좁힌 뒤 마지막 비교 지표로 쓰는 것이 좋습니다. 처음부터 밀도만 보면 맛, 가격, 용도를 놓치기 쉽습니다." },
        { title: "다이어트라면 칼로리도 같이 확인", body: "밀도 상위권에는 고열량 제품도 많습니다. 체중 관리가 목적이면 100mL당 칼로리와 지방을 함께 봐야 실제 효율을 읽을 수 있습니다." },
        { title: "용량 차이 보정용", body: "190mL, 250mL, 330mL, 350mL 제품을 한 병 단위로만 비교하면 왜곡이 큽니다. 이 순위는 그 왜곡을 줄이는 용도로 가장 유용합니다." },
      ],
    },
  ],
  faq: [
    { question: "100mL당 단백질 순위가 왜 중요한가", answer: "제품마다 용량이 크게 다르기 때문에 한 병 기준만 보면 왜곡이 생깁니다. 100mL 기준으로 맞춰야 같은 양에서 얼마나 효율적인지 공정하게 볼 수 있습니다." },
    { question: "순위 1위 제품이 항상 가장 좋은 제품인가", answer: "아닙니다. 밀도는 높아도 칼로리나 지방이 높을 수 있고, 맛이나 가격도 다릅니다. 이 순위는 효율 지표 하나일 뿐 최종 판단 전체를 대신하지는 않습니다." },
    { question: "다이어트면 어떤 식으로 봐야 하나", answer: "밀도와 함께 100mL당 칼로리, 지방, 당류를 같이 봐야 합니다. 같은 11g대 밀도라도 체중 관리 관점에서 체감은 크게 다를 수 있습니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "밀도 외에 브랜드별 저당·저칼로리 차이를 같이 확인합니다." },
    commonRelated[1],
    commonRelated[0],
  ],
  purchaseLinks: [
    { label: "테이크핏 몬스터 박스 보기", slug: takefitMonster.slug },
    { label: "뉴케어 올프로틴 41g 박스 보기", slug: newcare41.slug },
    { label: "닥터유 40g 박스 보기", slug: dryou40.slug },
  ],
};
proteinDensityRankingConfig.jsonLd = [articleJsonLd(proteinDensityRankingConfig), faqJsonLd(proteinDensityRankingConfig)];

export const selexVsTakefitVsHimuneConfig: ComparePageConfig = {
  slug: "selex-vs-takefit-vs-himune",
  title: "셀렉스 vs 테이크핏 vs 하이뮨 비교",
  description: "셀렉스 프로핏, 테이크핏 맥스, 하이뮨 액티브를 단백질, 칼로리, 당류, 지방, 나트륨 기준으로 직접 비교합니다.",
  keywords: ["셀렉스 테이크핏 하이뮨 비교", "단백질 음료 3종 비교", "셀렉스 vs 테이크핏 vs 하이뮨"],
  badge: "3자 비교",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 대표 20g급 RTD 기준",
  intro: "국내 RTD에서 가장 많이 겹쳐 비교되는 세 브랜드를 대표 20g급 라인으로 맞췄습니다. 단백질 총량은 비슷하지만 밀도, 나트륨, 맛 폭에서 차이가 분명합니다.",
  summary: [
    "다이어트와 무난한 입문은 셀렉스 또는 하이뮨이 편합니다.",
    "단백질 총량과 밀도만 보면 테이크핏 맥스가 가장 공격적입니다.",
    "나트륨과 일상용 부담까지 보면 하이뮨 액티브가 가장 가볍습니다.",
  ],
  comparisonTitle: "대표 3종 비교표",
  comparisonColumns: ["셀렉스 프로핏", "테이크핏 맥스", "하이뮨 액티브"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${sellex.proteinPerServing}g`, `${takefitMax.proteinPerServing}g`, `${hymune.proteinPerServing}g`] },
    { label: "칼로리", values: [`${sellex.calories}kcal`, `${takefitMax.calories}kcal`, `${hymune.calories}kcal`] },
    { label: "당류", values: [`${sellex.sugar}g`, `${takefitMax.sugar}g`, `${hymune.sugar}g`] },
    { label: "지방", values: [`${sellex.fat ?? "-"}g`, `${takefitMax.fat ?? "-"}g`, `${hymune.fat ?? "-"}g`] },
    { label: "나트륨", values: [`${sellex.sodium ?? "-"}mg`, `${takefitMax.sodium ?? "-"}mg`, `${hymune.sodium ?? "-"}mg`] },
    { label: "100mL당 단백질", values: [formatDensity(sellex), formatDensity(takefitMax), formatDensity(hymune)] },
    { label: "대표 맛 수", values: ["7종", "4종", "9종"] },
    { label: "제조사", values: [sellex.manufacturer ?? "-", takefitMax.manufacturer ?? "-", hymune.manufacturer ?? "-"] },
  ]),
  sections: [
    {
      title: "항목별 1위",
      items: [
        { title: "단백질 총량 · 밀도", body: "테이크핏 맥스가 24g, 9.6g/100mL로 가장 높습니다. 퍼포먼스 기준으로는 가장 직선적인 선택입니다." },
        { title: "칼로리 · 당류", body: "하이뮨 액티브가 104kcal, 당류 0g으로 가장 가볍고 셀렉스도 105kcal, 당류 0g으로 거의 비슷합니다." },
        { title: "맛 다양성", body: "대표 RTD 라인 기준으로 하이뮨 액티브가 가장 많고, 셀렉스 프로핏도 웨이프로핏 계열을 포함하면 선택 폭이 넓습니다." },
      ],
    },
    {
      title: "유형별 최종 추천",
      items: [
        { title: "다이어트 중", body: "하이뮨 액티브와 셀렉스 프로핏이 더 안정적입니다. 둘 중에서는 나트륨까지 낮은 하이뮨이 더 가볍습니다." },
        { title: "운동 후 보충", body: "테이크핏 맥스가 가장 강합니다. 250mL 안에 24g을 넣어 밀도가 높고, 같은 양 대비 체감이 확실합니다." },
        { title: "첫 입문", body: "셀렉스 프로핏이 무난합니다. 맛과 브랜드 인지도가 안정적이고, 수치도 과하게 튀지 않아 실패 확률이 낮습니다." },
      ],
    },
    {
      title: "고를 때 마지막 체크포인트",
      items: [
        { title: "밀도 우선이면 테이크핏", body: "단백질 총량과 밀도는 테이크핏 맥스가 가장 명확합니다. 운동 보충 목적이 뚜렷하면 가장 후회가 적습니다." },
        { title: "저부담 일상용이면 하이뮨", body: "칼로리, 당류, 나트륨 밸런스가 가볍습니다. 하루 한 병 루틴으로 넣기에는 하이뮨이 가장 무난합니다." },
        { title: "브랜드 안정감이면 셀렉스", body: "운동 후 보충용 이미지, 유통 인지도, 맛 무난함까지 포함하면 셀렉스가 가장 범용적입니다." },
      ],
    },
  ],
  faq: [
    { question: "셋 중 하나만 처음 사본다면 무엇이 무난한가", answer: "가장 무난한 쪽은 셀렉스 프로핏입니다. 수치가 과하게 튀지 않고 브랜드 인지도와 맛 안정감이 있어 첫 입문 실패 확률이 낮습니다." },
    { question: "운동 후에는 테이크핏이 확실히 유리한가", answer: "ProteinLab DB 기준으로는 그렇습니다. 250mL에 24g이라 밀도가 가장 높고, 같은 양 대비 단백질 체감이 분명합니다." },
    { question: "하이뮨은 왜 추천되나", answer: "대표 20g급 RTD 기준으로 칼로리, 당류, 나트륨 밸런스가 가장 가볍기 때문입니다. 매일 마시는 일상형 RTD로 보기 좋습니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "셀렉스와 하이뮨만 좁혀서 더 자세히 봅니다." },
    { title: "단백질 음료 40g 이상 3종 비교", href: "/guides/product-selection-comparison/high-protein-40g-comparison", description: "20g급보다 더 높은 고단백 라인을 비교합니다." },
    commonRelated[0],
  ],
  purchaseLinks: [
    { label: "셀렉스 프로핏 박스 보기", slug: sellex.slug },
    { label: "테이크핏 맥스 박스 보기", slug: takefitMax.slug },
    { label: "하이뮨 액티브 박스 보기", slug: hymune.slug },
  ],
};
selexVsTakefitVsHimuneConfig.jsonLd = [articleJsonLd(selexVsTakefitVsHimuneConfig), faqJsonLd(selexVsTakefitVsHimuneConfig)];

export const lactoseFreeProteinDrinkConfig: ComparePageConfig = {
  slug: "lactose-free-protein-drink",
  title: "유당불내증인데 단백질 음료 먹을 수 있나",
  description: "유당불내증이 있어도 락토프리 또는 유당 부담이 낮은 단백질 음료를 고를 수 있습니다. ProteinLab DB 기준 후보 제품과 읽는 법을 정리했습니다.",
  keywords: ["유당불내증 단백질 음료", "락토프리 단백질 음료", "WPI 단백질 음료", "유당불내증 단백질 보충"],
  badge: "문제 해결",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 락토프리 표기·제품명 기준",
  intro: "유당불내증이 있다고 해서 단백질 음료를 전부 피할 필요는 없습니다. ProteinLab DB에서는 제품 variant에 락토프리 표기가 있거나, 웨이프로핏처럼 유당 부담을 낮춘 라인을 우선 후보로 읽는 방식이 실용적입니다.",
  summary: [
    "유당불내증이 있으면 제품명과 상세 표기에서 ‘락토프리’ 여부를 먼저 보는 편이 가장 안전합니다.",
    "뉴케어 올프로틴과 셀렉스 락토프리 라인은 바로 후보로 넣기 쉽습니다.",
    "웨이프로핏 계열은 이름상 유당 부담을 낮춘 라인으로 읽히지만, 민감도가 높다면 소량 테스트가 먼저입니다.",
  ],
  comparisonTitle: "락토프리·저부담 후보 제품",
  comparisonColumns: ["뉴케어 올프로틴", "뉴케어 올프로틴 워터", "셀렉스 락토프리", "셀렉스 웨이프로핏"],
  comparisonRows: buildComparisonRows([
    { label: "대표 제품", values: [newcare25.name, newcareWater.name, sellexLactoseFree.name, sellexAmericano.name] },
    { label: "용량", values: [newcare25.capacity ?? "-", newcareWater.capacity ?? "-", sellexLactoseFree.capacity ?? "-", sellexAmericano.capacity ?? "-"] },
    { label: "단백질", values: [`${newcare25.proteinPerServing}g`, `${newcareWater.proteinPerServing}g`, `${sellexLactoseFree.proteinPerServing}g`, `${sellexAmericano.proteinPerServing}g`] },
    { label: "당류", values: [`${newcare25.sugar}g`, `${newcareWater.sugar}g`, `${sellexLactoseFree.sugar}g`, `${sellexAmericano.sugar}g`] },
    { label: "칼로리", values: [`${newcare25.calories}kcal`, `${newcareWater.calories}kcal`, `${sellexLactoseFree.calories}kcal`, `${sellexAmericano.calories}kcal`] },
    { label: "판단 기준", values: ["락토프리 표기", "락토프리 표기", "락토프리 표기", "웨이프로핏 라인"] },
  ]),
  sections: [
    {
      title: "어떻게 읽으면 되나",
      items: [
        { title: "1순위는 락토프리 표기", body: "ProteinLab DB 기준으로 variant가 락토프리인 제품을 먼저 좁히면 실수가 적습니다. 뉴케어 올프로틴, 올프로틴 워터, 셀렉스 프로틴 락토프리가 대표적입니다." },
        { title: "웨이프로핏 계열은 보조 후보", body: "셀렉스 웨이프로핏, 웨이프로틴 라인은 이름상 유당 부담을 낮춘 보충형으로 읽히지만, DB의 proteinSource는 혼합으로 표기되어 있어 절대적 보장은 아닙니다." },
        { title: "극민감자면 소량 테스트", body: "같은 락토프리 제품이라도 개인 반응은 다를 수 있습니다. 의학적 진단이 필요한 상황이라면 제품 선택보다 전문 상담이 우선입니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "무난한 밀크형", body: "뉴케어 올프로틴 25g 라인이 좋습니다. 락토프리 표기가 분명하고 단백질도 25g으로 충분합니다." },
        { title: "가벼운 워터형", body: "뉴케어 올프로틴 워터가 가장 편합니다. 350mL에 80kcal라 음용감이 가볍고 당류 0g입니다." },
        { title: "브랜드 입문용", body: "셀렉스 쪽에서는 프로틴 락토프리와 웨이프로핏 계열을 같이 보면 됩니다. 다만 민감도가 높다면 락토프리 표기 제품부터 시작하는 편이 안전합니다." },
      ],
    },
    {
      title: "주의사항",
      items: [
        { title: "유당불내증과 우유 알레르기는 다릅니다", body: "이 페이지는 유당 부담 기준입니다. 우유 단백질 알레르기가 있다면 락토프리 여부와 별개로 유제품 자체를 피해야 할 수 있습니다." },
        { title: "웨이프로핏은 보조 해석입니다", body: "이름상 유당 부담이 낮은 라인으로 읽히지만, DB에서 원료가 WPI로 명시된 것은 아닙니다. 그래서 락토프리 표기 제품보다 우선 추천하지는 않습니다." },
        { title: "의학적 판단은 아닙니다", body: "증상이 심하거나 진단을 받은 경우에는 일반적인 가이드보다 개인 상태가 우선입니다. 제품 테스트도 소량부터 진행하는 편이 안전합니다." },
      ],
    },
  ],
  faq: [
    { question: "유당불내증이면 단백질 음료를 아예 못 마시나", answer: "그렇지는 않습니다. 락토프리 표기 제품이나 유당 부담이 낮은 라인을 먼저 고르면 충분히 선택지가 있습니다." },
    { question: "WPI 제품만 골라야 하나", answer: "가장 안전한 건 락토프리 표기 확인입니다. WPI 기반 제품은 유당 부담이 낮을 수 있지만, 현재 DB에서는 모든 제품이 WPI로 명확히 구분되어 있지는 않습니다." },
    { question: "가장 무난한 첫 제품은 무엇인가", answer: "ProteinLab DB 기준으로는 뉴케어 올프로틴 25g이나 올프로틴 워터가 가장 무난합니다. 락토프리 표기가 분명하고 수치도 안정적입니다." },
  ],
  relatedGuides: [
    commonRelated[1],
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "유당 부담 외에 브랜드별 일반 RTD 차이도 같이 확인합니다." },
    { title: "BCAA란 무엇인가", href: "/guides/product-selection-comparison/bcaa-guide", description: "원료와 아미노산 표기를 어떻게 해석할지 함께 읽어두면 좋습니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 올프로틴 박스 보기", slug: newcare25.slug },
    { label: "뉴케어 올프로틴 워터 박스 보기", slug: newcareWater.slug },
    { label: "셀렉스 락토프리 박스 보기", slug: sellexLactoseFree.slug },
  ],
};
lactoseFreeProteinDrinkConfig.jsonLd = [articleJsonLd(lactoseFreeProteinDrinkConfig), faqJsonLd(lactoseFreeProteinDrinkConfig)];

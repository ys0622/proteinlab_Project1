import type { CompareMetricRow, ComparePageConfig, RelatedGuideLink } from "./productCompareShared";
import { formatCalories100, formatDensity, getDrinkProduct } from "./productCompareShared";

const sellex = getDrinkProduct("sellex-profit-milk-vanilla-250");
const hymune = getDrinkProduct("hymune-balance-active-deepchoco-250");
const takefitMax = getDrinkProduct("takefit-max-choco-250");
const takefitMonster = getDrinkProduct("takefit-monster-goso-350");
const newcare41 = getDrinkProduct("newcare-all-protein-41g");
const dryou40 = getDrinkProduct("dryou-protein-40g-choco-350");
const newcare25 = getDrinkProduct("newcare-all-protein-choco-245");
const newcarePlant = getDrinkProduct("newcare-all-protein-plant-savory-250");
const newcareWater = getDrinkProduct("newcare-olprotein-water-lemon-350");
const sellexLactoseFree = getDrinkProduct("sellex-protein-lactosefree-original-190");
const sellexAmericano = getDrinkProduct("sellex-profit-whey-protein-americano-330");
const hymuneBalance = getDrinkProduct("hymune-protein-balance-190");
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
  title: "셀렉스 vs 하이뮨 | 뭐가 더 나을까? 단백질 음료 비교 2026",
  description: "셀렉스와 하이뮨 대표 RTD 단백질 음료를 단백질, 당류, 칼로리, 나트륨 기준으로 직접 비교했습니다. 운동 후, 다이어트, 일상용 중 어디에 더 맞는지 빠르게 정리합니다.",
  keywords: ["셀렉스 하이뮨 비교", "셀렉스 vs 하이뮨", "하이뮨 셀렉스 차이", "단백질 음료 비교"],
  badge: "브랜드 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 대표 RTD 250mL 기준",
  intro: "셀렉스와 하이뮨은 둘 다 단백질 20g급 RTD라서 처음 보면 거의 비슷해 보입니다. 하지만 실제로는 운동 후 보충, 일상용 저부담, 맛 선택 폭에서 체감이 갈립니다. ProteinLab DB 기준 대표 제품만 바로 맞붙여 보면 어떤 사람이 어느 쪽을 고르면 되는지 훨씬 빨리 정리됩니다.",
  summary: [
    "운동 후 한 병 고르기 쉬운 쪽은 셀렉스 프로핏입니다.",
    "하루 한 병 루틴처럼 가볍게 마시기에는 하이뮨 액티브가 더 부담이 적습니다.",
    "결국 운동 보충이면 셀렉스, 일상용 저부담이면 하이뮨으로 정리하면 가장 빠릅니다.",
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
  title: "단백질 음료 40g 이상 추천 비교 | 테이크핏·뉴케어·닥터유 2026",
  description: "테이크핏 몬스터, 뉴케어 올프로틴 41g, 닥터유 40g을 단백질, 당류, 칼로리, 밀도 기준으로 직접 비교했습니다. 운동용, 락토프리, 맛 중심 중 무엇이 더 맞는지 바로 정리합니다.",
  keywords: ["단백질 음료 40g", "고단백 단백질 음료 비교", "테이크핏 몬스터", "뉴케어 올프로틴 41g", "닥터유 40g"],
  badge: "고단백 비교",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 350mL 40g급 RTD 기준",
  intro: "40g 이상 단백질 음료를 찾는 사람은 대체로 운동 후 보충 효율을 가장 먼저 봅니다. 하지만 실제로는 40g급끼리도 칼로리, 락토프리 여부, 맛 만족도가 꽤 다릅니다. 그래서 테이크핏, 뉴케어, 닥터유 대표 제품을 나란히 보면 어떤 한 병이 지금 목적에 맞는지 훨씬 빨리 판단할 수 있습니다.",
  summary: [
    "운동 직후 단백질 효율만 보면 테이크핏 몬스터가 가장 직선적입니다.",
    "락토프리와 균형형 보충까지 같이 보려면 뉴케어 올프로틴 41g이 더 안정적입니다.",
    "맛 위주 첫 진입은 닥터유 40g이 편하지만 칼로리와 지방은 가장 높습니다.",
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
  title: "단백질 음료 100mL당 단백질 순위 | 104개 전수 계산 2026",
  description: "ProteinLab DB 기준 104개 단백질 음료의 100mL당 단백질 함량을 직접 계산했습니다. 고단백 RTD 상위권과 실제 밀도 해석까지 한 번에 확인할 수 있습니다.",
  keywords: ["단백질 밀도", "단백질 음료 가성비", "단백질 음료 효율", "100mL당 단백질"],
  badge: "데이터 랭킹",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 단백질 ÷ 용량 × 100 계산",
  intro: "한 병 기준으로만 보면 190mL 제품과 350mL 제품이 뒤섞여서 실제 효율이 잘 안 보입니다. 그래서 ProteinLab DB 음료 104개를 단백질 ÷ 용량 × 100 방식으로 다시 계산했습니다. 이 순위는 같은 양 대비 단백질이 얼마나 들어 있는지 가장 빠르게 확인하려는 사람에게 특히 유용합니다.",
  summary: [
    "현재 상위권은 40g 이상 고단백 RTD가 거의 장악하고 있습니다.",
    "테이크핏 몬스터는 12.3g/100mL로 전체 최상위권이라 운동 보충용 기준이 분명합니다.",
    "다만 밀도 1위가 항상 최종 1위는 아니어서 칼로리와 지방까지 같이 봐야 실제 선택이 완성됩니다.",
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

export const proteinDrinkFor50sConfig: ComparePageConfig = {
  slug: "protein-drink-for-50s",
  title: "50대 단백질 음료 추천",
  description: "50대 이상이 건강 유지와 근감소증 예방 관점에서 단백질 음료를 고를 때 무엇을 봐야 하는지, 부담이 덜한 후보 제품을 ProteinLab DB 기준으로 정리했습니다.",
  keywords: ["50대 단백질 음료", "중장년 단백질 추천", "근감소증 단백질", "시니어 단백질 음료"],
  badge: "연령 맞춤",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 중장년 관점 후보 제품 기준",
  intro: "50대 이후에는 근육량이 서서히 줄기 시작하고, 식사량이나 소화 부담 때문에 단백질을 꾸준히 챙기기 더 어려워집니다. 그래서 단순히 고단백만 보기보다 소화 부담, 당류, 나트륨, 균형영양 성격을 함께 보는 편이 더 현실적입니다.",
  summary: [
    "50대는 초고단백보다 꾸준히 마실 수 있는 균형형 RTD가 더 중요합니다.",
    "소화 부담이 적고 당류·나트륨이 과하지 않은 제품부터 좁히는 편이 실용적입니다.",
    "한 번에 많이 마시기보다 하루 1~2회 나눠 보충하는 흐름이 더 무난합니다.",
  ],
  comparisonTitle: "50대 추천 제품 표",
  comparisonColumns: ["하이뮨 프로틴 밸런스", "뉴케어 올프로틴 41g", "셀렉스 프로핏"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${hymuneBalance.proteinPerServing}g`, `${newcare41.proteinPerServing}g`, `${sellex.proteinPerServing}g`] },
    { label: "용량", values: [hymuneBalance.capacity ?? "-", newcare41.capacity ?? "-", sellex.capacity ?? "-"] },
    { label: "칼로리", values: [`${hymuneBalance.calories}kcal`, `${newcare41.calories}kcal`, `${sellex.calories}kcal`] },
    { label: "당류", values: [`${hymuneBalance.sugar}g`, `${newcare41.sugar}g`, `${sellex.sugar}g`] },
    { label: "나트륨", values: [`${hymuneBalance.sodium ?? "-"}mg`, `${newcare41.sodium ?? "-"}mg`, `${sellex.sodium ?? "-"}mg`] },
    { label: "포인트", values: ["적은 용량, 중장년 친화 인지", "균형영양식·락토프리", "저칼로리·저지방"] },
  ]),
  sections: [
    {
      title: "왜 50대는 선택 기준이 달라지나",
      items: [
        { title: "근육량 감소 시작", body: "40대 후반부터는 근육량이 자연스럽게 줄기 시작해 단백질을 의식적으로 챙길 필요가 커집니다." },
        { title: "식사만으로 채우기 어려움", body: "한 끼 식사량이 줄거나 바쁜 생활 패턴이 겹치면 일반 식사만으로 충분한 단백질을 꾸준히 채우기 어렵습니다." },
        { title: "소화 부담 고려", body: "맛이나 총량보다 먼저 소화가 편한지, 매일 마셔도 부담이 덜한지가 더 중요해지는 구간입니다." },
      ],
    },
    {
      title: "50대 기준 선택 포인트",
      items: [
        { title: "소화 부담 낮은 제품 우선", body: "용량이 너무 크지 않거나 락토프리 성격이 있는 제품이 접근성이 좋습니다. 뉴케어 올프로틴처럼 균형형 제품이 대표적입니다." },
        { title: "고단백보다 균형 우선", body: "무조건 40g 이상을 고르기보다 일상적으로 마실 수 있는 10~25g대 제품이 더 현실적일 때가 많습니다." },
        { title: "당류·나트륨 확인", body: "혈압과 혈당을 같이 생각해야 하는 경우가 많기 때문에 당류 0~3g대, 나트륨 과다하지 않은 제품이 유리합니다." },
      ],
    },
    {
      title: "이런 제품은 피하는 편이 좋습니다",
      items: [
        { title: "당류가 높은 제품", body: "중장년층은 건강 유지 목적이 많기 때문에 당류가 10g 이상인 제품은 우선순위를 낮추는 편이 낫습니다." },
        { title: "나트륨이 너무 높은 제품", body: "단백질만 높고 나트륨이 높은 제품은 일상 루틴용으로는 부담이 될 수 있습니다." },
        { title: "40g 이상 초고단백", body: "운동 목적이 뚜렷하지 않다면 초고단백 RTD는 과한 선택일 수 있습니다. 한 번에 많은 양보다 소량 자주가 더 무난합니다." },
      ],
    },
    {
      title: "50대라면 이렇게 마시는 편이 좋습니다",
      items: [
        { title: "식사와 같이 보충", body: "공복에 한 번에 많은 양을 마시기보다 아침 식사와 함께 또는 점심 이후 간격 메우기용으로 넣는 편이 부담이 적습니다." },
        { title: "처음엔 작은 용량부터", body: "190mL~250mL급이 시작하기 좋습니다. 양이 너무 크면 꾸준히 마시기 어렵고 심리적 부담도 커집니다." },
        { title: "매일 마실 수 있는지 먼저 보기", body: "중장년층 콘텐츠에서는 영양 수치보다 지속 가능성이 더 중요할 때가 많습니다. 맛과 음용감, 소화 편의성까지 같이 봐야 합니다." },
      ],
    },
  ],
  faq: [
    { question: "50대는 어떤 단백질 음료부터 시작하는 게 좋나", answer: "처음에는 하이뮨 프로틴 밸런스처럼 용량이 작고 익숙한 제품이나, 뉴케어 올프로틴처럼 균형형으로 설계된 제품부터 시작하는 편이 부담이 적습니다." },
    { question: "50대에게 40g 제품도 괜찮나", answer: "운동 목적이 뚜렷하지 않다면 40g급 초고단백은 우선순위가 낮습니다. 건강 유지 목적이라면 10~25g대 제품을 나눠 섭취하는 편이 더 현실적입니다." },
    { question: "식사 대신 마셔도 되나", answer: "단백질 음료는 기본적으로 보충용으로 보는 편이 안전합니다. 식사를 완전히 대체하기보다 식사와 함께 또는 식후 보충으로 쓰는 흐름이 더 무난합니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "중장년층이 자주 비교하는 두 브랜드를 직접 비교합니다." },
    { title: "단백질 음료 40g 이상 3종 비교", href: "/guides/product-selection-comparison/high-protein-40g-comparison", description: "초고단백 제품이 왜 중장년층에게는 과할 수 있는지 같이 확인합니다." },
    commonRelated[1],
  ],
  purchaseLinks: [
    { label: "하이뮨 프로틴 밸런스 보기", slug: hymuneBalance.slug },
    { label: "뉴케어 올프로틴 41g 보기", slug: newcare41.slug },
    { label: "셀렉스 프로핏 보기", slug: sellex.slug },
  ],
};
proteinDrinkFor50sConfig.jsonLd = [articleJsonLd(proteinDrinkFor50sConfig), faqJsonLd(proteinDrinkFor50sConfig)];

export const proteinDrinkBoxValueConfig: ComparePageConfig = {
  slug: "protein-drink-box-value",
  title: "단백질 음료 박스로 사면 얼마",
  description: "단백질 음료를 박스로 사면 개당 얼마가 되는지, 최근 쿠팡 노출가 기준으로 대표 브랜드 박스 가성비와 단백질 1g당 가격을 정리했습니다.",
  keywords: ["단백질 음료 박스", "단백질 음료 30팩", "단백질 음료 가성비", "단백질 음료 대용량"],
  badge: "가격 비교",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "최근 쿠팡 노출가 기준, 실제 판매 수량 기준",
  intro: "시중 단백질 음료는 30팩보다 18개·24개·36개 구성이 더 흔합니다. 그래서 이 페이지는 이름은 박스 가성비로 두되, 실제 판매되는 대표 박스 수량 기준으로 개당 단가와 단백질 1g당 가격을 계산했습니다.",
  summary: [
    "최근 쿠팡 노출가 기준으로 박스 구매는 단품 대비 개당 단가가 확실히 낮아집니다.",
    "테이크핏 맥스와 하이뮨 액티브는 24개 박스 기준 개당 1천원대 초중반으로 내려옵니다.",
    "단백질 1g당 가격까지 보면 박스 가성비 우열이 더 분명해집니다.",
  ],
  comparisonTitle: "대표 박스 가격 비교",
  comparisonColumns: ["셀렉스 프로핏", "하이뮨 액티브", "테이크핏 맥스", "더단백 드링크", "뉴케어 올프로틴"],
  comparisonRows: buildComparisonRows([
    { label: "최근 확인 박스가", values: ["24개 55,500원", "24개 32,690원", "24개 32,500원", "18개 22,750원", "24개 36,950원"] },
    { label: "대표 단품가", values: ["1개 2,075원", "1개 4,550원", "1개 5,400원", "1개 4,590원", "1개 1,540원 추정"] },
    { label: "개당 단가", values: ["2,313원", "1,362원", "1,354원", "1,264원", "1,540원"] },
    { label: "단백질(1병)", values: ["20g", "20g", "24g", "24g", "25g"] },
    { label: "단백질 1g당", values: ["116원/g", "68원/g", "56원/g", "53원/g", "62원/g"] },
    { label: "비고", values: ["24개 기준", "24개 기준", "24개 기준", "18개 기준", "24개 기준"] },
  ]),
  sections: [
    {
      title: "가성비 해석",
      items: [
        { title: "개당 단가만 보면", body: "더단백 드링크 18개 박스와 테이크핏 맥스 24개 박스가 최근 확인가 기준으로 가장 공격적입니다." },
        { title: "단백질 1g당 가격까지 보면", body: "테이크핏 맥스와 더단백이 강합니다. 같은 박스 가격이라도 1병 단백질 총량이 높을수록 실제 가성비가 좋아집니다." },
        { title: "브랜드 체감가 차이", body: "뉴케어와 셀렉스는 개당 단가가 다소 높아도 락토프리, 맛, 브랜드 선호까지 고려하면 여전히 선택 이유가 있습니다." },
      ],
    },
    {
      title: "박스 구매 전 체크리스트",
      items: [
        { title: "유통기한 확인", body: "대량 구매는 보통 소비기한 여유가 있지만, 실제 표기 기간은 판매처마다 다를 수 있어 구매 전 확인이 필요합니다." },
        { title: "보관 공간 확인", body: "24개 박스부터는 생각보다 부피가 큽니다. 냉장 보관 여부나 실온 적재 공간을 먼저 봐야 합니다." },
        { title: "단품으로 맛 검증", body: "입문자라면 박스보다 단품 또는 소량 세트로 맛을 먼저 확인한 뒤 넘어가는 편이 실패 확률이 낮습니다." },
      ],
    },
    {
      title: "브랜드별로 보면 이렇게 다릅니다",
      items: [
        { title: "저당형 가성비", body: "테이크핏 맥스와 더단백은 최근 확인가 기준으로 단백질 1g당 가격이 강합니다. 가성비를 가장 먼저 보는 사용자에게 유리합니다." },
        { title: "브랜드 선호형 구매", body: "셀렉스와 뉴케어는 개당 단가가 더 높아도 브랜드 신뢰, 락토프리 성격, 맛 선호 때문에 여전히 선택 여지가 있습니다." },
        { title: "하이뮨처럼 프로모션 차이 큰 제품", body: "하이뮨은 프로모션 시점에 체감가가 크게 달라질 수 있습니다. 박스 비교에서는 평상시 가격보다 행사 반영가를 함께 보는 편이 맞습니다." },
      ],
    },
  ],
  faq: [
    { question: "정말 박스로 사면 더 저렴한가", answer: "최근 확인한 쿠팡 노출가 기준으로는 대부분 그렇습니다. 다만 브랜드마다 18개, 24개, 36개처럼 구성 수량이 달라 단순 비교보다 개당 단가와 단백질 1g당 가격을 같이 봐야 합니다." },
    { question: "30팩 기준으로 비교할 수는 없나", answer: "실제 판매 구성이 30팩보다 24개 중심이라 30팩으로 억지 환산하면 왜곡이 생깁니다. 그래서 이 페이지는 실제 판매 수량 기준으로 비교합니다." },
    { question: "가격은 얼마나 자주 바뀌나", answer: "프로모션, 와우 할인, 판매처 변경에 따라 수시로 바뀝니다. 이 페이지는 최근 노출가 기준 참고용이고, 최종 구매 전에는 링크에서 다시 확인하는 것이 맞습니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "가격뿐 아니라 영양 기준 차이도 같이 비교합니다." },
    { title: "단백질 음료 100mL당 단백질 순위", href: "/guides/product-selection-comparison/protein-density-ranking", description: "가성비를 가격이 아닌 밀도 기준으로도 확인합니다." },
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "대표 브랜드 비교와 박스 가성비를 함께 봅니다." },
  ],
  purchaseLinks: [
    { label: "셀렉스 프로핏 박스 보기", slug: sellex.slug },
    { label: "하이뮨 액티브 박스 보기", slug: hymune.slug },
    { label: "테이크핏 맥스 박스 보기", slug: takefitMax.slug },
  ],
};
proteinDrinkBoxValueConfig.jsonLd = [articleJsonLd(proteinDrinkBoxValueConfig), faqJsonLd(proteinDrinkBoxValueConfig)];

export const doctoruVsTakefitMonsterConfig: ComparePageConfig = {
  slug: "doctoru-40g-vs-takefit-monster-43g",
  title: "닥터유PRO 40g vs 테이크핏 몬스터 43g",
  description: "닥터유 40g과 테이크핏 몬스터 43g을 단백질, 당류, 칼로리, 지방, 맛 포지셔닝 기준으로 직접 비교합니다.",
  keywords: ["닥터유 40g 테이크핏 비교", "닥터유PRO vs 테이크핏 몬스터", "고단백 단백질 음료"],
  badge: "고단백 2자 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 350mL 고단백 RTD 기준",
  intro: "둘 다 350mL 한 병에 40g 전후 단백질을 담았지만, 실제 체감은 꽤 다릅니다. 단순히 3g 차이만 볼 게 아니라 맛, 칼로리, 지방, 포지셔닝까지 같이 봐야 선택이 쉬워집니다.",
  summary: [
    "단백질 총량과 밀도는 테이크핏 몬스터가 앞섭니다.",
    "초코우유 스타일의 맛 만족도는 닥터유 40g 쪽이 더 직관적입니다.",
    "운동 보충은 테이크핏, 맛 중심 진입은 닥터유로 정리하면 빠릅니다.",
  ],
  comparisonTitle: "핵심 비교표",
  comparisonColumns: ["닥터유 40g", "테이크핏 몬스터 43g"],
  comparisonRows: buildComparisonRows([
    { label: "브랜드", values: [dryou40.brand, takefitMonster.brand] },
    { label: "단백질", values: [`${dryou40.proteinPerServing}g`, `${takefitMonster.proteinPerServing}g`] },
    { label: "용량", values: [dryou40.capacity ?? "-", takefitMonster.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(dryou40), formatDensity(takefitMonster)] },
    { label: "당류", values: [`${dryou40.sugar}g`, `${takefitMonster.sugar}g`] },
    { label: "지방", values: [`${dryou40.fat ?? "-"}g`, `${takefitMonster.fat ?? "-"}g`] },
    { label: "칼로리", values: [`${dryou40.calories}kcal`, `${takefitMonster.calories}kcal`] },
    { label: "나트륨", values: [`${dryou40.sodium ?? "-"}mg`, `${takefitMonster.sodium ?? "-"}mg`] },
    { label: "맛 수", values: ["2종", "2종"] },
  ]),
  sections: [
    {
      title: "차이가 나는 핵심 2가지",
      items: [
        { title: "맛", body: "닥터유 40g은 초코우유 스타일 진한 맛 쪽에 가깝고, 테이크핏 몬스터는 상대적으로 담백한 쪽입니다." },
        { title: "영양 설계", body: "테이크핏 몬스터는 당류 1g, 지방 1g, 186kcal로 고단백 대비 깔끔합니다. 닥터유 40g은 맛 만족도 대신 지방과 칼로리가 더 높습니다." },
        { title: "선택 포지션", body: "맛과 만족감이면 닥터유, 운동 후 보충 효율이면 테이크핏 몬스터가 더 분명합니다." },
      ],
    },
    {
      title: "목적별 선택",
      items: [
        { title: "맛이 중요한 사람", body: "닥터유 40g이 낫습니다. 초코우유에 가까운 방향이라 40g급 입문 부담을 줄여줍니다." },
        { title: "단백질 함량 극대화", body: "테이크핏 몬스터가 더 낫습니다. 총량 43g, 밀도 12.3g/100mL라 같은 350mL 안에서 더 공격적입니다." },
        { title: "두 제품 사이에서 고민될 때", body: "운동 목적이 뚜렷하면 테이크핏, 맛 위주 진입이면 닥터유로 고르면 거의 정리됩니다." },
      ],
    },
    {
      title: "실제 선택에서 갈리는 포인트",
      items: [
        { title: "한 병을 끝까지 마시기 쉬운 쪽", body: "진한 초코형을 좋아하면 닥터유가 더 편할 수 있고, 깔끔한 보충형을 원하면 테이크핏 쪽이 부담이 덜합니다." },
        { title: "체중 관리 병행 여부", body: "같은 고단백이라도 닥터유 40g은 지방과 칼로리가 더 높아 감량기에는 우선순위가 내려갑니다." },
        { title: "다음 단계 비교로 넘어갈 때", body: "둘만으로 결론이 안 나면 뉴케어 41g까지 포함한 3종 비교로 올라가 보는 흐름이 가장 자연스럽습니다." },
      ],
    },
  ],
  faq: [
    { question: "3g 차이인데 왜 비교할 가치가 있나", answer: "실제 차이는 단백질 3g보다 칼로리, 지방, 맛 포지셔닝에서 더 크게 납니다. 그래서 체감은 수치 이상으로 갈립니다." },
    { question: "운동 직후에는 어느 쪽이 더 낫나", answer: "ProteinLab DB 기준으로는 테이크핏 몬스터가 더 낫습니다. 단백질 총량이 더 높고 당류와 지방이 더 낮아 보충 목적에 잘 맞습니다." },
    { question: "뉴케어 올프로틴 41g은 왜 여기서 빠졌나", answer: "뉴케어는 락토프리와 균형형 보충 맥락이 강해 닥터유·테이크핏과 결이 조금 다릅니다. 세 제품 전체 비교는 40g 이상 3종 페이지에서 보는 편이 더 정확합니다." },
  ],
  relatedGuides: [
    { title: "단백질 음료 40g 이상 3종 비교", href: "/guides/product-selection-comparison/high-protein-40g-comparison", description: "뉴케어까지 포함한 상위 비교입니다." },
    { title: "단백질 음료 100mL당 단백질 순위", href: "/guides/product-selection-comparison/protein-density-ranking", description: "두 제품이 전체 밀도 순위에서 어디쯤인지 확인합니다." },
    commonRelated[1],
  ],
  purchaseLinks: [
    { label: "닥터유 40g 박스 보기", slug: dryou40.slug },
    { label: "테이크핏 몬스터 박스 보기", slug: takefitMonster.slug },
  ],
};
doctoruVsTakefitMonsterConfig.jsonLd = [articleJsonLd(doctoruVsTakefitMonsterConfig), faqJsonLd(doctoruVsTakefitMonsterConfig)];

export const proteinDrinkForDiabetesConfig: ComparePageConfig = {
  slug: "protein-drink-for-diabetes",
  title: "당뇨 있을 때 단백질 음료 마셔도 될까",
  description: "당뇨가 있어도 단백질 음료를 마실 수 있는지, ProteinLab DB 기준으로 당류·칼로리·탄수화물 관점에서 선택 기준과 후보 제품을 정리했습니다.",
  keywords: ["당뇨 단백질 음료", "당뇨 단백질 보충", "혈당 단백질 음료"],
  badge: "문제 해결",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 저당·저칼로리 RTD 기준",
  intro: "당뇨가 있어도 단백질 음료를 무조건 피할 필요는 없습니다. 다만 단백질 g보다 먼저 당류, 전체 탄수화물, 칼로리를 봐야 하고, 같은 브랜드라도 맛에 따라 차이가 커서 대표 제품 기준으로 좁혀 보는 편이 안전합니다.",
  summary: [
    "당뇨가 있어도 단백질 음료를 마실 수 있습니다. 다만 당류·칼로리 확인이 먼저입니다.",
    "대표적으로는 셀렉스 프로핏, 테이크핏 맥스, 뉴케어 올프로틴 워터처럼 당류가 낮은 제품이 유리합니다.",
    "당류 5g 이상이거나 단맛이 강한 제품은 우선순위를 낮추는 편이 안전합니다.",
  ],
  comparisonTitle: "당뇨 고려 추천 제품",
  comparisonColumns: ["셀렉스 프로핏", "테이크핏 맥스", "뉴케어 올프로틴 워터", "테이크핏 몬스터"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${sellex.proteinPerServing}g`, `${takefitMax.proteinPerServing}g`, `${newcareWater.proteinPerServing}g`, `${takefitMonster.proteinPerServing}g`] },
    { label: "당류", values: [`${sellex.sugar}g`, `${takefitMax.sugar}g`, `${newcareWater.sugar}g`, `${takefitMonster.sugar}g`] },
    { label: "칼로리", values: [`${sellex.calories}kcal`, `${takefitMax.calories}kcal`, `${newcareWater.calories}kcal`, `${takefitMonster.calories}kcal`] },
    { label: "탄수화물", values: ["4g", "1g", "0g", "1.3g"] },
    { label: "해석", values: ["무난한 저당형", "고단백 저당형", "가장 가벼운 워터형", "고단백이지만 열량 높음"] },
  ]),
  sections: [
    {
      title: "당뇨 있을 때 봐야 할 것",
      items: [
        { title: "당류", body: "가능하면 0g 또는 3g 이하부터 보는 편이 안전합니다. 같은 단백질 20g이라도 당류 차이로 체감이 달라집니다." },
        { title: "칼로리", body: "일상 보충용이면 100~130kcal 전후가 무난합니다. 너무 높은 칼로리는 체중 관리까지 같이 어렵게 만들 수 있습니다." },
        { title: "전체 탄수화물", body: "당류 외에도 전체 탄수화물이 높으면 해석이 달라집니다. 그래서 당류, 탄수화물, 칼로리를 같이 보는 흐름이 좋습니다." },
      ],
    },
    {
      title: "피해야 할 제품 유형",
      items: [
        { title: "당류 5g 이상 제품", body: "하이뮨 일부 맛 제품이나 단맛 강조형 RTD는 당류가 확 올라갈 수 있습니다. 브랜드보다 맛 SKU를 먼저 확인해야 합니다." },
        { title: "과일맛·단맛 강조 제품", body: "과일향 제품이 모두 나쁜 것은 아니지만, 감미료 구성과 당류가 올라가는 경우가 있어 대표 수치보다 라벨 확인이 중요합니다." },
        { title: "고칼로리 초고단백 제품", body: "테이크핏 몬스터처럼 당류는 낮아도 칼로리가 높은 제품은 혈당 외 체중 관리 관점까지 같이 봐야 합니다." },
      ],
    },
    {
      title: "주의사항",
      items: [
        { title: "의료 조언은 아닙니다", body: "이 페이지는 제품 선택 참고용입니다. 치료나 식단 처방을 대신하지 않습니다." },
        { title: "약 복용 중이면 상담 우선", body: "혈당약이나 인슐린을 사용 중이면 개인 상태가 다르기 때문에 전문가 상담이 우선입니다." },
        { title: "개인 혈당 반응은 다릅니다", body: "같은 당류 0g 제품도 개인 반응은 다를 수 있습니다. 처음 마실 때는 소량 테스트가 더 안전합니다." },
      ],
    },
    {
      title: "실전 선택 팁",
      items: [
        { title: "대표 제품 먼저 기억하기", body: "셀렉스 프로핏, 테이크핏 맥스, 뉴케어 올프로틴 워터처럼 당류가 낮은 대표 SKU 몇 개를 먼저 기억해 두는 방식이 가장 실용적입니다." },
        { title: "맛 SKU를 항상 다시 확인", body: "같은 브랜드라도 딸기, 바나나, 쿠키앤크림처럼 맛에 따라 당류가 확 올라갈 수 있습니다. 브랜드보다 SKU 확인이 먼저입니다." },
        { title: "워터형도 대안이 됩니다", body: "밀크형이 부담스럽다면 워터형이 더 나을 수 있습니다. 뉴케어 올프로틴 워터는 이 관점에서 좋은 비교 기준이 됩니다." },
      ],
    },
  ],
  faq: [
    { question: "당뇨가 있어도 단백질 음료를 마셔도 되나", answer: "대체로 가능합니다. 다만 당류, 전체 탄수화물, 칼로리를 먼저 확인하고 개인 혈당 반응을 같이 봐야 합니다." },
    { question: "당류 0g이면 무조건 안전한가", answer: "그렇지는 않습니다. 당류가 낮아도 칼로리나 전체 탄수화물이 높을 수 있어 함께 봐야 합니다." },
    { question: "가장 가벼운 후보는 무엇인가", answer: "ProteinLab DB 기준으로는 뉴케어 올프로틴 워터가 가장 가볍고, 셀렉스 프로핏과 테이크핏 맥스도 저당형 후보로 보기 좋습니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "브랜드 대표 RTD의 당류·칼로리 차이를 같이 봅니다." },
    commonRelated[1],
    commonRelated[0],
  ],
  purchaseLinks: [
    { label: "셀렉스 프로핏 보기", slug: sellex.slug },
    { label: "테이크핏 맥스 보기", slug: takefitMax.slug },
    { label: "뉴케어 올프로틴 워터 보기", slug: newcareWater.slug },
  ],
};
proteinDrinkForDiabetesConfig.jsonLd = [articleJsonLd(proteinDrinkForDiabetesConfig), faqJsonLd(proteinDrinkForDiabetesConfig)];

export const proteinDrinkBeginnersGuideConfig: ComparePageConfig = {
  slug: "protein-drink-beginners-guide",
  title: "단백질 음료 입문 가이드 | 처음이면 뭐부터 마셔야 할까",
  description: "단백질 음료를 처음 마시는 사람을 위해 20g대 입문 제품, 당류 기준, 맛 선택 순서까지 쉽게 정리했습니다. 첫 제품 추천과 자주 하는 실수도 함께 확인할 수 있습니다.",
  keywords: ["단백질 음료 처음", "단백질 음료 입문", "단백질 음료 뭐 마셔야", "프로틴 음료 뉴비"],
  badge: "입문 가이드",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 입문자용 대표 RTD 기준",
  intro: "종류가 너무 많아서 뭘 골라야 할지 모르겠다면, 처음에는 복잡하게 생각할 필요 없습니다. 단백질 20g 전후, 당류 낮은 제품, 무난한 맛부터 보면 대부분의 실수를 줄일 수 있습니다.",
  summary: [
    "처음이라면 40g대보다 20g 전후 제품부터 시작하는 편이 안전합니다.",
    "당류 0~3g, 초코나 밀크 계열처럼 무난한 맛이 입문 실패를 줄여줍니다.",
    "박스 구매보다 단품 또는 소량 구성으로 먼저 맛을 확인하는 흐름이 좋습니다.",
  ],
  comparisonTitle: "목적별 첫 제품 추천",
  comparisonColumns: ["운동 후 보충", "식사 보완", "다이어트 병행", "처음인데 맛있게"],
  comparisonRows: buildComparisonRows([
    { label: "추천 제품", values: ["셀렉스 프로핏", "하이뮨 액티브", "테이크핏 맥스", "닥터유 프로 단백질 드링크"] },
    { label: "단백질", values: ["20g", "20g", "24g", "24g"] },
    { label: "당류", values: ["0g", "0g", "0.7g", "0.9g"] },
    { label: "칼로리", values: ["105kcal", "104kcal", "106kcal", "151kcal"] },
    { label: "이유", values: ["저칼로리·무난한 맛", "가벼운 일상용", "저당·고밀도", "초코우유 스타일"] },
  ]),
  sections: [
    {
      title: "처음이라면 이것만 보세요",
      items: [
        { title: "단백질 20g 전후부터", body: "처음부터 40g대 초고단백으로 가면 부담스러울 수 있습니다. 20g 전후 제품이 가장 무난한 출발점입니다." },
        { title: "당류 낮은 것 우선", body: "다이어트 목적이 아니어도 당류가 낮은 제품이 실패 확률이 적습니다. 처음에는 0~3g 안쪽으로 좁히는 편이 좋습니다." },
        { title: "맛은 초코나 밀크부터", body: "입문자는 초코, 밀크, 바닐라처럼 익숙한 맛이 가장 무난합니다. 과일맛이나 워터형은 두 번째 단계로 보는 편이 좋습니다." },
      ],
    },
    {
      title: "입문자가 자주 하는 실수",
      items: [
        { title: "처음부터 40g대 선택", body: "고단백이 좋아 보여도 처음에는 소화 부담이나 맛 피로가 생길 수 있습니다. 20g대에서 시작하는 편이 안정적입니다." },
        { title: "박스로 먼저 구매", body: "브랜드 평이 좋아도 본인 입맛과 다를 수 있습니다. 단품이나 소량 묶음으로 먼저 확인하는 편이 안전합니다." },
        { title: "단백질만 보고 당류를 안 봄", body: "특히 다이어트나 체중 관리 목적이면 단백질보다 당류를 먼저 봐야 할 때가 많습니다." },
      ],
    },
    {
      title: "다음 단계는 이렇게 가면 됩니다",
      items: [
        { title: "브랜드 비교가 궁금하면", body: "입문 제품을 하나 정한 뒤에는 셀렉스 vs 하이뮨, 셀렉스 vs 테이크핏 vs 하이뮨처럼 브랜드 비교로 넘어가면 됩니다." },
        { title: "고단백이 궁금해지면", body: "20g급에 익숙해진 뒤 40g 이상 3종 비교로 가는 순서가 가장 자연스럽습니다. 처음부터 초고단백으로 갈 필요는 없습니다." },
        { title: "맛이 가장 중요하면", body: "입문자 단계에서는 수치보다 끝까지 마실 수 있는 맛이 더 중요할 수 있습니다. 그래서 단품 테스트가 항상 우선입니다." },
      ],
    },
  ],
  faq: [
    { question: "운동 안 해도 단백질 음료를 마셔도 되나", answer: "네. 단백질 보충 자체가 목적이라면 운동 여부와 관계없이 마실 수 있습니다. 다만 전체 식사량과 칼로리를 같이 보아야 합니다." },
    { question: "하루 몇 개가 적당한가", answer: "보통은 1~2개 안쪽에서 식사 부족분을 메우는 용도로 보는 편이 무난합니다." },
    { question: "단백질 음료 마시면 살이 찌나", answer: "칼로리 총량이 과하면 체중이 늘 수 있습니다. 특히 식사 위에 추가로 마시는 경우라면 칼로리와 당류를 함께 봐야 합니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "브랜드 비교부터 해보고 싶다면 여기서 이어가면 됩니다." },
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "입문 이후 대표 3개 브랜드를 한 번에 비교합니다." },
    commonRelated[0],
  ],
  purchaseLinks: [
    { label: "셀렉스 프로핏 보기", slug: sellex.slug },
    { label: "하이뮨 액티브 보기", slug: hymune.slug },
    { label: "테이크핏 맥스 보기", slug: takefitMax.slug },
  ],
};
proteinDrinkBeginnersGuideConfig.jsonLd = [articleJsonLd(proteinDrinkBeginnersGuideConfig), faqJsonLd(proteinDrinkBeginnersGuideConfig)];

const sellexProfitSports = getDrinkProduct("sellex-profit-sports-choco-330");
const sellexPeach = getDrinkProduct("sellex-profit-peach-icedtea-330");
const sellexLowsugar = getDrinkProduct("sellex-protein-lowsugar-190");
const dryouChoco = getDrinkProduct("dryou-protein-drink-choco-250");
const dryouBanana = getDrinkProduct("dryou-protein-drink-banana-250");
const takefitMonsterChocobanana = getDrinkProduct("takefit-monster-chocobanana-350");

export const selexsLineupConfig: ComparePageConfig = {
  slug: "selexs-lineup",
  title: "셀렉스 제품 종류 전체 정리",
  description: "셀렉스 RTD 라인업을 프로핏, 웨이프로핏, 락토프리, 로우슈거 기준으로 정리하고 어떤 목적에서 고르면 되는지 한 번에 설명합니다.",
  keywords: ["셀렉스 종류", "셀렉스 라인업", "셀렉스 프로핏 차이", "셀렉스 코어프로틴", "셀렉스 제품 비교"],
  badge: "브랜드 라인업",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB RTD 기준",
  intro: "셀렉스는 이름이 비슷해서 헷갈리지만 실제로는 운동 보충형, 워터형, 락토프리형, 일반 영양보충형으로 역할이 꽤 다릅니다. ProteinLab DB에 잡힌 RTD 라인업만 기준으로 정리해도 어떤 제품이 본인 목적에 맞는지 빠르게 갈립니다.",
  summary: [
    "운동 후 저칼로리 보충은 프로핏 웨이프로틴과 프로핏이 가장 직관적입니다.",
    "가볍고 상큼하게 마시려면 웨이프로핏, 우유 부담을 줄이고 싶다면 락토프리 라인이 먼저입니다.",
    "셀렉스 일반 프로틴과 로우슈거는 보충용보다는 일상 영양보완 쪽에 더 가깝습니다.",
  ],
  comparisonTitle: "셀렉스 RTD 라인업 비교표",
  comparisonColumns: ["프로핏 웨이프로틴", "프로틴 웨이프로핏", "프로틴 락토프리", "프로틴 로우슈거"],
  comparisonRows: buildComparisonRows([
    { label: "대표 제품", values: [sellexProfitSports.name, sellexAmericano.name, sellexLactoseFree.name, sellexLowsugar.name] },
    { label: "형태", values: ["RTD 밀크형", "RTD 워터형", "RTD 밀크형", "RTD 밀크형"] },
    { label: "단백질", values: [`${sellexProfitSports.proteinPerServing}g`, `${sellexAmericano.proteinPerServing}g`, `${sellexLactoseFree.proteinPerServing}g`, `${sellexLowsugar.proteinPerServing}g`] },
    { label: "칼로리", values: [`${sellexProfitSports.calories}kcal`, `${sellexAmericano.calories}kcal`, `${sellexLactoseFree.calories}kcal`, `${sellexLowsugar.calories}kcal`] },
    { label: "당류", values: [`${sellexProfitSports.sugar}g`, `${sellexAmericano.sugar}g`, `${sellexLactoseFree.sugar}g`, `${sellexLowsugar.sugar}g`] },
    { label: "특징", values: ["WPI 20g·운동 보충형", "워터형·깔끔한 목넘김", "락토프리 표기", "일반 영양보완형"] },
    { label: "추천 목적", values: ["운동 후·다이어트", "가벼운 보충·커피 대체", "유당 부담 낮추기", "일상 보충"] },
  ]),
  sections: [
    {
      title: "라인별로 보면 이렇게 다릅니다",
      items: [
        { title: "프로핏 웨이프로틴", body: "330mL에 단백질 20g, 99kcal라 운동 후 보충용으로 가장 선명합니다. 셀렉스 안에서 가장 스포츠형 메시지가 강한 라인입니다." },
        { title: "프로틴 웨이프로핏", body: "아메리카노와 복숭아 아이스티처럼 워터형 감각이 강합니다. 90kcal 전후로 가볍고, 단백질 음료 특유의 밀크감을 싫어하는 사람에게 잘 맞습니다." },
        { title: "프로틴 락토프리·로우슈거", body: "이 라인은 운동 보충보다 일상 영양보완 관점이 더 강합니다. 단백질 총량은 낮지만 속 부담이나 일반식 보완 맥락에서는 여전히 의미가 있습니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "운동 후 고단백", body: "프로핏 웨이프로틴이 1순위입니다. 20g, 99kcal, 당류 0g이라 목적이 가장 분명합니다." },
        { title: "출근길·외출 중 간편하게", body: "웨이프로핏 아메리카노나 복숭아 아이스티가 편합니다. 단백질은 20g으로 유지하면서 음용감이 훨씬 가볍습니다." },
        { title: "유당 부담이 걱정될 때", body: "프로틴 락토프리부터 보는 편이 안전합니다. 셀렉스 안에서도 일반 프로핏보다 우선순위가 올라갑니다." },
      ],
    },
    {
      title: "고를 때 헷갈리는 포인트",
      items: [
        { title: "이름만 보고 전부 운동용으로 생각하기 쉽다", body: "셀렉스는 같은 브랜드 안에서도 스포츠형과 일반 영양보완형이 섞여 있습니다. 제품명보다 단백질 g와 칼로리를 같이 봐야 합니다." },
        { title: "워터형과 밀크형은 체감이 완전히 다르다", body: "웨이프로핏은 밀크형 RTD와 다르게 깔끔한 음용감이 강합니다. 맛 취향이 갈리면 영양 수치보다 이 차이가 더 크게 느껴집니다." },
        { title: "분말형·스틱형은 별도 카테고리로 보는 편이 맞다", body: "이 페이지는 ProteinLab DB에 잡힌 RTD 중심 정리입니다. 코어프로틴 같은 분말·스틱형은 음용 맥락이 달라 따로 비교하는 편이 정확합니다." },
      ],
    },
  ],
  faq: [
    { question: "셀렉스에서 가장 무난한 첫 제품은 무엇인가", answer: "운동 보충이면 프로핏 웨이프로틴, 가볍게 시작하려면 웨이프로핏 아메리카노가 가장 무난합니다. 둘 다 단백질 20g급이라 출발점으로 좋습니다." },
    { question: "셀렉스 프로핏과 웨이프로핏 차이는 무엇인가", answer: "프로핏은 밀크형 스포츠 보충 RTD에 가깝고, 웨이프로핏은 워터형 감각이 강합니다. 단백질 총량은 비슷해도 마시는 느낌과 사용 장면이 다릅니다." },
    { question: "유당불내증이면 셀렉스에서 무엇부터 봐야 하나", answer: "가장 먼저 볼 것은 프로틴 락토프리입니다. 웨이프로핏도 상대적으로 가볍게 느껴질 수 있지만, 락토프리 표기 제품보다 우선 추천하지는 않습니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "셀렉스를 다른 대표 브랜드와 직접 비교해봅니다." },
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "대표 브랜드 3개를 한 번에 비교합니다." },
    commonRelated[0],
  ],
  purchaseLinks: [
    { label: "셀렉스 프로핏 웨이프로틴 보기", slug: sellexProfitSports.slug },
    { label: "셀렉스 프로틴 웨이프로핏 보기", slug: sellexAmericano.slug },
    { label: "셀렉스 프로틴 락토프리 보기", slug: sellexLactoseFree.slug },
  ],
};
selexsLineupConfig.jsonLd = [articleJsonLd(selexsLineupConfig), faqJsonLd(selexsLineupConfig)];

export const proteinDrinkByFlavorConfig: ComparePageConfig = {
  slug: "protein-drink-by-flavor",
  title: "단백질 음료 맛별 추천",
  description: "초코, 복숭아, 바나나, 아메리카노, 고소한맛 기준으로 실제 마시기 쉬운 단백질 음료를 정리했습니다.",
  keywords: ["단백질 음료 초코맛 추천", "단백질 음료 맛있는 것", "프로틴 음료 맛 추천", "단백질 음료 복숭아맛"],
  badge: "맛 기준 추천",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 맛 SKU 기준",
  intro: "입문자는 단백질 g보다 맛 때문에 계속 마실 수 있는지가 더 중요할 때가 많습니다. 그래서 이 페이지는 영양 수치보다 실제로 고르기 쉬운 맛 카테고리 기준으로 제품을 정리했습니다.",
  summary: [
    "처음 마시는 사람에게 가장 무난한 맛은 여전히 초코 계열입니다.",
    "가볍고 상큼한 쪽은 복숭아와 아메리카노 같은 워터형이 확실히 유리합니다.",
    "단백질을 크게 챙기면서 맛도 포기하고 싶지 않다면 테이크핏 몬스터 초코바나나가 가장 직관적입니다.",
  ],
  comparisonTitle: "맛 카테고리별 추천표",
  comparisonColumns: ["초코", "복숭아", "바나나", "아메리카노", "고소한맛"],
  comparisonRows: buildComparisonRows([
    { label: "추천 제품", values: [dryou40.name, sellexPeach.name, takefitMonsterChocobanana.name, sellexAmericano.name, takefitMonster.name] },
    { label: "브랜드", values: [dryou40.brand, sellexPeach.brand, takefitMonsterChocobanana.brand, sellexAmericano.brand, takefitMonster.brand] },
    { label: "단백질", values: [`${dryou40.proteinPerServing}g`, `${sellexPeach.proteinPerServing}g`, `${takefitMonsterChocobanana.proteinPerServing}g`, `${sellexAmericano.proteinPerServing}g`, `${takefitMonster.proteinPerServing}g`] },
    { label: "특징", values: ["초코우유 스타일", "상큼·가벼움", "고단백+디저트형", "커피 대체 감각", "담백한 곡물 느낌"] },
    { label: "추천 상황", values: ["처음 시작", "산뜻하게 마시고 싶을 때", "맛과 고단백을 같이 챙길 때", "아침·출근길", "단맛이 싫을 때"] },
  ]),
  sections: [
    {
      title: "처음 마시는 사람에게 맞는 맛",
      items: [
        { title: "가장 무난한 건 초코", body: "초코 계열은 단백질 음료 특유의 맛을 가장 잘 감춰줍니다. 입문자라면 닥터유나 셀렉스 초코 계열부터 시작하는 편이 실패 확률이 낮습니다." },
        { title: "상큼하게 마시려면 복숭아·아메리카노", body: "셀렉스 웨이프로핏 복숭아와 아메리카노는 워터형이라 훨씬 가볍습니다. 밀크형 RTD가 무거웠던 사람에게 특히 잘 맞습니다." },
        { title: "고단백도 맛있게 가고 싶다면 바나나", body: "테이크핏 몬스터 초코바나나는 43g급인데도 디저트형 느낌이 있어 고단백 진입 장벽을 낮춰줍니다." },
      ],
    },
    {
      title: "맛 기준으로 고를 때 놓치기 쉬운 것",
      items: [
        { title: "맛이 좋다고 항상 가벼운 건 아니다", body: "닥터유 40g처럼 맛 만족도가 높은 제품은 칼로리와 지방도 함께 올라가는 경우가 많습니다. 체중 관리 중이면 꼭 같이 봐야 합니다." },
        { title: "워터형은 가볍지만 호불호가 있다", body: "복숭아와 아메리카노처럼 워터형은 산뜻하지만 밀크형 포만감은 적습니다. 식사 보완이 목적이면 기대와 다를 수 있습니다." },
        { title: "브랜드보다 SKU가 더 중요하다", body: "같은 브랜드라도 초코, 바나나, 고소한맛에 따라 당류와 칼로리가 달라집니다. 맛별 추천은 브랜드보다 SKU 기준으로 봐야 정확합니다." },
      ],
    },
    {
      title: "이런 사람에게 추천합니다",
      items: [
        { title: "처음인데 실패하고 싶지 않은 사람", body: "초코 계열이나 아메리카노처럼 익숙한 맛부터 가면 됩니다. 낯선 곡물향이나 식물성 풍미는 두 번째 단계로 미루는 편이 안전합니다." },
        { title: "운동용인데 맛도 중요할 때", body: "테이크핏 몬스터 초코바나나처럼 고단백 라인에서도 맛이 좋은 SKU가 있습니다. 무조건 저칼로리만 볼 필요는 없습니다." },
        { title: "맛없어서 포기 직전인 사람", body: "입맛 문제일 수 있습니다. 초코에서 안 맞았더라도 복숭아나 아메리카노처럼 카테고리를 바꾸면 계속 마실 수 있는 경우가 많습니다." },
      ],
    },
  ],
  faq: [
    { question: "입문자에게 가장 무난한 맛은 무엇인가", answer: "대체로 초코 계열이 가장 무난합니다. 단백질 음료 특유의 향을 잘 감춰줘서 첫 진입 장벽이 가장 낮습니다." },
    { question: "가장 가볍게 마시기 쉬운 맛은 무엇인가", answer: "셀렉스 웨이프로핏 복숭아와 아메리카노 같은 워터형이 가장 가볍습니다. 밀크형 특유의 묵직함이 적습니다." },
    { question: "고단백인데도 맛있는 제품이 있나", answer: "있습니다. 테이크핏 몬스터 초코바나나와 닥터유 40g 초코가 대표적입니다. 다만 칼로리와 지방은 함께 확인해야 합니다." },
  ],
  relatedGuides: [
    { title: "단백질 음료 입문 가이드", href: "/guides/product-selection-comparison/protein-drink-beginners-guide", description: "처음 마시는 사람이 무엇부터 봐야 하는지 쉬운 언어로 정리합니다." },
    { title: "단백질 음료 맛없다", href: "/guides/product-selection-comparison/protein-drink-taste-tips", description: "맛없다고 느껴질 때 바꿔볼 수 있는 방법을 정리합니다." },
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "브랜드별 대표 RTD 차이도 같이 확인합니다." },
  ],
  purchaseLinks: [
    { label: "닥터유 40g 초코 보기", slug: dryou40.slug },
    { label: "셀렉스 웨이프로핏 복숭아 보기", slug: sellexPeach.slug },
    { label: "테이크핏 몬스터 초코바나나 보기", slug: takefitMonsterChocobanana.slug },
  ],
};
proteinDrinkByFlavorConfig.jsonLd = [articleJsonLd(proteinDrinkByFlavorConfig), faqJsonLd(proteinDrinkByFlavorConfig)];

export const proteinDrinkTasteTipsConfig: ComparePageConfig = {
  slug: "protein-drink-taste-tips",
  title: "단백질 음료 맛없다",
  description: "단백질 음료가 맛없게 느껴지는 이유와 더 맛있게 마시는 방법, 입문자가 바꾸기 쉬운 제품 추천을 정리했습니다.",
  keywords: ["단백질 음료 맛없다", "프로틴 음료 맛없어", "단백질 음료 맛있게 먹는 법", "맛있는 단백질 음료 추천"],
  badge: "문제 해결",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 맛 경험 중심 정리",
  intro: "처음 마셨을 때 단백질 음료가 맛없게 느껴지는 건 드문 일이 아닙니다. 대부분은 제품이 완전히 잘못된 게 아니라, 맛 카테고리와 마시는 방식이 본인 취향과 안 맞는 경우가 많습니다.",
  summary: [
    "단백질 특유의 향, 감미료 뒷맛, 미지근한 음용감 때문에 맛없다고 느끼는 경우가 많습니다.",
    "가장 쉬운 해결책은 아주 차갑게 마시고, 안 맞으면 맛 카테고리 자체를 바꾸는 것입니다.",
    "초코가 안 맞으면 복숭아나 아메리카노 같은 워터형으로 넘어가는 쪽이 성공 확률이 높습니다.",
  ],
  comparisonTitle: "맛 개선용 추천 제품",
  comparisonColumns: ["무난한 초코", "가벼운 워터형", "고단백인데 맛 좋은 편", "부드러운 바나나"],
  comparisonRows: buildComparisonRows([
    { label: "추천 제품", values: [dryouChoco.name, sellexPeach.name, "테이크핏 몬스터 (초코바나나)", dryouBanana.name] },
    { label: "단백질", values: [`${dryouChoco.proteinPerServing}g`, `${sellexPeach.proteinPerServing}g`, "43g", `${dryouBanana.proteinPerServing}g`] },
    { label: "맛 포인트", values: ["초코우유형", "상큼함", "디저트형 고단백", "부드러운 바나나"] },
    { label: "추천 이유", values: ["입문 실패 확률 낮음", "밀크향이 부담스러울 때", "맛과 함량을 같이 잡기 쉬움", "초코보다 부드러운 쪽"] },
  ]),
  sections: [
    {
      title: "맛없게 느껴지는 이유 3가지",
      items: [
        { title: "단백질 특유의 향", body: "밀크형 RTD에서는 특유의 유청향이나 텁텁함이 느껴질 수 있습니다. 특히 처음 마시는 사람은 이 부분을 가장 크게 느낍니다." },
        { title: "감미료 뒷맛", body: "당류를 낮춘 제품일수록 감미료 특유의 끝맛이 도드라질 수 있습니다. 브랜드보다 개별 SKU 차이가 큽니다." },
        { title: "온도가 높을 때", body: "단백질 음료는 미지근하면 향과 뒷맛이 더 강해집니다. 같은 제품도 차갑게 마시면 인상이 꽤 달라집니다." },
      ],
    },
    {
      title: "더 맛있게 마시는 방법",
      items: [
        { title: "아주 차갑게 마시기", body: "가장 쉬운 해결책입니다. 냉장 보관 후 마시거나 얼음을 더하면 향과 뒷맛이 훨씬 줄어듭니다." },
        { title: "운동 직후나 공복감 있을 때 마시기", body: "맛 자체보다 보충 목적이 먼저일 때 거부감이 줄어드는 경우가 많습니다. 특히 고단백 RTD는 이 차이가 큽니다." },
        { title: "맛 카테고리 바꾸기", body: "초코가 안 맞는다고 단백질 음료 전체가 안 맞는 건 아닙니다. 복숭아, 아메리카노, 고소한맛처럼 카테고리를 바꾸면 해결되는 경우가 많습니다." },
      ],
    },
    {
      title: "계속 마시기 힘들다면",
      items: [
        { title: "제품 자체가 안 맞는 것일 수 있다", body: "한 브랜드 한 SKU만 마셔보고 포기하는 경우가 많습니다. 실제로는 브랜드보다 맛 SKU 차이가 더 큽니다." },
        { title: "워터형으로 이동하는 게 빠르다", body: "밀크형이 계속 부담스럽다면 워터형으로 넘어가는 게 가장 효과적입니다. 셀렉스 웨이프로핏과 뉴케어 워터형이 대표적입니다." },
        { title: "박스 구매는 잠시 미루는 편이 낫다", body: "맛 적응이 안 된 상태에서 박스 구매를 하면 실패 비용이 커집니다. 단품이나 소량 묶음으로 방향을 먼저 잡는 편이 안전합니다." },
      ],
    },
  ],
  faq: [
    { question: "처음 마셨는데 맛없다고 느끼는 게 정상인가", answer: "네. 단백질 특유의 향과 감미료 뒷맛 때문에 처음에는 어색하게 느끼는 경우가 많습니다." },
    { question: "가장 먼저 바꿔볼 수 있는 방법은 무엇인가", answer: "아주 차갑게 마시는 것이 가장 쉽고 효과적입니다. 그다음은 맛 카테고리를 바꾸는 순서가 좋습니다." },
    { question: "맛없는 제품을 계속 참고 마셔야 하나", answer: "그럴 필요는 없습니다. 초코, 복숭아, 아메리카노, 바나나처럼 맛 카테고리를 바꾸면 훨씬 쉽게 맞는 제품을 찾을 수 있습니다." },
  ],
  relatedGuides: [
    { title: "단백질 음료 맛별 추천", href: "/guides/product-selection-comparison/protein-drink-by-flavor", description: "맛 카테고리 기준으로 다시 고를 수 있게 정리했습니다." },
    { title: "단백질 음료 입문 가이드", href: "/guides/product-selection-comparison/protein-drink-beginners-guide", description: "처음 고를 때 실수를 줄이는 기준을 먼저 봅니다." },
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "브랜드를 바꿔볼지 고민될 때 같이 읽기 좋습니다." },
  ],
  purchaseLinks: [
    { label: "닥터유 프로 단백질 드링크 초코 보기", slug: dryouChoco.slug },
    { label: "셀렉스 웨이프로핏 복숭아 보기", slug: sellexPeach.slug },
    { label: "닥터유 프로 단백질 드링크 바나나 보기", slug: dryouBanana.slug },
  ],
};
proteinDrinkTasteTipsConfig.jsonLd = [articleJsonLd(proteinDrinkTasteTipsConfig), faqJsonLd(proteinDrinkTasteTipsConfig)];

const hymuneOriginal = getDrinkProduct("hymune-balance-active-original-250");
const hymuneZeroTiramisu = getDrinkProduct("hymune-balance-active-night-tiramisu-zero-250");
const hymuneBalancePlus = getDrinkProduct("hymune-protein-balance-plus-190");
const hymunePlant = getDrinkProduct("hymune-protein-balance-plant-highprotein-190");
const takefitPro = getDrinkProduct("takefit-pro-lemon-500");
const danbaekDrinkChoco = getDrinkProduct("danbaek-drink-chocolate-250");
const danbaekDoubleChoco = getDrinkProduct("danbaek-drink-doublechoco-350");
const danbaekDarkChoco = getDrinkProduct("danbaek-drink-darkchoco-330");
const danbaekWaterApple = getDrinkProduct("danbaek-water-apple-400");
const dryou40Strawberry = getDrinkProduct("dryou-protein-40g-strawberry-350");

export const himuneLineupConfig: ComparePageConfig = {
  slug: "himune-lineup",
  title: "하이뮨 제품 종류 전체 정리",
  description: "하이뮨 RTD 라인업을 프로틴 밸런스, 액티브, 액티브 제로, 식물성 고단백 기준으로 정리하고 목적별 추천까지 바로 연결합니다.",
  keywords: ["하이뮨 종류", "하이뮨 라인업", "하이뮨 프로틴밸런스 액티브 차이", "하이뮨 액티브 제로"],
  badge: "브랜드 라인업",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB RTD 기준",
  intro: "하이뮨은 산양유 단백질 이미지가 강하지만 실제 라인업은 일상 영양보완형, 운동 보충형, 제로형, 식물성형으로 분화돼 있습니다. ProteinLab DB에 잡힌 RTD 라인업 기준으로 정리하면 어떤 목적에 어떤 제품이 맞는지 훨씬 선명해집니다.",
  summary: [
    "하이뮨은 운동용 한 가지만 있는 브랜드가 아니라 일상 보완형과 액티브형이 분리되어 있습니다.",
    "가장 무난한 표준형은 액티브, 더 가볍게 가려면 액티브 제로, 식사 보완 쪽은 프로틴 밸런스 계열이 더 잘 맞습니다.",
    "하이뮨의 핵심 차별점은 산양유 기반 이미지와 다양한 맛, 그리고 일상용 저부담 포지셔닝입니다.",
  ],
  comparisonTitle: "하이뮨 RTD 라인업 비교표",
  comparisonColumns: ["프로틴 밸런스", "프로틴 밸런스 플러스", "액티브", "액티브 제로", "식물성 고단백"],
  comparisonRows: buildComparisonRows([
    { label: "대표 제품", values: [hymuneBalance.name, hymuneBalancePlus.name, hymuneOriginal.name, hymuneZeroTiramisu.name, hymunePlant.name] },
    { label: "형태", values: ["RTD 밀크형", "RTD 밀크형", "RTD 밀크형", "RTD 밀크형", "RTD 밀크형"] },
    { label: "단백질", values: [`${hymuneBalance.proteinPerServing}g`, `${hymuneBalancePlus.proteinPerServing}g`, `${hymuneOriginal.proteinPerServing}g`, `${hymuneZeroTiramisu.proteinPerServing}g`, `${hymunePlant.proteinPerServing}g`] },
    { label: "칼로리", values: [`${hymuneBalance.calories}kcal`, `${hymuneBalancePlus.calories}kcal`, `${hymuneOriginal.calories}kcal`, `${hymuneZeroTiramisu.calories}kcal`, `${hymunePlant.calories}kcal`] },
    { label: "당류", values: [`${hymuneBalance.sugar}g`, `${hymuneBalancePlus.sugar}g`, `${hymuneOriginal.sugar}g`, `${hymuneZeroTiramisu.sugar}g`, `${hymunePlant.sugar}g`] },
    { label: "특징", values: ["일상 보완형", "단백질 소폭 상향", "표준 액티브형", "제로·저칼로리", "식물성·락토프리"] },
    { label: "추천 목적", values: ["일상 보충", "조금 더 채우고 싶을 때", "운동 후", "다이어트·저당", "유제품 부담 완화"] },
  ]),
  sections: [
    {
      title: "라인별 핵심 차이",
      items: [
        { title: "프로틴 밸런스 계열", body: "190mL 소용량에 10~13g 수준이라 일상 영양보완형에 가깝습니다. 운동용 고단백보다는 중장년층이나 식사 사이 보완에 더 어울립니다." },
        { title: "액티브 계열", body: "250mL에 20g 전후로 맞춘 하이뮨의 표준 운동 보충형입니다. 편의점 접근성과 다양한 맛이 강점입니다." },
        { title: "액티브 제로·식물성", body: "액티브 제로는 당류 0g과 99kcal가 강점이고, 식물성 고단백은 유제품이 부담스러운 사람에게 대안이 됩니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "일상에서 간편하게", body: "프로틴 밸런스 플러스가 무난합니다. 용량이 작고 단백질도 기본형보다 조금 높아 일상 보완용으로 쓰기 좋습니다." },
        { title: "운동 후 빠른 보충", body: "액티브 오리지널이나 딥초코가 기준점입니다. 하이뮨 안에서 가장 표준적인 20g급 RTD입니다." },
        { title: "당류를 낮추고 싶을 때", body: "액티브 제로가 1순위입니다. 22g, 99kcal, 당류 0g이라 하이뮨 안에서 가장 가볍게 읽힙니다." },
      ],
    },
    {
      title: "하이뮨의 차별점",
      items: [
        { title: "산양유 기반 이미지", body: "하이뮨은 단백질 총량만이 아니라 속 부담이 덜한 건강관리형 이미지를 함께 가져갑니다. 그래서 시니어와 일반 건강관리 수요를 동시에 흡수합니다." },
        { title: "맛 라인업이 넓다", body: "오리지널, 딥초코, 밀크쉐이크, 바나나, 쿠키앤크림, 커피, 제로 변형까지 맛 선택 폭이 넓습니다." },
        { title: "보충형과 일상형이 함께 있다", body: "같은 하이뮨이라도 프로틴 밸런스와 액티브는 목적이 다릅니다. 이 구분을 모르면 과하거나 부족한 제품을 고르기 쉽습니다." },
      ],
    },
    {
      title: "하이뮨 고를 때 실제 순서",
      items: [
        { title: "1. 운동용인지 일상용인지 먼저 정하기", body: "하이뮨은 브랜드 하나로 묶여 보여도 액티브와 프로틴 밸런스의 쓰임이 다릅니다. 운동 보충이면 액티브, 식사 보완이면 프로틴 밸런스부터 보는 편이 맞습니다." },
        { title: "2. 당류와 칼로리 민감도 확인하기", body: "같은 액티브라도 오리지널, 바나나, 쿠키앤크림, 제로의 체감은 꽤 다릅니다. 다이어트나 혈당 관리가 섞이면 액티브 제로 우선순위가 크게 올라갑니다." },
        { title: "3. 끝까지 마실 맛인지 고르기", body: "하이뮨은 맛 폭이 넓은 대신 SKU별 성격 차이도 큽니다. 숫자가 비슷하면 결국 계속 마실 맛인지가 정착을 결정하는 경우가 많습니다." },
      ],
    },
  ],
  faq: [
    { question: "하이뮨에서 가장 무난한 첫 제품은 무엇인가", answer: "운동 보충이면 액티브 딥초코나 오리지널, 일상 보완이면 프로틴 밸런스 플러스가 무난합니다. 두 라인의 역할이 다르니 목적부터 정하는 편이 좋습니다." },
    { question: "하이뮨 액티브 제로는 어떤 사람에게 맞나", answer: "당류와 칼로리를 더 낮게 보고 싶은 사람에게 맞습니다. 22g, 99kcal, 당류 0g이라 하이뮨 안에서 가장 가벼운 축입니다." },
    { question: "하이뮨은 왜 시니어용 이미지가 강한가", answer: "산양유와 건강관리 메시지가 강하고, 프로틴 밸런스처럼 일상 보완형 제품 비중도 있기 때문입니다. 그래서 운동 전용 브랜드보다 폭이 넓게 읽힙니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "하이뮨을 셀렉스 대표 RTD와 직접 비교합니다." },
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "대표 브랜드 3파전을 한 번에 비교합니다." },
    { title: "단백질 음료 입문 가이드", href: "/guides/product-selection-comparison/protein-drink-beginners-guide", description: "처음 마시는 사람 기준에서 다시 좁혀봅니다." },
  ],
  purchaseLinks: [
    { label: "하이뮨 액티브 보기", slug: hymuneOriginal.slug },
    { label: "하이뮨 액티브 제로 보기", slug: hymuneZeroTiramisu.slug },
    { label: "하이뮨 프로틴 밸런스 보기", slug: hymuneBalance.slug },
  ],
};
himuneLineupConfig.jsonLd = [articleJsonLd(himuneLineupConfig), faqJsonLd(himuneLineupConfig)];

export const takefitLineupConfig: ComparePageConfig = {
  slug: "takefit-lineup",
  title: "테이크핏 제품 종류 전체 정리",
  description: "테이크핏 맥스, 몬스터, 프로 라인의 차이를 단백질, 칼로리, 음용감 기준으로 정리하고 목적별 추천까지 연결합니다.",
  keywords: ["테이크핏 종류", "테이크핏 맥스 몬스터 차이", "테이크핏 라인업", "테이크핏 프로"],
  badge: "브랜드 라인업",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB RTD 기준",
  intro: "테이크핏은 이름이 다른 만큼 목적도 분명하게 갈립니다. 맥스는 표준 고단백, 몬스터는 40g 이상 초고단백, 프로는 워터형이라서 같은 브랜드라도 고르는 기준이 완전히 다릅니다.",
  summary: [
    "처음 시작하기 가장 무난한 건 테이크핏 맥스입니다.",
    "단백질 함량을 극대화하려면 몬스터가 답이고, 가볍게 마시고 싶다면 프로가 가장 편합니다.",
    "테이크핏 라인업은 숫자와 용량이 다르면 사실상 용도도 달라진다고 보면 됩니다.",
  ],
  comparisonTitle: "테이크핏 라인업 비교표",
  comparisonColumns: ["맥스", "몬스터", "프로"],
  comparisonRows: buildComparisonRows([
    { label: "대표 제품", values: [takefitMax.name, takefitMonster.name, takefitPro.name] },
    { label: "형태", values: ["RTD 밀크형", "RTD 밀크형", "RTD 워터형"] },
    { label: "단백질", values: [`${takefitMax.proteinPerServing}g`, `${takefitMonster.proteinPerServing}g`, `${takefitPro.proteinPerServing}g`] },
    { label: "칼로리", values: [`${takefitMax.calories}kcal`, `${takefitMonster.calories}kcal`, `${takefitPro.calories}kcal`] },
    { label: "당류", values: [`${takefitMax.sugar}g`, `${takefitMonster.sugar}g`, `${takefitPro.sugar}g`] },
    { label: "특징", values: ["저당 표준형", "43g 초고단백", "워터형 500mL"] },
    { label: "추천 목적", values: ["일반 운동·다이어트", "집중 보충", "가벼운 수분형 보충"] },
  ]),
  sections: [
    {
      title: "핵심 차이 한 줄 정리",
      items: [
        { title: "맥스", body: "250mL에 24g이라 테이크핏의 표준형입니다. 다이어트와 일반 운동용으로 가장 범용적입니다." },
        { title: "몬스터", body: "350mL에 43g으로 함량 최우선 라인입니다. 40g대 비교군 안에서도 가장 공격적입니다." },
        { title: "프로", body: "500mL 워터형이라 마시는 느낌이 완전히 다릅니다. 단백질 25g인데도 100kcal라 가장 가볍습니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "처음 시작", body: "맥스가 가장 무난합니다. 과하지 않고, 저당·저칼로리 축에 있어서 실패 확률이 낮습니다." },
        { title: "단백질 함량 극대화", body: "몬스터가 답입니다. 43g, 당류 1g, 186kcal라 고단백 보충 목적이 분명합니다." },
        { title: "가볍게 마시고 싶을 때", body: "프로가 가장 편합니다. 워터형이라 밀크형 RTD가 무거운 사람에게 특히 잘 맞습니다." },
      ],
    },
    {
      title: "고를 때 마지막 체크포인트",
      items: [
        { title: "맥스와 몬스터는 단순 상위호환이 아니다", body: "몬스터는 함량이 높지만 열량과 포만감도 같이 올라갑니다. 일상용이면 맥스가 더 적합할 수 있습니다." },
        { title: "프로는 워터형이라 체감이 다르다", body: "같은 25g이라도 밀크형 포만감을 기대하면 프로는 가볍게 느껴질 수 있습니다. 대신 마시기 쉬움은 가장 좋습니다." },
        { title: "테이크핏은 고단백 브랜드 안에서도 분화가 선명하다", body: "브랜드 하나만 보고 고르면 안 되고, 맥스·몬스터·프로 중 어떤 목적의 라인인지 먼저 보는 편이 정확합니다." },
      ],
    },
    {
      title: "테이크핏 선택을 쉽게 하는 법",
      items: [
        { title: "다이어트·일반 운동이면 맥스", body: "테이크핏을 처음 보는 사람 대부분은 맥스부터 보면 됩니다. 숫자와 포지션이 가장 균형적이라 과한 선택을 피하기 쉽습니다." },
        { title: "한 병 해결형이면 몬스터", body: "하루 단백질을 한 번에 크게 끌어올려야 한다면 몬스터로 가는 게 맞습니다. 다만 일상 루틴용으로는 과할 수 있습니다." },
        { title: "밀크형이 싫으면 프로", body: "테이크핏 프로는 '가벼움' 자체가 장점입니다. 포만감보다 깔끔한 수분형 보충을 원하는 사람에게 더 잘 맞습니다." },
      ],
    },
  ],
  faq: [
    { question: "테이크핏에서 가장 무난한 첫 제품은 무엇인가", answer: "맥스입니다. 24g급 저당형이라 일반 운동과 다이어트 병행에 가장 무난합니다." },
    { question: "테이크핏 몬스터는 누구에게 맞나", answer: "한 병에 단백질을 크게 채우고 싶은 사람에게 맞습니다. 43g이라 고강도 운동이나 집중 보충용으로 읽는 편이 맞습니다." },
    { question: "테이크핏 프로는 운동용으로도 괜찮나", answer: "괜찮습니다. 다만 워터형이라 포만감보다 가벼운 수분형 보충에 더 가깝습니다. 밀크형 RTD와는 사용감이 다릅니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "대표 브랜드 3파전 속에서 테이크핏 위치를 봅니다." },
    { title: "단백질 음료 40g 이상 3종 비교", href: "/guides/product-selection-comparison/high-protein-40g-comparison", description: "몬스터를 다른 40g대 제품과 직접 비교합니다." },
    { title: "닥터유 40g vs 테이크핏 몬스터 43g", href: "/guides/product-selection-comparison/doctoru-40g-vs-takefit-monster-43g", description: "몬스터 딥다이브 비교 페이지입니다." },
  ],
  purchaseLinks: [
    { label: "테이크핏 맥스 보기", slug: takefitMax.slug },
    { label: "테이크핏 몬스터 보기", slug: takefitMonster.slug },
    { label: "테이크핏 프로 보기", slug: takefitPro.slug },
  ],
};
takefitLineupConfig.jsonLd = [articleJsonLd(takefitLineupConfig), faqJsonLd(takefitLineupConfig)];

export const newcareAllproteinConfig: ComparePageConfig = {
  slug: "newcare-allprotein",
  title: "뉴케어 올프로틴 완전 분석",
  description: "뉴케어 올프로틴 41g을 락토프리, 칼로리, 단백질 밀도 기준으로 분석하고 다른 40g대 제품과 무엇이 다른지 정리합니다.",
  keywords: ["뉴케어 올프로틴", "뉴케어 올프로틴 41g", "뉴케어 락토프리 단백질", "뉴케어 고단백"],
  badge: "브랜드 딥다이브",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 41g RTD 기준",
  intro: "뉴케어 올프로틴 41g은 단순히 단백질 함량만 높은 제품이 아닙니다. 락토프리와 균형영양식 브랜드 성격이 같이 들어 있어, 같은 40g대라도 테이크핏 몬스터나 닥터유 40g과 결이 꽤 다르게 읽힙니다.",
  summary: [
    "41g 고단백이면서 락토프리라는 점이 뉴케어 올프로틴의 핵심 차별점입니다.",
    "운동 특화형이라기보다 건강관리형 고단백이라는 해석이 더 정확합니다.",
    "유당불내증이 있거나 50대 이상 건강관리 목적이라면 40g대 중 우선순위가 높아집니다.",
  ],
  comparisonTitle: "핵심 스펙 카드",
  comparisonColumns: ["항목", "수치"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: ["41g", "고단백 RTD"] },
    { label: "락토프리", values: ["유당 제거", "variant 기준"] },
    { label: "칼로리", values: ["210kcal", "350mL 기준"] },
    { label: "당류", values: ["0.8g", "저당형"] },
    { label: "단백질 밀도", values: [formatDensity(newcare41), "100mL 기준"] },
    { label: "브랜드", values: ["대상웰라이프", "뉴케어"] },
  ]),
  sections: [
    {
      title: "결정적으로 다른 점 2가지",
      items: [
        { title: "락토프리", body: "테이크핏 몬스터와 닥터유 40g은 락토프리로 잡혀 있지 않지만 뉴케어 41g은 락토프리입니다. 유당 부담이 있는 사람에게는 이 차이가 가장 큽니다." },
        { title: "균형영양식 브랜드 성격", body: "뉴케어는 원래 건강관리형 브랜드라 운동 보충만을 전제로 만든 제품과 결이 다릅니다. 시니어, 보호자, 회복기 보충 검색과도 연결되기 쉽습니다." },
        { title: "맛보다 기능 중심 해석", body: "맛 진입장벽이 낮다는 방향보다는, 고단백과 소화 접근성을 같이 챙기는 선택지로 보는 편이 정확합니다." },
      ],
    },
    {
      title: "이런 사람에게 맞습니다",
      items: [
        { title: "유당불내증인데 고단백이 필요한 사람", body: "현재 ProteinLab DB 기준으로 40g대에서 락토프리인 대표 선택지입니다." },
        { title: "운동보다 건강 유지 목적의 50대 이상", body: "균형형 브랜드 이미지와 락토프리 특성 때문에 건강관리형 고단백으로 읽기 좋습니다." },
        { title: "단백질과 영양 균형을 같이 보고 싶은 사람", body: "극단적인 운동용 RTD보다는 일상 건강관리와 겹치는 사용자에게 더 잘 맞습니다." },
      ],
    },
    {
      title: "이런 사람에게는 안 맞습니다",
      items: [
        { title: "순수 퍼포먼스용", body: "운동 직후 단백질만 강하게 채우려면 테이크핏 몬스터가 더 직관적입니다." },
        { title: "칼로리를 엄격히 제한 중", body: "210kcal라 40g대 안에서도 아주 가벼운 편은 아닙니다. 감량기에는 우선순위가 내려갈 수 있습니다." },
        { title: "맛 진입장벽을 가장 중요하게 볼 때", body: "이 경우에는 닥터유 40g 같은 초코우유형이 더 쉬울 수 있습니다." },
      ],
    },
    {
      title: "뉴케어 올프로틴을 잘 쓰는 방법",
      items: [
        { title: "40g대 입문용이 아니라 상황 해결형으로 보기", body: "이 제품은 '고단백이라서'보다 '락토프리인데도 41g이라서' 의미가 큽니다. 고단백 입문 전체를 대표하는 페이지로 읽으면 오해가 생길 수 있습니다." },
        { title: "건강관리형 사용자에게 더 잘 맞는다", body: "운동 퍼포먼스보다 소화 부담, 연령대, 균형 영양을 같이 보는 사용자가 이 제품의 핵심 타깃에 가깝습니다." },
        { title: "40g대 비교에서는 예외 케이스로 기억하기", body: "테이크핏과 닥터유가 운동 보충형이라면, 뉴케어는 건강관리형 고단백 예외 케이스입니다. 이 프레임으로 보면 선택이 쉬워집니다." },
      ],
    },
  ],
  faq: [
    { question: "뉴케어 올프로틴 41g의 가장 큰 장점은 무엇인가", answer: "락토프리와 41g 고단백을 동시에 갖춘 점입니다. 40g대 제품 중에서도 결이 다르게 읽히는 이유가 여기에 있습니다." },
    { question: "운동용으로도 괜찮나", answer: "가능하지만, 운동 특화형보다는 건강관리형 고단백으로 읽는 편이 더 정확합니다. 순수 보충 효율은 테이크핏 몬스터가 더 직선적입니다." },
    { question: "유당불내증이면 가장 먼저 볼 만한 40g대 제품인가", answer: "네. 현재 ProteinLab DB 기준으로는 그렇습니다. 락토프리 표기가 분명한 40g대 대표 선택지입니다." },
  ],
  relatedGuides: [
    { title: "단백질 음료 40g 이상 3종 비교", href: "/guides/product-selection-comparison/high-protein-40g-comparison", description: "뉴케어를 다른 40g대 대표 제품과 나란히 비교합니다." },
    { title: "유당불내증인데 단백질 음료 먹을 수 있나", href: "/guides/product-selection-comparison/lactose-free-protein-drink", description: "락토프리 관점에서 다시 좁혀봅니다." },
    { title: "50대 단백질 음료 추천", href: "/guides/product-selection-comparison/protein-drink-for-50s", description: "중장년 건강관리 관점에서 다시 읽습니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 올프로틴 41g 보기", slug: newcare41.slug },
    { label: "테이크핏 몬스터 보기", slug: takefitMonster.slug },
    { label: "닥터유 40g 보기", slug: dryou40.slug },
  ],
};
newcareAllproteinConfig.description =
  "뉴케어 올프로틴 41g뿐 아니라 25g, 식물성, 워터 라인까지 함께 보고 어떤 라인이 어떤 목적에 맞는지 정리합니다.";
newcareAllproteinConfig.keywords = [
  "뉴케어 올프로틴",
  "뉴케어 올프로틴 41g",
  "뉴케어 올프로틴 25g",
  "뉴케어 식물성 단백질",
  "뉴케어 올프로틴 워터",
];
newcareAllproteinConfig.methodologyNote = "ProteinLab DB 뉴케어 올프로틴 41g·25g·식물성·워터 라인 기준";
newcareAllproteinConfig.summary = [
  "뉴케어 올프로틴은 41g 한 가지가 아니라 25g, 식물성, 워터까지 목적이 갈리는 라인업입니다.",
  "41g은 고단백 집중형, 25g은 일상형, 식물성은 원료 민감도 대응형, 워터는 가장 가벼운 음용형으로 읽으면 쉽습니다.",
  "뉴케어를 고를 때는 단백질 총량보다 내가 원하는 음용감과 소화 부담부터 먼저 정하는 편이 실수가 적습니다.",
];
newcareAllproteinConfig.sections.splice(1, 0, {
  title: "뉴케어 올프로틴 라인업 한눈에 보기",
  items: [
    {
      title: `41g 라인: ${newcare41.proteinPerServing}g 고단백`,
      body: `${newcare41.calories}kcal에 당류 ${newcare41.sugar}g 수준으로, 단백질 총량을 가장 강하게 챙기고 싶을 때 맞습니다. 유당 부담을 낮춘 고단백 RTD라는 점이 핵심입니다.`,
    },
    {
      title: `25g 라인: ${newcare25.proteinPerServing}g 일상형`,
      body: `${newcare25.calories}kcal, 당류 ${newcare25.sugar}g로 41g보다 진입 장벽이 낮습니다. 매일 한 병씩 무난하게 챙기거나 식사 사이 보충용으로 보기 좋습니다.`,
    },
    {
      title: `식물성 라인: ${newcarePlant.proteinPerServing}g 대체 옵션`,
      body: `${newcarePlant.calories}kcal에 당류 ${newcarePlant.sugar}g, 단백질 원료가 식물성으로 잡혀 있습니다. 유제품 기반 음용감이 부담스럽거나 식물성 쪽을 선호할 때 후보가 됩니다.`,
    },
    {
      title: `워터 라인: ${newcareWater.proteinPerServing}g 가벼운 음용형`,
      body: `${newcareWater.calories}kcal, 당류 ${newcareWater.sugar}g로 가장 가볍습니다. 대신 밀도는 ${formatDensity(newcareWater)} 수준이라 식사 보완보다 산뜻한 보충에 가깝습니다.`,
    },
  ],
});
newcareAllproteinConfig.sections.splice(3, 0, {
  title: "라인업별 이렇게 고르면 됩니다",
  items: [
    {
      title: "고단백 한 병으로 끝내고 싶다면",
      body: "41g 라인이 가장 명확합니다. 운동 후든 건강관리 목적이든 한 번에 단백질 총량을 크게 확보하려는 수요에 맞습니다.",
    },
    {
      title: "매일 부담 없이 마실 뉴케어를 찾는다면",
      body: "25g 라인이 가장 무난합니다. 칼로리와 음용 부담이 덜해서 입문용이나 일상 루틴용으로 설명하기 쉽습니다.",
    },
    {
      title: "원료 성격이 더 중요하다면",
      body: "식물성 라인을 먼저 보면 됩니다. 단백질 총량은 41g보다 낮지만, 뉴케어 안에서 식물성 선택지를 찾는 사용자에게는 별도 의미가 있습니다.",
    },
    {
      title: "묵직한 밀크형이 부담스럽다면",
      body: "워터 라인이 맞습니다. 80kcal 수준이라 가장 가볍지만, 포만감이나 단백질 밀도는 25g·41g 라인보다 확실히 낮습니다.",
    },
  ],
});
newcareAllproteinConfig.faq = [
  ...(newcareAllproteinConfig.faq ?? []),
  {
    question: "뉴케어 올프로틴은 41g만 있는 브랜드인가요?",
    answer:
      "아닙니다. ProteinLab DB 기준으로 41g 고단백 라인 외에 25g 일상형, 식물성 단백질 라인, 워터형 라인이 함께 잡혀 있습니다. 같은 뉴케어라도 목적이 꽤 다릅니다.",
  },
  {
    question: "25g, 식물성, 워터 중에서는 무엇부터 보면 되나요?",
    answer:
      "무난한 입문은 25g, 원료 선호가 뚜렷하면 식물성, 가장 가볍게 마시고 싶다면 워터를 먼저 보면 됩니다. 41g은 총량을 최우선으로 둘 때 선택하는 상위 라인으로 보면 됩니다.",
  },
];
newcareAllproteinConfig.purchaseLinks = [
  { label: "뉴케어 올프로틴 41g 보기", slug: newcare41.slug },
  { label: "뉴케어 올프로틴 25g 보기", slug: newcare25.slug },
  { label: "뉴케어 식물성 단백질 보기", slug: newcarePlant.slug },
  { label: "뉴케어 올프로틴 워터 보기", slug: newcareWater.slug },
];
newcareAllproteinConfig.jsonLd = [articleJsonLd(newcareAllproteinConfig), faqJsonLd(newcareAllproteinConfig)];

export const newcare41Vs25Config: ComparePageConfig = {
  slug: "newcare-41g-vs-25g",
  title: "뉴케어 올프로틴 41g vs 25g 비교",
  description:
    "뉴케어 올프로틴 41g과 25g 라인을 단백질, 칼로리, 당류, 음용 목적 기준으로 비교합니다. 고단백 보충용인지 일상형인지 빠르게 정리합니다.",
  keywords: ["뉴케어 올프로틴 41g", "뉴케어 올프로틴 25g", "뉴케어 41g 25g 차이", "뉴케어 올프로틴 비교"],
  badge: "뉴케어 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-04-02",
  methodologyNote: "ProteinLab DB 뉴케어 41g·25g 라인 기준",
  intro:
    "뉴케어를 찾는 사람도 실제로는 41g과 25g 중 어느 쪽이 맞는지에서 많이 갈립니다. 41g은 고단백 보충용이고, 25g은 매일 마시기 쉬운 일상형에 가깝습니다. 두 라인을 수치와 쓰임새 기준으로 나란히 보면 선택이 훨씬 빨라집니다.",
  summary: [
    "단백질 총량을 최우선으로 보면 41g 라인이 더 직접적입니다.",
    "매일 부담 없이 마실 용도면 25g 라인이 더 무난합니다.",
    "뉴케어를 고를 때는 총량보다 내가 원하는 음용 강도를 먼저 정하는 편이 정확합니다.",
  ],
  comparisonTitle: "뉴케어 41g과 25g 차이",
  comparisonColumns: ["뉴케어 41g", "뉴케어 25g"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${newcare41.proteinPerServing}g`, `${newcare25.proteinPerServing}g`] },
    { label: "용량", values: [newcare41.capacity ?? "-", newcare25.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(newcare41), formatDensity(newcare25)] },
    { label: "칼로리", values: [`${newcare41.calories}kcal`, `${newcare25.calories}kcal`] },
    { label: "당류", values: [`${newcare41.sugar}g`, `${newcare25.sugar}g`] },
    { label: "지방", values: [`${newcare41.fat ?? "-"}g`, `${newcare25.fat ?? "-"}g`] },
    { label: "나트륨", values: [`${newcare41.sodium ?? "-"}mg`, `${newcare25.sodium ?? "-"}mg`] },
  ]),
  sections: [
    {
      title: "핵심 차이",
      items: [
        { title: "41g은 고단백 예외 케이스", body: "뉴케어 41g은 같은 RTD 안에서도 총량이 높고 락토프리 포지션이 분명합니다. 운동 보충이나 회복기 보완처럼 한 병의 역할이 커야 할 때 먼저 볼 가치가 있습니다." },
        { title: "25g은 일상형 라인", body: "뉴케어 25g은 진입 장벽이 더 낮습니다. 매일 한 병 마시거나 식사 사이 보충처럼 과하게 무겁지 않은 선택지가 필요할 때 더 자연스럽습니다." },
        { title: "브랜드는 같아도 쓰임새는 다름", body: "둘 다 뉴케어지만 41g은 성능형, 25g은 지속형에 가깝습니다. 같은 브랜드 안에서도 무엇을 기대하는지 먼저 정해야 합니다." },
      ],
    },
    {
      title: "이런 경우에 맞습니다",
      items: [
        { title: "41g이 맞는 경우", body: "한 병으로 단백질을 크게 채우고 싶거나 유당 부담을 낮춘 고단백 RTD를 찾는 경우입니다. 40g대 제품군 안에서 비교하는 흐름이 더 맞습니다." },
        { title: "25g이 맞는 경우", body: "지나치게 무거운 제품은 부담스럽고, 그래도 브랜드 신뢰와 락토프리 성격은 챙기고 싶은 경우입니다. 일상형 RTD 비교와 잘 맞습니다." },
        { title: "처음이면 어떻게 고를까", body: "처음이라면 25g 쪽이 실수가 적고, 이미 고단백 제품을 찾는 상황이라면 41g으로 바로 올라가는 편이 더 빠릅니다." },
      ],
    },
    {
      title: "같이 보면 좋은 다음 비교",
      items: [
        { title: "41g을 더 넓게 비교", body: "테이크핏 몬스터, 닥터유 40g과 함께 보면 뉴케어 41g의 결이 더 명확해집니다." },
        { title: "25g을 더 넓게 비교", body: "셀렉스, 하이뮨 같은 20g대 RTD와 같이 보면 뉴케어 25g의 포지션이 더 선명합니다." },
        { title: "워터형이 더 맞는지 확인", body: "밀크형 RTD가 부담스럽다면 뉴케어 워터 라인으로 넘어가는 흐름도 자연스럽습니다." },
      ],
    },
  ],
  faq: [
    { question: "뉴케어는 41g부터 보는 게 맞나요?", answer: "고단백 목적이 분명하면 41g부터 보는 게 맞지만, 매일 한 병씩 무난하게 마실 제품을 찾는다면 25g 라인이 더 실용적입니다." },
    { question: "뉴케어 25g도 락토프리인가요?", answer: "ProteinLab DB 기준으로 뉴케어 올프로틴 25g 라인도 락토프리 성격으로 같이 묶여 있습니다. 그래서 일반 밀크형 RTD가 부담스러운 사람에게 자주 후보가 됩니다." },
    { question: "41g과 25g 중 어느 쪽이 더 무난한가요?", answer: "대부분은 25g이 더 무난합니다. 41g은 분명한 고단백 목적이 있을 때 선택 이유가 더 강해집니다." },
  ],
  relatedGuides: [
    { title: "뉴케어 올프로틴 완전 분석", href: "/guides/product-selection-comparison/newcare-allprotein", description: "41g, 25g, 식물성, 워터 라인을 한 번에 정리한 메인 페이지입니다." },
    { title: "단백질 음료 40g 이상 3종 비교", href: "/guides/product-selection-comparison/high-protein-40g-comparison", description: "41g을 다른 40g대 제품과 나란히 비교합니다." },
    { title: "단백질 음료 입문 가이드", href: "/guides/product-selection-comparison/protein-drink-beginners-guide", description: "25g급 RTD를 어떻게 보면 되는지 먼저 정리합니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 올프로틴 41g 보기", slug: newcare41.slug },
    { label: "뉴케어 올프로틴 25g 보기", slug: newcare25.slug },
  ],
};
newcare41Vs25Config.jsonLd = [articleJsonLd(newcare41Vs25Config), faqJsonLd(newcare41Vs25Config)];

export const newcareWaterConfig: ComparePageConfig = {
  slug: "newcare-protein-water-guide",
  title: "뉴케어 올프로틴 워터 정리",
  description:
    "뉴케어 올프로틴 워터를 단백질, 당류, 칼로리, 음용감 기준으로 정리합니다. 밀크형 RTD가 부담스러울 때 어떤 대안이 되는지 빠르게 확인할 수 있습니다.",
  keywords: ["뉴케어 올프로틴 워터", "뉴케어 워터 단백질", "뉴케어 워터 레몬", "뉴케어 워터 사과"],
  badge: "뉴케어 워터",
  readingTime: "4분 읽기",
  updatedAt: "2026-04-02",
  methodologyNote: "ProteinLab DB 뉴케어 올프로틴 워터 기준",
  intro:
    "뉴케어 검색량이 늘 때 같이 붙는 의도 중 하나가 워터형입니다. 올프로틴 워터는 일반 밀크형 RTD와 결이 다르기 때문에 단백질 총량보다도 음용감, 칼로리, 당류, 부담 정도를 먼저 읽는 편이 맞습니다.",
  summary: [
    "올프로틴 워터는 무거운 고단백 RTD보다 가볍게 마시는 쪽에 더 가깝습니다.",
    "당류 0g, 낮은 칼로리 구조라 밀크형이 부담스러운 사람에게 대안이 됩니다.",
    "식사 보완보다 산뜻한 보충 쪽으로 읽어야 실수가 적습니다.",
  ],
  comparisonTitle: "뉴케어 워터 핵심 수치",
  comparisonColumns: ["뉴케어 워터", "뉴케어 25g", "뉴케어 41g"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${newcareWater.proteinPerServing}g`, `${newcare25.proteinPerServing}g`, `${newcare41.proteinPerServing}g`] },
    { label: "용량", values: [newcareWater.capacity ?? "-", newcare25.capacity ?? "-", newcare41.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(newcareWater), formatDensity(newcare25), formatDensity(newcare41)] },
    { label: "칼로리", values: [`${newcareWater.calories}kcal`, `${newcare25.calories}kcal`, `${newcare41.calories}kcal`] },
    { label: "당류", values: [`${newcareWater.sugar}g`, `${newcare25.sugar}g`, `${newcare41.sugar}g`] },
    { label: "칼로리/100mL", values: [formatCalories100(newcareWater), formatCalories100(newcare25), formatCalories100(newcare41)] },
  ]),
  sections: [
    {
      title: "워터형을 보는 기준",
      items: [
        { title: "가볍게 마시는 쪽", body: "올프로틴 워터는 80kcal 수준이라 밀크형 RTD보다 부담이 낮습니다. 진한 보충감보다 가벼운 음용 경험이 더 중요할 때 맞습니다." },
        { title: "당류 기준이 분명함", body: "당류 0g 구조라 저당형 검색과도 잘 맞습니다. 다이어트나 혈당 부담을 같이 보는 사용자에게 설명이 쉬운 편입니다." },
        { title: "총량은 과장하면 안 됨", body: "워터형은 가벼운 대신 41g 같은 고단백 라인과 역할이 다릅니다. 식사 보완이나 고단백 보충의 대체재로 읽으면 과장에 가깝습니다." },
      ],
    },
    {
      title: "이런 사용자에게 맞습니다",
      items: [
        { title: "밀크형 RTD가 부담스러운 경우", body: "음용감이 무겁거나 속이 더부룩한 경험이 있다면 워터형이 더 편할 수 있습니다. 뉴케어 안에서도 가장 가벼운 축입니다." },
        { title: "당류와 칼로리를 같이 보는 경우", body: "단백질 총량보다도 저당, 저칼로리 구조가 더 중요한 사용자라면 워터형이 명확한 후보가 됩니다." },
        { title: "운동 직후 가볍게 보충하는 경우", body: "한 병으로 40g급 보충을 노리는 용도는 아니지만, 운동 직후 가볍게 마실 제품을 찾는다면 비교 후보로 충분합니다." },
      ],
    },
    {
      title: "같이 보면 좋은 비교",
      items: [
        { title: "저당 음료 비교", body: "셀렉스 프로핏, 테이크핏 맥스 같은 저당 밀크형 RTD와 비교하면 워터형의 의미가 더 잘 보입니다." },
        { title: "뉴케어 메인 라인 비교", body: "워터와 25g, 41g을 같이 보면 뉴케어 안에서도 어떤 목적이 갈리는지 금방 정리됩니다." },
        { title: "락토프리 대안 찾기", body: "워터형이 제일 편한지, 락토프리 밀크형이 더 나은지 같이 보는 흐름이 가장 실용적입니다." },
      ],
    },
  ],
  faq: [
    { question: "뉴케어 워터는 단백질이 낮은 편인가요?", answer: "41g 같은 고단백 라인과 비교하면 낮지만, 워터형이라는 목적을 감안하면 역할이 다릅니다. 가벼운 보충 쪽으로 읽는 게 맞습니다." },
    { question: "뉴케어 워터는 다이어트용으로 보나요?", answer: "당류 0g과 낮은 칼로리 때문에 다이어트 사용자도 많이 봅니다. 다만 총량보다 가벼움이 핵심이라 식사대용처럼 읽으면 과합니다." },
    { question: "밀크형보다 무조건 더 좋나요?", answer: "아닙니다. 워터형은 가볍고 부담이 낮은 대신, 고단백 보충감은 밀크형 라인이 더 강합니다." },
  ],
  relatedGuides: [
    { title: "뉴케어 올프로틴 완전 분석", href: "/guides/product-selection-comparison/newcare-allprotein", description: "워터를 포함한 전체 뉴케어 라인을 한 번에 봅니다." },
    { title: "저당 단백질 음료 가이드", href: "/guides/product-selection-comparison/low-sugar-protein-drink-guide", description: "워터형이 저당 기준에서 어떤 위치인지 정리합니다." },
    { title: "락토프리 단백질 음료", href: "/guides/product-selection-comparison/lactose-free-protein-drink", description: "밀크형 락토프리와 워터형을 같이 비교합니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 올프로틴 워터 보기", slug: newcareWater.slug },
    { label: "뉴케어 올프로틴 25g 보기", slug: newcare25.slug },
  ],
};
newcareWaterConfig.jsonLd = [articleJsonLd(newcareWaterConfig), faqJsonLd(newcareWaterConfig)];

export const newcareVsHymuneConfig: ComparePageConfig = {
  slug: "newcare-vs-hymune",
  title: "뉴케어 vs 하이뮨 단백질 음료 비교",
  description:
    "뉴케어 올프로틴과 하이뮨 프로틴 밸런스를 단백질, 용량, 당류, 브랜드 포지션 기준으로 비교합니다. 50대·시니어·회복기 보완용으로 어떤 흐름이 더 맞는지 정리합니다.",
  keywords: ["뉴케어 하이뮨 비교", "뉴케어 vs 하이뮨", "시니어 단백질 음료", "하이뮨 뉴케어 차이"],
  badge: "브랜드 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-04-02",
  methodologyNote: "ProteinLab DB 뉴케어 41g·하이뮨 프로틴 밸런스 기준",
  intro:
    "뉴케어와 하이뮨은 둘 다 건강관리형 검색에서 자주 겹치지만, 실제 제품 결은 꽤 다릅니다. 뉴케어는 고단백 예외 케이스 쪽으로 읽히고, 하이뮨은 조금 더 익숙한 균형형 진입 제품으로 읽히는 편입니다.",
  summary: [
    "단백질 총량은 뉴케어 41g이 확실히 높습니다.",
    "부담 낮은 첫 제품 흐름은 하이뮨이 더 자연스럽습니다.",
    "시니어·회복기 검색에서는 브랜드보다 용량과 음용 부담을 먼저 보는 편이 더 정확합니다.",
  ],
  comparisonTitle: "뉴케어와 하이뮨 차이",
  comparisonColumns: ["뉴케어 41g", "하이뮨 밸런스"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${newcare41.proteinPerServing}g`, `${hymuneBalance.proteinPerServing}g`] },
    { label: "용량", values: [newcare41.capacity ?? "-", hymuneBalance.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(newcare41), formatDensity(hymuneBalance)] },
    { label: "칼로리", values: [`${newcare41.calories}kcal`, `${hymuneBalance.calories}kcal`] },
    { label: "당류", values: [`${newcare41.sugar}g`, `${hymuneBalance.sugar}g`] },
    { label: "나트륨", values: [`${newcare41.sodium ?? "-"}mg`, `${hymuneBalance.sodium ?? "-"}mg`] },
  ]),
  sections: [
    {
      title: "브랜드 결 차이",
      items: [
        { title: "뉴케어는 고단백 예외형", body: "41g급 뉴케어는 시니어·회복기 브랜드 이미지 안에서도 고단백 예외 케이스에 가깝습니다. 총량이 필요한 상황에서 강점이 큽니다." },
        { title: "하이뮨은 진입형 균형 라인", body: "하이뮨 프로틴 밸런스는 용량이 작고 접근성이 쉬워 처음 시작하는 사람에게 설명이 더 쉽습니다. 과한 총량보다 부담이 낮은 편이 중요할 때 맞습니다." },
        { title: "검색 의도는 비슷해도 선택 기준은 다름", body: "브랜드만 보면 비슷해 보이지만, 실제로는 뉴케어는 총량, 하이뮨은 접근성이 먼저입니다. 이 차이를 먼저 보면 선택이 빨라집니다." },
      ],
    },
    {
      title: "이런 경우에 맞습니다",
      items: [
        { title: "뉴케어가 맞는 경우", body: "고단백 보충이 분명히 필요하고, 락토프리 성격까지 같이 보려는 경우입니다. 40g대 제품과 함께 비교해도 됩니다." },
        { title: "하이뮨이 맞는 경우", body: "처음 시작하거나 한 병이 너무 무거우면 부담스러운 경우입니다. 적응형 첫 제품 흐름으로는 하이뮨이 더 무난합니다." },
        { title: "보호자 검색 의도", body: "보호자나 가족이 대신 찾는 경우엔 브랜드보다 실제 한 병의 무게감과 음용 부담을 같이 보는 편이 정확합니다." },
      ],
    },
    {
      title: "같이 보면 좋은 다음 페이지",
      items: [
        { title: "뉴케어 전체 라인업", body: "41g만이 아니라 25g, 식물성, 워터 라인까지 같이 보면 뉴케어 내부 선택지가 더 명확합니다." },
        { title: "50대용 단백질 음료 가이드", body: "브랜드 비교보다 연령대 기준으로 한 번 더 정리하고 싶을 때 자연스럽게 이어집니다." },
        { title: "락토프리 비교", body: "유당 부담이 핵심이면 락토프리 기준 페이지가 더 직접적인 답이 됩니다." },
      ],
    },
  ],
  faq: [
    { question: "50대나 시니어는 뉴케어와 하이뮨 중 뭘 먼저 보나요?", answer: "처음 시작이면 하이뮨이 더 무난하고, 고단백 보충이 분명하면 뉴케어 41g이 더 직접적입니다." },
    { question: "뉴케어와 하이뮨은 같은 용도인가요?", answer: "검색 의도는 비슷할 수 있지만 결은 다릅니다. 뉴케어는 고단백 예외형, 하이뮨은 진입형 균형 라인에 가깝습니다." },
    { question: "유당 부담까지 보면 어느 쪽이 낫나요?", answer: "ProteinLab DB 기준으로는 뉴케어 41g이 락토프리 성격으로 읽히기 때문에 그 관점에서 우선순위가 올라갑니다." },
  ],
  relatedGuides: [
    { title: "뉴케어 올프로틴 완전 분석", href: "/guides/product-selection-comparison/newcare-allprotein", description: "뉴케어 라인을 자세히 풀어본 메인 페이지입니다." },
    { title: "50대 단백질 음료 가이드", href: "/guides/product-selection-comparison/protein-drink-for-50s", description: "브랜드보다 연령대 기준으로 다시 좁혀봅니다." },
    { title: "락토프리 단백질 음료", href: "/guides/product-selection-comparison/lactose-free-protein-drink", description: "유당 부담 기준으로 비교를 이어갑니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 올프로틴 41g 보기", slug: newcare41.slug },
    { label: "하이뮨 프로틴 밸런스 보기", slug: hymuneBalance.slug },
  ],
};
newcareVsHymuneConfig.jsonLd = [articleJsonLd(newcareVsHymuneConfig), faqJsonLd(newcareVsHymuneConfig)];

export const newcareVsSellexConfig: ComparePageConfig = {
  slug: "newcare-vs-sellex",
  title: "뉴케어 vs 셀렉스 단백질 음료 비교",
  description:
    "뉴케어 올프로틴과 셀렉스 프로핏을 단백질, 당류, 칼로리, 락토프리 관점으로 비교합니다. 고단백 보충형과 대중형 RTD 차이를 빠르게 정리합니다.",
  keywords: ["뉴케어 셀렉스 비교", "뉴케어 vs 셀렉스", "뉴케어 올프로틴 셀렉스 프로핏", "락토프리 단백질 음료 비교"],
  badge: "브랜드 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-04-02",
  methodologyNote: "ProteinLab DB 뉴케어 41g·셀렉스 프로핏 기준",
  intro:
    "뉴케어와 셀렉스는 검색에서 자주 겹치지만, 실제로는 고단백 예외형과 대중형 RTD라는 차이가 있습니다. 같은 단백질 음료라도 어떤 목적에 더 가까운지 먼저 정리해 두면 비교 속도가 빨라집니다.",
  summary: [
    "고단백 총량은 뉴케어 41g이 더 직접적입니다.",
    "일상형 RTD 진입과 대중성은 셀렉스가 더 강합니다.",
    "락토프리와 고단백을 같이 보면 뉴케어 쪽 우선순위가 올라갑니다.",
  ],
  comparisonTitle: "뉴케어와 셀렉스 차이",
  comparisonColumns: ["뉴케어 41g", "셀렉스 프로핏"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${newcare41.proteinPerServing}g`, `${sellex.proteinPerServing}g`] },
    { label: "용량", values: [newcare41.capacity ?? "-", sellex.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(newcare41), formatDensity(sellex)] },
    { label: "칼로리", values: [`${newcare41.calories}kcal`, `${sellex.calories}kcal`] },
    { label: "당류", values: [`${newcare41.sugar}g`, `${sellex.sugar}g`] },
    { label: "나트륨", values: [`${newcare41.sodium ?? "-"}mg`, `${sellex.sodium ?? "-"}mg`] },
  ]),
  sections: [
    {
      title: "핵심 차이",
      items: [
        { title: "뉴케어는 고단백 예외형", body: "뉴케어 41g은 40g대 라인업 안에서 읽어야 성격이 맞습니다. 단백질 총량과 락토프리 관점이 핵심입니다." },
        { title: "셀렉스는 대중형 RTD", body: "셀렉스 프로핏은 20g대 RTD 대표 축입니다. 입문, 다이어트, 일상형 검색과 더 자주 연결됩니다." },
        { title: "브랜드 결도 다름", body: "뉴케어는 건강관리형, 셀렉스는 운동 보충과 대중형 RTD 축이 더 강합니다. 숫자만큼 브랜드 프레임 차이도 큽니다." },
      ],
    },
    {
      title: "어떤 경우에 맞나",
      items: [
        { title: "뉴케어가 맞는 경우", body: "고단백 총량과 락토프리 접근성이 같이 중요한 경우입니다. 일반 20g대 RTD로 부족한 사용자에게 더 잘 맞습니다." },
        { title: "셀렉스가 맞는 경우", body: "처음 시작하거나, 한 병이 너무 무거운 제품은 피하고 싶은 경우입니다. 일상형 RTD 흐름으로 자연스럽습니다." },
        { title: "결론이 안 나면", body: "뉴케어 25g까지 포함하거나, 셀렉스 락토프리 라인까지 같이 보는 식으로 한 단계 더 넓혀보는 게 좋습니다." },
      ],
    },
    {
      title: "다음 비교 흐름",
      items: [
        { title: "뉴케어를 더 깊게", body: "41g, 25g, 식물성, 워터까지 같이 보면 뉴케어 내부 선택지가 더 잘 보입니다." },
        { title: "셀렉스를 더 깊게", body: "프로핏과 락토프리, 웨이프로핏까지 같이 보면 셀렉스 쪽 선택지가 더 선명해집니다." },
        { title: "락토프리 기준으로 재정리", body: "유당 부담이 핵심이면 브랜드 비교보다 락토프리 축이 더 직접적인 답을 줍니다." },
      ],
    },
  ],
  faq: [
    { question: "뉴케어와 셀렉스 중 더 고단백인 쪽은 어디인가요?", answer: "ProteinLab DB 기준으로는 뉴케어 41g이 훨씬 직접적입니다. 셀렉스 프로핏은 20g대 일상형 RTD 축입니다." },
    { question: "일상적으로 마시기 더 쉬운 쪽은 어디인가요?", answer: "대체로 셀렉스 쪽이 더 무난합니다. 뉴케어 41g은 고단백 목적이 분명할 때 선택 이유가 더 강합니다." },
    { question: "유당 부담까지 보면 어떤 쪽이 낫나요?", answer: "뉴케어 41g은 락토프리 성격으로 읽히기 때문에 그 관점에서 우선순위가 더 올라갑니다." },
  ],
  relatedGuides: [
    { title: "뉴케어 올프로틴 완전 분석", href: "/guides/product-selection-comparison/newcare-allprotein", description: "뉴케어 라인을 더 자세히 봅니다." },
    { title: "셀렉스 라인업 보기", href: "/guides/product-selection-comparison/selexs-lineup", description: "셀렉스 내부 라인 차이를 이어서 봅니다." },
    { title: "락토프리 단백질 음료", href: "/guides/product-selection-comparison/lactose-free-protein-drink", description: "락토프리 기준으로 다시 비교합니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 올프로틴 41g 보기", slug: newcare41.slug },
    { label: "셀렉스 프로핏 보기", slug: sellex.slug },
  ],
};
newcareVsSellexConfig.jsonLd = [articleJsonLd(newcareVsSellexConfig), faqJsonLd(newcareVsSellexConfig)];

export const newcareFor50sConfig: ComparePageConfig = {
  slug: "newcare-for-50s",
  title: "뉴케어 50대 단백질 음료 가이드",
  description:
    "50대가 뉴케어 올프로틴을 볼 때 41g, 25g, 워터 중 무엇부터 보면 되는지 정리합니다. 부담감, 음용성, 보충 목적 기준으로 빠르게 판단할 수 있습니다.",
  keywords: ["뉴케어 50대", "뉴케어 시니어 단백질", "뉴케어 올프로틴 50대", "50대 단백질 음료 뉴케어"],
  badge: "50대 가이드",
  readingTime: "4분 읽기",
  updatedAt: "2026-04-02",
  methodologyNote: "ProteinLab DB 뉴케어 41g·25g·워터 기준",
  intro:
    "50대가 뉴케어를 볼 때는 단백질 총량 하나만 보면 오히려 헷갈립니다. 실제로는 한 병의 무게감, 음용 편의성, 보충 목적이 더 중요합니다. 뉴케어 안에서도 41g, 25g, 워터는 역할이 다르기 때문에 먼저 이 차이를 나눠 읽는 편이 맞습니다.",
  summary: [
    "처음이면 25g이나 워터처럼 부담이 낮은 쪽이 더 무난합니다.",
    "보충 목적이 분명하면 41g이 직접적이지만 진입 장벽도 더 큽니다.",
    "50대 검색에서는 브랜드보다 한 병의 무게감과 지속 가능성이 더 중요합니다.",
  ],
  comparisonTitle: "50대 관점에서 보는 뉴케어",
  comparisonColumns: ["뉴케어 25g", "뉴케어 워터", "뉴케어 41g"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${newcare25.proteinPerServing}g`, `${newcareWater.proteinPerServing}g`, `${newcare41.proteinPerServing}g`] },
    { label: "용량", values: [newcare25.capacity ?? "-", newcareWater.capacity ?? "-", newcare41.capacity ?? "-"] },
    { label: "칼로리", values: [`${newcare25.calories}kcal`, `${newcareWater.calories}kcal`, `${newcare41.calories}kcal`] },
    { label: "당류", values: [`${newcare25.sugar}g`, `${newcareWater.sugar}g`, `${newcare41.sugar}g`] },
    { label: "100mL당 단백질", values: [formatDensity(newcare25), formatDensity(newcareWater), formatDensity(newcare41)] },
  ]),
  sections: [
    {
      title: "어떤 순서로 보면 좋은가",
      items: [
        { title: "처음 시작이면 25g", body: "일상형 RTD로 보기 쉬워서 적응용 첫 제품으로 무난합니다. 뉴케어 안에서도 가장 설명이 쉬운 축입니다." },
        { title: "밀크형이 부담스러우면 워터", body: "가볍게 마실 수 있는 쪽을 원하면 워터형이 더 잘 맞습니다. 당류 0g 구조도 설명이 쉽습니다." },
        { title: "보충 목적이 강하면 41g", body: "한 병으로 단백질을 크게 채워야 할 이유가 분명할 때만 41g을 우선순위로 두는 편이 맞습니다." },
      ],
    },
    {
      title: "실제 판단 기준",
      items: [
        { title: "총량보다 지속 가능성", body: "매일 챙길 수 있어야 의미가 있습니다. 너무 무거운 제품은 처음에는 오히려 지속성이 떨어질 수 있습니다." },
        { title: "한 병의 부담감", body: "용량, 칼로리, 음용감이 함께 작동합니다. 50대 검색에서는 숫자보다 이 체감 차이가 더 중요할 때가 많습니다." },
        { title: "유당 부담도 같이 보기", body: "뉴케어가 자주 언급되는 이유 중 하나가 락토프리 성격입니다. 일반 밀크형 RTD가 부담스럽다면 우선순위가 올라갑니다." },
      ],
    },
    {
      title: "같이 보면 좋은 페이지",
      items: [
        { title: "50대 단백질 음료 전체 가이드", body: "뉴케어만이 아니라 하이뮨, 셀렉스와 같이 보면 선택 이유가 더 뚜렷해집니다." },
        { title: "뉴케어 vs 하이뮨", body: "건강관리형 브랜드끼리 비교하면 결 차이를 더 쉽게 읽을 수 있습니다." },
        { title: "락토프리 비교", body: "유당 부담이 핵심이면 락토프리 기준 페이지가 더 직접적입니다." },
      ],
    },
  ],
  faq: [
    { question: "50대는 뉴케어 41g부터 봐야 하나요?", answer: "반드시 그렇진 않습니다. 처음이면 25g이나 워터처럼 부담이 낮은 쪽이 더 실용적일 수 있습니다." },
    { question: "50대에게 뉴케어가 자주 언급되는 이유는 무엇인가요?", answer: "고단백 보충과 락토프리 성격, 건강관리형 브랜드 이미지가 같이 묶이기 때문입니다." },
    { question: "하루에 한 병씩 마시기엔 어떤 라인이 무난한가요?", answer: "대체로 25g 쪽이 더 무난합니다. 워터형은 더 가볍고, 41g은 목적이 분명할 때 선택 이유가 더 강합니다." },
  ],
  relatedGuides: [
    { title: "50대 단백질 음료 가이드", href: "/guides/product-selection-comparison/protein-drink-for-50s", description: "뉴케어 외 브랜드까지 같이 봅니다." },
    { title: "뉴케어 vs 하이뮨", href: "/guides/product-selection-comparison/newcare-vs-hymune", description: "건강관리형 브랜드 비교로 이어집니다." },
    { title: "뉴케어 올프로틴 완전 분석", href: "/guides/product-selection-comparison/newcare-allprotein", description: "뉴케어 라인 전체를 다시 봅니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 올프로틴 25g 보기", slug: newcare25.slug },
    { label: "뉴케어 올프로틴 워터 보기", slug: newcareWater.slug },
    { label: "뉴케어 올프로틴 41g 보기", slug: newcare41.slug },
  ],
};
newcareFor50sConfig.jsonLd = [articleJsonLd(newcareFor50sConfig), faqJsonLd(newcareFor50sConfig)];

export const newcarePlantVsLactoseFreeConfig: ComparePageConfig = {
  slug: "newcare-plant-vs-lactosefree",
  title: "뉴케어 식물성 vs 셀렉스 락토프리 비교",
  description:
    "뉴케어 올프로틴 식물성과 셀렉스 락토프리 RTD를 단백질, 당류, 칼로리, 부담감 기준으로 비교합니다. 유당 부담이 있거나 식물성 단백질을 찾는 경우 어떤 쪽이 더 맞는지 정리했습니다.",
  keywords: ["뉴케어 식물성", "뉴케어 락토프리", "셀렉스 락토프리 비교", "유당 부담 단백질음료"],
  badge: "식물성·락토프리",
  readingTime: "4분 읽기",
  updatedAt: "2026-04-02",
  methodologyNote: "ProteinLab DB 뉴케어 식물성·셀렉스 락토프리 기준",
  intro:
    "뉴케어 검색 흐름에는 41g 고단백 외에도 식물성, 유당 부담, 부드러운 보충 같은 의도가 같이 섞입니다. 그래서 뉴케어 식물성과 셀렉스 락토프리를 같이 보면 숫자만이 아니라 어떤 상황에서 덜 부담스러운지 바로 구분할 수 있습니다.",
  summary: [
    "유당 부담을 줄이고 싶다면 두 제품 모두 후보가 되지만, 식물성 원료가 우선이면 뉴케어 식물성이 더 직접적입니다.",
    "일반적인 RTD 보충 감각과 익숙한 맛 흐름은 셀렉스 락토프리가 더 무난합니다.",
    "결국 핵심은 식물성 원료를 보느냐, 락토프리 우유 단백질을 보느냐입니다.",
  ],
  comparisonTitle: "뉴케어 식물성 vs 셀렉스 락토프리",
  comparisonColumns: ["뉴케어 식물성", "셀렉스 락토프리"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${newcarePlant.proteinPerServing}g`, `${sellexLactoseFree.proteinPerServing}g`] },
    { label: "용량", values: [newcarePlant.capacity ?? "-", sellexLactoseFree.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(newcarePlant), formatDensity(sellexLactoseFree)] },
    { label: "당류", values: [`${newcarePlant.sugar}g`, `${sellexLactoseFree.sugar}g`] },
    { label: "칼로리", values: [`${newcarePlant.calories}kcal`, `${sellexLactoseFree.calories}kcal`] },
    { label: "나트륨", values: [`${newcarePlant.sodium ?? "-"}mg`, `${sellexLactoseFree.sodium ?? "-"}mg`] },
    { label: "핵심 포인트", values: ["식물성 단백질", "락토프리 RTD"] },
  ]),
  sections: [
    {
      title: "핵심 차이",
      items: [
        { title: "뉴케어 식물성", body: "식물성 원료를 우선하는 흐름에 직접 맞는 SKU입니다. 유당 부담 회피보다 식물성 선택 자체가 중요한 경우에 더 선명합니다." },
        { title: "셀렉스 락토프리", body: "RTD 보충 음료 감각은 유지하면서 유당 부담만 덜고 싶은 경우에 자연스럽습니다. 익숙한 셀렉스 계열을 찾는 검색과도 잘 맞습니다." },
        { title: "검색 의도 분리", body: "둘 다 부담을 낮추는 방향으로 보이지만, 식물성과 락토프리는 목적이 완전히 같지 않습니다. 이 차이를 먼저 구분해야 선택이 빨라집니다." },
      ],
    },
    {
      title: "어떤 경우에 맞나",
      items: [
        { title: "식물성 우선", body: "원료 타입을 먼저 보는 경우에는 뉴케어 식물성이 더 직접적입니다. 브랜드 검색 뒤 세부 니즈를 좁히는 흐름에 맞습니다." },
        { title: "익숙한 RTD 보충", body: "맛과 섭취감에서 너무 낯선 방향을 피하고 싶다면 셀렉스 락토프리가 무난합니다." },
        { title: "처음 고르는 경우", body: "식물성 이유가 뚜렷하지 않다면 락토프리 RTD와 비교해 본 뒤 결정하는 편이 실수 확률이 낮습니다." },
      ],
    },
    {
      title: "같이 보면 좋은 흐름",
      items: [
        { title: "뉴케어 안에서 더 보기", body: "41g, 25g, 식물성, 워터까지 함께 보면 뉴케어 내부 선택지가 더 분명해집니다." },
        { title: "락토프리 축으로 더 보기", body: "브랜드보다 부담 기준이 더 중요하면 락토프리 전용 비교 가이드로 이어서 보는 편이 낫습니다." },
        { title: "보충 목적 다시 확인", body: "식물성 여부보다 실제 단백질 총량과 보충 목적이 더 중요할 수도 있습니다. 이 경우 41g·25g 비교로 돌아가는 흐름이 좋습니다." },
      ],
    },
  ],
  faq: [
    { question: "뉴케어 식물성은 락토프리 대체로 봐도 되나요?", answer: "일부 검색 흐름에서는 겹치지만 완전히 같은 축은 아닙니다. 식물성 원료 자체가 중요하면 뉴케어 식물성, 우유 단백질 RTD 감각을 유지하고 싶으면 셀렉스 락토프리가 더 맞습니다." },
    { question: "유당 부담만 줄이고 싶다면 어떤 쪽이 더 무난한가요?", answer: "보통은 셀렉스 락토프리가 더 무난합니다. 익숙한 RTD 보충 흐름을 크게 바꾸지 않기 때문입니다." },
    { question: "뉴케어 검색에서 이 페이지를 왜 같이 봐야 하나요?", answer: "뉴케어 브랜드 검색에는 41g 고단백뿐 아니라 식물성·부담감 관련 의도도 섞입니다. 이 페이지가 그 갈림길을 정리해 줍니다." },
  ],
  relatedGuides: [
    { title: "뉴케어 올프로틴 완전 분석", href: "/guides/product-selection-comparison/newcare-allprotein", description: "뉴케어 전체 흐름을 먼저 보고 싶다면 이 메인 가이드가 출발점입니다." },
    { title: "락토프리 단백질 음료 가이드", href: "/guides/product-selection-comparison/lactose-free-protein-drink", description: "브랜드보다 유당 부담 기준으로 다시 정리합니다." },
    { title: "뉴케어 41g vs 25g", href: "/guides/product-selection-comparison/newcare-41g-vs-25g", description: "식물성 대신 일반 뉴케어 라인업 비교가 필요하면 여기로 이어집니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 식물성 보기", slug: newcarePlant.slug },
    { label: "셀렉스 락토프리 보기", slug: sellexLactoseFree.slug },
  ],
};
newcarePlantVsLactoseFreeConfig.jsonLd = [
  articleJsonLd(newcarePlantVsLactoseFreeConfig),
  faqJsonLd(newcarePlantVsLactoseFreeConfig),
];

export const newcareWaterVsRtdConfig: ComparePageConfig = {
  slug: "newcare-water-vs-rtd",
  title: "뉴케어 단백질워터 vs 일반 RTD 가이드",
  description:
    "뉴케어 단백질워터와 일반 RTD 단백질음료를 용량, 단백질 밀도, 당류, 부담감 기준으로 비교합니다. 가볍게 마실 제품을 찾는지, 보충량이 더 중요한지 빠르게 정리했습니다.",
  keywords: ["뉴케어 단백질워터", "뉴케어 워터형", "뉴케어 RTD 비교", "단백질워터 vs RTD"],
  badge: "워터형 가이드",
  readingTime: "4분 읽기",
  updatedAt: "2026-04-02",
  methodologyNote: "ProteinLab DB 뉴케어 워터·일반 RTD 기준",
  intro:
    "뉴케어 단백질워터는 일반 RTD와 같은 선상에서 검색되지만 실제 체감은 꽤 다릅니다. 한 병으로 단백질을 크게 채우려는지, 가볍게 마시면서 부담을 낮추고 싶은지부터 분리하면 선택이 훨씬 빨라집니다.",
  summary: [
    "가볍게 마시는 흐름은 뉴케어 워터가 더 잘 맞습니다.",
    "단백질 총량과 보충 강도는 일반 RTD가 더 유리합니다.",
    "워터형은 대체재라기보다 별도 카테고리로 보는 편이 정확합니다.",
  ],
  comparisonTitle: "뉴케어 워터 vs 일반 RTD",
  comparisonColumns: ["뉴케어 워터", "뉴케어 25g", "셀렉스 프로핏"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${newcareWater.proteinPerServing}g`, `${newcare25.proteinPerServing}g`, `${sellex.proteinPerServing}g`] },
    { label: "용량", values: [newcareWater.capacity ?? "-", newcare25.capacity ?? "-", sellex.capacity ?? "-"] },
    { label: "100mL당 단백질", values: [formatDensity(newcareWater), formatDensity(newcare25), formatDensity(sellex)] },
    { label: "당류", values: [`${newcareWater.sugar}g`, `${newcare25.sugar}g`, `${sellex.sugar}g`] },
    { label: "칼로리", values: [`${newcareWater.calories}kcal`, `${newcare25.calories}kcal`, `${sellex.calories}kcal`] },
    { label: "보는 포인트", values: ["가벼움", "뉴케어 표준형", "일반 RTD 입문형"] },
  ]),
  sections: [
    {
      title: "워터형을 따로 봐야 하는 이유",
      items: [
        { title: "체감이 다름", body: "워터형은 일반 RTD보다 훨씬 가볍게 느껴집니다. 그래서 단백질 총량보다 마시기 편한지가 먼저 중요해집니다." },
        { title: "직접 대체가 아님", body: "한 병 단위 보충량은 일반 RTD가 더 낫습니다. 워터형을 같은 축에서만 보면 기대치가 어긋날 수 있습니다." },
        { title: "검색 의도도 다름", body: "뉴케어 워터 검색은 '가볍게 마실 수 있나' 쪽이 강하고, 일반 RTD 검색은 '얼마나 채워지나' 쪽이 강합니다." },
      ],
    },
    {
      title: "어떤 경우에 맞나",
      items: [
        { title: "워터형이 맞는 경우", body: "무거운 보충 음료가 부담스럽고, 마시는 편의성이 가장 중요할 때입니다." },
        { title: "25g가 맞는 경우", body: "뉴케어 브랜드 안에서 조금 더 표준적인 RTD를 찾는 흐름이라면 25g가 중간 지점 역할을 합니다." },
        { title: "셀렉스 프로핏이 맞는 경우", body: "브랜드를 넓혀서 일반 RTD 입문형까지 비교하고 싶다면 셀렉스 쪽이 기준점이 됩니다." },
      ],
    },
    {
      title: "다음 비교 흐름",
      items: [
        { title: "뉴케어 안에서 더 좁히기", body: "워터가 맞는지, 25g가 맞는지, 41g까지 필요한지 한 번 더 줄여 볼 수 있습니다." },
        { title: "일반 RTD로 넓히기", body: "워터형보다 보충량이 중요해 보이면 셀렉스·하이뮨 같은 일반 RTD 비교로 넘어가는 편이 낫습니다." },
        { title: "50대·부담감 기준으로 보기", body: "가벼움이 핵심이면 50대용 가이드나 락토프리/식물성 축과 같이 보는 것도 도움이 됩니다." },
      ],
    },
  ],
  faq: [
    { question: "뉴케어 단백질워터는 일반 RTD 대신으로 보면 되나요?", answer: "완전한 대체재로 보기보다는 별도 카테고리로 보는 편이 정확합니다. 마시는 체감과 기대하는 보충량이 다르기 때문입니다." },
    { question: "보충량이 더 중요하면 어떤 쪽이 맞나요?", answer: "보통은 뉴케어 25g이나 셀렉스 프로핏 같은 일반 RTD가 더 맞습니다." },
    { question: "뉴케어 검색이 많은데 워터형 페이지가 필요한 이유는 뭔가요?", answer: "브랜드 검색 안에서도 41g 고단백, 표준형 RTD, 워터형이 서로 다른 의도를 가집니다. 이 분기가 콘텐츠로 정리돼야 검색 유입을 놓치지 않습니다." },
  ],
  relatedGuides: [
    { title: "뉴케어 단백질워터 가이드", href: "/guides/product-selection-comparison/newcare-protein-water-guide", description: "워터형 자체를 더 자세히 읽고 싶다면 이 페이지로 이어집니다." },
    { title: "뉴케어 41g vs 25g", href: "/guides/product-selection-comparison/newcare-41g-vs-25g", description: "워터가 아니라 표준형·고단백형 비교가 필요하면 여기로 이동합니다." },
    { title: "단백질 음료 입문 가이드", href: "/guides/product-selection-comparison/protein-drink-guide", description: "브랜드를 넓혀 일반 RTD 전체 기준으로 다시 봅니다." },
  ],
  purchaseLinks: [
    { label: "뉴케어 워터 보기", slug: newcareWater.slug },
    { label: "뉴케어 25g 보기", slug: newcare25.slug },
    { label: "셀렉스 프로핏 보기", slug: sellex.slug },
  ],
};
newcareWaterVsRtdConfig.jsonLd = [articleJsonLd(newcareWaterVsRtdConfig), faqJsonLd(newcareWaterVsRtdConfig)];

export const proteinDrinkByContentConfig: ComparePageConfig = {
  slug: "protein-drink-by-content",
  title: "단백질 음료 함량대별 완전 정리",
  description: "단백질 음료를 20g 미만, 20g대, 30g대, 40g 이상으로 나눠 어떤 사람이 어떤 함량대를 고르면 되는지 정리했습니다.",
  keywords: ["단백질 음료 함량 비교", "단백질 음료 몇g", "단백질 음료 20g 30g 차이", "단백질 음료 함량대"],
  badge: "허브 가이드",
  readingTime: "6분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 함량대 분류 기준",
  intro: "단백질 음료는 9g부터 43g까지 범위가 크게 벌어져 있어서 브랜드만 보고 고르면 맞지 않는 제품을 고르기 쉽습니다. 실제로는 운동량, 식사 보완 여부, 다이어트 여부에 따라 적합한 함량대가 달라집니다.",
  summary: [
    "20g 미만은 식사 보완형, 20g대는 시장 주류, 30g대부터는 고함량, 40g 이상은 집중 보충형으로 읽는 것이 가장 쉽습니다.",
    "함량이 높을수록 항상 좋은 것은 아닙니다. 칼로리와 포만감도 같이 올라갑니다.",
    "입문자는 보통 20g대부터, 유당불내증 고단백 수요는 뉴케어 41g처럼 예외 케이스를 같이 보는 편이 좋습니다.",
  ],
  comparisonTitle: "함량대별 핵심 비교표",
  comparisonColumns: ["20g 미만", "20~29g", "30~39g", "40g 이상"],
  comparisonRows: buildComparisonRows([
    { label: "대표 제품", values: [hymuneBalance.name, sellex.name, danbaekDarkChoco.name, takefitMonster.name] },
    { label: "단백질", values: [`${hymuneBalance.proteinPerServing}g`, `${sellex.proteinPerServing}g`, `${danbaekDarkChoco.proteinPerServing}g`, `${takefitMonster.proteinPerServing}g`] },
    { label: "칼로리", values: [`${hymuneBalance.calories}kcal`, `${sellex.calories}kcal`, `${danbaekDarkChoco.calories}kcal`, `${takefitMonster.calories}kcal`] },
    { label: "당류", values: [`${hymuneBalance.sugar}g`, `${sellex.sugar}g`, `${danbaekDarkChoco.sugar}g`, `${takefitMonster.sugar}g`] },
    { label: "적합 목적", values: ["식사 보완·시니어", "다이어트·일반 운동", "고강도 운동", "집중 보충"] },
  ]),
  sections: [
    {
      title: "20g 미만",
      items: [
        { title: "대표 제품", body: "하이뮨 프로틴 밸런스 10g, 마이밀 뉴프로틴 9g 같은 제품이 이 구간입니다. 단백질 자체보다 식사 보완과 일상 영양 쪽에 가깝습니다." },
        { title: "잘 맞는 사람", body: "운동보다 건강관리, 식사 사이 보완, 시니어층에게 더 잘 맞습니다." },
        { title: "주의할 점", body: "단백질 보충용으로 기대하면 부족하게 느껴질 수 있습니다. 운동 후 한 병으로 끝내려는 용도와는 거리가 있습니다." },
      ],
    },
    {
      title: "20~29g",
      items: [
        { title: "시장 주류", body: "셀렉스 프로핏, 하이뮨 액티브, 테이크핏 맥스, 더단백 드링크 같은 제품이 여기에 몰려 있습니다." },
        { title: "잘 맞는 사람", body: "일반 운동, 체중 관리, 단백질 음료 입문자에게 가장 무난합니다." },
        { title: "왜 가장 대중적인가", body: "단백질, 칼로리, 음용감이 가장 균형적이기 때문입니다. 편의점 주류 라인도 대부분 이 구간입니다." },
      ],
    },
    {
      title: "30~39g",
      items: [
        { title: "아직 적지만 의미 있는 구간", body: "더단백 다크초코 35g처럼 중간 고단백 제품이 여기 들어갑니다. 40g까지는 부담스럽지만 고함량이 필요한 사람에게 맞습니다." },
        { title: "잘 맞는 사람", body: "고강도 운동이나 식사량이 적은 날의 집중 보충용으로 괜찮습니다." },
        { title: "읽는 방법", body: "이 구간부터는 단백질 함량만큼 칼로리와 음용 피로도도 같이 보아야 합니다." },
      ],
    },
    {
      title: "40g 이상",
      items: [
        { title: "대표 제품", body: "테이크핏 몬스터 43g, 뉴케어 올프로틴 41g, 닥터유 40g이 대표적입니다." },
        { title: "잘 맞는 사람", body: "하루 단백질을 한 번에 크게 채우고 싶은 사람, 고강도 운동 사용자에게 적합합니다." },
        { title: "예외 포인트", body: "뉴케어 41g은 락토프리라 같은 40g대 안에서도 성격이 다릅니다. 고단백이면서 유당 부담을 낮추고 싶을 때 예외적으로 우선순위가 올라갑니다." },
      ],
    },
    {
      title: "함량대별로 가장 많이 하는 실수",
      items: [
        { title: "20g 미만을 운동용으로 고르기", body: "식사 보완형을 운동 후 보충용으로 고르면 단백질이 부족하게 느껴질 수 있습니다. 이 구간은 일상 보완용에 더 가깝습니다." },
        { title: "처음인데 바로 40g대로 가기", body: "입문자에게는 맛, 포만감, 칼로리 부담이 동시에 커질 수 있습니다. 대개는 20g대에서 시작하는 편이 안정적입니다." },
        { title: "함량만 높으면 무조건 좋다고 생각하기", body: "실제 선택에서는 칼로리, 당류, 용량, 맛 피로도까지 같이 봐야 합니다. 목적과 맞는 함량이 가장 좋은 함량입니다." },
      ],
    },
  ],
  faq: [
    { question: "운동 안 하는데도 40g대 제품이 필요한가", answer: "대부분은 그렇지 않습니다. 일반 건강관리나 가벼운 운동 수준이라면 20g 미만 또는 20g대가 더 적합한 경우가 많습니다." },
    { question: "입문자는 몇 g부터 시작하는 게 좋나", answer: "보통은 20g대가 가장 무난합니다. 40g대는 맛과 포만감, 칼로리 부담이 커질 수 있습니다." },
    { question: "유당불내증인데 고단백을 원하면 어떤 함량대를 봐야 하나", answer: "40g 이상 중에서는 뉴케어 올프로틴 41g이 대표적입니다. 락토프리라서 예외적으로 먼저 볼 가치가 있습니다." },
  ],
  relatedGuides: [
    { title: "단백질 음료 40g 이상 3종 비교", href: "/guides/product-selection-comparison/high-protein-40g-comparison", description: "40g대 대표 제품만 다시 비교합니다." },
    { title: "단백질 음료 100mL당 단백질 순위", href: "/guides/product-selection-comparison/protein-density-ranking", description: "함량이 아니라 밀도 기준으로도 읽어봅니다." },
    { title: "뉴케어 올프로틴 완전 분석", href: "/guides/product-selection-comparison/newcare-allprotein", description: "40g 이상 구간의 예외 케이스를 따로 분석합니다." },
  ],
  purchaseLinks: [
    { label: "하이뮨 프로틴 밸런스 보기", slug: hymuneBalance.slug },
    { label: "셀렉스 프로핏 보기", slug: sellex.slug },
    { label: "더단백 다크초코 보기", slug: danbaekDarkChoco.slug },
    { label: "테이크핏 몬스터 보기", slug: takefitMonster.slug },
  ],
};
proteinDrinkByContentConfig.jsonLd = [articleJsonLd(proteinDrinkByContentConfig), faqJsonLd(proteinDrinkByContentConfig)];

export const takefitVsHimuneConfig: ComparePageConfig = {
  slug: "takefit-vs-himune",
  title: "테이크핏 vs 하이뮨 비교 (2026)",
  description: "테이크핏 맥스와 하이뮨 액티브를 단백질, 당류, 칼로리, 지방, 나트륨 기준으로 직접 비교합니다.",
  keywords: ["테이크핏 하이뮨 비교", "테이크핏 vs 하이뮨", "테이크핏 하이뮨 차이"],
  badge: "브랜드 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 대표 RTD 기준",
  intro: "테이크핏과 하이뮨은 모두 편의점에서 자주 보이지만 결은 꽤 다릅니다. 테이크핏 맥스는 저당·고밀도 쪽이고, 하이뮨 액티브는 건강관리형 일상 RTD 쪽에 더 가깝습니다.",
  summary: [
    "저당·고밀도 쪽은 테이크핏 맥스가 더 강합니다.",
    "산양유 이미지와 일상형 부담은 하이뮨 액티브 쪽이 더 직관적입니다.",
    "고단백 집중 보충까지 보려면 테이크핏 안에서는 맥스보다 몬스터로 올라가야 합니다.",
  ],
  comparisonTitle: "핵심 비교표",
  comparisonColumns: ["테이크핏 맥스", "하이뮨 액티브"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${takefitMax.proteinPerServing}g`, `${hymuneOriginal.proteinPerServing}g`] },
    { label: "칼로리", values: [`${takefitMax.calories}kcal`, `${hymuneOriginal.calories}kcal`] },
    { label: "당류", values: [`${takefitMax.sugar}g`, `${hymuneOriginal.sugar}g`] },
    { label: "지방", values: [`${takefitMax.fat ?? "-"}g`, `${hymuneOriginal.fat ?? "-"}g`] },
    { label: "나트륨", values: [`${takefitMax.sodium ?? "-"}mg`, `${hymuneOriginal.sodium ?? "-"}mg`] },
    { label: "100mL당 단백질", values: [formatDensity(takefitMax), formatDensity(hymuneOriginal)] },
    { label: "단백질 원료 해석", values: ["고밀도 보충형", "산양유 이미지·일상형"] },
  ]),
  sections: [
    {
      title: "결정적 차이",
      items: [
        { title: "단백질 밀도", body: "테이크핏 맥스가 24g, 9.6g/100mL로 더 강합니다. 같은 한 병을 마셔도 단백질 체감이 더 분명합니다." },
        { title: "칼로리·당류", body: "현재 대표 SKU 기준으로는 테이크핏 맥스가 106kcal, 당류 0.7g이고 하이뮨 액티브 오리지널은 130kcal, 당류 4g입니다." },
        { title: "브랜드 결", body: "테이크핏은 퍼포먼스형, 하이뮨은 건강관리형 이미지가 더 강합니다. 수치보다 사용 맥락 차이가 큽니다." },
      ],
    },
    {
      title: "목적별 최종 추천",
      items: [
        { title: "당·칼로리 관리", body: "테이크핏 맥스가 낫습니다. 저당·고밀도라 다이어트와 운동 병행에 더 잘 맞습니다." },
        { title: "소화 부담과 일상 루틴", body: "하이뮨 쪽이 더 편하게 느껴질 수 있습니다. 건강관리형 이미지와 맛 폭도 강점입니다." },
        { title: "고단백 집중", body: "이 경우에는 맥스가 아니라 테이크핏 몬스터까지 같이 보는 편이 맞습니다." },
      ],
    },
    {
      title: "선택을 더 쉽게 하는 기준",
      items: [
        { title: "운동 중심이면 테이크핏", body: "숫자와 포지셔닝이 모두 운동 보충에 맞춰져 있습니다." },
        { title: "일상 건강관리면 하이뮨", body: "브랜드 메시지와 제품 경험 모두 일상형에 가깝습니다." },
        { title: "둘 다 애매하면 라인업 페이지로 올라가기", body: "브랜드 하나만 보고 고르기보다 라인업 전체를 보면 훨씬 쉬워집니다." },
      ],
    },
    {
      title: "이 비교가 특히 필요한 사람",
      items: [
        { title: "하이뮨이 익숙하지만 숫자가 아쉬운 사람", body: "이 경우 테이크핏 맥스로 옮기면 왜 수치 차이가 체감되는지 바로 이해할 수 있습니다." },
        { title: "테이크핏이 부담스럽고 조금 더 일상형을 찾는 사람", body: "이 경우 하이뮨 액티브가 더 적합할 수 있습니다. 브랜드 결 자체가 다르기 때문입니다." },
        { title: "브랜드보다 용도를 먼저 정하고 싶은 사람", body: "테이크핏 vs 하이뮨은 사실 운동형과 건강관리형 비교에 더 가깝습니다. 이 프레임으로 보면 결정이 빨라집니다." },
      ],
    },
  ],
  faq: [
    { question: "다이어트 중이면 어느 쪽이 낫나", answer: "ProteinLab DB 대표 SKU 기준으로는 테이크핏 맥스가 더 유리합니다. 칼로리와 당류가 더 낮고 단백질 밀도는 더 높습니다." },
    { question: "하이뮨은 왜 계속 비교 대상이 되나", answer: "수치만이 아니라 산양유와 건강관리형 이미지가 강해서 일상형 RTD를 찾는 사용자에게 계속 선택지로 올라오기 때문입니다." },
    { question: "고단백까지 원하면 무엇을 봐야 하나", answer: "테이크핏 안에서는 맥스보다 몬스터를 같이 봐야 합니다. 하이뮨과는 결이 달라집니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 테이크핏 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", description: "대표 3파전 비교 페이지입니다." },
    { title: "테이크핏 제품 종류 전체 정리", href: "/guides/product-selection-comparison/takefit-lineup", description: "테이크핏 맥스·몬스터·프로 차이를 따로 봅니다." },
    { title: "하이뮨 제품 종류 전체 정리", href: "/guides/product-selection-comparison/himune-lineup", description: "하이뮨 라인업 차이를 따로 봅니다." },
  ],
  purchaseLinks: [
    { label: "테이크핏 맥스 보기", slug: takefitMax.slug },
    { label: "하이뮨 액티브 보기", slug: hymuneOriginal.slug },
  ],
};
takefitVsHimuneConfig.jsonLd = [articleJsonLd(takefitVsHimuneConfig), faqJsonLd(takefitVsHimuneConfig)];

export const danbaekVsSelexsConfig: ComparePageConfig = {
  slug: "danbaek-vs-selexs",
  title: "더단백 vs 셀렉스 비교",
  description: "더단백 드링크와 셀렉스 프로핏 대표 제품을 칼로리, 당류, 지방, 나트륨 기준으로 직접 비교합니다.",
  keywords: ["더단백 셀렉스 비교", "더단백 vs 셀렉스", "빙그레 단백질 매일유업 단백질"],
  badge: "브랜드 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 대표 RTD 기준",
  intro: "더단백과 셀렉스는 둘 다 20g대 대표 RTD지만 결이 다릅니다. 셀렉스는 저칼로리와 대중성이 강점이고, 더단백은 저나트륨과 깔끔한 설계가 가장 먼저 눈에 들어옵니다.",
  summary: [
    "저칼로리 쪽은 셀렉스 프로핏 웨이프로틴이 약간 더 가볍습니다.",
    "나트륨은 더단백이 압도적으로 낮아서 저염 관점에서는 더단백이 분명합니다.",
    "둘 다 20g급이라 큰 그림은 비슷하지만, 실제 차이는 나트륨과 음용감에서 갈립니다.",
  ],
  comparisonTitle: "핵심 비교표",
  comparisonColumns: ["더단백 드링크", "셀렉스 프로핏"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${danbaekDrinkChoco.proteinPerServing}g`, `${sellexProfitSports.proteinPerServing}g`] },
    { label: "칼로리", values: [`${danbaekDrinkChoco.calories}kcal`, `${sellexProfitSports.calories}kcal`] },
    { label: "당류", values: [`${danbaekDrinkChoco.sugar}g`, `${sellexProfitSports.sugar}g`] },
    { label: "지방", values: [`${danbaekDrinkChoco.fat ?? "-"}g`, `${sellexProfitSports.fat ?? "-"}g`] },
    { label: "나트륨", values: [`${danbaekDrinkChoco.sodium ?? "-"}mg`, `${sellexProfitSports.sodium ?? "-"}mg`] },
    { label: "100mL당 단백질", values: [formatDensity(danbaekDrinkChoco), formatDensity(sellexProfitSports)] },
    { label: "대표 이미지", values: ["저나트륨·안정형", "저칼로리·대중형"] },
  ]),
  sections: [
    {
      title: "결정적 차이",
      items: [
        { title: "나트륨", body: "더단백 드링크 초콜릿은 30mg으로 매우 낮습니다. 셀렉스 프로핏 웨이프로틴 초콜릿은 380mg이라 저염 관점에서는 차이가 큽니다." },
        { title: "칼로리", body: "셀렉스 프로핏 웨이프로틴은 99kcal라 더 가볍습니다. 다이어트 관점에서는 이 점이 바로 보입니다." },
        { title: "음용감", body: "더단백은 무난하고 담백한 쪽, 셀렉스는 보다 스포츠 보충형 이미지가 강합니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "저칼로리 우선", body: "셀렉스 프로핏 웨이프로틴이 더 낫습니다. 20g급에서 99kcal는 여전히 강점입니다." },
        { title: "저나트륨·저염", body: "더단백이 확실합니다. 혈압이나 나트륨 섭취를 신경 쓸 때 차이가 크게 느껴집니다." },
        { title: "무난한 일상 보충", body: "둘 다 가능하지만, 짜지 않고 편하게 가려면 더단백 쪽이 더 직관적입니다." },
      ],
    },
    {
      title: "이 비교를 어떻게 읽으면 좋은가",
      items: [
        { title: "숫자 우선이면 더단백", body: "저염, 저당, 낮은 지방처럼 라벨에서 바로 보이는 장점은 더단백 쪽이 더 분명합니다." },
        { title: "브랜드 친숙함과 스포츠 이미지면 셀렉스", body: "셀렉스는 유통 인지도와 운동 보충형 이미지가 강해 첫 선택에서 심리적 장벽이 낮습니다." },
        { title: "한 번에 결론이 안 나면 라인업으로 올라가기", body: "더단백은 저나트륨 축, 셀렉스는 라인 다양성 축이 강합니다. 그래서 브랜드 비교 뒤에는 라인업 페이지로 이어보는 편이 좋습니다." },
      ],
    },
  ],
  faq: [
    { question: "더단백과 셀렉스 중 다이어트에는 어느 쪽이 낫나", answer: "칼로리만 보면 셀렉스 프로핏 웨이프로틴이 더 가볍습니다. 다만 나트륨까지 신경 쓰면 더단백이 더 나을 수 있습니다." },
    { question: "저염이 중요한 사람에게는 무엇이 낫나", answer: "더단백입니다. 대표 초코 SKU 기준으로 나트륨 차이가 매우 큽니다." },
    { question: "둘 다 20g대인데 왜 비교하나", answer: "같은 20g대라도 칼로리, 나트륨, 음용감이 다르기 때문입니다. 실제 선택에서는 이 차이가 더 크게 느껴집니다." },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "셀렉스를 다른 대표 브랜드와도 비교합니다." },
    { title: "셀렉스 제품 종류 전체 정리", href: "/guides/product-selection-comparison/selexs-lineup", description: "셀렉스 라인업 전체 차이를 따로 봅니다." },
    { title: "더단백 제품 종류 전체 정리", href: "/guides/product-selection-comparison/danbaek-lineup", description: "더단백 라인업 전체 차이를 따로 봅니다." },
  ],
  purchaseLinks: [
    { label: "더단백 드링크 보기", slug: danbaekDrinkChoco.slug },
    { label: "셀렉스 프로핏 보기", slug: sellexProfitSports.slug },
  ],
};
danbaekVsSelexsConfig.jsonLd = [articleJsonLd(danbaekVsSelexsConfig), faqJsonLd(danbaekVsSelexsConfig)];

export const danbaekVsHimuneConfig: ComparePageConfig = {
  slug: "danbaek-vs-himune",
  title: "더단백 vs 하이뮨 비교",
  description: "더단백 드링크와 하이뮨 액티브를 칼로리, 당류, 지방, 나트륨, 브랜드 포지셔닝 기준으로 직접 비교합니다.",
  keywords: ["더단백 하이뮨 비교", "더단백 vs 하이뮨 차이"],
  badge: "브랜드 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 대표 RTD 기준",
  intro: "더단백과 하이뮨은 둘 다 일상형 단백질 음료로 자주 비교되지만 숫자는 꽤 다릅니다. 더단백은 저나트륨·저칼로리 설계가 강하고, 하이뮨은 산양유 건강관리형 이미지가 강합니다.",
  summary: [
    "칼로리, 당류, 지방, 나트륨은 더단백이 더 낮습니다.",
    "하이뮨은 산양유와 건강관리형 메시지가 강해서 일상 보완용으로 읽히기 쉽습니다.",
    "숫자 우선이면 더단백, 브랜드 결을 중시하면 하이뮨으로 정리하면 빠릅니다.",
  ],
  comparisonTitle: "핵심 비교표",
  comparisonColumns: ["더단백 드링크", "하이뮨 액티브"],
  comparisonRows: buildComparisonRows([
    { label: "단백질", values: [`${danbaekDrinkChoco.proteinPerServing}g`, `${hymuneOriginal.proteinPerServing}g`] },
    { label: "칼로리", values: [`${danbaekDrinkChoco.calories}kcal`, `${hymuneOriginal.calories}kcal`] },
    { label: "당류", values: [`${danbaekDrinkChoco.sugar}g`, `${hymuneOriginal.sugar}g`] },
    { label: "지방", values: [`${danbaekDrinkChoco.fat ?? "-"}g`, `${hymuneOriginal.fat ?? "-"}g`] },
    { label: "나트륨", values: [`${danbaekDrinkChoco.sodium ?? "-"}mg`, `${hymuneOriginal.sodium ?? "-"}mg`] },
    { label: "브랜드 이미지", values: ["저나트륨·가벼움", "산양유·건강관리"] },
  ]),
  sections: [
    {
      title: "결정적 차이",
      items: [
        { title: "숫자만 보면 더단백 우위", body: "대표 초코 SKU 기준으로 더단백은 105kcal, 당류 0.8g, 지방 0.6g, 나트륨 30mg입니다. 하이뮨 액티브 오리지널보다 전반적으로 더 낮습니다." },
        { title: "하이뮨은 결이 다르다", body: "하이뮨은 산양유 이미지와 건강관리형 포지셔닝이 강합니다. 그래서 숫자만으로 설명되지 않는 선호가 있습니다." },
        { title: "일상형 RTD 안에서도 포지션이 다르다", body: "더단백은 저염·가벼움, 하이뮨은 건강관리·브랜드 신뢰 쪽이 더 강합니다." },
      ],
    },
    {
      title: "목적별 최종 추천",
      items: [
        { title: "저칼로리·저나트륨", body: "더단백이 낫습니다. 숫자로 보면 방향이 명확합니다." },
        { title: "속 편한 이미지와 브랜드 선호", body: "하이뮨이 더 맞을 수 있습니다. 특히 중장년 건강관리 프레임에서는 그렇습니다." },
        { title: "가격까지 같이 보고 싶을 때", body: "프로모션 변동이 커서 구매 직전 가격 확인이 필요합니다. 기본 포지션은 영양 기준으로 먼저 좁히는 편이 좋습니다." },
      ],
    },
    {
      title: "실제 선택에서 갈리는 포인트",
      items: [
        { title: "숫자 비교로 끝내면 더단백", body: "칼로리, 당류, 지방, 나트륨 기준으로 보면 더단백은 매우 깔끔합니다. 그래서 빠른 결론은 더단백 쪽으로 나기 쉽습니다." },
        { title: "브랜드 메시지를 중요하게 보면 하이뮨", body: "하이뮨은 산양유와 건강관리 이미지를 함께 사는 선택에 가깝습니다. 이 부분이 중요하면 숫자 차이를 감수할 수 있습니다." },
        { title: "중장년 가족용인지 본인 운동용인지 구분하기", body: "가족 건강관리나 부모님용이면 하이뮨 쪽이 더 자연스럽고, 본인 운동 루틴이면 더단백 쪽이 더 직관적일 수 있습니다." },
      ],
    },
  ],
  faq: [
    { question: "숫자만 보면 어느 쪽이 더 좋은가", answer: "대표 초코 기준으로는 더단백이 더 낮은 칼로리, 당류, 지방, 나트륨을 보여줍니다." },
    { question: "하이뮨은 왜 여전히 선택할 이유가 있나", answer: "산양유와 건강관리형 브랜드 이미지, 다양한 맛, 중장년 친화적 포지셔닝 때문입니다." },
    { question: "다이어트 중이면 어느 쪽이 낫나", answer: "일반적으로는 더단백이 더 유리합니다. 다만 개인 취향과 포만감 선호는 같이 보아야 합니다." },
  ],
  relatedGuides: [
    { title: "하이뮨 제품 종류 전체 정리", href: "/guides/product-selection-comparison/himune-lineup", description: "하이뮨 라인업 전체를 따로 봅니다." },
    { title: "셀렉스 vs 하이뮨 비교", href: "/guides/product-selection-comparison/selex-vs-himune", description: "하이뮨을 다른 대표 브랜드와도 비교합니다." },
    { title: "더단백 vs 셀렉스 비교", href: "/guides/product-selection-comparison/danbaek-vs-selexs", description: "더단백을 셀렉스와도 직접 비교합니다." },
  ],
  purchaseLinks: [
    { label: "더단백 드링크 보기", slug: danbaekDrinkChoco.slug },
    { label: "하이뮨 액티브 보기", slug: hymuneOriginal.slug },
  ],
};
danbaekVsHimuneConfig.jsonLd = [articleJsonLd(danbaekVsHimuneConfig), faqJsonLd(danbaekVsHimuneConfig)];

export const dryouLineupConfig: ComparePageConfig = {
  slug: "dryou-lineup",
  title: "닥터유 제품 종류 전체 정리",
  description: "닥터유 PRO 단백질 드링크와 40g 라인업을 중심으로 어떤 제품이 어떤 목적에 맞는지 정리했습니다.",
  keywords: ["닥터유 단백질 종류", "닥터유PRO 라인업", "닥터유 프로틴 차이"],
  badge: "브랜드 라인업",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 음료 중심 정리",
  intro: "닥터유는 맛 완성도를 앞세운 고단백 라인업이 특징입니다. 일반 프로 단백질 드링크 24g 라인과 40g 고단백 라인이 분리돼 있어, 입문용인지 집중 보충용인지부터 나눠 보는 편이 가장 정확합니다.",
  summary: [
    "닥터유는 24g 일반 라인과 40g 고단백 라인이 뚜렷하게 나뉩니다.",
    "맛으로 시작하려면 24g 라인, 함량을 바로 끌어올리려면 40g 라인으로 보면 됩니다.",
    "같은 브랜드 안에서도 초코와 딸기, 바나나처럼 맛별 체감 차이가 꽤 큽니다.",
  ],
  comparisonTitle: "닥터유 라인업 비교표",
  comparisonColumns: ["프로 단백질 드링크", "프로 단백질 드링크 40g", "프로 단백질 드링크 40g 딸기"],
  comparisonRows: buildComparisonRows([
    { label: "대표 제품", values: [dryouChoco.name, dryou40.name, dryou40Strawberry.name] },
    { label: "형태", values: ["RTD 밀크형", "RTD 밀크형", "RTD 밀크형"] },
    { label: "단백질", values: [`${dryouChoco.proteinPerServing}g`, `${dryou40.proteinPerServing}g`, `${dryou40Strawberry.proteinPerServing}g`] },
    { label: "칼로리", values: [`${dryouChoco.calories}kcal`, `${dryou40.calories}kcal`, `${dryou40Strawberry.calories}kcal`] },
    { label: "당류", values: [`${dryouChoco.sugar}g`, `${dryou40.sugar}g`, `${dryou40Strawberry.sugar}g`] },
    { label: "특징", values: ["24g 입문형", "40g 초코", "40g 딸기"] },
    { label: "추천 목적", values: ["맛 중심 입문", "고단백 집중", "맛 변화가 필요한 40g대"] },
  ]),
  sections: [
    {
      title: "닥터유 핵심 특징",
      items: [
        { title: "맛 완성도", body: "오리온 브랜드 특성상 초코우유처럼 익숙한 맛 방향이 강합니다. 그래서 40g대 입문 장벽을 낮추는 데 강점이 있습니다." },
        { title: "24g와 40g의 이중 구조", body: "일반 24g 라인은 입문자와 일상 보충용, 40g 라인은 집중 보충용으로 읽는 편이 맞습니다." },
        { title: "맛 변형으로 확장", body: "초코뿐 아니라 딸기, 바나나 등 맛 확장이 있어 같은 브랜드 안에서도 선택 폭이 있습니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "맛있게 시작하고 싶을 때", body: "24g 초콜릿 라인이 가장 무난합니다. 단백질 함량은 충분하면서 40g대보다 부담이 적습니다." },
        { title: "한 병으로 크게 채우고 싶을 때", body: "40g 초코가 기준점입니다. 다만 258kcal, 지방 6.5g은 같이 감수해야 합니다." },
        { title: "40g대에서 맛 변화를 주고 싶을 때", body: "딸기 40g이 대안입니다. 초코에 피로가 올 때 비교적 자연스럽게 이동할 수 있습니다." },
      ],
    },
    {
      title: "닥터유를 고를 때 놓치기 쉬운 점",
      items: [
        { title: "24g와 40g을 같은 카테고리로 보면 안 된다", body: "둘 다 닥터유지만 입문 난이도와 사용 장면이 완전히 다릅니다. 일반 드링크는 일상형, 40g은 집중형으로 나눠 봐야 합니다." },
        { title: "맛 장점은 있지만 숫자까지 가벼운 건 아니다", body: "특히 40g 라인은 맛 만족도와 맞바꿔 칼로리와 지방이 올라갑니다. 이 부분을 감수할 수 있는지 먼저 봐야 합니다." },
        { title: "닥터유의 진짜 강점은 40g대 진입장벽 완화", body: "운동용 초고단백이 필요하지만 밀크형 RTD가 싫지 않은 사람에게 특히 잘 맞습니다. 이 포지션을 이해하면 선택이 빨라집니다." },
      ],
    },
  ],
  faq: [
    { question: "닥터유에서 가장 무난한 첫 제품은 무엇인가", answer: "대체로 24g 초콜릿 라인이 가장 무난합니다. 40g 라인보다 부담이 적고 맛 만족도가 높습니다." },
    { question: "닥터유 40g은 누가 마시기 좋나", answer: "고단백을 원하지만 맛 때문에 40g대가 부담스러웠던 사람에게 잘 맞습니다." },
    { question: "닥터유는 왜 40g대에서도 계속 언급되나", answer: "테이크핏이나 뉴케어와 달리 맛 중심 차별점이 뚜렷하기 때문입니다." },
  ],
  relatedGuides: [
    { title: "닥터유 40g vs 테이크핏 몬스터 43g", href: "/guides/product-selection-comparison/doctoru-40g-vs-takefit-monster-43g", description: "닥터유 40g 라인을 가장 직접적으로 비교한 페이지입니다." },
    { title: "단백질 음료 40g 이상 3종 비교", href: "/guides/product-selection-comparison/high-protein-40g-comparison", description: "뉴케어까지 포함한 상위 비교입니다." },
    { title: "단백질 음료 함량대별 완전 정리", href: "/guides/product-selection-comparison/protein-drink-by-content", description: "닥터유가 어떤 함량대에 속하는지 큰 그림에서 다시 봅니다." },
  ],
  purchaseLinks: [
    { label: "닥터유 프로 단백질 드링크 보기", slug: dryouChoco.slug },
    { label: "닥터유 40g 초코 보기", slug: dryou40.slug },
    { label: "닥터유 40g 딸기 보기", slug: dryou40Strawberry.slug },
  ],
};
dryouLineupConfig.jsonLd = [articleJsonLd(dryouLineupConfig), faqJsonLd(dryouLineupConfig)];

export const danbaekLineupConfig: ComparePageConfig = {
  slug: "danbaek-lineup",
  title: "더단백 제품 종류 전체 정리",
  description: "더단백 드링크, 다크초코, 더블초코, 워터 프로틴 라인업을 저나트륨 강점 중심으로 정리합니다.",
  keywords: ["더단백 종류", "더단백 라인업", "더단백 더블초코 차이", "더단백 저나트륨"],
  badge: "브랜드 라인업",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 음료 중심 정리",
  intro: "더단백은 조용하지만 숫자가 깔끔한 브랜드입니다. 20g대 일반 드링크, 35g 다크초코, 40g 더블초코, 워터형까지 갖추고 있어서 저나트륨과 가벼운 설계를 축으로 확장하고 있습니다.",
  summary: [
    "더단백의 핵심 차별점은 낮은 나트륨과 무난한 수치입니다.",
    "일반 보충은 20g 드링크, 고단백은 다크초코와 더블초코, 가볍게는 워터 프로틴으로 정리하면 쉽습니다.",
    "더단백은 비교 페이지에서 숫자로 강하고, 라인업을 보면 그 방향성이 더 분명하게 보입니다.",
  ],
  comparisonTitle: "더단백 라인업 비교표",
  comparisonColumns: ["드링크 20g", "다크초코 35g", "더블초코 40g", "워터 프로틴"],
  comparisonRows: buildComparisonRows([
    { label: "대표 제품", values: [danbaekDrinkChoco.name, danbaekDarkChoco.name, danbaekDoubleChoco.name, danbaekWaterApple.name] },
    { label: "형태", values: ["RTD 밀크형", "RTD 밀크형", "RTD 밀크형", "RTD 워터형"] },
    { label: "단백질", values: [`${danbaekDrinkChoco.proteinPerServing}g`, `${danbaekDarkChoco.proteinPerServing}g`, `${danbaekDoubleChoco.proteinPerServing}g`, `${danbaekWaterApple.proteinPerServing}g`] },
    { label: "칼로리", values: [`${danbaekDrinkChoco.calories}kcal`, `${danbaekDarkChoco.calories}kcal`, `${danbaekDoubleChoco.calories}kcal`, `${danbaekWaterApple.calories}kcal`] },
    { label: "당류", values: [`${danbaekDrinkChoco.sugar}g`, `${danbaekDarkChoco.sugar}g`, `${danbaekDoubleChoco.sugar}g`, `${danbaekWaterApple.sugar}g`] },
    { label: "나트륨", values: [`${danbaekDrinkChoco.sodium ?? "-"}mg`, `${danbaekDarkChoco.sodium ?? "-"}mg`, `${danbaekDoubleChoco.sodium ?? "-"}mg`, `${danbaekWaterApple.sodium ?? "-"}mg`] },
    { label: "추천 목적", values: ["일반 보충", "중간 고단백", "고단백 집중", "가벼운 수분형"] },
  ]),
  sections: [
    {
      title: "더단백 핵심 특징",
      items: [
        { title: "저나트륨", body: "일반 드링크 초코 기준 30mg, 워터 프로틴은 47mg 수준이라 같은 카테고리 내에서 매우 낮은 편입니다." },
        { title: "20g부터 40g까지 고르게 있다", body: "입문용 20g, 중간 고단백 35g, 고단백 40g까지 단계적으로 올라갈 수 있습니다." },
        { title: "빙그레 기반의 무난한 맛", body: "과하게 자극적이기보다 안정적이고 담백한 쪽입니다. 그래서 일상용으로 정착하기 쉽습니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "나트륨 신경 쓰는 사람", body: "더단백은 어떤 라인을 보든 우선순위가 높습니다. 브랜드 방향성이 일관됩니다." },
        { title: "일반 보충", body: "20g 드링크가 가장 무난합니다. 숫자와 음용감 균형이 좋습니다." },
        { title: "고단백 원할 때", body: "더블초코 40g이 답입니다. 다크초코 35g은 그 중간 단계로 보기 좋습니다." },
      ],
    },
    {
      title: "더단백 라인업을 보는 핵심 관점",
      items: [
        { title: "같은 브랜드라도 20g, 35g, 40g 역할이 다르다", body: "더단백은 함량대별 계단 구조가 분명합니다. 처음엔 20g, 더 높이고 싶으면 35g, 확실히 가려면 40g으로 이해하면 쉽습니다." },
        { title: "저나트륨은 브랜드 전체 강점이다", body: "개별 SKU 하나의 우연한 장점이 아니라 브랜드 방향성입니다. 그래서 더단백은 비교 페이지에서도 강하게 드러납니다." },
        { title: "워터형은 별도 트랙으로 생각하기", body: "워터 프로틴은 가벼움과 수분형 보충이 핵심이라 밀크형 드링크와 직접 대체재처럼 보면 오해가 생길 수 있습니다." },
      ],
    },
  ],
  faq: [
    { question: "더단백에서 가장 무난한 첫 제품은 무엇인가", answer: "20g 드링크 초코가 가장 무난합니다. 숫자도 깔끔하고 일상 보충용으로 쓰기 쉽습니다." },
    { question: "고단백으로 바로 가고 싶으면 무엇을 보면 되나", answer: "더블초코 40g을 보면 됩니다. 35g 다크초코는 그 사이 단계입니다." },
    { question: "더단백의 가장 큰 장점은 무엇인가", answer: "저나트륨과 전반적으로 깔끔한 영양 설계입니다. 다른 브랜드와 나란히 놓으면 이 점이 가장 먼저 보입니다." },
  ],
  relatedGuides: [
    { title: "더단백 vs 셀렉스 비교", href: "/guides/product-selection-comparison/danbaek-vs-selexs", description: "셀렉스와의 차이를 직접 비교합니다." },
    { title: "더단백 vs 하이뮨 비교", href: "/guides/product-selection-comparison/danbaek-vs-himune", description: "하이뮨과의 차이를 직접 비교합니다." },
    { title: "단백질 음료 함량대별 완전 정리", href: "/guides/product-selection-comparison/protein-drink-by-content", description: "더단백 라인이 전체 시장에서 어디쯤인지 봅니다." },
  ],
  purchaseLinks: [
    { label: "더단백 드링크 보기", slug: danbaekDrinkChoco.slug },
    { label: "더단백 다크초코 보기", slug: danbaekDarkChoco.slug },
    { label: "더단백 더블초코 보기", slug: danbaekDoubleChoco.slug },
  ],
};
danbaekLineupConfig.jsonLd = [articleJsonLd(danbaekLineupConfig), faqJsonLd(danbaekLineupConfig)];

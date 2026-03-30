import type { CategoryGuideConfig, CategoryMetricRow } from "./categoryGuideShared";
import { getShakeProducts } from "@/app/data/shakeProductsData";

const shakeProducts = getShakeProducts();

function articleJsonLd(config: CategoryGuideConfig) {
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

function faqJsonLd(config: CategoryGuideConfig) {
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

function fiber(product: (typeof shakeProducts)[number]) {
  return product.nutritionPerBottle?.fiberG ?? 0;
}

function topShakeScore(product: (typeof shakeProducts)[number]) {
  return (
    product.proteinPerServing * 4 +
    fiber(product) * 3 -
    (product.calories ?? 0) * 0.08 -
    (product.sugar ?? 0) * 6
  );
}

const shakeTop7 = [...shakeProducts]
  .filter((product) => product.proteinPerServing >= 20 && (product.sugar ?? 0) <= 5)
  .sort((a, b) => topShakeScore(b) - topShakeScore(a))
  .slice(0, 7);

const dietShakeTop = [...shakeProducts]
  .filter((product) => product.proteinPerServing >= 20 && (product.calories ?? 999) <= 180 && (product.sugar ?? 0) <= 5)
  .sort((a, b) => (a.calories ?? 999) - (b.calories ?? 999) || b.proteinPerServing - a.proteinPerServing)
  .slice(0, 7);

const shakeCalorieTop20 = [...shakeProducts]
  .sort((a, b) => (a.calories ?? 999) - (b.calories ?? 999) || b.proteinPerServing - a.proteinPerServing)
  .slice(0, 20);

const labnoshProducts = shakeProducts
  .filter((product) => product.brand === "랩노쉬")
  .sort((a, b) => (a.calories ?? 999) - (b.calories ?? 999) || a.name.localeCompare(b.name, "ko"));

const labnoshFlavorList = labnoshProducts.map((product) => product.flavor).filter(Boolean).join(" · ");

const categoryRows: CategoryMetricRow[] = [
  { label: "형태", values: ["캔·팩 바로 마심", "파우치 흔들어 마심", "고형 바", "컵·파우치"] },
  { label: "편의성", values: ["최상", "상", "상", "중"] },
  { label: "포만감", values: ["중", "상", "상", "상"] },
  { label: "칼로리", values: ["낮음", "중간", "중간", "낮음"] },
  { label: "평균 단백질", values: ["20~43g", "20~27g", "10~25g", "10~15g"] },
  { label: "가격(1회)", values: ["1,500~3,000원", "2,000~3,500원", "1,500~3,000원", "2,000~4,000원"] },
  { label: "대표 브랜드", values: ["셀렉스·하이뮨·테이크핏", "랩노쉬·프로티원·플라이밀", "닥터유·베노프", "요프로·요플레·매일"] },
];

export const proteinCategoryGuideConfig: CategoryGuideConfig = {
  slug: "protein-category-guide",
  title: "단백질 음료 vs 쉐이크 vs 바 vs 요거트 | 뭐부터 고를까",
  description: "단백질 음료, 쉐이크, 바, 요거트를 한눈에 비교했습니다. 운동 후 보충, 다이어트, 아침 대용, 간식용까지 목적별로 어떤 카테고리가 맞는지 바로 정리합니다.",
  keywords: ["단백질 음료 쉐이크 차이", "프로틴 뭐 먹어야 해", "단백질 보충제 종류", "단백질 카테고리 비교"],
  badge: "카테고리 허브",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 카테고리 구조 + 시중 가격대 기준",
  intro: "단백질 제품이 처음이면 브랜드보다 먼저 카테고리를 정하는 편이 훨씬 쉽습니다. 운동 후 한 병 바로 마실지, 아침 식사처럼 포만감 있게 먹을지, 간식처럼 들고 다닐지가 갈리면 맞는 제품군도 함께 갈립니다.",
  summary: [
    "운동 후 빠른 보충이면 RTD 음료가 가장 단순하고 실패가 적습니다.",
    "아침 대용과 다이어트 포만감이면 파우치 쉐이크가 유리합니다.",
    "이동 중 간편 간식은 단백질 바, 가벼운 식사 대체는 단백질 요거트 쪽이 잘 맞습니다.",
  ],
  comparisonTitle: "4가지 카테고리 한눈에 비교",
  comparisonColumns: ["RTD 음료", "파우치 쉐이크", "단백질 바", "단백질 요거트"],
  comparisonRows: categoryRows,
  sections: [
    {
      title: "목적별 카테고리 추천",
      items: [
        { title: "운동 후 빠른 보충", body: "바로 마실 수 있는 RTD 음료가 가장 편합니다. 20g대부터 40g대까지 폭이 넓어서 운동 강도에 맞춰 고르기 쉽습니다." },
        { title: "식사 대용과 포만감", body: "파우치 쉐이크가 유리합니다. 칼로리와 식이섬유까지 같이 들어 있는 제품이 많아 아침 대용이나 다이어트 식대용으로 연결하기 쉽습니다." },
        { title: "간식처럼 챙기기", body: "단백질 바와 요거트가 맞습니다. 바는 휴대성이, 요거트는 가벼운 식사감과 맛 만족도가 강점입니다." },
      ],
    },
    {
      title: "처음 고를 때 가장 많이 헷갈리는 부분",
      items: [
        { title: "단백질이 가장 높으면 무조건 좋은가", body: "그렇지 않습니다. 40g급 RTD는 강력하지만 칼로리도 같이 올라가고, 아침 식사 대체 목적이라면 오히려 쉐이크가 더 잘 맞을 수 있습니다." },
        { title: "쉐이크와 음료는 무엇이 다른가", body: "RTD 음료는 즉시성, 파우치 쉐이크는 포만감이 핵심 차이입니다. 단백질 수치만 보면 비슷해 보여도 체감은 꽤 다릅니다." },
        { title: "요거트와 바는 보충용인가 간식용인가", body: "둘 다 가능하지만 바는 간식형, 요거트는 가벼운 식사 보완형에 더 가깝습니다. 메인 보충은 음료나 쉐이크가 더 강합니다." },
      ],
    },
    {
      title: "카테고리별 대표 가이드",
      items: [
        { title: "RTD 음료", body: "브랜드 직접 비교부터 보고 싶다면 셀렉스 vs 하이뮨, 테이크핏 vs 하이뮨 같은 비교형 페이지로 들어가는 흐름이 가장 빠릅니다." },
        { title: "파우치 쉐이크", body: "다이어트와 아침 대용 관점이면 쉐이크 TOP 7, 다이어트 쉐이크, 칼로리 순위처럼 문제 해결형 페이지를 먼저 보는 편이 좋습니다." },
        { title: "바·요거트", body: "이동 중 간식형 보충은 단백질 바, 가볍고 덜 부담스러운 식사 보완은 단백질 요거트 쪽으로 좁히면 선택이 훨씬 쉬워집니다." },
      ],
    },
    {
      title: "실제 선택 순서",
      items: [
        { title: "1단계: 언제 먹을지 먼저 정하기", body: "운동 직후인지, 아침 대용인지, 이동 중 간식인지부터 정하면 카테고리 절반은 자동으로 좁혀집니다. 초보자가 가장 많이 줄이는 시행착오가 이 단계입니다." },
        { title: "2단계: 포만감이 필요한지 판단하기", body: "배를 채워야 하면 쉐이크와 요거트 쪽, 빨리 마시고 끝내려면 RTD 쪽으로 가는 게 맞습니다. 바는 중간 간식형이라는 점을 따로 기억해두면 편합니다." },
        { title: "3단계: 마지막에 브랜드 비교로 내려가기", body: "카테고리를 정한 뒤에야 브랜드 비교가 의미가 생깁니다. 카테고리 없이 바로 브랜드부터 보면 자꾸 다른 제품군끼리 비교하게 됩니다." },
      ],
    },
  ],
  relatedGuides: [
    { title: "셀렉스 vs 하이뮨", href: "/guides/product-selection-comparison/selex-vs-himune", description: "RTD 음료부터 바로 비교하고 싶다면 이 페이지가 가장 빠릅니다." },
    { title: "단백질 쉐이크 추천 TOP 7", href: "/guides/product-selection-comparison/protein-shake-top7", description: "다이어트와 식사 대용에 맞는 파우치 쉐이크를 먼저 좁힙니다." },
    { title: "단백질 바 선택 가이드", href: "/guides/product-selection-comparison/protein-bar-guide", description: "바는 어떤 상황에서 더 잘 맞는지 기준부터 확인합니다." },
  ],
  purchaseLinks: [
    { label: "RTD 대표 제품 보기", slug: "sellex-profit-milk-vanilla-250" },
    { label: "쉐이크 대표 제품 보기", slug: "labnosh-slimshake-double-choco-45" },
    { label: "단백질 바 대표 제품 보기", slug: "dryou-proteinbar-pro-choco-classic" },
    { label: "요거트 대표 제품 보기", slug: "yopro-plain-150" },
  ],
  faq: [
    { question: "완전 초보라면 무엇부터 시작하는 게 가장 쉬운가", answer: "실패가 가장 적은 쪽은 RTD 음료입니다. 바로 마실 수 있고 20g 전후 제품이 많아서 입문 난도가 낮습니다." },
    { question: "다이어트 중이면 음료보다 쉐이크가 더 낫나", answer: "포만감과 식사 대체까지 보려면 쉐이크가 더 유리한 경우가 많습니다. 반대로 운동 후 가볍게 한 팩만 마실 거라면 RTD 음료가 더 편합니다." },
    { question: "단백질 바나 요거트만으로도 충분한가", answer: "간식형 보충에는 괜찮지만 메인 보충용으로는 음료나 쉐이크보다 힘이 약할 수 있습니다. 하루 전체 단백질 목표에 맞춰 같이 보는 편이 좋습니다." },
    { question: "브랜드를 이미 정해놨는데도 카테고리부터 다시 봐야 하나", answer: "그렇습니다. 같은 브랜드 안에서도 음료와 쉐이크의 쓰임이 달라서, 브랜드를 아는 것과 지금 내 목적에 맞는 카테고리를 아는 것은 다른 문제입니다." },
  ],
};
proteinCategoryGuideConfig.jsonLd = [articleJsonLd(proteinCategoryGuideConfig), faqJsonLd(proteinCategoryGuideConfig)];

export const proteinShakeTop7Config: CategoryGuideConfig = {
  slug: "protein-shake-top7",
  title: "단백질 쉐이크 추천 TOP 7",
  description: "ProteinLab DB 파우치형 단백질 쉐이크를 기준으로 다이어트, 식사 대용, 단백질 보충까지 두루 보기 좋은 TOP 7을 골랐습니다.",
  keywords: ["단백질 쉐이크 추천", "다이어트 쉐이크 추천", "여성 단백질 쉐이크", "파우치 단백질 쉐이크"],
  badge: "쉐이크 랭킹",
  readingTime: "6분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 파우치형 쉐이크의 단백질·칼로리·당류·식이섬유 종합 점수",
  intro: "RTD 음료와 달리 파우치형 쉐이크는 아침 대용, 허기 관리, 다이어트 루틴과 더 가까운 제품군입니다. 그래서 단백질만 높다고 상위권이 되는 게 아니라 칼로리, 당류, 식이섬유, 맛 지속성을 같이 봐야 실제로 오래 마시기 쉽습니다. 전체 후보를 먼저 좁힌 뒤 플라이밀, 단백하니, 프로티원 같은 브랜드 페이지로 다시 들어가면 선택 속도가 더 빨라집니다.",
  summary: [
    "상위권은 단백질 20g 이상에 당류가 낮고 식이섬유까지 챙긴 제품들입니다.",
    "랩노쉬 슬림쉐이크는 맛과 포만감 균형, 프로티원은 낮은 칼로리, 잇더핏은 고단백 대비 깔끔한 수치가 강점입니다. 플라이밀과 단백하니는 브랜드별로 다시 보면 맛과 칼로리 차이를 더 쉽게 정리할 수 있습니다.",
    "처음 시작이라면 박스보다 단품 또는 소량 세트로 맛을 먼저 확인하는 편이 안전합니다.",
  ],
  comparisonTitle: "TOP 7 순위표",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "포인트"],
  comparisonRows: shakeTop7.map((product, index) => ({
    label: `${index + 1}위`,
    values: [
      `${product.brand} ${product.name}`,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      fiber(product) >= 5 ? `식이섬유 ${fiber(product)}g` : "저당·고단백 균형형",
    ],
  })),
  sections: [
    {
      title: "이 순위가 잘 맞는 사람",
      items: [
        { title: "아침 굶지 않고 다이어트하고 싶은 사람", body: "칼로리만 낮은 제품보다 단백질과 식이섬유가 같이 있는 제품이 훨씬 오래 갑니다. TOP 7 상위권은 이 기준에 맞는 편입니다." },
        { title: "맛 때문에 포기한 경험이 있는 사람", body: "파우치 쉐이크는 맛 지속성이 중요합니다. 랩노쉬처럼 맛 라인업이 넓은 브랜드가 초보자에게 더 잘 맞는 이유가 여기 있습니다." },
        { title: "운동 보충도 겸하고 싶은 사람", body: "RTD보다 포만감이 강한 대신 즉시성은 떨어집니다. 운동 직후 한 팩보다 식사 사이 보완이나 하루 루틴 안에서 챙기는 용도에 더 잘 맞습니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "아침 식사 대용", body: "식이섬유가 높은 랩노쉬 슬림쉐이크 계열이 안정적입니다. 공복 허기를 다루기 쉽고 맛 선택 폭도 넓습니다." },
        { title: "칼로리 우선 다이어트", body: "프로티원 커피, 더단백 파우더처럼 110kcal 전후 제품이 유리합니다. 다만 포만감은 식이섬유 높은 제품보다 약할 수 있습니다." },
        { title: "단백질도 놓치고 싶지 않을 때", body: "잇더핏, 단백하니 같은 21~22g 구간이 무난합니다. 쉐이크치고 단백질이 높은 편이라 운동 병행 루틴과도 연결됩니다." },
      ],
    },
    {
      title: "RTD 음료와 갈리는 지점",
      items: [
        { title: "포만감", body: "쉐이크가 더 강합니다. 아침 대용과 다이어트 식대용은 대부분 RTD보다 쉐이크가 낫습니다." },
        { title: "간편함", body: "RTD 음료가 더 강합니다. 출근길이나 운동 직후처럼 바로 마셔야 할 때는 쉐이크보다 RTD가 편합니다." },
        { title: "실제 추천 흐름", body: "운동 보충이 핵심이면 RTD, 식사 대용과 허기 관리가 핵심이면 쉐이크로 들어가면 시행착오가 줄어듭니다." },
      ],
    },
    {
      title: "상위권 제품을 고를 때 마지막 체크",
      items: [
        { title: "1위만 고집하지 않기", body: "TOP 7은 절대 순위라기보다 상위 후보군에 가깝습니다. 맛 취향과 포만감 체감이 다르면 3위나 5위가 더 잘 맞을 수도 있습니다." },
        { title: "박스 구매 전에 할 일", body: "쉐이크는 한 번에 여러 팩을 사면 단가가 내려가지만, 맛이 안 맞으면 손실이 큽니다. 소량 테스트 후 박스로 넘어가는 흐름이 가장 안전합니다." },
        { title: "숫자보다 지속성", body: "다이어트용 쉐이크는 오래 먹을 수 있어야 의미가 있습니다. 그래서 최종 선택은 숫자와 함께 맛, 질림 정도, 마시는 시간대까지 같이 봐야 합니다." },
      ],
    },
  ],
    relatedGuides: [
      { title: "플라이밀 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/flymill-protein-shake", description: "플라이밀 피넛버터와 초코, 쿠키앤크림 중 무엇이 더 맞는지 브랜드 기준으로 먼저 좁힐 수 있습니다." },
      { title: "단백하니 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/danbaekhani-protein-shake", description: "단백하니 시그니처, 초코, 말차 차이를 저당과 칼로리 기준으로 정리한 브랜드 가이드입니다." },
      { title: "플라이밀 vs 단백하니", href: "/guides/product-selection-comparison/flymill-vs-danbaekhani", description: "고단백 우선인지, 더 가벼운 저당 균형형이 더 맞는지 두 인기 브랜드를 바로 비교합니다." },
      { title: "프로티원 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/proteone-protein-shake", description: "초코와 커피맛 중 무엇이 더 가볍고 단백질 밀도가 높은지 브랜드 기준으로 빠르게 볼 수 있습니다." },
      { title: "랩노쉬 라인업", href: "/guides/product-selection-comparison/labnosh-lineup", description: "슬림쉐이크 중심으로 맛과 목적 차이를 더 자세히 봅니다." },
    ],
  purchaseLinks: shakeTop7.slice(0, 3).map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  externalLinks: [
    {
      label: "올리브영에서 쉐이크 보기",
      href: "https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query=%EB%8B%A8%EB%B0%B1%EC%A7%88%20%EC%89%90%EC%9D%B4%ED%81%AC",
      description: "처음이면 박스보다 단품 테스트가 편한 경우가 많습니다. 올리브영 검색 결과에서 소량 구매 가능한 제품을 먼저 확인할 수 있습니다.",
    },
    {
      label: "랩노쉬 공식 카테고리",
      href: "https://labnosh.com/category/%EB%8B%A8%EB%B0%B1%EC%A7%88-%EC%89%90%EC%9D%B4%ED%81%AC/125/",
      description: "맛 라인업을 먼저 보고 싶다면 랩노쉬 공식 카테고리가 가장 빠릅니다.",
    },
  ],
  faq: [
    { question: "여성 다이어트용이면 무조건 쉐이크가 낫나", answer: "아침 대용과 허기 관리가 핵심이면 쉐이크가 잘 맞습니다. 운동 직후 바로 마실 제품이 필요하면 RTD가 더 편할 수 있습니다." },
    { question: "처음이면 어떤 맛부터 시작하는 게 좋나", answer: "초코 계열이 가장 무난합니다. 그 다음이 말차, 밀크티, 곡물 계열 순으로 진입 장벽이 낮은 편입니다." },
    { question: "박스로 바로 사도 되나", answer: "쉐이크는 맛 취향 차이가 큽니다. 처음엔 단품이나 소량 세트로 맛을 확인한 뒤 박스로 넘어가는 편이 안전합니다." },
    { question: "TOP 7이면 1위 제품만 사면 되는 건가", answer: "아닙니다. 이 페이지는 상위 후보를 좁혀주는 역할이 더 큽니다. 최종 선택은 맛 취향과 식사 대용 여부까지 같이 봐야 합니다." },
  ],
};
proteinShakeTop7Config.jsonLd = [articleJsonLd(proteinShakeTop7Config), faqJsonLd(proteinShakeTop7Config)];

export const labnoshLineupConfig: CategoryGuideConfig = {
  slug: "labnosh-lineup",
  title: "랩노쉬 제품 종류 전체 정리",
  description: "랩노쉬 슬림쉐이크 중심으로 맛, 칼로리, 당류, 식이섬유 차이와 어떤 사람에게 잘 맞는지 정리했습니다.",
  keywords: ["랩노쉬 종류", "랩노쉬 라인업", "랩노쉬 슬림쉐이크", "랩노쉬 올리브영"],
  badge: "브랜드 라인업",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 파우치형 랩노쉬 SKU 기준",
  intro: "랩노쉬는 파우치 쉐이크 시장에서 가장 먼저 보는 브랜드 중 하나지만, 실제로는 단백질 함량보다 맛과 식사 대용 지속성이 더 강한 브랜드입니다. 현재 ProteinLab DB 기준으로는 슬림쉐이크 라인이 중심이라, 그 안에서 어떤 맛이 무난하고 어떤 맛이 포만감 쪽으로 강한지 읽는 게 중요합니다. 반대로 플라이밀, 단백하니, 프로티원처럼 숫자 차이가 더 분명한 브랜드와 같이 보면 랩노쉬 포지션이 더 쉽게 잡힙니다.",
  summary: [
    "랩노쉬의 강점은 극단적 고단백이 아니라 맛 다양성과 식사 대용 지속성입니다. 반대로 플라이밀, 단백하니, 프로티원은 브랜드별 숫자 차이를 더 직접적으로 비교하기 좋습니다.",
    "대부분 20g 전후 단백질에 160~175kcal 구간으로 정리돼 있어 다이어트 쉐이크로 쓰기 쉽습니다.",
    "처음이면 더블초코, 얼그레이 밀크티, 제주말차처럼 거부감이 낮은 맛부터 시작하는 편이 안전합니다.",
  ],
  comparisonTitle: "랩노쉬 주요 라인업",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "특징"],
  comparisonRows: labnoshProducts.slice(0, 6).map((product) => ({
    label: product.flavor ?? product.name,
    values: [
      product.name,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      fiber(product) >= 7 ? `식이섬유 ${fiber(product)}g` : "맛 중심 입문형",
    ],
  })),
  sections: [
    {
      title: "랩노쉬를 고를 때 보는 순서",
      items: [
        { title: "1단계: 맛부터 좁히기", body: `랩노쉬는 같은 20g대라도 맛 체감 차이가 큽니다. 현재 DB 기준 주요 맛은 ${labnoshFlavorList} 순으로 확인할 수 있습니다.` },
        { title: "2단계: 식이섬유 확인", body: "아침 대용과 포만감이 중요하면 식이섬유가 높은 맛이 유리합니다. 제주말차, 얼그레이 밀크티, 딸기쿠키크럼블이 대표적입니다." },
        { title: "3단계: 당류와 칼로리 확인", body: "랩노쉬는 전반적으로 무난하지만, 맛에 따라 당류와 칼로리가 약간씩 다릅니다. 다이어트 중이면 마지막에 이 숫자로 세밀하게 고르면 됩니다." },
      ],
    },
    {
      title: "목적별 추천",
      items: [
        { title: "처음 시도", body: "더블초코나 얼그레이 밀크티가 가장 무난합니다. 쉐이크 특유의 텁텁함을 덜 느끼는 편이라 첫 진입에 유리합니다." },
        { title: "포만감 우선", body: "제주말차, 딸기쿠키크럼블처럼 식이섬유가 높은 맛이 유리합니다. 칼로리만 낮은 제품보다 아침 대용 체감이 낫습니다." },
        { title: "맛있게 꾸준히", body: "랩노쉬는 맛 로테이션이 쉽다는 점이 핵심입니다. 한 맛만 오래 먹기 어려운 사람에게 특히 맞습니다." },
      ],
    },
    {
      title: "랩노쉬를 다른 쉐이크와 비교하면",
      items: [
        { title: "프로티원과 비교", body: "프로티원은 더 낮은 칼로리 쪽, 랩노쉬는 포만감과 맛 다양성 쪽이 강합니다. 다이어트 지속성은 랩노쉬가 더 낫게 느껴질 수 있습니다." },
        { title: "잇더핏과 비교", body: "잇더핏은 단백질 대비 칼로리 효율이 더 좋고, 랩노쉬는 식사 대용 체감이 더 좋습니다. 운동 보충이면 잇더핏, 식대용이면 랩노쉬 쪽입니다." },
        { title: "실제 선택 포인트", body: "맛에 민감하고 꾸준함이 중요하면 랩노쉬가 유리합니다. 숫자 효율만 보면 더 낮은 칼로리 제품이 위로 올라올 수 있지만, 오래 먹는 관점은 다릅니다." },
      ],
    },
    {
      title: "랩노쉬에서 자주 갈리는 선택",
      items: [
        { title: "말차 vs 얼그레이", body: "말차는 조금 더 가벼운 녹차 계열, 얼그레이는 밀크티 쪽 만족도가 강합니다. 첫 구매라면 둘 중 평소 더 자주 마시는 음료 취향으로 고르는 게 가장 정확합니다." },
        { title: "더블초코 vs 딸기쿠키크럼블", body: "더블초코는 가장 보편적인 입문형이고, 딸기쿠키크럼블은 디저트 느낌이 강합니다. 호불호는 더 갈리지만 만족도도 높게 느끼는 사람이 많습니다." },
        { title: "인절미·고구마 계열", body: "곡물형 포만감은 좋지만 취향이 더 갈립니다. 단백질 쉐이크가 처음이라면 디저트형이나 초코형 다음 순서로 보는 편이 실패가 적습니다." },
      ],
    },
  ],
    relatedGuides: [
      { title: "단백질 쉐이크 추천 TOP 7", href: "/guides/product-selection-comparison/protein-shake-top7", description: "랩노쉬가 전체 쉐이크 시장에서 어디에 위치하는지 확인합니다." },
      { title: "플라이밀 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/flymill-protein-shake", description: "랩노쉬보다 더 고단백 쪽이 궁금하다면 플라이밀 브랜드 가이드로 바로 넘어갈 수 있습니다." },
      { title: "단백하니 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/danbaekhani-protein-shake", description: "랩노쉬보다 더 가볍고 저당인 브랜드 후보를 보려면 단백하니 브랜드 가이드가 더 직접적입니다." },
      { title: "다이어트 단백질 쉐이크", href: "/guides/product-selection-comparison/diet-protein-shake", description: "칼로리와 당류 기준으로 다시 한 번 좁혀봅니다." },
      { title: "여성을 위한 단백질 쉐이크", href: "/guides/product-selection-comparison/protein-shake-for-women", description: "일상·다이어트 프레임으로 이어서 보기 좋은 쉐이크 페이지입니다." },
    ],
  purchaseLinks: [
    { label: "랩노쉬 더블초코 보기", slug: "labnosh-slimshake-double-choco-45" },
    { label: "랩노쉬 제주말차 보기", slug: "labnosh-slimshake-jeju-matcha-45" },
    { label: "랩노쉬 얼그레이 밀크티 보기", slug: "labnosh-slimshake-earl-grey-milk-tea-45" },
  ],
  externalLinks: [
    {
      label: "랩노쉬 공식 카테고리",
      href: "https://labnosh.com/category/%EB%8B%A8%EB%B0%B1%EC%A7%88-%EC%89%90%EC%9D%B4%ED%81%AC/125/",
      description: "전체 맛 라인업을 한 번에 보고 싶다면 공식 카테고리가 가장 빠릅니다.",
    },
    {
      label: "올리브영에서 랩노쉬 검색",
      href: "https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query=%EB%9E%A9%EB%85%B8%EC%89%AC",
      description: "단품으로 먼저 맛을 확인하고 싶을 때 볼 수 있는 채널입니다.",
    },
  ],
  faq: [
    { question: "랩노쉬는 운동용보다 다이어트용에 더 가깝나", answer: "네. ProteinLab 기준으로는 식사 대용과 다이어트 지속성 쪽에 더 잘 맞습니다. 운동 직후 보충만 보면 RTD나 더 가벼운 쉐이크가 더 직관적일 수 있습니다." },
    { question: "랩노쉬에서 가장 무난한 맛은 무엇인가", answer: "더블초코, 얼그레이 밀크티, 제주말차가 가장 무난한 축에 들어갑니다. 인절미와 딸기쿠키크럼블은 취향이 더 갈릴 수 있습니다." },
    { question: "랩노쉬를 박스로 사도 괜찮나", answer: "한 번도 안 마셔봤다면 단품이나 소량 세트가 더 안전합니다. 맛 취향 차이가 분명한 브랜드라서 첫 구매는 테스트가 낫습니다." },
    { question: "랩노쉬는 왜 숫자보다 맛 이야기가 더 많이 나오나", answer: "랩노쉬의 진짜 강점이 극단적인 고단백이 아니라 맛 다양성과 식대용 지속성이기 때문입니다. 실제 사용자 만족도도 이 지점에서 갈립니다." },
  ],
};
labnoshLineupConfig.jsonLd = [articleJsonLd(labnoshLineupConfig), faqJsonLd(labnoshLineupConfig)];

export const dietProteinShakeConfig: CategoryGuideConfig = {
  slug: "diet-protein-shake",
  title: "다이어트 단백질 쉐이크 추천",
  description: "ProteinLab DB 파우치형 쉐이크 중 저칼로리·저당·단백질 20g 이상 기준으로 다이어트에 잘 맞는 제품을 골랐습니다.",
  keywords: ["다이어트 단백질 쉐이크", "저칼로리 단백질 쉐이크", "식사대용 쉐이크 추천", "다이어트 쉐이크 여성"],
  badge: "다이어트 쉐이크",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 파우치형 쉐이크 중 180kcal 이하 · 당류 5g 이하 · 단백질 20g 이상",
  intro: "다이어트용 쉐이크는 단순히 칼로리만 낮으면 끝이 아닙니다. 칼로리가 낮아도 단백질이 부족하면 금방 허기가 오고, 당류가 높으면 체감 만족도가 오히려 떨어질 수 있습니다. 그래서 다이어트용은 칼로리, 당류, 단백질, 식이섬유를 함께 봐야 합니다.",
  summary: [
    "다이어트용 상위권은 110~170kcal 안에서 단백질 20g 이상을 확보한 제품들입니다.",
    "극저칼로리만 보면 프로티원과 더단백 파우더가 강하고, 포만감까지 같이 보면 랩노쉬가 더 유리합니다. 플라이밀과 단백하니는 브랜드별로 다시 보면 맛과 칼로리 차이를 더 쉽게 좁힐 수 있습니다.",
    "하루 2끼 이상 대체보다 아침 1끼 또는 간식 대체용으로 쓰는 방식이 가장 안정적입니다.",
  ],
  comparisonTitle: "다이어트 추천 쉐이크",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "포인트"],
  comparisonRows: dietShakeTop.map((product, index) => ({
    label: `${index + 1}순위`,
    values: [
      `${product.brand} ${product.name}`,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      fiber(product) >= 4 ? `포만감형 · 식이섬유 ${fiber(product)}g` : "초저칼로리형",
    ],
  })),
  sections: [
    {
      title: "다이어트용 기준",
      items: [
        { title: "칼로리", body: "200kcal 아래에서 시작하는 편이 안전합니다. 이 정도면 아침 대용이나 간식 대체로 쓰기 쉬운 구간입니다." },
        { title: "당류", body: "5g 이하부터 보는 편이 실전적입니다. 지나치게 달면 계속 마시기 편해도 다이어트 루틴에서는 방해가 될 수 있습니다." },
        { title: "단백질과 식이섬유", body: "단백질 20g 이상, 식이섬유 4g 전후가 있으면 포만감 유지가 훨씬 낫습니다. 칼로리만 낮은 제품은 금방 허기가 올 수 있습니다." },
      ],
    },
    {
      title: "올바른 활용법",
      items: [
        { title: "가장 쉬운 사용법", body: "아침 한 끼 대체가 가장 실용적입니다. 저녁까지 밀어붙이는 것보다 루틴 유지가 쉽습니다." },
        { title: "운동 전후 간식", body: "운동 전후 가벼운 간식용으로도 쓸 수 있지만, 운동 직후 단백질 집중 보충만 원하면 RTD가 더 편합니다." },
        { title: "주의할 점", body: "쉐이크만으로 하루를 버티는 식으로 가면 오래 못 갑니다. 다이어트용 쉐이크는 대체재이지 만능식이 아닙니다." },
      ],
    },
    {
      title: "이 페이지를 어떻게 읽으면 좋은가",
      items: [
        { title: "칼로리만 볼 사람", body: "프로티원, 더단백 파우더 계열부터 보면 됩니다. 숫자는 가장 가볍습니다." },
        { title: "포만감도 중요", body: "랩노쉬처럼 식이섬유 높은 제품이 더 잘 맞습니다. 유지 난도가 훨씬 낮아집니다." },
        { title: "처음 시도", body: "박스보다 올리브영이나 소량 세트로 맛부터 확인하는 게 좋습니다. 맛이 안 맞으면 루틴 자체가 끊깁니다." },
      ],
    },
    {
      title: "다이어트에서 자주 하는 실수",
      items: [
        { title: "칼로리만 낮은 제품으로 버티기", body: "처음엔 가볍게 느껴져도 단백질과 포만감이 부족하면 결국 다른 간식을 더 먹게 됩니다. 그래서 다이어트용은 숫자 하나가 아니라 조합으로 봐야 합니다." },
        { title: "하루 두 끼 이상 쉐이크로 바꾸기", body: "초반엔 빠르게 빠지는 것처럼 보여도 오래 유지하기 어렵습니다. 아침 1끼나 간식 대체처럼 실전에서 버틸 수 있는 방식이 더 중요합니다." },
        { title: "맛 검증 없이 박스 구매", body: "다이어트는 루틴 유지가 핵심이라 맛이 안 맞으면 바로 끊깁니다. 그래서 첫 구매는 반드시 가볍게 테스트하는 편이 낫습니다." },
      ],
    },
  ],
    relatedGuides: [
      { title: "프로티원 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/proteone-protein-shake", description: "다이어트용으로 자주 비교되는 프로티원 초코·커피맛 차이를 브랜드 기준으로 먼저 볼 수 있습니다." },
      { title: "단백하니 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/danbaekhani-protein-shake", description: "저당과 칼로리 균형형 브랜드를 찾는다면 단백하니 브랜드 페이지가 바로 이어집니다." },
      { title: "랩노쉬 라인업", href: "/guides/product-selection-comparison/labnosh-lineup", description: "식대용으로 꾸준히 먹기 좋은 브랜드를 더 자세히 봅니다." },
      { title: "단백질 쉐이크 칼로리 순위", href: "/guides/product-selection-comparison/protein-shake-calorie-ranking", description: "전체 DB에서 칼로리만 놓고 보면 어떤 제품이 더 가벼운지 확인합니다." },
      { title: "플라이밀 단백질 쉐이크 추천", href: "/guides/product-selection-comparison/flymill-protein-shake", description: "조금 더 고단백 쪽 다이어트 쉐이크를 보고 싶다면 플라이밀 브랜드 페이지로 넘어갈 수 있습니다." },
    ],
  purchaseLinks: [
    { label: "프로티원 커피맛 보기", slug: "proteone-proteinshake-coffee-40" },
    { label: "더단백 파우더 초코 보기", slug: "thedanbaek-proteinshake-powder-choco-32" },
    { label: "랩노쉬 제주말차 보기", slug: "labnosh-slimshake-jeju-matcha-45" },
  ],
  externalLinks: [
    {
      label: "올리브영 다이어트 쉐이크 검색",
      href: "https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query=%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8%20%EC%89%90%EC%9D%B4%ED%81%AC",
      description: "처음 시도하는 사람은 단품이나 소량 세트를 먼저 보기 좋습니다.",
    },
  ],
  faq: [
    { question: "다이어트 중이면 무조건 가장 낮은 칼로리를 고르면 되나", answer: "아닙니다. 칼로리가 낮아도 단백질이 부족하면 금방 허기가 옵니다. 단백질과 식이섬유까지 같이 봐야 실제 유지가 쉽습니다." },
    { question: "하루 두 끼를 쉐이크로 바꿔도 되나", answer: "장기적으로는 권하지 않습니다. 다이어트용 쉐이크는 하루 한 끼 또는 간식 대체 정도가 현실적입니다." },
    { question: "운동 안 해도 마셔도 되나", answer: "네. 다이어트 식사 조절이나 아침 대용 목적이라면 운동을 하지 않아도 활용할 수 있습니다." },
    { question: "다이어트용인데 왜 랩노쉬 같은 160kcal대 제품도 추천되나", answer: "칼로리만 낮은 제품보다 식이섬유와 포만감이 좋은 제품이 실제 유지에는 더 유리하기 때문입니다. 숫자가 조금 높아도 체감 효율은 더 좋을 수 있습니다." },
  ],
};
dietProteinShakeConfig.jsonLd = [articleJsonLd(dietProteinShakeConfig), faqJsonLd(dietProteinShakeConfig)];

export const proteinShakeCalorieRankingConfig: CategoryGuideConfig = {
  slug: "protein-shake-calorie-ranking",
  title: "단백질 쉐이크 칼로리 순위",
  description: "ProteinLab DB 파우치형 단백질 쉐이크를 칼로리 낮은 순으로 정렬해 TOP 20을 정리했습니다.",
  keywords: ["단백질 쉐이크 칼로리", "저칼로리 단백질 쉐이크 순위", "칼로리 낮은 쉐이크", "다이어트 쉐이크 순위"],
  badge: "데이터 랭킹",
  readingTime: "6분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 파우치형 쉐이크를 칼로리 오름차순 정렬",
  intro: "다이어트 관점에서 쉐이크를 볼 때 가장 먼저 찾는 숫자는 칼로리입니다. 다만 칼로리만 낮다고 끝은 아니어서, 실제로는 단백질과 당류까지 같이 읽어야 같은 120kcal 제품 안에서도 더 나은 선택을 할 수 있습니다.",
  summary: [
    "최저 칼로리권은 프로티원, 더단백 파우더, 베노프, 잇더핏 계열이 차지합니다.",
    "칼로리만 낮고 단백질이 낮은 제품보다, 20g 이상 단백질을 유지한 저칼로리 제품이 실전 다이어트엔 더 유리합니다.",
    "결국 이 표는 출발점이고, 최종 선택은 단백질과 당류를 같이 봐야 완성됩니다.",
  ],
  comparisonTitle: "칼로리 낮은 순 TOP 20",
  comparisonColumns: ["제품명", "칼로리", "단백질", "당류", "메모"],
  comparisonRows: shakeCalorieTop20.map((product, index) => ({
    label: `${index + 1}위`,
    values: [
      `${product.brand} ${product.name}`,
      `${product.calories}kcal`,
      `${product.proteinPerServing}g`,
      `${product.sugar}g`,
      product.proteinPerServing >= 20 ? "다이어트 비교 우선 후보" : "저칼로리지만 단백질 확인 필요",
    ],
  })),
  sections: [
    {
      title: "칼로리만 보면 안 되는 이유",
      items: [
        { title: "단백질이 낮으면 허기가 빨리 옵니다", body: "같은 120kcal라도 단백질 15g과 22g의 체감은 꽤 다릅니다. 칼로리만 보면 실제 유지력이 떨어질 수 있습니다." },
        { title: "당류도 같이 봐야 합니다", body: "칼로리가 낮아도 당류가 높으면 다이어트용으로는 아쉬울 수 있습니다. 그래서 이 표는 반드시 당류와 같이 읽어야 합니다." },
        { title: "포만감은 식이섬유가 좌우합니다", body: "숫자는 비슷해도 식이섬유가 높은 제품이 훨씬 오래 갑니다. 그래서 랩노쉬 같은 제품은 칼로리만 보면 더 아래여도 실제 만족도는 높을 수 있습니다." },
      ],
    },
    {
      title: "이 표를 실전에서 쓰는 방법",
      items: [
        { title: "1단계", body: "먼저 150kcal 이하 구간에서 제품을 좁힙니다." },
        { title: "2단계", body: "그 안에서 단백질 20g 이상만 다시 고르면 실패 확률이 크게 줄어듭니다." },
        { title: "3단계", body: "마지막으로 당류와 맛 취향을 봅니다. 다이어트는 숫자보다 지속성이 중요합니다." },
      ],
    },
    {
      title: "어떤 사람에게 특히 유용한 표인가",
      items: [
        { title: "칼로리에 민감한 다이어트 초보", body: "전체 DB를 낮은 순으로 보는 것만으로도 감이 빨리 잡힙니다. 입문자에게 가장 직관적인 표입니다." },
        { title: "기존 쉐이크가 무겁게 느껴졌던 사람", body: "지금 마시는 제품보다 더 가벼운 대안을 찾을 때 가장 빠릅니다." },
        { title: "다이어트용 후보를 2~3개로 줄이고 싶은 사람", body: "상위권에서 단백질 20g 이상 제품만 다시 고르면 바로 실전 후보가 나옵니다." },
      ],
    },
    {
      title: "이 순위표를 잘못 쓰는 패턴",
      items: [
        { title: "1위 제품만 보고 바로 구매", body: "이 표는 저칼로리 후보군을 빠르게 보는 도구입니다. 최종 선택은 당류, 단백질, 맛까지 함께 봐야 합니다." },
        { title: "칼로리 낮은데 단백질 낮은 제품을 고르기", body: "이런 제품은 숫자는 예뻐 보여도 포만감이 약할 수 있습니다. 다이어트 식대용이라면 오히려 비효율적일 수 있습니다." },
        { title: "식사 대용과 운동 보충을 같은 기준으로 보기", body: "식사 대용은 포만감이, 운동 보충은 간편함이 더 중요합니다. 그래서 같은 순위라도 상황에 따라 정답이 달라집니다." },
      ],
    },
  ],
  relatedGuides: [
    { title: "다이어트 단백질 쉐이크", href: "/guides/product-selection-comparison/diet-protein-shake", description: "칼로리뿐 아니라 당류와 식이섬유까지 함께 정리한 가이드입니다." },
    { title: "단백질 쉐이크 추천 TOP 7", href: "/guides/product-selection-comparison/protein-shake-top7", description: "종합 점수 기준으로 보면 어떤 제품이 위로 오는지 비교합니다." },
    { title: "랩노쉬 라인업", href: "/guides/product-selection-comparison/labnosh-lineup", description: "맛과 식사 대용 지속성을 중시하는 브랜드를 따로 봅니다." },
  ],
  purchaseLinks: [
    { label: "프로티원 커피맛 보기", slug: "proteone-proteinshake-coffee-40" },
    { label: "더단백 파우더 초코 보기", slug: "thedanbaek-proteinshake-powder-choco-32" },
    { label: "더단백 파우더 곡물 보기", slug: "thedanbaek-proteinshake-powder-grain-32" },
  ],
  faq: [
    { question: "가장 낮은 칼로리 제품이 다이어트에 최고인가", answer: "반드시 그렇지는 않습니다. 단백질과 포만감이 받쳐주지 않으면 오히려 금방 허기가 와서 더 먹게 될 수 있습니다." },
    { question: "칼로리 150kcal 아래만 보면 충분한가", answer: "출발점으로는 좋지만 단백질 20g 이상인지도 함께 봐야 합니다. 그래야 실제 다이어트 식대용으로 쓰기 쉽습니다." },
    { question: "식사 대용이면 이 순위표보다 무엇을 봐야 하나", answer: "식이섬유와 맛 지속성까지 같이 보는 가이드를 함께 보면 더 빠르게 좁힐 수 있습니다." },
    { question: "왜 어떤 제품은 순위가 높은데 다른 가이드에서는 덜 강조되나", answer: "이 표는 칼로리 중심이고, 다른 가이드는 포만감과 지속성까지 함께 보기 때문입니다. 기준이 다르면 상위권 제품도 달라질 수 있습니다." },
  ],
};
proteinShakeCalorieRankingConfig.jsonLd = [articleJsonLd(proteinShakeCalorieRankingConfig), faqJsonLd(proteinShakeCalorieRankingConfig)];

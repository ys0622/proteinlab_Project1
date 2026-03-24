import type { CategoryGuideConfig } from "./categoryGuideShared";
import { getYogurtProducts } from "@/app/data/yogurtProductsData";

const yogurtProducts = getYogurtProducts();

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

function getBySlug(slug: string) {
  const product = yogurtProducts.find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Yogurt product not found: ${slug}`);
  }
  return product;
}

const yogurtTopPicks = [
  getBySlug("yopro-plain-150"),
  getBySlug("lookt-icelandic-mild-100"),
  getBySlug("greekday-light-100"),
  getBySlug("greekday-signature-100"),
  getBySlug("maeil-bio-greek-unsweetened-150"),
];

const dietYogurtPicks = [getBySlug("yopro-plain-150"), getBySlug("lookt-icelandic-mild-100"), getBySlug("greekday-light-100")];

const greekProducts = yogurtProducts.filter(
  (product) =>
    product.name.includes("그릭") || product.name.includes("아이슬란딕") || product.brand.includes("그릭") || product.brand.includes("룩트"),
);
const proteinYogurtProducts = yogurtProducts.filter((product) => product.name.includes("프로틴") || product.brand.includes("요프로"));

const greekProteinRange = {
  proteinMin: Math.min(...greekProducts.map((product) => product.proteinPerServing)),
  proteinMax: Math.max(...greekProducts.map((product) => product.proteinPerServing)),
};
const proteinYogurtRange = {
  proteinMin: Math.min(...proteinYogurtProducts.map((product) => product.proteinPerServing)),
  proteinMax: Math.max(...proteinYogurtProducts.map((product) => product.proteinPerServing)),
};

export const proteinYogurtTop5Config: CategoryGuideConfig = {
  slug: "protein-yogurt-top5",
  title: "단백질 요거트 추천 TOP 5",
  description:
    "ProteinLab DB 요거트 45개 기준으로 단백질 함량, 칼로리, 당류를 함께 비교해 지금 고르기 좋은 단백질 요거트 TOP 5를 정리했습니다.",
  keywords: ["단백질 요거트 추천", "고단백 요거트", "단백질 요거트 순위", "프로틴 요거트"],
  badge: "요거트 랭킹",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 요거트 45개 기준 · 1회 섭취 현실성 + 단백질 + 칼로리 + 당류",
  intro:
    "요거트 카테고리는 겉으로 보면 비슷하지만 실제로는 플레인 간식형, 그릭형, 프로틴 설계형이 섞여 있습니다. 그래서 이번 TOP 5는 숫자만 높은 제품보다, 1회 섭취 기준으로 실제로 꾸준히 먹기 좋은 제품 위주로 골랐습니다.",
  summary: [
    "상위권은 100~150g 내외에서 단백질 10g 이상을 채우면서 칼로리를 크게 올리지 않는 제품들입니다.",
    "그릭요거트는 농축형이라 포만감이 좋고, 프로틴 요거트는 단백질 숫자를 읽기 쉬워 입문자에게 편합니다.",
    "요거트 카테고리는 맛과 질감 차이가 커서, 숫자보다 꾸준히 먹을 수 있는 질감인지도 중요합니다.",
  ],
  comparisonTitle: "TOP 5 순위표",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "포인트"],
  comparisonRows: yogurtTopPicks.map((product, index) => ({
    label: `${index + 1}위`,
    values: [
      `${product.brand} ${product.name}`,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      product.proteinPerServing >= 15
        ? "간식치고 단백질 숫자가 강해 운동 후용으로도 보기 좋음"
        : (product.calories ?? 999) <= 100
          ? "가벼운 아침·다이어트 간식용으로 무난"
          : "포만감이 좋아 한 끼 보완용으로 보기 쉬움",
    ],
  })),
  sections: [
    {
      title: "목적별 추천",
      items: [
        {
          title: "아침 간편 식사",
          body: "요프로 플레인, 그릭데이 라이트처럼 단백질이 안정적으로 들어가고 과하게 무겁지 않은 제품이 좋습니다. 토핑을 추가하더라도 기본이 가벼워야 조절이 쉽습니다.",
        },
        {
          title: "운동 후 간식",
          body: "요프로 플레인처럼 단백질 수치가 확실한 제품이 직관적입니다. 요거트는 RTD 음료보다 천천히 먹게 돼서 간식 만족감도 더 큽니다.",
        },
        {
          title: "다이어트 중 가벼운 보완",
          body: "룩트 아이슬란딕 마일드, 그릭데이 라이트처럼 100kcal 전후 구간 제품이 관리가 쉽습니다. 다만 토핑을 많이 넣으면 장점이 빠르게 줄어듭니다.",
        },
      ],
    },
    {
      title: "그릭요거트와 프로틴 요거트 차이",
      items: [
        {
          title: "그릭·아이슬란딕 계열",
          body: "유청을 걸러 농축한 타입이라 질감이 진하고 포만감이 좋습니다. 숫자도 중요하지만 ‘한 컵 먹고 얼마나 오래 버티는지’가 장점입니다.",
        },
        {
          title: "프로틴 요거트 계열",
          body: "단백질 숫자가 명확해 입문자가 읽기 쉽습니다. 운동 후 간식이나 다이어트 간식처럼 목적이 분명할 때 더 직관적으로 고르기 좋습니다.",
        },
        {
          title: "실전 선택",
          body: "자연식에 가까운 질감과 포만감이면 그릭, 숫자가 분명하고 가볍게 먹기 쉬운 쪽이면 프로틴 요거트가 잘 맞습니다.",
        },
      ],
    },
    {
      title: "자주 하는 실수",
      items: [
        {
          title: "토핑을 너무 많이 올리는 것",
          body: "요거트 자체는 가벼워도 그래놀라, 과일청, 견과를 많이 얹으면 칼로리와 당류가 급격히 올라갑니다. 다이어트용이면 기본 제품 스펙보다 토핑이 더 중요할 때도 있습니다.",
        },
        {
          title: "대용량 그릭요거트와 1회 제품을 같은 기준으로 비교",
          body: "통 제품은 양을 조절해서 먹는 전제이고, 컵 제품은 바로 한 번에 먹는 전제입니다. 1회 섭취 기준을 맞춰야 공정하게 비교할 수 있습니다.",
        },
        {
          title: "당류를 안 보는 것",
          body: "요거트는 건강식처럼 보이지만 과일맛 제품은 당류가 빠르게 올라갈 수 있습니다. 단백질만 보고 고르면 다이어트 목적과 어긋날 수 있습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "카테고리 선택 가이드",
      href: "/guides/product-selection-comparison/protein-category-guide",
      description: "요거트가 맞는지, 쉐이크나 바가 더 맞는지 먼저 정리하고 싶다면 이 허브 페이지가 출발점입니다.",
    },
    {
      title: "그릭요거트 vs 단백질 요거트",
      href: "/guides/product-selection-comparison/greek-vs-protein-yogurt",
      description: "두 카테고리 차이를 먼저 이해하고 싶다면 비교 페이지를 같이 보는 편이 좋습니다.",
    },
    {
      title: "다이어트 단백질 요거트",
      href: "/guides/product-selection-comparison/diet-protein-yogurt",
      description: "칼로리와 당류를 더 엄격하게 보고 싶다면 다이어트 버전 페이지로 이어집니다.",
    },
  ],
  purchaseLinks: yogurtTopPicks.slice(0, 3).map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  faq: [
    {
      question: "그릭요거트와 단백질 요거트 중 뭐가 더 좋나요?",
      answer: "목적이 다릅니다. 포만감과 자연식 느낌이면 그릭요거트, 숫자를 읽기 쉽고 단백질 보충 목적이 분명하면 단백질 요거트가 더 잘 맞습니다.",
    },
    {
      question: "요거트도 운동 후 보충용이 될 수 있나요?",
      answer: "가능합니다. 특히 단백질이 10g 이상 들어 있는 제품은 가벼운 운동 후 간식으로 충분히 활용할 수 있습니다. 다만 빠른 보충만 보면 RTD 음료가 더 직관적입니다.",
    },
    {
      question: "다이어트 중이면 무조건 플레인만 먹어야 하나요?",
      answer: "그럴 필요는 없지만 당류를 확인해야 합니다. 같은 요거트라도 과일맛은 당류가 꽤 높을 수 있어 목적에 따라 선택이 달라집니다.",
    },
  ],
};
proteinYogurtTop5Config.jsonLd = [articleJsonLd(proteinYogurtTop5Config), faqJsonLd(proteinYogurtTop5Config)];

export const greekVsProteinYogurtConfig: CategoryGuideConfig = {
  slug: "greek-vs-protein-yogurt",
  title: "그릭요거트 vs 단백질 요거트",
  description:
    "그릭요거트와 단백질 요거트의 차이를 제조 방식, 단백질 함량, 칼로리, 용도 기준으로 쉽게 정리했습니다. 입문자가 어떤 카테고리를 먼저 골라야 하는지도 설명합니다.",
  keywords: ["그릭요거트 단백질 요거트 차이", "그릭요거트 단백질", "단백질 요거트 뭐가 다른가"],
  badge: "요거트 비교",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 요거트 카테고리 + 일반 제조 방식 차이 정리",
  intro:
    "요거트 카테고리에서 가장 많이 헷갈리는 조합이 그릭요거트와 단백질 요거트입니다. 둘 다 건강식처럼 보이지만 만들어지는 방식도 다르고, 잘 맞는 상황도 다릅니다. 그래서 이 페이지는 숫자보다 용도 기준으로 쉽게 정리했습니다.",
  summary: [
    "그릭요거트는 농축형이라 질감과 포만감이 강하고, 단백질 요거트는 제품 설계상 숫자를 읽기 쉬운 편입니다.",
    `ProteinLab DB 기준으로 그릭·아이슬란딕 계열은 단백질 ${greekProteinRange.proteinMin.toFixed(1)}~${greekProteinRange.proteinMax.toFixed(1)}g, 프로틴 요거트 계열은 ${proteinYogurtRange.proteinMin.toFixed(1)}~${proteinYogurtRange.proteinMax.toFixed(1)}g 범위가 확인됩니다.`,
    "입문자는 한 컵 기준으로 판단하기 쉬운 단백질 요거트, 자연식과 포만감을 중시하면 그릭요거트 쪽이 더 맞는 경우가 많습니다.",
  ],
  comparisonTitle: "핵심 차이 비교표",
  comparisonColumns: ["그릭요거트", "단백질 요거트"],
  comparisonRows: [
    { label: "제조 방식", values: ["유청 제거 농축 중심", "단백질 강화 설계 제품이 많음"] },
    { label: "체감 질감", values: ["꾸덕하고 진한 편", "보다 가볍고 직관적인 편"] },
    { label: "단백질 해석", values: ["브랜드·용량 차이가 큼", "1회 기준 숫자를 읽기 쉬움"] },
    { label: "잘 맞는 상황", values: ["자연식 간식·포만감", "운동 후 간식·다이어트 보완"] },
    { label: "입문 난도", values: ["질감 취향을 탈 수 있음", "비교적 진입이 쉬움"] },
  ],
  sections: [
    {
      title: "목적별 추천",
      items: [
        {
          title: "자연식 간식 중심",
          body: "그릭요거트가 더 잘 맞습니다. 첨가 성분이 단순하고 질감이 진해서, 간식이면서도 ‘먹은 느낌’이 있는 쪽을 선호할 때 만족도가 높습니다.",
        },
        {
          title: "운동 후 가볍게",
          body: "단백질 요거트가 더 직관적입니다. 1회당 단백질 숫자가 잘 보이고, 컵 하나로 끝나는 구조라 루틴에 넣기 쉽습니다.",
        },
        {
          title: "다이어트 중",
          body: "둘 다 가능하지만 저당·저칼로리 제품을 고르는 것이 핵심입니다. 카테고리보다 실제 제품 스펙이 더 중요할 때가 많습니다.",
        },
      ],
    },
    {
      title: "어디서 가장 많이 헷갈리나",
      items: [
        {
          title: "그릭이면 무조건 단백질이 더 높다고 생각",
          body: "브랜드와 용량에 따라 다릅니다. 큰 통 제품과 소용량 컵 제품을 같은 기준으로 비교하면 결론이 뒤틀리기 쉽습니다.",
        },
        {
          title: "프로틴 요거트는 가공식이라 덜 건강하다고 생각",
          body: "가공 여부보다 내가 어떤 목적으로 먹는지가 더 중요합니다. 운동 후 간식이나 숫자 관리 목적이면 오히려 더 편할 수 있습니다.",
        },
        {
          title: "질감 취향을 무시하는 것",
          body: "그릭요거트는 질감 호불호가 생각보다 큽니다. 숫자가 좋아도 꾸준히 못 먹으면 내 제품이 아닙니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "단백질 요거트 추천 TOP 5",
      href: "/guides/product-selection-comparison/protein-yogurt-top5",
      description: "실제 제품 후보를 바로 보고 싶다면 TOP 5 페이지가 더 빠릅니다.",
    },
    {
      title: "다이어트 단백질 요거트",
      href: "/guides/product-selection-comparison/diet-protein-yogurt",
      description: "저칼로리·저당 쪽만 좁혀 보고 싶다면 다이어트 페이지가 이어집니다.",
    },
    {
      title: "카테고리 선택 가이드",
      href: "/guides/product-selection-comparison/protein-category-guide",
      description: "요거트가 내 루틴에 맞는 카테고리인지 먼저 보고 싶다면 상위 허브가 출발점입니다.",
    },
  ],
  purchaseLinks: [
    { label: "요프로 플레인 보기", slug: "yopro-plain-150" },
    { label: "룩트 아이슬란딕 보기", slug: "lookt-icelandic-mild-100" },
    { label: "그릭데이 라이트 보기", slug: "greekday-light-100" },
  ],
  faq: [
    {
      question: "그릭요거트가 단백질 요거트보다 무조건 더 건강한가요?",
      answer: "그렇게 단순하게 볼 수는 없습니다. 자연식에 가까운 느낌은 그릭 쪽이 강하지만, 단백질 숫자와 루틴 편의성은 프로틴 요거트가 더 직관적일 수 있습니다.",
    },
    {
      question: "운동 안 해도 단백질 요거트를 먹어도 되나요?",
      answer: "네. 단백질 간식이나 아침 보완용으로 충분히 사용할 수 있습니다. 운동 여부보다 전체 식사 패턴 속에서 어떻게 넣는지가 더 중요합니다.",
    },
    {
      question: "다이어트에는 어느 쪽이 더 유리한가요?",
      answer: "카테고리보다 실제 제품 스펙이 더 중요합니다. 저당, 저칼로리, 단백질 10g 이상 기준으로 보면 둘 다 좋은 선택지가 있습니다.",
    },
  ],
};
greekVsProteinYogurtConfig.jsonLd = [articleJsonLd(greekVsProteinYogurtConfig), faqJsonLd(greekVsProteinYogurtConfig)];

export const dietProteinYogurtConfig: CategoryGuideConfig = {
  slug: "diet-protein-yogurt",
  title: "다이어트 단백질 요거트 추천",
  description:
    "ProteinLab DB 기준으로 칼로리 100kcal 이하, 당류 5g 이하, 단백질 10g 이상 조건을 통과한 다이어트용 요거트만 골라 정리했습니다.",
  keywords: ["다이어트 요거트", "저칼로리 단백질 요거트", "다이어트 그릭요거트", "저당 요거트"],
  badge: "다이어트 요거트",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 필터 · 100kcal 이하 + 당류 5g 이하 + 단백질 10g 이상",
  intro:
    "다이어트용 요거트는 건강한 이미지보다 실제 숫자가 중요합니다. 이 페이지는 칼로리, 당류, 단백질 기준을 동시에 통과한 제품만 추려서, 아침 간식이나 운동 후 간식으로 쓰기 쉬운 후보만 보여줍니다.",
  summary: [
    "조건을 동시에 만족하는 제품은 많지 않아서, 실제로는 요프로 플레인, 룩트 아이슬란딕 마일드, 그릭데이 라이트가 대표 후보입니다.",
    "요거트는 가벼워 보이지만 토핑이 붙는 순간 다이어트용이라는 장점이 빠르게 약해집니다.",
    "다이어트 간식으로는 가볍고 좋지만, 식사 전부를 대신하는 용도로 과신하면 금방 허기가 올 수 있습니다.",
  ],
  comparisonTitle: "다이어트 추천 제품",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "포인트"],
  comparisonRows: dietYogurtPicks.map((product) => ({
    label: product.brand,
    values: [
      product.name,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      (product.calories ?? 999) <= 90 ? "아침·간식용으로 가볍게 넣기 좋음" : "숫자와 포만감 균형이 무난함",
    ],
  })),
  sections: [
    {
      title: "다이어트에 맞는 이유",
      items: [
        {
          title: "칼로리 부담이 낮음",
          body: "100kcal 전후 구간이라 간식으로 넣기 쉽습니다. 다이어트용 간식은 하루 총열량 안에서 관리가 쉬운지가 핵심입니다.",
        },
        {
          title: "당류를 같이 관리 가능",
          body: "요거트는 건강식처럼 보이지만 당류 차이가 꽤 큽니다. 이 페이지는 다이어트 관점에서 당류를 같이 본 제품만 모았습니다.",
        },
        {
          title: "단백질 10g 이상 확보",
          body: "단순히 가벼운 간식이 아니라 단백질 보완 역할을 할 수 있는 최소선입니다. 숫자가 낮으면 결국 일반 디저트와 차이가 줄어듭니다.",
        },
      ],
    },
    {
      title: "활용법",
      items: [
        {
          title: "아침 식사 보완",
          body: "시간이 없을 때 가장 쓰기 쉬운 방식입니다. 다만 요거트 하나만으로 끝내기보다 과일이나 삶은 달걀처럼 보완 재료를 조금 붙이는 편이 더 안정적입니다.",
        },
        {
          title: "운동 후 가벼운 간식",
          body: "액상 음료가 부담스러울 때 대안이 됩니다. 특히 요프로처럼 단백질이 분명한 제품은 루틴에 넣기 쉽습니다.",
        },
        {
          title: "야식 대체",
          body: "단맛이 당길 때 디저트 대신 넣기 좋지만, 토핑과 꿀을 많이 얹는 순간 장점이 사라집니다. 이 페이지는 기본 제품 스펙 기준으로 봐야 합니다.",
        },
      ],
    },
    {
      title: "같이 보면 좋은 페이지",
      items: [
        {
          title: "다이어트 단백질 쉐이크",
          body: "아침 대용이나 포만감 쪽이 더 중요하면 쉐이크가 나을 수 있습니다. 요거트보다 한 끼 대체에 더 가깝습니다.",
        },
        {
          title: "다이어트 단백질 바",
          body: "씹는 간식이 필요하거나 이동 중 먹어야 하면 바가 더 실용적입니다. 요거트는 집이나 사무실 루틴에 더 잘 맞습니다.",
        },
        {
          title: "단백질 요거트 TOP 5",
          body: "다이어트 한정이 아니라 전체 후보를 보고 싶다면 상위권 페이지부터 먼저 보는 편이 좋습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "단백질 요거트 추천 TOP 5",
      href: "/guides/product-selection-comparison/protein-yogurt-top5",
      description: "다이어트 한정이 아니라 전체 상위권 제품을 먼저 보고 싶다면 이 페이지를 보세요.",
    },
    {
      title: "다이어트 단백질 쉐이크",
      href: "/guides/product-selection-comparison/diet-protein-shake",
      description: "요거트보다 포만감과 식사 대용 쪽이 중요하면 쉐이크 페이지가 더 맞습니다.",
    },
    {
      title: "다이어트 단백질 바",
      href: "/guides/product-selection-comparison/diet-protein-bar",
      description: "이동 중 간식이라면 바 쪽이 더 실용적입니다. 다이어트용 후보만 따로 정리했습니다.",
    },
  ],
  purchaseLinks: dietYogurtPicks.map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  faq: [
    {
      question: "다이어트 중이면 요거트가 쉐이크보다 더 좋은가요?",
      answer: "그렇지는 않습니다. 가볍고 부담 없는 간식은 요거트가 좋고, 아침 대용이나 포만감은 쉐이크가 더 나을 수 있습니다.",
    },
    {
      question: "플레인만 먹어야 하나요?",
      answer: "반드시 그럴 필요는 없지만, 다이어트 기준이라면 당류를 먼저 확인해야 합니다. 맛 제품은 생각보다 당류가 높을 수 있습니다.",
    },
    {
      question: "토핑을 조금 올려도 괜찮나요?",
      answer: "가능하지만 양을 작게 유지해야 합니다. 과일, 그래놀라, 견과를 많이 올리면 기본 제품의 저칼로리 장점이 빠르게 줄어듭니다.",
    },
  ],
};
dietProteinYogurtConfig.jsonLd = [articleJsonLd(dietProteinYogurtConfig), faqJsonLd(dietProteinYogurtConfig)];

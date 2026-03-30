import type { CategoryGuideConfig } from "./categoryGuideShared";
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

function getBySlug(slug: string) {
  const product = shakeProducts.find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Shake product not found: ${slug}`);
  }
  return product;
}

const womenShakePicks = [
  getBySlug("allthebetter-proteinshake-low-sugar-black-soy-milk-45"),
  getBySlug("labnosh-slimshake-jeju-matcha-45"),
  getBySlug("labnosh-slimshake-strawberry-cookie-crumble-45"),
  getBySlug("allthebetter-proteinshake-low-sugar-17grain-misugaru-45"),
  getBySlug("labnosh-slimshake-earl-grey-milk-tea-45"),
];

const morningShakePicks = [
  getBySlug("labnosh-slimshake-strawberry-cookie-crumble-45"),
  getBySlug("labnosh-slimshake-jeju-matcha-45"),
  getBySlug("labnosh-slimshake-earl-grey-milk-tea-45"),
  getBySlug("allthebetter-proteinshake-low-sugar-black-soy-milk-45"),
  getBySlug("allthebetter-proteinshake-low-sugar-17grain-misugaru-45"),
];

const oliveYoungShakePicks = shakeProducts
  .filter((product) => product.officialUrl?.includes("oliveyoung.co.kr"))
  .sort(
    (a, b) =>
      (a.calories ?? 999) - (b.calories ?? 999) ||
      (a.sugar ?? 99) - (b.sugar ?? 99) ||
      b.proteinPerServing - a.proteinPerServing,
  )
  .slice(0, 6);

export const proteinShakeForWomenConfig: CategoryGuideConfig = {
  slug: "protein-shake-for-women",
  title: "여성을 위한 단백질 쉐이크 추천",
  description:
    "다이어트, 아침 대용, 이너뷰티 관점에서 부담 없이 시작하기 좋은 파우치형 단백질 쉐이크를 ProteinLab DB 기준으로 골랐습니다.",
  keywords: ["여성 단백질 쉐이크", "여자 프로틴 쉐이크", "여성 다이어트 단백질", "여성 프로틴 추천"],
  badge: "여성 쉐이크",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 파우치형 쉐이크 기준 · 칼로리 + 당류 + 맛 지속성 + 식이섬유",
  intro:
    "여성용 단백질 쉐이크를 찾는 검색은 운동 보충보다 다이어트, 아침 대용, 체형 유지에 더 가깝습니다. 그래서 이 페이지는 ‘단백질 숫자가 가장 높은가’보다 ‘꾸준히 마시기 쉬운가’를 중심으로 골랐습니다.",
  summary: [
    "여성 타깃 쉐이크는 고단백보다 맛, 칼로리, 포만감의 균형이 더 중요합니다.",
    "랩노쉬는 맛과 식이섬유, 올더배러는 저당과 올리브영 접근성 쪽에서 강점이 분명합니다.",
    "처음 시작이라면 올리브영 단품 테스트, 정착 후에는 쿠팡 박스 구매로 넘어가는 흐름이 가장 실용적입니다.",
  ],
  comparisonTitle: "여성 추천 제품",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "포인트"],
  comparisonRows: womenShakePicks.map((product) => ({
    label: product.brand,
    values: [
      product.name,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      product.officialUrl?.includes("oliveyoung.co.kr")
        ? "올리브영 접근성이 좋아 처음 시도하기 편함"
        : `식이섬유 ${(product.nutritionPerBottle?.fiberG ?? 0).toFixed(1)}g로 포만감 보강`,
    ],
  })),
  sections: [
    {
      title: "여성 기준으로 중요한 포인트",
      items: [
        {
          title: "칼로리 200kcal 이하",
          body: "여성 타깃 검색은 근육 보충보다 체형 유지와 다이어트에 더 가깝습니다. 그래서 칼로리를 먼저 보는 쪽이 실제 사용감과 더 맞습니다.",
        },
        {
          title: "맛이 중요합니다",
          body: "숫자가 아무리 좋아도 맛이 안 맞으면 루틴이 끊깁니다. 초코, 말차, 밀크티처럼 거부감이 낮은 맛부터 시작하는 편이 좋습니다.",
        },
        {
          title: "당류와 식이섬유",
          body: "당류가 낮고 식이섬유가 붙어 있으면 다이어트 관점에서 더 유리합니다. 포만감과 지속성을 같이 가져가기 쉬워집니다.",
        },
      ],
    },
    {
      title: "이런 상황에 잘 맞습니다",
      items: [
        {
          title: "아침을 자주 거르는 사람",
          body: "완전한 식사 대용이라기보다, 공복으로 버티는 것보다 훨씬 나은 선택지가 됩니다. 특히 파우치형은 준비 시간이 거의 없다는 점이 강합니다.",
        },
        {
          title: "다이어트 중 허기가 자주 오는 사람",
          body: "간식을 디저트로 바꾸기보다 쉐이크로 정리하면 칼로리와 단백질을 동시에 관리하기 쉽습니다. 다만 하루 두 끼 이상을 쉐이크로 대체하는 방식은 오래가기 어렵습니다.",
        },
        {
          title: "맛 때문에 기존 프로틴을 포기했던 사람",
          body: "이 카테고리는 RTD 음료보다 맛 지향 제품이 많아 진입 장벽이 낮습니다. 특히 랩노쉬와 올더배러는 ‘계속 마실 수 있는가’ 측면에서 유리합니다.",
        },
      ],
    },
    {
      title: "구매 채널 선택",
      items: [
        {
          title: "올리브영",
          body: "처음 시도, 단품 테스트, 오프라인 픽업에 강합니다. 브랜드 신뢰와 접근성이 중요하면 올리브영 쪽이 편합니다.",
        },
        {
          title: "쿠팡",
          body: "박스 기준으로 개당 단가가 내려갑니다. 이미 입맛이 맞는 제품이 정해졌다면 결국 쿠팡이 더 효율적인 경우가 많습니다.",
        },
        {
          title: "실전 추천",
          body: "처음엔 올리브영, 정착 후에는 쿠팡. 여성 타깃 쉐이크는 이 구매 흐름이 가장 자연스럽습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "단백하니 단백질 쉐이크 추천",
      href: "/guides/product-selection-comparison/danbaekhani-protein-shake",
      description: "올리브영과 여성 타깃 흐름에서 자주 같이 보이는 단백하니 라인을 맛과 칼로리 기준으로 바로 확인할 수 있습니다.",
    },
    {
      title: "플라이밀 단백질 쉐이크 추천",
      href: "/guides/product-selection-comparison/flymill-protein-shake",
      description: "플라이밀을 브랜드 기준으로 먼저 보고 싶다면 피넛버터, 초코, 쿠키앤크림 차이를 정리한 이 페이지가 더 빠릅니다.",
    },
    {
      title: "다이어트 단백질 쉐이크",
      href: "/guides/product-selection-comparison/diet-protein-shake",
      description: "여성 타깃 중에서도 다이어트 숫자 기준을 더 엄격하게 보고 싶다면 이 페이지가 이어집니다.",
    },
    {
      title: "랩노쉬 라인업",
      href: "/guides/product-selection-comparison/labnosh-lineup",
      description: "맛 선택지와 브랜드 내 차이를 더 자세히 보고 싶다면 랩노쉬 라인업 페이지가 좋습니다.",
    },
    {
      title: "아침 식사 대용 단백질 쉐이크",
      href: "/guides/product-selection-comparison/morning-protein-shake",
      description: "다이어트보다 아침 루틴 쪽이 더 중요하면 이 페이지가 더 잘 맞습니다.",
    },
  ],
  purchaseLinks: womenShakePicks.slice(0, 3).map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  externalLinks: [
    {
      label: "올리브영 단백질 쉐이크 검색",
      href: "https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query=%EB%8B%A8%EB%B0%B1%EC%A7%88%20%EC%89%90%EC%9D%B4%ED%81%AC",
      description: "처음 시도라면 단품이나 소량 구매로 맛을 먼저 확인하는 쪽이 안전합니다.",
    },
  ],
  faq: [
    {
      question: "운동 안 해도 여성용 단백질 쉐이크를 마셔도 되나요?",
      answer: "네. 이 페이지는 운동 보충보다 아침 대용, 다이어트, 식사 보완에 더 맞춘 기준입니다. 운동을 하지 않아도 충분히 활용할 수 있습니다.",
    },
    {
      question: "여성용 쉐이크는 무조건 저칼로리가 더 좋나요?",
      answer: "항상 그렇지는 않습니다. 너무 가벼우면 포만감이 부족해서 오히려 간식을 더 먹게 될 수 있습니다. 칼로리, 당류, 식이섬유를 같이 보는 편이 맞습니다.",
    },
    {
      question: "올리브영과 쿠팡 중 어디서 사는 게 좋나요?",
      answer: "처음엔 올리브영, 정착 후에는 쿠팡이 일반적으로 효율적입니다. 맛과 질감 취향 확인 전에는 단품 테스트가 더 중요합니다.",
    },
  ],
};
proteinShakeForWomenConfig.jsonLd = [
  articleJsonLd(proteinShakeForWomenConfig),
  faqJsonLd(proteinShakeForWomenConfig),
];

export const morningProteinShakeConfig: CategoryGuideConfig = {
  slug: "morning-protein-shake",
  title: "아침 식사 대용 단백질 쉐이크",
  description:
    "바쁜 아침에 마시기 좋은 파우치형 단백질 쉐이크를 포만감, 칼로리, 식이섬유 기준으로 정리했습니다. 출근 전 루틴용 제품을 찾는 사람에게 맞춘 페이지입니다.",
  keywords: ["아침 단백질 쉐이크", "아침 식사 대용 쉐이크", "아침 대용 단백질", "바쁜 아침 쉐이크"],
  badge: "아침 쉐이크",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 파우치형 쉐이크 기준 · 포만감용 식이섬유 + 단백질 + 공복 부담",
  intro:
    "아침용 쉐이크는 다이어트용 쉐이크와 기준이 조금 다릅니다. 가장 낮은 칼로리보다, 공복에 부담이 적고 점심 전까지 버틸 수 있는지가 더 중요합니다. 그래서 이번 리스트는 포만감과 루틴 지속성 중심으로 골랐습니다.",
  summary: [
    "아침 대용용으로는 식이섬유가 붙은 랩노쉬 슬림쉐이크 계열이 가장 안정적입니다.",
    "올더배러 저당 검은콩두유, 저당 17곡 미숫가루는 아침 루틴에 잘 맞는 고소한 계열 대안입니다.",
    "아침 쉐이크는 한 끼를 완전히 대체한다기보다, 굶는 대신 안정적으로 시작하는 보완재로 보는 편이 더 현실적입니다.",
  ],
  comparisonTitle: "아침 대용 추천 제품",
  comparisonColumns: ["제품명", "단백질", "칼로리", "포만감", "포인트"],
  comparisonRows: morningShakePicks.map((product) => ({
    label: product.brand,
    values: [
      product.name,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      (product.nutritionPerBottle?.fiberG ?? 0) >= 7 ? "상" : "중상",
      (product.nutritionPerBottle?.fiberG ?? 0) >= 7
        ? `식이섬유 ${(product.nutritionPerBottle?.fiberG ?? 0).toFixed(1)}g`
        : "고소한 맛으로 아침 공복 진입이 쉬움",
    ],
  })),
  sections: [
    {
      title: "아침 대용 기준",
      items: [
        {
          title: "포만감",
          body: "아침 쉐이크는 배를 얼마나 오래 잡아 주는지가 중요합니다. 그래서 단백질 20g 전후에 식이섬유가 어느 정도 붙은 제품이 더 유리합니다.",
        },
        {
          title: "공복 부담",
          body: "아침 공복에는 너무 진하거나 단맛이 강한 제품이 부담스러울 수 있습니다. 고소한 맛, 밀크티, 말차처럼 진입 장벽이 낮은 맛이 더 잘 맞는 경우가 많습니다.",
        },
        {
          title: "준비 시간",
          body: "아침 루틴은 번거로우면 오래가기 어렵습니다. 파우치형은 바로 흔들어 마실 수 있어 출근·등교 루틴에 가장 잘 맞습니다.",
        },
      ],
    },
    {
      title: "활용 팁",
      items: [
        {
          title: "전날 밤 냉장 보관",
          body: "아침에 차갑게 마시면 진입 장벽이 낮아집니다. 준비 시간이 거의 없어져서 루틴 지속성이 훨씬 좋아집니다.",
        },
        {
          title: "과한 토핑 대신 가벼운 보완",
          body: "과일 반 개나 삶은 달걀 하나 정도를 붙이는 식이 현실적입니다. 그래놀라를 많이 얹으면 아침 쉐이크의 장점이 금방 줄어듭니다.",
        },
        {
          title: "매일 100% 대체보다 주 3~4회",
          body: "완전한 식사 대용으로 고정하기보다는 바쁜 날 루틴용으로 쓰는 편이 더 오래갑니다. 아침 쉐이크는 편의성 보완재로 보는 게 맞습니다.",
        },
      ],
    },
    {
      title: "누구에게 특히 잘 맞나",
      items: [
        {
          title: "출근 직전 시간이 없는 직장인",
          body: "굶는 것보다 훨씬 안정적으로 하루를 시작할 수 있습니다. 커피만 마시고 버티는 패턴보다 포만감과 집중력이 낫습니다.",
        },
        {
          title: "아침을 잘 못 먹는 사람",
          body: "씹는 식사가 부담스러운 사람은 쉐이크 쪽이 훨씬 진입하기 쉽습니다. 특히 말차, 밀크티, 미숫가루 계열은 거부감이 적습니다.",
        },
        {
          title: "점심 전 허기가 자주 오는 사람",
          body: "식이섬유가 높은 제품을 고르면 오전 간식 욕구를 줄이는 데 도움이 됩니다. 단순 저칼로리 제품보다 이 점이 더 중요합니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "여성을 위한 단백질 쉐이크",
      href: "/guides/product-selection-comparison/protein-shake-for-women",
      description: "아침 대용뿐 아니라 다이어트와 체형 유지 중심으로 보고 싶다면 이 페이지가 더 넓은 가이드입니다.",
    },
    {
      title: "다이어트 단백질 쉐이크",
      href: "/guides/product-selection-comparison/diet-protein-shake",
      description: "아침보다 숫자 중심의 다이어트 기준을 더 엄격하게 보고 싶다면 다이어트 페이지로 이어집니다.",
    },
    {
      title: "랩노쉬 라인업",
      href: "/guides/product-selection-comparison/labnosh-lineup",
      description: "아침용으로 많이 선택되는 랩노쉬 라인을 더 자세히 보고 싶다면 이 페이지를 보세요.",
    },
  ],
  purchaseLinks: morningShakePicks.slice(0, 3).map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  externalLinks: [
    {
      label: "올리브영 아침 대용 쉐이크 검색",
      href: "https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query=%EC%89%90%EC%9D%B4%ED%81%AC",
      description: "출근길 픽업이나 단품 테스트가 필요하면 올리브영 채널이 더 편합니다.",
    },
  ],
  faq: [
    {
      question: "아침 식사를 매일 쉐이크로 대체해도 되나요?",
      answer: "가끔은 괜찮지만 장기적으로는 주 3~4회 정도의 보완 루틴으로 보는 편이 더 현실적입니다. 아침 쉐이크는 편의성 보완재에 가깝습니다.",
    },
    {
      question: "아침에는 저칼로리 제품이 무조건 좋은가요?",
      answer: "너무 가벼우면 오전 중 허기가 빨리 올 수 있습니다. 아침용은 칼로리보다 포만감과 식이섬유를 같이 보는 편이 맞습니다.",
    },
    {
      question: "아침용과 다이어트용 쉐이크는 같은 건가요?",
      answer: "겹치는 제품도 있지만 기준이 조금 다릅니다. 아침용은 포만감과 공복 부담, 다이어트용은 칼로리와 당류 관리 비중이 더 큽니다.",
    },
  ],
};
morningProteinShakeConfig.jsonLd = [articleJsonLd(morningProteinShakeConfig), faqJsonLd(morningProteinShakeConfig)];

export const oliveYoungProteinShakeConfig: CategoryGuideConfig = {
  slug: "oliveyoung-protein-shake",
  title: "올리브영 단백질 쉐이크 추천",
  description:
    "올리브영에서 실제로 접근 가능한 단백질 쉐이크만 정리했습니다. 단품 테스트에 유리한 제품과 쿠팡 박스 구매와의 차이도 함께 설명합니다.",
  keywords: ["올리브영 단백질 쉐이크", "올리브영 프로틴", "올리브영 단백질 추천", "올리브영 쉐이크"],
  badge: "올리브영 쉐이크",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 기준 · officialUrl에 올리브영 브랜드/채널이 확인되는 제품 중심",
  intro:
    "쉐이크를 처음 사는 사람에게는 숫자보다 구매 채널이 더 중요할 때가 많습니다. 올리브영은 단품 테스트와 오프라인 픽업이 가능해서, ‘박스 구매 전 맛 확인’ 단계에 특히 강합니다. 이 페이지는 그 기준으로 정리한 채널형 가이드입니다.",
  summary: [
    "올리브영 쉐이크는 단품 테스트와 당일 구매에 강하고, 쿠팡은 박스 구매 시 개당 단가가 유리합니다.",
    "현재 로컬 DB 기준으로는 올더배러, 단백하니 계열이 올리브영 채널 접근성이 뚜렷합니다.",
    "채널 페이지에서는 순수 스펙보다 ‘처음 시작하기 쉬운가’가 더 중요합니다.",
  ],
  comparisonTitle: "올리브영 입점 쉐이크",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "채널 메모"],
  comparisonRows: oliveYoungShakePicks.map((product) => ({
    label: product.brand,
    values: [
      product.name,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      product.brand === "올더배러" ? "저당 라인 선택지가 넓어 비교 구매에 유리" : "단품 테스트 진입용으로 부담이 적음",
    ],
  })),
  sections: [
    {
      title: "올리브영이 유리한 이유",
      items: [
        {
          title: "처음 맛 테스트",
          body: "쉐이크는 숫자보다 맛 취향이 중요할 때가 많습니다. 올리브영은 단품 중심으로 접근하기 쉬워 첫 구매 실패를 줄여 줍니다.",
        },
        {
          title: "당일 픽업",
          body: "급하게 필요한 날에는 배송보다 오프라인 접근성이 훨씬 중요합니다. 이 점이 쿠팡과 가장 큰 차이입니다.",
        },
        {
          title: "세일과 쿠폰",
          body: "정기 할인 시즌에는 단품 기준 체감 가격이 내려가기도 합니다. 처음엔 이런 시기에 여러 맛을 테스트해 보는 방식이 효율적입니다.",
        },
      ],
    },
    {
      title: "쿠팡과의 차이",
      items: [
        {
          title: "올리브영",
          body: "단품, 소량, 오프라인 접근성이 강점입니다. 입문자나 맛 테스트 단계에서는 올리브영 쪽이 더 편한 경우가 많습니다.",
        },
        {
          title: "쿠팡",
          body: "정착 후에는 박스 단가가 확실히 유리합니다. 같은 제품을 반복 구매할 단계라면 결국 쿠팡 쪽으로 넘어가는 경우가 많습니다.",
        },
        {
          title: "실전 추천",
          body: "처음엔 올리브영, 계속 먹을 제품이 정해지면 쿠팡. 쉐이크 채널 선택은 이 흐름이 가장 자연스럽습니다.",
        },
      ],
    },
    {
      title: "누가 보면 좋은 페이지인가",
      items: [
        {
          title: "프로틴을 처음 사는 사람",
          body: "박스 구매가 부담스럽고, 일단 어떤 맛인지 확인해 보고 싶은 사람에게 가장 잘 맞습니다.",
        },
        {
          title: "오프라인 채널 선호 사용자",
          body: "당일 픽업이나 매장 구매 신뢰를 더 중요하게 보는 사람이라면 올리브영 기준 비교가 더 실용적입니다.",
        },
        {
          title: "여성·다이어트 타깃",
          body: "올리브영 채널은 여성과 입문자 유입이 많아, 다이어트·아침 대용용 쉐이크를 찾는 검색 의도와도 잘 맞습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "플라이밀 단백질 쉐이크 추천",
      href: "/guides/product-selection-comparison/flymill-protein-shake",
      description: "올리브영에서 플라이밀이 왜 먼저 비교되는지, 피넛버터와 초코 중 무엇부터 보면 되는지 브랜드 기준으로 정리했습니다.",
    },
    {
      title: "단백하니 단백질 쉐이크 추천",
      href: "/guides/product-selection-comparison/danbaekhani-protein-shake",
      description: "올영픽과 저당 기준으로 단백하니를 먼저 보고 싶다면 시그니처, 초코, 말차를 따로 정리한 이 페이지가 더 직접적입니다.",
    },
    {
      title: "랩노쉬 라인업",
      href: "/guides/product-selection-comparison/labnosh-lineup",
      description: "올리브영에서 함께 비교되는 대표 브랜드 흐름을 더 자세히 보고 싶다면 이 페이지가 이어집니다.",
    },
    {
      title: "여성을 위한 단백질 쉐이크",
      href: "/guides/product-selection-comparison/protein-shake-for-women",
      description: "올리브영 채널에서 자주 찾는 여성·다이어트 관점 큐레이션은 이 페이지가 더 자세합니다.",
    },
    {
      title: "단백질 쉐이크 추천 TOP 7",
      href: "/guides/product-selection-comparison/protein-shake-top7",
      description: "채널이 아니라 전체 쉐이크 시장 기준 상위권 제품을 보고 싶다면 TOP 7으로 이어집니다.",
    },
  ],
  purchaseLinks: oliveYoungShakePicks.slice(0, 3).map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  externalLinks: [
    {
      label: "올리브영 단백질 쉐이크 검색",
      href: "https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query=%EB%8B%A8%EB%B0%B1%EC%A7%88%20%EC%89%90%EC%9D%B4%ED%81%AC",
      description: "단품 구매와 당일 픽업이 필요할 때 가장 먼저 확인할 채널입니다.",
    },
    {
      label: "올더배러 올리브영 브랜드 페이지",
      href: "https://m.oliveyoung.co.kr/m/mtn/brand/allthebetter",
      description: "올리브영 채널에서 저당 쉐이크를 중심으로 비교해 보기 좋은 브랜드입니다.",
    },
  ],
  faq: [
    {
      question: "올리브영 쉐이크는 쿠팡보다 비싼가요?",
      answer: "대체로 단품 기준은 올리브영이 더 비싸고, 박스 기준은 쿠팡이 더 유리합니다. 다만 올리브영 세일과 쿠폰이 붙으면 단품 테스트 용도로는 충분히 매력적일 수 있습니다.",
    },
    {
      question: "올리브영에서 단백질 쉐이크를 사는 가장 큰 장점은 뭔가요?",
      answer: "단품 테스트와 오프라인 접근성입니다. 박스 구매 전에 맛과 질감을 확인할 수 있다는 점이 가장 큽니다.",
    },
    {
      question: "올리브영 채널 페이지와 TOP 7 페이지는 뭐가 다른가요?",
      answer: "TOP 7은 전체 시장 기준이고, 이 페이지는 올리브영에서 실제로 접근 가능한 제품만 따로 정리한 채널 특화 페이지입니다.",
    },
  ],
};
oliveYoungProteinShakeConfig.methodologyNote =
  "ProteinLab DB 기준 · officialUrl에 올리브영 브랜드/채널이 확인되는 제품 중심, 실제 입점/재고는 변동 가능";
oliveYoungProteinShakeConfig.summary = [
  "올리브영 쉐이크는 단품 테스트와 당일 구매에 강하고, 쿠팡은 박스 구매 시 개당 단가가 유리합니다.",
  "현재 로컬 DB 기준으로는 올더배러, 단백하니 계열이 올리브영 채널 접근성이 뚜렷합니다.",
  "이 페이지는 올리브영 채널에서 접근 가능한 브랜드/제품 후보를 정리한 가이드이고, 실제 오프라인 재고나 입점 상태는 매장별로 달라질 수 있습니다.",
];
oliveYoungProteinShakeConfig.faq = [
  ...(oliveYoungProteinShakeConfig.faq ?? []),
  {
    question: "이 페이지에 있으면 올리브영 매장에서 항상 살 수 있나요?",
    answer:
      "아닙니다. 이 페이지는 올리브영 채널 기준 접근 가능성이 있는 제품을 정리한 것이고, 실제 입점 여부와 재고는 매장과 시기에 따라 달라질 수 있습니다.",
  },
];
oliveYoungProteinShakeConfig.jsonLd = [
  articleJsonLd(oliveYoungProteinShakeConfig),
  faqJsonLd(oliveYoungProteinShakeConfig),
];

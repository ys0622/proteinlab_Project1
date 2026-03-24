import type { CategoryGuideConfig, CategoryMetricRow } from "./categoryGuideShared";
import { getBarProducts } from "@/app/data/barProductsData";

const barProducts = getBarProducts();

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

function parseDensity(value?: string) {
  if (!value) return 0;
  const match = value.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function scoreBar(product: (typeof barProducts)[number]) {
  const fiber = product.nutritionPerBottle?.fiberG ?? 0;
  return product.proteinPerServing * 4 + fiber * 2.5 - (product.calories ?? 0) * 0.07 - (product.sugar ?? 0) * 5;
}

function diversifyBars(products: typeof barProducts, limit: number) {
  const counts = new Map<string, number>();
  const picks: typeof barProducts = [];
  for (const product of products) {
    const count = counts.get(product.brand) ?? 0;
    if (count >= 2) continue;
    picks.push(product);
    counts.set(product.brand, count + 1);
    if (picks.length === limit) break;
  }
  return picks;
}

const barTop10 = diversifyBars(
  [...barProducts]
    .filter((product) => product.proteinPerServing >= 15 && (product.sugar ?? 99) <= 8 && (product.calories ?? 999) <= 220)
    .sort((a, b) => scoreBar(b) - scoreBar(a)),
  10,
);

const convenienceBarSlugs = [
  "dryou-proteinbar-pro-choco-classic",
  "dryou-proteinbar-bite-crunch",
  "labnosh-foodbar-mildchoco",
  "lottewellfood-easyprotein-highprotein-crispy",
];

const convenienceBars = convenienceBarSlugs
  .map((slug) => barProducts.find((product) => product.slug === slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

const dietBarProducts = [...barProducts]
  .filter(
    (product) =>
      product.proteinPerServing >= 15 && (product.calories ?? 999) <= 200 && (product.sugar ?? 99) <= 5,
  )
  .sort(
    (a, b) =>
      (a.calories ?? 999) - (b.calories ?? 999) ||
      (a.sugar ?? 99) - (b.sugar ?? 99) ||
      b.proteinPerServing - a.proteinPerServing,
  )
  .slice(0, 8);

const convenienceStoreMap: Record<string, string> = {
  "dryou-proteinbar-pro-choco-classic": "CU·GS25·세븐일레븐",
  "dryou-proteinbar-bite-crunch": "CU·GS25 일부",
  "labnosh-foodbar-mildchoco": "GS25·CU 일부",
  "lottewellfood-easyprotein-highprotein-crispy": "세븐일레븐·CU 일부",
};

function rankingRows(products: typeof barProducts): CategoryMetricRow[] {
  return products.map((product, index) => ({
    label: `${index + 1}위`,
    values: [
      `${product.brand} ${product.name}`,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      parseDensity(product.density) >= 10.5
        ? "단백질 밀도가 높아 운동 후 간식용으로 유리"
        : product.nutritionPerBottle?.fiberG
          ? `식이섬유 ${product.nutritionPerBottle.fiberG}g로 포만감 보강`
          : "균형형 스펙으로 무난하게 고르기 좋음",
    ],
  }));
}

export const proteinBarTop10Config: CategoryGuideConfig = {
  slug: "protein-bar-top10",
  title: "단백질 바 추천 TOP 10",
  description:
    "ProteinLab DB 바 80개를 기준으로 단백질, 칼로리, 당류, 단백질 밀도를 함께 비교해 지금 고르기 좋은 단백질 바 TOP 10을 정리했습니다.",
  keywords: ["단백질 바 추천", "프로틴바 추천", "단백질 바 순위", "단백질 바 비교"],
  badge: "바 랭킹",
  readingTime: "6분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 바 80개 기준 · 단백질 함량 + 칼로리 + 당류 + 단백질 밀도 종합",
  intro:
    "단백질 바는 숫자만 보면 다 비슷해 보이지만 실제로는 결이 꽤 다릅니다. 어떤 제품은 운동 후 보충용에 가깝고, 어떤 제품은 다이어트 간식용으로 더 낫습니다. 그래서 이번 순위는 단백질만 높은 제품이 아니라 당류와 칼로리까지 같이 본, 실제 구매용 리스트로 정리했습니다.",
  summary: [
    "상위권은 170~190kcal 구간에서 단백질 20g 전후, 당류 1~2g대 제품이 주로 차지합니다.",
    "단백질 바는 저칼로리 간식이 아니라는 점이 핵심입니다. 1개만으로도 180~220kcal를 넘는 경우가 많습니다.",
    "운동 후 간식, 다이어트 간식, 편의점 즉시 구매는 서로 기준이 다르기 때문에 숫자 하나만 보고 고르면 실패할 가능성이 큽니다.",
  ],
  comparisonTitle: "TOP 10 순위표",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "포인트"],
  comparisonRows: rankingRows(barTop10),
  sections: [
    {
      title: "목적별 추천",
      items: [
        {
          title: "운동 후 간식",
          body: "퀘스트, 커클랜드처럼 단백질 밀도가 높은 제품이 유리합니다. 단백질 20g 이상을 한 번에 채우기 쉬워 RTD 음료를 못 마실 때 대안으로 쓰기 좋습니다.",
        },
        {
          title: "다이어트 간식",
          body: "오늘단백, 프로틴방앗간처럼 160~175kcal 구간에서 당류를 낮춘 제품이 부담이 적습니다. 다만 바는 기본적으로 포만감용 간식이지 완전한 저칼로리 식품은 아닙니다.",
        },
        {
          title: "편의점 즉시 구매",
          body: "닥터유, 롯데웰푸드처럼 오프라인 접근성이 높은 브랜드가 편합니다. 다만 편의점 바는 온라인 박스보다 개당 단가가 높다는 점은 감안해야 합니다.",
        },
      ],
    },
    {
      title: "단백질 바를 읽는 기준",
      items: [
        {
          title: "단백질 바 ≠ 저칼로리",
          body: "단백질 바는 이름 때문에 가벼운 간식처럼 느껴지지만 실제로는 1개에 180kcal를 넘는 제품이 흔합니다. 다이어트 중이라면 단백질과 칼로리를 반드시 같이 봐야 합니다.",
        },
        {
          title: "에너지바와 혼동 주의",
          body: "곡물바나 견과바도 포장만 보면 비슷하지만, 단백질이 낮고 당류가 높은 경우가 많습니다. 단백질 15g 미만이면 보충용보다는 일반 간식에 가깝다고 보는 편이 정확합니다.",
        },
        {
          title: "밀도까지 봐야 하는 이유",
          body: "단백질 20g이라도 칼로리가 230kcal인지 170kcal인지에 따라 쓰임새가 달라집니다. ProteinLab에서는 100kcal당 단백질 밀도를 같이 봐야 실제 체감이 맞습니다.",
        },
      ],
    },
    {
      title: "실제 선택 순서",
      items: [
        {
          title: "1단계: 간식인지 보충인지 먼저 구분",
          body: "운동 후 보충이면 단백질 20g 전후와 밀도를 먼저 보고, 다이어트 간식이면 칼로리와 당류를 먼저 보세요. 이 기준을 섞으면 계속 애매한 제품만 남습니다.",
        },
        {
          title: "2단계: 포만감이 중요한지 확인",
          body: "식이섬유가 붙은 제품은 배를 더 오래 잡아주지만, 식감이 텁텁할 수 있습니다. 단순히 맛있게 먹는 간식이면 숫자보다 식감과 맛이 더 중요할 수 있습니다.",
        },
        {
          title: "3단계: 마지막에 채널을 고르기",
          body: "같은 제품도 편의점 단품과 온라인 박스의 가격 차이가 큽니다. 맛 검증 전에는 단품, 마음에 들면 박스로 넘어가는 흐름이 가장 안전합니다.",
        },
      ],
    },
    {
      title: "자주 하는 실수",
      items: [
        {
          title: "단백질 숫자만 보고 바로 박스 구매",
          body: "바는 식감과 단맛 취향 차이가 큽니다. 액상 음료보다 호불호가 강해서, 첫 구매는 단품이나 소량 묶음으로 확인하는 편이 낫습니다.",
        },
        {
          title: "저당이면 다이어트용이라고 생각",
          body: "당류가 낮아도 칼로리가 높으면 다이어트 간식으로는 무거울 수 있습니다. 바는 당류, 칼로리, 단백질을 세트로 봐야 합니다.",
        },
        {
          title: "식사 대용으로 과신",
          body: "단백질 바는 포만감은 주지만 식사 대용으로는 영양 구성이 단순합니다. 하루를 버티는 메인 식사보다는 보충 간식으로 보는 편이 맞습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "카테고리 선택 가이드",
      href: "/guides/product-selection-comparison/protein-category-guide",
      description: "음료, 쉐이크, 바, 요거트 중 지금 목적에 맞는 카테고리부터 정리합니다.",
    },
    {
      title: "편의점 단백질 바 추천",
      href: "/guides/product-selection-comparison/convenience-protein-bar",
      description: "오늘 바로 살 수 있는 바만 따로 보고 싶다면 이 페이지가 더 빠릅니다.",
    },
    {
      title: "단백질 바 선택 가이드",
      href: "/guides/product-selection-comparison/protein-bar-guide",
      description: "숫자를 어떤 순서로 읽어야 하는지 먼저 이해하고 싶다면 기본 가이드를 보세요.",
    },
  ],
  purchaseLinks: barTop10.slice(0, 3).map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  faq: [
    {
      question: "단백질 바는 다이어트 간식으로 괜찮나요?",
      answer: "가능하지만 무조건 가벼운 간식은 아닙니다. 1개에 180kcal를 넘는 제품이 많아서, 칼로리와 당류를 같이 봐야 다이어트용으로 맞는지 판단할 수 있습니다.",
    },
    {
      question: "운동 후에는 음료보다 바가 더 좋을 때도 있나요?",
      answer: "바로 마시기 편한 건 RTD 음료지만, 이동 중이거나 씹는 포만감이 필요할 때는 바가 더 편할 수 있습니다. 대신 소화 속도와 편의성은 음료 쪽이 보통 더 좋습니다.",
    },
    {
      question: "TOP 10이면 1위만 사면 되나요?",
      answer: "아닙니다. 이 순위는 좋은 후보를 좁혀 주는 용도입니다. 운동 후, 다이어트 간식, 편의점 즉시 구매처럼 목적이 다르면 최종 정답도 달라집니다.",
    },
  ],
};
proteinBarTop10Config.methodologyNote =
  "ProteinLab DB 바 80개 기준 · 단백질/칼로리/당류/밀도 종합 + 브랜드 편중을 줄이기 위해 동일 브랜드 최대 2개 반영";
proteinBarTop10Config.summary = [
  "상위권은 170~190kcal 구간에서 단백질 20g 전후, 당류 1~2g대 제품이 주로 차지합니다.",
  "단백질 바는 저칼로리 간식이 아니라는 점이 핵심입니다. 1개만으로도 180~220kcal를 넘는 경우가 많습니다.",
  "이번 TOP 10은 순수 숫자 랭킹이라기보다 실제 비교에 쓸 만한 후보군을 보여 주는 큐레이션에 가깝고, 동일 브랜드는 최대 2개까지만 반영했습니다.",
];
proteinBarTop10Config.faq = [
  ...(proteinBarTop10Config.faq ?? []),
  {
    question: "TOP 10은 완전히 순수한 숫자 랭킹인가요?",
    answer:
      "완전히 그렇지는 않습니다. 기본 점수는 데이터 기준으로 계산하지만, 특정 브랜드가 과도하게 몰리는 걸 막기 위해 동일 브랜드는 최대 2개까지만 반영했습니다.",
  },
];
proteinBarTop10Config.jsonLd = [articleJsonLd(proteinBarTop10Config), faqJsonLd(proteinBarTop10Config)];

export const convenienceProteinBarConfig: CategoryGuideConfig = {
  slug: "convenience-protein-bar",
  title: "편의점 단백질 바 추천",
  description:
    "CU, GS25, 세븐일레븐 등 오프라인에서 바로 사기 쉬운 단백질 바만 따로 정리했습니다. 편의점 구매와 온라인 박스 구매 차이도 함께 설명합니다.",
  keywords: ["편의점 단백질 바", "편의점 프로틴바", "CU 단백질 바", "GS25 단백질 바"],
  badge: "편의점 바",
  readingTime: "4분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB + 기존 편의점 유통 가이드 기준 · 매장별 입점은 상이할 수 있음",
  intro:
    "지금 당장 바 하나를 사야 할 때는 온라인 랭킹보다 편의점 접근성이 더 중요합니다. 이 페이지는 온라인 전용 제품을 빼고, 실제로 편의점에서 볼 가능성이 높은 단백질 바만 따로 골라 정리한 버전입니다.",
  summary: [
    "편의점 바는 단품 접근성이 좋지만 개당 가격은 온라인 박스보다 높습니다.",
    "닥터유처럼 대형 유통 채널에 강한 제품은 찾기 쉽고, 랩노쉬나 롯데웰푸드는 매장별 편차가 있을 수 있습니다.",
    "당일 급하게 사는 용도와 꾸준히 먹는 용도는 다르기 때문에, 마음에 든 제품은 결국 온라인 박스로 넘어가는 편이 보통 더 효율적입니다.",
  ],
  comparisonTitle: "편의점별 구매 가능 제품",
  comparisonColumns: ["제품명", "단백질", "칼로리", "구매 가능 편의점", "메모"],
  comparisonRows: convenienceBars.map((product) => ({
    label: product.brand,
    values: [
      product.name,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      convenienceStoreMap[product.slug] ?? "매장별 상이",
      product.proteinPerServing >= 20 ? "운동 후용으로 보기 쉬움" : "즉시 구매 간식용으로 무난",
    ],
  })),
  sections: [
    {
      title: "편의점 바가 유리한 상황",
      items: [
        {
          title: "지금 당장 하나 필요할 때",
          body: "운동 끝나고 바로 챙기거나, 이동 중 급하게 간식이 필요할 때는 편의점 바가 가장 빠릅니다. 이 경우엔 개당 단가보다 접근성이 더 중요합니다.",
        },
        {
          title: "맛 테스트 먼저 하고 싶을 때",
          body: "바는 식감 취향이 크게 갈립니다. 온라인 박스를 사기 전에 단품으로 먼저 먹어보는 용도로 편의점 구매가 유용합니다.",
        },
        {
          title: "박스 구매 전 후보 좁히기",
          body: "편의점에서 입에 맞는 제품만 추려 두고, 그다음에 온라인 박스로 넘어가면 실패 확률이 크게 줄어듭니다.",
        },
      ],
    },
    {
      title: "온라인 박스 구매와의 차이",
      items: [
        {
          title: "편의점",
          body: "즉시 구매, 단품 테스트, 접근성이 강점입니다. 대신 개당 가격은 높고 행사 여부에 따라 체감 가격이 달라집니다.",
        },
        {
          title: "온라인 박스",
          body: "배송을 기다려야 하지만 개당 단가가 낮아집니다. 꾸준히 먹는 제품이 이미 정해졌다면 박스 구매가 훨씬 유리한 경우가 많습니다.",
        },
        {
          title: "실전 추천",
          body: "처음엔 편의점, 정착 후에는 온라인. 이 흐름이 바 카테고리에서 가장 합리적인 구매 순서입니다.",
        },
      ],
    },
    {
      title: "읽을 때 주의할 점",
      items: [
        {
          title: "매장별 입점 차이",
          body: "같은 CU나 GS25라도 점포 규모와 발주에 따라 상품 구성이 다를 수 있습니다. 이 페이지는 대표적인 유통 경향을 기준으로 봐야 합니다.",
        },
        {
          title: "편의점 바는 순위표와 결이 다를 수 있음",
          body: "접근성이 좋다고 해서 숫자가 가장 좋은 건 아닙니다. 편의점 제품은 ‘지금 살 수 있는가’가 핵심이라 온라인 랭킹과 기준이 다릅니다.",
        },
        {
          title: "단품 가격 착시",
          body: "단품 하나는 가볍게 느껴져도 매일 사 먹으면 박스보다 훨씬 비쌉니다. 꾸준히 먹을 계획이라면 온라인 링크도 같이 비교해 두는 편이 좋습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "단백질 바 추천 TOP 10",
      href: "/guides/product-selection-comparison/protein-bar-top10",
      description: "유통 채널이 아니라 순수 스펙 기준으로 고른 상위권 제품을 보고 싶다면 이 페이지가 맞습니다.",
    },
    {
      title: "카테고리 선택 가이드",
      href: "/guides/product-selection-comparison/protein-category-guide",
      description: "바가 맞는지, 쉐이크나 음료가 더 맞는지부터 정리하고 싶다면 이 허브 페이지를 보세요.",
    },
    {
      title: "편의점 단백질 음료 가이드",
      href: "/guides/product-selection-comparison/convenience-store-protein-guide",
      description: "바 대신 편의점에서 바로 살 수 있는 음료까지 함께 비교하고 싶다면 이 가이드가 연결됩니다.",
    },
  ],
  purchaseLinks: convenienceBars.map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  faq: [
    {
      question: "편의점 단백질 바는 온라인보다 왜 비싼가요?",
      answer: "단품 즉시 구매 편의성이 가격에 반영되기 때문입니다. 행사나 멤버십을 빼면 개당 단가는 보통 온라인 박스가 더 낮습니다.",
    },
    {
      question: "편의점에서 찾기 쉬운 제품이 성분도 가장 좋은 건가요?",
      answer: "그렇지는 않습니다. 편의점 페이지는 접근성 기준이고, 성분 중심으로 고르려면 TOP 10이나 다이어트 바 페이지를 같이 보는 편이 좋습니다.",
    },
    {
      question: "매장에 없을 수도 있나요?",
      answer: "네. 편의점 상품은 점포별 발주 차이가 있어서 실제 진열은 다를 수 있습니다. 이 페이지는 대표 유통 채널 기준으로 이해하는 게 맞습니다.",
    },
  ],
};
convenienceProteinBarConfig.methodologyNote =
  "ProteinLab DB + 기존 편의점 유통 가이드 기준 · 실제 입점/재고는 매장별로 다를 수 있음";
convenienceProteinBarConfig.summary = [
  "편의점 바는 단품 접근성이 좋지만 개당 가격은 온라인 박스보다 높습니다.",
  "닥터유처럼 대형 유통 채널에 강한 제품은 찾기 쉽고, 랩노쉬나 롯데웰푸드는 매장별 편차가 있을 수 있습니다.",
  "이 페이지는 실제 매장 재고를 보장하는 목록이 아니라 편의점 채널에서 접근할 가능성이 높은 제품을 정리한 가이드로 읽는 편이 맞습니다.",
];
convenienceProteinBarConfig.faq = [
  ...(convenienceProteinBarConfig.faq ?? []),
  {
    question: "이 페이지에 있으면 모든 매장에서 바로 살 수 있나요?",
    answer:
      "아닙니다. 편의점 상품은 점포별 발주와 재고 차이가 커서 실제 진열 여부는 다를 수 있습니다. 이 페이지는 대표 유통 경향 기준으로 보는 편이 맞습니다.",
  },
];
convenienceProteinBarConfig.jsonLd = [
  articleJsonLd(convenienceProteinBarConfig),
  faqJsonLd(convenienceProteinBarConfig),
];

export const dietProteinBarConfig: CategoryGuideConfig = {
  slug: "diet-protein-bar",
  title: "다이어트 단백질 바 추천",
  description:
    "ProteinLab DB 기준으로 당류 5g 이하, 칼로리 200kcal 이하, 단백질 15g 이상 조건을 통과한 다이어트용 단백질 바를 정리했습니다.",
  keywords: ["다이어트 단백질 바", "저당 단백질 바", "저칼로리 프로틴바", "다이어트 프로틴바"],
  badge: "다이어트 바",
  readingTime: "5분 읽기",
  updatedAt: "2026-03-24",
  methodologyNote: "ProteinLab DB 필터 · 당류 5g 이하 + 칼로리 200kcal 이하 + 단백질 15g 이상",
  intro:
    "다이어트용 단백질 바는 단순히 가벼운 바가 아니라, 허기를 눌러 주면서도 칼로리 부담이 과하지 않은 제품이어야 합니다. 그래서 이번 리스트는 ‘단백질이 높다’보다 ‘계속 먹을 수 있는 조합인가’에 더 초점을 맞췄습니다.",
  summary: [
    "이 조건을 통과한 바는 생각보다 많지 않습니다. 그래서 다이어트 바는 일반 단백질 바보다 선택지가 좁습니다.",
    "프로틴방앗간, 오늘단백처럼 160~175kcal 구간의 제품이 다이어트 간식용으로 균형이 좋습니다.",
    "단백질 바도 과식하면 충분히 칼로리가 높아지므로 하루 1개 전후 기준으로 보는 편이 현실적입니다.",
  ],
  comparisonTitle: "다이어트 추천 제품",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "포인트"],
  comparisonRows: dietBarProducts.map((product) => ({
    label: product.brand,
    values: [
      product.name,
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      product.nutritionPerBottle?.fiberG
        ? `식이섬유 ${product.nutritionPerBottle.fiberG}g`
        : "숫자가 단순해 관리하기 쉬움",
    ],
  })),
  sections: [
    {
      title: "다이어트용 바를 고르는 기준",
      items: [
        {
          title: "칼로리 200kcal 이하",
          body: "200kcal를 넘기기 시작하면 간식보다는 한 끼에 가까워집니다. 다이어트 간식이라면 이 선을 기준으로 잡는 편이 관리가 쉽습니다.",
        },
        {
          title: "당류 5g 이하",
          body: "단맛이 강한 제품은 꾸준히 먹기 쉽지만, 다이어트 관점에서는 당류가 낮은 쪽이 안정적입니다. 최소한 5g 이하 구간부터 보는 것이 실전적입니다.",
        },
        {
          title: "단백질 15g 이상",
          body: "바가 간식 이상으로 의미 있으려면 단백질이 어느 정도는 들어 있어야 합니다. 15g 아래로 내려가면 일반 스낵과 차이가 줄어듭니다.",
        },
      ],
    },
    {
      title: "이렇게 먹어야 덜 실패합니다",
      items: [
        {
          title: "오전 간식 또는 오후 허기 차단용",
          body: "바는 식사 대용보다 허기 조절용으로 쓸 때 만족도가 높습니다. 오전 10시, 오후 4시 전후처럼 무너지는 타이밍에 넣는 게 가장 실용적입니다.",
        },
        {
          title: "쉐이크와 역할을 나누기",
          body: "아침 대용은 쉐이크, 이동 중 간식은 바로 나누면 선택이 쉬워집니다. 다이어트 중 모든 상황을 바 하나로 해결하려고 하면 금방 질립니다.",
        },
        {
          title: "하루 1개 전후가 현실적",
          body: "바 2개를 먹으면 300kcal를 가볍게 넘길 수 있습니다. 다이어트용이라도 ‘가벼운 간식’이라는 환상은 버리는 편이 맞습니다.",
        },
      ],
    },
    {
      title: "자주 하는 실수",
      items: [
        {
          title: "저당만 보고 칼로리를 안 보는 것",
          body: "당류가 낮아도 지방과 총열량이 높으면 다이어트 간식으로는 무거울 수 있습니다. 바는 세 숫자를 같이 봐야 합니다.",
        },
        {
          title: "배고플 때 2개 연속으로 먹는 것",
          body: "포만감이 늦게 올라오는 제품도 있어서 한 번에 2개를 먹기 쉽습니다. 이런 상황이면 바보다 쉐이크나 식사 쪽이 맞는 경우가 많습니다.",
        },
        {
          title: "맛 검증 없이 박스 구매",
          body: "다이어트는 지속성이 중요해서, 숫자가 좋아도 맛이 안 맞으면 결국 실패합니다. 첫 구매는 소량으로 확인하는 편이 낫습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "단백질 바 추천 TOP 10",
      href: "/guides/product-selection-comparison/protein-bar-top10",
      description: "다이어트 한정이 아니라 전체 바 시장에서 상위권 후보를 보고 싶다면 이 페이지가 먼저입니다.",
    },
    {
      title: "다이어트 단백질 쉐이크",
      href: "/guides/product-selection-comparison/diet-protein-shake",
      description: "바 대신 식사 대용 쪽에 더 가까운 대안을 찾는다면 쉐이크 페이지가 더 맞습니다.",
    },
    {
      title: "카테고리 선택 가이드",
      href: "/guides/product-selection-comparison/protein-category-guide",
      description: "바와 쉐이크 중 어떤 카테고리가 내 루틴에 더 맞는지부터 정리합니다.",
    },
  ],
  purchaseLinks: dietBarProducts.slice(0, 3).map((product) => ({
    label: `${product.brand} ${product.name} 보기`,
    slug: product.slug,
  })),
  faq: [
    {
      question: "다이어트 중이면 단백질 바가 식사 대용이 될 수 있나요?",
      answer: "가끔은 가능하지만 메인 식사 대용으로는 한계가 있습니다. 다이어트 바는 허기 조절용 간식으로 볼 때 가장 만족도가 높습니다.",
    },
    {
      question: "당류 0g에 가까운 바가 항상 더 좋은가요?",
      answer: "꼭 그렇지는 않습니다. 당류가 낮아도 칼로리와 지방이 높으면 다이어트용으로 무거울 수 있습니다. 결국 칼로리, 당류, 단백질을 같이 봐야 합니다.",
    },
    {
      question: "다이어트 바와 쉐이크 중 뭐가 더 낫나요?",
      answer: "씹는 간식이 필요하면 바, 아침 대용이나 포만감이 중요하면 쉐이크가 더 잘 맞는 경우가 많습니다. 상황이 다르기 때문에 역할을 나누는 편이 좋습니다.",
    },
  ],
};
dietProteinBarConfig.jsonLd = [articleJsonLd(dietProteinBarConfig), faqJsonLd(dietProteinBarConfig)];

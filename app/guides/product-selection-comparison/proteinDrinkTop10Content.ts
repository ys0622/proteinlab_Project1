import type { CategoryGuideConfig, CategoryMetricRow } from "./categoryGuideShared";
import { getDrinkProducts } from "@/app/data/drinkProductsData";
import { formatProductLabel } from "@/app/lib/productLabel";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";

// 첫 문단이 '추천' 검색에 바로 답하도록 상위 3개 제품명과 성분 수치를 쓴다(2026-10-31, ChatGPT·네이버 인용용).
function topPickSentence(list: Array<{ brand: string; name: string; proteinPerServing?: number; sugar?: number; calories?: number }>) {
  return list
    .slice(0, 3)
    .map((p, i) => `${i + 1}위 ${formatProductLabel(p.brand, p.name)}(단백질 ${p.proteinPerServing}g·당류 ${p.sugar}g·${p.calories}kcal)`)
    .join(", ");
}

const drinkProducts = getDrinkProducts();

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
    ...(config.updatedAt ? { dateModified: config.updatedAt } : {}),
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
  const match = value?.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function fiber(product: (typeof drinkProducts)[number]) {
  return product.nutritionPerBottle?.fiberG ?? 0;
}

function drinkTopScore(product: (typeof drinkProducts)[number]) {
  return (
    product.proteinPerServing * 4 +
    parseDensity(product.density) * 1.6 +
    fiber(product) * 2 -
    (product.calories ?? 0) * 0.08 -
    (product.sugar ?? 0) * 6
  );
}

function diversifyDrinks(products: typeof drinkProducts, limit: number) {
  const counts = new Map<string, number>();
  const picks: typeof drinkProducts = [];

  for (const product of products) {
    const count = counts.get(product.brand) ?? 0;
    if (count >= 2) continue;
    picks.push(product);
    counts.set(product.brand, count + 1);
    if (picks.length === limit) break;
  }

  return picks;
}

const drinkTop10 = diversifyDrinks(
  [...drinkProducts]
    .filter(
      (product) =>
        product.proteinPerServing >= 20 &&
        (product.sugar ?? 99) <= 8 &&
        (product.calories ?? 999) <= 205,
    )
    .sort((a, b) => drinkTopScore(b) - drinkTopScore(a)),
  10,
);

// 요약·FAQ의 범위와 개수는 순위표와 어긋나지 않게 데이터에서 계산한다(2026-11-15: 'TOP 10 중 당류 0g 6개'로 손으로 적혀 있었으나 실제 4개).
function range(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min}` : `${min}~${max}`;
}
const top10Protein = range(drinkTop10.map((p) => p.proteinPerServing));
const top10Sugar = range(drinkTop10.map((p) => p.sugar ?? 0));
const top10Kcal = range(drinkTop10.map((p) => p.calories ?? 0));
const top10ZeroSugar = drinkTop10.filter((p) => (p.sugar ?? 0) === 0).length;
const top10UnderOneSugar = drinkTop10.filter((p) => (p.sugar ?? 0) > 0 && (p.sugar ?? 0) <= 1).length;
const top10OverOneSugar = drinkTop10.length - top10ZeroSugar - top10UnderOneSugar;
const top1 = drinkTop10[0];

function uniqueBrands(list: typeof drinkProducts) {
  return [...new Set(list.map((p) => p.brand))];
}

// '빠른 선택'은 순위표와 같은 제품을 보여준다. 브랜드가 겹치지 않게, 쿠팡 판매 링크가 있는 제품 우선.
const quickPicks = (() => {
  const seen = new Set<string>();
  const picks: typeof drinkTop10 = [];
  for (const product of drinkTop10) {
    if (seen.has(product.brand) || hasNoPurchasableCoupangLink(product.coupangUrl, product.slug)) continue;
    seen.add(product.brand);
    picks.push(product);
    if (picks.length === 3) break;
  }
  return picks;
})();

const lowSugarDrinkPicks = [...drinkProducts]
  .filter((product) => product.proteinPerServing >= 20 && (product.sugar ?? 99) <= 1)
  .sort(
    (a, b) =>
      (a.sugar ?? 99) - (b.sugar ?? 99) ||
      (a.calories ?? 999) - (b.calories ?? 999) ||
      b.proteinPerServing - a.proteinPerServing,
  )
  .slice(0, 6);

const highProteinDrinkPicks = [...drinkProducts]
  .filter((product) => product.proteinPerServing >= 24)
  .sort((a, b) => b.proteinPerServing - a.proteinPerServing || (a.calories ?? 999) - (b.calories ?? 999))
  .slice(0, 6);

const waterDrinkPicks = [...drinkProducts]
  .filter((product) => product.drinkType?.includes("워터"))
  .sort((a, b) => drinkTopScore(b) - drinkTopScore(a))
  .slice(0, 4);

function rankingRows(products: typeof drinkTop10): CategoryMetricRow[] {
  return products.map((product, index) => ({
    label: `${index + 1}위`,
    slug: product.slug,
    values: [
      formatProductLabel(product.brand, product.name),
      `${product.proteinPerServing}g`,
      `${product.calories}kcal`,
      `${product.sugar}g`,
      fiber(product) >= 4
        ? `식이섬유 ${fiber(product)}g`
        : parseDensity(product.density) >= 9
          ? "고단백 밀도"
          : product.drinkType?.includes("워터")
            ? "워터형 RTD"
            : "균형형 RTD",
    ],
  }));
}

export const proteinDrinkTop10Config: CategoryGuideConfig = {
  slug: "protein-drink-top10",
  compareListCta: { category: "drink" },
  title: "단백질 음료 추천 TOP 10 | 47g·52g 초고단백 RTD까지 비교 2026",
  description:
    `단백질 음료 추천 1위는 ${formatProductLabel(top1.brand, top1.name)}(단백질 ${top1.proteinPerServing}g·당류 ${top1.sugar}g·${top1.calories}kcal)입니다. 음료 ${drinkProducts.length}종 중 단백질 20g 이상·당류 8g 이하·205kcal 이하 제품을 성분표 기준으로 점수화한 TOP 10(단백질 ${top10Protein}g)과 52g 초고단백 RTD 선택 기준을 정리했습니다.`,
  keywords: ["단백질 음료 추천", "단백질 음료 TOP10", "프로틴 음료 추천", "RTD 단백질 음료", "저당 단백질 음료", "고단백 RTD", "단백질 음료 47g", "단백질 음료 52g"],
  badge: "음료 랭킹",
  readingTime: "6분 읽기",
  updatedAt: "2026-10-03",
  methodologyNote: `ProteinLab DB 음료 ${drinkProducts.length}종 기준 · 단백질/당류/칼로리/밀도 종합 + 동일 브랜드 최대 2개 반영`,
  intro:
    `ProteinLab DB 음료 ${drinkProducts.length}종 중 단백질 20g 이상, 당류 8g 이하, 205kcal 이하 조건을 통과한 제품을 종합 점수화한 단백질 음료 추천 순위는 ${topPickSentence(drinkTop10)}입니다. 테이크핏·더단백·이정후 프로틴·랩노쉬·뉴케어 등 브랜드별 2개까지만 반영했고, 1위만 보기보다 단백질 함량·당류·칼로리·단백질 밀도를 함께 보는 편이 정확합니다.`,
  summary: [
    `TOP 10은 단백질 ${top10Protein}g, 당류 ${top10Sugar}g, ${top10Kcal}kcal 구간에 있어 단백질 밀도와 칼로리 조합이 최종 판단 포인트입니다.`,
    "테이크핏 47g, 더단백 40g, 이정후 프로틴 33g, 랩노쉬 퍼펙트 27g, 뉴케어 올프로틴 25g처럼 단백질 구간이 넓어 1위보다 자신의 용도에 맞는 구간 선택이 더 중요합니다.",
    "랩노쉬 프로틴 맥스 52g처럼 총량이 높은 제품은 별도 초고단백 후보로 볼 수 있지만, TOP 10에서는 칼로리와 당류까지 반영해 매일 선택하기 쉬운 제품을 우선합니다.",
    "브랜드명보다 먼저 TOP 10 후보를 보여주고, 이후 용도별 가이드나 구매 채널로 넘기는 흐름이 체류와 전환 모두에 유리합니다.",
  ],
  comparisonTitle: "TOP 10 순위표",
  comparisonColumns: ["제품명", "단백질", "칼로리", "당류", "포인트"],
  comparisonRows: rankingRows(drinkTop10),
  sections: [
    {
      title: "이 순위가 잘 맞는 사람",
      items: [
        {
          title: "처음이라 후보를 빨리 줄이고 싶은 사람",
          body: "브랜드를 하나씩 읽기 전에 상위권 RTD 후보를 먼저 보고 싶다면 TOP 10 구조가 가장 빠릅니다.",
        },
        {
          title: "저당과 고단백을 같이 보고 싶은 사람",
          body: "단백질 음료는 단백질 숫자만 보면 과하게 넓어집니다. TOP 10은 당류와 칼로리를 함께 보면서 바로 걸러야 하는 사람에게 맞습니다.",
        },
        {
          title: "구매 전 대표 제품 2~3개만 비교하고 싶은 사람",
          body: "실제 구매는 보통 10개 전부를 보는 것이 아니라 2~3개까지 줄인 뒤 일어납니다. 그래서 상위 후보를 먼저 보여주고, 2~3개를 골라 성분표로 비교하도록 정리했습니다.",
        },
      ],
    },
    {
      title: "TOP 10을 읽는 기준",
      items: [
        {
          title: "1위보다 용도부터 보기",
          body: "워터형은 가볍고, 밸런스형은 무난하고, 25g 이상 고단백형은 운동 후 보충에 강합니다. 같은 TOP 10 안에서도 답이 다릅니다.",
        },
        {
          title: "동일 브랜드 최대 2개까지만 보기",
          body: "한 브랜드가 맛만 바꿔 순위를 채우면 실제로 비교할 후보가 줄어듭니다. 그래서 브랜드당 2개까지만 넣어 상위권 후보를 넓게 보여줍니다.",
        },
        {
          title: "당류 0g만 고집하지 않기",
          body: "당류 0g는 분명한 장점이지만 맛과 지속성까지 같이 봐야 합니다. 2~4g 수준에서 맛과 지구력이 더 나은 제품도 충분히 상위 후보가 됩니다.",
        },
      ],
    },
    {
      title: "문제 해결형으로 다시 들어가기",
      items: [
        {
          title: "저당 위주로 더 좁히고 싶다면",
          body: `단백질 20g 이상이면서 당류 1g 이하인 제품은 ${uniqueBrands(lowSugarDrinkPicks).slice(0, 3).join(", ")} 같은 라인이 강합니다. 저당 의도가 강하면 저당 가이드로 이어지는 것이 좋습니다.`,
        },
        {
          title: "운동 직후 고단백만 더 보고 싶다면",
          body: `${[...new Set(highProteinDrinkPicks.map((p) => p.brand))].slice(0, 3).join(", ")}처럼 24g 이상 구간이 따로 있습니다. 최근에는 47g·52g 초고단백 제품까지 생겨 이 경우 40g 이상 비교나 고단백 브랜드 비교로 이어지는 편이 빠릅니다.`,
        },
        {
          title: "워터형만 따로 보고 싶다면",
          body: `${waterDrinkPicks.map((product) => product.brand).filter((brand, index, array) => array.indexOf(brand) === index).join(", ")} 같은 워터형은 칼로리 부담이 낮아 따로 비교해 볼 만합니다.`,
        },
      ],
    },
    {
      title: "실제로 고르는 순서",
      items: [
        {
          title: "1단계: TOP 10에서 상위 3개만 추리기",
          body: "후보를 너무 많이 두면 비교가 멈춥니다. 목적(운동 후·매일·저당)에 맞는 3개만 먼저 남기세요.",
        },
        {
          title: "2단계: 브랜드 비교나 목적별 가이드로 확인",
          body: "상위권 제품이 왜 올라왔는지 궁금하면 비교 가이드에서 단백질 원료·당류·칼로리 차이를 확인하세요.",
        },
        {
          title: "3단계: 마지막에 가격과 옵션 확인",
          body: "가격과 묶음 옵션은 자주 바뀌므로 후보를 정한 뒤 판매처에서 확인하는 편이 안전합니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "단백질 음료 선택 가이드",
      href: "/guides/product-selection-comparison/protein-drink-guide",
      description: "숫자를 어떤 순서로 읽어야 하는지부터 다시 보고 싶다면 기본 가이드가 먼저입니다.",
    },
    {
      title: "단백질 음료 입문 가이드",
      href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
      description: "처음 고르는 사람 기준으로 실패를 줄이는 흐름이 필요하면 입문 가이드가 더 직접적입니다.",
    },
    {
      title: "40g 이상 고단백 음료 비교",
      href: "/guides/product-selection-comparison/high-protein-40g-comparison",
      description: "운동 직후 보충 목적이라면 47g·52g까지 포함한 초고단백 흐름을 같이 보는 편이 빠릅니다.",
    },
    {
      title: "단백질 밀도 순위 가이드",
      href: "/guides/product-selection-comparison/protein-density-ranking",
      description: "100mL당 단백질 기준으로 읽고 싶다면 밀도 랭킹 페이지가 더 날카롭습니다.",
    },
  ],
  purchaseLinks: (() => {
    const seen = new Set<string>();
    const picks: typeof drinkTop10 = [];
    for (const product of drinkTop10) {
      if (!seen.has(product.brand)) {
        seen.add(product.brand);
        picks.push(product);
        if (picks.length === 3) break;
      }
    }
    return picks.map((product) => ({
      label: `${formatProductLabel(product.brand, product.name)} 보기`,
      slug: product.slug,
    }));
  })(),
  showPurchaseLinks: false,
  conversion: {
    contentId: "plv3:landing:guide:protein-drink-top10",
    conclusion: "단백질 음료는 1위보다 섭취 목적에 맞는 단백질 구간을 먼저 고르는 편이 좋습니다. 상위 후보에서 2~3개를 골라 성분표로 좁혀보세요.",
    products: drinkTop10.slice(0, 3).map((product) => ({
      slug: product.slug,
      reason: `단백질 ${product.proteinPerServing}g 기준으로 당류와 칼로리를 함께 비교할 수 있습니다.`,
    })),
  },
  faq: [
    {
      question: "TOP 10이면 1위 제품만 사면 되나요?",
      answer: `아닙니다. 1위 ${formatProductLabel(top1.brand, top1.name)}는 단백질 ${top1.proteinPerServing}g·${top1.calories}kcal의 고강도 보충형입니다. 가볍게 마시고 싶다면 뉴케어 올프로틴 25g이나 랩노쉬 퍼펙트처럼 칼로리가 낮은 제품이 더 맞습니다. 단백질 구간과 칼로리를 같이 보는 것이 먼저입니다.`,
    },
    {
      question: "랩노쉬 프로틴 맥스 52g은 왜 TOP 10에서 따로 봐야 하나요?",
      answer: "52g은 총량 기준으로 강한 초고단백 제품이지만 TOP 10은 당류, 칼로리, 단백질 밀도를 함께 봅니다. 한 번에 크게 보충하려는 목적이면 별도 후보가 되고, 매일 마실 제품을 고르는 목적이면 칼로리와 지속 가능성을 같이 비교해야 합니다.",
    },
    {
      question: "셀렉스 프로핏이나 하이뮨은 왜 TOP 10에 없나요?",
      answer: "이 랭킹은 단백질 20g 이상, 당류 8g 이하, 205kcal 이하 조건을 모두 충족한 제품만 포함합니다. 셀렉스나 하이뮨 일부 제품은 당류 또는 칼로리 기준에서 벗어나거나 단백질 밀도 점수에서 상위 10개 안에 들지 못했습니다. 두 브랜드를 보고 싶다면 브랜드 비교 가이드를 참고하세요.",
    },
    {
      question: "저당 음료를 찾는데도 이 페이지가 맞나요?",
      answer: `맞습니다. TOP 10 중 당류 0g 제품이 ${top10ZeroSugar}개, 0g 초과 1g 이하가 ${top10UnderOneSugar}개${top10OverOneSugar > 0 ? `, 1g 초과가 ${top10OverOneSugar}개(최대 ${Math.max(...drinkTop10.map((p) => p.sugar ?? 0))}g)` : ""}입니다. 다만 당류 0g만 절대 기준이라면 저당 전용 가이드로 한 단계 더 들어가는 편이 더 정확합니다.`,
    },
    {
      question: "워터형 RTD는 왜 TOP 10에 없나요?",
      answer: "워터형은 칼로리가 낮은 장점이 있지만 단백질 밀도(100mL당 단백질g) 점수가 일반 RTD보다 낮아 종합 점수에서 밀렸습니다. 가볍고 청량한 음료를 원한다면 워터형 전용 비교를 따로 확인하는 편이 좋습니다.",
    },
    {
      question: "프로틴 음료 추천과 단백질 음료 추천은 같은 의미인가요?",
      answer: "검색 의도는 거의 같습니다. 다만 프로틴 음료는 RTD, 쉐이크, 파우더까지 넓게 쓰이는 경우가 있어 이 페이지에서는 바로 마시는 RTD 단백질 음료만 기준으로 좁혀 비교했습니다.",
    },
    {
      question: "2026년에 단백질 음료를 고를 때 가장 먼저 볼 기준은 무엇인가요?",
      answer: "먼저 1회 단백질 함량이 20g 이상인지 확인하고, 그다음 당류와 칼로리를 같이 봐야 합니다. 운동 후 보충이면 고단백형, 매일 가볍게 마실 목적이면 저당·저칼로리형이 더 맞습니다.",
    },
  ],
};

proteinDrinkTop10Config.updatedAt = "2026-11-15";
proteinDrinkTop10Config.summary = [
  proteinDrinkTop10Config.summary[0],
  "테이크핏·더단백 같은 상위 고단백 RTD와 함께 뉴케어 올프로틴도 별도 라인업으로 봐야 합니다. 41g, 25g, 워터, 식물성 라인이 서로 다른 목적을 담당하기 때문입니다.",
  proteinDrinkTop10Config.summary[2],
  "순위표에서 2~3개를 고른 뒤 저당·40g 이상·밀도 같은 목적별 가이드나 뉴케어 비교로 넘어가면 차이를 더 정확히 볼 수 있습니다.",
];
proteinDrinkTop10Config.sections = [
  ...proteinDrinkTop10Config.sections.slice(0, 3),
  {
    title: "뉴케어 올프로틴을 따로 봐야 하는 경우",
    items: [
      {
        title: "고단백이지만 락토프리 성격까지 같이 볼 때",
        body: "뉴케어 올프로틴 41g은 단백질 총량만이 아니라 유당 부담을 낮춘 고단백 RTD 후보로 읽을 수 있습니다. 테이크핏이나 더단백과 단순 순위로만 비교하기보다 목적별 대안으로 따로 확인하는 편이 좋습니다.",
      },
      {
        title: "매일 마실 표준형을 찾을 때",
        body: "25g 라인은 초고단백형보다 부담이 낮아 일상 보충형 후보로 보기 좋습니다. 칼로리와 당류를 함께 보면 41g과 25g의 역할 차이가 더 분명해집니다.",
      },
      {
        title: "맛 지속성이 걱정될 때",
        body: "뉴케어 올프로틴 일부 맛은 국제 미각상 수상 이력이 있어 맛 평가 참고 정보로 볼 수 있습니다. 다만 수상 이력은 영양 우수성이나 개인별 선호를 보장하는 근거는 아니므로 성분표와 함께 확인해야 합니다.",
      },
    ],
  },
  ...proteinDrinkTop10Config.sections.slice(3),
];
proteinDrinkTop10Config.relatedGuides = [
  {
    title: "뉴케어 올프로틴 완전 분석",
    href: "/guides/product-selection-comparison/newcare-allprotein",
    description: "41g, 25g, 워터, 식물성 라인을 한 번에 비교합니다.",
  },
  {
    title: "뉴케어 41g vs 25g",
    href: "/guides/product-selection-comparison/newcare-41g-vs-25g",
    description: "운동 후 보충형과 일상 표준형의 차이를 직접 확인합니다.",
  },
  ...proteinDrinkTop10Config.relatedGuides,
].slice(0, 6);
proteinDrinkTop10Config.conversion = {
  contentId: "plv3:landing:guide:protein-drink-top10",
  compareHref: proteinDrinkTop10Config.conversion?.compareHref,
  // 2026-11-15: 순위표에 없는 뉴케어 3개가 맨 위에 있어 순위와 어긋났다. 순위표 상위(브랜드 겹침 없이)로 바꾼다.
  conclusion: `TOP 10 순위표 기준 상위 후보입니다. 단백질 음료는 1위보다 섭취 목적에 맞는 구간을 먼저 고르는 편이 좋아 브랜드별로 하나씩 골랐습니다.`,
  products: quickPicks.map((product) => ({
    slug: product.slug,
    reason: `${drinkTop10.indexOf(product) + 1}위 · 단백질 ${product.proteinPerServing}g · 당류 ${product.sugar}g · ${product.calories}kcal`,
  })),
};

proteinDrinkTop10Config.jsonLd = [articleJsonLd(proteinDrinkTop10Config), faqJsonLd(proteinDrinkTop10Config)];

import type { CategoryGuideConfig, CategoryMetricRow } from "./categoryGuideShared";
import { getDrinkProducts } from "@/app/data/drinkProductsData";

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
    dateModified: "2026-04-13",
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
    values: [
      `${product.brand} ${product.name}`,
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
  title: "단백질 음료 추천 TOP 10 | 프로틴 음료·저당 RTD 비교 2026",
  description:
    "2026년 ProteinLab DB 음료 107종을 기준으로 단백질 함량, 당류, 칼로리, 밀도를 비교해 단백질 음료·프로틴 음료 추천 TOP 10을 정리했습니다.",
  keywords: ["단백질 음료 추천", "단백질 음료 TOP10", "프로틴 음료 추천", "RTD 단백질 음료", "저당 단백질 음료", "고단백 RTD"],
  badge: "음료 랭킹",
  readingTime: "6분 읽기",
  updatedAt: "2026-04-13",
  methodologyNote: "ProteinLab DB 음료 107종 기준 · 단백질/당류/칼로리/밀도 종합 + 동일 브랜드 최대 2개 반영",
  intro:
    "단백질 음료 추천을 찾는다면 1위만 보는 것보다 단백질 함량, 당류, 칼로리, 단백질 밀도를 함께 보는 편이 정확합니다. ProteinLab DB 음료 107종 중 단백질 20g 이상, 당류 8g 이하, 205kcal 이하 조건을 통과한 제품을 종합 점수화하고 테이크핏·더단백·이정후 프로틴·랩노쉬·뉴케어 등 브랜드별 2개까지만 반영했습니다.",
  summary: [
    "상위권은 단백질 25~43g, 당류 0~1g, 125~186kcal 구간에 몰려 있어 단백질 밀도와 칼로리 조합이 최종 판단 포인트입니다.",
    "테이크핏 43g, 더단백 40g, 이정후 프로틴 33g, 랩노쉬 퍼펙트 27g, 뉴케어 올프로틴 25g처럼 단백질 구간이 넓어 1위보다 자신의 용도에 맞는 구간 선택이 더 중요합니다.",
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
          body: "브랜드를 하나씩 읽기 전에 상위권 RTD 후보를 먼저 보고 싶다면 TOP 10 구조가 가장 빠릅니다. 실제 클릭도 이런 '먼저 좁히기' 의도에서 잘 나옵니다.",
        },
        {
          title: "저당과 고단백을 같이 보고 싶은 사람",
          body: "단백질 음료는 단백질 숫자만 보면 과하게 넓어집니다. TOP 10은 당류와 칼로리를 함께 보면서 바로 걸러야 하는 사람에게 맞습니다.",
        },
        {
          title: "구매 전 대표 제품 2~3개만 비교하고 싶은 사람",
          body: "실제 구매는 보통 10개 전부를 보는 것이 아니라 2~3개까지 줄인 뒤 일어납니다. 그래서 상위 후보군을 먼저 정리한 페이지가 CTR과 전환 모두에 유리합니다.",
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
          body: "한 브랜드가 줄세우기 되면 클릭이 분산되지 않고 탐색 폭이 줄어듭니다. 그래서 브랜드 편중을 줄여 상위권 후보군을 넓게 보여주도록 구성했습니다.",
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
          body: `현재 후보군 중에서도 ${lowSugarDrinkPicks.slice(0, 3).map((product) => product.brand).join(", ")} 같은 라인이 강합니다. 저당 의도가 강하면 저당 가이드로 이어지는 것이 좋습니다.`,
        },
        {
          title: "운동 직후 고단백만 더 보고 싶다면",
          body: `${[...new Set(highProteinDrinkPicks.map((p) => p.brand))].slice(0, 3).join(", ")}처럼 24g 이상 구간이 따로 있습니다. 이 경우 40g대 비교나 고단백 브랜드 비교로 이어지는 편이 빠릅니다.`,
        },
        {
          title: "워터형만 따로 보고 싶다면",
          body: `${waterDrinkPicks.map((product) => product.brand).filter((brand, index, array) => array.indexOf(brand) === index).join(", ")} 같은 워터형은 칼로리 부담이 낮아 별도 비교 니즈가 큽니다.`,
        },
      ],
    },
    {
      title: "클릭을 늘리는 실제 선택 순서",
      items: [
        {
          title: "1단계: TOP 10에서 상위 3개만 추리기",
          body: "후보를 너무 많이 두면 비교가 멈춥니다. 먼저 3개만 남겨야 다음 클릭이 이어집니다.",
        },
        {
          title: "2단계: 브랜드 비교나 문제 해결형 가이드로 이동",
          body: "상위권 제품이 왜 올라왔는지 궁금할 때 비교 가이드로 넘어가면 체류와 다음 클릭이 자연스럽게 이어집니다.",
        },
        {
          title: "3단계: 마지막에 구매 채널 확인",
          body: "가격과 옵션은 마지막에 보는 편이 안전합니다. TOP 10은 후보를 정리해 주고, 실제 구매는 채널 확인으로 이어지는 구조가 가장 효율적입니다.",
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
      description: "운동 직후 보충 목적이라면 40g대 고단백 비교로 바로 넘어가는 편이 빠릅니다.",
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
      label: `${product.brand} ${product.name} 보기`,
      slug: product.slug,
    }));
  })(),
  faq: [
    {
      question: "TOP 10이면 1위 제품만 사면 되나요?",
      answer: "아닙니다. 1위 테이크핏 몬스터는 단백질 43g의 고강도 보충형입니다. 가볍게 마시고 싶다면 뉴케어 올프로틴 25g이나 랩노쉬 퍼펙트처럼 칼로리가 낮은 제품이 더 맞습니다. 단백질 구간과 칼로리를 같이 보는 것이 먼저입니다.",
    },
    {
      question: "셀렉스 프로핏이나 하이뮨은 왜 TOP 10에 없나요?",
      answer: "이 랭킹은 단백질 20g 이상, 당류 8g 이하, 205kcal 이하 조건을 모두 충족한 제품만 포함합니다. 셀렉스나 하이뮨 일부 제품은 당류 또는 칼로리 기준에서 벗어나거나 단백질 밀도 점수에서 상위 10개 안에 들지 못했습니다. 두 브랜드를 보고 싶다면 브랜드 비교 가이드를 참고하세요.",
    },
    {
      question: "저당 음료를 찾는데도 이 페이지가 맞나요?",
      answer: "맞습니다. TOP 10 중 당류 0g 제품이 6개, 1g 이하가 4개입니다. 다만 당류 0g만 절대 기준이라면 저당 전용 가이드로 한 단계 더 들어가는 편이 더 정확합니다.",
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

proteinDrinkTop10Config.jsonLd = [articleJsonLd(proteinDrinkTop10Config), faqJsonLd(proteinDrinkTop10Config)];

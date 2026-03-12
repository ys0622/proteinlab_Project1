import { barProductsWithGrades, mockProducts } from "../data/products";
import type { CurationDefinition, CurationGuideLink, CurationInfoSection } from "./curationSystem";
import { getCurationDefinition } from "./curationSystem";

function getCategoryLabel(curation: CurationDefinition) {
  const hasDrink = Boolean(curation.categories.drink);
  const hasBar = Boolean(curation.categories.bar);

  if (hasDrink && hasBar) return "단백질 음료와 단백질 바";
  if (hasDrink) return "단백질 음료";
  return "단백질 바";
}

function buildDefaultInfoSections(curation: CurationDefinition): CurationInfoSection[] {
  const categoryLabel = getCategoryLabel(curation);

  return [
    {
      title: "제품을 고를 때 보는 기준",
      bullets: [
        "단백질 함량",
        "당류",
        "칼로리",
        "단백질 밀도",
      ],
    },
    {
      title: `${curation.label} 기준으로 볼 포인트`,
      bullets: [
        `${curation.label} 기준에 맞는 제품을 먼저 추리고 추천 제품과 전체 비교를 나눠 볼 수 있습니다.`,
        `${categoryLabel}은 섞지 않고 각각 따로 비교합니다.`,
        "모바일과 PC 모두 같은 데이터 기준으로 제품을 확인할 수 있습니다.",
      ],
    },
    {
      title: "ProteinLab 데이터 기준",
      bullets: [
        "ProteinLab에서는 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로 제품을 비교합니다.",
        "추천 제품은 strict 조건이 부족할 경우 필터 완화, 단백질 밀도 fallback, 카테고리 상위 제품 순으로 보강합니다.",
      ],
    },
  ];
}

function buildDefaultGuideLinks(curation: CurationDefinition): CurationGuideLink[] {
  const links: CurationGuideLink[] = [];

  if (curation.categories.drink) {
    links.push({
      href: `/?curation=${curation.slug}`,
      title: `${curation.label} 단백질 음료 비교`,
      description: `${curation.label} 기준에 맞는 단백질 음료를 바로 비교해보세요.`,
    });
  }

  if (curation.categories.bar) {
    links.push({
      href: `/bars?curation=${curation.slug}`,
      title: `${curation.label} 단백질 바 비교`,
      description: `${curation.label} 기준에 맞는 단백질 바를 바로 비교해보세요.`,
    });
  }

  links.push({
    href: curation.categories.bar
      ? "/guides/product-selection-comparison/protein-bar-guide"
      : "/guides/how-to-choose/checklist",
    title: curation.categories.bar ? "단백질 바 고르는 법" : "단백질 음료 고르는 법",
    description: "단백질 함량, 당류, 칼로리, 단백질 밀도를 어떻게 함께 봐야 하는지 정리했습니다.",
  });

  return links;
}

function normalizeLandingCuration(curation: CurationDefinition): CurationDefinition {
  const categoryLabel = getCategoryLabel(curation);

  return {
    ...curation,
    heroTitle: curation.heroTitle ?? `${curation.label} ${categoryLabel} 추천`,
    heroDescription:
      curation.heroDescription ??
      `ProteinLab에서는 ${curation.label} 기준에 맞는 ${categoryLabel}을 단백질 함량, 당류, 칼로리, 단백질 밀도 데이터 기준으로 비교할 수 있습니다.`,
    introText:
      curation.introText ?? `${curation.label} 기준에 맞는 제품을 데이터 기준으로 확인하세요.`,
    infoSections: curation.infoSections?.length ? curation.infoSections : buildDefaultInfoSections(curation),
    relatedGuideLinks:
      curation.relatedGuideLinks?.length ? curation.relatedGuideLinks : buildDefaultGuideLinks(curation),
    seoTitle: curation.seoTitle ?? `${curation.label} 큐레이션 | ProteinLab`,
    seoDescription:
      curation.seoDescription ??
      `ProteinLab에서 ${curation.label} 기준의 ${categoryLabel}을 비교해보세요.`,
  };
}

export function getCurationLandingData(slug: string) {
  const definition = getCurationDefinition(slug);
  if (!definition) return null;

  const curation = normalizeLandingCuration(definition);

  const drinkProducts = curation.categories.drink
    ? mockProducts.filter(curation.categories.drink.filter)
    : [];
  const barProducts = curation.categories.bar
    ? barProductsWithGrades.filter(curation.categories.bar.filter)
    : [];

  const recommendedDrinks = curation.categories.drink
    ? curation.categories.drink.recommend(mockProducts).slice(0, 6)
    : [];
  const recommendedBars = curation.categories.bar
    ? curation.categories.bar.recommend(barProductsWithGrades).slice(0, 6)
    : [];

  return {
    curation,
    drinkProducts,
    recommendedDrinks,
    barProducts,
    recommendedBars,
  };
}

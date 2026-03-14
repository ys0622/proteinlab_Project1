import { NextResponse } from "next/server";
import {
  mockProducts,
  barProductsWithGrades,
  yogurtProductsWithGrades,
  type ProductDetailProps,
} from "../../data/products";
import { getDensityValue, getDietScore, getPerformanceScore } from "../../lib/gradeCalculation";
import { getProductImageUrl } from "../../lib/productImage";

interface RecommendRequest {
  category: "drink" | "bar" | "yogurt";
  purpose: string;
  frequency: string;
  intensity: string;
  conditions: string[];
}

interface ScoredProduct {
  product: ProductDetailProps;
  score: number;
  reason: string;
}

function isGreekYogurt(product: ProductDetailProps) {
  const text = [product.name, product.yogurtType, product.flavor].filter(Boolean).join(" ").toLowerCase();
  return text.includes("그릭") || text.includes("greek") || text.includes("skyr") || text.includes("아이슬란딕");
}

function isDrinkingYogurt(product: ProductDetailProps) {
  const text = [product.name, product.capacity].filter(Boolean).join(" ").toLowerCase();
  return text.includes("드링크") || text.includes("drink") || text.includes("to go") || text.includes("ml");
}

function isBulkYogurt(product: ProductDetailProps) {
  const capacityText = product.capacity.toLowerCase();
  const match = capacityText.match(/([\d.]+)/);
  const amount = match ? Number(match[1]) : 0;
  return amount >= 400 && !capacityText.includes("ml");
}

function buildReason(reasons: string[], fallback: string) {
  const uniqueReasons = [...new Set(reasons)].slice(0, 2);
  const content = uniqueReasons.length > 0 ? uniqueReasons.join(". ") : fallback;
  return `${content}.`;
}

function scoreDrinkProduct(product: ProductDetailProps, req: RecommendRequest): ScoredProduct {
  let score = 0;
  const reasons: string[] = [];
  const density = getDensityValue(product);
  const diet = getDietScore(product);
  const performance = getPerformanceScore(product);
  const protein = product.proteinPerServing;
  const calories = product.calories ?? 150;
  const sugar = product.sugar ?? 0;

  if (req.purpose === "muscle") {
    score += protein * 3 + performance * 2;
    if (protein >= 25) reasons.push("고단백으로 근성장 목적에 잘 맞습니다");
  } else if (req.purpose === "diet") {
    score += (300 - diet) * 2 + (200 - calories) * 1.5;
    if (sugar <= 2) reasons.push("당류가 낮아 다이어트용으로 보기 좋습니다");
    if (calories <= 120) reasons.push("저칼로리로 부담이 적습니다");
  } else if (req.purpose === "daily") {
    score += protein * 2 + density * 10 + (200 - calories);
    if (protein >= 20 && calories <= 150) reasons.push("일상 보충용으로 균형이 좋습니다");
  } else if (req.purpose === "recovery") {
    score += performance * 3 + protein * 2;
    if (protein >= 20) reasons.push("운동 후 회복용 단백질 보충에 적합합니다");
  }

  if (req.frequency === "daily" || req.frequency === "often") {
    score += protein * 1.5;
  }

  if (req.intensity === "extreme" || req.intensity === "hard") {
    score += protein * 1.5;
    if (protein >= 30) score += 15;
  } else if (req.intensity === "light") {
    score += 200 - calories;
  }

  for (const condition of req.conditions) {
    if (condition === "lowcal" && calories <= 150) {
      score += 25;
      reasons.push("150kcal 이하 저칼로리입니다");
    }
    if (condition === "highpro" && protein >= 20) {
      score += 25;
      reasons.push("20g 이상 고단백 음료입니다");
    }
    if (
      condition === "vegan" &&
      (product.proteinSource?.includes("식물성") ||
        product.proteinSource?.includes("대두") ||
        product.proteinSource?.includes("완두"))
    ) {
      score += 30;
      reasons.push("식물성 단백질 급원입니다");
    }
    if (condition === "lowsugar" && sugar <= 2) {
      score += 25;
      reasons.push("당류 2g 이하 저당 제품입니다");
    }
    if (condition === "taste") {
      score += 5;
    }
    if (condition === "density") {
      score += density * 5;
      if (density >= 8) reasons.push("단백질 밀도가 높아 효율적인 섭취가 가능합니다");
    }
  }

  return {
    product,
    score,
    reason: buildReason(reasons, density >= 8 ? "단백질 밀도가 높아 효율적인 섭취가 가능합니다" : "칼로리와 영양 구성이 균형적입니다"),
  };
}

function scoreBarProduct(product: ProductDetailProps, req: RecommendRequest): ScoredProduct {
  let score = 0;
  const reasons: string[] = [];
  const density = getDensityValue(product);
  const diet = getDietScore(product);
  const performance = getPerformanceScore(product);
  const protein = product.proteinPerServing;
  const calories = product.calories ?? 220;
  const sugar = product.sugar ?? 0;

  if (req.purpose === "muscle") {
    score += protein * 3 + performance * 1.8;
    if (protein >= 15) reasons.push("단백질 함량이 높아 운동 보충용으로 적합합니다");
  } else if (req.purpose === "diet") {
    score += (320 - diet) * 2 + (240 - calories);
    if (sugar <= 5) reasons.push("당류 부담이 낮아 간식형으로 보기 좋습니다");
  } else if (req.purpose === "daily") {
    score += protein * 2 + density * 10 + (260 - calories);
    reasons.push("간편하게 챙기기 쉬운 바 타입입니다");
  } else if (req.purpose === "recovery") {
    score += performance * 2.4 + protein * 2;
    if (protein >= 12) reasons.push("운동 후 보충용 단백질 바로 무난합니다");
  }

  if (req.frequency === "daily" || req.frequency === "often") {
    score += protein;
  }

  if (req.intensity === "extreme" || req.intensity === "hard") {
    score += protein * 1.2;
  } else if (req.intensity === "light") {
    score += 220 - calories;
  }

  for (const condition of req.conditions) {
    if (condition === "highpro" && protein >= 12) {
      score += 24;
      reasons.push("12g 이상 단백질을 담고 있습니다");
    }
    if (condition === "meal" && calories >= 180) {
      score += 18;
      reasons.push("포만감 있는 식사 보완형에 가깝습니다");
    }
    if (
      condition === "vegan" &&
      (product.proteinSource?.includes("식물성") ||
        product.proteinSource?.includes("대두") ||
        product.proteinSource?.includes("완두"))
    ) {
      score += 30;
      reasons.push("식물성 단백질 급원입니다");
    }
    if (condition === "lowsugar" && sugar <= 5) {
      score += 24;
      reasons.push("당류 5g 이하로 비교적 낮습니다");
    }
    if (condition === "taste") {
      score += 5;
    }
    if (condition === "density") {
      score += density * 5;
      if (density >= 6) reasons.push("칼로리 대비 단백질 효율이 좋습니다");
    }
  }

  return {
    product,
    score,
    reason: buildReason(reasons, protein >= 12 ? "단백질 보충용으로 보기 좋은 기본 구성을 갖췄습니다" : "간편한 스낵형 보충 제품으로 무난합니다"),
  };
}

function scoreYogurtProduct(product: ProductDetailProps, req: RecommendRequest): ScoredProduct {
  let score = 0;
  const reasons: string[] = [];
  const density = getDensityValue(product);
  const diet = getDietScore(product);
  const performance = getPerformanceScore(product);
  const protein = product.proteinPerServing;
  const calories = product.calories ?? 120;
  const sugar = product.sugar ?? 0;
  const greek = isGreekYogurt(product);
  const drinking = isDrinkingYogurt(product);
  const bulk = isBulkYogurt(product);

  if (req.purpose === "muscle") {
    score += protein * 2.5 + performance * 1.8;
    if (protein >= 10) reasons.push("요거트 중에서도 단백질 함량이 높은 편입니다");
  } else if (req.purpose === "diet") {
    score += (260 - diet) * 2 + density * 8;
    if (sugar <= 5) reasons.push("당류 부담이 낮아 식단 관리에 유리합니다");
  } else if (req.purpose === "daily") {
    score += protein * 1.8 + density * 10 + (180 - calories);
    reasons.push("일상적으로 먹기 쉬운 요거트 타입입니다");
  } else if (req.purpose === "recovery") {
    score += performance * 2.2 + protein * 2;
    if (greek) reasons.push("꾸덕한 그릭 타입으로 포만감과 단백질 효율이 좋습니다");
  }

  if (req.frequency === "daily" || req.frequency === "often") {
    score += density * 2;
  }

  if (req.intensity === "extreme" || req.intensity === "hard") {
    score += protein;
  } else if (req.intensity === "light") {
    score += 180 - calories;
  }

  for (const condition of req.conditions) {
    if (condition === "highpro" && protein >= 10) {
      score += 24;
      reasons.push("10g 이상 단백질을 담고 있습니다");
    }
    if (condition === "greek" && greek) {
      score += 24;
      reasons.push("그릭 타입 중심으로 보기 좋은 제품입니다");
    }
    if (condition === "drinking" && drinking) {
      score += 24;
      reasons.push("마시기 쉬운 드링킹 타입입니다");
    }
    if (condition === "bulk" && bulk) {
      score += 20;
      reasons.push("여러 번 나눠 먹기 좋은 대용량 제품입니다");
    }
    if (condition === "lowsugar" && sugar <= 5) {
      score += 20;
      reasons.push("당류 5g 이하로 비교적 낮습니다");
    }
    if (condition === "density") {
      score += density * 5;
      if (density >= 8) reasons.push("단백질 밀도가 높아 효율적인 요거트입니다");
    }
  }

  return {
    product,
    score,
    reason: buildReason(
      reasons,
      greek
        ? "그릭 계열로 단백질 밀도가 좋은 편입니다"
        : drinking
          ? "간편하게 마시기 좋은 요거트 제품입니다"
          : "일상적으로 먹기 좋은 균형형 요거트입니다",
    ),
  };
}

function scoreProduct(product: ProductDetailProps, req: RecommendRequest): ScoredProduct {
  if (req.category === "bar") return scoreBarProduct(product, req);
  if (req.category === "yogurt") return scoreYogurtProduct(product, req);
  return scoreDrinkProduct(product, req);
}

function getPurposeLabel(value: string) {
  const map: Record<string, string> = {
    muscle: "근성장·벌크업",
    diet: "다이어트·체중 감량",
    daily: "일상 간편식 보충",
    recovery: "운동 회복·컨디션",
  };
  return map[value] ?? value;
}

function getFrequencyLabel(value: string) {
  const map: Record<string, string> = {
    rarely: "거의 안함 (주 0~1회)",
    sometimes: "가끔 (주 2~3회)",
    often: "자주 (주 4~5회)",
    daily: "매일",
  };
  return map[value] ?? value;
}

function getIntensityLabel(value: string) {
  const map: Record<string, string> = {
    light: "가볍게",
    moderate: "적당히",
    hard: "강하게",
    extreme: "매우 강하게",
  };
  return map[value] ?? value;
}

function getConditionLabel(category: RecommendRequest["category"], value: string) {
  const map: Record<RecommendRequest["category"], Record<string, string>> = {
    drink: {
      lowcal: "저칼로리",
      highpro: "고단백",
      vegan: "식물성·비건",
      taste: "맛 중시",
      density: "단백질 밀도",
      lowsugar: "저당",
    },
    bar: {
      highpro: "고단백",
      meal: "식사 보완형",
      vegan: "식물성·비건",
      taste: "맛 중시",
      density: "단백질 밀도",
      lowsugar: "저당",
    },
    yogurt: {
      highpro: "고단백",
      greek: "그릭",
      drinking: "드링킹",
      bulk: "대용량",
      density: "단백질 밀도",
      lowsugar: "저당",
    },
  };

  return map[category][value] ?? value;
}

function getCategoryTips(req: RecommendRequest) {
  if (req.category === "bar") {
    return [
      {
        icon: "🍫",
        title: "간식과 식사 보완을 구분",
        desc: "단백질 함량뿐 아니라 칼로리와 당류를 함께 보면 실제 용도 파악이 쉬워집니다.",
      },
      {
        icon: "🏃",
        title: "이동 중 보충에 강점",
        desc: "휴대성이 좋아 외출이나 운동 전후 간편 보충용으로 잘 맞습니다.",
      },
    ];
  }

  if (req.category === "yogurt") {
    return [
      {
        icon: "🥄",
        title: "그릭과 드링킹은 용도가 다름",
        desc: "그릭은 포만감과 밀도, 드링킹은 간편함이 강점이라 상황에 따라 나눠 보는 편이 좋습니다.",
      },
      {
        icon: "🧊",
        title: "냉장 보관 기준 확인",
        desc: "요거트는 보관 조건과 개봉 후 섭취 타이밍까지 함께 보는 것이 안전합니다.",
      },
    ];
  }

  return [
    {
      icon: "💧",
      title: "바로 마시는 RTD 특성",
      desc: "음료는 섭취 속도가 빨라 운동 직후나 바쁜 일정에 활용하기 좋습니다.",
    },
    {
      icon: "📦",
      title: "용량과 단백질을 같이 보기",
      desc: "같은 20g이라도 용량이 다르면 체감 포만감과 음용감이 달라질 수 있습니다.",
    },
  ];
}

function getTips(req: RecommendRequest) {
  const tips: { icon: string; title: string; desc: string }[] = [...getCategoryTips(req)];

  if (req.purpose === "muscle") {
    tips.push({
      icon: "💪",
      title: "운동 후 30분 이내 섭취",
      desc: "근합성 골든타임에 빠르게 단백질을 보충하는 편이 효율적입니다.",
    });
  } else if (req.purpose === "diet") {
    tips.push({
      icon: "🔥",
      title: "당류와 칼로리를 같이 보기",
      desc: "단백질 함량이 높아도 당류가 높으면 실제 용도는 달라질 수 있습니다.",
    });
  } else if (req.purpose === "daily") {
    tips.push({
      icon: "☀️",
      title: "지속 가능한 루틴이 중요",
      desc: "일상 보충은 극단적인 스펙보다 꾸준히 먹기 쉬운 제품이 더 실전적입니다.",
    });
  } else {
    tips.push({
      icon: "🔄",
      title: "운동 전후 섭취 권장",
      desc: "회복을 돕고 다음 운동 컨디션을 유지하는 데 도움이 됩니다.",
    });
  }

  if (req.intensity === "hard" || req.intensity === "extreme") {
    tips.push({
      icon: "⚡",
      title: "고강도일수록 단백질 기준 우선",
      desc: "운동 강도가 높으면 단백질 함량과 퍼포먼스 지표를 먼저 보는 편이 좋습니다.",
    });
  }

  if (req.conditions.includes("vegan")) {
    tips.push({
      icon: "🌿",
      title: "식물성 단백질 조합",
      desc: "콩·완두 기반 제품은 필수 아미노산 구성을 함께 보는 것이 좋습니다.",
    });
  }

  return tips.slice(0, 4);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RecommendRequest;
    const { category } = body;

    let products =
      category === "bar"
        ? [...barProductsWithGrades]
        : category === "yogurt"
          ? [...yogurtProductsWithGrades]
          : [...mockProducts];

    if (body.conditions.includes("vegan")) {
      const veganOnly = products.filter(
        (product) =>
          product.proteinSource?.includes("식물성") ||
          product.proteinSource?.includes("대두") ||
          product.proteinSource?.includes("완두"),
      );
      if (veganOnly.length >= 3) products = veganOnly;
    }

    const scored = products.map((product) => scoreProduct(product, body));
    scored.sort((a, b) => b.score - a.score);

    const topProducts = scored.slice(0, 6).map((item, index) => {
      const product = item.product;
      const gradeTags = product.gradeTags ?? [];
      const gradeValue: Record<string, string> = {};

      for (const tag of gradeTags) {
        const parts = tag.split(" ");
        const letter = parts.pop() ?? "";
        const key = parts.join(" ");
        if (key === "밀도") gradeValue.price = letter;
        else if (key === "다이어트") gradeValue.diet = letter;
        else if (key === "퍼포먼스") gradeValue.performance = letter;
      }

      return {
        rank: index + 1,
        score: 0,
        id: product.slug,
        brand: product.brand,
        name: product.name,
        flavor: product.flavor ?? null,
        volume: product.capacity,
        protein: product.proteinPerServing,
        calories: product.calories ?? 0,
        sugar: product.sugar ?? 0,
        density: getDensityValue(product).toFixed(1),
        gradeValue,
        reason: item.reason,
        detailPath: `/product/${product.slug}`,
        imageUrl: getProductImageUrl(product.slug),
      };
    });

    const topScores = topProducts.map((item) => scored[item.rank - 1]?.score ?? 0);
    const maxScore = Math.max(...topScores, 1);
    const minScore = Math.min(...topScores, maxScore);
    const scoreGap = Math.max(maxScore - minScore, 1);

    topProducts.forEach((item, index) => {
      const rawScore = topScores[index] ?? 0;
      const normalized = 85 + Math.round(((rawScore - minScore) / scoreGap) * 14);
      item.score = Math.min(99, Math.max(85, normalized));
    });

    const profileChips = [
      getPurposeLabel(body.purpose),
      getFrequencyLabel(body.frequency),
      getIntensityLabel(body.intensity),
      ...body.conditions.map((condition) => getConditionLabel(body.category, condition)),
    ];

    return NextResponse.json({
      products: topProducts,
      profileChips,
      tips: getTips(body),
    });
  } catch {
    return NextResponse.json({ error: "추천 요청을 처리할 수 없습니다." }, { status: 400 });
  }
}

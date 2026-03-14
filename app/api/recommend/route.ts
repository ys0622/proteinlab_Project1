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

function scoreProduct(p: ProductDetailProps, req: RecommendRequest): ScoredProduct {
  let score = 0;
  const reasons: string[] = [];

  const density = getDensityValue(p);
  const diet = getDietScore(p);
  const perf = getPerformanceScore(p);
  const protein = p.proteinPerServing;
  const cal = p.calories ?? 150;
  const sugar = p.sugar ?? 0;

  // 목적별 가중치
  if (req.purpose === "muscle") {
    score += protein * 3;
    score += perf * 2;
    if (protein >= 25) { score += 20; reasons.push("고단백으로 근성장에 유리"); }
  } else if (req.purpose === "diet") {
    score += (300 - diet) * 2;
    score += (200 - cal) * 1.5;
    if (sugar <= 2) { score += 30; reasons.push("당류가 낮아 다이어트에 적합"); }
    if (cal <= 120) { score += 20; reasons.push("저칼로리로 부담 없는 섭취"); }
  } else if (req.purpose === "daily") {
    score += protein * 2;
    score += density * 10;
    score += (200 - cal);
    if (protein >= 20 && cal <= 150) reasons.push("균형 잡힌 성분으로 일상 보충에 적합");
  } else if (req.purpose === "recovery") {
    score += perf * 3;
    score += protein * 2;
    if (protein >= 20) reasons.push("운동 후 회복에 필요한 단백질 확보");
  }

  // 운동 빈도별 보정
  if (req.frequency === "daily" || req.frequency === "often") {
    score += protein * 1.5;
  }

  // 운동 강도별 보정
  if (req.intensity === "extreme" || req.intensity === "hard") {
    score += protein * 1.5;
    if (protein >= 30) score += 15;
  } else if (req.intensity === "light") {
    score += (200 - cal);
  }

  // 추가 조건
  for (const cond of req.conditions) {
    if (cond === "lowcal" && cal <= 150) { score += 25; reasons.push("150kcal 이하 저칼로리"); }
    if (cond === "highpro" && protein >= 30) { score += 25; reasons.push("30g 이상 고단백"); }
    if (cond === "vegan" && p.proteinSource?.includes("식물성")) { score += 30; reasons.push("식물성 단백질 급원"); }
    if (cond === "sugar" && sugar <= 2) { score += 25; reasons.push("당류 2g 이하 무당류"); }
    if (cond === "taste") { score += 5; }
    if (cond === "price") {
      score += density * 5;
      if (density >= 8) reasons.push("단백질 밀도가 높아 효율적인 섭취 가능");
    }
  }

  if (reasons.length === 0) {
    if (density >= 8) reasons.push("높은 단백질 밀도로 효율적인 섭취 가능");
    else if (cal <= 130) reasons.push("적당한 칼로리와 균형 잡힌 영양 구성");
    else reasons.push("안정적인 영양 구성");
  }

  return { product: p, score, reason: reasons.slice(0, 2).join(". ") + "." };
}

function getPurposeLabel(v: string) {
  const map: Record<string, string> = { muscle: "근성장·벌크업", diet: "다이어트·체중 감량", daily: "일상 간편식 보충", recovery: "운동 회복·컨디션" };
  return map[v] ?? v;
}
function getFrequencyLabel(v: string) {
  const map: Record<string, string> = { rarely: "거의 안함 (주 0~1회)", sometimes: "가끔 (주 2~3회)", often: "자주 (주 4~5회)", daily: "매일" };
  return map[v] ?? v;
}
function getIntensityLabel(v: string) {
  const map: Record<string, string> = { light: "가볍게", moderate: "적당히", hard: "강하게", extreme: "매우 강하게" };
  return map[v] ?? v;
}
function getConditionLabel(v: string) {
  const map: Record<string, string> = { lowcal: "저칼로리", highpro: "고단백", vegan: "식물성·비건", taste: "맛 중시", price: "단백질 밀도", sugar: "무당류" };
  return map[v] ?? v;
}

function getTips(req: RecommendRequest) {
  const tips: { icon: string; title: string; desc: string }[] = [];

  if (req.purpose === "muscle") {
    tips.push({ icon: "💪", title: "운동 후 30분 이내 섭취", desc: "근합성 골든타임에 빠르게 흡수되는 유청 단백질을 섭취하세요." });
    tips.push({ icon: "🥩", title: "하루 체중 1kg당 1.6~2.2g", desc: "근성장을 위한 일일 단백질 섭취 권장량입니다." });
  } else if (req.purpose === "diet") {
    tips.push({ icon: "🔥", title: "식간 간식으로 활용", desc: "포만감을 유지하면서 불필요한 간식을 줄일 수 있습니다." });
    tips.push({ icon: "📊", title: "당류 0g 제품 우선", desc: "혈당 스파이크를 줄이고 체지방 축적을 방지합니다." });
  } else if (req.purpose === "daily") {
    tips.push({ icon: "☀️", title: "아침 식사 대용으로 추천", desc: "바쁜 아침에 간편하게 단백질을 보충하세요." });
    tips.push({ icon: "🧊", title: "냉장 보관 후 섭취", desc: "차갑게 마시면 맛이 더 좋아집니다." });
  } else {
    tips.push({ icon: "🔄", title: "운동 전후 섭취 권장", desc: "회복을 돕고 다음 운동 컨디션을 높여줍니다." });
    tips.push({ icon: "💧", title: "충분한 수분 섭취 병행", desc: "단백질 대사에 수분이 필요합니다." });
  }

  if (req.intensity === "hard" || req.intensity === "extreme") {
    tips.push({ icon: "⚡", title: "BCAA 함유 제품 우선", desc: "고강도 운동 시 근분해를 방지합니다." });
  }
  if (req.conditions.includes("vegan")) {
    tips.push({ icon: "🌿", title: "식물성 단백질 조합", desc: "콩·완두 기반 제품은 필수 아미노산을 고루 함유합니다." });
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

    // vegan 조건 선택 시 식물성 제품만 필터링
    if (body.conditions.includes("vegan")) {
      const veganOnly = products.filter((p) =>
        p.proteinSource?.includes("식물성") || p.proteinSource?.includes("대두") || p.proteinSource?.includes("완두")
      );
      if (veganOnly.length >= 3) products = veganOnly;
    }

    const scored = products.map((p) => scoreProduct(p, body));
    scored.sort((a, b) => b.score - a.score);

    const top3 = scored.slice(0, 6).map((s, i) => {
      const p = s.product;
      const gradeTags = p.gradeTags ?? [];
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
        rank: i + 1,
        score: 0,
        id: p.slug,
        brand: p.brand,
        name: p.name,
        flavor: p.flavor ?? null,
        volume: p.capacity,
        protein: p.proteinPerServing,
        calories: p.calories ?? 0,
        sugar: p.sugar ?? 0,
        density: getDensityValue(p).toFixed(1),
        gradeValue,
        reason: s.reason,
        detailPath: `/product/${p.slug}`,
        imageUrl: getProductImageUrl(p.slug),
      };
    });

    const topScores = top3.map((item) => scored[item.rank - 1]?.score ?? 0);
    const maxScore = Math.max(...topScores, 1);
    const minScore = Math.min(...topScores, maxScore);
    const scoreGap = Math.max(maxScore - minScore, 1);

    top3.forEach((item, index) => {
      const rawScore = topScores[index] ?? 0;
      const normalized = 85 + Math.round(((rawScore - minScore) / scoreGap) * 14);
      item.score = Math.min(99, Math.max(85, normalized));
    });

    const profileChips = [
      getPurposeLabel(body.purpose),
      getFrequencyLabel(body.frequency),
      getIntensityLabel(body.intensity),
      ...body.conditions.map(getConditionLabel),
    ];

    return NextResponse.json({
      products: top3,
      profileChips,
      tips: getTips(body),
    });
  } catch {
    return NextResponse.json({ error: "추천 요청을 처리할 수 없습니다." }, { status: 400 });
  }
}

import shakeProducts from "@/app/data/shakeProductsData.json";
import drinkProducts from "@/app/data/drinkProductsData.json";

// 쉐이크 질문 가이드(효과·다이어트·살찌나요, 2026-11-02)에서 쓰는 등록 제품 통계. 모두 1포(물에 탄 기준) 성분표 값이다.
type ShakeRow = { slug: string; proteinPerServing: number; calories: number; sugar: number; nutritionPerBottle?: { fiberG?: number } };

const rows = shakeProducts as ShakeRow[];

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = (sorted.length - 1) / 2;
  return Math.round(((sorted[Math.floor(mid)] + sorted[Math.ceil(mid)]) / 2) * 10) / 10;
}

const count = (predicate: (row: ShakeRow) => boolean) => rows.filter(predicate).length;

// 흰 우유 200mL를 더할 때 쓰는 값. 시판 흰 우유 200mL 영양표시는 대개 120~140kcal, 단백질 6g 안팎이라 가운데 값으로 둔 추정치다.
export const MILK_200ML = { kcal: 130, protein: 6 };

export const shakeStats = {
  total: rows.length,
  medianProtein: median(rows.map((r) => r.proteinPerServing)),
  medianKcal: median(rows.map((r) => r.calories)),
  medianSugar: median(rows.map((r) => r.sugar)),
  medianFiber: median(rows.map((r) => r.nutritionPerBottle?.fiberG ?? 0)),
  minKcal: Math.min(...rows.map((r) => r.calories)),
  maxKcal: Math.max(...rows.map((r) => r.calories)),
  // 열량 중 단백질 비율(단백질 1g = 4kcal)
  medianProteinEnergyPct: Math.round(median(rows.map((r) => ((r.proteinPerServing * 4) / r.calories) * 100))),
  kcalBuckets: [
    { label: "150kcal 미만", count: count((r) => r.calories < 150) },
    { label: "150~199kcal", count: count((r) => r.calories >= 150 && r.calories < 200) },
    { label: "200kcal 이상", count: count((r) => r.calories >= 200) },
  ],
  sugarBuckets: [
    { label: "1g 이하", count: count((r) => r.sugar <= 1) },
    { label: "1g 초과~5g", count: count((r) => r.sugar > 1 && r.sugar <= 5) },
    { label: "5g 초과", count: count((r) => r.sugar > 5) },
  ],
  proteinBuckets: [
    { label: "20g 미만", count: count((r) => r.proteinPerServing < 20) },
    { label: "20~24g", count: count((r) => r.proteinPerServing >= 20 && r.proteinPerServing < 25) },
    { label: "25g 이상", count: count((r) => r.proteinPerServing >= 25) },
  ],
  fiber3Plus: count((r) => (r.nutritionPerBottle?.fiberG ?? 0) >= 3),
  // 다이어트 기준 예: 단백질 20g 이상·200kcal 이하·당류 5g 이하
  dietFit: count((r) => r.proteinPerServing >= 20 && r.calories <= 200 && r.sugar <= 5),
  // 물에 타면 식약처 체중조절용 조제식품의 한 끼 열량(200~400kcal)에 드는 제품 수, 우유 200mL를 더하면 드는 제품 수
  mealRangeWater: count((r) => r.calories >= 200 && r.calories <= 400),
  mealRangeMilk: count((r) => r.calories + MILK_200ML.kcal >= 200 && r.calories + MILK_200ML.kcal <= 400),
};

// 비교용 단백질 음료(RTD) 1병 기준 중앙값
const drinks = (drinkProducts as { proteinPerServing: number; calories: number; sugar: number }[]).filter((d) => d.calories > 0);

export const drinkStats = {
  total: drinks.length,
  medianProtein: median(drinks.map((d) => d.proteinPerServing)),
  medianKcal: median(drinks.map((d) => d.calories)),
  medianSugar: median(drinks.map((d) => d.sugar)),
  medianProteinEnergyPct: Math.round(median(drinks.map((d) => ((d.proteinPerServing * 4) / d.calories) * 100))),
};

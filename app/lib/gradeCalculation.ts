import type { ProductDetailProps } from "../data/products";

function parseDensityNum(d: string): number {
  const m = d.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
}

/**
 * 20/50/80 퍼센타일 기반 A/B/C/D 등급 부여 (proteinlab.kr 기준)
 * - 상위 20% → A
 * - 상위 50% → B
 * - 상위 80% → C
 * - 하위 20% → D
 */
function assignGrades(values: number[], higherIsBetter: boolean): string[] {
  const ranked = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => (higherIsBetter ? b.value - a.value : a.value - b.value));

  const grades = new Array<string>(values.length);
  const len = ranked.length;

  ranked.forEach(({ index }, rankIndex) => {
    const pct = rankIndex / len;
    if (pct < 0.2) grades[index] = "A";
    else if (pct < 0.5) grades[index] = "B";
    else if (pct < 0.8) grades[index] = "C";
    else grades[index] = "D";
  });

  return grades;
}

export function getDensityValue(p: ProductDetailProps): number {
  return parseDensityNum(p.density);
}

export function getDietScore(p: ProductDetailProps): number {
  const cal = p.calories ?? 150;
  const sug = p.sugar ?? 0;
  return cal + sug * 4;
}

export function getPerformanceScore(p: ProductDetailProps): number {
  const protein = p.proteinPerServing;
  const cal = p.calories ?? 150;
  const sug = p.sugar ?? 0;
  if (protein <= 0) return 0;
  return protein / (1 + (cal + sug * 2) / 100);
}

function applyGradesInternal(products: ProductDetailProps[]): ProductDetailProps[] {
  if (products.length === 0) return [];

  const densityVals = products.map(getDensityValue);
  const dietVals = products.map(getDietScore);
  const perfVals = products.map(getPerformanceScore);

  const densityGrades = assignGrades(densityVals, true);
  const dietGrades = assignGrades(dietVals, false);
  const perfGrades = assignGrades(perfVals, true);

  return products.map((p, i) => ({
    ...p,
    gradeTags: [
      `밀도 ${densityGrades[i]}`,
      `다이어트 ${dietGrades[i]}`,
      `퍼포먼스 ${perfGrades[i]}`,
    ],
    gradeDescriptions: [
      descDensity(densityGrades[i]),
      descDiet(dietGrades[i]),
      descPerf(perfGrades[i]),
    ] as [string, string, string],
  }));
}

function descDensity(g: string): string {
  if (g === "A") return "용량 대비 단백질 밀도가 상위 20% 그룹이에요.";
  if (g === "B") return "단백질 밀도가 평균 이상이에요.";
  if (g === "C") return "단백질 밀도가 평균 수준이에요.";
  return "단백질 밀도가 하위 그룹이에요.";
}

function descDiet(g: string): string {
  if (g === "A") return "칼로리·당 효율이 상위 20% 그룹이에요.";
  if (g === "B") return "칼로리·당 효율이 평균 이상이에요.";
  if (g === "C") return "칼로리·당 효율이 평균 수준이에요.";
  return "칼로리·당 효율이 하위 그룹이에요.";
}

function descPerf(g: string): string {
  if (g === "A") return "단백질 밀도 기준 퍼포먼스 상위 그룹이에요.";
  if (g === "B") return "퍼포먼스 효율이 평균 이상이에요.";
  if (g === "C") return "퍼포먼스 효율이 평균 수준이에요.";
  return "퍼포먼스 효율이 하위 그룹이에요.";
}

export function applyDrinkGrades(products: ProductDetailProps[]): ProductDetailProps[] {
  return applyGradesInternal(products);
}

export function applyBarGrades(products: ProductDetailProps[]): ProductDetailProps[] {
  return applyGradesInternal(products);
}

export function applyYogurtGrades(products: ProductDetailProps[]): ProductDetailProps[] {
  return applyGradesInternal(products);
}

export function getDensitySortKey(p: ProductDetailProps): number {
  return getDensityValue(p);
}

export function getDietSortKey(p: ProductDetailProps): number {
  return getDietScore(p);
}

export function getPerformanceSortKey(p: ProductDetailProps): number {
  return getPerformanceScore(p);
}

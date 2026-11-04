import type { ProductDetailProps } from "../data/products";
import { isComparableServing } from "./servingScope";

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

// 등급 백분위는 1회 제공량 비교가 되는 제품끼리만 낸다(랭킹·상품 위치와 같은 기준).
// 요거트 400~907g 통처럼 용기 전체 수치인 제품이 다이어트 D·퍼포먼스 A를 받고 1컵 제품 등급까지 밀어내던 문제(2026-11-04).
function isGradeComparable(p: ProductDetailProps): boolean {
  return isComparableServing(p) && !p.needsServingCheck;
}

// 비교 풀 밖 제품은 밀도(100g·100mL·100kcal당이라 용량과 무관)만 풀 기준 구간에 넣는다.
function gradeAgainst(pool: number[], value: number, higherIsBetter: boolean): string {
  const better = pool.filter((v) => (higherIsBetter ? v > value : v < value)).length;
  const pct = better / Math.max(pool.length, 1);
  if (pct < 0.2) return "A";
  if (pct < 0.5) return "B";
  if (pct < 0.8) return "C";
  return "D";
}

function applyGradesInternal(products: ProductDetailProps[]): ProductDetailProps[] {
  if (products.length === 0) return [];

  const comparable = products.filter(isGradeComparable);
  const densityVals = comparable.map(getDensityValue);
  const dietVals = comparable.map(getDietScore);
  const perfVals = comparable.map(getPerformanceScore);

  const densityGrades = assignGrades(densityVals, true);
  const dietGrades = assignGrades(dietVals, false);
  const perfGrades = assignGrades(perfVals, true);
  const indexBySlug = new Map(comparable.map((p, i) => [p.slug, i] as const));

  return products.map((p) => {
    const i = isGradeComparable(p) ? indexBySlug.get(p.slug) : undefined;
    if (i === undefined) {
      const density = gradeAgainst(densityVals, getDensityValue(p), true);
      return {
        ...p,
        gradeTags: [`밀도 ${density}`],
        gradeDescriptions: [descDensity(density), "-", "-"] as [string, string, string],
      };
    }
    return {
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
    };
  });
}

function descDensity(g: string): string {
  if (g === "A") return "단백질 밀도가 같은 카테고리 상위 20% 그룹이에요.";
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
  if (g === "A") return "단백질 대비 열량·당 효율(퍼포먼스)이 상위 20% 그룹이에요.";
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

export function applyShakeGrades(products: ProductDetailProps[]): ProductDetailProps[] {
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

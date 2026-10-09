import type { ProductDetailProps } from "../data/products";
import { formatProductLabel } from "./productLabel";

const KIND_LABEL = { drink: "단백질 음료", bar: "단백질 바", yogurt: "단백질 요거트", shake: "단백질 쉐이크" } as const;
type Kind = keyof typeof KIND_LABEL;

export type BrandProfileRow = {
  slug: string;
  label: string;
  protein: number;
  calories: number;
  sugar: number;
  proteinRank: number; // 같은 카테고리 안 단백질 순위(공동 순위)
  per100: number; // 100kcal당 단백질(g)
};

export type BrandProfileGroup = {
  kind: Kind;
  kindLabel: string;
  poolSize: number;
  rows: BrandProfileRow[];
  summary: string;
};

// 괄호 등은 건너뛰고 마지막 한글 글자의 받침으로 은/는을 정한다.
function withTopic(text: string) {
  const syllables = text.match(/[가-힣]/g);
  const batchim = syllables ? (syllables[syllables.length - 1].charCodeAt(0) - 0xac00) % 28 !== 0 : false;
  return `${text}${batchim ? "은" : "는"}`;
}

function n(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function hasNumbers(p: ProductDetailProps) {
  return (
    n(p.proteinPerServing) !== null &&
    n(p.calories) !== null &&
    n(p.sugar) !== null &&
    (p.proteinPerServing ?? 0) > 0 &&
    (p.calories ?? 0) > 0
  );
}

// 브랜드 표에는 1회 제공량 확인이 필요한 제품을 넣지 않는다(비교 풀은 상품 페이지와 같은 기준).
function usable(p: ProductDetailProps) {
  return hasNumbers(p) && !p.needsServingCheck;
}

function range(values: number[], unit: string) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min}${unit}` : `${min}~${max}${unit}`;
}

/** 브랜드 제품을 카테고리별로 묶어 실제 수치 범위·대표 제품·카테고리 내 순위를 계산한다. */
export function getBrandProfile(
  brand: string,
  brandItems: ProductDetailProps[],
  allProducts: ProductDetailProps[],
): BrandProfileGroup[] {
  const groups: BrandProfileGroup[] = [];
  for (const kind of Object.keys(KIND_LABEL) as Kind[]) {
    const items = brandItems.filter((p) => (p.productType ?? "drink") === kind && usable(p));
    if (items.length === 0) continue;
    const pool = allProducts.filter((p) => (p.productType ?? "drink") === kind && hasNumbers(p));
    const per100 = (p: ProductDetailProps) => ((p.proteinPerServing ?? 0) / (p.calories ?? 1)) * 100;

    const rows: BrandProfileRow[] = items
      .map((p) => ({
        slug: p.slug,
        label: formatProductLabel(p.brand, p.name),
        protein: p.proteinPerServing as number,
        calories: p.calories as number,
        sugar: p.sugar as number,
        proteinRank: pool.filter((q) => (q.proteinPerServing ?? 0) > (p.proteinPerServing ?? 0)).length + 1,
        per100: Math.round(per100(p) * 10) / 10,
      }))
      .sort((a, b) => b.protein - a.protein || a.calories - b.calories);

    const kindLabel = KIND_LABEL[kind];
    const maxProtein = Math.max(...rows.map((r) => r.protein));
    const minSugar = Math.min(...rows.map((r) => r.sugar));
    const maxEff = Math.max(...rows.map((r) => r.per100));
    const topRank = rows.find((r) => r.protein === maxProtein)!.proteinRank;
    const multi = rows.length > 1;

    // 동점이면 첫 제품만 "가장"이라고 말하지 않고 공동 여부를 밝힌다.
    const pick = (best: number, key: (r: BrandProfileRow) => number, unit: string) => {
      const tops = rows.filter((r) => key(r) === best);
      if (tops.length === 1) return `${tops[0].label}(${best}${unit})`;
      return `${tops[0].label} 등 ${tops.length}종(${best}${unit}, 공동)`;
    };

    const parts = [
      `${withTopic(brand)} ProteinLab에 ${kindLabel} ${rows.length}종이 등록돼 있고, 단백질은 ${range(rows.map((r) => r.protein), "g")}, 열량은 ${range(rows.map((r) => r.calories), "kcal")}, 당류는 ${range(rows.map((r) => r.sugar), "g")} 범위입니다.`,
      multi && rows.every((r) => r.protein === maxProtein)
        ? `모든 제품의 단백질이 ${maxProtein}g으로 같고, 같은 카테고리 ${pool.length}종 중 ${topRank}위(공동 순위)입니다.`
        : `단백질이 가장 많은 제품은 ${pick(maxProtein, (r) => r.protein, "g")}이며 같은 카테고리 ${pool.length}종 중 ${topRank}위입니다.`,
    ];
    if (multi) {
      const sugarPart = rows.every((r) => r.sugar === minSugar)
        ? `당류는 모두 ${minSugar}g이고`
        : `당류가 가장 낮은 제품은 ${pick(minSugar, (r) => r.sugar, "g")}이고`;
      const effPart = rows.every((r) => r.per100 === maxEff)
        ? "100kcal당 단백질도 모두 같습니다."
        : `100kcal당 단백질이 가장 높은 제품은 ${pick(maxEff, (r) => r.per100, "g")}입니다.`;
      parts.push(`${sugarPart} ${effPart}`);
    }
    groups.push({ kind, kindLabel, poolSize: pool.length, rows, summary: parts.join(" ") });
  }
  return groups;
}

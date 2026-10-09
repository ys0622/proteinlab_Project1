import type { ProductDetailProps } from "../data/products";
import { formatProductLabel } from "./productLabel";

export type ProductPositionRow = { label: string; value: string; note: string };
export type ProductPosition = {
  total: number;
  rows: ProductPositionRow[];
  summary: string;
  alternative?: { slug: string; label: string; detail: string };
};

const KIND_LABEL = { drink: "단백질 음료", bar: "단백질 바", yogurt: "단백질 요거트", shake: "단백질 쉐이크" } as const;

// 괄호 등은 건너뛰고 마지막 한글 글자의 받침으로 은/는을 정한다.
function withTopic(text: string) {
  const syllables = text.match(/[가-힣]/g);
  const batchim = syllables ? (syllables[syllables.length - 1].charCodeAt(0) - 0xac00) % 28 !== 0 : false;
  return `${text}${batchim ? "은" : "는"}`;
}

type Metric = "proteinPerServing" | "calories" | "sugar";

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

// 공동 순위: 나보다 확실히 나은 제품 수 + 1
function rankOf(pool: ProductDetailProps[], self: number, metric: Metric, higherIsBetter: boolean) {
  const values = pool.map((p) => num(p[metric])).filter((v): v is number => v !== null);
  const better = values.filter((v) => (higherIsBetter ? v > self : v < self)).length;
  const tied = values.filter((v) => v === self).length - 1;
  return { rank: better + 1, tied, total: values.length };
}

function rankText(r: { rank: number; tied: number; total: number }) {
  return `${r.tied > 0 ? "공동 " : ""}${r.rank}위 / ${r.total}종`;
}

/** 같은 카테고리 제품 데이터만으로 계산한다. 수치가 없으면 null을 돌려 섹션을 숨긴다. */
export function getProductPosition(
  product: ProductDetailProps,
  pool: ProductDetailProps[],
): ProductPosition | null {
  const kind = product.productType ?? "drink";
  const protein = num(product.proteinPerServing);
  const calories = num(product.calories);
  const sugar = num(product.sugar);
  if (protein === null || calories === null || sugar === null || protein <= 0 || calories <= 0) return null;
  if (product.needsServingCheck) return null;

  const usable = pool.filter(
    (p) => num(p.proteinPerServing) !== null && num(p.calories) !== null && num(p.sugar) !== null && (p.proteinPerServing ?? 0) > 0,
  );
  if (usable.length < 10) return null;

  const pRank = rankOf(usable, protein, "proteinPerServing", true);
  const cRank = rankOf(usable, calories, "calories", false);
  const sRank = rankOf(usable, sugar, "sugar", false);

  const per100 = (p: ProductDetailProps) => ((p.proteinPerServing ?? 0) / (p.calories ?? 1)) * 100;
  const eff = Math.round(per100(product) * 10) / 10;
  const effBetter = usable.filter((p) => per100(p) > per100(product) + 1e-9).length;
  const effTied = usable.filter((p) => Math.abs(per100(p) - per100(product)) < 1e-9).length - 1;

  const zeroSugar = usable.filter((p) => p.sugar === 0).length;
  const kindLabel = KIND_LABEL[kind];
  const name = formatProductLabel(product.brand, product.name);

  const sentences = [
    `${withTopic(name)} ProteinLab에 등록된 ${kindLabel} ${usable.length}종 중 단백질 ${protein}g으로 ${pRank.tied > 0 ? "공동 " : ""}${pRank.rank}위, 열량 ${calories}kcal로 낮은 순 ${cRank.tied > 0 ? "공동 " : ""}${cRank.rank}위입니다.`,
    sugar === 0
      ? `당류는 0g이며, 같은 카테고리에서 당류 0g인 제품은 ${zeroSugar}종입니다.`
      : `당류는 ${sugar}g으로 낮은 순 ${sRank.tied > 0 ? "공동 " : ""}${sRank.rank}위입니다.`,
    `100kcal당 단백질은 ${eff}g으로 ${effTied > 0 ? "공동 " : ""}${effBetter + 1}위입니다.`,
  ];

  // 단백질 함량이 비슷하면서(±3g) 열량이 가장 낮은 다른 제품 하나
  const close = usable
    .filter((p) => p.slug !== product.slug && Math.abs((p.proteinPerServing ?? 0) - protein) <= 3)
    .sort((a, b) => (a.calories ?? 0) - (b.calories ?? 0))[0];
  let alternative: ProductPosition["alternative"];
  if (close && (close.calories ?? 0) < calories) {
    alternative = {
      slug: close.slug,
      label: formatProductLabel(close.brand, close.name),
      detail: `단백질 ${close.proteinPerServing}g · ${close.calories}kcal · 당류 ${close.sugar}g (이 제품은 ${calories}kcal)`,
    };
  } else if (close) {
    sentences.push(`단백질 ${protein}g 안팎(±3g) 제품 중에서는 열량이 가장 낮은 편에 속합니다.`);
  }

  return {
    total: usable.length,
    summary: sentences.join(" "),
    alternative,
    rows: [
      { label: "단백질", value: `${protein}g`, note: rankText(pRank) },
      { label: "열량", value: `${calories}kcal`, note: `낮은 순 ${rankText(cRank)}` },
      { label: "당류", value: `${sugar}g`, note: `낮은 순 ${rankText(sRank)}` },
      { label: "100kcal당 단백질", value: `${eff}g`, note: `${effTied > 0 ? "공동 " : ""}${effBetter + 1}위 / ${usable.length}종` },
    ],
  };
}

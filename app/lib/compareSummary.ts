import type { ProductDetailProps } from "../data/productTypes";
import { getCompareColumn, type CompareColumnId } from "./compareColumns";

type DifferenceTone = "strength" | "efficiency" | "mixed";

export type CompareSummaryChip = {
  columnId: CompareColumnId;
  label: string;
  winnerName: string;
  winnerIndex: number;
  leftValue: string;
  rightValue: string;
  differenceText: string;
};

export type CompareSummaryData = {
  headline: string;
  chips: CompareSummaryChip[];
};

const PRIORITY_ORDER: CompareColumnId[] = [
  "proteinPerServing",
  "density",
  "sugar",
  "calories",
  "bcaa",
  "fiber",
  "fat",
  "sodium",
  "calorieDensity",
];

const MEANINGFUL_DIFF: Partial<Record<CompareColumnId, number>> = {
  proteinPerServing: 1.5,
  density: 0.8,
  sugar: 1,
  calories: 15,
  bcaa: 500,
  fiber: 1,
  fat: 1.5,
  sodium: 80,
  calorieDensity: 0.08,
};

const HIGHER_BETTER = new Set<CompareColumnId>([
  "proteinPerServing",
  "density",
  "bcaa",
  "fiber",
]);

const LOWER_BETTER = new Set<CompareColumnId>([
  "sugar",
  "calories",
  "fat",
  "sodium",
  "calorieDensity",
]);

type RankedDifference = CompareSummaryChip & {
  score: number;
  tone: DifferenceTone;
};

function formatDisplayValue(value: string | number | undefined, columnId: CompareColumnId) {
  if (value == null || value === "") return "-";
  if (typeof value === "number") return String(value);
  if (columnId === "bcaa" && /^[\d,.]+$/.test(value)) return `${value}mg`;
  return value;
}

function getNumericValue(product: ProductDetailProps, columnId: CompareColumnId) {
  const column = getCompareColumn(columnId);
  if (!column?.toNumber) return null;
  return column.toNumber(column.getValue(product));
}

function getDifferenceTone(columnId: CompareColumnId): DifferenceTone {
  if (HIGHER_BETTER.has(columnId)) return "strength";
  if (LOWER_BETTER.has(columnId)) return "efficiency";
  return "mixed";
}

function getMeaningfulThreshold(columnId: CompareColumnId) {
  return MEANINGFUL_DIFF[columnId] ?? 0;
}

function buildRankedDifferences(
  products: ProductDetailProps[],
  visibleIds: CompareColumnId[],
): RankedDifference[] {
  const candidateIds = PRIORITY_ORDER.filter((id) => visibleIds.includes(id));

  return candidateIds.flatMap((columnId) => {
    const column = getCompareColumn(columnId);
    if (!column?.toNumber || !column.highlight) return [];

    const leftValueRaw = column.getValue(products[0]);
    const rightValueRaw = column.getValue(products[1]);
    const leftDisplay = formatDisplayValue(leftValueRaw, columnId);
    const rightDisplay = formatDisplayValue(rightValueRaw, columnId);
    const leftNumeric = getNumericValue(products[0], columnId);
    const rightNumeric = getNumericValue(products[1], columnId);

    if (leftNumeric == null || rightNumeric == null) return [];
    if (leftDisplay === rightDisplay) return [];

    const diff = Math.abs(leftNumeric - rightNumeric);
    const threshold = getMeaningfulThreshold(columnId);
    if (diff < threshold || leftNumeric === rightNumeric) return [];

    const higherWins = column.highlight === "higher";
    const leftWins = higherWins ? leftNumeric > rightNumeric : leftNumeric < rightNumeric;
    const winnerIndex = leftWins ? 0 : 1;
    const winnerName = products[winnerIndex]?.name ?? "선택 제품";
    const label = column.label;
    const tone = getDifferenceTone(columnId);
    const score =
      PRIORITY_ORDER.length - PRIORITY_ORDER.indexOf(columnId) + diff / Math.max(threshold, 1);

    return [
      {
        columnId,
        label,
        winnerIndex,
        winnerName,
        leftValue: leftDisplay,
        rightValue: rightDisplay,
        differenceText: `${leftDisplay} vs ${rightDisplay}`,
        score,
        tone,
      },
    ];
  });
}

function joinLabels(labels: string[]) {
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
  return `${labels[0]}·${labels[1]}`;
}

function createTwoProductHeadline(products: ProductDetailProps[], ranked: RankedDifference[]) {
  if (ranked.length === 0) {
    return "두 제품은 큰 차이 없이 비슷한 스펙입니다.";
  }

  const winnerMap = new Map<number, RankedDifference[]>();
  for (const diff of ranked.slice(0, 3)) {
    const list = winnerMap.get(diff.winnerIndex) ?? [];
    list.push(diff);
    winnerMap.set(diff.winnerIndex, list);
  }

  const leftWins = winnerMap.get(0) ?? [];
  const rightWins = winnerMap.get(1) ?? [];

  if (leftWins.length > 0 && rightWins.length > 0) {
    const leftLabels = joinLabels(leftWins.slice(0, 2).map((item) => item.label));
    const rightLabels = joinLabels(rightWins.slice(0, 2).map((item) => item.label));
    return `${products[0].name}는 ${leftLabels}, ${products[1].name}는 ${rightLabels}에서 더 유리합니다.`;
  }

  const dominantIndex = leftWins.length >= rightWins.length ? 0 : 1;
  const dominantDiffs = winnerMap.get(dominantIndex) ?? [];
  const dominantProduct = products[dominantIndex];
  const labels = joinLabels(dominantDiffs.slice(0, 2).map((item) => item.label));
  const toneSet = new Set(dominantDiffs.slice(0, 2).map((item) => item.tone));

  const ending =
    toneSet.size === 1 && toneSet.has("strength")
      ? "더 강점이 있습니다."
      : toneSet.size === 1 && toneSet.has("efficiency")
        ? "더 유리합니다."
        : "더 앞섭니다.";

  return `${dominantProduct.name}가 ${labels}에서 ${ending}`;
}

function createMultiProductHeadline(ranked: RankedDifference[]) {
  if (ranked.length === 0) {
    return "선택한 제품들은 핵심 스펙 차이가 크지 않아 표에서 세부 항목을 함께 보는 편이 좋습니다.";
  }

  const top = ranked.slice(0, 2);
  const labels = joinLabels(top.map((item) => item.label));
  return `${labels}에서 우세가 갈려 있어 핵심 차이부터 확인해보세요.`;
}

export function getCompareSummary(
  products: ProductDetailProps[],
  visibleIds: CompareColumnId[],
): CompareSummaryData | null {
  if (products.length < 2) return null;

  const ranked = buildRankedDifferences(products, visibleIds).sort((a, b) => b.score - a.score);
  const chips = ranked.slice(0, 3).map((item) => ({
    columnId: item.columnId,
    label: item.label,
    winnerName: item.winnerName,
    winnerIndex: item.winnerIndex,
    leftValue: item.leftValue,
    rightValue: item.rightValue,
    differenceText: item.differenceText,
  }));

  const headline =
    products.length === 2
      ? createTwoProductHeadline(products, ranked)
      : createMultiProductHeadline(ranked);

  return { headline, chips };
}

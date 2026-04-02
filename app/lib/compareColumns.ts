import type { ProductDetailProps } from "../data/productTypes";

export type CompareColumnId =
  | "brand"
  | "manufacturer"
  | "package"
  | "capacity"
  | "proteinSource"
  | "proteinPerServing"
  | "bcaa"
  | "calories"
  | "sugar"
  | "fat"
  | "sodium"
  | "fiber"
  | "density"
  | "calorieDensity"
  | "priceLinks";

export interface CompareColumnDef {
  id: CompareColumnId;
  label: string;
  getValue: (p: ProductDetailProps) => string | number | undefined;
  highlight: "higher" | "lower" | null;
  toNumber?: (v: string | number | undefined) => number | null;
}

const toNumericValue = (v: string | number | undefined) =>
  typeof v === "string"
    ? parseFloat(v.replace(/[^\d.]/g, ""))
    : typeof v === "number"
      ? v
      : null;

export const COMPARE_COLUMNS: CompareColumnDef[] = [
  { id: "brand", label: "브랜드", getValue: (p) => p.brand, highlight: null },
  { id: "manufacturer", label: "제조사", getValue: (p) => p.manufacturer ?? "-", highlight: null },
  {
    id: "package",
    label: "패키지",
    getValue: (p) => (p.tags?.length ? p.tags.join(", ") : p.variant ?? "-"),
    highlight: null,
  },
  { id: "capacity", label: "용량", getValue: (p) => p.capacity, highlight: null },
  { id: "proteinSource", label: "단백질 원료", getValue: (p) => p.proteinSource ?? "-", highlight: null },
  {
    id: "proteinPerServing",
    label: "단백질",
    getValue: (p) => (p.proteinPerServing != null ? `${p.proteinPerServing}g` : "-"),
    highlight: "higher",
    toNumber: toNumericValue,
  },
  {
    id: "bcaa",
    label: "BCAA",
    getValue: (p) => p.bcaa ?? "-",
    highlight: "higher",
    toNumber: toNumericValue,
  },
  {
    id: "calories",
    label: "칼로리",
    getValue: (p) => (p.calories != null ? `${p.calories}` : "-"),
    highlight: "lower",
    toNumber: toNumericValue,
  },
  {
    id: "sugar",
    label: "당류",
    getValue: (p) => (p.sugar !== undefined ? `${p.sugar}g` : "-"),
    highlight: "lower",
    toNumber: toNumericValue,
  },
  {
    id: "fat",
    label: "지방",
    getValue: (p) => (p.fat !== undefined ? `${p.fat}g` : "-"),
    highlight: "lower",
    toNumber: toNumericValue,
  },
  {
    id: "sodium",
    label: "나트륨",
    getValue: (p) => (p.sodium !== undefined ? `${p.sodium}mg` : "-"),
    highlight: "lower",
    toNumber: toNumericValue,
  },
  {
    id: "fiber",
    label: "식이섬유",
    getValue: (p) => (p.nutritionPerBottle?.fiberG != null ? `${p.nutritionPerBottle.fiberG}g` : "-"),
    highlight: "higher",
    toNumber: toNumericValue,
  },
  {
    id: "density",
    label: "단백질 밀도",
    getValue: (p) => p.density ?? "-",
    highlight: "higher",
    toNumber: toNumericValue,
  },
  {
    id: "calorieDensity",
    label: "칼로리 밀도",
    getValue: (p) => p.calorieDensity ?? "-",
    highlight: "lower",
    toNumber: toNumericValue,
  },
  { id: "priceLinks", label: "구매 채널", getValue: () => "", highlight: null },
];

export function getCompareColumn(id: CompareColumnId): CompareColumnDef | undefined {
  return COMPARE_COLUMNS.find((c) => c.id === id);
}

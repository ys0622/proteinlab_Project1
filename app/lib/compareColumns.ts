import type { ProductDetailProps } from "../data/products";

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
  | "density"
  | "calorieDensity"
  | "priceLinks";

export interface CompareColumnDef {
  id: CompareColumnId;
  label: string;
  getValue: (p: ProductDetailProps) => string | number | undefined;
  /** higher is better → highlight max (공동 최고). lower is better → highlight min (최저/공동 최저). null = no highlight */
  highlight: "higher" | "lower" | null;
  /** parse value to number for comparison; default use as-is */
  toNumber?: (v: string | number | undefined) => number | null;
}

export const COMPARE_COLUMNS: CompareColumnDef[] = [
  { id: "brand", label: "브랜드", getValue: (p) => p.brand, highlight: null },
  { id: "manufacturer", label: "제조사", getValue: (p) => p.manufacturer ?? "—", highlight: null },
  {
    id: "package",
    label: "패키지",
    getValue: (p) => (p.tags?.length ? p.tags.join(", ") : p.variant ?? "—"),
    highlight: null,
  },
  { id: "capacity", label: "용량", getValue: (p) => p.capacity, highlight: null },
  { id: "proteinSource", label: "단백질 급원", getValue: (p) => p.proteinSource ?? "—", highlight: null },
  {
    id: "proteinPerServing",
    label: "단백질",
    getValue: (p) => (p.proteinPerServing != null ? `${p.proteinPerServing}g` : "—"),
    highlight: "higher",
    toNumber: (v) => (typeof v === "string" ? parseFloat(v.replace(/[^\d.]/g, "")) : typeof v === "number" ? v : null),
  },
  {
    id: "bcaa",
    label: "BCAA (mg)",
    getValue: (p) => p.bcaa ?? "—",
    highlight: "higher",
    toNumber: (v) => (typeof v === "string" ? parseFloat(v.replace(/[^\d.]/g, "")) : null),
  },
  {
    id: "calories",
    label: "칼로리",
    getValue: (p) => (p.calories != null ? `${p.calories}` : "—"),
    highlight: "lower",
    toNumber: (v) => (typeof v === "string" ? parseFloat(v.replace(/[^\d.]/g, "")) : typeof v === "number" ? v : null),
  },
  {
    id: "sugar",
    label: "당류",
    getValue: (p) => (p.sugar !== undefined ? `${p.sugar}g` : "—"),
    highlight: "lower",
    toNumber: (v) => (typeof v === "string" ? parseFloat(v.replace(/[^\d.]/g, "")) : typeof v === "number" ? v : null),
  },
  {
    id: "fat",
    label: "지방",
    getValue: (p) => (p.fat !== undefined ? `${p.fat}g` : "—"),
    highlight: "lower",
    toNumber: (v) => (typeof v === "string" ? parseFloat(v.replace(/[^\d.]/g, "")) : typeof v === "number" ? v : null),
  },
  {
    id: "sodium",
    label: "나트륨",
    getValue: (p) => (p.sodium !== undefined ? `${p.sodium}mg` : "—"),
    highlight: "lower",
    toNumber: (v) => (typeof v === "string" ? parseFloat(v.replace(/[^\d.]/g, "")) : typeof v === "number" ? v : null),
  },
  {
    id: "density",
    label: "단백질밀도",
    getValue: (p) => p.density ?? "—",
    highlight: "higher",
    toNumber: (v) => (typeof v === "string" ? parseFloat(v.replace(/[^\d.]/g, "")) : typeof v === "number" ? v : null),
  },
  {
    id: "calorieDensity",
    label: "칼로리밀도",
    getValue: (p) => p.calorieDensity ?? "—",
    highlight: "lower",
    toNumber: (v) => (typeof v === "string" ? parseFloat(v.replace(/[^\d.]/g, "")) : typeof v === "number" ? v : null),
  },
  { id: "priceLinks", label: "구매 링크", getValue: () => "", highlight: null },
];

export function getCompareColumn(id: CompareColumnId): CompareColumnDef | undefined {
  return COMPARE_COLUMNS.find((c) => c.id === id);
}

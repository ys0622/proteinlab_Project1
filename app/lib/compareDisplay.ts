import type { CompareColumnId } from "./compareColumns";

export function formatCompareDisplayValue(
  value: string | number | undefined,
  columnId: CompareColumnId,
) {
  if (value == null || value === "") return "-";
  if (typeof value === "number") return String(value);
  if (columnId === "bcaa" && /^[\d,.]+$/.test(value)) return `${value}mg`;
  return value;
}

export function normalizeCompareDisplayValue(value: string) {
  const trimmed = value.trim();
  if (trimmed === "-") return trimmed;

  const numericMatch = trimmed.match(/^(-?[\d,.]+)([a-zA-Z/%]+)?$/);
  if (!numericMatch) {
    return trimmed.replace(/\s+/g, " ");
  }

  const numericPart = numericMatch[1]?.replace(/,/g, "");
  const unitPart = numericMatch[2] ?? "";
  const parsed = Number(numericPart);

  if (!Number.isFinite(parsed)) {
    return trimmed.replace(/\s+/g, " ");
  }

  return `${parsed}${unitPart}`;
}

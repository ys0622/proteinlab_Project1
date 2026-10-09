import type { ProductDetailProps } from "../data/products";

// 요거트 대용량 통 제품(예: 800g)은 용기 전체 수치라 1회 기준 비교·순위에서 제외한다.
export const YOGURT_MAX_SINGLE_SERVING = 250;

export function isComparableServing(p: ProductDetailProps): boolean {
  if ((p.productType ?? "drink") !== "yogurt") return true;
  const size = Number(p.capacity?.match(/(\d+(?:\.\d+)?)/)?.[1]);
  return Number.isFinite(size) && size <= YOGURT_MAX_SINGLE_SERVING;
}

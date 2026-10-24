/**
 * 당류 표시 문자열. 라벨이 "1g 미만"처럼 숫자 하나로 적히지 않는 제품은 데이터의 sugarLabel을 그대로 쓴다
 * (sugar 숫자는 정렬·필터용 상한값, 2026-10-24 Scott 결정).
 */
export function formatSugar(product: { sugar?: number | null; sugarLabel?: string | null }): string | null {
  if (product.sugarLabel) return product.sugarLabel;
  return product.sugar != null ? `${product.sugar}g` : null;
}

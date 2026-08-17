/**
 * Some product `name` values already include the brand as a prefix
 * (e.g. name: "테이크핏 몬스터 (고소한맛)", brand: "테이크핏"). Concatenating
 * `${brand} ${name}` naively then reads "테이크핏 테이크핏 몬스터 (고소한맛)".
 * This normalizes that everywhere brand+name are combined into one label.
 */
export function formatProductLabel(brand: string, name: string): string {
  return name.startsWith(brand) ? name : `${brand} ${name}`;
}

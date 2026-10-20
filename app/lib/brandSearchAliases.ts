/**
 * 검색 사용자가 실제로 치는 브랜드 표기가 우리 표기와 다른 경우(2026-10-20 네이버 자동완성 확인).
 * "베어벨즈"로 표기하지만 네이버 자동완성은 전부 "베어벨스 프로틴바/프로틴/단백질"이다.
 * 검색 제목에만 "베어벨즈(베어벨스)"처럼 붙인다. 본문 표기는 그대로 둔다.
 */
export const BRAND_SEARCH_ALIASES: Record<string, string> = {
  베어벨즈: "베어벨스",
};

export function brandWithSearchAlias(brand: string): string {
  const alias = BRAND_SEARCH_ALIASES[brand];
  return alias ? `${brand}(${alias})` : brand;
}

/** label 안의 첫 브랜드 표기에 검색 표기를 붙인다. 브랜드가 없으면 그대로 돌려준다. */
export function labelWithSearchAlias(label: string, brand: string): string {
  const alias = BRAND_SEARCH_ALIASES[brand];
  if (!alias || !label.includes(brand)) return label;
  return label.replace(brand, `${brand}(${alias})`);
}

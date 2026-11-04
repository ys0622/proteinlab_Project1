// 상세 가이드가 같은 비교 의도를 더 충실하게 다루는 경우 그 URL을 대표로 둔다.
// 비대표 비교 URL은 사이트맵에서도 제외한다.
export const compareCanonicalOverrides: Record<string, string> = {
  "sellex-vs-hymune-drink": "https://proteinlab.kr/guides/product-selection-comparison/selex-vs-himune",
  "danbaek-vs-sellex-drink": "https://proteinlab.kr/guides/product-selection-comparison/danbaek-vs-selexs",
  "newcare-vs-sellex-drink": "https://proteinlab.kr/guides/product-selection-comparison/newcare-vs-sellex",
};

/** 비교 랜딩으로 가는 내부 링크 주소. 대표 주소를 가이드로 넘긴 비교는 그 가이드 경로를 준다(2026-10-23). */
export function compareLandingHref(slug: string): string {
  return compareCanonicalOverrides[slug]?.replace("https://proteinlab.kr", "") ?? `/compare/${slug}`;
}

// 네이버 노출 하락(10/29~) 재측정 기간에는 새 파우더 비교 6개를 검색에서 뺀다(2026-11-05 Scott, 11/7 판단).
// noindex·사이트맵 제외·내부 링크 제외. 기간이 끝나면 이 목록을 비운다.
export const compareNoindexSlugs = new Set<string>([
  "optimum-gold-standard-vs-dymatize-elite-whey",
  "optimum-hydrowhey-vs-dymatize-iso100",
  "selex-vs-hymune-protein-powder",
  "newyorkwhey-protein-powder-lineup-comparison",
  "selex-protein-powder-lineup-comparison",
  "optimum-nutrition-protein-powder-lineup-comparison",
]);

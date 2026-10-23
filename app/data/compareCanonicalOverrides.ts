// 상세 가이드가 같은 비교 의도를 더 충실하게 다루는 경우 그 URL을 대표로 둔다.
// 비대표 비교 URL은 사이트맵에서도 제외한다.
export const compareCanonicalOverrides: Record<string, string> = {
  "sellex-vs-hymune-drink": "https://proteinlab.kr/guides/product-selection-comparison/selex-vs-himune",
  "takefit-vs-hymune-drink": "https://proteinlab.kr/guides/product-selection-comparison/takefit-vs-himune",
  "danbaek-vs-sellex-drink": "https://proteinlab.kr/guides/product-selection-comparison/danbaek-vs-selexs",
  "newcare-vs-sellex-drink": "https://proteinlab.kr/guides/product-selection-comparison/newcare-vs-sellex",
};

/** 비교 랜딩으로 가는 내부 링크 주소. 대표 주소를 가이드로 넘긴 비교는 그 가이드 경로를 준다(2026-10-23). */
export function compareLandingHref(slug: string): string {
  return compareCanonicalOverrides[slug]?.replace("https://proteinlab.kr", "") ?? `/compare/${slug}`;
}

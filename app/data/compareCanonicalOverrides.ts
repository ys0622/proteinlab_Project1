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

// 네이버 노출 하락 원인 시험(2026-11-05 Scott "시험 시작", docs/weekly/2026-11-04-rebound.md 5장 2번):
// 10/29부터 노출이 크게 빠진 비교 페이지 10개만 10/28에 넣은 표 안 '구매' 줄을 빼고(10/27 상태) 나머지 비교 페이지와 7일 비교한다.
// 위쪽 카드·'비교 대상 제품'의 구매 버튼은 그대로 둔다. 11/12 판정 뒤 이 목록을 비우거나 전체에 적용한다.
export const compareBuyRowTestOffSlugs = new Set<string>([
  "greekday-vs-maeilbio-yogurt",
  "doctoru-vs-kirkland-bar",
  "takefit-max-vs-takefit-monster",
  "takefit-pro-500-vs-max-250",
  "labnosh-vs-flymill-shake",
  "doctoru-vs-benof-crunch-bar",
  "greek-yogurt-brand-compare",
  "flymill-vs-allthebetter-shake",
  "labnosh-vs-danbaekhani-shake",
  "sellex-vs-takefit",
]);

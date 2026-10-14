# 가이드 통합 후보안 (2026-10-14)

## 왜 하는가
- 구글 서치콘솔 기준 색인 1페이지(홈), 미색인 776개(발견됨 590, 크롤링됨 166). `/drinks` URL 검사 결과 크롤링·색인 허용·canonical은 정상이므로 기술 문제가 아니다.
- 비슷한 주제를 다룬 얇은 페이지가 많아 구글이 사이트 전체를 낮게 평가하는 것으로 추정한다(추정). 페이지 수를 줄이고 대표 페이지에 내용을 모은다.
- 네이버는 색인 660, 유입이 있다. **네이버 클릭 상위 10개 문서는 건드리지 않는다.**

## 원칙
1. 남기는 페이지(대표)는 더 길고 유입이 있는 쪽으로 정한다.
2. 흡수되는 페이지의 고유 내용(표·FAQ)은 대표 페이지로 옮기고, 흡수된 URL은 301로 대표 페이지에 넘긴다(`next.config.ts` `redirects`).
3. 사이트맵, 내부 링크, 가이드 허브 목록에서 흡수된 URL을 뺀다.
4. 실행 직전에 흡수 대상 URL마다 GA4 최근 90일 유입을 다시 확인하고, 유입이 있으면 대표로 바꾸거나 제외한다.
5. 수익 진입점(쿠팡 버튼·칩)은 대표 페이지에 그대로 둔다.

## 보호 목록 (네이버 클릭 상위 10, 2026-10-14 확인)
| 순위 | 문서 | 클릭 | 노출 |
|---|---|---|---|
| 1 | /compare/proteone-vs-itthefit-shake | 222 | 31,938 |
| 2 | /guides/basics/protein-source-types | 158 | 5,298 |
| 3 | /guides/product-selection-comparison/selex-vs-takefit-vs-himune | 97 | 14,292 |
| 4 | /guides/product-selection-comparison/newcare-vs-hymune | 74 | 11,145 |
| 5 | /compare/sellex-vs-takefit | 58 | 2,026 |
| 6 | /compare/takefit-max-vs-takefit-monster | 56 | 11,887 |
| 7 | /guides/product-selection-comparison/danbaek-vs-selexs | 53 | 502 |
| 8 | /guides/intake-strategy-health/protein-drink-empty-stomach | 51 | 1,505 |
| 9 | /compare/flymill-vs-allthebetter-shake | 44 | 3,042 |
| 10 | /guides/product-selection-comparison/protein-shake-calorie-ranking | 43 | 1,767 |

## A. 거의 같은 주제 — 통합 권장 (11묶음, 흡수 13개)
경로 앞의 `/guides/`는 생략한다. `psc` = `product-selection-comparison`, `ish` = `intake-strategy-health`, `fl` = `fitness-lifestyle`.

| # | 남길 페이지(대표) | 흡수할 페이지 → 301 | 근거 |
|---|---|---|---|
| A1 | running/race-week | fl/marathon-protein-guide | 제목이 "마라톤 레이스 주간 영양 전략"으로 같다 |
| A2 | running/basics | fl/running-protein-guide | 둘 다 러닝 단백질 필요량·타이밍 기본편 |
| A3 | basics/deficiency-symptoms | basics/protein-deficiency-self-check | 부족 신호와 자가체크는 같은 검색 의도 |
| A4 | psc/nutrition-criteria | psc/nutrition-comparison | "영양성분 기준" vs "영양성분 비교 보는 법" |
| A5 | psc/convenience-store-protein-guide | fl/convenience-store-workout-protein | 편의점 단백질 제품 추천이 중복 |
| A6 | ish/meal-replacement-strategy | ish/protein-drink-meal-replacement | 식사대용 단백질 기준이 중복 |
| A7 | psc/diet-protein-drink-guide | ish/diet-protein-drink-strategy | 다이어트 단백질 음료 기준이 중복 |
| A8 | psc/high-protein-40g-comparison | psc/high-protein-50g-comparison | 40g 이상 비교가 50g 이상을 포함 |
| A9 | psc/protein-bar-top10 | psc/protein-bar-guide | 바 선택 기준과 추천 순위가 같은 검색 의도 |
| A10 | psc/protein-yogurt-top5 | psc/protein-yogurt-guide, psc/protein-yogurt-ranking-guide | 요거트 추천·순위 보는 법이 3개로 나뉨 |
| A11 | psc/newcare-protein-water-guide | psc/newcare-water-vs-rtd | 뉴케어 워터 주제 중복 |

비교 랜딩 중복:
| # | 남길 페이지 | 흡수할 페이지 → 301 | 근거 |
|---|---|---|---|
| A12 | /compare/doctoru-vs-benof-bar | /compare/doctoru-vs-benof-softbar | 제목이 "닥터유 vs 베노프 소프트바 비교"로 사실상 같다 |

## B. 계절성·사이트 설명 페이지 — 통합 또는 noindex 검토 (6개)
| # | 페이지 | 제안 |
|---|---|---|
| B1 | fl/spring-diet-protein-guide | ish/weight-management-protein으로 301 |
| B2 | fl/spring-running-start-guide | running/basics로 301 |
| B3 | fl/spring-outdoor-protein-snack-guide | fl/commute-protein-guide 또는 noindex |
| B4 | psc/ranking-content | noindex(사이트 이용 안내라 검색 수요가 거의 없다고 추정) |
| B5 | psc/recommendation-lists | noindex(같은 이유) |
| B6 | ish/protein-drink-mainstream-shift | market-insights/protein-drink-trend-2026으로 301 |

## C. 뉴케어 묶음 — 사용자 판단 필요
뉴케어 관련 가이드가 9개다(allprotein, 41g-vs-25g, box-value, for-50s, low-sugar-guide, protein-water-guide, water-vs-rtd, plant-vs-lactosefree, newcare-vs-sellex). `newcare-vs-hymune`는 보호 목록이라 제외한다. 이 중 `newcare-41g-vs-25g`는 구글에서 "크롤링됨 - 색인 안 됨"이다.
- 제안: `newcare-41g-vs-25g`, `newcare-box-value`, `newcare-low-sugar-guide`를 `newcare-allprotein`(가장 긴 허브, 4,493자)에 흡수.
- 브랜드 검색이 많은 분야라 네이버 유입 확인 뒤 결정.

## 예상 효과와 위험
- 효과: 색인 대상 URL이 약 20개 줄고, 대표 페이지에 표·FAQ가 모여 길이가 늘어난다. 효과가 나타나는 데 몇 주가 걸릴 수 있다(추정).
- 위험: 흡수된 페이지에 네이버 유입이 있었다면 301 뒤 순위가 잠시 흔들릴 수 있다. 그래서 보호 목록을 두고 실행 직전에 GA4로 다시 확인한다.

## 진행 순서 (승인 후)
1. A묶음 흡수 대상 13개를 GA4 최근 90일 유입으로 확인한다.
2. 고유 표·FAQ를 대표 페이지로 옮긴다.
3. 301 추가, 사이트맵·허브·내부 링크를 정리한다.
4. 배포 후 301 응답, 대표 페이지 200, 상품 링크 수 회귀를 검사한다.
5. 2~4주 뒤 서치콘솔 색인 수를 다시 본다.

## 실행 결과 (2026-10-14, 배포 65abcffc)
- 실행 전 네이버 웹문서 클릭 상위 30을 다시 확인했다. A·B 흡수 대상은 30위 안에 없다(모두 클릭 17 미만).
- **A 진행(12건, A8 제외)**: A8 `high-protein-50g-comparison`은 62g·60g 초고함량 제품을 따로 다뤄 "50g" 검색 의도가 별도라고 보고 남겼다.
- 옮긴 내용: 식사대용 FAQ 2개, 다이어트 음료 FAQ 3개(FAQ 섹션·JSON-LD 신설), 요거트 순위 FAQ 1개, 뉴케어 워터 FAQ 3개, 단백질 부족 자가체크 체크리스트·점수 해석.
- **B 진행**: 301 3건(봄 다이어트 → 체중 관리, 봄 러닝 재시작 → 러닝 기본, 단백질 음료 대중화 → 2026 트렌드). noindex 3건(봄 야외 간식, 순위 보는 법, 추천·큐레이션 차이). 봄 야외 간식은 맞는 대표 페이지가 없어 301 대신 noindex로 했다.
- 검증: 15개 URL 모두 308 → 대표 페이지, 대표 페이지 13개 200·index, noindex 3개 확인, 사이트맵 728개 중 흡수·noindex URL 0개, 상품 링크 수 회귀 없음.
- 흡수된 페이지 파일은 아직 저장소에 남아 있다(폴더 삭제가 자동 권한 검사에 막힘). 리다이렉트가 먼저 처리돼 접근은 안 된다. 사용자가 원하면 나중에 지운다.
- **C(뉴케어)**: `newcare-41g-vs-25g`는 네이버 클릭 30(22위)이라 흡수 대상에서 뺀다. 나머지(box-value, low-sugar-guide) 흡수는 보류.

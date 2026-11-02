# 네이버 서치어드바이저 점검 — 2026-11-02 (데이터 최신일 11/1)

Aside로 `scripts/naver/search-weekly.aside.js`, `scripts/naver/url-query-30d.aside.js` 실행(읽기 전용).

## 주간 추이 (월~일, 7일 찬 주)
| 주 | 클릭 | 노출 | CTR |
|---|---|---|---|
| 8/10 (클릭 고점) | 731 | 84,230 | 0.87% |
| 9/21 (노출 고점) | 476 | 117,481 | 0.41% |
| 10/12 | 591 | 77,000 | 0.77% |
| 10/19 | 480 | 78,067 | 0.61% |
| 10/26 | 478 | 73,883 | 0.65% |

- 최근 주 클릭은 고점(731) 대비 **-35%**. 최근 30일 클릭 2,137(-19.7%), 노출 314,805(-25%), CTR 0.7%.
- 노출은 9월 말 고점 이후 7만대로 내려왔고 CTR도 8월(0.8%대)보다 낮다. 클릭 감소 = 노출 감소 + CTR 하락이 같이 온 것.

## 노출은 큰데 CTR이 낮은 주소 (고칠 1순위, 30일)
| 주소 | 클릭 | 노출 | CTR | 평균 순위 |
|---|---|---|---|---|
| /compare/proteone-vs-itthefit-shake | 155 | 32,273 | 0.5% | 4 |
| /g/protein-bar-top10 | 85 | 26,823 | 0.3% | 3.7 |
| /compare/greekday-vs-maeilbio-yogurt | 23 | 12,198 | 0.2% | 4 |
| /g/proteone-protein-shake | 13 | 10,066 | 0.1% | 3.9 |
| /compare/doctoru-vs-kirkland-bar | 16 | 7,767 | 0.2% | 5.8 |
| /g/newcare-allprotein | 11 | 7,635 | 0.1% | 2 |
| /compare/takefit-max-vs-takefit-monster | 15 | 6,877 | 0.2% | 4.2 |
| /brands/myprotein | 11 | 4,618 | 0.2% | 4 |

검색어 쪽: '프로티원 쉐이크' 노출 10,735·CTR 0.2%·순위 5, '프로티원' 9,782·0.5%·4, '단백질바' 3,040·0.3%·10, '매일 그릭요거트' 2,147·0.3%·6, '플라이밀 쉐이크' 1,947·0.2%·4.5. 브랜드명 단독 검색은 공식몰·쇼핑이 위에 있어 순위 4~5에서 CTR이 낮다(추정). 이 검색어들에 맞는 제목(브랜드 + "성분표·맛 비교")으로 바꾸는 것이 가장 빠른 클릭 지렛대.

## 잘 되는 것
- /guides/basics/protein-source-types(MPI) 클릭 274로 1위, 'mpi 단백질' CTR 27%. 11/2 식물성 vs 동물성 섹션 추가.
- 질문형 페이지는 순위 1에서 CTR이 높다: protein-50g-at-once 10.4%, protein-drink-weight-gain 9.5%, protein-drink-for-diabetes 10.4%, protein-drink-vs-powder 8.3%. 다만 노출이 200대라 노출을 키우는 것이 과제 → 질문 허브 확대 방향과 맞음.
- 비교 검색어('하이뮨 셀렉스 비교' 19.5%, '잇더핏 프로티원 비교' 22.6%)는 CTR이 높다.

## 제안 (operating-plan 백로그 후보)
1. 고노출·저CTR 8개 주소 제목·설명 재작성(브랜드명 + 성분표/맛/가격 비교 문구). 라이브 `<title>` 먼저 확인 후.
2. '단백질바'(순위 10) — protein-bar-top10 보강으로 1페이지 진입.
3. 질문 허브 2차는 그대로 진행. protein-drink-weight-gain은 순위 1·CTR 9.5%를 지키도록 제목에 '단백질 음료 살찌나요'를 남긴다.

## 11/2 제목 재작성 (같은 날 실행) — 효과 비교 기준
5개는 10/20에 '브랜드 + 성분·칼로리'로 이미 바꿨는데 최근 7일(10/26~11/1)에도 CTR이 낮아, 이번에는 답이 되는 숫자를 제목에 넣었다. 네이버 검색 결과에서 이 검색어들은 가격비교·스토어·클립·이미지가 위를 차지해 웹문서가 첫 화면에 보이지 않았다(Aside로 '프로티원 쉐이크'·'단백질바'·'뉴케어 올프로틴' 확인). 제목만으로 크게 오르지 않을 수 있다.

| 주소 | 7일 노출 | 7일 CTR | 새 제목 |
|---|---|---|---|
| /compare/proteone-vs-itthefit-shake | 5,254 | 0.1% | 프로티원 쉐이크 맛별 성분표 — 초코 23g·커피 108kcal, 5가지 맛·잇더핏 비교 |
| /g/protein-bar-top10 | 6,092 | 0.3% | 단백질바 추천 순위 TOP 10 (2026) \| 108개 중 단백질 15g↑·당류 8g↓만 골라 비교 |
| /compare/greekday-vs-maeilbio-yogurt | (상위 100 밖) | — | 매일 바이오 그릭요거트 vs 그릭데이 — 100g당 단백질 7.0g·11.4g 비교 |
| /compare/doctoru-vs-kirkland-bar | (상위 100 밖) | — | 커클랜드 프로틴바 vs 닥터유 단백질바 — 당류 1g·9g, 190·312kcal 비교 |
| /g/newcare-allprotein | 590 | 0.5% | 뉴케어 올프로틴 41g·25g 차이 — 210·135kcal, 식물성·워터까지 성분 비교 |
| /compare/takefit-max-vs-takefit-monster | 503 | 0.4% | 테이크핏 몬스터 vs 맥스 차이 — 단백질 45g·24g, 195·105kcal 비교 |

- /guides/product-selection-comparison/proteone-protein-shake는 이미 proteone-vs-itthefit로 리디렉트된다(별도 수정 없음).
- /brands/myprotein은 브랜드 공통 제목 틀이라 손대지 않았다(7일 CTR 1.4%로 나쁘지 않음).
- 판정: 11/16 이후 7일 CTR을 위 값과 비교(네이버 재수집 후).

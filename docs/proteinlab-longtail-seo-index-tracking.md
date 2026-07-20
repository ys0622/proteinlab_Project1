# ProteinLab Long-tail SEO Index Tracking

## 목적

단백질 음료 롱테일 페이지의 색인, 노출, 클릭 변화를 Search Console에서 추적하기 위한 운영 문서입니다. 임의 수치를 만들지 않고, 실제 Search Console 데이터가 확인되는 시점마다 기록합니다.

## 추적 주기

| 시점 | 확인 항목 | 판단 |
|---|---|---|
| 배포 직후 | URL 검사, 라이브 URL, canonical, sitemap 포함 여부 | 색인 요청 가능 상태인지 확인 |
| 3일 | 색인 여부, 크롤링 오류 | 오류가 있으면 URL별 원인 점검 |
| 7일 | 첫 노출 발생 여부, 평균 게재순위 | 색인됐지만 노출이 없으면 내부 링크와 제목 정합성 확인 |
| 14일 | 검색어 확장 여부, 노출 증가 추세 | 쿼리가 좁으면 본문 소제목 보강 후보로 표시 |
| 28일 | 클릭, CTR, 평균 게재순위 | 노출은 있는데 CTR이 낮으면 title/description 개선 |

## 우선 추적 URL

| 우선순위 | URL | 콘텐츠 유형 | 주 검색어 | 보조 검색어 | 색인 요청일 | 색인 상태 | 첫 노출일 | 7일 노출 | 7일 클릭 | 7일 평균순위 | 28일 노출 | 28일 클릭 | 28일 평균순위 | 다음 조치 |
|---|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|
| 1 | https://proteinlab.kr/guides/intake-strategy-health/protein-drink-diarrhea | 증상형 롱테일 | 단백질 음료 설사 | 단백질 음료 배탈, 단백질 음료 장 |  | UNKNOWN |  |  |  |  |  |  |  | 색인 후 7일 추적 |
| 2 | https://proteinlab.kr/guides/intake-strategy-health/protein-drink-weight-gain | 우려형 롱테일 | 단백질 음료 살찌나요 | 프로틴 음료 살, 단백질 음료 다이어트 |  | UNKNOWN |  |  |  |  |  |  |  | 색인 후 7일 추적 |
| 3 | https://proteinlab.kr/guides/intake-strategy-health/protein-drink-daily | 습관형 롱테일 | 단백질 음료 매일 | 프로틴 음료 매일, 단백질 음료 하루 |  | UNKNOWN |  |  |  |  |  |  |  | 색인 후 7일 추적 |
| 4 | https://proteinlab.kr/guides/intake-strategy-health/protein-drink-empty-stomach | 상황형 롱테일 | 공복 단백질 음료 | 아침 공복 단백질, 공복 프로틴 음료 |  | UNKNOWN |  |  |  |  |  |  |  | 색인 후 7일 추적 |
| 5 | https://proteinlab.kr/guides/intake-strategy-health/protein-drink-sugar | 기준형 롱테일 | 단백질 음료 당류 | 저당 단백질 음료, 프로틴 음료 당 |  | UNKNOWN |  |  |  |  |  |  |  | 색인 후 7일 추적 |
| 6 | https://proteinlab.kr/guides/intake-strategy-health | 허브 | 단백질 섭취 전략 | 단백질 음료 가이드 |  | UNKNOWN |  |  |  |  |  |  |  | 신규 하위 페이지 발견 유도 |
| 7 | https://proteinlab.kr/topics | 허브 | 단백질 음료 주제 | 프로틴랩 주제 |  | UNKNOWN |  |  |  |  |  |  |  | 신규 토픽 발견 유도 |
| 8 | https://proteinlab.kr/guides | 허브 | 단백질 가이드 | 프로틴 음료 가이드 |  | UNKNOWN |  |  |  |  |  |  |  | 크롤링 경로 보강 확인 |
| 9 | https://proteinlab.kr/guides/product-selection-comparison/newcare-allprotein | 제품 상업 페이지 | 뉴케어 올프로틴 | 뉴케어 올프로틴 국제 미각상 |  | UNKNOWN |  |  |  |  |  |  |  | 브랜드 쿼리 노출 추적 |
| 10 | https://proteinlab.kr/guides/product-selection-comparison/protein-drink-top10 | 제품 탐색 페이지 | 단백질 음료 추천 | 프로틴 음료 순위 |  | UNKNOWN |  |  |  |  |  |  |  | 상업 쿼리 기준선 추적 |

## Search Console 확인 방법

1. URL 검사에서 위 URL을 하나씩 입력합니다.
2. `Google 색인에서 가져오기`와 `라이브 URL 테스트` 결과를 구분해서 기록합니다.
3. canonical이 자기 자신인지 확인합니다.
4. sitemap에 포함되어 있는지 확인합니다.
5. 색인 요청이 거부되면 배포 URL에서 200 응답, robots, noindex, canonical을 먼저 확인합니다.

## 판단 규칙

| 상황 | 기준 | 조치 |
|---|---|---|
| 색인 거부 | 배포 후에도 라이브 URL 테스트 실패 | 200 응답, sitemap, canonical, robots 재점검 |
| 색인됐지만 7일 노출 0 | Search Console에서 페이지 노출 없음 | 허브와 관련 강한 페이지에서 내부 링크 추가 |
| 14일 노출 10 미만 | 색인됐지만 쿼리 확장 부족 | 제목, H2, 첫 문단의 검색어 정합성 보강 |
| 28일 노출 100 이상, CTR 1% 미만 | 검색 결과에서 클릭 유도 부족 | title/description 개선 후보 |
| 평균순위 20위 밖 | 주제 권위 부족 | 관련 콘텐츠 묶음 추가 및 제품 상세 연결 강화 |

## 이번 보강에서 확인된 주의 사항

- `high-protein-side-effects`와 `morning-protein-drink` 파일은 기존 한글 깨짐이 확인되어 이번 내부 링크 보강 대상에서 제외했습니다.
- 해당 파일은 별도 인코딩 복구 작업 후 내부 링크를 추가하는 편이 안전합니다.
- Search Console 수치는 실제 확인 전까지 UNKNOWN으로 유지합니다.

# 전환·수익 2주 집중 기준선 (2026-10-28)

11/8·11/15 주간 점검에서 이 숫자와 비교한다. 계획은 `docs/operating-plan.md` '2주 집중' 표.

## 쿠팡 (파트너스 API, 계정 전체 — 케어맵·SNS 포함)
| 주(월) | 클릭 | 주문 | 수익(원) |
|---|---|---|---|
| 8/3~8/24 평균 | 약 170 | 약 40 | 약 34,000 |
| 9/7~10/19 평균 | 약 130 | 약 20 | 약 16,000 |
| 10/21~27 subId별 | 빈값 58 · caremap7028 32 | 빈값 8 · caremap7028 13 | 빈값 2,407 · caremap7028 10,062 |

- 10/28에 채널 아이디 proteinlab·threadsliving·instaseason 등록. 그 전 프로틴랩 사이트 클릭은 빈값에 섞여 있다.
- 다시 뽑기: `D:\쓰레드 쿠파스 자동화`에서 `CoupangClient().report('clicks'|'orders', 시작, 끝)`를 subId별로 합산.

## 사이트 (GA4, 운영실 KPI)
- 쿠팡 클릭(affiliate_click) 주 30~50, 목표 58. 쿠팡을 누른 사용자 비율 3.4~4.7%, 목표 5.5%.
- 주간 사용자 540~830.

## 네이버 검색 (서치어드바이저, 최근 30일, 10/28 조회)
- 클릭 2,181(직전 30일 대비 -18.6%), 노출 336,987, CTR 0.6%.
- 노출 많고 CTR 낮은 페이지: proteone-vs-itthefit-shake 36.8천·0.5%·4.1위, protein-bar-top10 31.5천·0.3%·3.7위, greekday-vs-maeilbio-yogurt 14.9천·0.2%·5.1위, takefit-max-vs-takefit-monster 10.8천·0.3%·4.2위, doctoru-vs-kirkland-bar 10.4천·0.2%·5.7위, newcare-allprotein 7.9천·0.1%·4.3위, takefit-pro-500-vs-max-250 6.5천·0.2%·3.1위.
- 클릭 상위: protein-source-types 254, proteone-vs-itthefit-shake 197, protein-bar-top10 87, protein-shake-top7 76, selex-vs-takefit-vs-himune 59.
- 다시 뽑기: Aside 로그인 상태에서 `aside repl "$(cat scripts/naver/url-query-30d.aside.js)"`(URL·검색어 상위 60).

## 10/28 바꾼 것
- fbfa043: 비교 가이드 45개 구매 버튼(비교표 아래·추천 항목별), 첫 화면 사진 즉시 로딩, Codex 보강 15페이지.
- 41f0deb: 위 표의 greekday·doctoru-kirkland·takefit-pro 설명문을 수치 중심으로.

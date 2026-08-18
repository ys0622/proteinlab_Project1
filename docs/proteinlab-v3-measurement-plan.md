# ProteinLab v3 출시 후 성과측정 기준

기준일: 2026-07-15

## 1. 데이터 역할과 해석 원칙

| 데이터 소스 | 측정 대상 | 해석 시 주의 |
|---|---|---|
| GA4 | 사이트 내 탐색, 페이지 조회, 내부 CTA, 외부 링크 클릭 | 외부 링크 클릭은 주문이나 수익을 뜻하지 않음 |
| 쿠팡파트너스 | 쿠팡이 인정한 클릭, 주문, 주문금액, 수익 | 쿠팡 정책, 취소, 반품, 집계 지연에 따라 GA4 클릭과 일치하지 않을 수 있음 |

- GA4 `affiliate_click`과 쿠팡파트너스 인정 클릭을 1:1로 매칭하거나 동일 KPI로 합산하지 않는다.
- GA4는 전환 경로와 CTA 효율을, 쿠팡파트너스는 실제 제휴 성과를 평가한다.
- 현 시점에는 ProteinLab 전용 ACTIVE 링크가 0개이므로 `affiliate_click`, 쿠팡 채널 ID별 성과, 제휴 수익은 기준선으로 사용할 수 없다.
- 기존 공용 구매처 클릭은 `retailer_click`이며, `affiliate_click` 성과와 섞지 않는다.

## 2. 이벤트와 차원 기준

코드상 표준 이벤트 명세는 `docs/ga4-event-specification.md`를 따른다. 이 문서에서 사용하는 구매 CTA 이벤트는 `affiliate_click`과 `retailer_click`뿐이며, 레거시 문서의 `purchase_click`은 보고서에 사용하지 않는다.

| 이벤트 | 보고서 용도 | 필수 분류 |
|---|---|---|
| `page_view` | 유입, 랜딩페이지, 참여 분석 | `page_path`, `page_type` |
| `internal_cta_click` | 콘텐츠/CTA에서 내부 이동 분석 | `content_id`, `link_position`, `destination_url` |
| `product_card_click` | 목록/추천/랭킹에서 상세 이동 분석 | `product_id`, `product_category`, `link_position` |
| `product_detail_view` | 제품 상세 모수 | `product_id`, `product_brand`, `product_category` |
| `compare_add` | 비교 진입 의도 | `product_id`, `compare_count` |
| `compare_view` | 실제 비교 결과 사용 | `compare_count`, `link_position=comparison_result` |
| `recommend_start` / `recommend_complete` | 추천 기능 시작과 결과 도달 | `product_category`, `content_id` |
| `affiliate_click` | 검증된 전용 제휴 링크 클릭만 | `product_id`, `retailer`, `affiliate_link_id`, `link_position` |
| `retailer_click` | 비제휴/레거시 구매처 링크 클릭 | `product_id`, `retailer`, `link_position` |

모든 GA4 보고서는 기본 필터 `site_name = proteinlab`을 적용한다. `affiliate_click` 보고서는 `affiliate_link_id`가 비어 있는 행을 제외하고, ACTIVE 전용 링크가 배포된 날짜 이후만 해석한다.

## 3. 측정 일정

| 시점 | 확인 항목 | 조치 기준 |
|---|---|---|
| 출시 후 24시간 | `page_view`, `product_detail_view`, `compare_view`, `affiliate_click`, 링크/페이지/콘솔 오류 | 이벤트 누락, 중복, 404, 잘못된 링크가 있으면 즉시 롤백 또는 수정 |
| 출시 후 7일 | 랜딩페이지 `(not set)`, 이벤트 누락, 상위 콘텐츠 CTA, 상세 이동, 상세→구매처, 위치·기기 차이 | `(not set)` 5% 초과 또는 주요 이벤트 누락이면 원인 조사 |
| 출시 후 28일 | 핵심 KPI, 페이지/제품/CTA별 전환, 쿠팡 수익 | 다음 개선 우선순위 결정 |
| 출시 후 8주 | 첫 28일 대비 개선 지속성, 채널/제품 편차 | 저성과 영역의 수정 또는 중단 결정 |
| 출시 후 12주 | v3 기준선 대비 성장, 수익·전환 안정성 | 다음 분기 목표와 투자 우선순위 결정 |

## 4. 28일 핵심 KPI

### GA4

| KPI | 정의 | 분해 기준 |
|---|---|---|
| 사용자 / 신규 사용자 / 재방문자 | GA4 표준 사용자 지표 | 채널, 기기, 랜딩페이지 |
| Organic 사용자 | 기본 채널 그룹이 Organic Search인 사용자 | 랜딩페이지, 기기 |
| 세션 / 사용자당 조회수 / 평균 참여 시간 / 참여율 | GA4 표준 참여 지표 | 전체, Organic, 페이지 유형 |
| 콘텐츠→제품 상세 클릭률 | 콘텐츠 사용자 중 제품 상세로 내부 이동한 사용자 비율 | `content_id`, `link_position`, 목적지 제품 |
| 제품 상세→제휴 클릭률 | 제품 상세 사용자 중 `affiliate_click` 사용자의 비율 | `product_id`, `retailer`, `link_position` |
| 비교 조회 사용자 / 비교 후 제휴 클릭률 | `compare_view` 사용자 및 이후 `affiliate_click` 사용자 | 비교 제품 조합, 비교 결과 위치 |
| 추천 완료 사용자 | `recommend_complete` 사용자 | 제품 형태, 우선 조건 |
| 제품별 / 위치별 제휴 클릭 | `affiliate_click` 사용자와 이벤트 수 | `product_id`, `affiliate_link_id`, `link_position` |

### 쿠팡파트너스

| KPI | 정의 | 분해 기준 |
|---|---|---|
| ProteinLab 전용 인정 클릭 | 쿠팡파트너스가 ProteinLab 채널로 인정한 클릭 | 채널 ID, 링크 ID |
| 구매 건수 | 인정 주문 중 구매 건수 | 링크 ID, 제품/캠페인 단위로 제공되는 범위 |
| 주문금액 / 수익 | 쿠팡 리포트의 인정 주문금액 및 수익 | 채널 ID, 링크 ID |
| 클릭당 수익 | 쿠팡 수익 ÷ 쿠팡 인정 클릭 | 채널 ID, 링크 ID |
| 인정 주문 전환율 | 인정 구매 건수 ÷ 쿠팡 인정 클릭 | 채널 ID, 링크 ID |

## 5. 계산식

분자는 가능하면 이벤트 수가 아닌 **중복 제거된 사용자 수**를 사용한다. 비교 전환처럼 순서가 필요한 지표는 GA4 탐색의 사용자 경로 또는 BigQuery 내보내기로 순서를 확인한다.

| 지표 | 계산식 |
|---|---|
| 콘텐츠→제품 상세 클릭률 | 콘텐츠에서 제품 상세로 이동한 사용자 ÷ 콘텐츠 사용자 |
| 제품 상세→제휴 클릭률 | 제품 상세에서 `affiliate_click`을 발생시킨 사용자 ÷ 제품 상세 사용자 |
| 비교 후 제휴 클릭률 | 비교 결과에서 `affiliate_click`을 발생시킨 사용자 ÷ `compare_view` 사용자 |
| 구매처 클릭 사용자율 | `affiliate_click` 사용자 ÷ 전체 사용자 |
| 클릭당 수익 | 쿠팡 수익 ÷ 쿠팡 인정 클릭 |
| 인정 주문 전환율 | 쿠팡 인정 구매 건수 ÷ 쿠팡 인정 클릭 |

분모가 30명 미만인 행은 방향성 참고로만 보고, 순위 결정에는 사용하지 않는다.

## 6. 목표값

| 지표 | 4주 목표 | 12주 목표 |
|---|---:|---:|
| 랜딩페이지 `(not set)` 비중 | 5% 이하 | 5% 이하 유지 |
| 평균 참여 시간 | 35초 이상 | 35초 이상 유지 |
| 사용자당 조회수 | 1.8 이상 | 2.0 이상 |
| 참여율 | 50% 이상 | 55% 수준 |
| 구매처 클릭 사용자율 | 3% 이상 | 4~5% |
| 콘텐츠→제품 상세 클릭률 | 7% 이상 | 10% 이상 |
| 제품 상세→구매처 클릭률 | 7% 이상 | 10% 이상 |
| 비교 평균 참여 시간 | 30초 이상 | 30초 이상 유지 |
| ProteinLab 제휴 수익 | 기준선 설정 후 추적 | v3 기준선 대비 1.5배 이상 |

목표의 “구매처 클릭”은 ACTIVE 전용 링크 적용 전에는 `affiliate_click` 목표로 판정하지 않는다. 기존 `retailer_click`은 탐색 보조지표로만 별도 기록한다.

## 7. 기준선 설정 규칙

1. v3 이전에 ProteinLab과 CareMap 수익이 분리된 신뢰 가능한 28일 데이터가 있으면 그 기간을 수익 기준선으로 사용한다.
2. 수익 기준선이 분리되지 않았다면, ACTIVE 전용 링크 배포와 GA4 DebugView 검증이 끝난 뒤의 **첫 완전한 28일**을 v3 제휴 기준선으로 사용한다.
3. GA4 행동 기준선은 v3 배포일 이전 28일과 이후 28일을 동일 채널(Organic Search), 동일 기기 분포, 동일 페이지 집합으로 비교한다.
4. 계절성, 검색 순위, 캠페인, 제품 등록 수 변화가 큰 경우 주석을 남기고 단순 증감만으로 성공 여부를 판단하지 않는다.

## 8. 대시보드 명세

| 보고서 | 기본 기간 | 핵심 지표 | 필수 분해 |
|---|---|---|---|
| 전체 퍼널 | 28일 | 사용자, 상세 사용자, 비교 사용자, 제휴 클릭 사용자 | 채널, 기기 |
| Organic 랜딩페이지 | 28일 | Organic 사용자, 참여율, 상세 클릭률, 제휴 클릭률 | 랜딩 경로, 콘텐츠 유형 |
| 콘텐츠별 전환 | 28일 | CTA 클릭, 상세 이동, 비교 이동 | `content_id`, `link_position` |
| 제품 상세별 전환 | 28일 | 상세 사용자, 비교 추가, 제휴 클릭 | `product_id`, 브랜드, 카테고리 |
| 제품별 affiliate_click | 28일 | 사용자, 이벤트 수, 클릭률 | `product_id`, `affiliate_link_id`, retailer |
| 위치별 전환 | 28일 | 제휴 클릭 사용자, 클릭률 | `link_position`, 페이지 유형, 기기 |
| 비교 기능 성과 | 28일 | `compare_add`, `compare_view`, 비교 후 제휴 클릭 | 제품 조합, 비교 개수 |
| 추천 기능 성과 | 28일 | 시작, 완료, 결과 상세 클릭, 결과 구매처 클릭 | 카테고리, 우선 조건 |
| 쿠팡 링크 ID별 실적 | 28일 | 인정 클릭, 주문, 주문금액, 수익, 클릭당 수익 | 쿠팡 채널 ID, 링크 ID |
| GA4와 쿠팡 월간 비교 | 월간 | GA4 제휴 클릭, 쿠팡 인정 클릭/주문/수익 | 기간, ProteinLab 채널 ID |

GA4와 쿠팡 월간 비교 표에는 차이율을 표시할 수 있으나, 차이를 오류로 단정하지 않는다. 클릭 인정 방식, 브라우저 차단, 집계 지연, 취소·반품이 서로 다르기 때문이다.

## 9. GA4 관리자 설정

- 주요 이벤트 후보: `affiliate_click`, `compare_view`, `recommend_complete`
- 맞춤 측정기준 후보: `site_name`, `product_id`, `product_brand`, `product_category`, `retailer`, `affiliate_link_id`, `link_position`, `content_id`, `compare_count`
- 보고서 생성 전 DebugView에서 실제 이벤트와 파라미터를 확인하고, 맞춤 측정기준 처리 시간을 고려한다.

## 10. 데이터 한계

- GA4의 외부 클릭은 쿠팡 주문·수익을 보장하지 않는다.
- 쿠팡 리포트가 제품 링크 ID 수준으로 제공되지 않는 경우 제품별 수익을 추정하지 않는다.
- 쿠키 동의, 광고 차단, 브라우저 정책, 네트워크 실패로 GA4 이벤트가 누락될 수 있다.
- 현재 ACTIVE 전용 링크가 없으므로 제휴 KPI는 배포 전 문서 기준이며 실제 성과값은 아직 없음으로 표시한다.

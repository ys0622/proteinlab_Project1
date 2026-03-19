# Shake Purchase Link Checklist

쉐이크 구매 링크는 아래 순서로 확인합니다.

1. `slug` 기준으로 제품을 먼저 확정합니다.
2. 쿠팡은 실제 파트너스 링크만 입력합니다.
3. 네이버는 해당 제품 상세 또는 쇼핑 검색 링크를 입력합니다.
4. 공식몰은 브랜드 공식 판매 페이지가 있을 때만 입력합니다.
5. 링크가 없으면 빈 칸으로 두고 추후 확인합니다.

입력 템플릿:
- [shake-purchase-links-template.csv](/D:/proteinlab/docs/shake-purchase-links-template.csv)

필드 설명:
- `slug`: 제품 고유 식별자
- `coupangUrl`: 쿠팡 파트너스 링크
- `naverUrl`: 네이버쇼핑 또는 네이버 검색 링크
- `officialUrl`: 공식몰 상세 페이지 링크

주의:
- 임의 추정 링크는 넣지 않습니다.
- 리디렉션이 불안정한 링크보다 최종 도착 URL을 우선합니다.
- 세 링크가 모두 없으면 앱에서는 `링크 준비중` 상태로 노출됩니다.

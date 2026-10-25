# 브라우저·계정 배치 (2026-10-25 Scott 결정)

- **웨일**: Scott 개인용. 자동화·Claude 작업에 쓰지 않는다.
- **크롬**: 작업용. 프로필마다 맡은 계정만 로그인한다.
- **Aside**: 네이버 서치어드바이저 전용(크롬으로 안 되는 것만 Aside).

| 브라우저 | 계정 | 쓰는 곳 |
|---|---|---|
| 크롬1 | 프로틴랩 블로그(네이버 ys0622), 쓰레드 @proteinlab_2026 | 프로틴랩 블로그·쓰레드 수동 작업 |
| 크롬2 | 케어맵 블로그(네이버 shamet), 쓰레드 @caremap1 | 케어맵 블로그·쓰레드 수동 작업 |
| 크롬3 | 오늘의 정보픽 블로그(네이버 yongsama86), 쓰레드 @yslee7028 | 정보픽 블로그·육아 쓰레드 |
| 크롬4 | 인스타 | 인스타 |
| 크롬5(제안) | 구글 ys7028@gmail.com(GA4·서치콘솔·애드센스), 쿠팡파트너스 | 세 사이트 분석·수익 확인(Claude in Chrome) |
| Aside | 네이버 ys0622 | 서치어드바이저: 수집 요청(`scripts/naver/crawl-daily.mjs`), 주간 지표(`search-weekly.aside.js`) |

## 자동화 전용 크롬 프로필 (`D:\browser-profiles\`)
사람이 쓰는 크롬과 별개로, 스크립트가 `scripts/browser/chrome-repl.mjs --profile <이름>`으로 띄운다(화면 밖 창, `.lock`으로 동시 사용 방지).

| 프로필 | 로그인 | 쓰는 곳 |
|---|---|---|
| `work-nologin` | 없음 | 골드박스 수집(`scripts/goldbox/daily-goldbox.mjs`, 실패 시 Aside) |

새 자동화도 이 방식으로 만들고, 로그인이 필요하면 Scott이 `node scripts/browser/login.mjs <프로필> <주소>`로 직접 로그인한다.

## 다른 프로젝트
- 블로그 발행(blogpilot): `D:\네이버 블로그 자동화\profiles\{yongsama86,ys0622,shamet}` — 발행 전용 Playwright 프로필(블로그 세션 담당).
- 쓰레드 발행(threadpilot): 공식 API 토큰으로 올린다(브라우저 불필요).
- Claude 내장 브라우저에는 계정을 로그인하지 않는다(사이트 화면 확인 전용).

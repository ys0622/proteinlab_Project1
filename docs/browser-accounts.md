# 브라우저·계정 배치 (2026-10-25 Scott 결정)

- **웨일**: Scott 개인용. 자동화·Claude 작업에 쓰지 않는다.
- **크롬**: 모든 작업용. 계정 하나 = 프로필 하나. 한 프로필에서 다른 계정으로 로그인하지 않는다.
- **Aside**: 백업. 크롬이 실패하거나 로그인이 풀렸을 때만 같은 스크립트를 `aside repl`로 돌린다.

## 자동화용 크롬 프로필 (`D:\browser-profiles\`, 목록 `D:\browser-profiles\accounts.json`)
스크립트가 `scripts/browser/chrome-repl.mjs --profile <이름>`으로 크롬을 직접 띄운다(Playwright, 화면 밖 창). 평소 쓰는 크롬 창과 섞이지 않는다. 같은 프로필을 두 작업이 동시에 열지 않게 `.lock`으로 막는다.

| 프로필 | 로그인 | 쓰는 곳 |
|---|---|---|
| `work-nologin` | 없음 | 골드박스 수집(`scripts/goldbox/daily-goldbox.mjs`) |
| `naver-ys0622` | 네이버 ys0622 | 네이버 수집 요청(`scripts/naver/crawl-daily.mjs`), 서치어드바이저 주간 지표(`search-weekly.aside.js`) |

로그인(Scott이 직접, 처음 한 번과 풀렸을 때):
```
node scripts/browser/login.mjs naver-ys0622 https://nid.naver.com/nidlogin.login
```
창에서 로그인하고 닫으면 끝. 결과 파일 `.naver-crawl/latest.txt`의 `브라우저:` 줄이 `Aside(백업)`이면 크롬 로그인이 풀린 것이다.

## 대화형 작업용 크롬 (평소 크롬, Claude in Chrome 확장)
GA4처럼 Claude가 화면을 보며 하는 일. 프로필 이름을 계정명으로 바꿔 둔다(Scott, 크롬 오른쪽 위 프로필 → 이름 수정).

| 지금 이름(폴더) | 실제 계정 | 바꿀 이름 |
|---|---|---|
| 사용자 이름 1 (Default) | 인스타 | `IG-계정명` |
| 사용자 이름 2 (Profile Proteinlab) | 쓰레드 @yslee7028 | `TH-yslee7028` |
| 내 Chrome (Profile Caremap) | 쓰레드 @caremap1 | `TH-caremap1` |
| 2 (Profile 3) | 확인 필요 | — |
| (새로 만들기) | 쓰레드 @proteinlab_2026 (지금 Claude 내장 브라우저에 로그인) | `TH-proteinlab_2026` |

Claude 내장 브라우저에는 계정을 로그인하지 않는다(사이트 화면 확인 전용).

## 다른 프로젝트
- 블로그 발행(blogpilot): `D:\네이버 블로그 자동화\profiles\{yongsama86,ys0622,shamet}` — 이미 계정별로 나뉘어 있다. 블로그 세션 담당.
- 쓰레드 발행(threadpilot): 공식 API 토큰으로 올린다(브라우저 불필요).

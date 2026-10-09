# ProteinLab 운영 지침

proteinlab.kr — 단백질 음료·바·요거트·쉐이크 제품 비교 서비스. 이 문서는 이 저장소에서 일하는 Claude가 매번 읽는다. 검증된 사실만 적는다.
작업 이력과 진단 결과는 `.claude/team-brief.md`, 사용자 결정 대기 목록은 `docs/owner-confirm-list.md`를 본다.

## 구조
- Next.js 16 App Router, TypeScript, Cloudflare Workers(OpenNext), Windows에서 개발·배포. 빌드는 `next build --webpack`.
- 제품 데이터: `app/data/{drink,bar,shake,yogurt}ProductsData.json` (음료 135, 바 100, 쉐이크 112, 요거트 57). 이미지 매핑은 `slugTo*Image.json`, 성분표 원본 이미지는 `public/*-spec/`.
- 가이드는 대부분 `app/guides/**`에 있고, 비교 가이드는 `app/guides/product-selection-comparison/*Content.ts`의 config를 공통 템플릿이 렌더링한다. 비교 랜딩은 `app/data/compareLandings.ts`.
- 쿠팡 골드박스: `/goldbox`, 상태 확인 `/api/goldbox/health`, 로직은 `app/lib/coupangGoldbox.ts`, 갱신 워크플로우 `.github/workflows/goldbox-refresh.yml`.
- 신규 쉐이크 등록은 `scripts/add-shake.mjs`(사진·성분표를 `inbox/shake/`에 넣고 실행). 다른 카테고리용 스크립트는 없다.

## 배포
1. `npx tsc --noEmit -p .` 와 `npx eslint <바꾼 파일>`
2. 로컬 서버가 떠 있으면 먼저 종료한다(`.open-next`가 잠겨 삭제가 실패한다).
3. `rm -rf .open-next` 후 `npm run deploy`를 백그라운드로 실행하고 로그에서 `Current Version ID`를 확인한다. `predeploy`가 `check:assets`를 먼저 돌린다.
4. 라이브 URL을 curl로 확인한다(전파 지연으로 직후 404가 나면 한 번 재시도).
5. `git push origin master`. push하면 `.github/workflows/deploy.yml`이 같은 커밋을 **CI에서 새로 빌드해 다시 배포한다. 로컬 빌드를 덮어쓴다.** CI에는 `.env.local`이 없으므로 워크플로의 `write-public-env.mjs` 단계가 `wrangler.jsonc`의 `NEXT_PUBLIC_*`를 `.env.production`으로 내보낸다. 이 단계가 빠지면 GA4 직접 전송 이벤트와 애드센스가 번들에서 조용히 사라진다(2026-10-06~10-09에 실제로 발생). `predeploy`의 `check-build-env.mjs`가 값이 비면 배포를 막는다. push 후 CI 재배포가 끝나면 라이브 제품 페이지에서 `window.dataLayer`에 `page_view`, `product_detail_view`가 쌓이는지 확인한다. 배포하면 push까지 같이 한다.
- 커밋은 파일을 하나씩 지정해서 `git add` 한다(`git add -A` 금지). 작업 트리에 내가 만들지 않은 변경(`.claude/settings.local.json`, `app/official-events/EventsClient.tsx`, `public/products.json`, `app/sitemap.ts`의 날짜 변경 등)이 있을 수 있다.
- 커밋 전에 `git fetch origin master`로 어긋남을 확인한다.

## 배포 후 회귀 검사 (이 사이트에서 실제로 터진 것)
- `/drinks /bars /shake /yogurt /products`는 서버 렌더링 HTML에 상품 링크가 전부 있어야 한다: `grep -o 'href="/product/[a-zA-Z0-9-]*"' | sort -u | wc -l` 이 135/100/112/57과 비슷해야 한다(과거에 정적 빌드가 Suspense fallback으로 빈 목록을 내보냈다). 이 페이지들은 `force-dynamic`이어야 한다.
- 개발 서버(`next dev`)는 이 문제를 숨긴다. 프로덕션 빌드와 라이브 응답으로 확인한다.
- robots 메타 `index, follow`, canonical 자기 참조, `/robots.txt`, `og:image` 존재.
- 쿠팡 링크에 `rel="sponsored"`가 있다.

## 쿠팡·수익 규칙
- 제품의 `coupangUrl`은 (a) `link.coupang.com/a/...` 단축 링크(그대로 사용) 또는 (b) 쿠팡 상품 페이지 URL(`/api/out/coupang`이 딥링크로 변환)이다.
- `link.coupang.com/a/gaIdNRGs2u`는 쿠팡 **홈**으로 가는 공용 폴백이다. 현재 15개 제품(모두 단종 확인)이 이 링크를 쓴다. 실제 구매 링크가 아니다.
- 링크를 지어내지 않는다. 쿠팡에 없는 제품은 링크 없이 둔다. 검색 URL은 수익이 나지 않는다.
- **구매 버튼 같은 수익 진입점은 개편하면서 빼지 않는다.**
- 쿠팡파트너스 계정은 케어맵과 공용이다. 쿠팡 보고서 수치는 사이트별로 분리되지 않는다. GA4는 계정(`proteinlab`)만 같고 **속성은 분리**돼 있다(프로틴랩 526849422, 케어맵 531248967, 키즈픽 533061815). 프로틴랩 데이터는 반드시 `proteinlab` 속성에서 본다.
- 코드는 딥링크 변환 시 `subId=proteinlab`을 붙인다(`NEXT_PUBLIC_COUPANG_PARTNERS_SUB_ID`). 이미 만들어진 `link.coupang.com/a/...` 단축 링크의 subId는 쿠팡파트너스에서 만들 때 정해져 있어 미검증이다.
- 골드박스 API는 두 사이트가 같은 키를 쓰므로 호출량 한도를 공유한다. 케어맵과 코드를 합치지 않는다.

## 일하는 원칙
1. **수치·주장은 라벨이나 원문으로 검증한다.** 성분표 이미지가 수치의 1차 근거다. 근거 없는 효능 표현, 출처 없는 통계·순위는 쓰지 않는다. 불확실하면 "추정"이라고 쓴다.
2. **데이터를 먼저 확인하고 원인을 말한다.** 라이브 `<title>`·응답을 curl로 보기 전에는 "제목 문제" 같은 결론을 내지 않는다.
3. **화면 디자인 변경은 미리보기를 보여주고 승인받은 뒤 배포한다.** "분석해줘/제안해줘"는 구현하지 않는다. 사용자가 "진행해줘"라고 한 SEO·콘텐츠·데이터 수정은 바로 진행해도 된다. 특가 만료처럼 시간 제약이 있을 때만 먼저 배포하고 사후 보고한다.
4. **사용자가 결정할 것은 `docs/owner-confirm-list.md` 한 파일에 모은다.** 같은 질문을 반복하지 않는다.
5. **외부로 나가는 작업은 허용된 범위만 한다.** 키·토큰·시크릿 값을 파일이나 설정에 입력하지 않는다. 사용자가 터미널에서 `wrangler secret put`으로 직접 넣는다. 외부 서비스로 URL을 제출하는 일(IndexNow 등)은 먼저 확인한다.
6. **작업 후 반드시 검증한다.** 타입체크 → 빌드 → 라이브 URL 200 → 필요 시 모바일 미리보기. 보고에는 검증 결과를 그대로 적는다.
7. 에이전트가 낸 결과는 검토 없이 쓰지 않는다. 근거 없는 수치(순위, 가격, 판매량)가 섞였는지 확인한다.
8. GA4 일반 보고서는 하루 이상 늦게 채워진다. 실시간 화면으로 수집 여부를 먼저 보고, 일 단위 수치는 24~48시간 뒤에 판단한다.

## Windows 주의점
- 사용자에게 터미널 명령을 줄 때 Git Bash용인지 PowerShell용인지 구분한다. PowerShell에는 `&&`와 `/d/...` 경로가 없다.
- Git Bash의 `curl`로 한글 URL을 부르면 인코딩이 깨져 가짜 500이 난다. Python `urllib.parse.quote`를 쓰고 브라우저 User-Agent를 붙인다(Cloudflare가 기본 Python UA를 403한다).
- Node 스크립트에는 `C:/...` 형태의 Windows 경로를 넘긴다(`/c/...`는 인식하지 못한다).
- 스크립트로 파일 문자열을 바꿀 때 줄바꿈(CRLF/LF)을 보존하고 `git diff --stat`으로 파일 전체가 바뀌지 않았는지 본다.
- junction이 걸린 폴더를 `git worktree remove`로 지우면 junction 대상 내용이 지워질 수 있다(`node_modules`가 한 번 이렇게 삭제됐다).
- `.cc-wt`는 비어 있는 임시 폴더다. 사용자가 직접 지운다. 내가 지우지 않는다.

## 에이전트
기본 구성은 메인 작업자(나) 1명과 검수·감사 에이전트 3명이다(`.claude/agents/`). 검수자는 기본적으로 읽기 전용이며 파일 수정과 배포는 메인 작업자만 한다. 호출 기준은 `.claude/team-brief.md`에 있다.

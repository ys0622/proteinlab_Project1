---
name: proteinlab-goldbox-fix
description: 프로틴랩 골드박스 특가 확인·정정. 아침 보고나 .goldbox-auto/latest.txt에 "확인 필요"가 있을 때, 사장님이 "골박 체크"라고 할 때, 사이트 특가가 다른 제품에 잘못 붙었을 때, 사이트에 없는 제품이 특가에 나왔을 때 사용한다. 같은 제품인지 쿠팡 상품 ID·제목으로 확인하고 KV 특가 목록을 고친 뒤 라이브로 검증한다.
---

# 골드박스 확인·정정

자동 등록: Windows "ProteinLab Goldbox Daily"(평일 07:40, 주말 08:40)가 `scripts/goldbox/daily-goldbox.mjs --write`로 KV `coupang-goldbox:verified-offers:v1`(namespace `cb0554d5dbaf413d8fe971f91d1d968c`)에 기록한다. 결과는 `.goldbox-auto/latest.txt`, 원자료는 `.goldbox-auto/<날짜>-collect.json`.

## 1. 오늘 결과 읽기
```
cat .goldbox-auto/latest.txt
```
- 날짜가 오늘이 아니면 실행이 안 된 것이다. `.goldbox-auto/run.log` 끝을 보고, Aside가 꺼져 있었으면 Aside를 켠 뒤 `node scripts/goldbox/daily-goldbox.mjs`(쓰기 없이)로 다시 판정한다.
- 수집된 단백질 관련 상품 전체를 본다. 자동 매칭이 놓친 것도 찾는다:
  `collect.json`의 tabs 아래 항목 text에서 단백|프로틴|두유|요거트|그릭|쉐이크|protein을 찾는다.

## 2. 같은 제품인지 판정 (이 순서로)
1. **쿠팡 상품 ID**: 우리 제품 `coupangUrl`의 `/vp/products/<ID>` 또는 단축 링크를 풀어 얻은 ID(`.goldbox-auto/shortlink-pids.json` 캐시, 없으면 `curl -s -o /dev/null -w "%{redirect_url}" -A Mozilla/5.0 <단축링크>`)가 특가 `pid`와 같은가.
2. ID가 같아도 **용량이 다르면 다른 옵션**이다(그릭데이 라이트 100g/450g/800g가 한 상품 ID). 용량이 맞는 우리 제품을 찾는다.
3. ID가 다르면 이름이 맞아도 **다른 제품일 수 있다**(완전두유 "검은콩 고칼슘" ≠ "검은콩 검은참깨 고칼슘"). 두 쿠팡 페이지 제목을 Aside로 열어 비교한다:
   `aside repl 'const p=await openTab("https://www.coupang.com/vp/products/<ID>"); await new Promise(r=>setTimeout(r,6000)); console.log(await p.title())'`
4. 묶음(12개입 600g 등)은 낱개 용량 × 개수가 맞고 같은 제품이면 맞다.
5. 우리 사이트에 없는 제품이면 등록하지 않고 "신규 후보"로 보고한다(등록은 proteinlab-add-product 스킬로, 사진 승인 후).

## 3. KV 특가 고치기 (이 세션에서 허용된 방법은 wrangler 직접 호출뿐)
```
S=<scratchpad>
npx wrangler kv key get --namespace-id=cb0554d5dbaf413d8fe971f91d1d968c --remote "coupang-goldbox:verified-offers:v1" > $S/kv.json
# Python으로 항목 제거·추가 → $S/kv-new.json
npx wrangler kv key put --namespace-id=cb0554d5dbaf413d8fe971f91d1d968c --remote "coupang-goldbox:verified-offers:v1" --path=$S/kv-new.json
```
특가 항목 형식:
```json
{"slug":"<우리 slug>","offerName":"<용량> × <개수>개 · 골드박스 특가 · 쿠팡 확인","price":0,
 "href":"/api/out/coupang?pageKey=<pid>&itemId=<itemId>&vendorItemId=<vendorItemId>&category=<카테고리>&slug=<slug>",
 "source":"coupang_web","verifiedAt":"<지금 UTC>","startsAt":"<지금보다 과거 UTC>","expiresAt":"<다음날 07:00 KST = 전날 22:00Z>"}
```
- `startsAt`을 미래로 넣으면 그 시각까지 안 보인다.
- href의 pid/itemId/vendorItemId는 **특가 상품의 값**(collect.json)을 쓴다. 우리 제품 링크 값이 아니다.

## 4. 라이브 확인
- `curl -s "https://proteinlab.kr/api/goldbox/active?t=$RANDOM"` 에 slug가 있는지. KV 전파는 수십 초 걸릴 수 있다. 기다릴 때는 `run_in_background`로 until 루프를 쓴다(단순 sleep 연결은 막힌다).
- `/goldbox` HTML에 `href="/product/<slug>"`가 있는지.
- `.goldbox-auto/latest.txt` 끝에 "수동 정정(시각): 무엇을 왜" 한 줄을 남긴다.

## 5. 매칭 규칙을 고칠 때
`scripts/goldbox/daily-goldbox.mjs`의 `match()`를 고치면, 지난 수집분 전부로 다시 판정해 회귀가 없는지 본다:
```
for d in 20 21 22 23 24; do node scripts/goldbox/daily-goldbox.mjs --from D:/proteinlab/.goldbox-auto/2026-10-$d-collect.json | grep -A4 "^일치"; done
```
주의: `--from`에는 반드시 `*-collect.json`(원자료)을 넘긴다. 결과 파일(`<날짜>.json`)을 넘기면 오늘 latest.txt가 빈 결과로 덮인다(2026-10-22 실수). 다 돌린 뒤 마지막에 오늘 collect로 한 번 더 돌려 latest.txt를 오늘 것으로 되돌린다.

## 보고
표: 골드박스 상품 | 우리 제품 | 판정(같음/다른 옵션/다른 제품/신규 후보) | 처리. 라이브 확인 결과와 매칭 규칙 변경 여부.

## 등록하지 않기로 한 상품
사이트 카테고리 밖(파우더 등)이거나 등록 기준 밖(두유 단백질 5g 미만 등)으로 결론 난 상품은 `scripts/goldbox/excluded-pids.json`에 `"<쿠팡 상품 ID>": "<제품명> — <이유> (<날짜>)"`로 넣는다. 그러면 다음 점검부터 "확인 필요"에 다시 나오지 않는다(2026-10-26). 사이트에 넣을 만한데 성분표가 없는 상품(예: 새 맛)은 넣지 않는다.

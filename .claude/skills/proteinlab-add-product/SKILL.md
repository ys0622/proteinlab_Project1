---
name: proteinlab-add-product
description: 프로틴랩 신규 제품 등록(음료·바·쉐이크·요거트·두유). 사장님이 제품 사진·성분표를 보내며 "등록해", 골드박스·쿠팡에서 사이트에 없는 단백질 제품을 발견했을 때 사용한다. 성분표 판독 → 쿠팡 상품 ID 확인 → register.mjs 등록 → 근거 없는 칸 비우기 → 사진 확인 → 배포·검증 → (특가면) 골드박스 등록까지.
---

# 신규 제품 등록

수치의 1차 근거는 성분표 이미지다. 링크·원료·제조사를 지어내지 않는다. 사진은 사장님이 보낸 것이거나 사장님이 승인한 것만 쓴다(메모리 feedback_image_approval).

## 0. 준비
- 사장님이 보낸 이미지는 `C:\Users\ys062\AppData\Local\Temp\claude\D--proteinlab\<세션>\images\N.png`에 있다. 어느 것이 제품 사진이고 어느 것이 성분표인지 Read로 열어 확인한다.
- 사진이 없으면 `scripts/intake/run-intake.mjs`(쿠팡 페이지에서 자동 수집, 메모리 project_intake_pipeline)로 미리보기를 만들고 **승인받은 뒤** 진행한다.
- 카테고리 기준을 확인한다. 두유는 250mL 이하 대두 기반이고 1팩 단백질 5g 이상이어야 한다(CLAUDE.md).

## 1. 성분표 판독
- Read로 성분표를 열고 1회(1병·1개·1팩) 기준 값을 적는다: kcal, 단백질, 탄수화물, 당류, 지방, 포화지방, 트랜스지방, 콜레스테롤, 나트륨, (식이섬유).
- 100g당만 적힌 라벨은 제품 용량으로 환산하고, 환산했다고 기록한다. "1g 미만"은 그대로 메모한다(표시 방침은 docs/owner-confirm-list.md 미결).
- 비슷한 제품이 이미 있으면 slug 형식과 필드 값을 맞춘다. 예: `python -X utf8 -c "import json;..."`로 같은 브랜드 제품 1개를 출력한다.

## 2. 쿠팡 상품 ID (지어내지 않는다)
- 골드박스에서 나온 상품이면 `.goldbox-auto/<날짜>-collect.json`의 `pid/itemId/vendorItemId`를 쓴다.
- 아니면 Aside로 쿠팡 검색 결과를 읽는다(읽기만 한다):
  `aside repl 'const p=await openTab("https://www.coupang.com/np/search?q="+encodeURIComponent("<제품명>")); await new Promise(r=>setTimeout(r,8000)); console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll("a[href*=\"/vp/products/\"]")].map(a=>({t:a.innerText.replace(/\s+/g," ").slice(0,80),h:a.getAttribute("href")})).slice(0,12))))'`
- 낱개에 가장 가까운 기본 옵션(예: 6개입)을 고른다. 제목·용량이 제품과 맞는지 확인한다.

## 3. 등록 입력 만들기
`inbox/intake/<ID>/`에 4개 파일을 둔다.
- `product.png`: 제품 사진(흰 배경이면 그대로 된다. register.mjs가 여백을 잘라 webp로 만든다)
- `spec.png`: 성분표
- `meta.json`: `{"productId","itemId","vendorItemId","title","source"}`
- `gemini.json`: `{"nutrition_per_unit":{"kcal","protein_g","carbs_g","sugar_g","fat_g","sat_fat_g","trans_fat_g","cholesterol_mg","sodium_mg"}}` (사람이 읽은 값이어도 이 이름을 쓴다)

`inbox/intake/register-<이름>.json` 배열에 항목을 적는다. 카테고리별 필수 필드는 register.mjs의 `validateCategoryFields`를 본다.
- 음료: variant, tags(["PET"]/["팩"]/["CAN"]), manufacturer, proteinSource, drinkType(밀크형/워터형), flavor
- 원재료·제조사를 확인할 수 없으면 `"미확인"`으로 넣고 **등록 뒤 그 키를 JSON에서 지운다**(지어내지 않는다).

## 4. 등록
```
node scripts/intake/register.mjs inbox/intake/register-<이름>.json --dry-run
node scripts/intake/register.mjs inbox/intake/register-<이름>.json
```
- "미확인" 필드 삭제는 Python으로 해당 slug 블록만 고치고 `json.loads`로 검증한다.
- 생성된 사진(`public/<카테고리>-image/<slug>.webp`)을 Read로 열어 잘림·배경을 확인한다.

## 5. 배포·검증 (CLAUDE.md 배포 절차)
- `npx tsc --noEmit -p .` → `npm run check:assets`
- 로컬 미리보기 서버가 떠 있으면 먼저 끈다(preview_stop).
- **커밋하지 않은 보류 시안 폴더(예: app/this-week)가 있으면 잠시 scratchpad로 옮기고 배포한 뒤 되돌린다**(로컬 배포는 작업 트리 전체를 올린다).
- `rm -rf .open-next && npm run deploy`(백그라운드) → `Current Version ID`
- 라이브 확인: 새 제품 페이지 200과 `<title>`(단백질·당류·kcal), 구매 링크 `/api/out/coupang?...`가 307로 link.coupang.com에 가는지, 목록 페이지 상품 링크 수가 1 늘었는지.
- 커밋은 파일을 하나씩 지정한다: 데이터 JSON, feedPageMeta, newProducts, productCategoryCounts, slugTo*Image/Spec, 새 webp/png.

## 6. 오늘 골드박스 특가인 경우
`proteinlab-goldbox-fix` 스킬의 "특가 추가"를 따른다. `startsAt`은 **지금보다 과거**로 넣는다(미래로 넣으면 그 시각까지 안 보인다, 2026-10-24 실수).

## 보고
표로: 제품, 1회 기준 수치, 쿠팡 옵션, 비운 칸과 이유, 라이브 확인 결과, 커밋 해시.

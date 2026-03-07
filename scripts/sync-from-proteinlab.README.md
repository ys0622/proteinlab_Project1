# proteinlab.kr 데이터 동기화

제품 데이터를 **proteinlab.kr**과 반드시 맞추기 위한 방법입니다.

## 1. slug 매핑 유지

- 파일: `app/data/proteinlabSlugMap.ts` (소스), `app/data/proteinlabSlugMap.json` (스크립트용)
- 스크립트(`sync-from-proteinlab.mjs`)는 JSON을 읽습니다. **매핑을 수정할 때는 `.ts`와 `.json`을 동일하게 유지**하세요.
- 우리 프로젝트의 제품 `slug`와 proteinlab.kr 제품 URL 경로가 다를 수 있으므로, 매핑을 유지합니다.
- proteinlab.kr에서 제품 상세 페이지 URL을 열어보면 예: `https://proteinlab.kr/product/danbaek-drink-coffee-250` → 경로 마지막이 `danbaek-drink-coffee-250`입니다.
- 우리 slug가 `theprotein-drink-coffee-250`이면 `proteinlabSlugMap.ts`에  
  `"theprotein-drink-coffee-250": "danbaek-drink-coffee-250"` 처럼 추가합니다.
- **101개 제품 모두** proteinlab.kr에 있다면, 101개 매핑을 채우면 됩니다.

## 2. 데이터 가져오기 방법 (둘 중 하나)

### A) proteinlab.kr에서 직접 export (권장)

- proteinlab.kr이 **API** 또는 **JSON/CSV 내보내기**를 지원한다면:
  - 관리자 메뉴에서 “제품 데이터 내보내기” 등으로 JSON/CSV를 받습니다.
  - 받은 파일을 `app/data/` 쪽에 두고, `products.ts`를 이 파일에서 생성/갱신하도록 수정하거나, 빌드 시 이 파일을 읽어서 사용하도록 하면 **단일 소스(proteinlab.kr)로 무조건 맞출 수 있습니다.**

### B) 스크립트로 페이지 fetch 후 반영

- proteinlab.kr에 export 기능이 없으면, **제품 상세 페이지 HTML**을 가져와서 파싱하는 스크립트를 둡니다.
- `scripts/sync-from-proteinlab.mjs` 예시:
  1. `proteinlabSlugMap.ts`(또는 동일 내용의 JSON)를 읽어서 우리 slug → proteinlab slug 매핑을 로드.
  2. 각 slug에 대해 `https://proteinlab.kr/product/{proteinlab-slug}` 를 fetch.
  3. HTML에서 “단백질”, “칼로리”, “BCAA”, “지방”, “나트륨”, “단백질 급원”, “칼로리밀도”, “음료 타입” 등 텍스트를 찾아 값 추출.
  4. 결과를 JSON 파일로 저장 (예: `app/data/synced-products.json`).
- 이후:
  - **수동**: `synced-products.json`을 보고 `app/data/products.ts`의 `mockProducts`를 수정하거나,
  - **자동**: `products.ts`가 빌드 시 `synced-products.json`을 읽어서 사용하도록 코드 변경.

## 3. 정리

- **데이터를 무조건 맞추려면**:  
  - **단일 소스**를 proteinlab.kr로 두고,  
  - 위 A) export 또는 B) fetch 스크립트로 **항상 proteinlab.kr에서만** 숫자/텍스트를 가져와서 사용하는 구조로 만드는 것이 좋습니다.
- 매핑이 빠진 제품은 스크립트에서 건너뛰게 하고, 매핑을 채울 때마다 다시 실행해 나머지 제품도 점진적으로 맞추면 됩니다.

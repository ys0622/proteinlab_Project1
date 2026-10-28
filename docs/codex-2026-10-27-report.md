# Codex 콘텐츠 보강 보고서 (2026-10-27)

## 작업 범위

- 배포, `git commit`, `git push`는 하지 않았다.
- 제목, slug, canonical, 쿠팡 링크, 구매 버튼, 광고 영역은 변경하지 않았다.
- 아래 글자 수는 페이지가 공통 템플릿을 쓰는 경우 해당 콘텐츠 설정 조각, 독립 페이지는 페이지 소스의 대략적인 문자 수다. 런타임에 데이터로 반복되는 표 행은 최종 화면에서 더 길어지므로 참고값이다.

## 페이지별 결과

1. `/guides/product-selection-comparison/selex-vs-takefit-vs-himune`
   - 파일: `app/guides/product-selection-comparison/compareGuideContent.ts`
   - 100kcal당 단백질 행, 열량 대비 밀도·나트륨 FAQ 2개 추가. 기존 관련 링크 유지.
   - 약 4,644자 → 5,217자.

2. `/guides/basics/protein-source-types`
   - 파일: `app/guides/basics/protein-source-types/page.tsx`
   - 셀렉스·테이크핏·얼티브 식물성 대표 제품의 원료 표기·용량·단백질·당류·열량·100kcal당 단백질 표와 수치 FAQ 2개를 추가했다. 기존 소화 가이드 내부 링크 유지.
   - 약 19,062자 → 21,919자.

3. `/guides/product-selection-comparison/newcare-vs-hymune`
   - 파일: `app/guides/product-selection-comparison/compareGuideContent.ts`
   - 100kcal당 단백질 행, 열량 대비 밀도·한 병 열량/당류 FAQ 2개 추가. 하이뮨 라인업·50대 가이드 등 유지 목록 내부 링크가 이미 있다.
   - 약 4,124자 → 4,659자.

4. `/guides/product-selection-comparison/danbaek-vs-selexs`
   - 파일: `app/guides/product-selection-comparison/compareGuideContent.ts`
   - 100kcal당 단백질 행, 밀도·나트륨 차이 FAQ 2개 추가. 셀렉스/더단백 관련 가이드 링크 유지.
   - 약 3,744자 → 4,297자.

5. `/guides/product-selection-comparison/protein-shake-top7`
   - 파일: `app/guides/product-selection-comparison/proteinCategoryContent.ts`
   - TOP 7 표에 100kcal당 단백질 열을 추가하고 계산법·동률 선택 기준 FAQ 2개를 추가했다. 기존 유지 목록 관련 링크 유지.
   - 콘텐츠 설정 약 7,766자 → 8,126자.

6. `/guides/product-selection-comparison/protein-bar-top10`
   - 파일: `app/guides/product-selection-comparison/proteinBarContent.ts`
   - TOP 10 표에 100kcal당 단백질 열을 추가하고 계산법·동률 선택 기준 FAQ 2개를 추가했다. 다이어트 바와 편의점 바 관련 링크 유지.
   - 콘텐츠 설정 약 10,334자 → 10,673자.

7. `/guides/product-selection-comparison/protein-drink-for-50s`
   - 파일: `app/guides/product-selection-comparison/compareGuideContent.ts`
   - 3종의 100kcal당 단백질 행, 최저 열량·밀도 FAQ 2개 추가. 유지 목록의 셀렉스/하이뮨 비교 링크가 이미 있다.
   - 약 4,415자 → 5,003자.

8. `/guides/intake-strategy-health/night-protein-drink`
   - 파일: `app/guides/intake-strategy-health/night-protein-drink/page.tsx`
   - 테이크핏·하이뮨·셀렉스 후보의 단백질·당류·열량·나트륨·100kcal당 단백질 표와 수치 FAQ 2개를 추가했다. 기존 유지 목록 내부 링크 유지.
   - 약 14,479자 → 16,695자.

9. `/guides/product-selection-comparison/diet-protein-bar`
   - 파일: `app/guides/product-selection-comparison/proteinBarContent.ts`
   - 조건 통과 제품 표에 100kcal당 단백질 열을 추가하고 계산법·재선택 기준 FAQ 2개를 추가했다. TOP 10과 다이어트 쉐이크 링크 유지.
   - 약 5,344자 → 5,775자.

10. `/guides/product-selection-comparison/danbaek-vs-himune`
    - 파일: `app/guides/product-selection-comparison/compareGuideContent.ts`
    - 100kcal당 단백질 행, 밀도·나트륨 차이 FAQ 2개 추가. 하이뮨 라인업과 더단백/셀렉스 비교 링크 유지.
    - 약 3,679자 → 4,210자.

11. `/guides/intake-strategy-health/lean-massup-protein-intake`
    - 파일: `app/guides/intake-strategy-health/lean-massup-protein-intake/page.tsx`
    - 건너뜀. 약 21,114자로 계산 표와 FAQ, 관련 가이드가 이미 충분하다.

12. `/guides/intake-strategy-health/protein-drink-empty-stomach`
    - 파일: `app/guides/intake-strategy-health/protein-drink-empty-stomach/page.tsx`
    - 셀렉스·하이뮨·테이크핏 20g대 후보의 단백질·당류·열량·나트륨·100kcal당 단백질 표와 수치 FAQ 2개 추가. 기존 유지 목록 내부 링크 유지.
    - 약 7,650자 → 10,709자. 소스는 6,000자를 넘었지만 작업 전 실제 설명 분량이 짧고 고유 제품 수치표가 없어 보강했다.

13. `/compare/flymill-vs-allthebetter-shake`
    - 파일: `app/data/compareLandings.ts`, `app/compare/[slug]/page.tsx`
    - 일반 문구를 단백질·당류·100kcal당 단백질 근거로 교체하고 FAQ 3개 추가. 유지 목록의 쉐이크 TOP 7 링크 추가.
    - 해당 설정 약 659자 → 1,179자.

14. `/compare/takefit-max-vs-takefit-monster`
    - 파일: `app/data/compareLandings.ts`, `app/compare/[slug]/page.tsx`
    - 단백질 차이, 열량·당류, 100kcal당 단백질 FAQ 3개 추가. 유지 목록의 40g 이상 비교 링크가 이미 있다.
    - 해당 설정 약 1,087자 → 1,407자.

15. `/compare/sellex-vs-takefit`
    - 파일: `app/data/compareLandings.ts`, `app/compare/[slug]/page.tsx`
    - 일반 문구를 단백질·열량·100kcal당 단백질 근거로 교체하고 FAQ 3개 추가. 유지 목록의 3브랜드 비교 링크 추가.
    - 해당 설정 약 565자 → 1,111자.

16. `/guides/product-selection-comparison/high-protein-soymilk-guide`
    - 파일: `app/guides/product-selection-comparison/high-protein-soymilk-guide/page.tsx`, `app/data/googleIndexKeep.json`
    - 49종 데이터에서 고단백(11g 이상) 16종 전체 표를 추가했다. 브랜드·제품·용량·단백질·당류·열량·칼슘(입력값이 있을 때)을 표시한다.
    - 단백질 강화(8~10g) 9종, 저당(3g 미만)이면서 고단백인 11종, 연세·매일·베지밀(정식품)·이롬의 데이터 범위 카드, FAQ 3개를 추가했다.
    - 구글 유지 목록에 새로 추가했다. `/soymilk` 내부 링크는 기존에 있었다.
    - 약 10,777자 → 16,823자.

17. `/guides/product-selection-comparison/himune-lineup`
    - 파일: `app/guides/product-selection-comparison/compareGuideContent.ts`, `app/guides/product-selection-comparison/productCompareShared.tsx`, `app/components/CategoryDataSection.tsx`
    - 하단 하이뮨 전체 데이터 표가 등록 19종을 모두 표시하도록 유지하고 용량 열을 추가했다. 제품명에 라인·맛, 별도 열에 용량·단백질·당류·열량이 표시된다.
    - 전체 제품 수, 당류 0g 라인 차이, 최소/최대 용량 FAQ 3개 추가. 날짜를 2026-10-27로 갱신했다.
    - 약 5,961자 → 6,427자. 이미 `googleIndexKeep.json`에 있어 중복 추가하지 않았다.

## 검사 결과

- `npx tsc --noEmit -p .`: 오류 0.
- 변경한 TS/TSX 11개와 검증 스크립트에 `npx eslint <파일>`: 오류 0.
- `node scripts/validate-codex-2026-10-27.mjs`: 1,208개 필드 확인, 불일치 0건.
  - 두유 49종 / 고단백 16종 / 강화 9종 / 저당·고단백 11종 확인.
  - 하이뮨 19종의 이름·용량·단백질·당류·열량 확인.
  - 비교 랜딩 3개의 단백질·당류·열량·나트륨·100kcal당 단백질 하드코딩 값 확인.
- `git diff --check`: 오류 0. `git diff --stat`은 12개 기존 파일에서 254줄 추가·10줄 삭제로, 파일 전체 교체가 아닌 부분 수정임을 확인했다(검증 스크립트와 보고서는 신규 파일이라 stat 밖).
- 줄바꿈/BOM 확인: 기존 LF 파일은 LF, 공복 페이지와 `googleIndexKeep.json`의 CRLF는 CRLF로 유지했다. 기존 BOM이 있던 `app/compare/[slug]/page.tsx`도 BOM을 유지했다.
- 로컬 개발 서버는 띄우지 않았다.

## Claude가 배포 전에 볼 것

- 고단백 두유 전체 표는 모바일에서 가로 스크롤되는 기존 표 형식을 사용한다. 16행 길이와 가독성을 실제 화면에서 한 번 확인하는 편이 좋다.
- 하이뮨 전체 표의 라인·맛은 별도 파생 분류가 아니라 데이터의 제품명 표기를 그대로 사용했다. 임의 분류로 이름을 바꾸지 않기 위한 선택이다.
- 칼슘이 데이터에 없는 두유는 `-`로 표시한다. 0mg 뜻이 아니라 미입력임을 FAQ에 명시했다.
- 공통 `CategoryDataSection`에는 선택적 `showCapacity` 속성만 추가했으며 현재 하이뮨 라인업에서만 켰다. 다른 페이지 출력은 바뀌지 않는다.
- 비교 랜딩의 추가 FAQ는 기존 자동 생성 FAQ 뒤에 합쳐지고 같은 배열로 화면과 FAQ JSON-LD에 반영된다.

## 이번 작업에서 바꾼 파일

`git status --short` 기준으로 아래만 이번 작업 파일이다. `.claude/settings.local.json`, `public/products.json`, 블로그·intake 파일과 기존 임시 파일은 건드리지 않았다.

- `app/compare/[slug]/page.tsx`
- `app/components/CategoryDataSection.tsx`
- `app/data/compareLandings.ts`
- `app/data/googleIndexKeep.json`
- `app/guides/intake-strategy-health/protein-drink-empty-stomach/page.tsx`
- `app/guides/intake-strategy-health/night-protein-drink/page.tsx`
- `app/guides/basics/protein-source-types/page.tsx`
- `app/guides/product-selection-comparison/compareGuideContent.ts`
- `app/guides/product-selection-comparison/high-protein-soymilk-guide/page.tsx`
- `app/guides/product-selection-comparison/proteinCategoryContent.ts`
- `app/guides/product-selection-comparison/productCompareShared.tsx`
- `app/guides/product-selection-comparison/proteinBarContent.ts`
- `scripts/validate-codex-2026-10-27.mjs`
- `docs/codex-2026-10-27-report.md`

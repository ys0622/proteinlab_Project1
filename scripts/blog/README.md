# 프로틴랩 네이버 블로그 원고 준비 (2026-10-21)

발행은 blogpilot(`D:\네이버 블로그 자동화`)이 맡는다. 여기서는 **원고·근거·썸네일·발행 목록**까지만 만든다. 블로그에 올리는 일은 하지 않는다.
원고 폴더는 기존 블로그 작업 폴더 `C:\Users\ys062\Desktop\네이버 블로그\프로틴랩\content\<ID>\` 이고, 작성 규칙은 그 폴더의 `AGENTS.md`·`operations/콘텐츠품질규칙.md`·`operations/운영체계.md`를 따른다.

## 순서

| 단계 | 명령 | 결과 |
|---|---|---|
| 1 주제 | `scripts/blog/topics.json`에 주제 추가(검색어 근거·비교 CTA·태그) | |
| 2 근거 | `node scripts/blog/build-evidence.mjs T01` | `content/PL-YYYYMMDD-NN/{brief.md, evidence.md, evidence.json}` |
| 3 집필 | Claude가 brief·evidence와 블로그 규칙으로 `article.md` 작성 | blogpilot 원고 형식 |
| 4 검사 | `node scripts/blog/check-post.mjs PL-...` | `check.json` (수치·형식·분량·금지 표현·링크) |
| 5 썸네일 | `"D:\네이버 블로그 자동화\.venv\Scripts\python.exe" scripts/blog/make-thumbnail-v2.py <폴더>` (2026-10-26 확정 디자인: 흰 바탕 + 1위 칸 초록, 제품 원본 흰 배경 그대로·누끼 금지. spec의 lines·products(최대 4)·stats[0]=큰 숫자·1위 기준, stats[1]=보조) | `thumbnail.png` 1080×1080, 수치는 evidence 검증값만. 구버전 make-thumbnail.py는 쓰지 않음 |
| 6 승인 | 검사 통과+썸네일 확인이면 자동으로 `승인: 예 (자동...)` (2026-10-21 사장님 지시, 사전 승인 없음·발행 후 글마다 보고) | |
| 7 목록 | `node scripts/blog/make-manifest.mjs --date 2026-10-22` | `발행대기/<날짜>_manifest.json` (승인+검사 통과만, 하루 최대 2편, 10:00·15:00) |
| 8 발행 | blogpilot: `python -m blogpilot import protein_lab --date ...` → `publish ...` | blogpilot 쪽 담당 |

## 원고 형식 (blogpilot `manuscript.py`)
- 첫 줄 `[카테고리] 제품 비교`, 다음 줄 `**제목**`
- 본문 마지막에 `#태그 #태그` 한 줄, `카테고리: 제품 비교` 한 줄
- 블로그 카테고리: 목적별 추천 / 제품 리뷰·신제품 / 프로틴 이슈 / 제품 비교 / 단백질 가이드 / 쇼핑정보

## 지키는 것
- 수치는 evidence.json의 검증된 값만. 성분표 이미지를 다른 제품과 공유하는 제품은 "검증 불가"로 빼고 쓰지 않는다.
- 사이트 페이지를 그대로 옮기지 않는다. 블로그는 독자 질문에 본문에서 답하고, 비교 표는 사이트 CTA로 잇는다.
- 같은 틀에 제품명만 바꾼 글을 반복하지 않는다(블로그 품질 규칙 2). 주제마다 질문이 달라야 한다.
- 가격·맛 평가·효능은 근거 자료가 없으면 쓰지 않는다.

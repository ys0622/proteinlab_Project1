// 네이버 AI 브리핑 인용 점검 (2026-10-29). 검색어마다 모바일 검색 결과의 'AI 브리핑' 블록과 출처 링크를 읽는다.
// 사용: node scripts/browser/chrome-repl.mjs --profile work-nologin --timeout 580000 --file scripts/naver/ai-briefing-check.js
// 결과 줄: NAVER <검색어> => {"brief":true|false,"ours":[우리 페이지],"sources":[출처]}. 기록은 docs/ai-citation-log.csv.
// 검색어 목록은 서치어드바이저 최근 30일 클릭 상위 40개(2026-10-29 기준). 같은 목록으로 매주 재야 비교가 된다.
const qs = ["mpi 단백질", "단백질바 추천", "프로티원", "프로티원 쉐이크", "단백질 쉐이크 추천 순위", "잇더핏 성분표", "단백질쉐이크 추천", "하이뮨 셀렉스 비교", "잇더핏 프로티원 비교", "잇더핏 초코 쉐이크", "단백질쉐이크 순위", "단백질쉐이크 비교", "크런틴 성분", "커클랜드 프로틴바", "단백질쉐이크 칼로리", "단백질바", "테이크핏 몬스터", "잇더핏 단백질쉐이크", "단백질음료 순위", "mpc 단백질", "더단백 셀렉스 비교", "프로틴랩", "랩노쉬 단백질쉐이크", "셀렉스 하이뮨 비교", "매일 그릭요거트", "단백하니 쉐이크", "셀렉스 프로핏 성분", "프로티원 쉐이크 성분", "단백질 쉐이크 성분 순위", "셀렉스 프로핏 맛 비교", "mpi wpi 차이", "뉴케어 성분표 비교", "린매스업 탄수화물", "베노프 단백질바", "단백질 쉐이크 추천", "뉴케어 올프로틴 41g", "베노프 소프트바", "단백하니", "커클랜드 단백질바", "프로티원 쉐이크 초코",
  // 11/2 추가: 질문형 허브 1차 검색어(웹사이트 칸이 열린 질문)
  "단백질 하루 섭취량", "단백질 과다섭취 부작용", "단백질 부족 증상", "단백질 한번에 흡수량", "단백질 먹는 시간", "식물성 동물성 단백질 차이", "단백질 쉐이크 효과", "단백질 음료 효과", "단백질 쉐이크 다이어트", "단백질 쉐이크 살찌나요", "단백질 음료 살찌나요", "근육 합성 단백질", "근단백질 합성", "마운자로 단백질", "위고비 단백질"];
const page = await openTab("about:blank");
await page.setViewportSize({ width: 390, height: 844 });
// 2026-11-02 수리: 10/31 측정에서 브리핑 17개 중 14개가 출처 0으로 읽혔다. 링크가 늦게 그려지고(3.5초에 빈 블록),
// 조상 노드를 거슬러 오르며 링크 수로 블록을 찾다 보니 광고(ader.naver.com)까지 섞였다.
// 이제 브리핑 고정 클래스(fds-aib-expandable-container)를 기다렸다가 '펼쳐서 더보기'를 누르고 그 안의 링크만 읽는다.
for (const q of qs) {
  await page.goto("https://m.search.naver.com/search.naver?query=" + encodeURIComponent(q), { waitUntil: "domcontentloaded" });
  let r = { brief: false }, prev = -1, count = null, clicked = false;
  for (let t = 0; t < 12; t++) {
    await new Promise(res => setTimeout(res, 1000));
    r = await page.evaluate((doClick) => {
      const head = document.querySelector('.fds-aib-header-title-text');
      if (!head) return { brief: false };
      const box = head.closest('.api_subject_bx') || document.body;
      const m = box.innerText.match(/출처 (\d+)건/);
      if (doClick) { const more = [...box.querySelectorAll('button')].find(b => /펼쳐서 더보기/.test(b.innerText)); if (more) more.click(); }
      const hrefs = [...box.querySelectorAll('a[href^="http"]')].map(a => a.href)
        .filter(h => !/ader\.naver\.com|search\.naver\.com|help\.naver\.com/.test(h));
      const keys = [...new Set(hrefs.map(h => { try { const u = new URL(h); return u.hostname.includes('proteinlab') || u.hostname.includes('blog.naver') ? u.hostname + u.pathname : u.hostname; } catch { return ''; } }).filter(Boolean))];
      return { brief: true, count: m ? +m[1] : null, ours: keys.filter(h => h.includes('proteinlab')), sources: keys.slice(0, 10), top: +(head.getBoundingClientRect().top / innerHeight).toFixed(1) };
    }, r.brief && !clicked);
    if (!r.brief) { if (t >= 5) break; continue; }
    if (r.count != null) count = r.count;
    if (!clicked) { clicked = true; prev = -1; continue; }
    if (r.sources.length && r.sources.length === prev) break; // 두 번 연속 같으면 다 그려진 것
    prev = r.sources.length;
  }
  if (r.brief) r.count = count;
  console.log("NAVER " + q + " => " + JSON.stringify(r));
}

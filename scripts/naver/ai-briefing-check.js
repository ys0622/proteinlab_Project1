// 네이버 AI 브리핑 인용 점검 (2026-10-29). 검색어마다 모바일 검색 결과의 'AI 브리핑' 블록과 출처 링크를 읽는다.
// 사용: node scripts/browser/chrome-repl.mjs --profile work-nologin --timeout 580000 --file scripts/naver/ai-briefing-check.js
// 결과 줄: NAVER <검색어> => {"brief":true|false,"ours":[우리 페이지],"sources":[출처]}. 기록은 docs/ai-citation-log.csv.
// 검색어 목록은 서치어드바이저 최근 30일 클릭 상위 40개(2026-10-29 기준). 같은 목록으로 매주 재야 비교가 된다.
const qs = ["mpi 단백질", "단백질바 추천", "프로티원", "프로티원 쉐이크", "단백질 쉐이크 추천 순위", "잇더핏 성분표", "단백질쉐이크 추천", "하이뮨 셀렉스 비교", "잇더핏 프로티원 비교", "잇더핏 초코 쉐이크", "단백질쉐이크 순위", "단백질쉐이크 비교", "크런틴 성분", "커클랜드 프로틴바", "단백질쉐이크 칼로리", "단백질바", "테이크핏 몬스터", "잇더핏 단백질쉐이크", "단백질음료 순위", "mpc 단백질", "더단백 셀렉스 비교", "프로틴랩", "랩노쉬 단백질쉐이크", "셀렉스 하이뮨 비교", "매일 그릭요거트", "단백하니 쉐이크", "셀렉스 프로핏 성분", "프로티원 쉐이크 성분", "단백질 쉐이크 성분 순위", "셀렉스 프로핏 맛 비교", "mpi wpi 차이", "뉴케어 성분표 비교", "린매스업 탄수화물", "베노프 단백질바", "단백질 쉐이크 추천", "뉴케어 올프로틴 41g", "베노프 소프트바", "단백하니", "커클랜드 단백질바", "프로티원 쉐이크 초코"];
const page = await openTab("about:blank");
await page.setViewportSize({ width: 390, height: 844 });
for (const q of qs) {
  await page.goto("https://m.search.naver.com/search.naver?query=" + encodeURIComponent(q), { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 3500));
  const r = await page.evaluate(() => {
    const heads = [...document.querySelectorAll('*')].filter(e => e.children.length === 0 && /^\s*AI 브리핑\s*$/.test(e.textContent));
    if (!heads.length) return { brief: false };
    let box = heads[0];
    for (let i = 0; i < 12 && box.parentElement; i++) { box = box.parentElement; if (box.querySelectorAll('a[href^="http"]').length >= 3 && box.innerText.length > 300) break; }
    const hosts = [...box.querySelectorAll('a[href^="http"]')].map(a => { try { return new URL(a.href).hostname + (a.href.includes('proteinlab.kr') ? new URL(a.href).pathname : ''); } catch { return ''; } }).filter(h => h && !/search\.naver|help\.naver|naver\.com\/?$/.test(h));
    const uniq = [...new Set(hosts)];
    return { brief: true, ours: uniq.filter(h => h.includes('proteinlab')), sources: uniq.slice(0, 10), top: +(box.getBoundingClientRect().top / innerHeight).toFixed(1) };
  });
  console.log("NAVER " + q + " => " + JSON.stringify(r));
}

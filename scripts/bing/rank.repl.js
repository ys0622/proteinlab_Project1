// 빙 공개 검색 순위 측정(읽기만). 사용:
//   node scripts/browser/chrome-repl.mjs --profile work-nologin --file scripts/bing/rank.repl.js
// 검색어마다 빙 첫 화면 일반 결과(li.b_algo)를 세어 proteinlab.kr 순위와 주소를 출력한다.
// 빙이 엉뚱한 결과를 줄 때가 있어(11/21) 결과 제목에 검색어 단어가 하나도 없으면 'broken'으로 표시한다.
// BING_Q="검색어1|검색어2" 로 일부만, BING_PAGES=2 로 2페이지까지 볼 수 있다.
const PAGES = Number(process.env.BING_PAGES || 1);
const QUERIES = process.env.BING_Q ? process.env.BING_Q.split("|") : [
  "단백질바 추천", "프로티원 성분표", "하이뮨 셀렉스 비교", "mpi 단백질", "단백질쉐이크 추천",
  "단백질 음료 추천", "테이크핏 몬스터 성분", "편의점 단백질 음료", "플라이밀 쉐이크 성분", "단백질바 칼로리",
  "단백질 하루 섭취량", "고단백 두유", "그릭요거트 단백질", "뉴케어 올프로틴", "단백질 보충제 추천",
];
const page = await openTab("about:blank");
const out = [];
for (const q of QUERIES) {
  const rows = [];
  for (let p = 0; p < PAGES; p++) {
    const first = p ? `&first=${p * 10 + 1}` : "";
    await page.goto("https://www.bing.com/search?q=" + encodeURIComponent(q) + "&setlang=ko&cc=KR" + first, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 3500 + Math.random() * 2000));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 1500));
    rows.push(...(await page.evaluate(() =>
      [...document.querySelectorAll("#b_results > li.b_algo")].map((li) => {
        const a = li.querySelector("h2 a");
        const cite = li.querySelector("cite")?.innerText || "";
        return { t: (a?.innerText || "").slice(0, 70), h: a?.href || "", cite: cite.slice(0, 90) };
      })
    )));
  }
  const words = q.split(/\s+/).filter((w) => w.length >= 2);
  const relevant = rows.filter((r) => words.some((w) => r.t.toLowerCase().includes(w.toLowerCase()))).length;
  const hits = rows
    .map((r, i) => ({ rank: i + 1, ...r }))
    .filter((r) => /proteinlab\.kr/.test(r.h + " " + r.cite));
  out.push({ q, top: process.env.BING_TOP ? rows.slice(0, 6).map((r) => r.cite.slice(0, 60) + " | " + r.t.slice(0, 50)) : undefined, n: rows.length, relevant, broken: rows.length === 0 || relevant === 0, hits: hits.map((h) => ({ rank: h.rank, url: h.cite || h.h, t: h.t })) });
}
console.log(JSON.stringify(out, null, 1));
await page.close();

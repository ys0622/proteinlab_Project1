// 네이버 서치어드바이저 '콘텐츠 노출/클릭'을 월~일 주 단위로 합산한다(읽기 전용, 2026-10-24).
// 사용(Git Bash): aside repl "$(sed "s#__SITE__#https://proteinlab.kr#" scripts/naver/search-weekly.aside.js)"
//   작업용 크롬(2026-10-25부터 기본): sed ... > .naver-crawl/sw.js && node scripts/browser/chrome-repl.mjs --profile naver-ys0622 --file .naver-crawl/sw.js
//   케어맵은 __SITE__ 를 https://caremap.co.kr 로 바꾼다. Aside에서 서치어드바이저에 로그인돼 있어야 한다.
// 출력: WEEKS [[주 시작 "M/D", 그 주 날짜 수, 클릭, 노출, CTR%], ...] — 날짜 수가 7인 주만 운영실에 넣는다.
// 화면이 부르는 /api-console/report/expose/<사이트 id>?period=…&device=d 응답의 items[0].logs(일별)를 쓴다.
// 응답의 exposedRank는 날마다 1로만 와서 쓰지 않는다.
const SITE = "__SITE__";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const page = await openTab("https://searchadvisor.naver.com/console/site/report/expose?site=" + encodeURIComponent(SITE));
await sleep(7000);
const out = await page.evaluate(async () => {
  const api = performance.getEntriesByType("resource").map((e) => e.name).find((n) => n.includes("/api-console/report/expose/"));
  if (!api) return { error: "리포트 API를 찾지 못함(로그인 확인)" };
  const j = await (await fetch(api.replace(/period=\d+/, "period=90"), { credentials: "include" })).json();
  const weeks = {};
  for (const l of j.items[0].logs) {
    const d = new Date(+l.date.slice(0, 4), +l.date.slice(4, 6) - 1, +l.date.slice(6, 8));
    const mon = new Date(d);
    mon.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    const key = mon.getMonth() + 1 + "/" + mon.getDate();
    const w = weeks[key] || (weeks[key] = { t: mon.getTime(), days: 0, c: 0, e: 0 });
    w.days++; w.c += l.clickCount; w.e += l.exposeCount;
  }
  return { latest: j.meta && j.meta.latestDate, weeks: Object.entries(weeks).sort((a, b) => a[1].t - b[1].t).map(([k, w]) => [k, w.days, w.c, w.e, w.e ? +((w.c / w.e) * 100).toFixed(2) : 0]) };
});
console.log("WEEKS " + JSON.stringify(out));

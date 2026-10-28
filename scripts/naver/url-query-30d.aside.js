const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const page = await openTab("https://searchadvisor.naver.com/console/site/report/expose?site=" + encodeURIComponent("https://proteinlab.kr"));
await sleep(8000);
const out = await page.evaluate(async () => {
  const api = performance.getEntriesByType("resource").map((e) => e.name).find((n) => n.includes("/report/expose/"));
  const j = await (await fetch(api.replace(/period=\d+/, "period=30").replace(/topN=\d+/, "topN=60"), { credentials: "include" })).json();
  const it = j.items[0];
  const s = (u) => u.replace("https://proteinlab.kr", "").replace("/guides/product-selection-comparison/", "/g/");
  return { p: it.period, urls: it.urls.map((u) => [s(u.key), u.clickCount, u.exposeCount, u.ctr, u.exposedRank]), q: it.querys.map((u) => [u.key, u.clickCount, u.exposeCount, u.ctr, u.exposedRank]) };
});
console.log("PERIOD " + JSON.stringify(out.p));
console.log("URLS"); out.urls.forEach((r) => console.log(r.join(" | ")));
console.log("QUERIES"); out.q.forEach((r) => console.log(r.join(" | ")));

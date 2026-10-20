// aside repl 스크립트: 쿠팡 웹 골드박스(메뉴의 골드박스 랜딩)에서 푸드·신선식품 탭 상품을 모은다.
// 웹 푸드 탭은 앱 골드박스 식품 탭과 같은 목록이다(2026-10-20 셀렉스 당솔브 옥수수로 확인).
// 결과는 "GOLDBOX {json}" 한 줄로 출력한다. scripts/goldbox/daily-goldbox.mjs 가 실행한다.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const page = await openTab("https://www.coupang.com/mlp/web/mlp-landing-page?landingId=3712&sourceType=gm_crm_goldbox&subSourceType=gm_crm_gwsrtcut");
await sleep(9000);
const out = { collectedAt: new Date().toISOString(), tabs: {} };
for (const tab of ["푸드", "신선식품"]) {
  const pos = await page.evaluate((tab) => {
    const el = [...document.querySelectorAll("a,button,li,span,div")].find((e) => e.children.length === 0 && (e.innerText || "").trim() === tab && e.getBoundingClientRect().width > 0 && !e.closest("header,nav,.gnb"));
    if (!el) return null;
    el.scrollIntoView({ block: "center" });
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, tab);
  if (!pos) { out.tabs[tab] = null; continue; }
  await page.mouse.click(pos.x, pos.y);
  await sleep(4000);
  const all = new Map();
  for (let i = 0; i < 30; i++) {
    const got = await page.evaluate(() => [...document.querySelectorAll('a[href*="/vp/products/"]')].map((a) => {
      const u = new URL(a.href);
      let e = a;
      for (let k = 0; k < 5 && e.parentElement; k++) { e = e.parentElement; if ((e.innerText || "").length > 40) break; }
      return {
        pid: (u.pathname.match(/products\/(\d+)/) || [])[1],
        itemId: u.searchParams.get("itemId"),
        vendorItemId: u.searchParams.get("vendorItemId"),
        text: (e.innerText || "").replace(/\s+/g, " ").slice(0, 200),
      };
    }));
    for (const g of got) if (g.pid && !all.has(g.pid + ":" + g.itemId)) all.set(g.pid + ":" + g.itemId, g);
    await page.evaluate(() => window.scrollBy(0, 1200));
    await sleep(500);
  }
  out.tabs[tab] = [...all.values()];
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1500);
}
console.log("GOLDBOX " + JSON.stringify(out));

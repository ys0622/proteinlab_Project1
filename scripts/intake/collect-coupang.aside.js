// aside repl 스크립트: 쿠팡 상품 페이지에서 등록에 필요한 값을 모은다.
// scripts/intake/run-intake.mjs 가 아래 ITEMS 자리표시 자리에 [{id, url}] JSON을 넣어 실행한다.
// 결과는 한 제품당 한 줄 "RESULT {json}" 으로 출력한다.
const items = __ITEMS__;
const page = await openTab("about:blank");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (const it of items) {
  try {
    await page.goto(it.url);
    await sleep(4500);
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 1400));
      await sleep(600);
    }
    const r = await page.evaluate(() => {
      const html = document.documentElement.innerHTML;
      const productId = (location.pathname.match(/products\/(\d+)/) || [])[1];
      // 1순위: 상세 진입 이벤트의 landed 옵션. 없으면 첫 판매 옵션(addCart)으로 대신하고 idSource로 표시한다.
      let idSource = "landed";
      let landed = html.match(new RegExp('\\\\"productId\\\\":' + productId + ',\\\\"itemId\\\\":(\\d+),\\\\"vendorItemId\\\\":(\\d+)'));
      if (!landed) {
        landed = html.match(new RegExp("addCart\\?itemId=(\\d+)\\\\u0026productId=" + productId + "\\\\u0026vendorItemId=(\\d+)"));
        idSource = landed ? "first-offer" : "none";
      }
      const imgs = [...document.querySelectorAll("img")]
        .map((i) => ({ src: i.currentSrc || i.src || i.dataset.src || "", w: i.naturalWidth, h: i.naturalHeight, alt: i.alt || "" }))
        .filter((x) => /coupangcdn\.com/.test(x.src) && !/logo|brandLogo|badge|icon/i.test(x.src));
      const main = imgs.find((x) => x.alt === "Product image");
      // 추천 상품 영역(다른 제품) 이미지는 상세 설명보다 아래에 있고 작다. 상세 이미지는 vendor_inventory 원본이며 가로 500px 이상.
      const detail = imgs.filter((x) => x.w >= 500 && x !== main && !/thumbnails\/remote\/(2|1)\d{2}x/.test(x.src));
      const h1 = (document.querySelector("h1") || {}).innerText || document.title;
      const priceText = ((document.querySelector('[class*="final-price"], .total-price, [class*="price-amount"]') || {}).innerText || "").replace(/\s+/g, " ");
      return {
        title: h1.trim(),
        productId,
        itemId: landed ? landed[1] : null,
        vendorItemId: landed ? landed[2] : null,
        idSource,
        main: main ? main.src : null,
        detail: [...new Set(detail.map((x) => x.src))].slice(0, 30),
        priceText: priceText.slice(0, 60),
      };
    });
    console.log("RESULT " + JSON.stringify({ id: it.id, url: it.url, ...r }));
  } catch (e) {
    console.log("RESULT " + JSON.stringify({ id: it.id, url: it.url, error: String(e).slice(0, 200) }));
  }
}

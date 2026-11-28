// 편의점 1+1·2+1 행사 목록 수집(chrome-repl 스크립트). scripts/cvs/monthly-cvs.mjs가 부른다.
// CU: cu.bgfretail.com/event/plus.do 의 plusAjax.do, 세븐일레븐: 7-eleven.co.kr/product/presentList.asp 의 listMoreAjax.asp.
// GS25는 웹 행사 목록이 없어(앱 전용, 2026-11-28 확인) 빠진다. 단백질 관련 이름만 남긴다.
const KW = /프로틴|단백|protein|두유|그릭|요거트|요구르트|하이뮨|셀렉스|테이크핏|랩노쉬|뉴케어|이지프로틴|얼티브|오트몬드|베지밀|쉐이크/i;
const out = { cu: null, seven: null, errors: [] };

try {
  const p = await openTab("https://cu.bgfretail.com/event/plus.do?category=event&depth2=1&sf=N");
  await new Promise((r) => setTimeout(r, 5000));
  out.cu = await p.evaluate(async (src) => {
    const kw = new RegExp(src, "i");
    const res = [];
    let total = 0;
    for (let page = 1; page <= 120; page++) {
      const body = new URLSearchParams({ pageIndex: String(page), listType: "0", searchCondition: "", user_id: "" });
      const r = await fetch("/event/plusAjax.do", { method: "POST", body, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      const doc = new DOMParser().parseFromString(await r.text(), "text/html");
      const items = [...doc.querySelectorAll("li.prod_list")];
      if (!items.length) break;
      total += items.length;
      for (const li of items) {
        const name = li.querySelector(".name p")?.textContent.trim() || "";
        const price = li.querySelector(".price strong")?.textContent.trim() || "";
        const badge = [...li.querySelectorAll(".badge span, .tag span")].map((s) => s.textContent.trim()).join(",");
        if (kw.test(name)) res.push({ name, price, badge });
      }
    }
    return { total, res };
  }, KW.source);
  await p.close();
} catch (e) {
  out.errors.push(`CU: ${e.message}`);
}

try {
  const p = await openTab("https://www.7-eleven.co.kr/product/presentList.asp");
  await new Promise((r) => setTimeout(r, 6000));
  out.seven = await p.evaluate(async (src) => {
    const kw = new RegExp(src, "i");
    const res = [];
    const totals = {};
    for (const [tab, label] of [["1", "1+1"], ["2", "2+1"]]) {
      let n = 0;
      let prev = null;
      for (let page = 1; page <= 150; page++) {
        const body = new URLSearchParams({ intPageSize: "50", intCurrPage: String(page), pTab: tab, cateCd1: "", cateCd2: "", cateCd3: "" });
        const r = await fetch("/product/listMoreAjax.asp", { method: "POST", body, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        const doc = new DOMParser().parseFromString(await r.text(), "text/html");
        const items = [...doc.querySelectorAll("li")].filter((li) => li.querySelector(".name"));
        if (!items.length) break;
        const first = items[0].querySelector(".name")?.textContent.trim();
        if (first === prev) break; // 마지막 쪽을 넘기면 같은 쪽이 반복된다
        prev = first;
        n += items.length;
        for (const li of items) {
          const name = li.querySelector(".name")?.textContent.trim() || "";
          const price = li.querySelector(".price")?.textContent.trim() || "";
          if (kw.test(name)) res.push({ type: label, name, price });
        }
      }
      totals[label] = n;
    }
    return { totals, res };
  }, KW.source);
  await p.close();
} catch (e) {
  out.errors.push(`세븐일레븐: ${e.message}`);
}

console.log("CVS_JSON:" + JSON.stringify(out));

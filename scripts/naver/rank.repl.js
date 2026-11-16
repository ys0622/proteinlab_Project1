// 네이버 통합검색(PC) 첫 화면에서 프로틴랩 링크를 DOM으로 직접 찾는다(2026-11-16, 백로그 #18).
// rank.py가 __QUERIES__ 자리에 검색어 배열을 넣어 scripts/browser/chrome-repl.mjs로 실행한다(에이전트·크레딧 없이).
// 결과 줄: RANK <검색어> => {"found":bool,"url":첫 링크,"section":섹션 제목,"rank":섹션 안 순서,"ai":AI 브리핑 출처인지,"top":상위 외부 도메인}
// 순서 = 그 섹션 안에서 우리 링크보다 먼저 나온 서로 다른 결과 주소 수 + 1 (광고·네이버 내부 메뉴 링크 제외).
const qs = __QUERIES__;
const OURS = /proteinlab\.kr|blog\.naver\.com\/proteinlab2026/;
const SKIP = /ader\.naver\.com|search\.naver\.com|help\.naver\.com|nid\.naver\.com|naver\.com\/?$|javascript:/;
const page = await openTab("about:blank");
await page.setViewportSize({ width: 1280, height: 900 });
for (const q of qs) {
  let r = { found: false };
  try {
    await page.goto("https://search.naver.com/search.naver?where=nexearch&query=" + encodeURIComponent(q), { waitUntil: "domcontentloaded" });
    // 아래 섹션은 스크롤해야 그려진다. 끝까지 내려가며 기다린다.
    for (let i = 0; i < 12; i++) {
      await page.evaluate(() => window.scrollBy(0, 1500));
      await new Promise((res) => setTimeout(res, 700));
    }
    await new Promise((res) => setTimeout(res, 1500));
    r = await page.evaluate(({ oursSrc, skipSrc }) => {
      const OURS = new RegExp(oursSrc), SKIP = new RegExp(skipSrc);
      const links = [...document.querySelectorAll("a[href^='http']")].filter((a) => !SKIP.test(a.href));
      const external = [...new Set(links.map((a) => { try { return new URL(a.href).hostname; } catch { return ""; } }).filter((h) => h && !h.endsWith("naver.com") && !h.endsWith("naver.net")))];
      const hit = links.find((a) => OURS.test(a.href));
      if (!hit) return { found: false, top: external.slice(0, 8) };
      const box = hit.closest(".api_subject_bx, section, .sc_new") || document.body;
      const title = (box.querySelector("h2, .api_title, .fds-aib-header-title-text, .title_area")?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 30);
      const inBox = [...new Set([...box.querySelectorAll("a[href^='http']")].map((a) => a.href.split("#")[0]).filter((h) => !SKIP.test(h)))];
      const rank = inBox.findIndex((h) => OURS.test(h)) + 1;
      const ai = !!box.querySelector(".fds-aib-header-title-text") || /AI 브리핑/.test(title);
      return { found: true, url: hit.href.split("?")[0], section: title || "-", rank, ai, top: external.slice(0, 8) };
    }, { oursSrc: OURS.source, skipSrc: SKIP.source });
  } catch (e) {
    r = { error: String(e).slice(0, 120) };
  }
  console.log("RANK " + q + " => " + JSON.stringify(r));
}

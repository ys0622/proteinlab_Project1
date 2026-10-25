#!/usr/bin/env node
/**
 * 매일 아침 쿠팡 골드박스 점검(2026-10-20). 사용자가 앱 골드박스 식품 탭을 캡처해 보내던 일을 대신한다.
 *
 *   1. collect  aside repl 로 웹 골드박스 푸드·신선식품 탭 상품을 모은다(scripts/goldbox/collect-web-goldbox.aside.js).
 *   2. match    등록 제품과 맞춘다. 브랜드·용량이 같고 제품명의 구분 단어(맛·라인명)가 모두 들어 있어야 "일치"로 본다.
 *               쿠팡 상품 ID(coupangUrl의 /vp/products/<id>)가 같으면 그것만으로 일치로 본다.
 *               일부만 맞는 후보는 "확인 필요"로 남긴다.
 *   3. report   .goldbox-auto/<날짜>.json, .goldbox-auto/latest.txt, 등록안 .goldbox-auto/<날짜>-offers.json
 *
 *   4. write    --write 일 때만 일치 제품을 KV(coupang-goldbox:verified-offers:v1)에 기록한다(2026-10-20 사용자 승인).
 *               배포 없이 /api/goldbox/active 에 5분 안에 반영된다. 만료된 항목은 지우고 같은 slug는 새 것으로 바꾼다.
 *               수집 0건(페이지 구조 변경 의심)이거나 "확인 필요" 후보는 쓰지 않는다.
 *
 * 사용: node scripts/goldbox/daily-goldbox.mjs [--write] [--from <collect json>]
 * 매일 07:10 Windows 작업 스케줄러 "ProteinLab Goldbox Daily"가 scripts/goldbox/run-daily.cmd 로 --write 실행한다.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const fromIdx = args.indexOf("--from");
const fromFile = fromIdx >= 0 ? args[fromIdx + 1] : null;
const write = args.includes("--write");
const KV_NAMESPACE_ID = "cb0554d5dbaf413d8fe971f91d1d968c"; // GUIDES_STATIC_DRAFTS_KV (wrangler.jsonc)
const KV_KEY = "coupang-goldbox:verified-offers:v1";

const CATEGORIES = ["drink", "bar", "shake", "yogurt", "soymilk"];
// 제품명에서 구분 단어로 보지 않는 말(어느 제품에나 붙는다).
const GENERIC = new Set(["프로틴", "단백질", "음료", "드링크", "고단백", "쉐이크", "단백질바", "프로틴바", "요거트", "그릭요거트", "두유", "protein"]);

const outDir = join(root, ".goldbox-auto");
mkdirSync(outDir, { recursive: true });
const now = new Date();
const kstDate = new Date(now.getTime() + 9 * 3600_000).toISOString().slice(0, 10);

// ---------- 1. collect ----------
function collect() {
  if (fromFile) return JSON.parse(readFileSync(fromFile, "utf-8"));
  const script = join(root, "scripts/goldbox/collect-web-goldbox.aside.js");
  const code = readFileSync(script, "utf-8");
  const aside = join(process.env.LOCALAPPDATA, "Aside/CLI/current/aside.exe");
  const parse = (res) => {
    const line = (res.stdout || "").split(/\r?\n/).find((l) => l.startsWith("GOLDBOX "));
    if (!line) return null;
    const data = JSON.parse(line.slice("GOLDBOX ".length));
    writeFileSync(join(outDir, `${kstDate}-collect.json`), JSON.stringify(data, null, 1));
    return data;
  };
  // 2026-10-25 Scott 결정: 작업용 크롬(D:/browser-profiles/work-nologin)을 먼저 쓰고, 실패하면 Aside(백업)로 한다.
  for (let attempt = 1; attempt <= 2; attempt++) {
    const res = spawnSync(process.execPath, [join(root, "scripts/browser/chrome-repl.mjs"), "--profile", "work-nologin", "--file", script], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024, timeout: 360_000 });
    const data = parse(res);
    if (data) { console.log("수집: 크롬"); return data; }
    console.log(`크롬 수집 실패(${attempt}회): ${(res.stderr || res.error?.message || "").slice(0, 300)}`);
  }
  // Aside: PC를 켠 직후에는 데몬 연결 전이라 "is not connected to the daemon"·ETIMEDOUT으로 실패했다(2026-10-25). 2분씩 기다리며 4번까지.
  for (let attempt = 1; attempt <= 4; attempt++) {
    if (attempt > 1) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 120_000);
    const res = spawnSync(aside, ["repl", code], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024, timeout: 300_000 });
    const data = parse(res);
    if (data) { console.log("수집: Aside(백업)"); return data; }
    console.log(`Aside 수집 실패(${attempt}회): ${(res.stderr || res.error?.message || "").slice(0, 300)}`);
  }
  throw new Error("골드박스 수집 실패");
}

// ---------- 2. match ----------
const norm = (s) => String(s || "").toLowerCase().replace(/[\s·,()[\]\-_/+]/g, "");

function loadProducts() {
  const all = [];
  for (const category of CATEGORIES) {
    const list = JSON.parse(readFileSync(join(root, `app/data/${category}ProductsData.json`), "utf-8"));
    for (const p of list) all.push({ ...p, category });
  }
  return all;
}

function capacityOf(p) {
  const m = String(p.capacity || "").match(/(\d+(?:\.\d+)?)\s*(ml|g|l)\b/i);
  return m ? { n: m[1], unit: m[2].toLowerCase() } : null;
}

// 카테고리 단어. 묶음 총중량("600g, 1개" = 50g×12)이나 구분 단어가 없는 제품을 맞출 때 반드시 함께 있어야 한다.
// 바는 "바나나"와 헷갈리지 않게 "단백질바/프로틴바/bar"만 본다(하이뮨 분말 608g이 38g 바의 16배로 잡히는 것 방지).
const CATEGORY_WORD = {
  bar: /(단백질|프로틴|protein)\s?바(?!나)|bar/i,
  drink: /음료|드링크|프로틴|단백질/,
  shake: /쉐이크|셰이크/,
  yogurt: /요거트|요구르트/,
  soymilk: /두유/,
};

/** "exact"(용량 같음) · "multiple"(묶음 총용량이 낱개의 정수배, 카테고리 단어 필요) · null */
function capacityMatch(title, p) {
  const cap = capacityOf(p);
  if (!cap) return null;
  const unit = cap.unit === "ml" ? "m[lL]" : cap.unit;
  if (new RegExp(`(^|[^\d.])${cap.n.replace(".", "\.")}\s*${unit}(?![a-zA-Z])`, "i").test(title)) return "exact";
  if (!CATEGORY_WORD[p.category]?.test(title)) return null;
  for (const m of title.matchAll(/(\d+(?:\.\d+)?)\s*(ml|g|l)(?![a-zA-Z])/gi)) {
    if (m[2].toLowerCase() !== cap.unit) continue;
    const ratio = Number(m[1]) / Number(cap.n);
    if (Number.isInteger(ratio) && ratio >= 2 && ratio <= 60) return "multiple";
  }
  return null;
}

function tokensOf(p) {
  const brand = norm(p.brand);
  const raw = `${p.name} ${p.flavor || ""}`.split(/[\s()[\],·/+]+/);
  const out = new Set();
  for (const t of raw) {
    let k = norm(t);
    if (!k || k.length < 2) continue;
    if (brand && k.startsWith(brand)) k = k.slice(brand.length);
    if (!k || k.length < 2 || GENERIC.has(k)) continue;
    if (/^\d+(\.\d+)?(ml|g|l|kcal)?$/.test(k)) continue;
    out.add(k);
  }
  return [...out];
}

function pidOf(p) {
  return p._pid || (String(p.coupangUrl || "").match(/\/vp\/products\/(\d+)/) || [])[1] || null;
}

// 단축 링크(link.coupang.com/a/...)가 가리키는 쿠팡 상품 ID를 알아내 캐시한다(2026-10-23).
// 약콩두유 오리지널은 상품 ID가 같았는데 제목에 브랜드가 없어 놓쳤고, 완전두유 "검은콩 검은참깨 고칼슘"은 ID가 다른 제품인데 이름 단어만으로 맞춰졌다.
async function resolveShortLinkPids(products) {
  const cacheFile = join(outDir, "shortlink-pids.json");
  const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, "utf-8")) : {};
  const todo = [...new Set(products.map((p) => p.coupangUrl).filter((u) => /link\.coupang\.com\/a\//.test(u || "") && !(u in cache)))];
  for (let i = 0; i < todo.length; i += 5) {
    await Promise.all(todo.slice(i, i + 5).map(async (u) => {
      try {
        const r = await fetch(u, { redirect: "manual", headers: { "User-Agent": "Mozilla/5.0" } });
        cache[u] = (String(r.headers.get("location") || "").match(/products\/(\d+)/) || [])[1] || null;
      } catch { /* 다음 실행에서 다시 시도 */ }
    }));
  }
  if (todo.length) writeFileSync(cacheFile, JSON.stringify(cache, null, 1));
  for (const p of products) if (cache[p.coupangUrl]) p._pid = cache[p.coupangUrl];
  return products;
}

function cardTitle(text) {
  // "12:15:08남음 셀렉스식물성 ... 190ml 48,900원 ..." → 타이머 뒤부터 첫 가격 앞까지
  return text
    .replace(/^.*?\d{1,2}:\d{2}:\d{2}\s*남음\s*/, "")
    .replace(/^(무료배송|얼마 남지 않았어요!)\s*/g, "")
    // 첫 가격(…원) 앞에서 자른 뒤 끝에 남은 할인율만 지운다. 제품명 속 "99%"(연세두유 국산약콩 99%)는 남긴다(2026-10-21).
    .replace(/\s[\d,]+원.*$/, "")
    .replace(/\s\d+\s?%$/, "")
    .trim();
}

function remainingMs(text) {
  const m = text.match(/(\d{1,2}):(\d{2}):(\d{2})\s*남음/);
  return m ? ((+m[1] * 60 + +m[2]) * 60 + +m[3]) * 1000 : null;
}

function packCount(title) {
  const m = title.match(/(\d+)\s*개(?!입)/g);
  return m ? m.map((x) => +x.replace(/\D/g, "")).sort((a, b) => b - a)[0] : null;
}

function match(items, products) {
  const matched = [];
  const review = [];
  for (const it of items) {
    if (/한정 수량 마감/.test(it.text)) continue;
    const title = cardTitle(it.text);
    const nt = norm(title);
    let best = null;
    const partial = [];
    for (const p of products) {
      // 쿠팡 상품 ID 하나에 여러 용량 옵션이 묶인다(그릭데이 라이트 100g·800g 페이지에 450g 특가). 제목 용량이 다르면 ID만으로 맞추지 않는다(2026-10-22).
      const titleHasCap = /\d\s*(ml|g|l)(?![a-zA-Z])/i.test(title);
      if (pidOf(p) && pidOf(p) === it.pid) {
        if (!titleHasCap || capacityMatch(title, p)) { best = { p, toks: Infinity, via: "coupang-product-id" }; break; }
        partial.push({ slug: p.slug, name: `${p.brand} ${p.name} ${p.capacity || ""}`.trim(), capOk: false, missing: ["같은 쿠팡 상품 ID, 용량 다름"] });
      }
      const brand = norm(p.brand);
      if (!brand || !nt.includes(brand)) continue;
      const capKind = capacityMatch(title, p);
      const capOk = !!capKind;
      const toks = tokensOf(p);
      const hit = toks.filter((t) => nt.includes(t) || (t.endsWith("맛") && nt.includes(t.slice(0, -1))));
      // 구분 단어가 없는 제품(곰곰 "단백질바 50g")은 카테고리 단어가 있고, 같은 브랜드·카테고리의 다른 제품을 가르는 단어(곰곰 "미니")가
      // 제목에 하나도 없을 때만 맞춘다(2026-10-21).
      const catWord = !!CATEGORY_WORD[p.category]?.test(title);
      const onlyOne = !toks.length && catWord &&
        products.every((q) => q === p || q.category !== p.category || q.brand !== p.brand || tokensOf(q).some((t) => !nt.includes(t)));
      // 우리 링크의 쿠팡 상품 ID를 아는데 특가 상품 ID와 다르면 이름이 맞아도 자동 등록하지 않는다(완전두유 검은콩 고칼슘 ≠ 검은콩 검은참깨 고칼슘, 2026-10-23).
      const otherPid = !!(pidOf(p) && it.pid && pidOf(p) !== it.pid);
      if (otherPid && capOk && ((toks.length && hit.length === toks.length) || onlyOne)) {
        partial.push({ slug: p.slug, name: `${p.brand} ${p.name} ${p.capacity || ""}`.trim(), capOk, missing: ["이름은 맞지만 쿠팡 상품 ID가 다름"] });
      } else if (capOk && ((toks.length && hit.length === toks.length) || onlyOne)) {
        const via = `brand+capacity${capKind === "multiple" ? "(묶음)" : ""}+${onlyOne ? "단일제품" : "name"}`;
        if (!best || toks.length > best.toks) best = { p, toks: toks.length, via };
        else if (toks.length === best.toks) best.tie = true;
      } else if (catWord && (capOk || !toks.length || hit.length / toks.length >= 0.5)) {
        partial.push({ slug: p.slug, name: `${p.brand} ${p.name} ${p.capacity || ""}`.trim(), capOk, missing: toks.filter((t) => !hit.includes(t)) });
      }
    }
    if (best && !best.tie) matched.push({ item: it, title, product: best.p, via: best.via });
    else if ((best?.tie || partial.length) && !review.some((r) => r.pid === it.pid)) review.push({ pid: it.pid, title, tie: !!best?.tie, candidates: partial.slice(0, 5) });
  }
  return { matched, review };
}

/** "190mL × 24개" 또는 묶음 총중량일 때 "600g(50g × 12개)" */
function packLabel(title, product, count) {
  const cap = capacityOf(product);
  if (cap) {
    for (const m of title.matchAll(/(\d+(?:\.\d+)?)\s*(ml|g|l)(?![a-zA-Z])/gi)) {
      const ratio = Number(m[1]) / Number(cap.n);
      if (m[2].toLowerCase() === cap.unit && Number.isInteger(ratio) && ratio >= 2) return `${m[1]}${m[2]}(${product.capacity} × ${ratio}개)`;
    }
  }
  return product.capacity && count > 1 ? `${product.capacity} × ${count}개` : product.capacity;
}

function toOffer({ item, title, product }) {
  const rem = remainingMs(item.text);
  // 골드박스는 매일 07:00에 바뀐다. 카드 타이머로 종료 시각을 계산하고 10분 단위로 맞춘다. 타이머가 없으면 다음 07:00.
  let end;
  // 타이머는 수집 시각 기준이다(--from 으로 나중에 다시 돌려도 종료 시각이 밀리지 않게).
  if (rem) end = new Date(Math.round((Date.parse(collectedAt) + rem) / 600_000) * 600_000);
  else {
    const kst = new Date(now.getTime() + 9 * 3600_000);
    end = new Date(Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate() + (kst.getUTCHours() >= 7 ? 1 : 0), 7 - 9));
  }
  const count = packCount(title);
  const params = new URLSearchParams({ pageKey: item.pid, itemId: item.itemId || "", vendorItemId: item.vendorItemId || "", category: product.category, slug: product.slug });
  return {
    slug: product.slug,
    offerName: [packLabel(title, product, count), "골드박스 특가", "쿠팡 확인"].filter(Boolean).join(" · "),
    price: 0,
    href: `/api/out/coupang?${params.toString()}`,
    source: "coupang_web",
    verifiedAt: now.toISOString(),
    startsAt: now.toISOString(),
    expiresAt: end.toISOString(),
  };
}

// ---------- 4. write ----------
function wrangler(argv) {
  // npx + shell:true 는 Node 경고(DEP0190)가 나서 wrangler 진입 스크립트를 node로 직접 실행한다. 인자 따옴표도 필요 없다.
  const res = spawnSync(process.execPath, [join(root, "node_modules/wrangler/bin/wrangler.js"), ...argv], { cwd: root, encoding: "utf-8", maxBuffer: 16 * 1024 * 1024, timeout: 180_000 });
  return { ok: res.status === 0, out: (res.stdout || "").trim(), err: (res.stderr || "").trim() };
}

function readKvOffers() {
  const r = wrangler(["kv", "key", "get", KV_KEY, `--namespace-id=${KV_NAMESPACE_ID}`, "--remote", "--text"]);
  if (!r.ok) {
    if (/not found/i.test(r.out + r.err)) return [];
    throw new Error("KV 읽기 실패: " + r.err.slice(0, 300));
  }
  const start = r.out.indexOf("[");
  if (start < 0) return [];
  const parsed = JSON.parse(r.out.slice(start, r.out.lastIndexOf("]") + 1));
  return Array.isArray(parsed) ? parsed : [];
}

function writeKvOffers(list) {
  const file = join(outDir, `${kstDate}-kv.json`);
  writeFileSync(file, JSON.stringify(list));
  const r = wrangler(["kv", "key", "put", KV_KEY, `--path=${file}`, `--namespace-id=${KV_NAMESPACE_ID}`, "--remote"]);
  if (!r.ok) throw new Error("KV 쓰기 실패: " + r.err.slice(0, 300));
}

// ---------- run ----------
const data = collect();
const collectedAt = data.collectedAt || now.toISOString();
const items = Object.values(data.tabs || {}).filter(Array.isArray).flat();
const { matched, review } = match(items, await resolveShortLinkPids(loadProducts()));
const offers = matched.map(toOffer);
writeFileSync(join(outDir, `${kstDate}-offers.json`), JSON.stringify(offers, null, 1));

const report = {
  date: kstDate,
  collectedAt: data.collectedAt,
  tabs: Object.fromEntries(Object.entries(data.tabs || {}).map(([k, v]) => [k, Array.isArray(v) ? v.length : "탭 없음"])),
  matched: matched.map((m, i) => ({ slug: m.product.slug, title: m.title, via: m.via, expiresAt: offers[i].expiresAt })),
  review,
};
let kvResult = "기록 안 함(--write 없음)";
if (write) {
  if (!items.length) kvResult = "수집 0건 — KV 미변경";
  else if (!offers.length) kvResult = "일치 제품 없음 — KV 미변경";
  else {
    try {
      const keep = readKvOffers().filter((o) => o && Date.parse(o.expiresAt) > now.getTime() && !offers.some((n) => n.slug === o.slug));
      writeKvOffers([...keep, ...offers]);
      kvResult = `기록 ${offers.length}건(기존 유지 ${keep.length}건)`;
    } catch (e) {
      kvResult = "실패 — " + e.message;
      process.exitCode = 1;
    }
  }
}
report.kv = kvResult;
writeFileSync(join(outDir, `${kstDate}.json`), JSON.stringify(report, null, 1));

const lines = [
  `골드박스 점검 ${kstDate} (수집 ${data.collectedAt})`,
  `수집: ${Object.entries(report.tabs).map(([k, v]) => `${k} ${v}`).join(", ")}${items.length ? "" : " — 0건, 페이지 구조 변경 의심"}`,
  `일치: ${report.matched.length ? report.matched.map((m) => `${m.slug} [${m.via}] ~${m.expiresAt}`).join(", ") : "없음"}`,
  `KV: ${kvResult}`,
  `확인 필요: ${review.length ? "" : "없음"}`,
  ...review.map((r) => `  - ${r.title} [${r.pid}] → ${r.tie ? "동률 후보 여러 개" : r.candidates.map((c) => `${c.slug}${c.capOk ? "" : "(용량 다름)"}${c.missing.length ? ` 빠짐:${c.missing.join("/")}` : ""}`).join("; ")}`),
];
writeFileSync(join(outDir, "latest.txt"), lines.join("\n") + "\n");
console.log(lines.join("\n"));

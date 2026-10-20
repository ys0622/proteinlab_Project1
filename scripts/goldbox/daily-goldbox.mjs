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
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
const GENERIC = new Set(["프로틴", "단백질", "음료", "드링크", "고단백", "쉐이크", "단백질바", "프로틴바", "요거트", "두유", "protein"]);

const outDir = join(root, ".goldbox-auto");
mkdirSync(outDir, { recursive: true });
const now = new Date();
const kstDate = new Date(now.getTime() + 9 * 3600_000).toISOString().slice(0, 10);

// ---------- 1. collect ----------
function collect() {
  if (fromFile) return JSON.parse(readFileSync(fromFile, "utf-8"));
  const code = readFileSync(join(root, "scripts/goldbox/collect-web-goldbox.aside.js"), "utf-8");
  const aside = join(process.env.LOCALAPPDATA, "Aside/CLI/current/aside.exe");
  for (let attempt = 1; attempt <= 2; attempt++) {
    const res = spawnSync(aside, ["repl", code], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024, timeout: 300_000 });
    const line = (res.stdout || "").split(/\r?\n/).find((l) => l.startsWith("GOLDBOX "));
    if (line) {
      const data = JSON.parse(line.slice("GOLDBOX ".length));
      writeFileSync(join(outDir, `${kstDate}-collect.json`), JSON.stringify(data, null, 1));
      return data;
    }
    console.log(`수집 실패(${attempt}회): ${(res.stderr || res.error?.message || "").slice(0, 300)}`);
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

function titleHasCapacity(title, cap) {
  if (!cap) return false;
  const unit = cap.unit === "ml" ? "m[lL]" : cap.unit;
  return new RegExp(`(^|[^\\d.])${cap.n.replace(".", "\\.")}\\s*${unit}(?![a-zA-Z])`, "i").test(title);
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
  return (String(p.coupangUrl || "").match(/\/vp\/products\/(\d+)/) || [])[1] || null;
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
      if (pidOf(p) && pidOf(p) === it.pid) { best = { p, toks: Infinity, via: "coupang-product-id" }; break; }
      const brand = norm(p.brand);
      if (!brand || !nt.includes(brand)) continue;
      const capOk = titleHasCapacity(title, capacityOf(p));
      const toks = tokensOf(p);
      const hit = toks.filter((t) => nt.includes(t) || (t.endsWith("맛") && nt.includes(t.slice(0, -1))));
      if (capOk && toks.length && hit.length === toks.length) {
        if (!best || toks.length > best.toks) best = { p, toks: toks.length, via: "brand+capacity+name" };
        else if (toks.length === best.toks) best.tie = true;
      } else if (capOk || (toks.length && hit.length / toks.length >= 0.5)) {
        partial.push({ slug: p.slug, name: `${p.brand} ${p.name} ${p.capacity || ""}`.trim(), capOk, missing: toks.filter((t) => !hit.includes(t)) });
      }
    }
    if (best && !best.tie) matched.push({ item: it, title, product: best.p, via: best.via });
    else if (best?.tie || partial.length) review.push({ pid: it.pid, title, tie: !!best?.tie, candidates: partial.slice(0, 5) });
  }
  return { matched, review };
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
    offerName: [product.capacity && count > 1 ? `${product.capacity} × ${count}개` : product.capacity, "골드박스 특가", "쿠팡 확인"].filter(Boolean).join(" · "),
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
  const res = spawnSync("npx", ["wrangler", ...argv], { cwd: root, encoding: "utf-8", shell: true, maxBuffer: 16 * 1024 * 1024, timeout: 180_000 });
  return { ok: res.status === 0, out: (res.stdout || "").trim(), err: (res.stderr || "").trim() };
}

function readKvOffers() {
  const r = wrangler(["kv", "key", "get", `"${KV_KEY}"`, `--namespace-id=${KV_NAMESPACE_ID}`, "--remote", "--text"]);
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
  const r = wrangler(["kv", "key", "put", `"${KV_KEY}"`, `--path="${file}"`, `--namespace-id=${KV_NAMESPACE_ID}`, "--remote"]);
  if (!r.ok) throw new Error("KV 쓰기 실패: " + r.err.slice(0, 300));
}

// ---------- run ----------
const data = collect();
const collectedAt = data.collectedAt || now.toISOString();
const items = Object.values(data.tabs || {}).filter(Array.isArray).flat();
const { matched, review } = match(items, loadProducts());
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

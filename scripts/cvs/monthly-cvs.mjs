// 편의점 단백질 1+1·2+1 행사 자동 갱신(2026-11-28 Scott: "자동으로 업데이트 될 수 있게").
// Windows 작업 "ProteinLab CVS Deals Daily"가 매일 scripts/cvs/run-cvs.cmd로 부른다.
// 1) 작업용 크롬(work-nologin)으로 CU·세븐일레븐 공식 행사 목록 수집(collect.repl.js)
// 2) scripts/cvs/aliases.json 의 상품명→slug 대조표로 우리 제품만 고른다(대조표에 없는 이름은 등록하지 않고 '확인 필요'로 보고)
// 3) --write 면 KV `cvs-deals:v1`에 기록(배포 불필요). 편의점 단백질 가이드의 #cvs-deals 칸이 이 값을 읽는다.
// 결과 .cvs-auto/latest.txt, 원자료 .cvs-auto/<날짜>-collect.json.
// 사용: node scripts/cvs/monthly-cvs.mjs [--write] [--from <collect.json>]
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const write = args.includes("--write");
const fromIdx = args.indexOf("--from");
const outDir = join(root, ".cvs-auto");
mkdirSync(outDir, { recursive: true });

const KV_NAMESPACE_ID = "cb0554d5dbaf413d8fe971f91d1d968c"; // GUIDES_STATIC_DRAFTS_KV (wrangler.jsonc)
const KV_KEY = "cvs-deals:v1";
const MIN_ITEMS = 10; // 이보다 적게 맞으면 수집이 깨진 것으로 보고 기록하지 않는다

// 한국 시간 기준 오늘·이달 마지막 날
const kst = new Date(Date.now() + 9 * 3600_000);
const y = kst.getUTCFullYear();
const mo = kst.getUTCMonth() + 1;
const day = kst.getUTCDate();
const today = `${y}-${String(mo).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
const lastDay = new Date(Date.UTC(y, mo, 0)).getUTCDate();
const validUntil = new Date(Date.UTC(y, mo - 1, lastDay, 23 - 9, 59, 59)).toISOString(); // 말일 23:59:59 KST

function wrangler(argv) {
  return spawnSync(process.execPath, [join(root, "node_modules/wrangler/bin/wrangler.js"), ...argv], {
    cwd: root,
    encoding: "utf-8",
    maxBuffer: 16 * 1024 * 1024,
    timeout: 180_000,
  });
}

// 1) 수집
let collected;
if (fromIdx >= 0) {
  collected = JSON.parse(readFileSync(args[fromIdx + 1], "utf-8"));
} else {
  const res = spawnSync(
    process.execPath,
    [join(root, "scripts/browser/chrome-repl.mjs"), "--profile", "work-nologin", "--file", join(root, "scripts/cvs/collect.repl.js")],
    { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024, timeout: 420_000 },
  );
  const line = (res.stdout || "").split(/\r?\n/).find((l) => l.startsWith("CVS_JSON:"));
  if (!line) {
    const msg = `${today} 수집 실패: ${(res.stderr || res.stdout || "").slice(-400)}`;
    writeFileSync(join(outDir, "latest.txt"), msg + "\n");
    console.error(msg);
    process.exit(1);
  }
  collected = JSON.parse(line.slice("CVS_JSON:".length));
  writeFileSync(join(outDir, `${today}-collect.json`), JSON.stringify(collected, null, 1));
}

// 2) 대조
const { alias, ignore } = JSON.parse(readFileSync(join(root, "scripts/cvs/aliases.json"), "utf-8"));
const ignored = new Set(ignore);
const GROUP_OF = { drink: "drink", bar: "bar-shake", shake: "bar-shake", yogurt: "yogurt", soymilk: "soymilk" };
const GROUP_TITLE = { drink: "단백질 음료", "bar-shake": "단백질 바·쉐이크", yogurt: "그릭요거트", soymilk: "고단백 두유" };
const groupOfSlug = {};
for (const cat of Object.keys(GROUP_OF)) {
  for (const p of JSON.parse(readFileSync(join(root, `app/data/${cat}ProductsData.json`), "utf-8"))) groupOfSlug[p.slug] = GROUP_OF[cat];
}

const price = (s) => Number(String(s).replace(/[^0-9]/g, "")) || 0;
const dealType = (s) => (/2\+1/.test(s) ? "2+1" : /1\+1/.test(s) ? "1+1" : null);
const raw = [
  ...(collected.cu?.res || []).map((x) => ({ key: `CU|${x.name}`, store: "CU", type: dealType(x.badge), price: price(x.price), storeName: x.name })),
  ...(collected.seven?.res || []).map((x) => ({ key: `7|${x.name}`, store: "세븐일레븐", type: dealType(x.type), price: price(x.price), storeName: x.name })),
];

const bySlug = new Map();
const unknown = [];
const missingSlug = [];
for (const r of raw) {
  if (!r.type || !r.price) continue;
  const slug = alias[r.key];
  if (!slug) {
    if (!ignored.has(r.key)) unknown.push(r);
    continue;
  }
  if (!groupOfSlug[slug]) {
    missingSlug.push(`${r.key} → ${slug}`);
    continue;
  }
  const item = bySlug.get(slug) || { slug, offers: [] };
  if (!item.offers.some((o) => o.store === r.store)) item.offers.push({ store: r.store, type: r.type, price: r.price, storeName: r.storeName });
  bySlug.set(slug, item);
}

const order = ["drink", "bar-shake", "yogurt", "soymilk"];
const groups = order
  .map((key) => ({ key, title: GROUP_TITLE[key], items: [...bySlug.values()].filter((i) => groupOfSlug[i.slug] === key) }))
  .filter((g) => g.items.length);
const total = groups.reduce((n, g) => n + g.items.length, 0);
const signature = JSON.stringify(groups);

const payload = {
  month: `${y}년 ${mo}월`,
  checkedAt: today,
  until: `${mo}월 ${lastDay}일까지`,
  // --show-from <ISO>: 그 시각부터 보이게(처음 넣을 때 지난달 기준값만 심어 두는 용도)
  showFrom: args.includes("--show-from") ? args[args.indexOf("--show-from") + 1] : new Date().toISOString(),
  validUntil,
  stores: { cu: collected.cu?.total ?? 0, seven: collected.seven?.totals ?? {} },
  groups,
};

// 3) 기록
let status = "기록 안 함(--write 없음)";
if (write) {
  const prevRes = wrangler(["kv", "key", "get", KV_KEY, `--namespace-id=${KV_NAMESPACE_ID}`, "--remote", "--text"]);
  let prev = null;
  try {
    prev = JSON.parse(prevRes.stdout);
  } catch {
    prev = null;
  }
  const prevMonth = prev?.month;
  if (total < MIN_ITEMS) {
    status = `기록 안 함: 맞은 제품 ${total}개(${MIN_ITEMS}개 미만, 수집 오류 의심)`;
  } else if (prev && prevMonth !== payload.month && JSON.stringify(prev.groups) === signature) {
    // 월초에 편의점 목록이 아직 지난달 그대로면 이달 행사로 잘못 표시하지 않는다(지난달 값은 말일에 만료돼 칸이 숨는다)
    status = `기록 안 함: 목록이 ${prevMonth}과 똑같음(편의점이 아직 이달 행사로 안 바꿈)`;
  } else {
    const file = join(outDir, "kv-payload.json");
    writeFileSync(file, JSON.stringify(payload));
    const put = wrangler(["kv", "key", "put", KV_KEY, `--path=${file}`, `--namespace-id=${KV_NAMESPACE_ID}`, "--remote"]);
    status = put.status === 0 ? `KV 기록 완료(${payload.month}, ${total}개)` : `KV 기록 실패: ${(put.stderr || put.stdout).slice(-300)}`;
  }
}

const lines = [
  `편의점 단백질 행사 ${today} — ${payload.month} · 우리 제품 ${total}개 (${groups.map((g) => `${g.title} ${g.items.length}`).join(", ")})`,
  `수집: CU ${payload.stores.cu}개, 세븐일레븐 1+1 ${payload.stores.seven["1+1"] ?? 0}·2+1 ${payload.stores.seven["2+1"] ?? 0}개${collected.errors?.length ? ` · 오류: ${collected.errors.join(" / ")}` : ""}`,
  `상태: ${status}`,
  "",
  `확인 필요(대조표에 없는 단백질 관련 이름 ${unknown.length}개, 등록 안 함 — 같은 제품이면 scripts/cvs/aliases.json alias에, 아니면 ignore에 넣는다):`,
  ...unknown.map((u) => `  ${u.key}  ${u.type} ${u.price}원`),
  ...(missingSlug.length ? ["", "대조표 slug가 데이터에 없음:", ...missingSlug.map((s) => `  ${s}`)] : []),
];
writeFileSync(join(outDir, "latest.txt"), lines.join("\n") + "\n");
console.log(lines.join("\n"));

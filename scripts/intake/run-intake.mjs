/**
 * 쿠팡 상품 페이지 → 등록 재료 자동 준비(사진·성분표·수치·쿠팡 상품 ID).
 *
 * 사용법:
 *   node scripts/intake/run-intake.mjs <후보.json> [--ids B1,B2] [--force]
 *   후보.json: [{ id, category?, brand, name, capacity, url }]  (category 기본값: bar)
 *
 * 단계(제품별 폴더 inbox/intake/<id>/ 에 결과를 남기고, 있으면 건너뛴다):
 *   1. collect  aside repl 로 상품 페이지를 열어 제목·productId·itemId·vendorItemId·대표/상세 이미지 주소 수집 → meta.json
 *   2. download 대표 사진 원본(1000px)과 상세 이미지 → img/
 *   3. gemini   Antigravity CLI(Gemini)가 낱개 사진·성분표 위치와 수치를 판독 → gemini.json
 *   4. crop     성분표 잘라내기 → spec.png, 낱개 사진 잘라내기 + 배경 제거(cutout.py) → product.png
 *   5. preview  inbox/intake/preview.html (사람 확인용)
 *
 * 쿠팡 링크는 https://www.coupang.com/vp/products/<productId>?itemId=..&vendorItemId=.. 형태로 만든다.
 * 이 주소는 /api/out/coupang 이 파트너스 딥링크(subId=proteinlab)로 바꿔 준다.
 * 등록(데이터 반영)은 이 스크립트가 하지 않는다. 미리보기를 사람이 확인한 뒤 따로 한다.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { execFileSync, spawnSync } from "child_process";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const outRoot = resolve(root, "inbox/intake");
const args = process.argv.slice(2);
const listPath = args.find((a) => !a.startsWith("--"));
const idsArg = args.includes("--ids") ? args[args.indexOf("--ids") + 1] : null;
const force = args.includes("--force");
if (!listPath) {
  console.error("사용법: node scripts/intake/run-intake.mjs <후보.json> [--ids B1,B2] [--force]");
  process.exit(1);
}

const categories = new Set(["drink", "bar", "shake", "yogurt", "soymilk", "powder"]);
const all = JSON.parse(readFileSync(resolve(root, listPath), "utf-8")).map((item) => ({ ...item, category: item.category ?? "bar" }));
for (const item of all) if (!categories.has(item.category)) throw new Error(`${item.id}: 지원하지 않는 category '${item.category}'`);
const wanted = idsArg ? new Set(idsArg.split(",")) : null;
const items = all.filter((x) => !wanted || wanted.has(x.id));
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";
const save = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + "\n", "utf-8");
const load = (p) => JSON.parse(readFileSync(p, "utf-8"));
const dirOf = (it) => join(outRoot, it.id);

function findAgy() {
  const base = join(process.env.LOCALAPPDATA, "Microsoft/WinGet/Packages");
  const pkg = readdirSync(base).find((d) => d.startsWith("Google.AntigravityCLI"));
  if (!pkg) throw new Error("Antigravity CLI(agy)를 찾지 못했다");
  return join(base, pkg, "agy.exe");
}

// 1. collect
function collect(todo) {
  // 한 번에 많이 넣으면 aside repl 이 결과 없이 끝난 적이 있어 4개씩 나눠 돈다.
  for (let i = 0; i < todo.length; i += 4) collectBatch(todo.slice(i, i + 4));
}

function collectBatch(todo) {
  if (!todo.length) return;
  const tpl = readFileSync(resolve(root, "scripts/intake/collect-coupang.aside.js"), "utf-8");
  const code = tpl.replace("__ITEMS__", JSON.stringify(todo.map(({ id, url }) => ({ id, url }))));
  const res = spawnSync(join(process.env.LOCALAPPDATA, "Aside/CLI/current/aside.exe"), ["repl", code], { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024, timeout: 60_000 * (2 + todo.length) });
  const lines = (res.stdout || "").split(/\r?\n/).filter((l) => l.startsWith("RESULT "));
  if (!lines.length) console.error(`collect 결과 없음 (${todo.map((x) => x.id).join(",")}): status=${res.status} ${res.error ? res.error.message : ""} ${(res.stdout || "").slice(-300)} ${(res.stderr || "").slice(-300)}`);
  for (const line of lines) {
    const r = JSON.parse(line.slice(7));
    const it = todo.find((x) => x.id === r.id);
    mkdirSync(dirOf(it), { recursive: true });
    save(join(dirOf(it), "meta.json"), r);
    console.log(`collect ${r.id}: ${r.error ? "실패 " + r.error : `${r.itemId ? "ID 확인" : "ID 없음"}, 상세 ${r.detail.length}장`}`);
  }
}

// 2. download
async function download(it) {
  const dir = dirOf(it);
  const meta = load(join(dir, "meta.json"));
  const imgDir = join(dir, "img");
  if (existsSync(imgDir) && !force) return;
  mkdirSync(imgDir, { recursive: true });
  const urls = [];
  if (meta.main) urls.push(["main", meta.main.replace(/https:\/\/thumbnail\.coupangcdn\.com\/thumbnails\/remote\/[^/]+\//, "https://image1.coupangcdn.com/")]);
  meta.detail.forEach((u, i) => urls.push([`d${i + 1}`, u]));
  for (const [name, url] of urls) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(imgDir, `${name}.jpg`), buf);
  }
}

// 3. gemini
async function gemini(it) {
  const dir = dirOf(it);
  const outPath = join(dir, "gemini.json");
  if (existsSync(outPath) && !force) return;
  const imgDir = join(dir, "img");
  const files = readdirSync(imgDir).filter((f) => f.endsWith(".jpg")).sort((a, b) => (a === "main.jpg" ? -1 : b === "main.jpg" ? 1 : a.localeCompare(b, undefined, { numeric: true })));
  const lines = [];
  for (const f of files) {
    const m = await sharp(join(imgDir, f)).metadata();
    lines.push(`- ${join(imgDir, f).replace(/\\/g, "/")} (${m.width}x${m.height})`);
  }
  const meta = load(join(dir, "meta.json"));
  const unitLabel = { drink: "1팩/1병", bar: "1개", shake: "1회 제공량", yogurt: "1개(용량 전체)", soymilk: "1팩/1병", powder: "1회 제공량(1스쿱)" }[it.category];
  const prompt = `너는 식품 상세페이지 이미지 분석기다. **셸/터미널 명령 실행 금지, 파일 수정 금지. 이미지는 파일 보기 도구로만 연다.**
등록하려는 제품: ${it.brand} ${it.name} (${unitLabel} ${it.capacity})
쿠팡 상품명: ${meta.title}
아래 이미지(대표 사진 main.jpg와 상세 이미지들)를 모두 열어 보고 JSON 하나만 출력하라(코드블록·설명 없이).
${lines.join("\n")}
출력 형식:
{"title_matches":true,"title_note":"쿠팡 상품명의 맛·용량이 등록하려는 제품과 같은지","product_image":"파일명","product_bbox_px":[x0,y0,x1,y1],"spec_image":"파일명 또는 null","spec_bbox_px":[x0,y0,x1,y1],"spec_language":"ko|en|other","nutrition_per_unit":{"basis":"${unitLabel} ${it.capacity} 등","kcal":null,"protein_g":null,"carbs_g":null,"sugar_g":null,"fat_g":null,"sat_fat_g":null,"trans_fat_g":null,"cholesterol_mg":null,"sodium_mg":null,"fiber_g":null},"note":"짧게"}
규칙:
- product_image는 반드시 main.jpg(쿠팡 대표 사진)를 먼저 확인한다. main.jpg에 이 맛의 낱개 포장이 통째로 보이고 포장 전체 윤곽을 식별할 수 있으면, 다른 물체와 일부 겹쳐도 **무조건 main.jpg**를 고른다.
- 상세 이미지는 main.jpg에 낱개 포장이 전혀 없거나 포장 전체 윤곽을 식별할 수 없을 때만 고른다. 상세 이미지에서는 반드시 **제품 포장 전체가 한 번에 보이는 사진**만 허용한다. 글자 배너·제품명의 한 글자/문구·원료 사진·콩/견과류 사진·음식 연출 사진·성분표·포장 일부 확대는 product_image로 고르지 않는다.
- product_bbox_px: 선택한 이미지의 원본 픽셀 좌표로 낱개 제품 포장 전체 윤곽을 감싸고, 포장 가장자리 바깥으로 각 방향 약 3%의 여유를 둔 사각형. 포장 일부를 자르지 않는다.
- spec_image/spec_bbox_px: 영양정보 표 전체(제목·기준량 포함)를 감싸는 사각형. 한국어 영양정보 표가 있으면 그것을 우선한다.
- nutrition_per_unit: ${unitLabel} 기준 값. 표가 100g/100mL 기준만 있으면 등록 용량으로 환산하고 note에 적는다. 나트륨 대신 소금(salt)만 있으면 sodium_mg = salt_g × 400 으로 환산하고 note에 적는다.
- 읽을 수 없는 값은 null. 추측 금지.${it.category === "powder" ? `
- 파우더 통 제품이다(등록 용량 ${it.capacity}은 통 전체 중량). nutrition_per_unit은 표에 적힌 1회 제공량(1스쿱) 기준으로 읽고, basis에 1회 제공량 g을 적는다(예: "1회 제공량 30g"). 1회 제공량 기준 표가 없고 100g 기준만 있으면 100g 값 그대로 넣고 basis를 "100g"으로 적는다.
- JSON에 "powder":{"serving_g":null,"servings_per_container":null,"protein_source":"원재료명에서 단백질 원료(예: 분리유청단백질(WPI), 농축유청단백(WPC), 분리대두단백(ISP), 완두단백 등)를 많이 들어간 순서대로"} 를 추가한다.` : ""}`;
  const agy = findAgy();
  const out = execFileSync(agy, ["--model", "gemini-3.8-flash-high", "--mode", "plan", "--print-timeout", "800s", "-p", prompt], { encoding: "utf-8", cwd: root, maxBuffer: 16 * 1024 * 1024, timeout: 900_000 });
  const json = out.slice(out.indexOf("{"), out.lastIndexOf("}") + 1);
  save(outPath, JSON.parse(json));
}

// 4. crop
async function crop(it) {
  const dir = dirOf(it);
  const g = load(join(dir, "gemini.json"));
  const imgDir = join(dir, "img");
  const cut = async (file, box, padRatio) => {
    const src = join(imgDir, file);
    const { width, height } = await sharp(src).metadata();
    const [x0, y0, x1, y1] = box;
    const px = Math.round((x1 - x0) * padRatio);
    const py = Math.round((y1 - y0) * padRatio);
    const left = Math.max(0, x0 - px);
    const top = Math.max(0, y0 - py);
    return sharp(src).extract({ left, top, width: Math.min(width, x1 + px) - left, height: Math.min(height, y1 + py) - top });
  };
  const borderWhiteRatio = async (path) => {
    const { data, info } = await sharp(path).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const edge = Math.max(1, Math.min(3, Math.floor(Math.min(info.width, info.height) / 20)));
    let white = 0;
    let total = 0;
    for (let y = 0; y < info.height; y += 1) {
      for (let x = 0; x < info.width; x += 1) {
        if (x >= edge && x < info.width - edge && y >= edge && y < info.height - edge) continue;
        const i = (y * info.width + x) * info.channels;
        total += 1;
        if (data[i] >= 245 && data[i + 1] >= 245 && data[i + 2] >= 245) white += 1;
      }
    }
    return total ? white / total : 0;
  };
  const quality = async (path) => {
    const { data, info } = await sharp(path).flatten({ background: "#ffffff" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    let nonWhite = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      if (data[i] < 245 || data[i + 1] < 245 || data[i + 2] < 245) nonWhite += 1;
    }
    const nonWhiteRatio = nonWhite / (info.width * info.height);
    const reasons = [];
    if (Math.min(info.width, info.height) < 120) reasons.push("short-side-under-120px");
    if (nonWhiteRatio < 0.15) reasons.push("non-white-under-15-percent");
    return { ok: reasons.length === 0, width: info.width, height: info.height, non_white_ratio: Number(nonWhiteRatio.toFixed(4)), reasons };
  };
  if (g.spec_image && g.spec_bbox_px) {
    await (await cut(g.spec_image, g.spec_bbox_px, 0.03)).resize({ width: 900, withoutEnlargement: false }).png().toFile(join(dir, "spec.png"));
  }
  if (g.product_image && g.product_bbox_px) {
    const raw = join(dir, "product-raw.png");
    await (await cut(g.product_image, g.product_bbox_px, 0.04)).png().toFile(raw);
    const out = join(dir, "product.png");
    const whiteRatio = await borderWhiteRatio(raw);
    const mode = whiteRatio >= 0.8 ? "white-crop" : "cutout";
    if (mode === "white-crop") {
      const { data, info } = await sharp(raw).trim({ background: "#ffffff", threshold: 10 }).png().toBuffer({ resolveWithObject: true });
      const pad = Math.max(2, Math.round(Math.max(info.width, info.height) * 0.03));
      await sharp(data).extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#ffffff" }).png().toFile(out);
    } else {
      const r = spawnSync("python", [resolve(root, "scripts/intake/cutout.py"), raw, out], { encoding: "utf-8" });
      if (r.status !== 0) throw new Error(`cutout 실패: ${(r.stderr || "").slice(-300)}`);
    }
    // 상세 이미지에서 잘라낸 낱개 사진은 작다(가로 150px 안팎). 사이트 카드·상세에서 보이게 세로 900px까지 키운다.
    const m = await sharp(out).metadata();
    if (m.height < 900) {
      const buf = await sharp(out).resize({ width: 1600, height: 900, fit: "inside", withoutEnlargement: false, kernel: "lanczos3" }).sharpen({ sigma: 0.6 }).png().toBuffer();
      writeFileSync(out, buf);
    }
    const result = { mode, source: g.product_image, product_bbox_px: g.product_bbox_px, border_white_ratio: Number(whiteRatio.toFixed(4)), quality: await quality(out) };
    save(join(dir, "product-image.json"), result);
    console.log(`${it.id} product: ${mode}, white-border=${(whiteRatio * 100).toFixed(1)}%, ${result.quality.ok ? "OK" : "사진 다시 필요"}`);
  }
}

// 5. preview
function preview(list) {
  const rows = list.map((it) => {
    const dir = dirOf(it);
    const meta = existsSync(join(dir, "meta.json")) ? load(join(dir, "meta.json")) : {};
    const g = existsSync(join(dir, "gemini.json")) ? load(join(dir, "gemini.json")) : {};
    const product = existsSync(join(dir, "product-image.json")) ? load(join(dir, "product-image.json")) : null;
    const n = g.nutrition_per_unit || {};
    const idNote = meta.idSource === "first-offer" ? " <b class=\"warn\">(첫 판매 옵션으로 대체 — 옵션 확인 필요)</b>" : "";
    const link = meta.itemId ? `https://www.coupang.com/vp/products/${meta.productId}?itemId=${meta.itemId}&vendorItemId=${meta.vendorItemId}` : "(ID 없음)";
    const img = (f) => (existsSync(join(dir, f)) ? `<img src="${it.id}/${f}">` : "<em>없음</em>");
    const cell = (k, unit) => (n[k] == null ? "?" : `${n[k]}${unit}`);
    return `<section><h2>${it.id} ${it.brand} ${it.name} <small>[${it.category}] ${it.capacity}</small></h2>
<p class="t">쿠팡: ${meta.title || "?"} ${g.title_matches === false ? '<b class="warn">상품명 불일치: ' + (g.title_note || "") + "</b>" : ""}</p>
<div class="g"><div>${product && !product.quality?.ok ? '<strong class="photo-fail">사진 다시 필요</strong>' : ""}${img("product.png")}<small>${product ? `${product.mode} · ${product.quality.width}×${product.quality.height} · non-white ${(product.quality.non_white_ratio * 100).toFixed(1)}%` : "사진 판정 없음"}</small></div><div>${img("spec.png")}</div>
<table><tr><th>기준</th><td>${n.basis || "?"}</td></tr><tr><th>열량</th><td>${cell("kcal", "kcal")}</td></tr><tr><th>단백질</th><td>${cell("protein_g", "g")}</td></tr><tr><th>당류</th><td>${cell("sugar_g", "g")}</td></tr><tr><th>지방</th><td>${cell("fat_g", "g")}</td></tr><tr><th>나트륨</th><td>${cell("sodium_mg", "mg")}</td></tr><tr><th>후보표 값</th><td>${it.protein} / ${it.sugar} / ${it.kcal}</td></tr><tr><th>성분표 언어</th><td>${g.spec_language || "?"}</td></tr><tr><th>메모</th><td>${g.note || ""}</td></tr><tr><th>링크</th><td style="word-break:break-all">${link}${idNote}</td></tr></table></div></section>`;
  });
  const html = `<!doctype html><meta charset="utf-8"><title>등록 미리보기</title><style>body{font-family:sans-serif;margin:16px;background:#f6f4ef}section{background:#fff;border-radius:12px;padding:12px 16px;margin:0 0 16px}h2{font-size:17px;margin:0 0 4px}.t{font-size:12px;color:#666;margin:0 0 8px}.g{display:grid;grid-template-columns:220px 360px 1fr;gap:12px;align-items:start}.g img{max-width:100%;max-height:420px;border:1px solid #eee}.g small{display:block;color:#666}.photo-fail{display:block;background:#b40000;color:#fff;padding:6px;text-align:center}table{font-size:13px;border-collapse:collapse}th{text-align:left;padding:2px 8px 2px 0;color:#555;white-space:nowrap}.warn{color:#c00}</style><h1>등록 미리보기 (${list.length}종)</h1>${rows.join("\n")}`;
  writeFileSync(join(outRoot, "preview.html"), html, "utf-8");
}

mkdirSync(outRoot, { recursive: true });
// --force는 Gemini/크롭 결과만 갱신한다. 이미 수집한 쿠팡 메타는 재사용한다.
collect(items.filter((it) => !existsSync(join(dirOf(it), "meta.json"))));
for (const it of items) {
  if (!existsSync(join(dirOf(it), "meta.json"))) continue;
  try {
    await download(it);
    await gemini(it);
    await crop(it);
    console.log(`done ${it.id}`);
  } catch (e) {
    console.error(`실패 ${it.id}: ${String(e.message || e).slice(0, 300)}`);
  }
}
preview(items);
console.log(`미리보기: ${join(outRoot, "preview.html")}`);

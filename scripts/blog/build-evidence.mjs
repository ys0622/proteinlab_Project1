#!/usr/bin/env node
/**
 * 프로틴랩 네이버 블로그 원고 준비 1단계: 주제(scripts/blog/topics.json)의 제품 근거 묶음을 만든다(2026-10-21).
 *
 * 사이트 등록 데이터(성분표 이미지로 검증된 값)만 쓴다. 계산값은 "계산"으로 표시한다.
 * 결과: <블로그 폴더>/content/PL-YYYYMMDD-NN/{brief.md, evidence.md, evidence.json}
 *
 * 사용: node scripts/blog/build-evidence.mjs <topicId> [--date 2026-10-21]
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const BLOG_ROOT = "C:/Users/ys062/Desktop/네이버 블로그/프로틴랩";
const args = process.argv.slice(2);
const topicId = args[0];
const dateArg = args.includes("--date") ? args[args.indexOf("--date") + 1] : null;
const today = dateArg || new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);

const SPEC = { drink: ["slugToDrinkSpec.json", "rtd-drink-spec"], bar: ["slugToBarSpec.json", "bar-spec"], shake: ["slugToShakeSpec.json", "shake-spec"], yogurt: ["slugToYogurtSpec.json", "protein-yogurt-spec"], soymilk: ["slugToSoymilkSpec.json", "soymilk-spec"] };
const readJson = (p) => JSON.parse(readFileSync(join(root, p), "utf-8"));

function loadProducts(cat) {
  return readJson(`app/data/${cat}ProductsData.json`).map((p) => ({ ...p, category: cat }));
}

function selectProducts(topic) {
  const list = loadProducts(topic.category_data);
  if (topic.slugs) return topic.slugs.map((s) => list.find((p) => p.slug === s)).filter(Boolean);
  let out = list;
  if (topic.brand) out = out.filter((p) => p.brand === topic.brand);
  if (topic.nameMatch) out = out.filter((p) => new RegExp(topic.nameMatch).test(p.name));
  if (topic.filter === "sugar<=2") out = out.filter((p) => (p.sugar ?? 99) <= 2);
  return out;
}

function specMap(cat) {
  const file = join(root, "app/data", SPEC[cat][0]);
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf-8")) : {};
}

/** 성분표 경로와, 같은 이미지를 다른 제품이 함께 쓰는지(=이 제품 라벨이라고 확신할 수 없음). */
function specInfo(p) {
  const map = specMap(p.category);
  const v = map[p.slug];
  const dir = SPEC[p.category][1];
  if (!v || !existsSync(join(root, "public", dir, v))) return { spec: null, shared: false };
  const shared = Object.entries(map).some(([slug, file]) => slug !== p.slug && file === v);
  return { spec: `public/${dir}/${v}`, shared };
}

/** 바는 지방·나트륨 외 성분이 app/data/barProductsData.ts 의 exactNutritionBySlug 에 있다. */
function barExact(slug) {
  const ts = readFileSync(join(root, "app/data/barProductsData.ts"), "utf-8");
  const m = ts.match(new RegExp(`"${slug.replace(/[-]/g, "\-")}": \{([^}]*)\}`));
  if (!m) return {};
  return Object.fromEntries([...m[1].matchAll(/(\w+):\s*([\d.]+)/g)].map((x) => [x[1], Number(x[2])]));
}

const fmt = (v) => (v == null ? "미확인" : String(v));
const label = (p) => (p.name.startsWith(p.brand) ? p.name : `${p.brand} ${p.name}`);

function nextId() {
  const ymd = today.replace(/-/g, "");
  const dir = join(BLOG_ROOT, "content");
  const used = existsSync(dir) ? readdirSync(dir).filter((d) => d.startsWith(`PL-${ymd}-`)) : [];
  return `PL-${ymd}-${String(used.length + 1).padStart(2, "0")}`;
}

const topics = readJson("scripts/blog/topics.json");
const topic = topics.find((t) => t.id === topicId);
if (!topic) throw new Error(`주제 없음: ${topicId} (scripts/blog/topics.json)`);
const products = selectProducts(topic);
if (products.length < 2) throw new Error(`제품이 2개 미만: ${topicId}`);

// --id 로 기존 원고 폴더의 근거를 다시 만든다(원고는 건드리지 않음).
const id = args.includes("--id") ? args[args.indexOf("--id") + 1] : nextId();
const out = join(BLOG_ROOT, "content", id);
mkdirSync(out, { recursive: true });

const rows = products.map((p) => {
  const n = { ...(p.category === "bar" ? barExact(p.slug) : {}), ...(p.nutritionPerBottle || {}) };
  const { spec, shared } = specInfo(p);
  return {
    slug: p.slug,
    name: label(p),
    capacity: p.capacity,
    proteinG: p.proteinPerServing,
    caloriesKcal: p.calories,
    sugarG: p.sugar,
    fatG: p.fat ?? n.fatG ?? null,
    sodiumMg: p.sodium ?? n.sodiumMg ?? null,
    carbsG: n.carbsG ?? null,
    proteinPer100kcal: p.calories ? Math.round((p.proteinPerServing / p.calories) * 1000) / 10 : null,
    spec,
    verified: !!spec && !shared,
    note: !spec ? "성분표 이미지 없음" : shared ? "성분표 이미지를 다른 제품과 공유(이 제품 라벨인지 확인 불가)" : "",
    siteUrl: `https://proteinlab.kr/product/${p.slug}`,
  };
});

writeFileSync(join(out, "evidence.json"), JSON.stringify({ id, topic, date: today, rows }, null, 2));

const evidence = [
  `# 검증표 ${id}`,
  "",
  `- 주제: ${topic.title}`,
  `- 기준일: ${today}`,
  "- 출처: 프로틴랩 등록 데이터. 각 수치는 제품 성분표 이미지(아래 spec 경로)로 등록 시 대조한 값이다. 구매 전 최신 포장 표시를 다시 확인해야 한다.",
  "- 계산값: 100kcal당 단백질 = 단백질 ÷ 열량 × 100 (반올림, 운영자 계산)",
  "",
  "| 제품 | 기준량 | 단백질 | 열량 | 당류 | 지방 | 나트륨 | 100kcal당 단백질(계산) | 성분표 |",
  "|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|",
  ...rows.map((r) => `| ${r.name} | ${r.capacity} | ${fmt(r.proteinG)}g | ${fmt(r.caloriesKcal)}kcal | ${fmt(r.sugarG)}g | ${fmt(r.fatG)}g | ${fmt(r.sodiumMg)}mg | ${fmt(r.proteinPer100kcal)}g | ${r.verified ? r.spec : "**검증 불가** " + r.note} |`),
  "",
  "## 미확인",
  ...rows.filter((r) => !r.verified).map((r) => `- ${r.name}: ${r.note}. 원고에 수치를 쓰지 않는다.`),
  "- 가격·판매 여부·맛 평가는 이 자료로 확인할 수 없다. 원고에 쓰지 않는다.",
  "- 효능·건강 효과 주장은 이 자료의 범위가 아니다. 쓰려면 공공기관 자료를 따로 확보한다.",
  "",
].join("\n");
writeFileSync(join(out, "evidence.md"), evidence);

const brief = [
  `# 기획 ${id}`,
  "",
  `- 제목(안): ${topic.title}`,
  `- 블로그 카테고리: ${topic.category}`,
  `- 독자 질문: ${topic.question}`,
  `- 검색어 근거: 네이버 자동완성(2026-10-20~21 확인) ${topic.searchTerms.join(", ")}. 검색량은 확인하지 않았다.`,
  `- 비교 CTA: ${topic.compareUrl}`,
  `- 태그: ${topic.tags.map((t) => "#" + t).join(" ")}`,
  `- 제품 수: ${rows.length} (evidence.md)`,
  "- 상태: 기획 → 집필 대기",
  "- 승인: 미승인 (review.md에 `승인: 예`가 있어야 발행 목록에 들어간다)",
  "",
].join("\n");
writeFileSync(join(out, "brief.md"), brief);
console.log(`${id} ${out}`);
console.log(`products ${rows.length}`);

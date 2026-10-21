#!/usr/bin/env node
/**
 * 프로틴랩 블로그 원고 검사(2026-10-21). 발행 목록에 넣기 전 반드시 통과해야 한다.
 *
 *  1. 수치: 본문의 "숫자+g/kcal/mg/mL" 가 evidence.json 의 검증된 값(또는 계산값·차이·범위)에 있는지
 *  2. 형식: blogpilot 원고 형식([카테고리] 첫 줄, **제목**, #태그 줄, 카테고리: 줄), 정보 기준일·출처·비교 CTA
 *  3. 분량: 본문(제목·출처·태그·카테고리 제외, 공백 포함) 1,800~3,500자 — 운영체계.md 기준
 *  4. 표현: 효능·치료·최고·1위 같은 금지 표현, 검증 불가 제품의 수치 사용
 *  5. 링크: 본문 링크가 200으로 열리는지
 *
 * 사용: node scripts/blog/check-post.mjs <content 폴더 또는 ID>
 * 결과: 같은 폴더의 check.json, 콘솔 요약. 실패가 있으면 종료 코드 1.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BLOG_ROOT = "C:/Users/ys062/Desktop/네이버 블로그/프로틴랩";
const arg = process.argv[2];
if (!arg) throw new Error("사용: node scripts/blog/check-post.mjs <ID|폴더>");
const dir = existsSync(arg) ? arg : join(BLOG_ROOT, "content", arg);
const md = readFileSync(join(dir, "article.md"), "utf-8");
const ev = JSON.parse(readFileSync(join(dir, "evidence.json"), "utf-8"));

const errors = [];
const warnings = [];
const lines = md.split(/\r?\n/);

// 2. 형식
if (!/^\[카테고리\] .+/.test(lines[0] || "")) errors.push("첫 줄이 '[카테고리] ...' 형식이 아님");
const titleLine = lines.slice(1).find((l) => l.trim());
if (!/^\*\*.+\*\*$/.test(titleLine?.trim() || "")) errors.push("제목 줄이 **제목** 형식이 아님");
if (!lines.some((l) => /^#\S/.test(l.trim()) && l.trim().split(/\s+/).every((t) => t.startsWith("#")))) errors.push("#태그 줄 없음");
const catLine = lines.find((l) => l.startsWith("카테고리:"));
if (!catLine) errors.push("'카테고리:' 줄 없음");
const CATS = ["목적별 추천", "제품 리뷰·신제품", "프로틴 이슈", "제품 비교", "단백질 가이드", "쇼핑정보"];
if (catLine && !CATS.includes(catLine.replace("카테고리:", "").trim())) errors.push(`블로그 카테고리 아님: ${catLine}`);
if (!md.includes("정보 기준일")) errors.push("정보 기준일 없음");
if (!/\n출처\s*\n/.test(md)) errors.push("출처 목록 없음");
if (!md.includes(ev.topic.compareUrl)) errors.push(`비교 CTA 링크 없음: ${ev.topic.compareUrl}`);

// 본문 범위: 제목 다음 ~ "정보 기준일" 앞
const start = md.indexOf(titleLine) + titleLine.length;
const end = md.indexOf("정보 기준일");
const body = md.slice(start, end > 0 ? end : undefined);

// 3. 분량
const plain = body.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*|:\-]/g, "").replace(/\n{2,}/g, "\n").trim();
const chars = plain.length;
if (chars < 1800) errors.push(`본문 ${chars}자 — 1,800자 미만`);
else if (chars > 3500) warnings.push(`본문 ${chars}자 — 3,500자 초과(이유가 있으면 허용)`);

// 1. 수치
const ok = new Set();
const add = (v) => { if (v != null && Number.isFinite(Number(v))) ok.add(String(Math.round(Number(v) * 10) / 10)); };
const verified = ev.rows.filter((r) => r.verified);
for (const r of verified) {
  for (const k of ["proteinG", "caloriesKcal", "sugarG", "fatG", "sodiumMg", "carbsG", "proteinPer100kcal", "proteinPer100", "sugarPer100", "kcalPer100"]) add(r[k]);
  add(parseFloat(r.capacity));
}
// 기준 단위 표현("100g당", "100kcal당")은 수치 주장이 아니다.
add(100);
const vals = (k) => verified.map((r) => r[k]).filter((v) => v != null);
for (const k of ["proteinG", "caloriesKcal", "sugarG", "fatG", "sodiumMg", "carbsG"]) {
  const v = vals(k);
  for (const a of v) for (const b of v) { add(Math.abs(a - b)); if (b) add(a / b); }
}
const unverifiedNames = ev.rows.filter((r) => !r.verified).map((r) => r.name);
const numRe = /(\d+(?:[.,]\d+)?)\s*(g|kcal|mg|mL|ml)(?![a-zA-Z가-힣])/g;
const tables = body;
for (const m of tables.matchAll(numRe)) {
  const n = String(Math.round(Number(m[1].replace(",", "")) * 10) / 10);
  if (!ok.has(n)) errors.push(`근거에 없는 수치: "${m[0]}" (…${body.slice(Math.max(0, m.index - 20), m.index + 15).replace(/\s+/g, " ")}…)`);
}
for (const name of unverifiedNames) {
  const short = name.replace(/^\S+\s/, "");
  const idx = body.indexOf(short);
  if (idx >= 0 && numRe.test(body.slice(idx, idx + 60))) errors.push(`검증 불가 제품 근처에 수치: ${name}`);
  numRe.lastIndex = 0;
}

// 4. 표현
for (const w of ["효능", "치료", "예방 효과", "완치", "최고의", "1위", "무조건", "가장 좋은", "살이 빠", "근육이 생"]) {
  if (body.includes(w)) errors.push(`금지 표현: "${w}"`);
}

// 5. 링크
const links = [...md.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
const results = await Promise.all(links.map(async (u) => {
  try {
    const r = await fetch(u, { method: "GET", redirect: "manual", headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36" } });
    return [u, r.status];
  } catch (e) { return [u, "ERR"]; }
}));
for (const [u, st] of results) if (st !== 200) errors.push(`링크 ${st}: ${u}`);

const report = { id: ev.id, checkedAt: new Date().toISOString(), chars, links: results.length, errors, warnings, pass: errors.length === 0 };
writeFileSync(join(dir, "check.json"), JSON.stringify(report, null, 2));
console.log(`${ev.id} 본문 ${chars}자 · 링크 ${results.length}개 · ${report.pass ? "통과" : "실패"}`);
for (const e of errors) console.log("  ✗ " + e);
for (const w of warnings) console.log("  △ " + w);
process.exitCode = report.pass ? 0 : 1;

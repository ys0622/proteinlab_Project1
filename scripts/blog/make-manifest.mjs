#!/usr/bin/env node
/**
 * blogpilot 발행 목록 만들기(2026-10-21).
 * 승인(review.md에 "승인: 예")되고 검사(check.json pass)를 통과한 원고만
 * <블로그 폴더>/발행대기/<날짜>_manifest.json 으로 낸다. blogpilot importer 형식과 같다.
 *
 * 하루 기본 3편·최대 4편(2026-10-24 사장님 지시: 미리 써 둔 원고를 하루 3~4편씩 차례로 발행). 예약 시각은 SLOTS 순서.
 * 이미 다른 날짜 manifest에 들어간 원고는 다시 넣지 않는다. 블로그 발행 자체는 하지 않는다.
 *
 * 사용: node scripts/blog/make-manifest.mjs [--date 2026-10-22] [--max 3]
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BLOG_ROOT = "C:/Users/ys062/Desktop/네이버 블로그/프로틴랩";
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const date = opt("--date", new Date(Date.now() + 9 * 3600_000 + 86400_000).toISOString().slice(0, 10));
const max = Math.min(Number(opt("--max", 3)), 4);
const SLOTS = ["09:40", "12:40", "16:10", "19:40"];

const queueDir = join(BLOG_ROOT, "발행대기");
mkdirSync(queueDir, { recursive: true });
const already = new Set();
for (const f of readdirSync(queueDir).filter((f) => f.endsWith("_manifest.json") && !f.startsWith(date))) {
  for (const it of JSON.parse(readFileSync(join(queueDir, f), "utf-8"))) already.add(it.md);
}

const contentDir = join(BLOG_ROOT, "content");
const ready = [];
const skipped = [];
for (const id of readdirSync(contentDir).filter((d) => /^PL-\d{8}-\d{2}$/.test(d)).sort()) {
  const dir = join(contentDir, id);
  const md = join(dir, "article.md").replace(/\//g, "\\");
  const review = existsSync(join(dir, "review.md")) ? readFileSync(join(dir, "review.md"), "utf-8") : "";
  const check = existsSync(join(dir, "check.json")) ? JSON.parse(readFileSync(join(dir, "check.json"), "utf-8")) : null;
  if (!existsSync(join(dir, "article.md"))) continue;
  if (already.has(md)) continue;
  if (!/승인:\s*예/.test(review)) { skipped.push(`${id} 미승인`); continue; }
  if (!check?.pass) { skipped.push(`${id} 검사 미통과`); continue; }
  if (!existsSync(join(dir, "thumbnail.png"))) { skipped.push(`${id} 썸네일 없음`); continue; }
  const lines = readFileSync(join(dir, "article.md"), "utf-8").split(/\r?\n/);
  const category = lines[0].replace("[카테고리]", "").trim();
  const title = lines.slice(1).find((l) => l.trim()).replace(/\*\*/g, "").trim();
  ready.push({ id, title, category, md, thumb: join(dir, "thumbnail.png").replace(/\//g, "\\") });
}

const items = ready.slice(0, max).map((r, i) => ({
  date, order: i + 1, rank: r.id, scheduled_at: `${date} ${SLOTS[i]}`,
  title: r.title, category: r.category, md: r.md, thumb: r.thumb,
}));
const out = join(queueDir, `${date}_manifest.json`);
if (items.length) writeFileSync(out, JSON.stringify(items, null, 2));
console.log(items.length ? `${out} (${items.length}편)` : "발행할 원고 없음");
for (const it of items) console.log(`  ${it.scheduled_at} ${it.rank} ${it.title}`);
for (const s of skipped) console.log(`  - 제외: ${s}`);

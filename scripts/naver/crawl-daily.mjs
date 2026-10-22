#!/usr/bin/env node
/**
 * 네이버 서치어드바이저 "웹 페이지 수집 요청" 매일 자동 제출(2026-10-22 사장님 승인 "1~4 진행").
 *
 * 순서: docs/naver-crawl-queue.md 대기열 → 사이트맵의 아직 안 넣은 주소(비교 → 가이드 → 브랜드 → 제품 → 나머지).
 * 이미 넣은 주소는 .naver-crawl/submitted.txt 에 쌓는다. 하루 한도는 50건으로 관찰됐다(2026-10-22, 51번째부터 접수 안 됨, 안내 문구 없음).
 * aside repl 한 번에 많이 넣으면 중간에 멈추므로 8건씩 나눠 넣고, 건마다 요청 내역 맨 위 행으로 접수를 확인한다.
 * 결과: .naver-crawl/latest.txt, 로그: .naver-crawl/run.log
 *
 * 사용: node scripts/naver/crawl-daily.mjs [--max 50] [--dry]
 * 매일 Windows 작업 스케줄러 "ProteinLab Naver Crawl Daily"가 scripts/naver/run-crawl.cmd 로 실행한다.
 */
import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const max = Number(opt("--max", 50));
const dry = args.includes("--dry");
const SITE = "https://proteinlab.kr";
const CHUNK = 8;

const outDir = join(root, ".naver-crawl");
mkdirSync(outDir, { recursive: true });
const submittedFile = join(outDir, "submitted.txt");
const queueFile = join(root, "docs/naver-crawl-queue.md");
const kstDate = new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);

const submitted = new Set(existsSync(submittedFile) ? readFileSync(submittedFile, "utf-8").split(/\r?\n/).filter(Boolean) : []);

async function sitemapPaths() {
  const res = await fetch(`${SITE}/sitemap.xml`, { headers: { "User-Agent": "Mozilla/5.0" } });
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
}

const ORDER = [/^\/compare\//, /^\/guides\//, /^\/brands\//, /^\/product\//];
const rank = (p) => { const i = ORDER.findIndex((r) => r.test(p)); return i < 0 ? ORDER.length : i; };

const queued = existsSync(queueFile)
  ? [...readFileSync(queueFile, "utf-8").matchAll(/^- https:\/\/proteinlab\.kr(\/\S*)/gm)].map((m) => m[1])
  : [];
const fromSitemap = (await sitemapPaths()).sort((a, b) => rank(a) - rank(b));
const todo = [...new Set([...queued, ...fromSitemap])].filter((p) => !submitted.has(p)).slice(0, max);

const aside = join(process.env.LOCALAPPDATA, "Aside/CLI/current/aside.exe");
const BODY = `
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const base="https://searchadvisor.naver.com/console/site/request/crawl?site=https%3A%2F%2Fproteinlab.kr";
const page=await openTab(base); await sleep(5000);
const site=await page.evaluate(()=>document.body.innerText.includes("수집 요청 내역"));
if(!site){console.log("LOGIN_NEEDED");}
else for(const path of paths){
  await page.goto(base); await sleep(3500);
  const box=await page.evaluate(()=>{const i=document.querySelector("input[type=text]");i.scrollIntoView({block:"center"});const r=i.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};});
  await page.mouse.click(box.x,box.y); await page.keyboard.press("Control+A"); await page.keyboard.press("Backspace");
  await page.keyboard.type("https://proteinlab.kr"+path); await sleep(300); await page.keyboard.press("Enter"); await sleep(2500);
  await page.goto(base); await sleep(3500);
  const top=await page.evaluate(()=>{const t=document.body.innerText;const i=t.indexOf("수집 요청 내역");return t.slice(i,i+200);});
  const ok=top.split("\\n").slice(0,8).some(l=>l.trim()===path);
  console.log((ok?"OK ":"NO ")+path);
  if(!ok)break;
}`;

const accepted = [];
let stop = "";
if (dry) {
  console.log(`(dry) 대상 ${todo.length}건`);
  for (const p of todo) console.log("  " + p);
  stop = "dry";
}
for (let i = 0; i < todo.length && !stop; ) {
  const chunk = todo.slice(i, i + CHUNK);
  const code = `const paths=${JSON.stringify(chunk)};${BODY}`;
  const res = spawnSync(aside, ["repl", code], { encoding: "utf-8", maxBuffer: 16 * 1024 * 1024, timeout: 240_000 });
  const out = res.stdout || "";
  if (/LOGIN_NEEDED/.test(out)) { stop = "네이버 로그인 필요(Aside에서 서치어드바이저 로그인)"; break; }
  const ok = [...out.matchAll(/^OK (\S+)/gm)].map((m) => m[1]);
  for (const p of ok) { accepted.push(p); appendFileSync(submittedFile, p + "\n"); }
  if (/^NO /m.test(out)) stop = "접수 안 됨 — 하루 한도(약 50건)로 추정";
  else if (!ok.length) stop = `진행 없음: ${(res.stderr || res.error?.message || "").slice(0, 200)}`;
  i += ok.length || CHUNK;
}

if (accepted.length && existsSync(queueFile)) {
  const done = new Set(accepted);
  const lines = readFileSync(queueFile, "utf-8").split(/\r?\n/).filter((l) => { const m = l.match(/^- https:\/\/proteinlab\.kr(\/\S*)/); return !m || !done.has(m[1]); });
  writeFileSync(queueFile, lines.join("\n"));
}

const remaining = [...new Set([...queued, ...fromSitemap])].filter((p) => !submitted.has(p) && !accepted.includes(p)).length;
const summary = [
  `네이버 수집 요청 ${kstDate}`,
  `접수: ${accepted.length}건 / 대상 ${todo.length}건`,
  stop ? `중단: ${stop}` : "중단: 없음",
  `남은 주소: ${remaining}건`,
  ...accepted.map((p) => `  ${p}`),
].join("\n");
if (!dry) {
  writeFileSync(join(outDir, "latest.txt"), summary + "\n");
  console.log(summary);
}

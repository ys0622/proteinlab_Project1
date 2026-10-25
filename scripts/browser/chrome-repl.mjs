// 작업용 크롬에서 aside repl 형식 스크립트를 실행한다(2026-10-25 Scott 결정: 자동화는 크롬, Aside는 백업, 웨일은 Scott 개인용).
// 사용: node scripts/browser/chrome-repl.mjs --profile <이름> [--headed] (--file <스크립트> | --code "<코드>")
//   프로필은 D:\browser-profiles\<이름> (계정 하나 = 프로필 하나, 목록은 D:\browser-profiles\accounts.json).
//   스크립트 안에서 openTab(url)·page.evaluate·page.goto·page.mouse·page.keyboard·console.log 를 쓴다(aside repl과 같음).
// 같은 프로필을 두 작업이 동시에 열지 않게 <프로필>\.lock 으로 막는다(최대 10분 대기).
import { chromium } from "playwright-core";
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const PROFILE_ROOT = process.env.BROWSER_PROFILE_ROOT || "D:/browser-profiles";

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const profile = opt("--profile");
const file = opt("--file");
const code = file ? readFileSync(file, "utf-8") : opt("--code");
const headed = args.includes("--headed");
const timeoutMs = Number(opt("--timeout") || 300_000);
if (!profile || !code) {
  console.error("사용: node scripts/browser/chrome-repl.mjs --profile <이름> (--file <스크립트> | --code <코드>)");
  process.exit(2);
}

const dir = join(PROFILE_ROOT, profile);
mkdirSync(dir, { recursive: true });
const lock = join(dir, ".lock");

function alive(pid) {
  try { process.kill(pid, 0); return true; } catch { return false; }
}
const deadline = Date.now() + 600_000;
while (existsSync(lock)) {
  const holder = Number(readFileSync(lock, "utf-8")) || 0;
  if (!holder || !alive(holder)) { unlinkSync(lock); break; }
  if (Date.now() > deadline) { console.error(`프로필 사용 중(PID ${holder}): ${profile}`); process.exit(3); }
  await new Promise((r) => setTimeout(r, 5000));
}
writeFileSync(lock, String(process.pid));

let ctx;
const killer = setTimeout(() => { console.error("시간 초과"); cleanup(4); }, timeoutMs);
async function cleanup(codeOut) {
  clearTimeout(killer);
  try { await ctx?.close(); } catch { /* 이미 닫힘 */ }
  try { unlinkSync(lock); } catch { /* 없음 */ }
  process.exit(codeOut);
}

try {
  // 쿠팡·네이버가 headless 크롬을 막는 경우가 있어 기본은 화면 밖에 띄운다.
  ctx = await chromium.launchPersistentContext(dir, {
    channel: "chrome",
    headless: false,
    viewport: { width: 1400, height: 900 },
    locale: "ko-KR",
    args: ["--disable-blink-features=AutomationControlled", ...(headed ? [] : ["--window-position=-2400,0"])],
  });
  const openTab = async (url) => {
    const page = await ctx.newPage();
    if (url) await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    return page;
  };
  const getTabs = async () => ctx.pages();
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
  await new AsyncFunction("openTab", "getTabs", code)(openTab, getTabs);
  await cleanup(0);
} catch (e) {
  console.error(String(e?.stack || e).slice(0, 500));
  await cleanup(1);
}

// 작업용 크롬 프로필에 Scott이 직접 로그인할 때 쓴다. 창을 닫으면 끝난다(로그인 상태는 프로필 폴더에 남는다).
// 사용: node scripts/browser/login.mjs <프로필> [주소]
//   예: node scripts/browser/login.mjs naver-ys0622 https://nid.naver.com/nidlogin.login
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const PROFILE_ROOT = process.env.BROWSER_PROFILE_ROOT || "D:/browser-profiles";
const [profile, url = "about:blank"] = process.argv.slice(2);
if (!profile) {
  console.error("사용: node scripts/browser/login.mjs <프로필> [주소]");
  process.exit(2);
}
const dir = join(PROFILE_ROOT, profile);
mkdirSync(dir, { recursive: true });
const ctx = await chromium.launchPersistentContext(dir, {
  channel: "chrome",
  headless: false,
  viewport: null,
  locale: "ko-KR",
  args: ["--disable-blink-features=AutomationControlled"],
});
const page = ctx.pages()[0] ?? (await ctx.newPage());
await page.goto(url);
console.log(`[${profile}] 로그인 후 창을 닫으세요.`);
await new Promise((resolve) => ctx.on("close", resolve));

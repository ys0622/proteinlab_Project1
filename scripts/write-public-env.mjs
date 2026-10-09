/**
 * wrangler.jsonc의 vars 중 NEXT_PUBLIC_* 값을 .env.production으로 내보낸다.
 *
 * 왜 필요한가: NEXT_PUBLIC_* 는 `next build` 시점에 클라이언트 번들로 인라인된다. 로컬 빌드는 .env.local이 있어
 * 값이 들어가지만, GitHub Actions 빌드에는 .env.local이 없어 값이 비어 GA4 이벤트와 광고가 조용히 사라졌다.
 * 이 값들은 공개 값이고 이미 wrangler.jsonc에 커밋되어 있다. .env.production은 gitignore 대상이다.
 *
 * 사용: node scripts/write-public-env.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wranglerPath = resolve(root, "wrangler.jsonc");
if (!existsSync(wranglerPath)) {
  console.error("wrangler.jsonc를 찾지 못했습니다.");
  process.exit(1);
}

const text = readFileSync(wranglerPath, "utf8");
const pairs = [...text.matchAll(/"(NEXT_PUBLIC_[A-Z0-9_]+)"\s*:\s*"([^"]*)"/g)].map((m) => [m[1], m[2]]);
if (pairs.length === 0) {
  console.error("wrangler.jsonc에서 NEXT_PUBLIC_* 값을 찾지 못했습니다.");
  process.exit(1);
}

const seen = new Set();
const lines = [];
for (const [key, value] of pairs) {
  if (seen.has(key)) continue;
  seen.add(key);
  lines.push(`${key}=${value}`);
}
writeFileSync(resolve(root, ".env.production"), lines.join("\n") + "\n", "utf8");
console.log(`.env.production 작성: ${lines.map((l) => l.split("=")[0]).join(", ")}`);

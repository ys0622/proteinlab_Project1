/**
 * 배포 직전 점검: 클라이언트 번들에 인라인되어야 하는 공개 환경변수가 빌드 환경에 있는지 확인한다.
 * 비어 있으면 GA4 직접 전송 이벤트(page_view, 제품·제휴 이벤트)와 애드센스가 조용히 사라지므로 배포를 막는다.
 */
import { createRequire } from "module";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(root, false);

const required = ["NEXT_PUBLIC_GA_ID", "NEXT_PUBLIC_ADSENSE_CLIENT_ID"];
const missing = required.filter((name) => !(process.env[name] ?? "").trim());
if (missing.length) {
  console.error(`빌드 환경에 공개 변수가 없습니다: ${missing.join(", ")}`);
  console.error("로컬은 .env.local, CI는 `node scripts/write-public-env.mjs` 로 .env.production을 먼저 만드세요.");
  process.exit(1);
}
console.log(`빌드 환경 점검 통과: ${required.join(", ")}`);

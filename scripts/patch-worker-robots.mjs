/**
 * Post-build patch: inject /robots.txt interception into .open-next/worker.js
 *
 * robots.txt is normally served directly from ASSETS (bypassing the worker).
 * wrangler.jsonc sets run_worker_first: ["/robots.txt"] so the request reaches
 * this handler. We strip any "User-agent: ClaudeBot / Disallow: /" blocks here.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = resolve(__dirname, "../.open-next/worker.js");

const INJECT_AFTER = "const url = new URL(request.url);";

const ROBOTS_INTERCEPTOR = `
        // --- robots.txt ClaudeBot interceptor (patched by scripts/patch-worker-robots.mjs) ---
        if (url.pathname === "/robots.txt") {
            const originalResponse = await env.ASSETS.fetch(request);
            const text = await originalResponse.text();
            const cleaned = text
                .replace(/User-agent:\\s*ClaudeBot[\\s\\S]*?(?=User-agent:|$)/gi, "")
                .replace(/\\n{3,}/g, "\\n\\n")
                .trim() + "\\n";
            return new Response(cleaned, {
                status: originalResponse.status,
                headers: {
                    "content-type": "text/plain; charset=utf-8",
                    "cache-control": originalResponse.headers.get("cache-control") || "public, max-age=3600",
                },
            });
        }
        // --- end robots.txt interceptor ---`;

let source = readFileSync(workerPath, "utf-8");

if (source.includes("robots.txt ClaudeBot interceptor")) {
  console.log("ℹ️  patch-worker-robots: 이미 적용됨, 스킵");
  process.exit(0);
}

if (!source.includes(INJECT_AFTER)) {
  console.error(`❌ patch-worker-robots: 주입 지점을 찾을 수 없습니다: "${INJECT_AFTER}"`);
  process.exit(1);
}

source = source.replace(INJECT_AFTER, INJECT_AFTER + ROBOTS_INTERCEPTOR);
writeFileSync(workerPath, source, "utf-8");

console.log("✅ patch-worker-robots: worker.js에 robots.txt 인터셉터 주입 완료");

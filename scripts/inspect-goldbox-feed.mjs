// Read-only diagnostic for comparing the Partners feed with Coupang app reports.
// Never print API keys or the signed Authorization header.
import { readFileSync } from "node:fs";
import { createHmac } from "node:crypto";

function readLocalVars(path) {
  try {
    const entries = {};
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      entries[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
    }
    return entries;
  } catch { return {}; }
}

const vars = { ...readLocalVars(".env.local"), ...readLocalVars(".dev.vars"), ...process.env };
const accessKey = vars.COUPANG_ACCESS_KEY;
const secretKey = vars.COUPANG_SECRET_KEY;
if (!accessKey || !secretKey) {
  console.error("Coupang API keys are not available in the local environment.");
  process.exit(1);
}

const path = "/v2/providers/affiliate_open_api/apis/openapi/v1/products/goldbox";
const query = new URLSearchParams({
  subId: vars.COUPANG_GOLDBOX_SUB_ID || vars.NEXT_PUBLIC_COUPANG_PARTNERS_SUB_ID || vars.COUPANG_PARTNERS_SUB_ID || "proteinlab",
  imageSize: "300x300",
}).toString();
const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/^20/, "").replace(/\.\d{3}Z$/, "Z");
const signature = createHmac("sha256", secretKey).update(`${stamp}GET${path}${query}`).digest("hex");
const response = await fetch(`https://api-gateway.coupang.com${path}?${query}`, {
  headers: { Authorization: `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${stamp}, signature=${signature}` },
  signal: AbortSignal.timeout(8000),
});
const payload = await response.json().catch(() => null);
if (!response.ok || payload?.rCode !== "0" || !Array.isArray(payload.data)) {
  console.error(`Goldbox API unavailable: HTTP ${response.status}, rCode ${payload?.rCode ?? "unknown"}`);
  process.exit(1);
}
console.log(`Goldbox feed: ${payload.data.length} offers`);
for (const item of payload.data) {
  if (!item || typeof item !== "object") continue;
  console.log(`${item.productId ?? "?"}\t${String(item.productName ?? "").slice(0, 100)}`);
}

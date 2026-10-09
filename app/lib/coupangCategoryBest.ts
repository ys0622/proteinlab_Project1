import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ProductDetailProps } from "../data/products";
import { extractCoupangProductParams, getKnownSourceCoupangUrlBySlug } from "./purchaseLinks";

const HOST = "https://api-gateway.coupang.com";
const PATH = "/v2/providers/affiliate_open_api/apis/openapi/v1/products/bestcategories";
const CATEGORY_IDS = [1012, 1024] as const; // Food; health supplements.
const CACHE_KEY = "coupang:category-best:proteinlab:v1";
const FRESH_MS = 12 * 60 * 60 * 1000;
const MAX_STALE_MS = 36 * 60 * 60 * 1000;

type BestOffer = { categoryId: number; rank: number; productId: number; productName: string; productUrl: string };
export type CategoryBestSnapshot = {
  status: "ready" | "unavailable";
  checkedAt: string | null;
  offers: BestOffer[];
  error?: "credentials" | "http" | "payload" | "network";
};
type KV = { get(key: string): Promise<string | null>; put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void> };
let refreshInProgress: Promise<unknown> | undefined;

async function envValue(env: Record<string, unknown>, name: string): Promise<string> {
  const value = env[name] ?? process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function signedDate(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${String(now.getUTCFullYear()).slice(2)}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
}

async function authorization(accessKey: string, secretKey: string, path: string, query: string): Promise<string> {
  const date = signedDate();
  const message = `${date}GET${path}${query}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secretKey), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message)));
  const signature = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${date}, signature=${signature}`;
}

async function fetchCategory(categoryId: number, accessKey: string, secretKey: string): Promise<BestOffer[]> {
  const path = `${PATH}/${categoryId}`;
  const query = "limit=100";
  const response = await fetch(`${HOST}${path}?${query}`, {
    headers: { Authorization: await authorization(accessKey, secretKey, path, query) },
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) throw new Error(`http:${response.status}`);
  const payload = await response.json() as { rCode?: string; data?: unknown };
  if (payload.rCode !== "0" || !Array.isArray(payload.data)) throw new Error("payload");
  return payload.data.flatMap((value, index) => {
    if (!value || typeof value !== "object") return [];
    const item = value as Record<string, unknown>;
    if (typeof item.productId !== "number" || typeof item.productName !== "string" || typeof item.productUrl !== "string") return [];
    return [{ categoryId, rank: index + 1, productId: item.productId, productName: item.productName, productUrl: item.productUrl }];
  });
}

async function refresh(kv: KV, env: Record<string, unknown>): Promise<CategoryBestSnapshot> {
  const accessKey = await envValue(env, "COUPANG_ACCESS_KEY");
  const secretKey = await envValue(env, "COUPANG_SECRET_KEY");
  const failed = async (error: CategoryBestSnapshot["error"]): Promise<CategoryBestSnapshot> => {
    const snapshot: CategoryBestSnapshot = { status: "unavailable", checkedAt: new Date().toISOString(), offers: [], error };
    await kv.put(CACHE_KEY, JSON.stringify(snapshot), { expirationTtl: 60 * 60 }).catch(() => undefined);
    return snapshot;
  };
  if (!accessKey || !secretKey) return failed("credentials");
  const responses = await Promise.allSettled(CATEGORY_IDS.map((id) => fetchCategory(id, accessKey, secretKey)));
  const offers = responses.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  if (responses.every((result) => result.status === "rejected")) {
    const reason = responses[0].status === "rejected" ? String(responses[0].reason) : "";
    console.error("[coupang-category-best]", reason);
    return failed(reason.startsWith("Error: http:") ? "http" : reason.includes("payload") ? "payload" : "network");
  }
  const snapshot: CategoryBestSnapshot = { status: "ready", checkedAt: new Date().toISOString(), offers };
  await kv.put(CACHE_KEY, JSON.stringify(snapshot), { expirationTtl: 60 * 60 * 48 }).catch(() => undefined);
  return snapshot;
}

function startRefresh(kv: KV, env: Record<string, unknown>, waitUntil: (promise: Promise<unknown>) => void) {
  if (refreshInProgress) return;
  refreshInProgress = refresh(kv, env).catch((error) => console.error("[coupang-category-best]", error))
    .finally(() => { refreshInProgress = undefined; });
  waitUntil(refreshInProgress);
}

export async function getCoupangCategoryBest(waitForColdStart = false): Promise<CategoryBestSnapshot> {
  try {
    const { env, ctx } = await getCloudflareContext({ async: true });
    const runtimeEnv = env as Record<string, unknown>;
    const kv = runtimeEnv.GUIDES_STATIC_DRAFTS_KV as KV | undefined;
    if (!kv) return { status: "unavailable", checkedAt: null, offers: [], error: "network" };
    const raw = await kv.get(CACHE_KEY);
    if (raw) {
      const cached = JSON.parse(raw) as CategoryBestSnapshot;
      const age = Date.now() - Date.parse(cached.checkedAt ?? "");
      if (cached.status === "unavailable" && age >= 0 && age < 60 * 60 * 1000) return cached;
      if (cached.status === "ready" && Array.isArray(cached.offers) && age >= 0) {
        if (age < FRESH_MS) return cached;
        if (age < MAX_STALE_MS) {
          startRefresh(kv, runtimeEnv, (promise) => ctx.waitUntil(promise));
          return cached;
        }
      }
    }
    if (waitForColdStart) return await refresh(kv, runtimeEnv);
    startRefresh(kv, runtimeEnv, (promise) => ctx.waitUntil(promise));
  } catch (error) {
    console.error("[coupang-category-best]", error);
  }
  return { status: "unavailable", checkedAt: null, offers: [], error: "network" };
}

function normalize(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/[^0-9a-z가-힣]/g, "");
}

/** Only the same Coupang page and, where available, item variant may receive a best badge. */
export function matchCoupangCategoryBest(products: ProductDetailProps[], snapshot: CategoryBestSnapshot): Record<string, number> {
  if (snapshot.status !== "ready") return {};
  const ranks: Record<string, number> = {};
  const used = new Set<string>();
  for (const product of products) {
    const knownUrl = getKnownSourceCoupangUrlBySlug(product.slug) ?? product.coupangUrl;
    const registered = extractCoupangProductParams(knownUrl);
    if (!registered) continue;
    const brand = normalize(product.brand);
    const capacity = normalize(product.capacity);
    const match = snapshot.offers.find((offer) => {
      const key = `${offer.categoryId}:${offer.productId}:${offer.productUrl}`;
      if (used.has(key) || String(offer.productId) !== registered.pageKey) return false;
      const name = normalize(offer.productName);
      if (!name.includes(brand) || (capacity && !name.includes(capacity))) return false;
      try {
        const url = new URL(offer.productUrl);
        const itemId = url.searchParams.get("itemId");
        return !itemId || itemId === registered.itemId;
      } catch {
        return false;
      }
    });
    if (!match) continue;
    ranks[product.slug] = match.rank;
    used.add(`${match.categoryId}:${match.productId}:${match.productUrl}`);
  }
  return ranks;
}

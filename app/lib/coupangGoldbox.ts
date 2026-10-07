import "server-only";
import { goldboxRefreshBoundary } from "./goldboxRefreshWindow";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ProductDetailProps } from "@/app/data/products";
import {
  extractCoupangProductParams,
  getKnownSourceCoupangUrlBySlug,
} from "@/app/lib/purchaseLinks";

const COUPANG_API_HOST = "https://api-gateway.coupang.com";
const GOLDBOX_PATH = "/v2/providers/affiliate_open_api/apis/openapi/v1/products/goldbox";
const GOLDBOX_CACHE_KEY = "coupang-goldbox:proteinlab:v2";
const GOLDBOX_CACHE_TTL_SECONDS = 60 * 10;
const GOLDBOX_DIAGNOSTIC_KEY = "coupang-goldbox:proteinlab:diagnostic:v1";

interface GoldboxKV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface CoupangGoldboxProduct {
  categoryName: string;
  isRocket: boolean;
  isFreeShipping: boolean;
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  productUrl: string;
}

export interface ProteinLabGoldboxMatch {
  product: ProductDetailProps;
  deal: CoupangGoldboxProduct;
  matchedBy: "product_id" | "name_capacity";
}

async function getGoldboxKV(): Promise<GoldboxKV | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as GoldboxKV | undefined;
    return kv && typeof kv.get === "function" ? kv : null;
  } catch {
    return null;
  }
}

async function getRuntimeEnvValue(...keys: string[]): Promise<string> {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const runtimeEnv = env as Record<string, unknown>;
    for (const key of keys) {
      const value = runtimeEnv[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  } catch {
    // Local builds and tests may not have a Cloudflare context.
  }

  return "";
}

function buildSignedDate(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${String(now.getUTCFullYear()).slice(2)}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function buildCoupangAuthHeader(
  accessKey: string,
  secretKey: string,
  method: string,
  path: string,
  query: string,
): Promise<string> {
  const signedDate = buildSignedDate();
  const message = `${signedDate}${method}${path}${query}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secretKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${signedDate}, signature=${signature}`;
}

function isGoldboxProduct(value: unknown): value is CoupangGoldboxProduct {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === "number" &&
    typeof item.productName === "string" &&
    typeof item.productPrice === "number" &&
    typeof item.productUrl === "string" &&
    item.productUrl.startsWith("https://")
  );
}

export interface GoldboxSnapshot {
  products: CoupangGoldboxProduct[];
  checkedAt: string | null;
  status: "ready" | "unavailable";
  sourceCount?: number;
  invalidCount?: number;
  error?: "credentials" | "http" | "payload" | "empty" | "network";
  dailyBaselineCount?: number;
  suspiciousDrop?: boolean;
}

export async function getLastGoldboxDiagnostic(): Promise<GoldboxSnapshot | null> {
  const kv = await getGoldboxKV();
  if (!kv) return null;
  const raw = await kv.get(GOLDBOX_DIAGNOSTIC_KEY).catch(() => null);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as GoldboxSnapshot;
    return parsed && typeof parsed.status === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export async function fetchGoldboxSnapshot(): Promise<GoldboxSnapshot> {
  const kv = await getGoldboxKV();
  const record = async (snapshot: GoldboxSnapshot) => {
    if (kv) {
      // Keep a small, short-lived audit of the actual API response, not just a page status.
      await kv.put(GOLDBOX_DIAGNOSTIC_KEY, JSON.stringify(snapshot), { expirationTtl: 60 * 60 * 48 }).catch(() => undefined);
    }
    return snapshot;
  };
  const unavailable = (error: GoldboxSnapshot["error"]): GoldboxSnapshot => ({
    products: [], checkedAt: new Date().toISOString(), status: "unavailable", error,
  });
  const cached = kv ? await kv.get(GOLDBOX_CACHE_KEY).catch(() => null) : null;
  if (cached) {
    try {
      const parsed = JSON.parse(cached) as GoldboxSnapshot;
      if (parsed.status === "ready" && Array.isArray(parsed.products) && parsed.checkedAt && Date.parse(parsed.checkedAt) >= goldboxRefreshBoundary() && Date.now() - Date.parse(parsed.checkedAt) < GOLDBOX_CACHE_TTL_SECONDS * 1000) {
        return { ...parsed, products: parsed.products.filter(isGoldboxProduct) };
      }
    } catch {
      // Ignore invalid cache and refresh it below.
    }
  }

  const [accessKey, secretKey, subId] = await Promise.all([
    getRuntimeEnvValue("COUPANG_ACCESS_KEY"),
    getRuntimeEnvValue("COUPANG_SECRET_KEY"),
    getRuntimeEnvValue("COUPANG_GOLDBOX_SUB_ID", "NEXT_PUBLIC_COUPANG_PARTNERS_SUB_ID", "COUPANG_PARTNERS_SUB_ID"),
  ]);
  if (!accessKey || !secretKey) return record(unavailable("credentials"));

  const queryParams = new URLSearchParams({
    subId: subId || "proteinlab",
    imageSize: "300x300",
  });
  const query = queryParams.toString();
  const authorization = await buildCoupangAuthHeader(accessKey, secretKey, "GET", GOLDBOX_PATH, query);

  try {
    const response = await fetch(`${COUPANG_API_HOST}${GOLDBOX_PATH}?${query}`, {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json;charset=UTF-8",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) return record(unavailable("http"));

    const payload = (await response.json()) as { rCode?: string; data?: unknown };
    if (payload.rCode !== "0" || !Array.isArray(payload.data)) return record(unavailable("payload"));
    const products = payload.data.filter(isGoldboxProduct);
    if (products.length === 0) {
      return record({ ...unavailable("empty"), sourceCount: payload.data.length, invalidCount: payload.data.length });
    }
    const kstDay = new Date(goldboxRefreshBoundary() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const baselineKey = `coupang-goldbox:baseline:${kstDay}`;
    const baselineRaw = kv ? await kv.get(baselineKey).catch(() => null) : null;
    const priorBaseline = baselineRaw ? Number(baselineRaw) : 0;
    const dailyBaselineCount = priorBaseline > 0 ? priorBaseline : products.length;
    const snapshot: GoldboxSnapshot = {
      products, checkedAt: new Date().toISOString(), status: "ready",
      sourceCount: payload.data.length, invalidCount: payload.data.length - products.length,
      dailyBaselineCount, suspiciousDrop: products.length < dailyBaselineCount * 0.5,
    };

    if (kv) {
      await Promise.all([
        kv.put(GOLDBOX_CACHE_KEY, JSON.stringify(snapshot), { expirationTtl: GOLDBOX_CACHE_TTL_SECONDS }),
        ...(priorBaseline > 0 ? [] : [kv.put(baselineKey, String(products.length), { expirationTtl: 60 * 60 * 30 })]),
      ]).catch(() => undefined);
    }
    return record(snapshot);
  } catch {
    return record(unavailable("network"));
  }
}

function normalizeName(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^0-9a-z가-힣]/g, "");
}

function getCapacityToken(value: string): string | null {
  const match = value.normalize("NFKC").toLowerCase().match(/(\d+(?:\.\d+)?)\s*(ml|kg|g)\b/i);
  return match ? `${match[1]}${match[2].toLowerCase()}` : null;
}

type CoupangProductIdentity = {
  pageKey: string;
  itemId?: string;
  vendorItemId?: string;
};

function getRegisteredCoupangIdentity(product: ProductDetailProps): CoupangProductIdentity | null {
  const knownSource = getKnownSourceCoupangUrlBySlug(product.slug);
  const params = extractCoupangProductParams(knownSource ?? product.coupangUrl);
  return params ?? null;
}

function getDealCoupangIdentity(deal: CoupangGoldboxProduct): CoupangProductIdentity {
  try {
    const url = new URL(deal.productUrl);
    return {
      pageKey: url.searchParams.get("pageKey") ?? String(deal.productId),
      itemId: url.searchParams.get("itemId") ?? undefined,
      vendorItemId: url.searchParams.get("vendorItemId") ?? undefined,
    };
  } catch {
    return { pageKey: String(deal.productId) };
  }
}

function isSameCoupangItem(registered: CoupangProductIdentity, deal: CoupangGoldboxProduct): boolean {
  const candidate = getDealCoupangIdentity(deal);
  if (registered.pageKey !== candidate.pageKey) return false;
  if (registered.itemId && candidate.itemId && registered.itemId !== candidate.itemId) return false;
  if (registered.vendorItemId && candidate.vendorItemId && registered.vendorItemId !== candidate.vendorItemId) return false;
  return true;
}

function isConservativeNameMatch(product: ProductDetailProps, deal: CoupangGoldboxProduct): boolean {
  const dealName = normalizeName(deal.productName);
  const brand = normalizeName(product.brand);
  const name = normalizeName(product.name);
  const fullName = normalizeName(`${product.brand}${product.name}`);

  if (brand.length < 2 || name.length < 4) return false;
  const nameMatches = dealName.includes(fullName) || (dealName.includes(brand) && dealName.includes(name));
  if (!nameMatches) return false;

  const capacity = getCapacityToken(product.capacity);
  return !capacity || dealName.includes(capacity);
}

export function matchRegisteredProductsToGoldbox(
  products: ProductDetailProps[],
  deals: CoupangGoldboxProduct[],
): ProteinLabGoldboxMatch[] {
  const matches: ProteinLabGoldboxMatch[] = [];
  const usedDealIds = new Set<number>();

  for (const product of products) {
    const registeredIdentity = getRegisteredCoupangIdentity(product);
    const idMatch = registeredIdentity
      ? deals.find((deal) => isSameCoupangItem(registeredIdentity, deal) && !usedDealIds.has(deal.productId))
      : undefined;
    const deal = idMatch ?? deals.find((candidate) => !usedDealIds.has(candidate.productId) && isConservativeNameMatch(product, candidate));
    if (!deal) continue;

    usedDealIds.add(deal.productId);
    matches.push({ product, deal, matchedBy: idMatch ? "product_id" : "name_capacity" });
  }

  return matches;
}

export async function getProteinLabGoldboxMatches(
  products: ProductDetailProps[],
): Promise<ProteinLabGoldboxMatch[]> {
  const snapshot = await fetchGoldboxSnapshot();
  return matchRegisteredProductsToGoldbox(products, snapshot.products);
}

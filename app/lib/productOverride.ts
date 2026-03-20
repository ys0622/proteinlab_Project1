import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ProductDetailProps } from "@/app/data/products";
import { normalizeCoupangUrl } from "./purchaseLinks";

interface KVStore {
  get(key: string, type: "json"): Promise<Record<string, unknown> | null>;
}

async function getKV(): Promise<KVStore | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as Partial<KVStore> | undefined;
    if (kv && typeof kv.get === "function") return kv as KVStore;
  } catch {
    return undefined;
  }
  return undefined;
}

let localOverrideCache: Record<string, Record<string, unknown>> | null | undefined = undefined;

function getLocalOverride(slug: string): Record<string, unknown> | null {
  if (localOverrideCache === undefined) {
    try {
      localOverrideCache = require("@/app/data/productOverrideLocal.json") as Record<string, Record<string, unknown>>;
    } catch {
      localOverrideCache = {};
    }
  }
  return (localOverrideCache ?? {})[slug] ?? null;
}

/**
 * KV에 저장된 product override가 있으면 base와 병합해 반환.
 * KV 없을 때(로컬) productOverrideLocal.json 사용.
 * 없으면 base를 그대로 반환.
 */
export async function withProductOverride(base: ProductDetailProps): Promise<ProductDetailProps> {
  try {
    const kv = await getKV();
    let kvOverride: Record<string, unknown> | null = null;

    if (kv) {
      kvOverride = await kv.get(`product-override:${base.slug}`, "json");
    }
    const localOverride = getLocalOverride(base.slug);
    const override =
      kvOverride || localOverride
        ? {
            ...(kvOverride ?? {}),
            ...(localOverride ?? {}),
          }
        : null;
    if (!override) return base;

    // slug, productType은 덮어쓰지 않음
    const { slug: _s, productType: _t, updatedAt: _u, ...rest } = override as Record<string, unknown>;
    const merged = { ...base, ...rest } as ProductDetailProps;
    if (typeof merged.coupangUrl === "string") {
      merged.coupangUrl = normalizeCoupangUrl(merged.coupangUrl) ?? merged.coupangUrl;
    }
    return merged;
  } catch {
    return base;
  }
}

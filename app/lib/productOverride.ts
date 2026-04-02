import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ProductDetailProps } from "@/app/data/products";
import localOverrideData from "@/app/data/productOverrideLocal.json";
import { normalizeCoupangUrl } from "./purchaseLinks";

interface KVStore {
  get(key: string, type: "json"): Promise<Record<string, unknown> | null>;
}

function isStaticBuildPhase() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

async function getKV(): Promise<KVStore | undefined> {
  if (isStaticBuildPhase()) {
    return undefined;
  }

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
    localOverrideCache = localOverrideData as Record<string, Record<string, unknown>>;
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
    const overrideRecord = override as Record<string, unknown>;
    const rest = Object.fromEntries(
      Object.entries(overrideRecord).filter(
        ([key]) => key !== "slug" && key !== "productType" && key !== "updatedAt",
      ),
    );
    const merged = { ...base, ...rest } as ProductDetailProps;
    if (typeof merged.coupangUrl === "string") {
      merged.coupangUrl = normalizeCoupangUrl(merged.coupangUrl) ?? merged.coupangUrl;
    }
    return merged;
  } catch {
    return base;
  }
}

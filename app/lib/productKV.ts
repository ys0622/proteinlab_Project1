/**
 * 제품 KV 저장소 접근
 * - product-override:{slug}: 기존 제품 수정
 * - product-new:{slug}: 신규 제품
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const KV_KEY_OVERRIDE_PREFIX = "product-override:";
export const KV_KEY_NEW_PREFIX = "product-new:";

interface KVStore {
  get(key: string, type: "json"): Promise<Record<string, unknown> | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  list?(options: { prefix?: string; limit?: number; cursor?: string }): Promise<{
    keys: { name: string }[];
    list_complete: boolean;
    cursor?: string;
  }>;
}

function isStaticBuildPhase() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

export async function getProductKV(): Promise<KVStore | undefined> {
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

export function kvKeyOverride(slug: string): string {
  return `${KV_KEY_OVERRIDE_PREFIX}${slug}`;
}

export function kvKeyNew(slug: string): string {
  return `${KV_KEY_NEW_PREFIX}${slug}`;
}

/** KV product-new:* 키 목록 조회 (slug 추출) */
export async function listNewProductSlugs(): Promise<string[]> {
  const kv = await getProductKV();
  if (!kv || typeof kv.list !== "function") return [];

  const slugs: string[] = [];
  let cursor: string | undefined;
  do {
    const result = await kv.list({
      prefix: KV_KEY_NEW_PREFIX,
      limit: 1000,
      cursor,
    });
    for (const k of result.keys) {
      const slug = k.name.slice(KV_KEY_NEW_PREFIX.length);
      if (slug) slugs.push(slug);
    }
    cursor = result.list_complete ? undefined : result.cursor;
  } while (cursor);

  return slugs;
}

/** KV에서 신규 제품 1건 조회 */
export async function getNewProductFromKV(slug: string): Promise<Record<string, unknown> | null> {
  const kv = await getProductKV();
  if (!kv) return null;
  return kv.get(kvKeyNew(slug), "json");
}

/** KV에서 신규 제품 전체 조회 */
export async function getAllNewProductsFromKV(): Promise<Record<string, unknown>[]> {
  const slugs = await listNewProductSlugs();
  if (slugs.length === 0) return [];

  const kv = await getProductKV();
  if (!kv) return [];

  const results: Record<string, unknown>[] = [];
  for (const slug of slugs) {
    const data = await kv.get(kvKeyNew(slug), "json");
    if (data && typeof data === "object" && data.slug) {
      results.push(data as Record<string, unknown>);
    }
  }
  return results;
}

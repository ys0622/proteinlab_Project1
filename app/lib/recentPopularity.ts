import { getCloudflareContext } from "@opennextjs/cloudflare";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  list(options?: { prefix?: string; cursor?: string }): Promise<{
    keys: Array<{ name: string }>;
    list_complete: boolean;
    cursor?: string;
  }>;
}

const VALID_TYPES = ["drink", "bar", "yogurt", "shake"] as const;
type ProductType = (typeof VALID_TYPES)[number];
type ViewCounts = Record<ProductType, Record<string, number>>;
type PopularSnapshot = { views: ViewCounts; generatedAt: string; periodDays: 7 };

const SNAPSHOT_KEY = "popular:views:7d:v1";
const FRESH_MS = 30 * 60 * 1000;
const MAX_STALE_MS = 60 * 60 * 1000;
let backgroundRefresh: Promise<unknown> | undefined;

function last7DayKeys(): Set<string> {
  const days = new Set<string>();
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - i);
    days.add(date.toISOString().slice(0, 10));
  }
  return days;
}

async function recentViewsForType(kv: KVNamespace, type: ProductType, days: Set<string>) {
  const prefix = `view7d:${type}:`;
  const keys: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await kv.list({ prefix, ...(cursor ? { cursor } : {}) });
    keys.push(...page.keys.map(({ name }) => name).filter((name) => days.has(name.slice(-10))));
    if (!page.list_complete && !page.cursor) throw new Error("Incomplete KV key listing");
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  const counts: Record<string, number> = Object.create(null);
  for (let offset = 0; offset < keys.length; offset += 50) {
    const batch = keys.slice(offset, offset + 50);
    const values = await Promise.all(batch.map((key) => kv.get(key)));
    batch.forEach((key, index) => {
      const slug = key.slice(prefix.length, -11);
      const views = Number.parseInt(values[index] ?? "0", 10) || 0;
      if (slug && views > 0) counts[slug] = (counts[slug] ?? 0) + views;
    });
  }
  return counts;
}

async function buildSnapshot(kv: KVNamespace): Promise<PopularSnapshot> {
  const days = last7DayKeys();
  const entries = await Promise.all(
    VALID_TYPES.map(async (type) => [type, await recentViewsForType(kv, type, days)] as const),
  );
  const snapshot: PopularSnapshot = {
    views: Object.fromEntries(entries) as ViewCounts,
    generatedAt: new Date().toISOString(),
    periodDays: 7,
  };
  await kv.put(SNAPSHOT_KEY, JSON.stringify(snapshot));
  return snapshot;
}

function startRefresh(kv: KVNamespace, waitUntil: (promise: Promise<unknown>) => void) {
  if (backgroundRefresh) return;
  backgroundRefresh = buildSnapshot(kv)
    .catch((error) => { console.error("[popular] refresh", error); })
    .finally(() => { backgroundRefresh = undefined; });
  waitUntil(backgroundRefresh);
}

export type PopularityResult = {
  views: ViewCounts | Record<string, never>;
  available: boolean;
  periodDays: 7;
  generatedAt?: string;
};

/** Read the shared KV snapshot directly; avoid a slow Worker-to-itself HTTP request. */
export async function getRecentPopularity(waitForColdStart = false): Promise<PopularityResult> {
  try {
    const { env, ctx } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, KVNamespace>).GUIDES_STATIC_DRAFTS_KV;
    if (!kv) throw new Error("Popularity KV unavailable");

    const cached = await kv.get(SNAPSHOT_KEY);
    if (cached) {
      const snapshot = JSON.parse(cached) as PopularSnapshot;
      const age = Date.now() - Date.parse(snapshot.generatedAt);
      if (snapshot.periodDays === 7 && snapshot.views && Number.isFinite(age) && age >= 0) {
        if (age < FRESH_MS) return { ...snapshot, available: true };
        if (age < MAX_STALE_MS) {
          startRefresh(kv, (promise) => ctx.waitUntil(promise));
          return { ...snapshot, available: true };
        }
      }
    }

    if (waitForColdStart) return { ...await buildSnapshot(kv), available: true };
    startRefresh(kv, (promise) => ctx.waitUntil(promise));
  } catch (error) {
    console.error("[popular]", error);
  }
  return { views: {}, available: false, periodDays: 7 };
}

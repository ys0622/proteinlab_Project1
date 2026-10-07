import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options?: { prefix?: string; cursor?: string }): Promise<{
    keys: Array<{ name: string }>;
    list_complete: boolean;
    cursor?: string;
  }>;
}

const VALID_TYPES = ["drink", "bar", "yogurt", "shake"] as const;
type ProductType = (typeof VALID_TYPES)[number];

// UTC 날짜는 조회 기록을 저장할 때 쓰는 기준과 동일하다.
function last7DayKeys(): Set<string> {
  const keys = new Set<string>();
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    keys.add(d.toISOString().slice(0, 10));
  }
  return keys;
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

  const counts: Record<string, number> = {};
  // KV 조회를 직렬로 수행하면 수십 초가 걸린다. 제한된 배치로 병렬 조회한다.
  for (let offset = 0; offset < keys.length; offset += 50) {
    const batch = keys.slice(offset, offset + 50);
    const values = await Promise.all(batch.map((key) => kv.get(key)));
    batch.forEach((key, index) => {
      const slug = key.slice(prefix.length, -11); // trailing :YYYY-MM-DD
      const views = Number.parseInt(values[index] ?? "0", 10) || 0;
      if (slug && views > 0) counts[slug] = (counts[slug] ?? 0) + views;
    });
  }
  return counts;
}

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, KVNamespace>).GUIDES_STATIC_DRAFTS_KV;

    if (!kv) {
      return NextResponse.json({ views: {}, available: false }, { status: 503 });
    }

    const days = last7DayKeys();
    const entries = await Promise.all(
      VALID_TYPES.map(async (type) => [type, await recentViewsForType(kv, type, days)] as const),
    );
    const result = Object.fromEntries(entries) as Record<ProductType, Record<string, number>>;

    return NextResponse.json({ views: result, available: true, periodDays: 7 }, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (err) {
    console.error("[popular]", err);
    return NextResponse.json({ views: {}, available: false }, { status: 503 });
  }
}

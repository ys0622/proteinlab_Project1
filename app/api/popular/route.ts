import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options?: { prefix?: string }): Promise<{ keys: Array<{ name: string }> }>;
}

const VALID_TYPES = ["drink", "bar", "yogurt", "shake"] as const;
type ProductType = (typeof VALID_TYPES)[number];

// 최근 7일 날짜 키 목록
function last7DayKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, KVNamespace>).GUIDES_STATIC_DRAFTS_KV;

    if (!kv) {
      return NextResponse.json({ views: {} });
    }

    // 각 카테고리별 총 조회수 키 목록 가져오기
    const result: Record<string, Record<string, number>> = {
      drink: {}, bar: {}, yogurt: {}, shake: {},
    };

    for (const type of VALID_TYPES) {
      const listed = await kv.list({ prefix: `view:${type}:` });
      for (const key of listed.keys) {
        const slug = key.name.replace(`view:${type}:`, "");
        const val = await kv.get(key.name);
        result[type][slug] = parseInt(val ?? "0", 10) || 0;
      }
    }

    return NextResponse.json({ views: result }, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (err) {
    console.error("[popular]", err);
    return NextResponse.json({ views: {} });
  }
}

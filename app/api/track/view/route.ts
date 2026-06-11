import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

// Cloudflare Workers KV 타입
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options?: { prefix?: string }): Promise<{ keys: Array<{ name: string }> }>;
}

const VALID_TYPES = ["drink", "bar", "yogurt", "shake"] as const;
type ProductType = (typeof VALID_TYPES)[number];

function isValidType(v: string | null): v is ProductType {
  return VALID_TYPES.includes(v as ProductType);
}

// KV key 형식: view:{type}:{slug}  →  총 조회수
// KV key 형식: view7d:{type}:{slug}:{dayKey}  →  특정 날의 조회수 (7일 슬라이딩 윈도우)
function dayKey(): string {
  return new Date().toISOString().slice(0, 10); // "2026-06-12"
}

export async function POST(request: NextRequest) {
  try {
    const { slug, productType } = await request.json() as { slug?: string; productType?: string };

    if (!slug || typeof slug !== "string" || slug.length > 120) {
      return NextResponse.json({ ok: false, error: "invalid slug" }, { status: 400 });
    }
    if (!isValidType(productType ?? null)) {
      return NextResponse.json({ ok: false, error: "invalid type" }, { status: 400 });
    }

    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, KVNamespace>).GUIDES_STATIC_DRAFTS_KV;
    if (!kv) {
      // 로컬 개발 환경 — KV 없으면 그냥 ok 반환
      return NextResponse.json({ ok: true });
    }

    const totalKey = `view:${productType}:${slug}`;
    const dayKeyStr = `view7d:${productType}:${slug}:${dayKey()}`;

    // 총 조회수 증가 (만료 없음)
    const current = await kv.get(totalKey);
    const next = (parseInt(current ?? "0", 10) || 0) + 1;
    await kv.put(totalKey, String(next));

    // 오늘 조회수 증가 (8일 후 자동 만료 — 7일 슬라이딩 윈도우용)
    const todayVal = await kv.get(dayKeyStr);
    const todayNext = (parseInt(todayVal ?? "0", 10) || 0) + 1;
    await kv.put(dayKeyStr, String(todayNext), { expirationTtl: 60 * 60 * 24 * 8 });

    return NextResponse.json({ ok: true, views: next });
  } catch (err) {
    console.error("[track/view]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const REVIEW_KEY_PREFIX = "review:";
const MAX_REVIEWS_PER_PRODUCT = 200;

interface Review {
  id: string;
  rating: "up" | "mid" | "down";
  tags: string[];
  comment: string;
  createdAt: string;
}

async function getKV() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as
      | { get: (k: string) => Promise<string | null>; put: (k: string, v: string) => Promise<void> }
      | undefined;
    if (kv && typeof kv.get === "function") return kv;
  } catch {
    // local dev without KV
  }
  return null;
}

async function getReviews(slug: string): Promise<Review[]> {
  const kv = await getKV();
  if (!kv) return [];
  try {
    const raw = await kv.get(`${REVIEW_KEY_PREFIX}${slug}`);
    if (!raw) return [];
    return JSON.parse(raw) as Review[];
  } catch {
    return [];
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reviews = await getReviews(slug);
  return NextResponse.json({ reviews });
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let body: { rating?: unknown; tags?: unknown; comment?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { rating, tags, comment } = body;

  if (!rating || !["up", "mid", "down"].includes(rating as string)) {
    return NextResponse.json({ error: "rating is required (up/mid/down)" }, { status: 400 });
  }

  const review: Review = {
    id: crypto.randomUUID(),
    rating: rating as "up" | "mid" | "down",
    tags: Array.isArray(tags) ? (tags as string[]).slice(0, 10) : [],
    comment: typeof comment === "string" ? comment.trim().slice(0, 500) : "",
    createdAt: new Date().toISOString(),
  };

  const kv = await getKV();
  if (!kv) {
    // In local dev without KV, just return success
    return NextResponse.json({ ok: true, review });
  }

  const existing = await getReviews(slug);
  const updated = [review, ...existing].slice(0, MAX_REVIEWS_PER_PRODUCT);
  await kv.put(`${REVIEW_KEY_PREFIX}${slug}`, JSON.stringify(updated));

  return NextResponse.json({ ok: true, review });
}

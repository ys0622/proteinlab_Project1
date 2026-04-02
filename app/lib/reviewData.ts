import { getCloudflareContext } from "@opennextjs/cloudflare";

const REVIEW_KEY_PREFIX = "review:";
const MAX_REVIEWS_PER_PRODUCT = 200;

export interface ProductReview {
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

export async function getReviews(slug: string): Promise<ProductReview[]> {
  const kv = await getKV();
  if (!kv) return [];
  try {
    const raw = await kv.get(`${REVIEW_KEY_PREFIX}${slug}`);
    if (!raw) return [];
    return JSON.parse(raw) as ProductReview[];
  } catch {
    return [];
  }
}

export async function saveReview(slug: string, review: ProductReview) {
  const kv = await getKV();
  if (!kv) {
    return { ok: true, review };
  }

  const existing = await getReviews(slug);
  const updated = [review, ...existing].slice(0, MAX_REVIEWS_PER_PRODUCT);
  await kv.put(`${REVIEW_KEY_PREFIX}${slug}`, JSON.stringify(updated));

  return { ok: true, review };
}

import type { ProductDetailProps } from "../data/products";
import newProductsRaw from "../data/newProducts.json";
import { isExcludedFromPopularityRanking } from "./productScoring";

export type DiscoveryReason = "coupang_best" | "recently_added" | "site_interest";
export type DiscoveryProduct = { product: ProductDetailProps; reason: DiscoveryReason };

const addedDates = new Map(
  (newProductsRaw as { slug: string; addedAt: string }[]).map(({ slug, addedAt }) => [slug, addedAt]),
);
const RECENT_DAYS = 30;

function daysSinceAdded(product: ProductDetailProps, now: number): number | null {
  // For KV-created products this is assigned by the server, not supplied by a visitor.
  const createdAt = product.createdAt ?? addedDates.get(product.slug);
  if (!createdAt) return null;
  const created = Date.parse(createdAt);
  const days = Math.floor((now - created) / 86_400_000);
  return Number.isFinite(days) && days >= 0 && days < RECENT_DAYS ? days : null;
}

/** A discovery shelf, not a sales ranking: up to 4 verified best, 2 recent, then site interest. */
export function selectHomeDiscovery(
  products: ProductDetailProps[],
  views: Record<string, number>,
  coupangRanks: Record<string, number>,
  now = Date.now(),
  limit = 10,
): DiscoveryProduct[] {
  const eligible = products.filter((product) => product.slug && !isExcludedFromPopularityRanking(product));
  const best = eligible
    .filter((product) => Number.isInteger(coupangRanks[product.slug]) && coupangRanks[product.slug] > 0)
    .sort((a, b) => coupangRanks[a.slug] - coupangRanks[b.slug] || (views[b.slug] ?? 0) - (views[a.slug] ?? 0));
  const recent = eligible
    .map((product) => ({ product, age: daysSinceAdded(product, now) }))
    .filter((entry): entry is { product: ProductDetailProps; age: number } => entry.age !== null)
    .sort((a, b) => (views[b.product.slug] ?? 0) - (views[a.product.slug] ?? 0) || a.age - b.age || a.product.slug.localeCompare(b.product.slug))
    .map(({ product }) => product);
  const interest = eligible
    .filter((product) => (views[product.slug] ?? 0) > 0)
    .sort((a, b) => (views[b.slug] ?? 0) - (views[a.slug] ?? 0) || a.name.localeCompare(b.name));

  const result: DiscoveryProduct[] = [];
  const seen = new Set<string>();
  const brandCounts = new Map<string, number>();
  const sourceCounts: Record<DiscoveryReason, number> = { coupang_best: 0, recently_added: 0, site_interest: 0 };
  const sourceLimits: Record<DiscoveryReason, number> = { coupang_best: 4, recently_added: 2, site_interest: limit };
  const sources = { coupang_best: best, recently_added: recent, site_interest: interest };
  // No verified Coupang result? A recent registration may lead, but never receives a sales-rank badge.
  const order: DiscoveryReason[] = best.length
    ? ["coupang_best", "site_interest", "recently_added", "coupang_best", "site_interest", "recently_added", "coupang_best", "site_interest", "coupang_best", "site_interest"]
    : ["recently_added", "site_interest", "recently_added", "site_interest"];

  function addNext(reason: DiscoveryReason): boolean {
    if (sourceCounts[reason] >= sourceLimits[reason]) return false;
    const product = sources[reason].find((candidate) =>
      !seen.has(candidate.slug) && (brandCounts.get(candidate.brand) ?? 0) < 2,
    );
    if (!product) return false;
    seen.add(product.slug);
    brandCounts.set(product.brand, (brandCounts.get(product.brand) ?? 0) + 1);
    sourceCounts[reason] += 1;
    result.push({ product, reason });
    return true;
  }

  for (const reason of order) {
    if (result.length >= limit) break;
    if (!addNext(reason)) {
      for (const fallback of ["site_interest", "coupang_best", "recently_added"] as const) {
        if (addNext(fallback)) break;
      }
    }
  }
  while (result.length < limit && (["site_interest", "coupang_best", "recently_added"] as const).some(addNext)) {
    // Fill gaps while respecting source and brand limits.
  }
  return result;
}

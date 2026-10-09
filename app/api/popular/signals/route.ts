import { NextResponse } from "next/server";
import { getAllProductsAsync } from "@/app/lib/productData";
import { getCoupangCategoryBest, matchCoupangCategoryBest } from "@/app/lib/coupangCategoryBest";
import { getRecentPopularity } from "@/app/lib/recentPopularity";
import { selectHomeDiscovery } from "@/app/lib/homeDiscovery";

export const dynamic = "force-dynamic";

export async function GET() {
  const [snapshot, products, popularity] = await Promise.all([
    getCoupangCategoryBest(true), getAllProductsAsync(), getRecentPopularity(true),
  ]);
  const matches = matchCoupangCategoryBest(products, snapshot);
  const categories = ["drink", "bar", "yogurt", "shake"] as const;
  const discovery = Object.fromEntries(categories.map((category) => [
    category,
    selectHomeDiscovery(
      products.filter((product) => product.productType === category),
      popularity.views[category] ?? {},
      matches,
    ).map(({ product, reason }) => ({ slug: product.slug, name: product.name, brand: product.brand, reason })),
  ]));
  return NextResponse.json({
    status: snapshot.status,
    checkedAt: snapshot.checkedAt,
    sourceCount: snapshot.offers.length,
    matchedCount: Object.keys(matches).length,
    matchedSlugs: Object.keys(matches),
    discovery,
    error: snapshot.error ?? null,
  }, { headers: { "Cache-Control": "no-store" } });
}

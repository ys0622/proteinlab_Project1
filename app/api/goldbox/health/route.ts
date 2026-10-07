import { NextResponse } from "next/server";
import { fetchGoldboxSnapshot, matchRegisteredProductsToGoldbox } from "@/app/lib/coupangGoldbox";
import { getVerifiedGoldboxOffers } from "@/app/lib/goldboxVerifiedOffers";
import { getAllProductsAsync } from "@/app/lib/productData";

export const dynamic = "force-dynamic";

export async function GET() {
  const [snapshot, products, verified] = await Promise.all([
    fetchGoldboxSnapshot(), getAllProductsAsync(), getVerifiedGoldboxOffers(),
  ]);
  const matched = matchRegisteredProductsToGoldbox(products, snapshot.products);
  const apiSlugs = new Set(matched.map(item => item.product.slug));
  const missingVerified = verified.filter(item => !apiSlugs.has(item.slug));

  return NextResponse.json({
    status: snapshot.status,
    checkedAt: snapshot.checkedAt,
    sourceCount: snapshot.sourceCount ?? snapshot.products.length,
    validCount: snapshot.products.length,
    invalidCount: snapshot.invalidCount ?? 0,
    dailyBaselineCount: snapshot.dailyBaselineCount ?? null,
    suspiciousDrop: snapshot.suspiciousDrop ?? false,
    matchedCount: matched.length,
    matchedByIdCount: matched.filter(item => item.matchedBy === "product_id").length,
    verifiedCount: verified.length,
    verifiedMissingFromApiCount: missingVerified.length,
    // API success does not prove that its listing mirrors the Coupang app.
    coverage: missingVerified.length > 0 ? "confirmed_gap" : "unverified",
    error: snapshot.error ?? null,
  }, { headers: { "Cache-Control": "no-store" } });
}

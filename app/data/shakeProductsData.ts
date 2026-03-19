import type { ProductDetailProps } from "./products";
import { isCoupangUrl, normalizeCoupangUrl } from "../lib/purchaseLinks";
import shakeData from "./shakeProductsData.json";

function withCoupangUrl<T extends { productUrl?: string; coupangUrl?: string }>(p: T): T {
  const sourceUrl = p.coupangUrl ?? (p.productUrl && isCoupangUrl(p.productUrl) ? p.productUrl : undefined);
  const coupangUrl = normalizeCoupangUrl(sourceUrl) ?? undefined;
  return { ...p, coupangUrl };
}

export function getShakeProducts(): ProductDetailProps[] {
  return (shakeData as ProductDetailProps[]).map((product) =>
    withCoupangUrl({
      ...product,
      slug: product.slug,
      productType: "shake" as const,
    }),
  );
}

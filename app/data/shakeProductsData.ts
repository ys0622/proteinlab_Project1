import type { ProductDetailProps } from "./products";
import { isCoupangUrl } from "../lib/purchaseLinks";
import shakeData from "./shakeProductsData.json";

function withCoupangUrl<T extends { productUrl?: string; coupangUrl?: string }>(p: T): T {
  const coupangUrl = p.coupangUrl ?? (p.productUrl && isCoupangUrl(p.productUrl) ? p.productUrl : undefined);
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

import type { ProductDetailProps } from "./products";
import { isCoupangUrl, normalizeCoupangUrl } from "../lib/purchaseLinks";
import soymilkData from "./soymilkProductsData.json";

function withCoupangUrl<T extends { productUrl?: string; coupangUrl?: string }>(p: T): T {
  const sourceUrl = p.coupangUrl ?? (p.productUrl && isCoupangUrl(p.productUrl) ? p.productUrl : undefined);
  const coupangUrl = normalizeCoupangUrl(sourceUrl) ?? undefined;
  return { ...p, coupangUrl };
}

export function getSoymilkProducts(): ProductDetailProps[] {
  return (soymilkData as ProductDetailProps[]).map((product) =>
    withCoupangUrl({
      ...product,
      slug: product.slug,
      productType: "soymilk" as const,
    }),
  );
}

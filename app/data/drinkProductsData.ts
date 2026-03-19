import type { ProductDetailProps } from "./products";
import { isCoupangUrl } from "../lib/purchaseLinks";
import drinkData from "./drinkProductsData.json";
import slugToImage from "./slugToImage.json";

const imageMap = slugToImage as Record<string, string>;

function withCoupangUrl<T extends { productUrl?: string; coupangUrl?: string }>(p: T): T {
  const coupangUrl = p.coupangUrl ?? (p.productUrl && isCoupangUrl(p.productUrl) ? p.productUrl : undefined);
  return { ...p, coupangUrl };
}

export function getDrinkProducts(): ProductDetailProps[] {
  return (drinkData as ProductDetailProps[]).map((p) =>
    withCoupangUrl({
      ...p,
      slug: p.slug,
      productType: "drink" as const,
    }),
  );
}

const IMAGE_BASE = "/rtd-drink-image";

export function getProductImageUrl(slug: string): string | null {
  const filename = imageMap[slug];
  if (!filename) return null;
  return `${IMAGE_BASE}/${encodeURIComponent(filename)}`;
}

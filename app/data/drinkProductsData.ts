import type { ProductDetailProps } from "./products";
import drinkData from "./drinkProductsData.json";
import slugToImage from "./slugToImage.json";

const imageMap = slugToImage as Record<string, string>;

export function getDrinkProducts(): ProductDetailProps[] {
  return (drinkData as ProductDetailProps[]).map((p) => ({
    ...p,
    slug: p.slug,
    productType: "drink" as const,
  }));
}

const IMAGE_BASE = "/rtd-drink-image";

export function getProductImageUrl(slug: string): string | null {
  const filename = imageMap[slug];
  if (!filename) return null;
  return `${IMAGE_BASE}/${encodeURIComponent(filename)}`;
}

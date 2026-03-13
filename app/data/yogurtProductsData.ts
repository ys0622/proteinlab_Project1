import type { ProductDetailProps } from "./products";
import yogurtData from "./yogurtProductsData.json";

export function getYogurtProducts(): ProductDetailProps[] {
  return (yogurtData as ProductDetailProps[]).map((product) => ({
    ...product,
    slug: product.slug,
    productType: "yogurt" as const,
  }));
}

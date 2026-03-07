import type { ProductDetailProps } from "./products";
import barData from "./barProductsData.json";

export function getBarProducts(): ProductDetailProps[] {
  return (barData as ProductDetailProps[]).map((p) => ({
    ...p,
    productType: "bar" as const,
  }));
}

export const mockBarProducts: ProductDetailProps[] = getBarProducts();

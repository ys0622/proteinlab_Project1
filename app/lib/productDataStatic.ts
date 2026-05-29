import {
  barProductsWithGrades,
  mockProducts,
  shakeProducts,
  type ProductDetailProps,
  yogurtProductsWithGrades,
} from "@/app/data/products";
import localOverrideData from "@/app/data/productOverrideLocal.json";
import { normalizeCoupangUrl } from "./purchaseLinks";

export type ProductCategory = "drink" | "bar" | "yogurt" | "shake";

type ProductOverrideRecord = Record<string, Record<string, unknown>>;

function applyLocalOverride(base: ProductDetailProps): ProductDetailProps {
  const override = (localOverrideData as ProductOverrideRecord)[base.slug];
  if (!override) {
    return base;
  }

  const sanitizedOverride = Object.fromEntries(
    Object.entries(override).filter(
      ([key]) => key !== "slug" && key !== "productType" && key !== "updatedAt",
    ),
  );

  const merged = { ...base, ...sanitizedOverride } as ProductDetailProps;
  if (typeof merged.coupangUrl === "string") {
    merged.coupangUrl = normalizeCoupangUrl(merged.coupangUrl) ?? merged.coupangUrl;
  }
  return merged;
}

const staticProductsByCategory: Record<ProductCategory, ProductDetailProps[]> = {
  drink: mockProducts.map(applyLocalOverride),
  bar: barProductsWithGrades.map(applyLocalOverride),
  yogurt: yogurtProductsWithGrades.map(applyLocalOverride),
  shake: shakeProducts.map(applyLocalOverride),
};

const allStaticProducts = [
  ...staticProductsByCategory.drink,
  ...staticProductsByCategory.bar,
  ...staticProductsByCategory.yogurt,
  ...staticProductsByCategory.shake,
];

export function getStaticProductsByCategory(category: ProductCategory): ProductDetailProps[] {
  return staticProductsByCategory[category];
}

export function getStaticProductBySlug(slug: string): ProductDetailProps | null {
  return allStaticProducts.find((product) => product.slug === slug) ?? null;
}

export function getAllStaticProducts(): ProductDetailProps[] {
  return allStaticProducts;
}

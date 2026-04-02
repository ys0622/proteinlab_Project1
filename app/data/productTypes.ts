import type { CoupangLinkCategory } from "../lib/purchaseLinks";

export interface ProductCardProps {
  brand: string;
  name: string;
  capacity: string;
  variant?: string;
  tags: string[];
  proteinPerServing: number;
  calories?: number;
  sugar?: number;
  density: string;
  productUrl?: string;
  coupangUrl?: string;
  naverUrl?: string | null;
  officialUrl?: string | null;
  gradeTags?: string[];
  slug?: string;
  priority?: boolean;
  productType?: "drink" | "bar" | "yogurt" | "shake";
  yogurtType?: string;
  purchaseLinkCategory?: CoupangLinkCategory | null;
  maxVisibleBadges?: number;
  fixedTitleLines?: 1 | 2;
  hideSupplementalBadges?: boolean;
  price?: number;
}

export interface NutritionDetailRow {
  label: string;
  value: string;
}

export interface NutritionPerBottle {
  caloriesKcal?: number;
  proteinG?: number;
  carbsG?: number;
  sugarsG?: number;
  fatG?: number;
  satFatG?: number;
  transFatG?: number;
  cholesterolMg?: number;
  sodiumMg?: number;
  fiberG?: number;
  bcaaMg?: number;
}

export interface ProductDetailFields {
  slug: string;
  productType?: "drink" | "bar" | "yogurt" | "shake";
  nutritionBasis?: "per_unit" | "per_pack" | "unknown";
  needsServingCheck?: boolean;
  servingCheckNote?: string;
  manufacturer?: string;
  flavor?: string;
  bcaa?: string;
  proteinSource?: string;
  fat?: number;
  sodium?: number;
  calorieDensity?: string;
  drinkType?: string;
  yogurtType?: string;
  storageType?: string;
  lactoseFree?: boolean;
  proteinPer100g?: number;
  gradeDescriptions?: [string, string, string];
  nutritionDetail?: NutritionDetailRow[];
  nutritionPerBottle?: NutritionPerBottle;
}

export type ProductDetailProps = ProductCardProps & ProductDetailFields;

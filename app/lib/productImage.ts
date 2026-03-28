import slugToImage from "../data/slugToImage.json";
import slugToBarImage from "../data/slugToBarImage.json";
import slugToShakeImage from "../data/slugToShakeImage.json";
import slugToYogurtImage from "../data/slugToYogurtImage.json";
import slugToBarSpec from "../data/slugToBarSpec.json";
import slugToDrinkSpec from "../data/slugToDrinkSpec.json";
import slugToShakeSpec from "../data/slugToShakeSpec.json";
import slugToYogurtSpec from "../data/slugToYogurtSpec.json";

const drinkImageMap: Record<string, string> = slugToImage;
const barImageMap: Record<string, string> = slugToBarImage;
const shakeImageMap: Record<string, string> = slugToShakeImage;
const yogurtImageMap: Record<string, string> = slugToYogurtImage;
const barSpecImageMap: Record<string, string> = slugToBarSpec;
const drinkSpecImageMap: Record<string, string> = slugToDrinkSpec;
const shakeSpecImageMap: Record<string, string> = slugToShakeSpec;
const yogurtSpecImageMap: Record<string, string> = slugToYogurtSpec;

const DRINK_IMAGE_BASE = "/rtd-drink-image";
const DRINK_SPEC_IMAGE_BASE = "/rtd-drink-spec";
const BAR_IMAGE_BASE = "/bar-image";
const BAR_SPEC_IMAGE_BASE = "/bar-spec";
const SHAKE_IMAGE_BASE = "/shake-image";
const SHAKE_SPEC_IMAGE_BASE = "/shake-spec";
const YOGURT_IMAGE_BASE = "/protein-yogurt-image";
const YOGURT_SPEC_IMAGE_BASE = "/protein-yogurt-spec";

export function getProductImageFilename(slug: string): string | null {
  return drinkImageMap[slug] ?? barImageMap[slug] ?? shakeImageMap[slug] ?? yogurtImageMap[slug] ?? null;
}

/** 제품 상세/카드에서 쓸 이미지 URL. 없으면 null */
export function getProductImageUrl(slug: string): string | null {
  if (drinkImageMap[slug]) {
    return `${DRINK_IMAGE_BASE}/${encodeURIComponent(drinkImageMap[slug])}`;
  }
  if (barImageMap[slug]) {
    return `${BAR_IMAGE_BASE}/${encodeURIComponent(barImageMap[slug])}`;
  }
  if (shakeImageMap[slug]) {
    return `${SHAKE_IMAGE_BASE}/${encodeURIComponent(shakeImageMap[slug])}`;
  }
  if (yogurtImageMap[slug]) {
    return `${YOGURT_IMAGE_BASE}/${encodeURIComponent(yogurtImageMap[slug])}`;
  }
  return null;
}

export function getDrinkSpecImageUrl(slug: string): string | null {
  const filename = drinkSpecImageMap[slug];
  if (!filename) return null;
  return `${DRINK_SPEC_IMAGE_BASE}/${encodeURIComponent(filename)}`;
}

export function getBarSpecImageUrl(slug: string): string | null {
  const filename = barSpecImageMap[slug];
  if (!filename) return null;
  return `${BAR_SPEC_IMAGE_BASE}/${encodeURIComponent(filename)}`;
}

export function getShakeSpecImageUrl(slug: string): string | null {
  const filename = shakeSpecImageMap[slug];
  if (!filename) return null;
  return `${SHAKE_SPEC_IMAGE_BASE}/${encodeURIComponent(filename)}`;
}

export function getYogurtSpecImageUrl(slug: string): string | null {
  const filename = yogurtSpecImageMap[slug];
  if (!filename) return null;
  return `${YOGURT_SPEC_IMAGE_BASE}/${encodeURIComponent(filename)}`;
}

export function getProductSpecImageUrl(
  slug: string,
  productType?: "drink" | "bar" | "yogurt" | "shake",
): string | null {
  if (productType === "drink") return getDrinkSpecImageUrl(slug);
  if (productType === "bar") return getBarSpecImageUrl(slug);
  if (productType === "yogurt") return getYogurtSpecImageUrl(slug);
  if (productType === "shake") return getShakeSpecImageUrl(slug);
  return null;
}

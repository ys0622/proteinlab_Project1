import slugToImage from "../data/slugToImage.json";
import slugToBarImage from "../data/slugToBarImage.json";
import slugToShakeImage from "../data/slugToShakeImage.json";
import slugToYogurtImage from "../data/slugToYogurtImage.json";
import slugToDrinkSpec from "../data/slugToDrinkSpec.json";

const drinkImageMap: Record<string, string> = slugToImage;
const barImageMap: Record<string, string> = slugToBarImage;
const shakeImageMap: Record<string, string> = slugToShakeImage;
const yogurtImageMap: Record<string, string> = slugToYogurtImage;
const drinkSpecImageMap: Record<string, string> = slugToDrinkSpec;

const DRINK_IMAGE_BASE = "/rtd-drink-image";
const DRINK_SPEC_IMAGE_BASE = "/rtd-drink-spec";
const BAR_IMAGE_BASE = "/bar-image";
const SHAKE_IMAGE_BASE = "/shake-image";
const YOGURT_IMAGE_BASE = "/protein-yogurt-image";

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

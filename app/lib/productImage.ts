import slugToImage from "../data/slugToImage.json";
import slugToBarImage from "../data/slugToBarImage.json";
import slugToYogurtImage from "../data/slugToYogurtImage.json";

const drinkImageMap: Record<string, string> = slugToImage;
const barImageMap: Record<string, string> = slugToBarImage;
const yogurtImageMap: Record<string, string> = slugToYogurtImage;

const DRINK_IMAGE_BASE = "/rtd-drink-image";
const BAR_IMAGE_BASE = "/bar-image";
const YOGURT_IMAGE_BASE = "/protein-yogurt-image";

export function getProductImageFilename(slug: string): string | null {
  return drinkImageMap[slug] ?? barImageMap[slug] ?? yogurtImageMap[slug] ?? null;
}

/** 제품 상세/카드에서 쓸 이미지 URL. 없으면 null */
export function getProductImageUrl(slug: string): string | null {
  if (drinkImageMap[slug]) {
    return `${DRINK_IMAGE_BASE}/${encodeURIComponent(drinkImageMap[slug])}`;
  }
  if (barImageMap[slug]) {
    return `${BAR_IMAGE_BASE}/${encodeURIComponent(barImageMap[slug])}`;
  }
  if (yogurtImageMap[slug]) {
    return `${YOGURT_IMAGE_BASE}/${encodeURIComponent(yogurtImageMap[slug])}`;
  }
  return null;
}

const GUIDE_THUMBNAIL_SLUGS = new Set([
  "protein-shake-top7",
  "protein-shake-calorie-ranking",
  "oliveyoung-protein-shake",
  "protein-shake-new-products-2026",
  "takefit-breadmeal-protein-shake",
  "low-sugar-protein-shake-guide",
  "protein-shake-flavor-guide",
  "protein-shake-nutrition-label-guide",
]);

export function getGuideThumbnailUrl(slug: string) {
  return GUIDE_THUMBNAIL_SLUGS.has(slug)
    ? `/guide-thumbnails/${encodeURIComponent(slug)}.png`
    : null;
}

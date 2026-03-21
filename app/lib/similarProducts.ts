import type { ProductDetailProps } from "../data/products";

function densityValue(density?: string) {
  const match = density?.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function capacityValue(capacity?: string) {
  const match = capacity?.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

export function getSimilarProducts(
  source: ProductDetailProps,
  candidates: ProductDetailProps[],
  limit = 6,
) {
  const sourceDensity = densityValue(source.density);
  const sourceCapacity = capacityValue(source.capacity);

  return candidates
    .filter(
      (candidate) =>
        candidate.slug !== source.slug && candidate.productType === source.productType,
    )
    .map((candidate) => {
      let score = 0;
      score += Math.max(0, 40 - Math.abs((candidate.proteinPerServing ?? 0) - (source.proteinPerServing ?? 0)) * 4);
      score += Math.max(0, 20 - Math.abs((candidate.sugar ?? 0) - (source.sugar ?? 0)) * 3);
      score += Math.max(0, 14 - Math.abs((candidate.calories ?? 0) - (source.calories ?? 0)) / 10);
      score += Math.max(0, 14 - Math.abs(densityValue(candidate.density) - sourceDensity) * 4);
      score += Math.max(0, 8 - Math.abs(capacityValue(candidate.capacity) - sourceCapacity) / 50);

      if (candidate.brand === source.brand) score -= 6;
      if (source.productType === "yogurt" && candidate.yogurtType === source.yogurtType) score += 6;
      if (source.productType === "drink" && candidate.drinkType === source.drinkType) score += 6;
      if (source.productType === "shake" && candidate.flavor === source.flavor) score += 4;

      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}

import type { ProductDetailProps } from "../data/products";
import { getPopularityScore } from "./productPopularity";

function densityValue(density?: string) {
  const match = density?.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function capacityValue(capacity?: string) {
  const match = capacity?.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function normalizedTokens(value?: string) {
  if (!value) return [];

  return value
    .toLowerCase()
    .split(/[^a-z0-9가-힣]+/)
    .filter((token) => token.length >= 2);
}

function tokenOverlapScore(source: ProductDetailProps, candidate: ProductDetailProps) {
  const sourceTokens = new Set(normalizedTokens(`${source.brand} ${source.name} ${source.flavor ?? ""}`));
  const candidateTokens = normalizedTokens(`${candidate.brand} ${candidate.name} ${candidate.flavor ?? ""}`);
  const overlap = candidateTokens.filter((token) => sourceTokens.has(token)).length;
  return Math.min(6, overlap * 2);
}

export function getSimilarProducts(
  source: ProductDetailProps,
  candidates: ProductDetailProps[],
  limit = 6,
) {
  const sourceDensity = densityValue(source.density);
  const sourceCapacity = capacityValue(source.capacity);
  const sourcePopularity = getPopularityScore(source, source.productType ?? "drink") ?? 0;

  return candidates
    .filter(
      (candidate) =>
        candidate.slug !== source.slug && candidate.productType === source.productType,
    )
    .map((candidate) => {
      const candidatePopularity = getPopularityScore(candidate, candidate.productType ?? "drink") ?? 0;
      let score = 0;
      score += Math.max(0, 40 - Math.abs((candidate.proteinPerServing ?? 0) - (source.proteinPerServing ?? 0)) * 4);
      score += Math.max(0, 20 - Math.abs((candidate.sugar ?? 0) - (source.sugar ?? 0)) * 3);
      score += Math.max(0, 14 - Math.abs((candidate.calories ?? 0) - (source.calories ?? 0)) / 10);
      score += Math.max(0, 14 - Math.abs(densityValue(candidate.density) - sourceDensity) * 4);
      score += Math.max(0, 8 - Math.abs(capacityValue(candidate.capacity) - sourceCapacity) / 50);
      score += tokenOverlapScore(source, candidate);
      score += Math.min(6, Math.abs(candidatePopularity - sourcePopularity) <= 180 ? 6 : 0);

      if (candidate.brand === source.brand) score -= 12;
      if (source.productType === "yogurt" && candidate.yogurtType === source.yogurtType) score += 6;
      if (source.productType === "drink" && candidate.drinkType === source.drinkType) score += 6;
      if (source.productType === "shake" && candidate.flavor === source.flavor) score += 4;
      if (source.storageType && candidate.storageType === source.storageType) score += 3;
      if (source.lactoseFree && candidate.lactoseFree === source.lactoseFree) score += 2;

      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}

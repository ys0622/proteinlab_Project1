import { barProductsWithGrades, mockProducts } from "../data/products";
import { getCurationDefinition, getRecommendedProductsForCuration } from "./curationSystem";

export function getCurationLandingData(slug: string) {
  const curation = getCurationDefinition(slug);
  if (!curation || !curation.heroTitle) return null;

  const drinkProducts = curation.categories.drink
    ? mockProducts.filter(curation.categories.drink.filter)
    : [];
  const barProducts = curation.categories.bar
    ? barProductsWithGrades.filter(curation.categories.bar.filter)
    : [];

  const recommendedDrinks = curation.categories.drink
    ? getRecommendedProductsForCuration(mockProducts, "drink", slug, 6)
    : [];
  const recommendedBars = curation.categories.bar
    ? getRecommendedProductsForCuration(barProductsWithGrades, "bar", slug, 6)
    : [];

  return {
    curation,
    drinkProducts,
    recommendedDrinks,
    barProducts,
    recommendedBars,
  };
}

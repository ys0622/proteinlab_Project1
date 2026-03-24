import { proteinShakeCalorieRankingConfig } from "../proteinCategoryContent";
import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";

export const metadata = buildCategoryGuideMetadata(proteinShakeCalorieRankingConfig);

export default function ProteinShakeCalorieRankingPage() {
  return <CategoryGuidePage config={proteinShakeCalorieRankingConfig} />;
}

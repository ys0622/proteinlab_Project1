import { dietProteinShakeConfig } from "../proteinCategoryContent";
import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";

export const metadata = buildCategoryGuideMetadata(dietProteinShakeConfig);

export default function DietProteinShakePage() {
  return <CategoryGuidePage config={dietProteinShakeConfig} />;
}

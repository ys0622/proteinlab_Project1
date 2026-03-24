import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { morningProteinShakeConfig } from "../proteinShakeLifestyleContent";

export const metadata = buildCategoryGuideMetadata(morningProteinShakeConfig);

export default function MorningProteinShakePage() {
  return <CategoryGuidePage config={morningProteinShakeConfig} />;
}

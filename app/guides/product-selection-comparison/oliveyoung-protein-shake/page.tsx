import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { oliveYoungProteinShakeConfig } from "../proteinShakeLifestyleContent";

export const metadata = buildCategoryGuideMetadata(oliveYoungProteinShakeConfig);

export default function OliveYoungProteinShakePage() {
  return <CategoryGuidePage config={oliveYoungProteinShakeConfig} />;
}

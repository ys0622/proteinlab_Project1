import { proteinCategoryGuideConfig } from "../proteinCategoryContent";
import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";

export const metadata = buildCategoryGuideMetadata(proteinCategoryGuideConfig);

export default function ProteinCategoryGuidePage() {
  return <CategoryGuidePage config={proteinCategoryGuideConfig} />;
}

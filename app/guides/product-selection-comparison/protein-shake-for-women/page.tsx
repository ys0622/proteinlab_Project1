import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { proteinShakeForWomenConfig } from "../proteinShakeLifestyleContent";

export const metadata = buildCategoryGuideMetadata(proteinShakeForWomenConfig);

export default function ProteinShakeForWomenPage() {
  return <CategoryGuidePage config={proteinShakeForWomenConfig} />;
}

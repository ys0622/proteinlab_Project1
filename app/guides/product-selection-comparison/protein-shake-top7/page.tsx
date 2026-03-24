import { proteinShakeTop7Config } from "../proteinCategoryContent";
import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";

export const metadata = buildCategoryGuideMetadata(proteinShakeTop7Config);

export default function ProteinShakeTop7Page() {
  return <CategoryGuidePage config={proteinShakeTop7Config} />;
}

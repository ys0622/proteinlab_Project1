import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { proteinYogurtTop5Config } from "../proteinYogurtContent";

export const metadata = buildCategoryGuideMetadata(proteinYogurtTop5Config);

export default function ProteinYogurtTop5Page() {
  return <CategoryGuidePage config={proteinYogurtTop5Config} />;
}

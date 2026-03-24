import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { greekVsProteinYogurtConfig } from "../proteinYogurtContent";

export const metadata = buildCategoryGuideMetadata(greekVsProteinYogurtConfig);

export default function GreekVsProteinYogurtPage() {
  return <CategoryGuidePage config={greekVsProteinYogurtConfig} />;
}

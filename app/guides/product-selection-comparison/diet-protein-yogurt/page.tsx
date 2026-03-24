import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { dietProteinYogurtConfig } from "../proteinYogurtContent";

export const metadata = buildCategoryGuideMetadata(dietProteinYogurtConfig);

export default function DietProteinYogurtPage() {
  return <CategoryGuidePage config={dietProteinYogurtConfig} />;
}

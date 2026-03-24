import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { dietProteinBarConfig } from "../proteinBarContent";

export const metadata = buildCategoryGuideMetadata(dietProteinBarConfig);

export default function DietProteinBarPage() {
  return <CategoryGuidePage config={dietProteinBarConfig} />;
}

import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { convenienceProteinBarConfig } from "../proteinBarContent";

export const metadata = buildCategoryGuideMetadata(convenienceProteinBarConfig);

export default function ConvenienceProteinBarPage() {
  return <CategoryGuidePage config={convenienceProteinBarConfig} />;
}

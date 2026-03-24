import { labnoshLineupConfig } from "../proteinCategoryContent";
import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";

export const metadata = buildCategoryGuideMetadata(labnoshLineupConfig);

export default function LabnoshLineupPage() {
  return <CategoryGuidePage config={labnoshLineupConfig} />;
}

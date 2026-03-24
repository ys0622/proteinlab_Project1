import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { proteinBarTop10Config } from "../proteinBarContent";

export const metadata = buildCategoryGuideMetadata(proteinBarTop10Config);

export default function ProteinBarTop10Page() {
  return <CategoryGuidePage config={proteinBarTop10Config} />;
}

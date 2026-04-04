import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";
import { proteinDrinkTop10Config } from "../proteinDrinkTop10Content";

export const metadata = buildCategoryGuideMetadata(proteinDrinkTop10Config);

export default function ProteinDrinkTop10Page() {
  return <CategoryGuidePage config={proteinDrinkTop10Config} />;
}

import { proteinDrinkTasteTipsConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinDrinkTasteTipsConfig);

export default function ProteinDrinkTasteTipsPage() {
  return <ComparisonGuidePage config={proteinDrinkTasteTipsConfig} />;
}

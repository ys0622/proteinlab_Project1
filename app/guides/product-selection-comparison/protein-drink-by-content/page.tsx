import { proteinDrinkByContentConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinDrinkByContentConfig);

export default function ProteinDrinkByContentPage() {
  return <ComparisonGuidePage config={proteinDrinkByContentConfig} />;
}

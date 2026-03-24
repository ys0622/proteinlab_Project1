import { proteinDrinkBeginnersGuideConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinDrinkBeginnersGuideConfig);

export default function ProteinDrinkBeginnersGuidePage() {
  return <ComparisonGuidePage config={proteinDrinkBeginnersGuideConfig} />;
}

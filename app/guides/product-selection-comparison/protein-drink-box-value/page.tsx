import { proteinDrinkBoxValueConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinDrinkBoxValueConfig);

export default function ProteinDrinkBoxValuePage() {
  return <ComparisonGuidePage config={proteinDrinkBoxValueConfig} />;
}

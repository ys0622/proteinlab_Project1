import { proteinDrinkByFlavorConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinDrinkByFlavorConfig);

export default function ProteinDrinkByFlavorPage() {
  return <ComparisonGuidePage config={proteinDrinkByFlavorConfig} />;
}

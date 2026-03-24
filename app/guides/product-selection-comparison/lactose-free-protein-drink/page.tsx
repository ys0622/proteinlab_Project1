import { lactoseFreeProteinDrinkConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(lactoseFreeProteinDrinkConfig);

export default function LactoseFreeProteinDrinkPage() {
  return <ComparisonGuidePage config={lactoseFreeProteinDrinkConfig} />;
}

import { soymilkVsProteinDrinkConfig } from "../soymilkGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(soymilkVsProteinDrinkConfig);

export default function SoymilkVsProteinDrinkPage() {
  return <ComparisonGuidePage config={soymilkVsProteinDrinkConfig} />;
}

import { soymilkBrandCompareConfig } from "../soymilkGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(soymilkBrandCompareConfig);

export default function SoymilkBrandComparisonPage() {
  return <ComparisonGuidePage config={soymilkBrandCompareConfig} />;
}

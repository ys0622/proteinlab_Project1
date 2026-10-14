import { blackbeanSoymilkConfig } from "../soymilkGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(blackbeanSoymilkConfig);

export default function BlackbeanSoymilkGuidePage() {
  return <ComparisonGuidePage config={blackbeanSoymilkConfig} />;
}

import { lowSugarSoymilkConfig } from "../soymilkGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(lowSugarSoymilkConfig);

export default function LowSugarSoymilkGuidePage() {
  return <ComparisonGuidePage config={lowSugarSoymilkConfig} />;
}

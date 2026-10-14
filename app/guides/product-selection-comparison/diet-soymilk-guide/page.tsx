import { dietSoymilkConfig } from "../soymilkGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(dietSoymilkConfig);

export default function DietSoymilkGuidePage() {
  return <ComparisonGuidePage config={dietSoymilkConfig} />;
}

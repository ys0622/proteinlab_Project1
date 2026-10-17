import { pregnancySoymilkConfig } from "../soymilkGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(pregnancySoymilkConfig);

export default function PregnancySoymilkGuidePage() {
  return <ComparisonGuidePage config={pregnancySoymilkConfig} />;
}

import { morningSoymilkConfig } from "../soymilkGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(morningSoymilkConfig);

export default function MorningSoymilkGuidePage() {
  return <ComparisonGuidePage config={morningSoymilkConfig} />;
}

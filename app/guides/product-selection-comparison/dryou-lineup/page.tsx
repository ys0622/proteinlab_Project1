import { dryouLineupConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(dryouLineupConfig);

export default function DryouLineupPage() {
  return <ComparisonGuidePage config={dryouLineupConfig} />;
}

import { takefitLineupConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(takefitLineupConfig);

export default function TakefitLineupPage() {
  return <ComparisonGuidePage config={takefitLineupConfig} />;
}

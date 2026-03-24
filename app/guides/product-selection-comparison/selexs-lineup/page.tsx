import { selexsLineupConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(selexsLineupConfig);

export default function SelexsLineupPage() {
  return <ComparisonGuidePage config={selexsLineupConfig} />;
}

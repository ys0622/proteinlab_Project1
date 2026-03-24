import { highProtein40gConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(highProtein40gConfig);

export default function HighProtein40gComparisonPage() {
  return <ComparisonGuidePage config={highProtein40gConfig} />;
}

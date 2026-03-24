import { danbaekVsSelexsConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(danbaekVsSelexsConfig);

export default function DanbaekVsSelexsPage() {
  return <ComparisonGuidePage config={danbaekVsSelexsConfig} />;
}

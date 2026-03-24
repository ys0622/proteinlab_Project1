import { selexVsHimuneConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(selexVsHimuneConfig);

export default function SelexVsHimunePage() {
  return <ComparisonGuidePage config={selexVsHimuneConfig} />;
}

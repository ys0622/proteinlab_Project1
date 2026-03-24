import { selexVsTakefitVsHimuneConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(selexVsTakefitVsHimuneConfig);

export default function SelexVsTakefitVsHimunePage() {
  return <ComparisonGuidePage config={selexVsTakefitVsHimuneConfig} />;
}

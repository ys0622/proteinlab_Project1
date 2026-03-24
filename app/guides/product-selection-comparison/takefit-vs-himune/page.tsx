import { takefitVsHimuneConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(takefitVsHimuneConfig);

export default function TakefitVsHimunePage() {
  return <ComparisonGuidePage config={takefitVsHimuneConfig} />;
}

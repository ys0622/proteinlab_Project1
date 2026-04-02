import { newcareWaterVsRtdConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcareWaterVsRtdConfig);

export default function NewcareWaterVsRtdPage() {
  return <ComparisonGuidePage config={newcareWaterVsRtdConfig} />;
}

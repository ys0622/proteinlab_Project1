import { newcareVsHymuneConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcareVsHymuneConfig);

export default function NewcareVsHymunePage() {
  return <ComparisonGuidePage config={newcareVsHymuneConfig} />;
}

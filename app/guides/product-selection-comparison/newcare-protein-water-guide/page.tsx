import { newcareWaterConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcareWaterConfig);

export default function NewcareProteinWaterGuidePage() {
  return <ComparisonGuidePage config={newcareWaterConfig} />;
}

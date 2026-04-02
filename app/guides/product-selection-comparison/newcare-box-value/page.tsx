import { newcareBoxValueConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcareBoxValueConfig);

export default function NewcareBoxValuePage() {
  return <ComparisonGuidePage config={newcareBoxValueConfig} />;
}

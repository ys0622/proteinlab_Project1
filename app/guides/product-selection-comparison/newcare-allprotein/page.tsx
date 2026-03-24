import { newcareAllproteinConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcareAllproteinConfig);

export default function NewcareAllproteinPage() {
  return <ComparisonGuidePage config={newcareAllproteinConfig} />;
}

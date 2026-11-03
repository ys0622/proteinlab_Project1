import { proteinPowderByPurposeConfig } from "../powderGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinPowderByPurposeConfig);

export default function ProteinPowderByPurposePage() {
  return <ComparisonGuidePage config={proteinPowderByPurposeConfig} />;
}

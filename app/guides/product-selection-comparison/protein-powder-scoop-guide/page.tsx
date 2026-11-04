import { proteinPowderScoopConfig } from "../powderGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinPowderScoopConfig);

export default function ProteinPowderScoopPage() {
  return <ComparisonGuidePage config={proteinPowderScoopConfig} />;
}

import { proteinPowderTop10Config } from "../powderGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinPowderTop10Config);

export default function ProteinPowderTop10Page() {
  return <ComparisonGuidePage config={proteinPowderTop10Config} />;
}

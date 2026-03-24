import { proteinDensityRankingConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinDensityRankingConfig);

export default function ProteinDensityRankingPage() {
  return <ComparisonGuidePage config={proteinDensityRankingConfig} />;
}

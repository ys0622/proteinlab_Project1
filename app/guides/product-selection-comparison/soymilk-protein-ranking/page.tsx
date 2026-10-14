import { proteinRankSoymilkConfig } from "../soymilkGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinRankSoymilkConfig);

export default function SoymilkProteinRankingPage() {
  return <ComparisonGuidePage config={proteinRankSoymilkConfig} />;
}

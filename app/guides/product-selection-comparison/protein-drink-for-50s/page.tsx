import { proteinDrinkFor50sConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinDrinkFor50sConfig);

export default function ProteinDrinkFor50sPage() {
  return <ComparisonGuidePage config={proteinDrinkFor50sConfig} />;
}

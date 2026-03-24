import { danbaekLineupConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(danbaekLineupConfig);

export default function DanbaekLineupPage() {
  return <ComparisonGuidePage config={danbaekLineupConfig} />;
}

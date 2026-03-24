import { himuneLineupConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(himuneLineupConfig);

export default function HimuneLineupPage() {
  return <ComparisonGuidePage config={himuneLineupConfig} />;
}

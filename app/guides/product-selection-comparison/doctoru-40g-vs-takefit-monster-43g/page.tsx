import { doctoruVsTakefitMonsterConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(doctoruVsTakefitMonsterConfig);

export default function DoctoruVsTakefitMonsterPage() {
  return <ComparisonGuidePage config={doctoruVsTakefitMonsterConfig} />;
}

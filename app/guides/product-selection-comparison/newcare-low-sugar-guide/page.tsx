import { newcareSugarGuideConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcareSugarGuideConfig);

export default function NewcareLowSugarGuidePage() {
  return <ComparisonGuidePage config={newcareSugarGuideConfig} />;
}

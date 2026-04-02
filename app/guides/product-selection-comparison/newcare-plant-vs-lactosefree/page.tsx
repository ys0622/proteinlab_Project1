import { newcarePlantVsLactoseFreeConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcarePlantVsLactoseFreeConfig);

export default function NewcarePlantVsLactoseFreePage() {
  return <ComparisonGuidePage config={newcarePlantVsLactoseFreeConfig} />;
}

import { wpiWpcIspPowderConfig } from "../powderGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(wpiWpcIspPowderConfig);

export default function WpiWpcIspPowderGuidePage() {
  return <ComparisonGuidePage config={wpiWpcIspPowderConfig} />;
}

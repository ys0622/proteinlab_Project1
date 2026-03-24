import { danbaekVsHimuneConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(danbaekVsHimuneConfig);

export default function DanbaekVsHimunePage() {
  return <ComparisonGuidePage config={danbaekVsHimuneConfig} />;
}

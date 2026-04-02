import { newcareVsSellexConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcareVsSellexConfig);

export default function NewcareVsSellexPage() {
  return <ComparisonGuidePage config={newcareVsSellexConfig} />;
}

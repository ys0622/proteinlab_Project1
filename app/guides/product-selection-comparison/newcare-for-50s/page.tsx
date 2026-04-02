import { newcareFor50sConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcareFor50sConfig);

export default function NewcareFor50sPage() {
  return <ComparisonGuidePage config={newcareFor50sConfig} />;
}

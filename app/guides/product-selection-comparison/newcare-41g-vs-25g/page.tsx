import { newcare41Vs25Config } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(newcare41Vs25Config);

export default function Newcare41Vs25Page() {
  return <ComparisonGuidePage config={newcare41Vs25Config} />;
}

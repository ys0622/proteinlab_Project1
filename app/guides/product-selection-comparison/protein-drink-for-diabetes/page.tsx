import { proteinDrinkForDiabetesConfig } from "../compareGuideContent";
import { buildGuideMetadata, ComparisonGuidePage } from "../productCompareShared";

export const metadata = buildGuideMetadata(proteinDrinkForDiabetesConfig);

export default function ProteinDrinkForDiabetesPage() {
  return <ComparisonGuidePage config={proteinDrinkForDiabetesConfig} />;
}

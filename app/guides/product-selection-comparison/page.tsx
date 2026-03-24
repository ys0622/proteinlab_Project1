import GuideTrackPage from "../[track]/page";

export default async function ProductSelectionComparisonPage() {
  return GuideTrackPage({
    params: Promise.resolve({ track: "product-selection-comparison" }),
  });
}

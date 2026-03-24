import GuideTrackPage from "../[track]/page";

export default async function MarketInsightsPage() {
  return GuideTrackPage({
    params: Promise.resolve({ track: "market-insights" }),
  });
}

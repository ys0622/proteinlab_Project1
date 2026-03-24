import GuideTrackPage from "../[track]/page";

export default async function IntakeStrategyHealthPage() {
  return GuideTrackPage({
    params: Promise.resolve({ track: "intake-strategy-health" }),
  });
}

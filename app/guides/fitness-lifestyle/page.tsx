import GuideTrackPage from "../[track]/page";

export default async function FitnessLifestylePage() {
  return GuideTrackPage({
    params: Promise.resolve({ track: "fitness-lifestyle" }),
  });
}

import { renderRankingPage } from "./RankingContent";

export { metadata } from "./RankingContent";
export const revalidate = 300;

export default function RankingPage() {
  return renderRankingPage("drink", "density", 1);
}

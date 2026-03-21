import RelatedLinkCards from "./RelatedLinkCards";
import { getHomeHubLinks } from "../lib/trafficLinks";

export default function PopularHubLinks() {
  return (
    <RelatedLinkCards
      title="인기 비교 허브"
      description="순위, 추천, 비교 가이드, 검색형 랜딩으로 바로 이동해 원하는 제품군을 더 빠르게 좁힐 수 있습니다."
      links={getHomeHubLinks()}
      className="mt-4"
    />
  );
}

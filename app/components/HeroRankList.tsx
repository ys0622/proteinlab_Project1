import { getProductBySlug } from "@/app/data/products";
import type { CoupangLinkCategory } from "@/app/lib/purchaseLinks";
import AffiliateDisclosure from "./AffiliateDisclosure";
import HomePopularList from "./HomePopularList";

// 검색어 답을 첫 화면에: 제목 바로 아래 사진·수치·쿠팡 버튼이 있는 순위 목록(2026-11-07, 단백질바 TOP10·프로티원 비교).
export type HeroRankListConfig = {
  label: string;
  slugs: string[];
  moreHref?: string;
  moreLabel?: string;
};

export default function HeroRankList({ config, contentId }: { config: HeroRankListConfig; contentId: string }) {
  const products = config.slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is NonNullable<typeof product> => product != null);
  if (products.length < 2) return null;
  const category = (products[0].productType ?? "guide") as CoupangLinkCategory;

  return (
    <div className="mt-3 max-w-[560px]">
      <p className="mb-1.5 text-[13px] font-bold text-[#16412D]">{config.label}</p>
      <HomePopularList products={products} category={category} source={contentId} linkPosition="hero" />
      {config.moreHref && config.moreLabel ? (
        <a
          href={config.moreHref}
          className="mt-1.5 block rounded-xl border border-[#d9e3db] bg-white py-2 text-center text-[12px] font-bold text-[#1F5A3D]"
        >
          {config.moreLabel}
        </a>
      ) : null}
      <AffiliateDisclosure className="mb-0 mt-2" />
    </div>
  );
}

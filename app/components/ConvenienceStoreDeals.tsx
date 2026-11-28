import GuideProductPhotoCards from "./GuideProductPhotoCards";
import { getProductBySlug } from "@/app/data/products";
import { getConvenienceDeals, getDealUnitPrice, type ConvenienceDealOffer } from "@/app/lib/convenienceDeals";

const STORE_SHORT: Record<ConvenienceDealOffer["store"], string> = { CU: "CU", 세븐일레븐: "세븐" };

function won(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

/** 편의점 단백질 1+1·2+1 행사를 사진 카드로 보여 준다(사진·이름 → 성분표 상세, 버튼 → 쿠팡 박스 가격). 이달 목록이 없으면 숨는다. */
export default async function ConvenienceStoreDeals() {
  const deals = await getConvenienceDeals();
  if (!deals) return null;
  const groups = deals.groups
    .map((group) => ({ ...group, items: group.items.filter((item) => getProductBySlug(item.slug) != null) }))
    .filter((group) => group.items.length > 0);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  if (total === 0) return null;

  return (
    <section id="cvs-deals" aria-labelledby="cvs-deals-title">
      <div className="rounded-[28px] border border-[#E7DFC9] bg-[#FFFDF8] px-4 py-5 md:px-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FDEDE3] px-3 py-1 text-xs font-bold text-[#C2410C]">
          편의점 행사 · {deals.until}
        </div>
        <h2 id="cvs-deals-title" className="mt-2 text-xl font-bold leading-tight text-[#16412D] md:text-2xl">
          {deals.month} 편의점 단백질 1+1·2+1 행사 {total}개
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
          CU·세븐일레븐 공식 행사 목록에서 프로틴랩에 성분표가 있는 단백질 음료·바·요거트·두유만 골랐습니다({deals.checkedAt} 확인).
          카드의 &apos;개당&apos;은 행사 묶음으로 샀을 때 1개 값이고, 매장·재고에 따라 행사 여부가 다를 수 있습니다. GS25는 웹에 행사 목록이 없어 빠졌습니다.
        </p>
        <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
          매일 마신다면 박스 단위 쿠팡 가격과 개당 값을 비교해 보세요.
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {groups.map((group) => (
          <GuideProductPhotoCards
            key={group.key}
            contentId={`events:cvs-deals:${group.key}`}
            group={{
              title: `${group.title} ${group.items.length}개`,
              items: group.items.map((item) => {
                const product = getProductBySlug(item.slug)!;
                return {
                  slug: item.slug,
                  badges: item.offers.map((offer) => `${STORE_SHORT[offer.store]} ${offer.type}`),
                  metrics: [
                    { label: "단백질", value: `${product.proteinPerServing}g` },
                    ...item.offers.map((offer) => ({
                      label: `${STORE_SHORT[offer.store]} 개당`,
                      value: won(getDealUnitPrice(offer)),
                    })),
                  ],
                };
              }),
            }}
          />
        ))}
      </div>
    </section>
  );
}

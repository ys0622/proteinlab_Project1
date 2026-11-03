import Image from "next/image";
import Link from "next/link";
import AffiliateDisclosure from "./AffiliateDisclosure";
import TrackedLink from "./TrackedLink";
import TrackedCoupangLink from "./TrackedCoupangLink";
import { getProductBySlug } from "@/app/data/products";
import { getCoupangRedirectHref, hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import { formatProductLabel } from "@/app/lib/productLabel";
import { getProductImageUrl } from "@/app/lib/productImage";

export interface GuideProductCardItem {
  slug: string;
  /** 순위 번호(있으면 카드 왼쪽 위에 표시). */
  rank?: number;
  /** 작은 표시(예: "해외 직구", "시니어"). */
  badges?: string[];
  /** 카드에 나열할 수치(라벨·값). 모두 제품 데이터에서 계산한 값을 넣는다. */
  metrics: { label: string; value: string }[];
}

export interface GuideProductCardGroup {
  title: string;
  caption?: string;
  items: GuideProductCardItem[];
  /** 그룹 아래 '전체 목록' 링크. */
  moreLink?: { href: string; label: string };
}

/** 가이드 본문의 제품 표를 사진 카드로 보여 준다. 사진·이름은 제품 상세로, 버튼은 쿠팡으로 보낸다. */
export default function GuideProductPhotoCards({ group, contentId }: { group: GuideProductCardGroup; contentId: string }) {
  const items = group.items
    .map((item) => ({ item, product: getProductBySlug(item.slug) }))
    .filter((entry): entry is { item: GuideProductCardItem; product: NonNullable<typeof entry.product> } => entry.product != null);
  if (items.length === 0) return null;

  return (
    <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-4 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)] md:px-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{group.title}</h2>
        <AffiliateDisclosure className="mb-0" />
      </div>
      {group.caption ? <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{group.caption}</p> : null}
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
        {items.map(({ item, product }) => {
          const label = formatProductLabel(product.brand, product.name);
          const image = getProductImageUrl(product.slug);
          const buyable = !hasNoPurchasableCoupangLink(product.coupangUrl, product.slug);
          return (
            <article key={product.slug} className="flex min-w-0 flex-col rounded-2xl border border-[#e3ebe5] bg-[#fbfcfd] p-2.5 md:p-3">
              <TrackedLink
                href={`/product/${product.slug}`}
                trackingLabel={`${label} 상세 보기`}
                trackingSection="guide_photo_cards"
                trackingPageType="guide"
                contentId={contentId}
                productId={product.slug}
                linkPosition="product_card"
                ctaType="product_detail"
                className="flex flex-col"
              >
                <span className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-white md:h-36">
                  {image ? <Image src={image} alt={label} width={160} height={144} className="h-full w-full object-contain p-1" /> : null}
                  {item.rank != null ? (
                    <span className="absolute left-1.5 top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#1F5A3D] px-1.5 text-[11px] font-bold text-white">
                      {item.rank}
                    </span>
                  ) : null}
                </span>
                {item.badges?.length ? (
                  <span className="mt-1.5 flex flex-wrap gap-1">
                    {item.badges.map((badge) => (
                      <span key={badge} className="rounded-md bg-[#eef3f9] px-1.5 py-0.5 text-[10px] font-semibold text-[#4a6178]">
                        {badge}
                      </span>
                    ))}
                  </span>
                ) : null}
                <span className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-xs font-semibold leading-5 text-[#24543d] md:text-sm">{label}</span>
              </TrackedLink>
              <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-[11px] leading-4 md:text-xs md:leading-5">
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="contents">
                    <dt className="text-[var(--foreground-muted)]">{metric.label}</dt>
                    <dd className="text-right font-semibold text-[var(--foreground)]">{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto pt-2">
                {buyable ? (
                  <TrackedCoupangLink
                    href={getCoupangRedirectHref(product.coupangUrl, "guide", product.slug)}
                    productId={product.slug}
                    productName={label}
                    productBrand={product.brand}
                    productCategory={product.productType}
                    linkPosition="product_card"
                    className="flex min-h-10 items-center justify-center rounded-lg bg-[#1F5A3D] px-2 text-xs font-bold text-white transition-colors hover:bg-[#16412D]"
                  >
                    쿠팡 가격 보기 →
                  </TrackedCoupangLink>
                ) : (
                  <span className="flex min-h-10 items-center justify-center rounded-lg border border-[#e3ebe5] text-xs text-[var(--foreground-muted)]">판매 확인 안 됨</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {group.moreLink ? (
        <Link href={group.moreLink.href} className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)] underline">
          {group.moreLink.label}
        </Link>
      ) : null}
    </section>
  );
}

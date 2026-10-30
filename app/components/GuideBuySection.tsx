import AffiliateDisclosure from "./AffiliateDisclosure";
import Image from "next/image";
import TrackedCoupangLink from "./TrackedCoupangLink";
import TrackedLink from "./TrackedLink";
import { getProductBySlug } from "@/app/data/products";
import { getCoupangRedirectHref, hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import { formatProductLabel } from "@/app/lib/productLabel";
import { getProductImageUrl } from "@/app/lib/productImage";
import { GUIDE_BUY_PICKS, type GuideBuyTopic } from "@/app/lib/guideBuyPicks";

export default function GuideBuySection({
  slugs = [],
  topic,
  embedded = false,
  variant = "bottom",
  title = "이 글과 함께 보는 제품",
  caption: captionOverride,
}: {
  slugs?: string[];
  topic?: GuideBuyTopic;
  embedded?: boolean;
  /** "top": 첫 답변 바로 아래에 두는 짧은 목록. 정보성 가이드는 구매 버튼이 3.5~7화면 아래 이 섹션 하나뿐이었다(2026-10-28). */
  variant?: "top" | "bottom";
  title?: string;
  caption?: string;
}) {
  const picks = topic ? GUIDE_BUY_PICKS[topic] : undefined;
  const targetSlugs = slugs.length > 0 ? slugs : picks?.slugs ?? [];
  const caption = captionOverride ?? (slugs.length > 0 ? undefined : picks?.caption);
  const products = targetSlugs.map((slug) => getProductBySlug(slug)).filter((product) => product && !hasNoPurchasableCoupangLink(product.coupangUrl, product.slug));
  if (products.length === 0) return null;

  if (variant === "top") {
    // 사진·이름은 제품 상세로, 버튼은 쿠팡으로(2026-10-30 Scott D안). 상세를 본 사람의 약 1/3이 쿠팡을 누르는데 가이드에서 상세로 가는 길이 없었다.
    return (
      <section className="rounded-[28px] border border-[#dce8df] bg-white px-4 py-4 md:px-5" aria-label={title}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-bold text-[#16412D]">{title}</h2>
          <AffiliateDisclosure className="mb-0" />
        </div>
        {caption && <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">{caption}</p>}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {products.slice(0, 3).map((product) => {
            if (!product) return null;
            const href = getCoupangRedirectHref(product.coupangUrl, "guide", product.slug);
            const label = formatProductLabel(product.brand, product.name);
            const image = getProductImageUrl(product.slug);
            return (
              <div key={product.slug} className="flex h-full flex-col rounded-xl border border-[#e3ebe5] bg-white p-2">
                <TrackedLink
                  href={`/product/${product.slug}`}
                  trackingLabel={`${label} 상세 보기`}
                  trackingSection="guide_buy_top"
                  trackingPageType="guide"
                  productId={product.slug}
                  linkPosition="mid_content"
                  ctaType="product_detail"
                  className="mb-2 flex flex-col"
                >
                  <span className="flex h-24 items-center justify-center rounded-lg bg-white md:h-32">
                    {image ? <Image src={image} alt={label} width={96} height={128} className="h-full w-full object-contain p-1" /> : null}
                  </span>
                  <span className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-xs font-semibold leading-5 text-[var(--foreground)]">{label}</span>
                  <span className="text-[10px] leading-4 text-[var(--foreground-muted)]">
                    단백질 {product.proteinPerServing}g
                    <br />
                    당류 {product.sugarLabel ?? `${product.sugar}g`}
                  </span>
                </TrackedLink>
                <TrackedCoupangLink
                  href={href}
                  productId={product.slug}
                  productName={label}
                  productBrand={product.brand}
                  productCategory={product.productType}
                  linkPosition="mid_content"
                  className="mt-auto rounded-full bg-[#1F5A3D] px-2 py-1.5 text-center text-[11px] font-bold text-white"
                >
                  가격 보기
                </TrackedCoupangLink>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  const content = (
    <div className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-[var(--foreground)]">제품 가격·옵션 확인</h2>
          <AffiliateDisclosure className="mb-0" />
        </div>
        {caption && <p className="mt-2 text-sm text-[var(--foreground-muted)]">{caption}</p>}
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {products.map((product) => {
            if (!product) return null;
            const href = getCoupangRedirectHref(product.coupangUrl, "guide", product.slug);
            return (
              <TrackedCoupangLink
                key={product.slug}
                href={href}
                productId={product.slug}
                productName={formatProductLabel(product.brand, product.name)}
                productBrand={product.brand}
                productCategory={product.productType}
                linkPosition="bottom_cta"
                className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-[#eef3f9]"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{formatProductLabel(product.brand, product.name)}</p>
                <p className="mt-2 text-xs text-[var(--foreground-muted)]">단백질 {product.proteinPerServing}g · 당류 {product.sugar}g</p>
                <p className="mt-3 text-sm font-semibold text-[#24543d]">현재 가격·옵션 확인 →</p>
              </TrackedCoupangLink>
            );
          })}
        </div>
    </div>
  );

  if (embedded) return content;

  return (
    <section className="mx-auto mb-8 max-w-[1200px] px-4 md:px-6">
      {content}
    </section>
  );
}

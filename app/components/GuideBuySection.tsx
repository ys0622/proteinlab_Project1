import AffiliateDisclosure from "./AffiliateDisclosure";
import TrackedCoupangLink from "./TrackedCoupangLink";
import { getProductBySlug } from "@/app/data/products";
import { getCoupangRedirectHref, hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import { formatProductLabel } from "@/app/lib/productLabel";
import { GUIDE_BUY_PICKS, type GuideBuyTopic } from "@/app/lib/guideBuyPicks";

export default function GuideBuySection({
  slugs = [],
  topic,
  embedded = false,
  variant = "bottom",
}: {
  slugs?: string[];
  topic?: GuideBuyTopic;
  embedded?: boolean;
  /** "top": 첫 답변 바로 아래에 두는 짧은 목록. 정보성 가이드는 구매 버튼이 3.5~7화면 아래 이 섹션 하나뿐이었다(2026-10-28). */
  variant?: "top" | "bottom";
}) {
  const picks = topic ? GUIDE_BUY_PICKS[topic] : undefined;
  const targetSlugs = slugs.length > 0 ? slugs : picks?.slugs ?? [];
  const caption = slugs.length > 0 ? undefined : picks?.caption;
  const products = targetSlugs.map((slug) => getProductBySlug(slug)).filter((product) => product && !hasNoPurchasableCoupangLink(product.coupangUrl, product.slug));
  if (products.length === 0) return null;

  if (variant === "top") {
    return (
      <section className="rounded-[28px] border border-[#dce8df] bg-[#f7fbf8] px-5 py-4" aria-label="이 글과 함께 보는 제품">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-bold text-[#16412D]">이 글과 함께 보는 제품</h2>
          <AffiliateDisclosure className="mb-0" />
        </div>
        {caption && <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">{caption}</p>}
        <div className="mt-3 grid gap-2 md:grid-cols-3">
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
                linkPosition="mid_content"
                className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[#e3ebe5] bg-white px-3 py-2.5 transition-colors hover:bg-[#fffdf8]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[var(--foreground)]">{formatProductLabel(product.brand, product.name)}</span>
                  <span className="block text-[11px] text-[var(--foreground-muted)]">단백질 {product.proteinPerServing}g · 당류 {product.sugar}g{product.calories ? ` · ${product.calories}kcal` : ""}</span>
                </span>
                <span className="shrink-0 rounded-full bg-[#1F5A3D] px-3 py-1.5 text-xs font-bold text-white">가격 보기 →</span>
              </TrackedCoupangLink>
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

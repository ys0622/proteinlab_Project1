import AffiliateDisclosure from "./AffiliateDisclosure";
import TrackedCoupangLink from "./TrackedCoupangLink";
import { getProductBySlug } from "@/app/data/products";
import { getCoupangRedirectHref } from "@/app/lib/purchaseLinks";
import { formatProductLabel } from "@/app/lib/productLabel";
import { GUIDE_BUY_PICKS, type GuideBuyTopic } from "@/app/lib/guideBuyPicks";

export default function GuideBuySection({
  slugs = [],
  topic,
  embedded = false,
}: {
  slugs?: string[];
  topic?: GuideBuyTopic;
  embedded?: boolean;
}) {
  const picks = topic ? GUIDE_BUY_PICKS[topic] : undefined;
  const targetSlugs = slugs.length > 0 ? slugs : picks?.slugs ?? [];
  const caption = slugs.length > 0 ? undefined : picks?.caption;
  const products = targetSlugs.map((slug) => getProductBySlug(slug)).filter((product) => product?.coupangUrl);
  if (products.length === 0) return null;

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

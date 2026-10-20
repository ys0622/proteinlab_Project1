import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, type ProductDetailProps } from "@/app/data/products";
import { getCoupangRedirectHref } from "@/app/lib/purchaseLinks";
import { formatProductLabel } from "@/app/lib/productLabel";
import { getProductImageUrl } from "@/app/lib/productImage";
import AffiliateDisclosure from "./AffiliateDisclosure";
import TrackedCoupangLink from "./TrackedCoupangLink";

export type GuideHeroProductInput = {
  slug: string;
  contextLabel?: string;
};

export type ResolvedGuideHeroProduct = {
  product: ProductDetailProps;
  imageUrl: string;
  coupangHref: string;
  contextLabel: string | undefined;
};

export function resolveGuideHeroProducts(items: GuideHeroProductInput[]): ResolvedGuideHeroProduct[] {
  const products = items
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;

      const imageUrl = getProductImageUrl(product.slug);
      const coupangHref = getCoupangRedirectHref(product.coupangUrl, product.productType ?? "guide", product.slug);
      if (!imageUrl || !coupangHref) return null;

      return { product, imageUrl, coupangHref, contextLabel: item.contextLabel };
    })
    .filter((item): item is ResolvedGuideHeroProduct => item != null)
    .slice(0, 3);

  return products.length >= 2 ? products : [];
}

export default function GuideProductHeroCards({ products }: { products: ResolvedGuideHeroProduct[] }) {
  if (products.length < 2) return null;

  return (
    <div className="mt-3 max-w-[720px]">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {products.map(({ product, imageUrl, coupangHref, contextLabel }, index) => {
          const productName = formatProductLabel(product.brand, product.name);
          return (
            <div key={product.slug} className={`${index >= 2 ? "hidden md:flex" : "flex"} min-w-0 flex-col rounded-xl border border-[#e3ebe5] bg-white p-2`}>
              <Link href={`/product/${product.slug}`} className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-white md:h-36">
                <Image src={imageUrl} alt={productName} width={200} height={144} className="h-full w-full object-contain" />
              </Link>
              {contextLabel ? <span className="mt-1.5 text-[10px] font-bold tracking-wide text-[#4c7a57]">{contextLabel}</span> : null}
              <Link href={`/product/${product.slug}`} className={`${contextLabel ? "mt-0.5" : "mt-1.5"} line-clamp-2 min-h-[2.5rem] text-xs font-semibold leading-5 text-[#24543d] hover:underline`}>
                {productName}
              </Link>
              <TrackedCoupangLink
                href={coupangHref}
                productId={product.slug}
                productName={productName}
                productBrand={product.brand}
                productCategory={product.productType ?? "guide"}
                linkPosition="hero"
                className="mt-1.5 flex min-h-10 items-center justify-center rounded-lg bg-[#1F5A3D] px-2 text-xs font-bold text-white transition-colors hover:bg-[#16412D]"
              >
                쿠팡 가격 보기 →
              </TrackedCoupangLink>
            </div>
          );
        })}
      </div>
      <AffiliateDisclosure className="mb-0 mt-2" />
    </div>
  );
}

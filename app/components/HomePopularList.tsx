"use client";

import Image from "next/image";
import Link from "next/link";
import { productClick, purchaseClick } from "@/lib/analytics";
import type { CarouselProduct } from "./HomePopularCarousel";
import { getProductImageUrl } from "../lib/productImage";
import { getCoupangRedirectHref, getKnownSourceCoupangUrlBySlug, normalizeCoupangUrl } from "../lib/purchaseLinks";
import type { CoupangLinkCategory } from "../lib/purchaseLinks";
import PurchaseLinkRow from "./PurchaseLinkRow";

// 모바일 홈 '지금 인기 제품': 작은 폰에서도 탭과 1~2위가 첫 화면에 들어오도록 카드 대신 순위 목록으로 보여 준다(2026-11-07 Scott 승인).
interface Props {
  products: CarouselProduct[];
  category: CoupangLinkCategory;
}

export default function HomePopularList({ products, category }: Props) {
  const source = `home_popular_${category}`;
  return (
    <ol className="flex flex-col gap-1.5">
      {products.map((product, i) => {
        const { slug, brand, name, capacity } = product;
        const productId = slug ?? `${brand}-${name}`;
        const detailHref = slug ? `/product/${slug}` : "#";
        const imageUrl = slug ? getProductImageUrl(slug) : null;
        const rawCoupangUrl = normalizeCoupangUrl(product.coupangUrl) ?? getKnownSourceCoupangUrlBySlug(slug);
        const coupangHref = getCoupangRedirectHref(rawCoupangUrl, product.purchaseLinkCategory ?? category, slug);
        const title = capacity && !name.includes(capacity) ? `${name} ${capacity}` : name;
        // 파우더는 당류를 적지 않은 성분표가 있어 값이 없으면 당류 칸을 뺀다.
        const sugarText = product.sugarLabel ?? (typeof product.sugar === "number" ? `${product.sugar}g` : null);
        const reasonLabel = product.discoveryReason === "coupang_best" ? "쿠팡 베스트"
          : product.discoveryReason === "recently_added" ? "NEW" : null;
        const onOpen = () =>
          productClick({
            productId,
            productName: name,
            brand,
            category,
            destinationUrl: detailHref,
            source,
            ctaText: "제품 상세 보기",
          });
        return (
          <li
            key={slug ?? i}
            className="flex items-center gap-2 rounded-2xl border border-[#e8e6e3] bg-white py-2 pl-2 pr-2"
          >
            <span className="w-4 shrink-0 text-center text-[14px] font-extrabold text-[#1F5A3D]">{i + 1}</span>
            <Link href={detailHref} onClick={onOpen} className="flex min-w-0 flex-1 items-center gap-2">
              <span className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-[10px] border border-[#eee] bg-white">
                {imageUrl && (
                  <Image src={imageUrl} alt={`${brand} ${name}`} fill sizes="54px" className="object-contain p-1" unoptimized />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-[11px] text-[#6b7a6e]">
                  <span className="truncate">{brand}</span>
                  {reasonLabel && (
                    <span className="shrink-0 rounded-[5px] bg-[#16412D] px-1 text-[10px] font-extrabold leading-[16px] text-white">
                      {reasonLabel}
                    </span>
                  )}
                </span>
                <span className="line-clamp-2 text-[13px] font-bold leading-[1.3] text-[#1A2B1E]">{title}</span>
                <span className="block truncate text-[11px] text-[#3d4d40]">
                  단백질 <b className="text-[#1F5A3D]">{product.proteinPerServing}g</b>{sugarText ? ` · 당 ${sugarText}` : ""} · {product.calories}kcal
                </span>
              </span>
            </Link>
            <div className="w-[64px] shrink-0 [&_a]:!px-1 [&_a]:!text-[11px]">
              <PurchaseLinkRow
                coupangHref={coupangHref}
                naverHref={null}
                officialMallHref={null}
                coupangOnly
                size="sm"
                coupangImpressionTracking={{
                  productId,
                  productName: name,
                  productBrand: brand,
                  productCategory: category,
                  linkPosition: "home_featured",
                  contentId: source,
                  itemPosition: i + 1,
                }}
                onCoupangClick={() =>
                  purchaseClick({
                    productName: name,
                    brand,
                    store: "coupang",
                    productId,
                    destinationUrl: coupangHref ?? undefined,
                    placement: "product_card_purchase_row",
                    category,
                    source,
                    position: i + 1,
                  })
                }
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

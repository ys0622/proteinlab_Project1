"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { ProductDetailProps } from "../data/productTypes";
import { getProductImageUrl } from "../lib/productImage";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  normalizeCoupangUrl,
} from "../lib/purchaseLinks";
import PurchaseLinkRow from "./PurchaseLinkRow";

interface PopularCarouselProps {
  products: ProductDetailProps[];
}

function CarouselCard({ product, rank }: { product: ProductDetailProps; rank: number }) {
  const {
    slug,
    brand,
    name,
    proteinPerServing,
    calories,
    sugar,
    gradeTags = [],
    coupangUrl,
    naverUrl,
    officialUrl,
    productType,
  } = product;

  const imageUrl = slug ? getProductImageUrl(slug) : null;
  const detailHref = slug ? `/product/${slug}` : "#";
  const rawCoupangUrl =
    normalizeCoupangUrl(coupangUrl) ?? (slug ? getKnownSourceCoupangUrlBySlug(slug) : null);
  const coupangHref = getCoupangRedirectHref(rawCoupangUrl, productType ?? null, slug);
  const naverHref = naverUrl && naverUrl !== "#" && naverUrl !== "" ? naverUrl : null;
  const officialMallHref =
    officialUrl && officialUrl !== "#" && officialUrl !== "" ? officialUrl : null;

  return (
    <article
      className="flex flex-col rounded-[16px] border border-[#e8e6e3] bg-white"
      style={{ height: "360px" }}
    >
      {/* 이미지 + 순위 뱃지 */}
      <div
        className="relative flex-none overflow-hidden rounded-t-[16px] bg-white"
        style={{ height: "130px" }}
      >
        <span
          className="absolute left-2 top-2 z-10 flex items-center justify-center rounded-full bg-[#2d6a4f] text-[11px] font-bold text-white"
          style={{ width: "22px", height: "22px" }}
        >
          {rank}
        </span>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-2"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl">💪</div>
        )}
      </div>

      {/* 카드 본문 */}
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-3">
        <p className="text-[11px] leading-none text-[var(--foreground-muted)]">{brand}</p>

        {/* 제품명 — 1줄 말줄임 */}
        <p
          className="text-[13px] font-semibold leading-tight text-[var(--foreground)]"
          style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {name}
        </p>

        {/* 등급 태그 */}
        {gradeTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {gradeTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#eaf7f0] px-1.5 py-0.5 text-[10px] font-medium text-[#2d6a4f]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 핵심 스펙 */}
        <p className="text-[11px] leading-none text-[var(--foreground-muted)]">
          단백질 {proteinPerServing}g · {calories ?? "-"}kcal · 당류 {sugar ?? 0}g
        </p>

        <div className="flex-1" />

        {/* 구매링크 */}
        <PurchaseLinkRow
          coupangHref={coupangHref}
          naverHref={naverHref}
          officialMallHref={officialMallHref}
          size="sm"
        />

        {/* 상세보기 */}
        <Link
          href={detailHref}
          className="mt-0.5 flex w-full items-center justify-center rounded-full border border-[#e2e2e2] py-1.5 text-[11px] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
        >
          상세보기
        </Link>
      </div>
    </article>
  );
}

export default function PopularCarousel({ products }: PopularCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(products.length <= 4);

  if (products.length === 0) return null;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -(scrollRef.current.clientWidth), behavior: "smooth" });
  };

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: scrollRef.current.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="mt-3">
      {/* 섹션 헤더 */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[var(--foreground)]">🔥 지금 많이 보는 제품</p>
          <p className="mt-0.5 text-[11px] text-[var(--foreground-muted)]">
            자주 비교되는 인기 제품
          </p>
        </div>
        <Link
          href="/curation/popular"
          className="text-[11px] font-medium text-[var(--accent)] hover:underline"
        >
          전체보기 →
        </Link>
      </div>

      {/* 캐러셀 — PC 화살표 여백 */}
      <div className="relative md:px-5">
        {/* 왼쪽 화살표 (PC only) */}
        {!atStart && (
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e6e3] bg-white shadow-sm transition-shadow hover:shadow-md md:flex"
            style={{ width: "32px", height: "32px" }}
            aria-label="이전"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M8.75 3.5L5.25 7L8.75 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* 스크롤 컨테이너 */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, index) => (
            <div
              key={product.slug ?? index}
              className="w-[calc(65%-4px)] flex-none md:w-[calc(25%-9px)]"
            >
              <CarouselCard product={product} rank={index + 1} />
            </div>
          ))}
        </div>

        {/* 오른쪽 화살표 (PC only) */}
        {!atEnd && (
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e6e3] bg-white shadow-sm transition-shadow hover:shadow-md md:flex"
            style={{ width: "32px", height: "32px" }}
            aria-label="다음"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M5.25 3.5L8.75 7L5.25 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

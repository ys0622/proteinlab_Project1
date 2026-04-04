"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCompare } from "../context/CompareContext";
import type { ProductDetailProps } from "../data/productTypes";
import { getProductImageUrl } from "../lib/productImage";

interface PopularCarouselProps {
  products: ProductDetailProps[];
}

function CarouselCard({ product, rank }: { product: ProductDetailProps; rank: number }) {
  const { slug, brand, name, proteinPerServing, calories, sugar, gradeTags = [] } = product;
  const { selectedSlugs, toggle } = useCompare();
  const imageUrl = slug ? getProductImageUrl(slug) : null;
  const detailHref = slug ? `/product/${slug}` : "#";
  const isCompared = slug ? selectedSlugs.includes(slug) : false;

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border bg-[#FFFDF8] p-2.5"
      style={{ borderRadius: "16px", borderColor: "#e8e6e3" }}
    >
      {/* 이미지 영역 — ProductCard 동일 스타일 */}
      <div className="relative h-[110px] w-full flex-shrink-0 overflow-hidden rounded-xl border border-[#eee] bg-white p-1">
        {/* 순위 뱃지 */}
        <span
          className="absolute left-1.5 top-1.5 z-10 flex items-center justify-center rounded-full bg-[#2d6a4f] text-[10px] font-bold text-white"
          style={{ width: "20px", height: "20px" }}
        >
          {rank}
        </span>
        {imageUrl ? (
          <Image src={imageUrl} alt={`${brand} ${name}`} fill className="object-contain" unoptimized />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl">💪</div>
        )}
      </div>

      {/* 본문 */}
      <div className="mt-2 flex min-h-0 flex-1 flex-col">
        <p className="text-xs" style={{ color: "#7a7a7a" }}>{brand}</p>

        <p
          className="mt-0.5 text-[14px] font-semibold leading-snug"
          style={{ color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {name}
        </p>

        {/* 등급 태그 */}
        {gradeTags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
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

        <p className="mt-1 text-[11px]" style={{ color: "#7a7a7a" }}>
          단백질 {proteinPerServing}g · {calories ?? "-"}kcal · 당류 {sugar ?? 0}g
        </p>

        <div className="flex-1" />

        {/* 버튼 1열 — 좌: 스펙 비교, 우: 상세보기 */}
        <div className="mt-2 flex gap-1.5">
          <button
            type="button"
            onClick={() => slug && toggle(slug)}
            className={`flex flex-1 items-center justify-center rounded-full border py-1.5 text-[11px] font-medium transition-colors ${
              isCompared
                ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                : "border-[#e2e2e2] text-[#454545] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
            }`}
          >
            {isCompared ? "✓ 비교중" : "스펙 비교"}
          </button>
          <Link
            href={detailHref}
            className="flex flex-1 items-center justify-center rounded-full border border-[#e2e2e2] py-1.5 text-[11px] font-medium text-[#454545] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          >
            상세보기
          </Link>
        </div>
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
    <section className="mt-4">
      {/* 섹션 헤더 */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold" style={{ color: "#1a1a1a" }}>🔥 지금 많이 보는 제품</p>
          <p className="mt-0.5 text-[11px]" style={{ color: "#7a7a7a" }}>자주 비교되는 인기 음료</p>
        </div>
        <Link href="/curation/popular" className="text-[11px] font-medium text-[var(--accent)] hover:underline">
          전체보기 →
        </Link>
      </div>

      {/* 캐러셀 */}
      <div className="relative md:px-8">
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
              <path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
              className="w-[calc(65%_-_4px)] flex-none md:w-[calc(25%_-_9px)]"
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
              <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

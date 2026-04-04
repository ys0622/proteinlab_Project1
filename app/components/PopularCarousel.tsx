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
      className="flex flex-col overflow-hidden rounded-2xl border bg-[#f0f9f5] p-2.5"
      style={{ borderRadius: "16px", borderColor: "#c8e6d4" }}
    >
      {/* 이미지 영역 */}
      <div
        className="relative h-[110px] w-full flex-shrink-0 overflow-hidden rounded-xl border bg-white p-1"
        style={{ borderColor: "#d4ede2" }}
      >
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
        <p className="text-[11px] font-medium" style={{ color: "#2d6a4f" }}>{brand}</p>

        <p
          className="mt-0.5 text-[13px] font-semibold leading-snug"
          style={{ color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {name}
        </p>

        {gradeTags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {gradeTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#d4ede2] px-1.5 py-0.5 text-[10px] font-medium text-[#2d6a4f]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="mt-1 text-[11px]" style={{ color: "#5a7a6a" }}>
          단백질 {proteinPerServing}g · {calories ?? "-"}kcal · 당류 {sugar ?? 0}g
        </p>

        <div className="flex-1" />

        {/* 버튼 1열 */}
        <div className="mt-2 flex gap-1.5">
          <button
            type="button"
            onClick={() => slug && toggle(slug)}
            className={`flex flex-1 items-center justify-center rounded-full border py-1.5 text-[11px] font-medium transition-colors ${
              isCompared
                ? "border-[#2d6a4f] bg-[#2d6a4f] text-white"
                : "border-[#aad4bc] bg-white text-[#2d6a4f] hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white"
            }`}
          >
            {isCompared ? "✓ 비교중" : "스펙 비교"}
          </button>
          <Link
            href={detailHref}
            className="flex flex-1 items-center justify-center rounded-full border border-[#aad4bc] bg-white py-1.5 text-[11px] font-medium text-[#2d6a4f] transition-colors hover:border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white"
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
        <p className="text-sm font-bold" style={{ color: "#1a1a1a" }}>🔥 지금 많이 보는 제품</p>
        <Link href="/curation/popular" className="text-[11px] font-medium text-[var(--accent)] hover:underline">
          전체보기 →
        </Link>
      </div>

      {/* 모바일: 가로 스크롤 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => (
          <div key={product.slug ?? index} className="w-[calc(65%_-_4px)] flex-none">
            <CarouselCard product={product} rank={index + 1} />
          </div>
        ))}
      </div>

      {/* PC: 그리드 (5열 2행) + 화살표 */}
      <div className="relative hidden md:block">
        <div className="grid grid-cols-5 gap-3">
          {products.slice(0, 10).map((product, index) => (
            <CarouselCard key={product.slug ?? index} product={product} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

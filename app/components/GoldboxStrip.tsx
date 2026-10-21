"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TrackedCoupangLink from "./TrackedCoupangLink";
import TrackedLink from "./TrackedLink";
import type { ActiveGoldboxCard, GoldboxCategory } from "@/app/lib/activeGoldbox";

const CATEGORY_LABEL: Record<GoldboxCategory, string> = {
  drink: "단백질 음료",
  bar: "단백질바",
  yogurt: "요거트",
  shake: "쉐이크",
  soymilk: "두유",
};

type Props = {
  /** 이 카테고리 특가를 먼저 보여 준다. */
  category: GoldboxCategory;
  /** 상품 상세에서 지금 보고 있는 제품. 이 제품이 특가면 강조하고, 아니면 목록에서 뺀다. */
  currentSlug?: string;
  placement: "product" | "category";
  /** 바깥 여백. 특가가 없으면 컴포넌트 전체가 빠지므로 여백도 같이 사라진다. */
  className?: string;
  /**
   * 서버에서 미리 받은 카드(매 요청 렌더링하는 카테고리 목록). 있으면 첫 HTML에 바로 그려
   * 나중에 끼어들며 목록을 밀어내지 않는다(/bars CLS 0.25, 2026-10-21). 상품 상세는 1시간 캐시라 넘기지 않는다.
   */
  initialCards?: ActiveGoldboxCard[];
};

/**
 * "오늘의 골드박스" 한 줄. 상품 상세(구매 버튼 아래)와 카테고리 목록(상단)에 들어간다.
 * 상품 상세는 1시간 캐시라 서버 렌더 대신 /api/goldbox/active(5분 캐시)를 브라우저에서 불러 07:00 교체를 놓치지 않는다.
 * 특가가 없으면 아무것도 그리지 않는다.
 */
export default function GoldboxStrip({ category, currentSlug, placement, className = "", initialCards }: Props) {
  const [cards, setCards] = useState<ActiveGoldboxCard[] | null>(initialCards ?? null);

  useEffect(() => {
    if (initialCards) return;
    let alive = true;
    fetch("/api/goldbox/active")
      .then((res) => (res.ok ? res.json() : { cards: [] }))
      .then((data: { cards?: ActiveGoldboxCard[] }) => {
        if (alive) setCards(Array.isArray(data.cards) ? data.cards : []);
      })
      .catch(() => alive && setCards([]));
    return () => {
      alive = false;
    };
  }, [initialCards]);

  if (!cards || cards.length === 0) return null;

  const self = currentSlug ? cards.find((card) => card.slug === currentSlug) : undefined;
  const others = cards.filter((card) => card.slug !== currentSlug);
  const sameCategory = others.filter((card) => card.category === category);
  // 카테고리 목록에서는 그 카테고리 특가만 보여 준다(바 목록에 두유 특가는 맞지 않는다). 상품 상세는 없으면 다른 카테고리로 채운다.
  const pool = sameCategory.length || placement === "category" ? sameCategory : others;
  const picks = pool.slice(0, placement === "product" ? 2 : 3);
  if (!self && picks.length === 0) return null;

  const linkPosition = placement === "product" ? "goldbox_strip_product" : "goldbox_strip_category";
  const heading = self
    ? "이 제품이 오늘 골드박스 특가"
    : sameCategory.length
      ? `오늘 골드박스에 나온 ${CATEGORY_LABEL[category]}`
      : "오늘 골드박스에 나온 등록 제품";

  return (
    <section
      aria-label="오늘의 골드박스"
      className={`${className} rounded-[14px] border border-[#E7D49C] bg-[#FFF9E8] px-3 py-2.5 shadow-[0_2px_8px_rgba(74,55,14,0.07)]`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 rounded-full bg-[#E7A600] px-2 py-0.5 text-[10px] font-extrabold text-white">오늘 특가</span>
          <h2 className="truncate text-[13px] font-extrabold text-[#1A2B1E] md:text-[15px]">{heading}</h2>
        </div>
        <TrackedLink
          href="/goldbox"
          trackingLabel="골드박스 전체 보기"
          trackingSection="goldbox"
          trackingPageType={placement}
          linkPosition={linkPosition}
          className="shrink-0 text-[11px] font-bold text-[#1F5A3D] underline-offset-2 hover:underline"
        >
          전체 보기 →
        </TrackedLink>
      </div>
      <div className="flex flex-col gap-1.5">
        {(self ? [self] : picks).map((card) => (
          <TrackedCoupangLink
            key={card.id}
            href={card.href}
            productId={card.slug}
            productName={card.name}
            productBrand={card.brand}
            productCategory={card.category}
            linkPosition={linkPosition}
            aria-label={`${card.brand} ${card.name} 골드박스 특가 쿠팡에서 보기`}
            className="flex items-center gap-2.5 rounded-[10px] border border-[#EADDBB] bg-white px-2.5 py-1.5 transition-shadow hover:shadow-[0_4px_12px_rgba(74,55,14,0.10)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
              {card.image ? <Image src={card.image} alt="" width={40} height={40} className="h-full w-full object-contain" /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10px] font-semibold text-[#778078]">{card.brand}</span>
              <span className="block truncate text-[12px] font-extrabold text-[#1A2B1E] md:text-[13px]">{card.name}</span>
              <span className="block truncate text-[10px] text-[#8A8068]">{card.offerName}</span>
            </span>
            <span className="shrink-0 text-right">
              {card.price > 0 ? (
                <span className="block text-[13px] font-black text-[#B66A00]">{card.price.toLocaleString("ko-KR")}원</span>
              ) : null}
              <span className="block text-[11px] font-bold text-[#1F5A3D]">쿠팡에서 보기 ↗</span>
            </span>
          </TrackedCoupangLink>
        ))}
      </div>
      <p className="mt-1.5 text-[9px] leading-tight text-[#8A8068]">쿠팡 파트너스 활동을 통해 구매 시 일정액의 수수료를 제공받을 수 있습니다.</p>
    </section>
  );
}

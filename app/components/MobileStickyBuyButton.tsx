"use client";

import { useEffect, useRef } from "react";
import { affiliateImpression, purchaseClick } from "@/lib/analytics";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoritesContext";
import useVisualViewportBox from "../lib/useVisualViewportBox";

type Props = {
  coupangHref: string | null;
  brand: string;
  productName: string;
  slug: string;
  productType?: "drink" | "bar" | "yogurt" | "shake" | "soymilk";
  /** 버튼 아래에 보여 줄 핵심 수치(예: "단백질 20g", "당류 1g"). */
  quickFacts?: string[];
};

/**
 * 모바일 상품 상세 하단 고정 바(케어맵 방식): 처음부터 항상 보인다.
 * [찜] [비교] + 큰 쿠팡 버튼(아래 줄에 핵심 수치). 비교에 제품이 담기면 비교 트레이가 하단을 쓰므로 숨긴다.
 */
export default function MobileStickyBuyButton({ coupangHref, brand, productName, slug, productType, quickFacts = [] }: Props) {
  const impressionSent = useRef(false);
  const { selectedSlugs, isSelected, toggle: toggleCompare } = useCompare();
  const { isFavorited, toggle: toggleFavorite } = useFavorites();
  const hidden = selectedSlugs.length > 0;
  const viewport = useVisualViewportBox();

  useEffect(() => {
    if (hidden || !coupangHref || impressionSent.current) return;
    impressionSent.current = true;
    affiliateImpression({
      productId: slug,
      productName,
      productBrand: brand,
      productCategory: productType,
      retailer: "coupang",
      destinationUrl: coupangHref,
      linkPosition: "sticky_mobile",
      contentId: "product_detail_mobile_sticky",
    });
  }, [brand, coupangHref, hidden, productName, productType, slug]);

  // 고정 바가 페이지 맨 아래 내용(푸터)을 가리지 않도록, 바가 보이는 동안 모바일에서만 body 아래 여백을 준다.
  useEffect(() => {
    if (hidden) return;
    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      document.body.style.paddingBottom = media.matches ? "110px" : "";
    };
    apply();
    media.addEventListener("change", apply);
    return () => {
      media.removeEventListener("change", apply);
      document.body.style.paddingBottom = "";
    };
  }, [hidden]);

  if (hidden) return null;
  const favorited = isFavorited(slug);
  const comparing = isSelected(slug);
  const facts = quickFacts.slice(0, 2).join(" · ");
  const sideButton =
    "flex h-[52px] w-[52px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl border bg-white text-[11px] font-semibold";

  return (
    // 바깥 상자: 보이는 화면 크기의 투명 상자(누름은 통과). 바는 그 바닥에 둔다(웨일 전체화면 스크롤 대응, useVisualViewportBox 참고).
    <div className="pointer-events-none fixed inset-x-0 z-40 flex flex-col justify-end md:hidden" style={viewport}>
      <div
        className="pointer-events-auto"
        style={{
          background: "rgba(250,248,243,0.97)",
          borderTop: "1px solid #e8e6e3",
          padding: "6px 12px",
          paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <p className="mb-1.5 rounded-full bg-[#f1efe9] px-3 py-1 text-center text-[10px] text-[#7a7468]">
          쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </p>
        <div className="flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(slug)}
            aria-pressed={favorited}
            aria-label={favorited ? "찜 해제" : "찜하기"}
            className={`${sideButton} ${favorited ? "border-[#e8a4a4] text-[#c0392b]" : "border-[#dedbd3] text-[#5f6b61]"}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
            찜
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(slug)}
            aria-pressed={comparing}
            aria-label="비교에 담기"
            className={`${sideButton} border-[#dedbd3] text-[#5f6b61]`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 20V10M12 20V4M18 20v-6" />
            </svg>
            비교
          </button>
          {coupangHref ? (
            <a
              href={coupangHref}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() =>
                purchaseClick({
                  productId: slug,
                  productName,
                  brand,
                  store: "coupang",
                  destinationUrl: coupangHref,
                  placement: "mobile_sticky_bar",
                  ctaText: "쿠팡에서 확인하기",
                  category: productType,
                  source: "product_detail_mobile_sticky",
                })
              }
              className="flex min-h-[52px] flex-1 flex-col items-center justify-center rounded-xl px-2 text-white shadow-[0_2px_8px_rgba(31,90,61,0.28)]"
              style={{ background: "#3f7a5a" }}
            >
              <span className="text-[15px] font-bold">쿠팡에서 확인하기 →</span>
              {facts ? <span className="text-[11px] font-medium opacity-90">{facts}</span> : null}
            </a>
          ) : (
            <span className="flex min-h-[52px] flex-1 items-center justify-center rounded-xl bg-[#ecebe6] text-[13px] font-semibold text-[#8a8f8b]">
              판매처 확인 중
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

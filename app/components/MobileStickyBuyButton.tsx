"use client";

import { useEffect, useRef, useState } from "react";
import { purchaseClick } from "@/lib/analytics";

type Props = {
  coupangHref: string | null;
  naverHref: string | null;
  brand: string;
  productName: string;
  slug: string;
  /** 이 ref가 뷰포트에 보이는 동안은 sticky 버튼을 숨김 */
  anchorRef: React.RefObject<HTMLElement | null>;
};

export default function MobileStickyBuyButton({
  coupangHref,
  naverHref,
  brand,
  productName,
  slug,
  anchorRef,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 원본 구매 버튼이 화면에서 벗어나면 sticky 버튼 표시
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [anchorRef]);

  if (!coupangHref && !naverHref) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e8e6e3",
        padding: "10px 16px",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
        boxShadow: "0 -4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <div className={`grid gap-2 ${coupangHref ? "grid-cols-1" : "grid-cols-1"}`}>
        {coupangHref && (
          <a
            href={coupangHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              purchaseClick({
                productId: slug,
                productName,
                brand,
                store: "coupang",
                destinationUrl: coupangHref,
                placement: "mobile_sticky_bar",
                ctaText: "최저가 확인",
              })
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              background: "linear-gradient(135deg, #3a72ff 0%, #2255e8 100%)",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "15px",
              padding: "13px 0",
              boxShadow: "0 2px 8px rgba(52,106,255,0.28)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            쿠팡 최저가 확인
          </a>
        )}
        {!coupangHref && naverHref && (
          <a
            href={naverHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#628c78",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "15px",
              padding: "13px 0",
            }}
          >
            네이버 가격 비교
          </a>
        )}
      </div>
    </div>
  );
}

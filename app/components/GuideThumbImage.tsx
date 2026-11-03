"use client";
import { useState } from "react";

interface GuideThumbImageProps {
  src: string;
  alt: string;
  title: string;
  desc: string;
  fallbackBg: string;
  fallbackEmoji: string;
  category: string;
  /** 사진 아래 마지막 줄에 보일 데이터 표시(예: "쉐이크 112종"). 없으면 생략. */
  meta?: string;
  productSrcs?: readonly string[];
}

/*
 * 홈 '가이드 & 인사이트' 카드. 2026-11-03 Scott: 사진 위에 흰 글씨를 얹던 방식에서
 * 잡지형(사진 위 · 크림색 글 영역 아래)으로 바꿨다. 썸네일 사진에는 글자가 없다.
 */
export default function GuideThumbImage({ src, alt, title, desc, fallbackBg, fallbackEmoji, category, meta, productSrcs }: GuideThumbImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[16px] bg-[#FFFDF8]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {productSrcs?.length ? (
          <div className="absolute inset-0 isolate overflow-hidden" style={{ background: "linear-gradient(135deg, #c5a47a 0%, #e6d4b7 54%, #b99166 100%)" }}>
            <div className="absolute inset-x-2 inset-y-2 flex items-center justify-center gap-1.5 sm:gap-3">
              {productSrcs.map((productSrc, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={productSrc}
                  src={productSrc}
                  alt=""
                  loading="lazy"
                  className={`h-full min-w-0 flex-1 object-contain mix-blend-multiply ${productSrcs.length > 2 && index === 0 ? "hidden sm:block" : ""}`}
                />
              ))}
            </div>
          </div>
        ) : !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: fallbackBg }}>
            <span style={{ fontSize: "40px", lineHeight: 1 }}>{fallbackEmoji}</span>
          </div>
        )}
        <span
          className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[10px] font-bold tracking-[0.02em] text-white md:left-3 md:top-3 md:text-[11px]"
          style={{ background: "rgba(14,34,26,0.62)", backdropFilter: "blur(6px)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#C6EE78" }} aria-hidden="true" />
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3 md:px-4 md:pb-4 md:pt-3.5">
        <p
          className="line-clamp-2 break-keep font-extrabold leading-[1.3] text-[#14201A] md:text-[17px]"
          style={{ fontSize: "14.5px", letterSpacing: "-0.025em" }}
        >
          {title}
        </p>
        <p className="mt-1 line-clamp-2 break-keep text-[12px] leading-snug text-[#6B7A70] md:text-[13px]">{desc}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
          {meta ? (
            <span className="truncate text-[11px] font-semibold text-[#8A958D] md:text-[12px]">{meta}</span>
          ) : <span />}
          <span className="shrink-0 text-[11.5px] font-bold text-[#1F5A3D] transition-transform duration-200 group-hover:translate-x-0.5 md:text-[12.5px]">
            읽기 →
          </span>
        </div>
      </div>
    </div>
  );
}

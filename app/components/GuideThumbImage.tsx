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
  productSrcs?: readonly string[];
}

export default function GuideThumbImage({ src, alt, title, desc, fallbackBg, fallbackEmoji, category, productSrcs }: GuideThumbImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    /* 사진이 카드 전체를 채우고, 하단에 텍스트 오버레이 */
    <div className="relative flex flex-col overflow-hidden rounded-[16px]" style={{ minHeight: "200px" }}>
      {/* 배경: 에디토리얼 이미지 또는 그라디언트 */}
      {productSrcs?.length ? (
        <div className="absolute inset-0 isolate overflow-hidden bg-[#f4efe3]">
          <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-[#e1ead8]" />
          <div className="absolute inset-x-2 top-2 flex h-[174px] items-start justify-center gap-1.5 sm:inset-x-3 sm:gap-3">
            {productSrcs.map((productSrc, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={productSrc}
                src={productSrc}
                alt=""
                loading="lazy"
                className={`h-full min-w-0 flex-1 object-contain mix-blend-multiply ${index === 0 ? "hidden sm:block" : ""}`}
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
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: fallbackBg }}>
          <span style={{ fontSize: "48px", lineHeight: 1 }}>{fallbackEmoji}</span>
        </div>
      )}

      {/* 카테고리 뱃지 (상단 좌측) */}
      <span
        className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
        style={{ background: "rgba(255,255,255,0.92)", color: "#1F5A3D", backdropFilter: "blur(6px)" }}
      >
        {category}
      </span>

      {/* 하단 텍스트 오버레이 */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-10"
        style={{ background: "linear-gradient(to top, rgba(9,31,24,0.88) 0%, rgba(9,31,24,0.32) 60%, transparent 100%)" }}
      >
        <p className="break-keep font-extrabold leading-snug text-white" style={{ fontSize: "15px", letterSpacing: "-0.02em" }}>{title}</p>
        <p className="mt-1.5 break-keep leading-snug text-white/70" style={{ fontSize: "12px" }}>{desc}</p>
      </div>
    </div>
  );
}

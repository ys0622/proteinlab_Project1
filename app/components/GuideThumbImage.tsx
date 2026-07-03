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
  /** 두 번째 제품 이미지 — 있으면 좌우 반반 비교 레이아웃으로 렌더링 */
  secondSrc?: string;
  secondAlt?: string;
}

export default function GuideThumbImage({ src, alt, title, desc, fallbackBg, fallbackEmoji, category, secondSrc, secondAlt }: GuideThumbImageProps) {
  const [failed, setFailed] = useState(false);
  const [secondFailed, setSecondFailed] = useState(false);

  const bothFailed = failed && (!secondSrc || secondFailed);

  return (
    /* 사진이 카드 전체를 채우고, 하단에 텍스트 오버레이 */
    <div className="relative flex flex-col overflow-hidden rounded-[16px]" style={{ minHeight: "200px" }}>
      {/* 배경: 사진(들) or 그라디언트 */}
      {!bothFailed ? (
        secondSrc ? (
          <div className="absolute inset-0 flex bg-white">
            <div className="relative w-1/2 overflow-hidden border-r border-white/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                onError={() => setFailed(true)}
                className="h-full w-full object-contain p-4"
              />
            </div>
            <div className="relative w-1/2 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={secondSrc}
                alt={secondAlt ?? alt}
                onError={() => setSecondFailed(true)}
                className="h-full w-full object-contain p-4"
              />
            </div>
            <span
              className="absolute left-1/2 top-1/2 z-[5] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-extrabold text-white shadow-md"
              style={{ background: "#1F5A3D" }}
            >
              VS
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )
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
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)" }}
      >
        <p className="line-clamp-2 font-extrabold leading-snug text-white" style={{ fontSize: "15px", letterSpacing: "-0.02em" }}>{title}</p>
        <p className="mt-1.5 line-clamp-1 text-white/70" style={{ fontSize: "12px" }}>{desc}</p>
      </div>
    </div>
  );
}

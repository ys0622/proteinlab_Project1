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
}

export default function GuideThumbImage({ src, alt, title, desc, fallbackBg, fallbackEmoji, category }: GuideThumbImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    /* 사진이 카드 전체를 채우고, 하단에 텍스트 오버레이 */
    <div className="relative flex flex-col overflow-hidden rounded-[16px]" style={{ minHeight: "160px" }}>
      {/* 배경: 사진 or 그라디언트 */}
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
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
        className="absolute left-2.5 top-2.5 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold"
        style={{ background: "rgba(255,255,255,0.88)", color: "#1F5A3D" }}
      >
        {category}
      </span>

      {/* 하단 텍스트 오버레이 */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 p-3"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }}
      >
        <p className="line-clamp-2 font-bold leading-snug text-white" style={{ fontSize: "13px" }}>{title}</p>
        <p className="mt-0.5 line-clamp-1 text-white/70" style={{ fontSize: "10px" }}>{desc}</p>
      </div>
    </div>
  );
}

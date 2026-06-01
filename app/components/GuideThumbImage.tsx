"use client";
import { useState } from "react";

interface GuideThumbImageProps {
  src: string;
  alt: string;
  fallbackBg: string;
  fallbackEmoji: string;
  category: string;
}

export default function GuideThumbImage({ src, alt, fallbackBg, fallbackEmoji, category }: GuideThumbImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative overflow-hidden" style={{ height: "100px", flexShrink: 0 }}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      {/* 그라디언트 폴백 (이미지 없거나 로드 실패 시) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: fallbackBg, opacity: failed ? 1 : 0 }}
      >
        <span style={{ fontSize: "40px", lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))" }}>
          {fallbackEmoji}
        </span>
      </div>
      <span
        className="absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[10px] font-bold"
        style={{ background: "rgba(255,255,255,0.88)", color: "#1F5A3D", backdropFilter: "blur(4px)", zIndex: 1 }}
      >
        {category}
      </span>
    </div>
  );
}

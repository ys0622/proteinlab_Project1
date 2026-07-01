"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: object) => void;
      };
    };
  }
}

interface KakaoShareButtonProps {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
}

export default function KakaoShareButton({
  url,
  title,
  description,
  imageUrl,
  className = "",
}: KakaoShareButtonProps) {
  const sdkLoaded = useRef(false);

  const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  const fullUrl = url.startsWith("http") ? url : `https://proteinlab.kr${url}`;
  const fullImageUrl = imageUrl?.startsWith("http")
    ? imageUrl
    : imageUrl
      ? `https://proteinlab.kr${imageUrl}`
      : null;

  useEffect(() => {
    if (!appKey || sdkLoaded.current) return;
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(appKey);
      }
      sdkLoaded.current = true;
    };
    document.head.appendChild(script);
  }, [appKey]);

  async function handleShare() {
    // 모바일 네이티브 공유 (카카오톡 포함)
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description ?? title, url: fullUrl });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    // Kakao SDK 공유 (데스크탑)
    if (appKey && window.Kakao?.Share) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title,
          description: description ?? "ProteinLab에서 확인하세요",
          ...(fullImageUrl
            ? { imageUrl: fullImageUrl }
            : {}),
          link: { mobileWebUrl: fullUrl, webUrl: fullUrl },
        },
        buttons: [
          { title: "자세히 보기", link: { mobileWebUrl: fullUrl, webUrl: fullUrl } },
        ],
      });
      return;
    }

    // 폴백: Kakao Story 공유
    window.open(
      `https://story.kakao.com/s/share?url=${encodeURIComponent(fullUrl)}`,
      "_blank",
      "width=600,height=500,noopener,noreferrer",
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 rounded-xl font-semibold transition-opacity active:scale-95 hover:opacity-90 ${className}`}
      style={{ background: "#FEE500", color: "#191919" }}
      aria-label="카카오톡으로 공유"
    >
      {/* 카카오 말풍선 아이콘 */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="#191919" aria-hidden="true">
        <path d="M9 1.5C4.582 1.5 1 4.373 1 7.917c0 2.18 1.31 4.1 3.3 5.278L3.6 16.3a.25.25 0 0 0 .373.28L7.53 14.3a9.7 9.7 0 0 0 1.47.117c4.418 0 8-2.873 8-6.417C17 4.373 13.418 1.5 9 1.5z" />
      </svg>
      카카오톡 공유
    </button>
  );
}

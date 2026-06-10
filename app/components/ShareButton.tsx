"use client";

import { useEffect, useRef, useState } from "react";

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  compact?: boolean; // true = 아이콘만, false = 아이콘+텍스트
}

const SHARE_CHANNELS = [
  {
    key: "copy",
    label: "링크 복사",
    emoji: "🔗",
    bg: "#F3F4F6",
    color: "#1E2A22",
  },
  {
    key: "kakao",
    label: "카카오톡",
    emoji: "💬",
    bg: "#FEE500",
    color: "#191919",
  },
  {
    key: "x",
    label: "X (트위터)",
    emoji: "✕",
    bg: "#000000",
    color: "#FFFFFF",
  },
  {
    key: "facebook",
    label: "페이스북",
    emoji: "f",
    bg: "#1877F2",
    color: "#FFFFFF",
  },
  {
    key: "line",
    label: "라인",
    emoji: "L",
    bg: "#06C755",
    color: "#FFFFFF",
  },
];

export default function ShareButton({ url, title, description, compact = false }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // ESC 닫기
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const fullUrl = url.startsWith("http") ? url : `https://proteinlab.kr${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  async function handleShare(key: string) {
    // 모바일 네이티브 공유 우선
    if (key === "copy") {
      try {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        showToast("링크가 복사되었습니다 ✓");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        showToast("복사에 실패했습니다");
      }
      return;
    }

    const shareUrls: Record<string, string> = {
      kakao: `https://story.kakao.com/s/share?url=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    };

    if (shareUrls[key]) {
      window.open(shareUrls[key], "_blank", "width=600,height=500,noopener,noreferrer");
    }
    setOpen(false);
  }

  async function handleMainShare() {
    // 모바일 Web Share API 지원 시 네이티브 공유
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description ?? title, url: fullUrl });
        return;
      } catch {
        // 취소됐거나 실패 → 모달 열기
      }
    }
    setOpen(true);
  }

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  }

  return (
    <div className="relative" ref={modalRef}>
      {/* 공유 버튼 */}
      <button
        onClick={handleMainShare}
        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all hover:shadow-sm active:scale-95"
        style={{ borderColor: "#E4D9CC", background: "#FFFDF7", color: "#5F6B61" }}
        aria-label="공유하기"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {!compact && <span>공유</span>}
      </button>

      {/* 공유 모달 */}
      {open && (
        <>
          {/* 배경 딤 */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          {/* 모달 카드 */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[24px] bg-white px-5 pb-8 pt-5 shadow-2xl md:absolute md:bottom-auto md:left-auto md:right-0 md:top-10 md:w-[280px] md:rounded-[20px] md:pb-5"
            style={{ border: "1px solid #E8E4DC" }}
          >
            {/* 드래그 핸들 (모바일) */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200 md:hidden" />

            <p className="mb-1 text-[15px] font-extrabold" style={{ color: "#1E2A22" }}>
              공유하기
            </p>
            <p className="mb-4 line-clamp-1 text-[12px]" style={{ color: "#8A938B" }}>
              {title}
            </p>

            {/* 채널 그리드 */}
            <div className="grid grid-cols-5 gap-2">
              {SHARE_CHANNELS.map((ch) => (
                <button
                  key={ch.key}
                  onClick={() => handleShare(ch.key)}
                  className="flex flex-col items-center gap-1.5 rounded-[14px] p-2 transition-opacity hover:opacity-80 active:scale-95"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-[18px] font-bold"
                    style={{ background: ch.bg, color: ch.color }}
                  >
                    {ch.key === "copy" && copied ? "✓" : ch.emoji}
                  </div>
                  <span className="text-[10px] font-medium" style={{ color: "#5F6B61" }}>
                    {ch.key === "copy" && copied ? "복사됨" : ch.label}
                  </span>
                </button>
              ))}
            </div>

            {/* URL 표시 + 복사 */}
            <div
              className="mt-4 flex items-center gap-2 rounded-[12px] border px-3 py-2"
              style={{ borderColor: "#E8E4DC", background: "#F7F3EA" }}
            >
              <p className="flex-1 truncate text-[11px]" style={{ color: "#8A938B" }}>
                {fullUrl}
              </p>
              <button
                onClick={() => handleShare("copy")}
                className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors"
                style={{ background: copied ? "#1F5A3D" : "#1E2A22", color: "#FFFFFF" }}
              >
                {copied ? "복사됨" : "복사"}
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-[12px] py-2.5 text-[13px] font-semibold"
              style={{ background: "#F3F4F6", color: "#5F6B61" }}
            >
              닫기
            </button>
          </div>
        </>
      )}

      {/* 토스트 알림 */}
      {toastMsg && (
        <div
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg"
          style={{ background: "#1E2A22" }}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface CardShareButtonProps {
  slug: string;
  productName: string;
  proteinG: number;
}

const CHANNELS = [
  { key: "copy",     label: "링크 복사", emoji: "🔗", bg: "#F3F4F6", color: "#1E2A22" },
  { key: "kakao",    label: "카카오",    emoji: "💬", bg: "#FEE500", color: "#191919" },
  { key: "x",        label: "X",         emoji: "✕",  bg: "#000",    color: "#fff"    },
  { key: "facebook", label: "페이스북",  emoji: "f",  bg: "#1877F2", color: "#fff"    },
];

export default function CardShareButton({ slug, productName, proteinG }: CardShareButtonProps) {
  const [open, setOpen]     = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast]   = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const fullUrl     = `https://proteinlab.kr/product/${slug}`;
  const shareTitle  = `${productName} — 단백질 ${proteinG}g`;
  const encoded     = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  /* 외부 클릭 닫기 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* ESC 닫기 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  }

  async function handleChannel(key: string) {
    if (key === "copy") {
      try {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        showToast("링크 복사됨 ✓");
        setTimeout(() => { setCopied(false); setOpen(false); }, 1200);
      } catch { showToast("복사 실패"); }
      return;
    }
    const urls: Record<string, string> = {
      kakao:    `https://story.kakao.com/s/share?url=${encoded}`,
      x:        `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    };
    if (urls[key]) window.open(urls[key], "_blank", "width=600,height=500,noopener,noreferrer");
    setOpen(false);
  }

  async function handleOpen(e: React.MouseEvent) {
    e.stopPropagation(); // 카드 클릭 이벤트 차단
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: fullUrl });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    setOpen((v) => !v);
  }

  return (
    <div ref={ref} className="relative">
      {/* 아이콘 버튼 — FavoriteButton/CompareButton과 같은 스타일 */}
      <button
        onClick={handleOpen}
        className="flex h-7 w-7 items-center justify-center rounded-full border bg-white/90 transition-colors hover:bg-white"
        style={{ borderColor: "#E4D9CC" }}
        aria-label="공유하기"
        title="공유하기"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F6B61" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>

      {/* 드롭다운 모달 */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-9 z-50 w-[220px] rounded-[16px] border bg-white p-3 shadow-xl"
            style={{ borderColor: "#E8E4DC" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-2.5 text-[12px] font-extrabold" style={{ color: "#1E2A22" }}>공유하기</p>

            <div className="grid grid-cols-4 gap-1.5">
              {CHANNELS.map((ch) => (
                <button
                  key={ch.key}
                  onClick={() => handleChannel(ch.key)}
                  className="flex flex-col items-center gap-1 rounded-[10px] p-1.5 transition-opacity hover:opacity-75"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-bold"
                    style={{ background: ch.bg, color: ch.color }}
                  >
                    {ch.key === "copy" && copied ? "✓" : ch.emoji}
                  </div>
                  <span className="text-[9px] font-medium leading-tight" style={{ color: "#8A938B" }}>
                    {ch.key === "copy" && copied ? "복사됨" : ch.label}
                  </span>
                </button>
              ))}
            </div>

            {/* URL 복사 바 */}
            <div
              className="mt-2.5 flex items-center gap-1.5 rounded-[10px] border px-2 py-1.5"
              style={{ borderColor: "#E8E4DC", background: "#F7F3EA" }}
            >
              <p className="flex-1 truncate text-[10px]" style={{ color: "#8A938B" }}>{fullUrl}</p>
              <button
                onClick={() => handleChannel("copy")}
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ background: copied ? "#1F5A3D" : "#1E2A22", color: "#fff" }}
              >
                {copied ? "✓" : "복사"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* 토스트 */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full px-4 py-2 text-[12px] font-semibold text-white shadow-lg"
          style={{ background: "#1E2A22" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

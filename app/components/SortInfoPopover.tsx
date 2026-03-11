"use client";

import { useEffect, useEffectEvent, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MOBILE_MEDIA_QUERY = "(max-width: 768px), (hover: none), (pointer: coarse)";
const DESKTOP_CLOSE_DELAY_MS = 120;

function matchesClientMedia(query: string) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(query).matches;
}

function Portal({ children }: { children: React.ReactNode }) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

type SortInfoPopoverProps = {
  label: string;
  description: string;
};

export default function SortInfoPopover({ label, description }: SortInfoPopoverProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => matchesClientMedia(MOBILE_MEDIA_QUERY));
  const popoverId = useId();
  const sheetTitleId = useId();

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openInfo = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const closeInfo = () => {
    clearCloseTimer();
    setIsOpen(false);
  };

  const closeInfoFromEffect = useEffectEvent(() => {
    closeInfo();
  });

  const scheduleClose = () => {
    if (typeof window === "undefined") return;

    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, DESKTOP_CLOSE_DELAY_MS);
  };

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const syncIsMobile = () => setIsMobile(mediaQuery.matches);

    syncIsMobile();
    mediaQuery.addEventListener("change", syncIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", syncIsMobile);
    };
  }, []);

  useLayoutEffect(() => {
    if (isMobile || !isOpen || !buttonRef.current || !popoverRef.current) {
      return;
    }

    const updatePosition = () => {
      if (!buttonRef.current || !popoverRef.current) return;

      const triggerRect = buttonRef.current.getBoundingClientRect();
      const popoverNode = popoverRef.current;
      const popoverRect = popoverNode.getBoundingClientRect();
      const left = Math.min(
        window.innerWidth - popoverRect.width - 12,
        Math.max(12, triggerRect.right - popoverRect.width),
      );
      const preferBottomTop = triggerRect.bottom + 10;
      const fitsBottom = preferBottomTop + popoverRect.height <= window.innerHeight - 8;
      const top = fitsBottom
        ? preferBottomTop
        : Math.max(8, triggerRect.top - popoverRect.height - 10);

      popoverNode.style.left = `${left}px`;
      popoverNode.style.top = `${top}px`;
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeInfoFromEffect();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (buttonRef.current?.contains(target) || popoverRef.current?.contains(target)) {
        return;
      }

      closeInfoFromEffect();
    };

    const handleScroll = () => {
      closeInfoFromEffect();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isMobile || !isOpen || typeof document === "undefined") {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobile, isOpen]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={`${label} 설명 보기`}
        aria-describedby={!isMobile && isOpen ? popoverId : undefined}
        aria-expanded={isOpen}
        aria-haspopup={isMobile ? "dialog" : "true"}
        className="sort-info-trigger"
        onMouseEnter={() => {
          if (!isMobile) openInfo();
        }}
        onMouseLeave={() => {
          if (!isMobile) scheduleClose();
        }}
        onFocus={() => {
          if (!isMobile) openInfo();
        }}
        onBlur={() => {
          if (!isMobile) scheduleClose();
        }}
        onClick={() => {
          if (isMobile) {
            setIsOpen(true);
            return;
          }

          openInfo();
        }}
      >
        i
      </button>

      {!isMobile && isOpen ? (
        <Portal>
          <div
            id={popoverId}
            ref={popoverRef}
            role="tooltip"
            className="sort-info-popover"
            onMouseEnter={openInfo}
            onMouseLeave={scheduleClose}
          >
            {description}
          </div>
        </Portal>
      ) : null}

      {isMobile && isOpen ? (
        <Portal>
          <div className="sort-info-sheet-root" role="presentation">
            <button
              type="button"
              className="sort-info-sheet__backdrop"
              aria-label="추천순 설명 닫기"
              onClick={closeInfo}
            />
            <div
              ref={popoverRef}
              className="sort-info-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby={sheetTitleId}
            >
              <div className="sort-info-sheet__handle" aria-hidden="true" />
              <div className="sort-info-sheet__header">
                <p id={sheetTitleId} className="sort-info-sheet__title">
                  {label}
                </p>
                <button
                  type="button"
                  className="sort-info-sheet__close"
                  onClick={closeInfo}
                >
                  닫기
                </button>
              </div>
              <p className="sort-info-sheet__body">{description}</p>
            </div>
          </div>
        </Portal>
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useEffectEvent, useId, useLayoutEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  formatProductBadgeLabel,
  getBadgeKindFromLabel,
  getBadgeToneFromLabel,
  type ProductBadgeTone,
} from "./productBadgeUtils";
type TooltipPlacement = "top" | "bottom";

type ProductBadgeProps = {
  label: string;
  tone?: ProductBadgeTone;
  className?: string;
  tooltip?: string;
  tooltipAriaLabel?: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  spanProps?: HTMLAttributes<HTMLSpanElement>;
};

const MOBILE_MEDIA_QUERY = "(max-width: 768px), (hover: none), (pointer: coarse)";
const DESKTOP_CLOSE_DELAY_MS = 120;

function matchesClientMedia(query: string) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(query).matches;
}

function isGradeTone(value: string | undefined): value is Exclude<ProductBadgeTone, "neutral"> {
  return value === "grade-a" || value === "grade-b" || value === "grade-c" || value === "grade-d";
}

function getTooltipPlacement(triggerRect: DOMRect, tooltipRect: DOMRect): TooltipPlacement {
  const topRoom = triggerRect.top;
  const bottomRoom = window.innerHeight - triggerRect.bottom;

  if (topRoom >= tooltipRect.height + 24 || topRoom >= bottomRoom) {
    return "top";
  }

  return "bottom";
}

function BadgePortal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

export default function ProductBadge({
  label,
  tone,
  className,
  tooltip,
  tooltipAriaLabel,
  buttonProps,
  spanProps,
}: ProductBadgeProps) {
  const formattedLabel = formatProductBadgeLabel(label);
  const resolvedTone = tone ?? getBadgeToneFromLabel(label);
  const badgeKind = getBadgeKindFromLabel(formattedLabel);
  const hasTooltip = Boolean(tooltip);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const sheetTitleId = useId();
  const tooltipId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => matchesClientMedia(MOBILE_MEDIA_QUERY));

  const badgeClassName = [
    "metric-badge",
    `metric-badge--kind-${badgeKind}`,
    isGradeTone(resolvedTone) ? `metric-badge--${resolvedTone}` : "metric-badge--neutral",
    hasTooltip ? "metric-badge--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openBadgeInfo = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const closeBadgeInfo = () => {
    clearCloseTimer();
    setIsOpen(false);
  };

  const closeBadgeInfoFromEffect = useEffectEvent(() => {
    closeBadgeInfo();
  });

  const scheduleDesktopClose = () => {
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
    if (!hasTooltip || isMobile || !isOpen || !buttonRef.current || !tooltipRef.current) {
      return;
    }

    const updateTooltipPosition = () => {
      if (!buttonRef.current || !tooltipRef.current) return;

      const triggerRect = buttonRef.current.getBoundingClientRect();
      const tooltipNode = tooltipRef.current;
      const tooltipRect = tooltipNode.getBoundingClientRect();
      const placement = getTooltipPlacement(triggerRect, tooltipRect);
      const centerX = triggerRect.left + triggerRect.width / 2;
      const maxLeft = window.innerWidth - tooltipRect.width / 2 - 12;
      const minLeft = tooltipRect.width / 2 + 12;
      const left = Math.min(maxLeft, Math.max(minLeft, centerX));
      const top =
        placement === "top" ? triggerRect.top - 10 : triggerRect.bottom + 10;

      tooltipNode.dataset.placement = placement;
      tooltipNode.style.left = `${left}px`;
      tooltipNode.style.top = `${top}px`;
      tooltipNode.style.transform =
        placement === "top"
          ? "translate(-50%, calc(-100% - 8px))"
          : "translate(-50%, 8px)";
    };

    updateTooltipPosition();
    window.addEventListener("resize", updateTooltipPosition);
    window.addEventListener("scroll", updateTooltipPosition, true);

    return () => {
      window.removeEventListener("resize", updateTooltipPosition);
      window.removeEventListener("scroll", updateTooltipPosition, true);
    };
  }, [hasTooltip, isMobile, isOpen]);

  useEffect(() => {
    if (!hasTooltip || !isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeBadgeInfoFromEffect();
      }
    };

    const closeOnScroll = () => {
      closeBadgeInfoFromEffect();
    };

    const closeOnPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (buttonRef.current?.contains(target) || tooltipRef.current?.contains(target)) {
        return;
      }

      closeBadgeInfoFromEffect();
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnPointerDown);
    document.addEventListener("touchstart", closeOnPointerDown);
    window.addEventListener("scroll", closeOnScroll, true);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnPointerDown);
      document.removeEventListener("touchstart", closeOnPointerDown);
      window.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [hasTooltip, isOpen]);

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

  if (!hasTooltip) {
    return (
      <span className={badgeClassName} {...spanProps}>
        <span className="metric-badge__label">{formattedLabel}</span>
      </span>
    );
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={badgeClassName}
        aria-label={tooltipAriaLabel ?? `${formattedLabel} 설명 보기`}
        aria-describedby={!isMobile && isOpen ? tooltipId : undefined}
        aria-expanded={isOpen}
        aria-haspopup={isMobile ? "dialog" : "true"}
        {...buttonProps}
        onMouseEnter={(event) => {
          buttonProps?.onMouseEnter?.(event);
          if (!isMobile) openBadgeInfo();
        }}
        onMouseLeave={(event) => {
          buttonProps?.onMouseLeave?.(event);
          if (!isMobile) scheduleDesktopClose();
        }}
        onFocus={(event) => {
          buttonProps?.onFocus?.(event);
          if (!isMobile) openBadgeInfo();
        }}
        onBlur={(event) => {
          buttonProps?.onBlur?.(event);
          if (!isMobile) scheduleDesktopClose();
        }}
        onClick={(event) => {
          buttonProps?.onClick?.(event);
          event.stopPropagation();
          if (event.defaultPrevented) return;
          if (isMobile) {
            setIsOpen(true);
            return;
          }
          openBadgeInfo();
        }}
      >
        <span className="metric-badge__label">{formattedLabel}</span>
      </button>

      {!isMobile && isOpen ? (
        <BadgePortal>
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className="metric-info-tooltip"
            onMouseEnter={openBadgeInfo}
            onMouseLeave={scheduleDesktopClose}
          >
            {tooltip}
            <span aria-hidden="true" className="metric-info-tooltip__arrow" />
          </div>
        </BadgePortal>
      ) : null}

      {isMobile && isOpen ? (
        <BadgePortal>
          <div className="metric-info-sheet-root" role="presentation">
            <button
              type="button"
              className="metric-info-sheet__backdrop"
              aria-label="배지 설명 닫기"
              onClick={closeBadgeInfo}
            />
            <div
              ref={tooltipRef}
              className="metric-info-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby={sheetTitleId}
            >
              <div className="metric-info-sheet__handle" aria-hidden="true" />
              <div className="metric-info-sheet__header">
                <p id={sheetTitleId} className="metric-info-sheet__title">
                  {formattedLabel}
                </p>
                <button
                  type="button"
                  className="metric-info-sheet__close"
                  onClick={closeBadgeInfo}
                >
                  닫기
                </button>
              </div>
              <p className="metric-info-sheet__body">{tooltip}</p>
            </div>
          </div>
        </BadgePortal>
      ) : null}
    </>
  );
}

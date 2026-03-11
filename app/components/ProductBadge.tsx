"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

type ProductBadgeTone = "grade-a" | "grade-b" | "grade-c" | "grade-d" | "neutral";
type TooltipPlacement = "top" | "bottom";
type TooltipMetric = "density" | "diet" | "performance";

type ProductBadgeProps = {
  label: string;
  tone?: ProductBadgeTone;
  className?: string;
  tooltip?: string;
  tooltipAriaLabel?: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  spanProps?: HTMLAttributes<HTMLSpanElement>;
};

export const METRIC_BADGE_TOOLTIP_TEXT: Record<TooltipMetric, string> = {
  density:
    "열량 대비 단백질 함량을 의미합니다.\n단백질 밀도 = 단백질(g) / 칼로리(kcal)\n밀도가 높을수록 같은 칼로리에서 더 많은 단백질을 섭취할 수 있습니다.",
  diet:
    "다이어트 식단에 적합한 제품을 평가한 지표입니다.\n당류, 칼로리, 단백질 밀도를 종합적으로 고려합니다.",
  performance:
    "운동 후 단백질 보충에 적합한 제품을 평가한 지표입니다.\n단백질 함량과 영양 구성을 종합적으로 고려합니다.",
};

export function formatProductBadgeLabel(label: string): string {
  if (label.startsWith("밀도 ")) {
    return label.replace("밀도 ", "단백질 밀도 ");
  }

  return label;
}

export function getProductBadgeTone(label: string): ProductBadgeTone {
  const letter = label.split(" ").pop();

  if (letter === "A") return "grade-a";
  if (letter === "B") return "grade-b";
  if (letter === "C") return "grade-c";
  return "grade-d";
}

export function getMetricBadgeType(label: string): TooltipMetric | null {
  if (label.startsWith("밀도 ") || label.startsWith("단백질 밀도 ")) return "density";
  if (label.startsWith("다이어트 ")) return "diet";
  if (label.startsWith("퍼포먼스 ")) return "performance";
  return null;
}

export function getMetricBadgeTooltip(label: string): string | null {
  const metric = getMetricBadgeType(label);
  return metric ? METRIC_BADGE_TOOLTIP_TEXT[metric] : null;
}

export function getMetricBadgeAriaLabel(label: string): string | undefined {
  const metric = getMetricBadgeType(label);

  if (!metric) return undefined;

  const map: Record<TooltipMetric, string> = {
    density: "단백질 밀도 지표 설명 보기",
    diet: "다이어트 지표 설명 보기",
    performance: "퍼포먼스 지표 설명 보기",
  };

  return `${formatProductBadgeLabel(label)} - ${map[metric]}`;
}

export default function ProductBadge({
  label,
  tone = "neutral",
  className,
  tooltip,
  tooltipAriaLabel,
  buttonProps,
  spanProps,
}: ProductBadgeProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<{
    top: number;
    left: number;
    placement: TooltipPlacement;
  } | null>(null);
  const tooltipId = useId();
  const hasTooltip = Boolean(tooltip);
  const composedClassName = [
    "product-ui-badge",
    `product-ui-badge--${tone}`,
    hasTooltip ? "product-ui-badge--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useLayoutEffect(() => {
    if (!hasTooltip || !isOpen || !buttonRef.current) {
      setTooltipStyle(null);
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const tooltipWidth = Math.min(260, window.innerWidth - 16);
    const placeBottom = rect.top < 84;
    const top = placeBottom ? rect.bottom + 10 : rect.top - 10;
    const left = Math.min(
      window.innerWidth - tooltipWidth / 2 - 8,
      Math.max(tooltipWidth / 2 + 8, rect.left + rect.width / 2),
    );

    setTooltipStyle({
      top,
      left,
      placement: placeBottom ? "bottom" : "top",
    });
  }, [hasTooltip, isOpen]);

  useEffect(() => {
    if (!hasTooltip || !isOpen) return;

    const close = () => setIsOpen(false);

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (buttonRef.current?.contains(target)) {
        return;
      }

      close();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasTooltip, isOpen]);

  if (!hasTooltip) {
    return (
      <span className={composedClassName} {...spanProps}>
        <span className="product-ui-badge__label">{label}</span>
      </span>
    );
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={composedClassName}
        aria-label={tooltipAriaLabel ?? `${label} 설명 보기`}
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-expanded={isOpen}
        {...buttonProps}
        onMouseEnter={(event) => {
          buttonProps?.onMouseEnter?.(event);
          setIsOpen(true);
        }}
        onMouseLeave={(event) => {
          buttonProps?.onMouseLeave?.(event);
          setIsOpen(false);
        }}
        onFocus={(event) => {
          buttonProps?.onFocus?.(event);
          setIsOpen(true);
        }}
        onBlur={(event) => {
          buttonProps?.onBlur?.(event);
          setIsOpen(false);
        }}
        onClick={(event) => {
          buttonProps?.onClick?.(event);
          if (event.defaultPrevented) return;
          setIsOpen((current) => !current);
        }}
        onKeyDown={(event) => {
          buttonProps?.onKeyDown?.(event);
          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
      >
        <span className="product-ui-badge__label">{label}</span>
        <span aria-hidden="true" className="product-ui-badge__indicator">
          •
        </span>
      </button>

      {isOpen && tooltipStyle ? (
        <div
          id={tooltipId}
          role="tooltip"
          className={`product-ui-tooltip product-ui-tooltip--${tooltipStyle.placement}`}
          style={{
            left: tooltipStyle.left,
            top: tooltipStyle.top,
            transform:
              tooltipStyle.placement === "top"
                ? "translate(-50%, calc(-100% - 8px))"
                : "translate(-50%, 8px)",
          }}
        >
          {tooltip}
          <span aria-hidden="true" className="product-ui-tooltip__arrow" />
        </div>
      ) : null}
    </>
  );
}

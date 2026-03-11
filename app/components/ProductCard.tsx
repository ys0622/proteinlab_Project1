"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { trackPurchaseClick } from "@/lib/gtag";
import { getProductImageUrl } from "../lib/productImage";
import {
  getOfficialMallUrl,
  getNaverSearchUrl,
  getPreferredCoupangUrl,
} from "../lib/purchaseLinks";
import CompareButton from "./CompareButton";
import PurchaseLinkRow from "./PurchaseLinkRow";

export interface ProductCardProps {
  brand: string;
  name: string;
  capacity: string;
  variant?: string;
  tags: string[];
  proteinPerServing: number;
  calories?: number;
  sugar?: number;
  density: string;
  productUrl?: string;
  coupangUrl?: string;
  gradeTags?: string[];
  slug?: string;
  priority?: boolean;
}

type TooltipMetric = "density" | "diet" | "performance";

const GRADE_TOOLTIP_TEXT: Record<TooltipMetric, string> = {
  density:
    "열량 대비 단백질 함량을 의미합니다.\n단백질 밀도 = 단백질(g) / 칼로리(kcal)\n밀도가 높을수록 같은 칼로리에서 더 많은 단백질을 섭취할 수 있습니다.",
  diet:
    "다이어트 식단에 적합한 제품을 평가한 지표입니다.\n당류, 칼로리, 단백질 밀도를 종합적으로 고려합니다.",
  performance:
    "운동 후 단백질 보충에 적합한 제품을 평가한 지표입니다.\n단백질 함량과 영양 구성을 종합적으로 고려합니다.",
};

function formatGradeTagLabel(tag: string): string {
  if (tag.startsWith("밀도 ")) {
    return tag.replace("밀도 ", "단백질 밀도 ");
  }

  return tag;
}

function getTooltipMetric(tag: string): TooltipMetric | null {
  if (tag.startsWith("밀도 ")) return "density";
  if (tag.startsWith("다이어트 ")) return "diet";
  if (tag.startsWith("퍼포먼스 ")) return "performance";
  return null;
}

function getTooltipAriaLabel(tag: string, metric: TooltipMetric): string {
  const labels: Record<TooltipMetric, string> = {
    density: "단백질 밀도 지표 설명 보기",
    diet: "다이어트 지표 설명 보기",
    performance: "퍼포먼스 지표 설명 보기",
  };

  return `${formatGradeTagLabel(tag)} - ${labels[metric]}`;
}

export default function ProductCard({
  brand,
  name,
  capacity,
  variant = "일반",
  tags,
  proteinPerServing,
  calories,
  sugar,
  density,
  productUrl = "#",
  coupangUrl,
  gradeTags = [],
  slug,
  priority = false,
}: ProductCardProps) {
  const router = useRouter();
  const detailHref = slug ? `/product/${slug}` : productUrl;
  const imageUrl = slug ? getProductImageUrl(slug) : null;
  const coupangHref = getPreferredCoupangUrl(brand, name, coupangUrl ?? productUrl);
  const naverHref = getNaverSearchUrl(brand, name);
  const officialMallHref = getOfficialMallUrl(brand);
  const productId = slug ?? `${brand}-${name}`;
  const packageTag = tags.find((tag) => ["팩", "PET", "CAN"].includes(tag));
  const capacitySuffix = packageTag ? `, ${packageTag}` : "";
  const canOpenDetail = Boolean(detailHref && detailHref !== "#");
  const badgeButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activeTooltipTag, setActiveTooltipTag] = useState<string | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<{
    top: number;
    left: number;
    placement: "top" | "bottom";
  } | null>(null);

  const activeMetric = activeTooltipTag ? getTooltipMetric(activeTooltipTag) : null;
  const activeTooltipText = activeMetric ? GRADE_TOOLTIP_TEXT[activeMetric] : null;
  const activeTooltipId = activeTooltipTag
    ? `product-card-tooltip-${productId}-${activeTooltipTag.replace(/\s+/g, "-")}`
    : undefined;

  useLayoutEffect(() => {
    if (!activeTooltipTag) {
      setTooltipStyle(null);
      return;
    }

    const button = badgeButtonRefs.current[activeTooltipTag];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const tooltipWidth = Math.min(280, window.innerWidth - 16);
    const preferredTop = rect.top - 12;
    const shouldPlaceBottom = preferredTop < 80;
    const top = shouldPlaceBottom ? rect.bottom + 12 : rect.top - 12;
    const centeredLeft = rect.left + rect.width / 2;
    const halfWidth = tooltipWidth / 2;
    const left = Math.min(
      window.innerWidth - tooltipWidth / 2 - 8,
      Math.max(tooltipWidth / 2 + 8, centeredLeft),
    );

    setTooltipStyle({
      top,
      left,
      placement: shouldPlaceBottom ? "bottom" : "top",
    });
  }, [activeTooltipTag]);

  useEffect(() => {
    if (!activeTooltipTag) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedBadge = Object.values(badgeButtonRefs.current).some((button) =>
        button?.contains(target),
      );

      if (!clickedBadge) {
        setActiveTooltipTag(null);
      }
    };

    const handleScroll = () => {
      setActiveTooltipTag(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveTooltipTag(null);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTooltipTag]);

  const shouldIgnoreCardClick = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(target.closest("a, button, input, select, textarea, label"));
  };

  const openDetail = () => {
    if (!canOpenDetail) {
      return;
    }

    router.push(detailHref);
  };

  const handleCardClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    openDetail();
  };

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  };

  const imageArea = (
    <div
      className="product-card__media flex w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-xl transition-colors duration-200 group-hover:border-[#e2e2e2]"
      style={{
        borderRadius: "12px",
        padding: "10px",
        height: "200px",
        background: "#ffffff",
        border: "1px solid #eee",
      }}
    >
      {imageUrl ? (
        <div
          className="product-card__image relative h-full w-full"
          style={{ minHeight: "160px", maxWidth: "200px" }}
        >
          <Image
            src={imageUrl}
            alt={`${brand} ${name}`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
            unoptimized
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      ) : (
        <div className="h-[160px] w-full" style={{ maxWidth: "200px" }} />
      )}
    </div>
  );

  return (
    <>
      <article
        className={`product-card group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#FFFDF8] transition-all duration-200 ease-out hover:border-[#ddd] active:shadow-sm ${canOpenDetail ? "cursor-pointer" : ""}`}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        role={canOpenDetail ? "link" : undefined}
        tabIndex={canOpenDetail ? 0 : undefined}
        aria-label={canOpenDetail ? `${brand} ${name} 상세 보기` : undefined}
        style={{
          borderRadius: "16px",
          padding: "14px",
          borderColor: "#e8e6e3",
        }}
      >
        {slug && detailHref.startsWith("/product/") ? (
          <Link
            href={detailHref}
            className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            aria-label={`${brand} ${name} 상세 보기`}
          >
            {imageArea}
          </Link>
        ) : (
          imageArea
        )}

        <div className="product-card__content flex min-h-0 flex-1 flex-col">
          <p className="product-card__brand mt-4 text-xs tracking-wide" style={{ color: "#7a7a7a" }}>
            {brand}
          </p>

          <h3
            className="product-card__title mt-1 font-semibold leading-snug"
            style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a" }}
          >
            <span>{name}</span>
            <span className="font-normal" style={{ fontSize: "13px", color: "#6b6b6b" }}>
              {" "}
              {capacity}
              {capacitySuffix}
            </span>
          </h3>

          <div className="product-card__badges mt-1.5 flex flex-wrap gap-1.5" style={{ gap: "6px" }}>
            {gradeTags.map((tag) => {
              const letter = tag.split(" ").pop();
              const metric = getTooltipMetric(tag);
              const displayTag = formatGradeTagLabel(tag);
              const style =
                letter === "A"
                  ? { bg: "#E7F3EC", border: "#1B7F5B", color: "#1B7F5B" }
                  : letter === "B"
                    ? { bg: "#EAF2FF", border: "#4C7BD9", color: "#4C7BD9" }
                    : letter === "C"
                      ? { bg: "#FFF1E6", border: "#F08A24", color: "#F08A24" }
                      : { bg: "#f3f3f3", border: "#bbb", color: "#999" };

              if (!metric) {
                return (
                  <span
                    key={tag}
                    className="product-card__badge inline-flex items-center justify-center rounded-full"
                    style={{
                      height: "26px",
                      padding: "0 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background: style.bg,
                      border: `1px solid ${style.border}`,
                      color: style.color,
                    }}
                  >
                    {displayTag}
                  </span>
                );
              }

              const isOpen = activeTooltipTag === tag;

              return (
                <button
                  key={tag}
                  ref={(node) => {
                    badgeButtonRefs.current[tag] = node;
                  }}
                  type="button"
                  aria-label={getTooltipAriaLabel(tag, metric)}
                  aria-describedby={isOpen ? activeTooltipId : undefined}
                  aria-expanded={isOpen}
                  onMouseEnter={() => setActiveTooltipTag(tag)}
                  onMouseLeave={() => setActiveTooltipTag((current) => (current === tag ? null : current))}
                  onFocus={() => setActiveTooltipTag(tag)}
                  onBlur={() => setActiveTooltipTag((current) => (current === tag ? null : current))}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setActiveTooltipTag((current) => (current === tag ? null : tag));
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault();
                      setActiveTooltipTag(null);
                    }
                  }}
                  className="product-card__badge inline-flex items-center justify-center rounded-full transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1"
                  style={{
                    height: "26px",
                    padding: "0 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    background: style.bg,
                    border: `1px solid ${style.border}`,
                    color: style.color,
                  }}
                >
                  {displayTag}
                </button>
              );
            })}
            {variant && variant !== "일반" ? (
              <span
                className="product-card__badge inline-flex items-center justify-center rounded-full"
                style={{
                  height: "26px",
                  padding: "0 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#F5F0E8",
                  border: "1px solid #D4D4D4",
                  color: "#6B6B6B",
                }}
              >
                {variant}
              </span>
            ) : null}
          </div>

          <div className="mx-1 mt-3 border-t border-[#e8e6e3]" />

          <div className="product-card__metrics mt-3 grid grid-cols-2 gap-2">
            {[
              { label: "단백질", value: `${proteinPerServing}g`, isDensity: false },
              { label: "칼로리", value: calories != null ? `${calories}` : "-", isDensity: false },
              { label: "당류", value: sugar !== undefined ? `${sugar}g` : "-", isDensity: false },
              { label: "단백질 밀도", value: density, isDensity: true },
            ].map(({ label, value, isDensity }) => (
              <div
                key={label}
                className="product-card__metric flex min-w-0 flex-col justify-center rounded-lg border border-[#e8e8e8] bg-white px-2.5 py-2 text-left"
                style={{ borderRadius: "10px" }}
              >
                <span
                  className="product-card__metric-label"
                  style={{ fontSize: "11px", color: "#6b6b6b" }}
                >
                  {label}
                </span>
                <span
                  className={`product-card__metric-value ${isDensity ? "product-card__metric-value--density" : ""}`}
                  style={{
                    fontSize: isDensity ? "15px" : "16px",
                    fontWeight: 700,
                    color: "#3d3d3d",
                    lineHeight: 1.2,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="cta-group mt-4">
            <PurchaseLinkRow
              coupangHref={coupangHref}
              naverHref={naverHref}
              officialMallHref={officialMallHref}
              size="sm"
              onCoupangClick={() =>
                trackPurchaseClick({ productName: name, brand, store: "coupang", productId })
              }
              onNaverClick={() =>
                trackPurchaseClick({ productName: name, brand, store: "naver", productId })
              }
              onOfficialClick={() =>
                trackPurchaseClick({ productName: name, brand, store: "official", productId })
              }
            />
          </div>

          <div className="mx-1 mt-3 border-t border-[#e8e6e3]" />

          <div className="product-card__footer-actions mt-3 flex gap-3" style={{ gap: "12px" }}>
            <Link
              href={detailHref}
              className="flex flex-1 items-center justify-center rounded-[10px] border border-[#e2e2e2] bg-white font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] active:scale-[0.98]"
              style={{ height: "40px", fontSize: "12px", borderRadius: "10px" }}
            >
              상세보기
            </Link>
            {slug ? (
              <CompareButton slug={slug} detailHref={detailHref} />
            ) : (
              <button
                type="button"
                disabled
                className="flex flex-1 items-center justify-center rounded-[10px] border border-[#e2e2e2] bg-white font-medium text-[var(--foreground)] opacity-60"
                style={{ height: "40px", fontSize: "12px", borderRadius: "10px" }}
              >
                비교
              </button>
            )}
          </div>
        </div>
      </article>

      {activeTooltipTag && activeTooltipText && tooltipStyle ? (
        <div
          id={activeTooltipId}
          role="tooltip"
          className="pointer-events-none fixed z-30 rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-xs leading-5 text-[var(--foreground-muted)] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          style={{
            width: `${Math.min(280, typeof window === "undefined" ? 280 : window.innerWidth - 16)}px`,
            maxWidth: "calc(100vw - 16px)",
            left: tooltipStyle.left,
            top: tooltipStyle.top,
            transform:
              tooltipStyle.placement === "top"
                ? "translate(-50%, -100%)"
                : "translate(-50%, 0)",
            whiteSpace: "pre-line",
          }}
        >
          {activeTooltipText}
        </div>
      ) : null}
    </>
  );
}

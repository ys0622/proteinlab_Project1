"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { trackPurchaseClick } from "@/lib/gtag";
import { getProductImageUrl } from "../lib/productImage";
import { type CoupangLinkCategory, getPreferredCoupangUrl } from "../lib/purchaseLinks";
import CompareButton from "./CompareButton";
import MetricBadgeGroup from "./MetricBadgeGroup";
import ProductBadge from "./ProductBadge";
import {
  formatProductBadgeLabel,
  getMetricBadgeAriaLabel,
  getMetricBadgeTooltip,
  getProductBadgeTone,
} from "./productBadgeUtils";
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
  /** @deprecated 쿠팡 링크는 coupangUrl만 사용 */
  productUrl?: string;
  coupangUrl?: string;
  /** 제품별 네이버쇼핑 URL (null이면 비활성화) */
  naverUrl?: string | null;
  /** 제품별 공식몰 상세 URL (null이면 비활성화) */
  officialUrl?: string | null;
  gradeTags?: string[];
  slug?: string;
  priority?: boolean;
  productType?: "drink" | "bar" | "yogurt" | "shake";
  yogurtType?: string;
  purchaseLinkCategory?: CoupangLinkCategory;
  maxVisibleBadges?: number;
  fixedTitleLines?: 1 | 2;
  hideSupplementalBadges?: boolean;
}

function renderMetricValue(value: string, isDensity: boolean) {
  if (!isDensity) {
    return value;
  }

  const [metricValue, metricUnit] = value.split("/");

  if (!metricUnit) {
    return value;
  }

  return (
    <span className="flex min-w-0 flex-col">
      <span className="truncate">{metricValue}</span>
      <span className="text-[10px] font-semibold leading-tight text-[#6b6b6b] md:text-[11px]">
        /{metricUnit}
      </span>
    </span>
  );
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
  naverUrl,
  officialUrl,
  gradeTags = [],
  slug,
  priority = false,
  productType,
  yogurtType,
  purchaseLinkCategory,
  maxVisibleBadges,
  fixedTitleLines,
  hideSupplementalBadges,
}: ProductCardProps) {
  const router = useRouter();
  const detailHref = slug ? `/product/${slug}` : "#";
  const imageUrl = slug ? getProductImageUrl(slug) : null;
  const resolvedPurchaseLinkCategory = purchaseLinkCategory ?? productType ?? null;
  const coupangHref = getPreferredCoupangUrl(coupangUrl, resolvedPurchaseLinkCategory);
  const naverHref = naverUrl && naverUrl !== "#" && naverUrl !== "" ? naverUrl : null;
  const officialMallHref = officialUrl && officialUrl !== "#" && officialUrl !== "" ? officialUrl : null;
  const productId = slug ?? `${brand}-${name}`;
  const hasCapacityInName = Boolean(capacity && name.includes(capacity));
  const packageTag = tags.find((tag) => ["팩", "PET", "CAN"].includes(tag));
  const capacitySuffix = packageTag ? `, ${packageTag}` : "";
  const capacityIndex = hasCapacityInName && capacity ? name.lastIndexOf(capacity) : -1;
  const titlePrefix = capacityIndex > 0 ? name.slice(0, capacityIndex).trim() : name;
  const titleCapacityLabel = capacity ? `${capacity}${capacitySuffix}` : "";
  const canOpenDetail = Boolean(detailHref && detailHref !== "#");
  const visibleGradeTags =
    productType === "yogurt"
      ? gradeTags.filter(
          (tag) =>
            tag.includes("단백질 밀도") || tag.includes("다이어트") || tag.includes("퍼포먼스"),
        )
      : gradeTags;
  const limitedGradeTags = typeof maxVisibleBadges === "number"
    ? visibleGradeTags.slice(0, maxVisibleBadges)
    : visibleGradeTags;

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
      className="product-card__media flex h-[176px] w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eee] bg-[#ffffff] p-1 transition-colors duration-200 group-hover:border-[#e2e2e2] md:h-[200px] md:p-[10px]"
      style={{ borderRadius: "12px" }}
    >
      {imageUrl ? (
        <div
          className="product-card__image relative h-full w-full max-w-[180px] md:max-w-[200px]"
          style={{ minHeight: "140px" }}
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
        <div className="h-[140px] w-full max-w-[180px] md:h-[160px] md:max-w-[200px]" />
      )}
    </div>
  );

  return (
    <article
      className={`product-card group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#FFFDF8] p-2.5 transition-all duration-200 ease-out hover:border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 active:shadow-sm md:p-[14px] ${canOpenDetail ? "cursor-pointer" : ""}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role={canOpenDetail ? "link" : undefined}
      tabIndex={canOpenDetail ? 0 : undefined}
      aria-label={canOpenDetail ? `${brand} ${name} 상세 보기` : undefined}
      style={{
        borderRadius: "16px",
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
        <p className="product-card__brand mt-2.5 text-xs tracking-wide md:mt-4" style={{ color: "#7a7a7a" }}>
          {brand}
        </p>

        <h3
          className={`product-card__title mt-1 font-semibold leading-snug ${
            fixedTitleLines === 2 ? "line-clamp-2 min-h-[44px]" : ""
          }`}
          style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a" }}
        >
          <span>{titlePrefix}</span>
          {titleCapacityLabel ? (
            <span className="font-normal" style={{ fontSize: "13px", color: "#6b6b6b" }}>
              {" "}
              {titleCapacityLabel}
            </span>
          ) : null}
        </h3>

        <MetricBadgeGroup className="product-card__badges mt-0.5">
          {limitedGradeTags.map((tag) => {
            const displayTag = formatProductBadgeLabel(tag);
            const tone = getProductBadgeTone(displayTag);
            const tooltip = getMetricBadgeTooltip(tag);

            return (
              <ProductBadge
                key={tag}
                label={displayTag}
                tone={tone}
                className="product-card__badge focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1"
                tooltip={tooltip ?? undefined}
                tooltipAriaLabel={getMetricBadgeAriaLabel(tag)}
              />
            );
          })}
          {variant && variant !== "일반" && productType !== "yogurt" && !hideSupplementalBadges ? (
            <ProductBadge
              label={variant}
              tone="neutral"
              className="product-card__badge"
              tooltip={getMetricBadgeTooltip(variant) ?? undefined}
              tooltipAriaLabel={getMetricBadgeAriaLabel(variant)}
            />
          ) : null}
          {yogurtType && productType !== "yogurt" && !hideSupplementalBadges ? (
            <ProductBadge label={yogurtType} tone="neutral" className="product-card__badge" />
          ) : null}
        </MetricBadgeGroup>

        <div className="mx-1 mt-1.5 border-t border-[#e8e6e3] md:mt-3" />

        <div className="product-card__metrics mt-1.5 grid grid-cols-2 gap-1 md:mt-3 md:gap-2">
          {[
            { label: "단백질", value: `${proteinPerServing}g`, isDensity: false },
            { label: "칼로리", value: calories != null ? `${calories}` : "-", isDensity: false },
            { label: "당류", value: sugar !== undefined ? `${sugar}g` : "-", isDensity: false },
            { label: "단백질 밀도", value: density, isDensity: true },
          ].map(({ label, value, isDensity }) => (
            <div
              key={label}
              className="product-card__metric flex min-w-0 flex-col justify-center rounded-lg border border-[#e8e8e8] bg-white px-2 py-0 text-left md:px-2.5 md:py-2"
              style={{ borderRadius: "10px" }}
            >
              <span
                className="product-card__metric-label"
                style={{ fontSize: "11px", color: "#6b6b6b" }}
              >
                {label}
              </span>
              <span
                className={`product-card__metric-value ${isDensity ? "product-card__metric-value--compact" : ""}`}
                style={{
                  fontSize: isDensity ? "12px" : "13px",
                  fontWeight: 700,
                  color: "#3d3d3d",
                  lineHeight: 1.2,
                }}
              >
                <span className="block min-w-0 md:text-[14px]">
                  {renderMetricValue(value, isDensity)}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="cta-group mt-1.5 md:mt-4">
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

        <div className="mx-1 mt-1 border-t border-[#e8e6e3] md:mt-3" />

        <div className="product-card__footer-actions mt-1 flex gap-1.5 md:mt-3 md:gap-3">
          <Link
            href={detailHref}
            className="flex flex-1 items-center justify-center rounded-[10px] border border-[#e2e2e2] bg-white font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] active:scale-[0.98]"
            style={{ height: "34px", fontSize: "12px", borderRadius: "10px" }}
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
              style={{ height: "34px", fontSize: "12px", borderRadius: "10px" }}
            >
              비교
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

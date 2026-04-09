"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { productClick, purchaseClick } from "@/lib/analytics";
import type { ProductCardProps } from "../data/productTypes";
import { getProductImageUrl } from "../lib/productImage";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  normalizeCoupangUrl,
} from "../lib/purchaseLinks";
import CompareButton from "./CompareButton";
import FavoriteButton from "./FavoriteButton";
import MetricBadgeGroup from "./MetricBadgeGroup";
import ProductBadge from "./ProductBadge";
import {
  formatProductBadgeLabel,
  getMetricBadgeAriaLabel,
  getMetricBadgeTooltip,
  getProductBadgeTone,
} from "./productBadgeUtils";
import PurchaseLinkRow from "./PurchaseLinkRow";

interface Review {
  id: string;
  rating: "up" | "mid" | "down";
  tags: string[];
  comment: string;
  createdAt: string;
}

interface ReviewSummary {
  recommendCount: number;
  reviewCount: number;
}

const reviewSummaryCache = new Map<string, ReviewSummary>();
const pendingReviewSummaryRequests = new Map<string, Promise<ReviewSummary>>();

async function fetchReviewSummary(slug: string): Promise<ReviewSummary> {
  const cached = reviewSummaryCache.get(slug);
  if (cached) return cached;

  const pending = pendingReviewSummaryRequests.get(slug);
  if (pending) return pending;

  const request = fetch(`/api/reviews/${slug}`)
    .then((response) => response.json())
    .then((data: { reviews?: Review[] }) => {
      const reviews = Array.isArray(data.reviews) ? data.reviews : [];
      const summary = {
        recommendCount: reviews.filter((review) => review.rating === "up").length,
        reviewCount: reviews.length,
      };
      reviewSummaryCache.set(slug, summary);
      return summary;
    })
    .catch(() => {
      const emptySummary = { recommendCount: 0, reviewCount: 0 };
      reviewSummaryCache.set(slug, emptySummary);
      return emptySummary;
    })
    .finally(() => {
      pendingReviewSummaryRequests.delete(slug);
    });

  pendingReviewSummaryRequests.set(slug, request);
  return request;
}

function renderMetricValue(value: string, isDensity: boolean) {
  if (!isDensity) return value;

  const [metricValue, metricUnit] = value.split("/");
  if (!metricUnit) return value;

  return (
    <span className="flex min-w-0 flex-col">
      <span className="truncate">{metricValue}</span>
      <span className="text-[10px] font-semibold leading-tight text-[#6b6b6b] md:text-[11px]">
        /{metricUnit}
      </span>
    </span>
  );
}

function ActionTooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group/action relative">
      {children}
      <span className="pointer-events-none absolute -bottom-8 right-0 whitespace-nowrap rounded-full border border-[#e5e7eb] bg-white px-2 py-1 text-[10px] font-semibold text-[#4b5563] opacity-0 shadow-[0_1px_4px_rgba(15,23,42,0.08)] transition-opacity duration-150 group-hover/action:opacity-100">
        {label}
      </span>
    </div>
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
  productUrl: _productUrl = "#",
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
  const [reviewSummary, setReviewSummary] = useState<ReviewSummary | null>(() =>
    slug ? reviewSummaryCache.get(slug) ?? null : null,
  );
  void _productUrl;

  const detailHref = slug ? `/product/${slug}` : "#";
  const isDrinkCard = productType === "drink";
  const imageUrl = slug ? getProductImageUrl(slug) : null;
  const resolvedPurchaseLinkCategory = purchaseLinkCategory ?? productType ?? null;
  const rawCoupangUrl = normalizeCoupangUrl(coupangUrl) ?? getKnownSourceCoupangUrlBySlug(slug);
  const coupangHref = getCoupangRedirectHref(rawCoupangUrl, resolvedPurchaseLinkCategory, slug);
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
          (tag) => tag.includes("가성비") || tag.includes("다이어트") || tag.includes("퍼포먼스"),
        )
      : gradeTags;
  const limitedGradeTags =
    typeof maxVisibleBadges === "number"
      ? visibleGradeTags.slice(0, maxVisibleBadges)
      : visibleGradeTags;
  const feedbackMeta = reviewSummary && reviewSummary.reviewCount > 0 ? reviewSummary : null;
  const drinkSurfaceBg = "color-mix(in srgb, var(--hero-bg) 64%, white)";

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    void fetchReviewSummary(slug).then((summary) => {
      if (!cancelled) setReviewSummary(summary);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const shouldIgnoreCardClick = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(target.closest("a, button, input, select, textarea, label"));
  };

  const openDetail = () => {
    if (!canOpenDetail) return;
    productClick({
      productId,
      productName: name,
      brand,
      category: productType,
      destinationUrl: detailHref,
      source: "card",
      ctaText: "제품 상세 보기",
    });
    router.push(detailHref);
  };

  const handleCardClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) return;
    openDetail();
  };

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  };

  return (
    <article
      className={`product-card group flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 ease-out hover:border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 active:shadow-sm ${
        isDrinkCard
          ? "px-2.5 pt-2.5 pb-0.5 md:px-[14px] md:pt-[14px] md:pb-[6px]"
          : "p-2.5 md:p-[14px]"
      } ${
        isDrinkCard ? "self-start" : "h-full"
      } ${
        canOpenDetail ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role={canOpenDetail ? "link" : undefined}
      tabIndex={canOpenDetail ? 0 : undefined}
      aria-label={canOpenDetail ? `${brand} ${name} 제품 상세 보기` : undefined}
      style={{
        borderRadius: "16px",
        borderColor: isDrinkCard ? "#e5ddd1" : "#e8e6e3",
        background: isDrinkCard ? drinkSurfaceBg : "#FFFDF8",
        boxShadow: isDrinkCard ? "0 2px 10px rgba(60,45,30,0.08)" : undefined,
      }}
    >
      <div
        className={
          isDrinkCard ? "-mx-2.5 -mt-2.5 relative overflow-hidden bg-white md:-mx-[14px] md:-mt-[14px]" : "relative"
        }
      >
        <div
          className={`product-card__media flex w-full flex-shrink-0 items-center justify-center overflow-hidden bg-white ${
            isDrinkCard
              ? "h-[136px] px-3 pb-1 pt-2 md:h-[170px] md:px-4 md:pb-2 md:pt-3"
              : "rounded-xl border border-[#eee] p-1 group-hover:border-[#e2e2e2] md:h-[200px] md:p-[10px]"
          }`}
          style={{ borderRadius: isDrinkCard ? "0" : "12px" }}
        >
          {imageUrl ? (
            <div
              className={`product-card__image relative h-full w-full ${
                isDrinkCard ? "max-w-[148px] md:max-w-[202px]" : "max-w-[180px] md:max-w-[200px]"
              }`}
              style={{ minHeight: isDrinkCard ? "118px" : "140px" }}
            >
              <Image
                src={imageUrl}
                alt={`${brand} ${name}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 200px"
                unoptimized
                priority={priority}
                loading={priority ? "eager" : "lazy"}
              />
            </div>
          ) : (
            <div className="product-card__image h-[118px] w-full max-w-[148px] md:h-[160px] md:max-w-[200px]" />
          )}
        </div>

        {slug ? (
          <div className="absolute right-1 top-1 z-10 flex items-center gap-1 md:right-2 md:top-2">
            <ActionTooltip label="즐겨찾기">
              <FavoriteButton slug={slug} compact />
            </ActionTooltip>
            <ActionTooltip label="스펙 비교">
              <CompareButton slug={slug} detailHref={detailHref} compact />
            </ActionTooltip>
          </div>
        ) : null}

        {feedbackMeta ? (
          <>
            <div className="pointer-events-none absolute left-1 top-1 z-10 flex flex-col gap-0.5 md:hidden">
              {feedbackMeta.recommendCount > 0 ? (
                <span className="inline-flex min-h-[16px] items-center self-start rounded-full border border-[#d9e7df] bg-white/88 px-1 py-[1px] text-[7px] font-semibold leading-none text-[#2F5D46] shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
                  <span aria-hidden="true" className="mr-0.5">
                    👍
                  </span>
                  {feedbackMeta.recommendCount}
                </span>
              ) : null}
              <span className="inline-flex min-h-[16px] items-center self-start rounded-full border border-[#e5e7eb] bg-white/88 px-1 py-[1px] text-[7px] font-semibold leading-none text-[#4b5563] shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
                리뷰 {feedbackMeta.reviewCount}
              </span>
            </div>

            <div className="pointer-events-none absolute bottom-2 right-2 z-10 hidden md:block">
              <div className="flex min-h-[24px] items-center rounded-full border border-[#e5e7eb] bg-white/92 px-2 py-1 text-[11px] leading-none text-[#6b7280] shadow-[0_1px_4px_rgba(15,23,42,0.08)] backdrop-blur-[2px]">
                {feedbackMeta.recommendCount > 0 ? (
                  <>
                    <span className="inline-flex items-center gap-1 text-[#2F5D46]">
                      <span aria-hidden="true">👍</span>
                      <span className="font-semibold">{feedbackMeta.recommendCount}</span>
                    </span>
                    <span className="mx-1.5 text-[#c4c4c4]">·</span>
                  </>
                ) : null}
                <span className="whitespace-nowrap">
                  <span className="font-semibold text-[#4b5563]">{feedbackMeta.reviewCount}</span> 리뷰
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div
        className={`flex min-h-0 flex-1 flex-col ${isDrinkCard ? "-mx-2.5 mt-0 px-2.5 pb-0.5 md:-mx-[14px] md:px-[14px] md:pb-0.5" : ""}`}
        style={isDrinkCard ? { background: drinkSurfaceBg } : undefined}
      >
        <p
          className={`product-card__brand text-xs tracking-wide ${
            productType === "drink" ? "mt-1 md:mt-1.5" : "mt-2 md:mt-3"
          }`}
          style={{ color: "#7a7a7a" }}
        >
          {brand}
        </p>

        <h3
          className={`product-card__title mt-1 font-semibold leading-snug ${
            fixedTitleLines === 2 ? "line-clamp-2 min-h-[42px]" : ""
          }`}
          style={{ fontWeight: 600, color: "#1a1a1a" }}
        >
          <span className="block text-[12px] md:text-[16px]">{titlePrefix}</span>
          {titleCapacityLabel ? (
            <span
              className="mt-0.5 block text-[10px] font-normal md:mt-0 md:inline md:text-[13px]"
              style={{ color: "#6b6b6b" }}
            >
              <span className="hidden md:inline"> </span>
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

        {!isDrinkCard ? <div className="mx-1 mt-1.5 border-t border-[#e8e6e3] md:mt-3" /> : null}

        <div
          className={`product-card__metrics grid grid-cols-2 gap-1 md:gap-2 ${
            productType === "drink" ? "mt-1 md:mt-1.5" : "mt-1.5 md:mt-3"
          }`}
        >
          {[
            { label: "단백질", value: `${proteinPerServing}g`, isDensity: false },
            { label: "칼로리", value: calories != null ? `${calories}` : "-", isDensity: false },
            { label: "당류", value: sugar !== undefined ? `${sugar}g` : "-", isDensity: false },
            { label: "단백질 밀도", value: density, isDensity: true },
          ].map(({ label, value, isDensity }) => (
            <div
              key={label}
              className={`product-card__metric flex min-w-0 flex-col justify-center rounded-lg border px-2 text-left md:px-2.5 ${
                isDrinkCard ? "border-[#e6ded2] bg-white" : "border-[#e8e8e8] bg-white"
              } ${productType === "drink" ? "py-1 md:py-1.5" : "py-0 md:py-2"}`}
              style={{ borderRadius: "10px" }}
            >
              <span className="product-card__metric-label" style={{ fontSize: "11px", color: "#6b6b6b" }}>
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
                {renderMetricValue(value, isDensity)}
              </span>
            </div>
          ))}
        </div>

        <div className="cta-group mt-auto pt-1 md:pt-2">
          <PurchaseLinkRow
            coupangHref={coupangHref}
            naverHref={naverHref}
            officialMallHref={officialMallHref}
            size="sm"
            onCoupangClick={() =>
              purchaseClick({
                productName: name,
                brand,
                store: "coupang",
                productId,
                destinationUrl: coupangHref ?? undefined,
                placement: "product_card_purchase_row",
              })
            }
            onNaverClick={() =>
              purchaseClick({
                productName: name,
                brand,
                store: "naver",
                productId,
                destinationUrl: naverHref ?? undefined,
                placement: "product_card_purchase_row",
              })
            }
            onOfficialClick={() =>
              purchaseClick({
                productName: name,
                brand,
                store: "official",
                productId,
                destinationUrl: officialMallHref ?? undefined,
                placement: "product_card_purchase_row",
              })
            }
          />
        </div>
      </div>
    </article>
  );
}

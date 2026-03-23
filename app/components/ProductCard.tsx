"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { productClick, purchaseClick } from "@/lib/analytics";
import { getProductImageUrl } from "../lib/productImage";
import {
  getCoupangRedirectHref,
  getKnownSourceCoupangUrlBySlug,
  type CoupangLinkCategory,
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
  naverUrl?: string | null;
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

  const mediaBox = (
    <div
      className={`product-card__media flex w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eee] bg-[#ffffff] p-1 transition-colors duration-200 group-hover:border-[#e2e2e2] md:p-[10px] ${productType === "drink" ? "h-[166px] md:h-[188px]" : "h-[176px] md:h-[200px]"}`}
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
      <div className="relative">
        {mediaBox}

        {slug ? (
          <div className="absolute right-1 top-1 z-10 md:right-2 md:top-2">
            <FavoriteButton slug={slug} compact />
          </div>
        ) : null}

        {feedbackMeta ? (
          <>
            <div className="pointer-events-none absolute left-1 top-1 z-10 flex flex-col gap-0.5 md:hidden">
              {feedbackMeta.recommendCount > 0 ? (
                <span className="inline-flex min-h-[16px] items-center self-start rounded-full border border-[#d9e7df] bg-white/88 px-1 py-[1px] text-[7px] font-semibold leading-none text-[#2F5D46] shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
                  👍 {feedbackMeta.recommendCount}
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
                  <span className="font-semibold text-[#4b5563]">{feedbackMeta.reviewCount}</span>리뷰
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="product-card__content flex min-h-0 flex-1 flex-col">
        <p
          className={`product-card__brand text-xs tracking-wide ${productType === "drink" ? "mt-2 md:mt-3" : "mt-2.5 md:mt-4"}`}
          style={{ color: "#7a7a7a" }}
        >
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

        <div className={`mx-1 border-t border-[#e8e6e3] ${productType === "drink" ? "mt-1 md:mt-2.5" : "mt-1.5 md:mt-3"}`} />

        <div className={`product-card__metrics grid grid-cols-2 gap-1 md:gap-2 ${productType === "drink" ? "mt-1 md:mt-2.5" : "mt-1.5 md:mt-3"}`}>
          {[
            { label: "단백질", value: `${proteinPerServing}g`, isDensity: false },
            { label: "칼로리", value: calories != null ? `${calories}` : "-", isDensity: false },
            { label: "당류", value: sugar !== undefined ? `${sugar}g` : "-", isDensity: false },
            { label: "단백질 밀도", value: density, isDensity: true },
          ].map(({ label, value, isDensity }) => (
            <div
              key={label}
              className={`product-card__metric flex min-w-0 flex-col justify-center rounded-lg border border-[#e8e8e8] bg-white px-2 text-left md:px-2.5 ${productType === "drink" ? "py-1 md:py-1.5" : "py-0 md:py-2"}`}
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

        <div className={`cta-group ${productType === "drink" ? "mt-1 md:mt-2.5" : "mt-1.5 md:mt-4"}`}>
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
              })
            }
            onNaverClick={() =>
              purchaseClick({
                productName: name,
                brand,
                store: "naver",
                productId,
                destinationUrl: naverHref ?? undefined,
              })
            }
            onOfficialClick={() =>
              purchaseClick({
                productName: name,
                brand,
                store: "official",
                productId,
                destinationUrl: officialMallHref ?? undefined,
              })
            }
          />
        </div>

        <div className={`mx-1 border-t border-[#e8e6e3] ${productType === "drink" ? "mt-1 md:mt-2" : "mt-1 md:mt-3"}`} />

        <div className={`product-card__footer-actions flex gap-1.5 md:gap-3 ${productType === "drink" ? "mt-1 md:mt-2.5" : "mt-1 md:mt-3"}`}>
          <Link
            href={detailHref}
            onClick={() =>
              productClick({
                productId,
                productName: name,
                brand,
                category: productType,
                destinationUrl: detailHref,
              })
            }
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

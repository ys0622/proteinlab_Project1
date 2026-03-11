"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
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

function formatGradeTagLabel(tag: string): string {
  if (tag.startsWith("밀도 ")) {
    return tag.replace("밀도 ", "단백질 밀도 ");
  }

  return tag;
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

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (shouldIgnoreCardClick(event.target)) {
      return;
    }

    openDetail();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
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
            const displayTag = formatGradeTagLabel(tag);
            const style =
              letter === "A"
                ? { bg: "#E7F3EC", border: "#1B7F5B", color: "#1B7F5B" }
                : letter === "B"
                  ? { bg: "#EAF2FF", border: "#4C7BD9", color: "#4C7BD9" }
                  : letter === "C"
                    ? { bg: "#FFF1E6", border: "#F08A24", color: "#F08A24" }
                    : { bg: "#f3f3f3", border: "#bbb", color: "#999" };

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
  );
}

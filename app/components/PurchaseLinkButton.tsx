"use client";

import { useEffect, useRef } from "react";
import { affiliateClick, affiliateImpression, type LinkPosition } from "@/lib/analytics";

type PurchaseLinkTone = "coupang" | "naver" | "official";
type PurchaseLinkSize = "sm" | "md";

export type PurchaseLinkTracking = {
  productId?: string;
  productName?: string;
  productBrand?: string;
  productCategory?: string;
  linkPosition: LinkPosition;
  contentId?: string;
  itemPosition?: number;
};

type PurchaseLinkButtonProps = {
  href?: string | null;
  label: string;
  mobileLabel?: string;
  tone: PurchaseLinkTone;
  size: PurchaseLinkSize;
  onClick?: () => void;
  title?: string;
  tracking?: PurchaseLinkTracking;
  impressionTracking?: PurchaseLinkTracking;
};

export default function PurchaseLinkButton({
  href,
  label,
  mobileLabel,
  tone,
  size,
  onClick,
  title,
  tracking,
  impressionTracking,
}: PurchaseLinkButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const impressionSent = useRef(false);
  const hasValidHref = href && href !== "#" && href !== "";
  const resolvedImpressionTracking = impressionTracking ?? tracking;
  const accessibleLabel = label;
  const className = [
    "purchase-link",
    `purchase-link--${size}`,
    `purchase-link--${tone}`,
    hasValidHref ? "" : "purchase-link--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const element = linkRef.current;
    if (!element || !hasValidHref || !resolvedImpressionTracking || tone !== "coupang") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || impressionSent.current) return;
        impressionSent.current = true;
        affiliateImpression({
          ...resolvedImpressionTracking,
          retailer: "coupang",
          destinationUrl: href,
        });
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasValidHref, href, resolvedImpressionTracking, tone]);

  if (!hasValidHref) {
    return (
      <span className={className} title={title} aria-label={accessibleLabel}>
        <span className="purchase-link__label purchase-link__label--desktop" aria-hidden="true">{label}</span>
        <span className="purchase-link__label purchase-link__label--mobile" aria-hidden="true">
          {mobileLabel ?? label}
        </span>
      </span>
    );
  }

  const handleClick = () => {
    if (tone === "coupang" && href && tracking) {
      affiliateClick({
        productId: tracking.productId,
        productName: tracking.productName,
        productBrand: tracking.productBrand,
        productCategory: tracking.productCategory,
        retailer: "coupang",
        destinationUrl: href,
        linkPosition: tracking.linkPosition,
        contentId: tracking.contentId,
        itemPosition: tracking.itemPosition,
      });
    }
    onClick?.();
  };

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel={tone === "coupang" ? "sponsored noopener noreferrer" : "noopener noreferrer"}
      className={className}
      onClick={handleClick}
      title={title}
      aria-label={accessibleLabel}
    >
      {tone === "coupang" && (
        <svg
          aria-hidden="true"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1 shrink-0"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )}
      <span className="purchase-link__label purchase-link__label--desktop" aria-hidden="true">{label}</span>
      <span className="purchase-link__label purchase-link__label--mobile" aria-hidden="true">
        {mobileLabel ?? label}
      </span>
    </a>
  );
}

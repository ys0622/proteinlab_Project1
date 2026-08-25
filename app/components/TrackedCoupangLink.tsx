"use client";

import type { ReactNode } from "react";
import { affiliateClick, type LinkPosition } from "@/lib/analytics";

type TrackedCoupangLinkProps = {
  href: string | null;
  productId?: string;
  productName?: string;
  productBrand?: string;
  productCategory?: string;
  linkPosition: LinkPosition;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export default function TrackedCoupangLink({
  href,
  productId,
  productName,
  productBrand,
  productCategory,
  linkPosition,
  className,
  children,
  "aria-label": ariaLabel,
}: TrackedCoupangLinkProps) {
  const safeHref = href && href !== "#" ? href : undefined;

  const handleClick = () => {
    if (!safeHref) return;
    affiliateClick({
      productId,
      productName,
      productBrand,
      productCategory,
      retailer: "coupang",
      destinationUrl: safeHref,
      linkPosition,
    });
  };

  if (!safeHref) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

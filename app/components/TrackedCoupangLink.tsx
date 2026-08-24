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
  const hasHref = Boolean(href && href !== "#");

  const handleClick = () => {
    if (!hasHref || !href) return;
    affiliateClick({
      productId,
      productName,
      productBrand,
      productCategory,
      retailer: "coupang",
      destinationUrl: href,
      linkPosition,
    });
  };

  if (!hasHref) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
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

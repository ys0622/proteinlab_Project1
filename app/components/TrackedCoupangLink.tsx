"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { affiliateClick, affiliateImpression, type LinkPosition } from "@/lib/analytics";

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
  const linkRef = useRef<HTMLAnchorElement>(null);
  const impressionSent = useRef(false);

  useEffect(() => {
    const element = linkRef.current;
    if (!element || !safeHref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || impressionSent.current) return;
        impressionSent.current = true;
        affiliateImpression({
          productId,
          productName,
          productBrand,
          productCategory,
          retailer: "coupang",
          destinationUrl: safeHref,
          linkPosition,
        });
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [safeHref, productId, productName, productBrand, productCategory, linkPosition]);

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
      ref={linkRef}
      href={safeHref}
      target="_blank"
      rel="sponsored noreferrer noopener"
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

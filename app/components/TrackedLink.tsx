"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { internalCtaClick, type LinkPosition } from "../../lib/analytics";

interface TrackedLinkProps {
  href: string;
  trackingLabel: string;
  trackingSection: string;
  trackingPageType: string;
  contentId?: string;
  productId?: string;
  linkPosition?: LinkPosition;
  ctaType?: "product_detail" | "all_products" | "compare" | "related_products" | "recommend" | "ranking";
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export default function TrackedLink({
  href,
  trackingLabel,
  trackingSection,
  trackingPageType,
  contentId,
  productId,
  linkPosition,
  ctaType,
  className,
  style,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        internalCtaClick({
          destinationUrl: href,
          contentId: contentId ?? `${ctaType ?? "internal"}:${trackingPageType}:${trackingSection}:${trackingLabel}`,
          linkPosition,
          productId,
        })
      }
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}

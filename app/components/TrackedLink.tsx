"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { internalLinkClick } from "../../lib/analytics";

interface TrackedLinkProps {
  href: string;
  trackingLabel: string;
  trackingSection: string;
  trackingPageType: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedLink({
  href,
  trackingLabel,
  trackingSection,
  trackingPageType,
  className,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        internalLinkClick({
          label: trackingLabel,
          destinationUrl: href,
          section: trackingSection,
          pageType: trackingPageType,
        })
      }
      className={className}
    >
      {children}
    </Link>
  );
}

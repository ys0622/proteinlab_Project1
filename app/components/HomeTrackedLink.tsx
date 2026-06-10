"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/gtag";
import type { ReactNode } from "react";

interface HomeTrackedLinkProps {
  href: string;
  eventName: string;
  eventParams?: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export default function HomeTrackedLink({
  href,
  eventName,
  eventParams,
  className,
  style,
  children,
}: HomeTrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      style={style}
      onClick={() => {
        trackEvent(eventName, eventParams ?? {});
      }}
    >
      {children}
    </Link>
  );
}

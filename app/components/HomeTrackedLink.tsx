"use client";

import type { ReactNode } from "react";
import TrackedLink from "./TrackedLink";

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
    <TrackedLink
      href={href}
      trackingLabel={eventName}
      trackingSection={eventParams?.category ?? "home"}
      trackingPageType="home"
      linkPosition="home_featured"
      className={className}
      style={style}
    >
      {children}
    </TrackedLink>
  );
}

"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { event, internalCtaClick } from "../../lib/analytics";

interface HomeGuideCardLinkProps {
  href: string;
  category: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function HomeGuideCardLink({ href, category, className, style, children }: HomeGuideCardLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const impressionSent = useRef(false);

  useEffect(() => {
    const element = linkRef.current;
    if (!element || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.intersectionRatio >= 0.5) || impressionSent.current) return;
      impressionSent.current = true;
      event("home_guide_impression", {
        content_id: href,
        guide_category: category,
        link_position: "home_featured",
        page_type: "home",
      });
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [href, category]);

  return (
    <Link
      ref={linkRef}
      href={href}
      className={className}
      style={style}
      onClick={() => {
        event("home_guide_click", {
          content_id: href,
          guide_category: category,
          link_position: "home_featured",
          page_type: "home",
        });
        internalCtaClick({ destinationUrl: href, contentId: href, linkPosition: "home_featured" });
      }}
    >
      {children}
    </Link>
  );
}

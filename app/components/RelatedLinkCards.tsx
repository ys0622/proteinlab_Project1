"use client";

import Link from "next/link";
import { trackNavigationClick } from "../../lib/gtag";
import type { TrafficLinkItem } from "../lib/trafficLinks";

interface RelatedLinkCardsProps {
  title: string;
  description?: string;
  links: TrafficLinkItem[];
  className?: string;
  sectionId?: string;
}

export default function RelatedLinkCards({
  title,
  description,
  links,
  className = "",
  sectionId,
}: RelatedLinkCardsProps) {
  if (links.length === 0) return null;

  return (
    <section className={`mt-8 ${className}`.trim()}>
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-bold text-[var(--foreground)]">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-[var(--foreground-muted)]">{description}</p>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() =>
              trackNavigationClick({
                section: sectionId ?? title,
                destination: link.href,
                label: link.title,
              })
            }
            className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 transition-colors hover:bg-[var(--accent-light)]"
          >
            <p className="text-sm font-semibold text-[var(--foreground)]">{link.title}</p>
            <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

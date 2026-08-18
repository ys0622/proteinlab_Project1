"use client";

type PurchaseLinkTone = "coupang" | "naver" | "official";
type PurchaseLinkSize = "sm" | "md";

type PurchaseLinkButtonProps = {
  href?: string | null;
  label: string;
  mobileLabel?: string;
  tone: PurchaseLinkTone;
  size: PurchaseLinkSize;
  onClick?: () => void;
  title?: string;
};

export default function PurchaseLinkButton({
  href,
  label,
  mobileLabel,
  tone,
  size,
  onClick,
  title,
}: PurchaseLinkButtonProps) {
  const hasValidHref = href && href !== "#" && href !== "";
  const accessibleLabel = label;
  const className = [
    "purchase-link",
    `purchase-link--${size}`,
    `purchase-link--${tone}`,
    hasValidHref ? "" : "purchase-link--disabled",
  ]
    .filter(Boolean)
    .join(" ");

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

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
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

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
      <span className={className} title={title}>
        <span className="purchase-link__label purchase-link__label--desktop">{label}</span>
        <span className="purchase-link__label purchase-link__label--mobile">
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
    >
      <span className="purchase-link__label purchase-link__label--desktop">{label}</span>
      <span className="purchase-link__label purchase-link__label--mobile">
        {mobileLabel ?? label}
      </span>
    </a>
  );
}

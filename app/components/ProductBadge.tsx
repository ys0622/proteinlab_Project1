"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, Ref } from "react";

type ProductBadgeTone = "grade-a" | "grade-b" | "grade-c" | "grade-d" | "neutral";

type ProductBadgeProps = {
  label: string;
  tone?: ProductBadgeTone;
  interactive?: boolean;
  className?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  spanProps?: HTMLAttributes<HTMLSpanElement>;
};

const BASE_CLASS_NAME =
  "product-ui-badge inline-flex items-center justify-center whitespace-nowrap border font-semibold tracking-[-0.01em]";

const TONE_CLASS_NAMES: Record<ProductBadgeTone, string> = {
  "grade-a": "product-ui-badge--grade-a",
  "grade-b": "product-ui-badge--grade-b",
  "grade-c": "product-ui-badge--grade-c",
  "grade-d": "product-ui-badge--grade-d",
  neutral: "product-ui-badge--neutral",
};

export function formatProductBadgeLabel(label: string): string {
  if (label.startsWith("밀도 ")) {
    return label.replace("밀도 ", "단백질 밀도 ");
  }

  return label;
}

export function getProductBadgeTone(label: string): ProductBadgeTone {
  const letter = label.split(" ").pop();

  if (letter === "A") return "grade-a";
  if (letter === "B") return "grade-b";
  if (letter === "C") return "grade-c";
  return "grade-d";
}

const ProductBadge = forwardRef<HTMLButtonElement, ProductBadgeProps>(function ProductBadge(
  {
    label,
    tone = "neutral",
    interactive = false,
    className,
    buttonRef,
    buttonProps,
    spanProps,
  },
  forwardedRef,
) {
  const resolvedRef = buttonRef ?? forwardedRef;
  const composedClassName = [BASE_CLASS_NAME, TONE_CLASS_NAMES[tone], className]
    .filter(Boolean)
    .join(" ");

  if (interactive) {
    return (
      <button
        ref={resolvedRef}
        type="button"
        className={composedClassName}
        {...buttonProps}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={composedClassName} {...spanProps}>
      {label}
    </span>
  );
});

export default ProductBadge;

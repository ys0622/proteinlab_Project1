"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProductDetailProps } from "../data/products";
import { getPopularProducts } from "../lib/productPopularity";

interface ProductTopFivePopoverProps {
  productType: "drink" | "bar" | "yogurt" | "shake";
  products: ProductDetailProps[];
}

export default function ProductTopFivePopover({
  productType,
  products,
}: ProductTopFivePopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelId = `${productType}-top5-panel`;

  const popularProducts = useMemo(
    () => getPopularProducts(products, productType, 5),
    [productType, products],
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const title =
    productType === "bar"
      ? "오늘 인기 단백질 바"
      : productType === "yogurt"
        ? "오늘 인기 단백질 요거트"
        : productType === "shake"
          ? "오늘 인기 단백질 쉐이크"
          : "오늘 인기 단백질 음료";

  return (
    <div ref={rootRef} className="relative ml-auto shrink-0">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--foreground-muted)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] sm:text-sm"
        style={{ fontWeight: 400, whiteSpace: "nowrap" }}
      >
        인기 TOP5
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={title}
          className="absolute right-0 top-full z-20 mt-2 w-[240px] rounded-xl border border-[var(--border)] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          <p className="text-sm font-semibold text-[var(--foreground)]">인기 {title}</p>

          <ol className="mt-2 space-y-1.5">
            {popularProducts.map((product, index) => (
              <li key={product.slug}>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                >
                  <span className="w-4 shrink-0 text-xs font-semibold text-[#8b8b8b]">
                    {index + 1}.
                  </span>
                  <span className="min-w-0 truncate">
                    {product.brand} {product.name}
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <p className="mt-2 px-2 text-[11px] text-[#8b8b8b]">최근 7일 조회 기준</p>
        </div>
      ) : null}
    </div>
  );
}

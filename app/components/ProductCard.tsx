"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "../lib/productImage";
import {
  getOfficialMallUrl,
  getNaverSearchUrl,
  getPreferredCoupangUrl,
} from "../lib/purchaseLinks";
import CompareButton from "./CompareButton";
import PurchaseLinkRow from "./PurchaseLinkRow";
import { trackPurchaseClick } from "@/lib/gtag";

export interface ProductCardProps {
  brand: string;
  name: string;
  capacity: string;
  variant?: string;
  tags: string[];
  proteinPerServing: number;
  calories?: number;
  sugar?: number;
  density: string;
  productUrl?: string;
  coupangUrl?: string;
  gradeTags?: string[];
  slug?: string;
  priority?: boolean;
}

export default function ProductCard({
  brand,
  name,
  capacity,
  variant = "일반",
  tags,
  proteinPerServing,
  calories,
  sugar,
  density,
  productUrl = "#",
  coupangUrl,
  gradeTags = [],
  slug,
  priority = false,
}: ProductCardProps) {
  const detailHref = slug ? `/product/${slug}` : productUrl;
  const imageUrl = slug ? getProductImageUrl(slug) : null;

  const coupangHref = getPreferredCoupangUrl(brand, name, coupangUrl ?? productUrl);
  const naverHref = getNaverSearchUrl(brand, name);
  const officialMallHref = getOfficialMallUrl(brand);
  const productId = slug ?? `${brand}-${name}`;

  const imageArea = (
    <div
      className="flex w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-xl transition-colors duration-200 group-hover:border-[#e2e2e2]"
      style={{
        borderRadius: "12px",
        padding: "10px",
        height: "200px",
        background: "#ffffff",
        border: "1px solid #eee",
      }}
    >
      {imageUrl ? (
        <div
          className="product-card__image relative h-full w-full"
          style={{ minHeight: "160px", maxWidth: "200px" }}
        >
          <Image
            src={imageUrl}
            alt={`${brand} ${name}`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
            unoptimized
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      ) : (
        <div className="h-[160px] w-full" style={{ maxWidth: "200px" }} />
      )}
    </div>
  );

  return (
    <article
      className="product-card group flex flex-col overflow-hidden rounded-2xl border bg-[#FFFDF8] transition-all duration-200 ease-out hover:border-[#ddd] active:shadow-sm"
      style={{
        borderRadius: "16px",
        padding: "14px",
        borderColor: "#e8e6e3",
      }}
    >
      {slug && detailHref.startsWith("/product/") ? (
        <Link
          href={detailHref}
          className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
          aria-label={`${brand} ${name} 상세 보기`}
        >
          {imageArea}
        </Link>
      ) : (
        imageArea
      )}

      <p className="mt-4 text-xs tracking-wide" style={{ color: "#7a7a7a" }}>
        {brand}
      </p>

      {(() => {
        const packageTag = tags.find((tag) => ["팩", "PET", "CAN"].includes(tag));
        const capacitySuffix = packageTag ? `, ${packageTag}` : "";

        return (
          <h3
            className="product-card__title mt-1 line-clamp-2 font-semibold leading-snug"
            style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a" }}
          >
            <span>{name}</span>
            <span className="font-normal" style={{ fontSize: "13px", color: "#6b6b6b" }}>
              {" "}
              {capacity}
              {capacitySuffix}
            </span>
          </h3>
        );
      })()}

      {(gradeTags.length > 0 || (variant && variant !== "일반")) && (() => {
        const order = ["단백질바", "바", "다이어트", "퍼포먼스"];
        const sorted = [...gradeTags].sort((a, b) => {
          const ai = order.findIndex((keyword) => a.startsWith(keyword));
          const bi = order.findIndex((keyword) => b.startsWith(keyword));
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });

        const gradeLetterStyle = (tag: string) => {
          const letter = tag.split(" ").pop();
          if (letter === "A") return { bg: "#E7F3EC", border: "#1B7F5B", color: "#1B7F5B" };
          if (letter === "B") return { bg: "#EAF2FF", border: "#4C7BD9", color: "#4C7BD9" };
          if (letter === "C") return { bg: "#FFF1E6", border: "#F08A24", color: "#F08A24" };
          return { bg: "#f3f3f3", border: "#bbb", color: "#999" };
        };

        const lactoFreeStyle = { bg: "#F5F0E8", border: "#D4D4D4", color: "#6B6B6B" };

        return (
          <div className="mt-1.5 flex flex-wrap gap-1.5" style={{ gap: "6px" }}>
            {sorted.map((tag) => {
              const style = gradeLetterStyle(tag);
              return (
                <span
                  key={tag}
                  className="inline-flex items-center justify-center rounded-full"
                  style={{
                    height: "26px",
                    padding: "0 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    background: style.bg,
                    border: `1px solid ${style.border}`,
                    color: style.color,
                  }}
                >
                  {tag}
                </span>
              );
            })}
            {variant && variant !== "일반" ? (
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  height: "26px",
                  padding: "0 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: lactoFreeStyle.bg,
                  border: `1px solid ${lactoFreeStyle.border}`,
                  color: lactoFreeStyle.color,
                }}
              >
                {variant}
              </span>
            ) : null}
          </div>
        );
      })()}

      <div className="mx-1 mt-3 border-t border-[#e8e6e3]" />

      <div className="mt-3 grid grid-cols-2 gap-2" style={{ gap: "8px" }}>
        {[
          { label: "단백질", value: `${proteinPerServing}g` },
          { label: "칼로리", value: calories != null ? `${calories}` : "—" },
          { label: "당류", value: sugar !== undefined ? `${sugar}g` : "—" },
          { label: "단백질밀도", value: density },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col justify-center rounded-lg border border-[#e8e8e8] bg-white px-2.5 py-2 text-left"
            style={{ borderRadius: "10px" }}
          >
            <span style={{ fontSize: "11px", color: "#6b6b6b" }}>{label}</span>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#3d3d3d" }}>{value}</span>
          </div>
        ))}
      </div>

      <div className="cta-group">
        <PurchaseLinkRow
          coupangHref={coupangHref}
          naverHref={naverHref}
          officialMallHref={officialMallHref}
          size="sm"
          onCoupangClick={() =>
            trackPurchaseClick({ productName: name, brand, store: "coupang", productId })
          }
          onNaverClick={() =>
            trackPurchaseClick({ productName: name, brand, store: "naver", productId })
          }
          onOfficialClick={() =>
            trackPurchaseClick({ productName: name, brand, store: "official", productId })
          }
        />
      </div>

      <div className="mx-1 mt-3 border-t border-[#e8e6e3]" />

      <div className="mt-3 flex gap-3" style={{ gap: "12px" }}>
        <Link
          href={detailHref}
          className="flex flex-1 items-center justify-center rounded-[10px] border border-[#e2e2e2] bg-white font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] active:scale-[0.98]"
          style={{ height: "40px", fontSize: "12px", borderRadius: "10px" }}
        >
          자세히
        </Link>
        {slug ? (
          <CompareButton slug={slug} detailHref={detailHref} />
        ) : (
          <button
            type="button"
            disabled
            className="flex flex-1 items-center justify-center rounded-[10px] border border-[#e2e2e2] bg-white font-medium text-[var(--foreground)] opacity-60"
            style={{ height: "40px", fontSize: "12px", borderRadius: "10px" }}
          >
            비교
          </button>
        )}
      </div>
    </article>
  );
}

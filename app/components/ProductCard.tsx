import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "../lib/productImage";
import { getCoupangSearchUrl, getNaverSearchUrl, getOfficialMallUrl } from "../lib/purchaseLinks";
import CompareButton from "./CompareButton";

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
  /** 쿠팡파트너스 링크 (있으면 사용, 없으면 검색 URL) */
  coupangUrl?: string;
  /** 등급/특성 태그 예: 밀도 A, 다이어트 B, 퍼포먼스 A */
  gradeTags?: string[];
  /** 상세 페이지 경로용 (있으면 /product/[slug]로 이동) */
  slug?: string;
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
}: ProductCardProps) {
  const detailHref = slug ? `/product/${slug}` : productUrl;
  const imageUrl = slug ? getProductImageUrl(slug) : null;

  const coupangHref = coupangUrl ?? getCoupangSearchUrl(brand, name);
  const naverHref = getNaverSearchUrl(brand, name);
  const officialMallHref = getOfficialMallUrl(brand);

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
        <div className="relative h-full w-full" style={{ minHeight: "160px", maxWidth: "200px" }}>
          <Image
            src={imageUrl}
            alt={`${brand} ${name}`}
            fill
            className="object-contain"
            sizes="200px"
            unoptimized
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
      {/* 이미지 영역: 클릭 시 상세 페이지로 */}
      {slug && detailHref.startsWith("/product/") ? (
        <Link href={detailHref} className="block focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 rounded-xl" aria-label={`${brand} ${name} 상세 보기`}>
          {imageArea}
        </Link>
      ) : (
        imageArea
      )}

      {/* 브랜드 */}
      <p className="mt-4 text-xs tracking-wide" style={{ color: "#7a7a7a" }}>
        {brand}
      </p>

      {/* 제품명 + 용량, 용기(팩/PET/CAN) */}
      {(() => {
        const packageTag = tags.find((t) => ["팩", "PET", "CAN"].includes(t));
        const capacitySuffix = packageTag ? `, ${packageTag}` : "";
        return (
          <h3 className="mt-1 line-clamp-2 font-semibold leading-snug" style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a" }}>
            <span>{name}</span>
            <span className="font-normal" style={{ fontSize: "13px", color: "#6b6b6b" }}> {capacity}{capacitySuffix}</span>
          </h3>
        );
      })()}

      {/* 등급 태그: 단백질 밀도 → 다이어트 → 퍼포먼스 순, 락토프리 뱃지 */}
      {(gradeTags.length > 0 || (variant && variant !== "일반")) && (() => {
        const order = ["단백질 밀도", "밀도", "다이어트", "퍼포먼스"];
        const sorted = [...gradeTags].sort((a, b) => {
          const ai = order.findIndex((k) => a.startsWith(k));
          const bi = order.findIndex((k) => b.startsWith(k));
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });
        const gradeLetterStyle = (tag: string) => {
          const letter = tag.split(" ").pop();
          if (letter === "A") return { bg: "#E7F3EC", border: "#1B7F5B", color: "#1B7F5B" };
          if (letter === "B") return { bg: "#EAF2FF", border: "#4C7BD9", color: "#4C7BD9" };
          if (letter === "C") return { bg: "#FFF1E6", border: "#F08A24", color: "#F08A24" };
          return { bg: "#f3f3f3", border: "#bbb", color: "#999" };
        };
        const displayLabel = (tag: string) => (tag.startsWith("밀도 ") ? `단백질 밀도 ${tag.slice(4)}` : tag);
        const lactoFreeStyle = { bg: "#F5F0E8", border: "#D4D4D4", color: "#6B6B6B" };
        return (
          <div className="mt-1.5 flex flex-wrap gap-1.5" style={{ gap: "6px" }}>
            {sorted.map((tag) => {
              const s = gradeLetterStyle(tag);
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
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    color: s.color,
                  }}
                >
                  {displayLabel(tag)}
                </span>
              );
            })}
            {variant && variant !== "일반" && (
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
            )}
          </div>
        );
      })()}

      {/* 구분선: 뱃지 ~ 성분 */}
      <div className="mx-1 mt-3 border-t border-[#e8e6e3]" />

      {/* 핵심 지표: 단백질, 칼로리, 당류, 단백질 밀도 (숫자 강조) */}
      <div className="mt-3 grid grid-cols-2 gap-2" style={{ gap: "8px" }}>
        {[
          { label: "단백질", value: `${proteinPerServing}g` },
          { label: "칼로리", value: calories != null ? `${calories}` : "—" },
          { label: "당류", value: sugar !== undefined ? `${sugar}g` : "—" },
          { label: "단백질 밀도", value: density },
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

      {/* 구분선: 성분 ~ 구매 링크 */}
      <div className="mx-1 mt-3 border-t border-[#e8e6e3]" />

      {/* 구매 링크 영역 */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="shrink-0 text-[11px] text-[#777]">구매 링크</span>
        <a
          href={coupangHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-7 items-center gap-1 rounded-full border border-[#e2e2e2] bg-white pl-2 pr-2.5 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          style={{ borderRadius: "999px" }}
        >
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-[#ff5722] text-white" aria-hidden>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22 22 0 01-3.95 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
          </span>
          쿠팡
        </a>
        <a
          href={naverHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-7 items-center gap-1 rounded-full border border-[#e2e2e2] bg-white pl-2 pr-2.5 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          style={{ borderRadius: "999px" }}
        >
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-[#03c75a] text-white" aria-hidden>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
          </span>
          네이버
        </a>
        {officialMallHref ? (
          <a
            href={officialMallHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 items-center gap-1 rounded-full border border-[#e2e2e2] bg-white pl-2 pr-2.5 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
            style={{ borderRadius: "999px" }}
          >
            <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-[#5c5c5c] text-white" aria-hidden>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            </span>
            공식몰
          </a>
        ) : (
          <span
            className="inline-flex h-7 cursor-not-allowed items-center gap-1 rounded-full border border-[#e8e8e8] bg-[#f9f9f9] pl-2 pr-2.5 text-[11px] font-normal"
            style={{ borderRadius: "999px", color: "#bbb", borderColor: "#e8e8e8" }}
            title="공식몰 정보 없음"
          >
            <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-[#ddd] text-white" aria-hidden>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            </span>
            공식몰
          </span>
        )}
      </div>

      {/* 구분선: 구매 링크 ~ 자세히 비교 */}
      <div className="mx-1 mt-3 border-t border-[#e8e6e3]" />

      {/* 자세히 / 비교 (버튼 높이 40px, border-radius 10px) */}
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

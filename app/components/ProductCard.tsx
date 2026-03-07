import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "../lib/productImage";
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
  gradeTags = [],
  slug,
}: ProductCardProps) {
  const volumeLabel = variant && variant !== "일반" ? `${capacity} · ${variant}` : capacity;
  const detailHref = slug ? `/product/${slug}` : productUrl;
  const imageUrl = slug ? getProductImageUrl(slug) : null;

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

      {/* 제품명 */}
      <h3 className="mt-1 line-clamp-2 font-semibold leading-snug" style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a" }}>
        {name}
      </h3>

      {/* 용량 · 특성 */}
      <p className="mt-1 text-[13px]" style={{ color: "#6b6b6b" }}>
        {volumeLabel}
      </p>

      {/* 제품 특징 태그: 팩, 밀크형, 락토프리 등 (최대 3개, 색상 구분) */}
      {tags.length > 0 && (() => {
        const tagStyle = (tag: string) => {
          if (tag === "팩") return { bg: "#E3F2FD", border: "#90CAF9", color: "#1565C0" };
          if (tag === "밀크형") return { bg: "#FFF8E1", border: "#FFE082", color: "#E65100" };
          if (tag === "락토프리") return { bg: "#E8F5E9", border: "#81C784", color: "#2E7D32" };
          if (tag === "워터형" || tag.includes("워터")) return { bg: "#E1F5FE", border: "#4FC3F7", color: "#0277BD" };
          if (tag === "PET") return { bg: "#F3E5F5", border: "#CE93D8", color: "#6A1B9A" };
          return { bg: "#EEEEEE", border: "#BDBDBD", color: "#424242" };
        };
        return (
          <div className="mt-2 flex flex-wrap gap-1.5" style={{ gap: "6px" }}>
            {tags.slice(0, 3).map((tag) => {
              const s = tagStyle(tag);
              return (
                <span
                  key={tag}
                  className="inline-flex items-center justify-center rounded-full font-medium"
                  style={{
                    height: "26px",
                    padding: "0 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    color: s.color,
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        );
      })()}

      {/* 등급 태그: 밀도 → 다이어트 → 퍼포먼스 순, 등급별 색상 (해석 보조 정보) */}
      {gradeTags.length > 0 && (() => {
        const order = ["밀도", "다이어트", "퍼포먼스"];
        const sorted = [...gradeTags].sort((a, b) => {
          const ai = order.findIndex((k) => a.startsWith(k));
          const bi = order.findIndex((k) => b.startsWith(k));
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });
        const gradeStyle = (tag: string) => {
          if (tag.startsWith("밀도")) return { bg: "#E7F3EC", border: "#1B7F5B", color: "#1B7F5B" };
          if (tag.startsWith("다이어트")) return { bg: "#EAF2FF", border: "#4C7BD9", color: "#4C7BD9" };
          if (tag.startsWith("퍼포먼스")) return { bg: "#FFF1E6", border: "#F08A24", color: "#F08A24" };
          return { bg: "#f3f3f3", border: "#ccc", color: "#555" };
        };
        return (
          <div className="mt-1.5 flex flex-wrap gap-1.5" style={{ gap: "6px" }}>
            {sorted.map((tag) => {
              const s = gradeStyle(tag);
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
                  {tag}
                </span>
              );
            })}
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

      {/* 구매 링크 영역 (버튼 높이 32px) */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-[#777]">구매 링크</span>
        <a
          href={detailHref}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#e2e2e2] bg-white pl-2.5 pr-3 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          style={{ borderRadius: "999px", height: "32px" }}
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#ff5722] text-white" aria-hidden>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
          </span>
          쿠팡
        </a>
        <a
          href={detailHref}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#e2e2e2] bg-white pl-2.5 pr-3 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          style={{ borderRadius: "999px", height: "32px" }}
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#03c75a] text-white" aria-hidden>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
          </span>
          네이버쇼핑
        </a>
        <a
          href={detailHref}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#e2e2e2] bg-white pl-2.5 pr-3 text-[11px] font-normal text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          style={{ borderRadius: "999px", height: "32px" }}
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#5c5c5c] text-white" aria-hidden>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </span>
          공식몰
        </a>
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

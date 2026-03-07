import Link from "next/link";

export interface ProductCardProps {
  brand: string;
  name: string;
  capacity: string;
  variant?: string;
  tags: string[];
  proteinPerServing: number;
  sugar?: number;
  density: string;
  productUrl?: string;
}

export default function ProductCard({
  brand,
  name,
  capacity,
  variant = "일반",
  tags,
  proteinPerServing,
  sugar,
  density,
  productUrl = "#",
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-card)] shadow-sm transition-shadow hover:shadow-md">
      {/* 썸네일 영역 */}
      <div className="flex h-36 items-center justify-center bg-[var(--beige-warm)]">
        <span className="text-3xl font-bold text-[var(--accent)] opacity-20">
          {brand.slice(0, 1)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-[var(--foreground)]">
          {name}
        </h3>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">
          {brand} {capacity} · {variant}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-xs font-medium text-[var(--accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-xl font-bold text-[var(--accent)]">
            {proteinPerServing}
          </span>
          <span className="text-xs text-[var(--foreground-muted)]">
            g 단백질
            {sugar !== undefined && ` · 당류 ${sugar}g`}
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">{density}</p>
        <Link
          href={productUrl}
          className="mt-3 block rounded-lg border border-[var(--border)] bg-[var(--background)] py-2 text-center text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
        >
          자세히
        </Link>
      </div>
    </article>
  );
}

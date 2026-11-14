import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "@/app/lib/productImage";

// 원료 질문 페이지(분리유청단백질·분리대두단백, 2026-11-14)의 제품 표. 제품을 나열하는 칸은 사진을 넣는다(Scott 11/2 원칙).
export type SourceRow = {
  slug: string;
  label: string;
  capacity?: string;
  servingSizeG: number;
  proteinPerServing: number;
  proteinPct: number;
  kcal: number;
  sugarText: string;
  source: string;
  rankText?: string;
};

const thClass = "px-3 py-3 font-semibold whitespace-nowrap";
const tdClass = "px-3 py-3 align-middle text-[var(--foreground-muted)]";

export default function SourceProductTable({ rows, highlight }: { rows: SourceRow[]; highlight?: RegExp }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
            {rows.some((r) => r.rankText) ? <th className={thClass}>순위</th> : null}
            <th className={thClass}>제품</th>
            <th className={thClass}>1회 제공량</th>
            <th className={thClass}>단백질</th>
            <th className={thClass}>함량</th>
            <th className={thClass}>열량</th>
            <th className={thClass}>당류</th>
            <th className={thClass}>단백질 원료(표시 순서)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => {
            const image = getProductImageUrl(d.slug);
            const parts = d.source.split("·");
            return (
              <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                {d.rankText ? <td className={tdClass}>{d.rankText}</td> : null}
                <td className={`${tdClass} min-w-[220px] font-semibold text-[var(--foreground)]`}>
                  <Link href={`/product/${d.slug}`} className="flex items-center gap-3 hover:text-[var(--accent)]">
                    <span className="flex h-14 w-12 shrink-0 items-center justify-center rounded-lg border border-[#edf1ee] bg-white">
                      {image ? <Image src={image} alt={d.label} width={48} height={56} className="h-full w-full object-contain p-1" /> : null}
                    </span>
                    <span>
                      {d.label}
                      {d.capacity ? <span className="ml-1 text-xs font-normal text-[var(--foreground-muted)]">{d.capacity}</span> : null}
                    </span>
                  </Link>
                </td>
                <td className={tdClass}>{d.servingSizeG}g</td>
                <td className={`${tdClass} font-semibold text-[var(--accent)]`}>{d.proteinPerServing}g</td>
                <td className={tdClass}>{d.proteinPct}%</td>
                <td className={tdClass}>{d.kcal}kcal</td>
                <td className={tdClass}>{d.sugarText}</td>
                <td className={`${tdClass} min-w-[200px] text-xs leading-5`}>
                  {parts.map((p, i) => (
                    <span key={`${p}-${i}`}>
                      {i > 0 ? " · " : ""}
                      <span className={highlight && highlight.test(p) ? "font-bold text-[var(--foreground)]" : undefined}>
                        {i + 1}. {p}
                      </span>
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

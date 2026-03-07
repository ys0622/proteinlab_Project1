"use client";

import type { NutritionDetailRow } from "../data/products";

interface NutritionDetailSectionProps {
  rows: NutritionDetailRow[];
  capacity?: string;
  /** 단백질바는 "1개", 음료는 "1병" */
  unit?: "병" | "개";
}

export default function NutritionDetailSection({ rows, capacity, unit = "병" }: NutritionDetailSectionProps) {
  const unitLabel = unit === "개" ? "1개" : "1병";
  return (
    <section className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] overflow-hidden" style={{ borderRadius: "12px" }}>
      <h2 className="p-4 pb-0 text-sm font-semibold text-[var(--foreground)]">영양성분 상세 ({unitLabel} 기준)</h2>
      <div className="border-t border-[#e8e6e3] px-4 pb-4 pt-2 mt-2">
        {capacity && (
          <p className="mb-3 text-xs text-[var(--foreground-muted)]">제공량: {unitLabel} ({capacity})</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] table-fixed text-sm border-collapse">
            <tbody>
              <tr>
                {rows.map(({ label }) => (
                  <td key={label} className="border border-[#e8e6e3] px-2 py-1.5 text-center font-medium text-[var(--foreground-muted)] bg-[#f8f6f2] w-[1%]">
                    {label}
                  </td>
                ))}
              </tr>
              <tr>
                {rows.map(({ label, value }) => (
                  <td key={label} className="border border-[#e8e6e3] px-2 py-1.5 text-center text-[var(--foreground)] bg-white w-[1%]">
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

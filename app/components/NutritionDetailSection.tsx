import type { NutritionDetailRow } from "../data/products";

interface NutritionDetailSectionProps {
  rows: NutritionDetailRow[];
  capacity?: string;
  unit?: "bottle" | "piece" | "cup" | "pack";
}

export default function NutritionDetailSection({
  rows,
  capacity,
  unit = "bottle",
}: NutritionDetailSectionProps) {
  const unitLabel =
    unit === "piece" ? "1개" : unit === "cup" ? "1컵" : unit === "pack" ? "1팩" : "1병";

  return (
    <section
      className="overflow-hidden rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8]"
      style={{ borderRadius: "16px" }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-sm font-semibold" style={{ color: "#3d3d3d" }}>
          영양성분 상세 ({unitLabel} 기준)
        </h2>
        {capacity ? (
          <span className="text-xs" style={{ color: "#999" }}>
            총 내용량 {capacity}
          </span>
        ) : null}
      </div>

      <div className="overflow-x-auto border-t border-[#e8e6e3]">
        <table className="w-full min-w-[400px] table-fixed border-collapse text-sm">
          <thead>
            <tr>
              {rows.map(({ label }) => (
                <th
                  key={label}
                  className="border-r border-[#f0eeeb] px-2 py-2 text-center font-medium last:border-r-0"
                  style={{ color: "#6b6b6b", background: "#f9f8f5", fontSize: "12px" }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {rows.map(({ label, value }) => (
                <td
                  key={label}
                  className="border-r border-[#f0eeeb] px-2 py-2.5 text-center last:border-r-0"
                  style={{ color: "#3d3d3d", fontWeight: 600, background: "#fff", fontSize: "13px" }}
                >
                  {value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

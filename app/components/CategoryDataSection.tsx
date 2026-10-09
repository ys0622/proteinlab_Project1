import Link from "next/link";
import { getAllProducts } from "@/app/data/products";
import type { ProductDetailProps } from "@/app/data/products";
import { formatProductLabel } from "@/app/lib/productLabel";
import { isComparableServing } from "@/app/lib/servingScope";

type Category = "drink" | "bar" | "yogurt" | "shake";
type Mode = "protein" | "lowSugar" | "lowCalorie" | "density";

const KIND_LABEL: Record<Category, string> = {
  drink: "단백질 음료",
  bar: "단백질 바",
  yogurt: "단백질 요거트",
  shake: "단백질 쉐이크",
};

const MODE_TITLE: Record<Mode, string> = {
  protein: "단백질 함량이 높은 제품",
  lowSugar: "단백질을 챙기면서 당류가 낮은 제품",
  lowCalorie: "단백질을 챙기면서 열량이 낮은 제품",
  density: "열량 대비 단백질이 높은 제품",
};

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function usable(p: ProductDetailProps) {
  return (
    num(p.proteinPerServing) !== null &&
    num(p.calories) !== null &&
    num(p.sugar) !== null &&
    (p.proteinPerServing ?? 0) > 0 &&
    (p.calories ?? 0) > 0 &&
    !p.needsServingCheck
  );
}

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** 가이드 하단에 붙이는 데이터 섹션. 제품 데이터에서 계산한 순위표와 분포만 보여준다. */
export default function CategoryDataSection({
  category,
  mode,
  brand,
  limit = 8,
}: {
  category: Category;
  mode: Mode;
  brand?: string;
  limit?: number;
}) {
  const pool = getAllProducts().filter((p) => (p.productType ?? "drink") === category && usable(p) && isComparableServing(p));
  if (pool.length < 5) return null;

  const kind = KIND_LABEL[category];
  const proteinMedian = median(pool.map((p) => p.proteinPerServing as number));
  const sugarLow = pool.filter((p) => (p.sugar ?? 0) <= 5).length;
  const per100 = (p: ProductDetailProps) => ((p.proteinPerServing ?? 0) / (p.calories ?? 1)) * 100;

  let scope = pool;
  let basis = "";
  if (brand) {
    scope = pool.filter((p) => p.brand === brand);
    if (scope.length === 0) return null;
  } else if (mode === "lowSugar" || mode === "lowCalorie") {
    scope = pool.filter((p) => (p.proteinPerServing ?? 0) >= proteinMedian);
    basis = `단백질이 중앙값(${proteinMedian}g) 이상인 ${scope.length}종 가운데 `;
  }

  const sorted = [...scope].sort((a, b) => {
    if (mode === "lowSugar") return (a.sugar ?? 0) - (b.sugar ?? 0) || (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (mode === "lowCalorie") return (a.calories ?? 0) - (b.calories ?? 0) || (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0);
    if (mode === "density") return per100(b) - per100(a);
    return (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0) || (a.calories ?? 0) - (b.calories ?? 0);
  });
  const rows = sorted.slice(0, limit);

  const rankOf = (p: ProductDetailProps) => pool.filter((q) => (q.proteinPerServing ?? 0) > (p.proteinPerServing ?? 0)).length + 1;
  const title = brand ? `${brand} ${kind} 수치 비교` : MODE_TITLE[mode];
  const intro = brand
    ? `ProteinLab에 등록된 ${brand} ${kind}는 ${scope.length}종이며, 같은 카테고리 ${pool.length}종 안에서의 단백질 순위를 함께 표시했습니다.`
    : `ProteinLab에 등록된 ${kind} ${pool.length}종 중 단백질 중앙값은 ${proteinMedian}g이고, 당류 5g 이하는 ${sugarLow}종입니다. ${basis}${
        mode === "protein"
          ? "단백질이 많은 순서입니다."
          : mode === "lowSugar"
            ? "당류가 낮은 순서입니다."
            : mode === "lowCalorie"
              ? "열량이 낮은 순서입니다."
              : "100kcal당 단백질이 많은 순서입니다."
      }`;

  return (
    <section className="mx-auto mb-8 max-w-[1200px] px-4 md:px-6">
      <div className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
        <p className="text-[12px] font-bold uppercase tracking-wider text-[#1F5A3D]">ProteinLab 데이터</p>
        <h2 className="mt-0.5 text-xl font-bold text-[var(--foreground)]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{intro}</p>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">{category === "yogurt"
            ? "개별 용량(250g·mL 이하) 제품만 비교하며, 대용량 통 제품은 용기 전체 수치라 제외했습니다. 제조사 표기를 그대로 옮긴 수치입니다."
            : "1회 제공량(1병·1개) 기준이며, 제조사 표기를 그대로 옮긴 수치입니다."}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#e8e6e3] text-xs text-[var(--foreground-muted)]">
                <th className="px-3 py-2 font-medium">제품</th>
                <th className="px-3 py-2 text-right font-medium">단백질</th>
                <th className="px-3 py-2 text-right font-medium">열량</th>
                <th className="px-3 py-2 text-right font-medium">당류</th>
                <th className="px-3 py-2 text-right font-medium">100kcal당 단백질</th>
                <th className="px-3 py-2 text-right font-medium">단백질 순위</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.slug} className="border-b border-[#f0eeeb] last:border-b-0">
                  <td className="px-3 py-2">
                    <Link href={`/product/${p.slug}`} className="font-medium text-[var(--foreground)] underline-offset-2 hover:underline">
                      {formatProductLabel(p.brand, p.name)}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-right font-bold text-[var(--accent)]">{p.proteinPerServing}g</td>
                  <td className="px-3 py-2 text-right text-[var(--foreground-muted)]">{p.calories}kcal</td>
                  <td className="px-3 py-2 text-right text-[var(--foreground-muted)]">{p.sugar}g</td>
                  <td className="px-3 py-2 text-right text-[var(--foreground-muted)]">{Math.round(per100(p) * 10) / 10}g</td>
                  <td className="px-3 py-2 text-right text-[var(--foreground-muted)]">
                    {rankOf(p)}위 / {pool.length}종
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm">
          <Link href={category === "drink" ? "/drinks" : category === "bar" ? "/bars" : category === "yogurt" ? "/yogurt" : "/shake"} className="font-semibold text-[#24543d] underline">
            {kind} 전체 {pool.length}종 비교하기 →
          </Link>
        </p>
      </div>
    </section>
  );
}

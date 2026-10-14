import Link from "next/link";
import { getAllProducts } from "@/app/data/products";
import { CATEGORY_META, ORDERED_CATEGORY_IDS } from "@/app/lib/categories";
import { isComparableServing } from "@/app/lib/servingScope";

// 영양성분 기준치(식품 표시용 1일 기준) — 제품 성분표의 "1일 영양성분 기준치에 대한 비율(%)"의 분모.
const DAILY_VALUE_G = 55;

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * 건강·섭취 가이드 공통 섹션. 공식 기준(2025 한국인 영양소 섭취기준의 단백질 에너지 적정비율, 영양성분 기준치)과
 * ProteinLab 제품 데이터(카테고리별 1회 제공량 단백질 중앙값)만 쓴다.
 */
export default function ProteinDailyContext() {
  const products = getAllProducts().filter((p) => isComparableServing(p) && !p.needsServingCheck && p.proteinPerServing > 0);
  const rows = ORDERED_CATEGORY_IDS.map((category) => {
    const list = products.filter((p) => (p.productType ?? "drink") === category);
    if (list.length < 5) return null;
    const med = median(list.map((p) => p.proteinPerServing));
    return { category, label: CATEGORY_META[category].label, href: CATEGORY_META[category].href, count: list.length, median: med, pct: Math.round((med / DAILY_VALUE_G) * 100) };
  }).filter((row): row is NonNullable<typeof row> => row != null);

  return (
    <section className="mx-auto mb-8 max-w-[1200px] px-4 md:px-6">
      <div className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5" style={{ wordBreak: "keep-all" }}>
        <p className="text-[12px] font-bold uppercase tracking-wider text-[#1F5A3D]">기준과 데이터</p>
        <h2 className="mt-0.5 text-xl font-bold text-[var(--foreground)]">하루 단백질, 제품으로 얼마나 채울 수 있을까</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-[var(--foreground-muted)]">
          <li>
            보건복지부 「2025 한국인 영양소 섭취기준」(2025년 12월 31일 공개)은 단백질 에너지 적정비율을 전체 열량의
            10~20%로 정했습니다(2020년 기준 7~20%에서 하한 상향). 하루 2,000kcal를 먹는다면 단백질 50~100g에 해당합니다.
          </li>
          <li>
            제품 성분표의 &quot;1일 영양성분 기준치에 대한 비율&quot;은 단백질 {DAILY_VALUE_G}g을 기준으로 계산합니다. 예를 들어
            단백질 12g이면 약 22%입니다.
          </li>
          <li>
            개인에게 필요한 양은 체중, 나이, 활동량에 따라 다르고, 신장 질환 등으로 섭취 제한이 필요한 경우 의사·영양사와 상의하세요.
          </li>
        </ul>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[290px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#e8e6e3] text-xs text-[var(--foreground-muted)]">
                <th className="px-2 py-2 md:px-3 font-medium">카테고리</th>
                <th className="px-2 py-2 md:px-3 font-medium">제품 수</th>
                <th className="px-2 py-2 md:px-3 font-medium">1개 단백질<br className="md:hidden" /> 중앙값</th>
                <th className="px-2 py-2 md:px-3 font-medium">기준치 {DAILY_VALUE_G}g<br className="md:hidden" /> 대비</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.category} className="border-b border-[#f0eeeb] last:border-b-0">
                  <td className="px-2 py-2 md:px-3 font-medium text-[var(--foreground)]">
                    <Link href={row.href} className="text-[var(--accent)] underline-offset-2 hover:underline">
                      {row.label}
                    </Link>
                  </td>
                  <td className="px-2 py-2 md:px-3 text-[var(--foreground-muted)]">{row.count}종</td>
                  <td className="px-2 py-2 md:px-3 text-[var(--foreground)]">{(Math.round(row.median * 10) / 10).toString()}g</td>
                  <td className="px-2 py-2 md:px-3 text-[var(--foreground)]">약 {row.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
          중앙값은 ProteinLab에 등록된 제품의 1회 제공량(1병·1개·1팩) 기준이며, 대용량 요거트처럼 1회분을 알 수 없는 제품은 뺐습니다.
          제품 하나로 하루 필요량을 채우기보다 식사와 나눠 보충하는 용도로 보는 편이 현실적입니다.
        </p>
      </div>
    </section>
  );
}

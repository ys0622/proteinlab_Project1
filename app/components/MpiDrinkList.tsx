import Link from "next/link";
import mpiDrinks from "../data/mpiDrinks.json";

type Group = {
  brand: string;
  line: string;
  items: { slug: string; flavor: string }[];
  makers: string[];
  reportDate: string;
};

// 식약처 품목제조보고(원재료)에서 분리유단백(분리우유단백, MPI)이 확인된 음료. 신고 기준이라 포장 표시와 다를 수 있다.
export default function MpiDrinkList() {
  const groups = (mpiDrinks.groups as Group[]).filter((group) => group.items.length > 0);
  if (groups.length === 0) return null;
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section className="rounded-2xl border border-[#e2ebe4] bg-white px-5 py-5" aria-labelledby="mpi-drinks-title">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#1F5A3D]">ProteinLab 조사</p>
      <h2 id="mpi-drinks-title" className="mt-0.5 text-xl font-bold text-[var(--foreground)]">
        원재료에 MPI(분리유단백)가 표기된 단백질 음료
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
        {mpiDrinks.source}에서 제조원이 신고한 원재료명에 &quot;분리유단백&quot;(분리우유단백, MPI)이 적힌 ProteinLab 등록 음료 {total}종을
        제품군별로 모았습니다. {mpiDrinks.checkedAt} 기준으로 확인했습니다.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e8e6e3] text-xs text-[var(--foreground-muted)]">
              <th className="px-3 py-2 font-medium">제품군</th>
              <th className="px-3 py-2 font-medium">확인된 맛</th>
              <th className="px-3 py-2 font-medium">제조원(신고)</th>
              <th className="px-3 py-2 font-medium">최근 신고일</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={`${group.brand}-${group.line}`} className="border-b border-[#f0eeeb] align-top last:border-b-0">
                <td className="px-3 py-2 font-medium text-[var(--foreground)]">
                  {group.line.startsWith(group.brand) ? group.line : `${group.brand} ${group.line}`}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/product/${item.slug}`}
                        className="text-[var(--accent)] underline-offset-2 hover:underline"
                      >
                        {item.flavor || "기본"}
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2 text-[var(--foreground-muted)]">{group.makers.join(", ")}</td>
                <td className="px-3 py-2 text-[var(--foreground-muted)]">{group.reportDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-[var(--foreground-muted)]">
        <li>제조원이 식약처에 신고한 원재료 기준이라, 현재 판매 중인 포장과 다를 수 있습니다. 구매 전 제품 뒷면의 원재료명을 확인하세요.</li>
        <li>표에 없는 제품은 &quot;MPI가 없다&quot;는 뜻이 아니라, 신고 정보에서 같은 이름으로 확인하지 못했거나 MPI 표기가 아니었다는 뜻입니다.</li>
        <li>같은 제품을 여러 공장이 만드는 경우 공장별 원재료가 다를 수 있어, 공장별로 달랐던 제품은 이 표에서 뺐습니다.</li>
        <li>MPI는 유당이 완전히 없는 원료가 아닙니다. 유당에 민감하다면 완제품의 영양·원재료 표시를 함께 확인하세요.</li>
      </ul>
    </section>
  );
}

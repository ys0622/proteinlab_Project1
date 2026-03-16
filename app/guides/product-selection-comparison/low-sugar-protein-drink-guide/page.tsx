import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "저당 단백질 음료 추천 기준 | 당류 낮은 RTD 비교 | ProteinLab",
  description:
    "저당 단백질 음료를 고를 때 당류 컷, 단백질 함량, 칼로리, 단백질 밀도를 어떤 순서로 확인해야 하는지 정리합니다.",
};

const standards = [
  {
    title: "당류 컷을 먼저 정하기",
    body: "저당 단백질 음료를 찾는다면 가장 먼저 당류 기준선을 정해야 합니다. 단백질이 높아도 당류가 높으면 검토 목적과 멀어집니다.",
  },
  {
    title: "그다음은 단백질",
    body: "당류가 낮은 후보 안에서도 단백질이 충분한지 봐야 실제 보충용으로 쓸 수 있습니다.",
  },
  {
    title: "마지막은 칼로리와 밀도",
    body: "비슷한 저당 제품끼리 칼로리와 단백질 밀도를 비교해야 가볍게 마실지, 이동 중 보충용인지 구분할 수 있습니다.",
  },
];

const filterRows = [
  ["당류 2g 이하", "가장 엄격한 저당 기준", "워터형 단백질 RTD에서 자주 보이는 구간"],
  ["당류 5g 이하", "일반적인 저당 비교 기준", "발효유형 RTD까지 포함해 비교 폭이 넓어집니다."],
  ["단백질 20g+", "기본 보충용 기준", "저당이면서도 보충용으로 볼 만한지 판단하기 좋습니다."],
  ["단백질 밀도", "최종 비교용", "같은 칼로리 안에서 어떤 제품이 더 효율적인지 가려줍니다."],
];

const chartItems = [
  { label: "워터형", width: "78%", note: "저당 후보 비중이 높은 편" },
  { label: "발효유형", width: "54%", note: "포만감은 좋지만 당류 확인이 중요" },
  { label: "고단백 RTD", width: "61%", note: "제품별 당류와 칼로리 차이가 큼" },
];

export default function LowSugarProteinDrinkGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>저당 단백질 음료 추천 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            저당 단백질 음료는 당류 컷부터 정해야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            저당 단백질 음료는 단순히 단백질만 높은 제품이 아닙니다. 당류 기준 안에서 비교가
            가능한 제품군을 먼저 정한 뒤 읽어야 합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">저당 음료를 보는 순서</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {standards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4"
                >
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">빠른 필터 기준</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">기준</th>
                    <th className="px-3 py-3 font-semibold">의미</th>
                    <th className="px-3 py-3 font-semibold">메모</th>
                  </tr>
                </thead>
                <tbody>
                  {filterRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">
                        {row[0]}
                      </td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">유형별 저당 후보감</h2>
            <div className="mt-5 space-y-4">
              {chartItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-[#24543d]">{item.label}</span>
                    <span className="text-[var(--foreground-muted)]">{item.note}</span>
                  </div>
                  <div className="mt-2 h-2.5 rounded-full bg-[#e7efe9]">
                    <div
                      className="h-2.5 rounded-full bg-[#2d6a4f]"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

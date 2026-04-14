import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "무가당 그릭요거트 추천 기준 | 당류·단백질 밀도 비교",
  description:
    "무가당 그릭요거트를 고를 때 당류, 단백질 밀도, 칼로리, 총용량 기준을 어떻게 함께 읽어야 하는지 정리합니다.",
};

const rules = [
  {
    title: "무가당 여부 먼저 확인",
    body: "플레인처럼 보여도 실제로는 저당 제품인 경우가 있어 당류 표기와 제품명을 함께 확인해야 합니다.",
  },
  {
    title: "그릭은 밀도가 핵심",
    body: "무가당 그릭요거트는 단백질 g보다 100g당 단백질 밀도를 먼저 봐야 진짜 고단백 제품을 가리기 쉽습니다.",
  },
  {
    title: "총용량과 1회 기준 병행",
    body: "450g, 800g 제품은 총단백질만 커 보일 수 있어 1회 섭취 기준과 100g 기준을 함께 읽어야 착시가 줄어듭니다.",
  },
];

const compareRows = [
  ["당류", "0~5g 구간 우선", "무가당 여부를 판단하는 출발점"],
  ["단백질 밀도", "100g당 수치 비교", "그릭 제품군 안에서 가장 유용한 기준"],
  ["칼로리", "밀도와 함께 보기", "밀도는 높아도 총열량이 과한 제품은 따로 분리"],
  ["용량", "100g 기준 병행", "대용량 착시를 줄이기 위한 포인트"],
];

export default function UnsweetenedGreekYogurtGuidePage() {
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
            <span>무가당 그릭요거트 추천 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            무가당 그릭요거트는 당류와 단백질 밀도를 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            무가당 그릭요거트는 플레인 대용량 제품과 섞여 있어 제품명만으로는 비교가 어렵습니다.
            당류, 100g당 단백질 밀도, 칼로리, 용량을 함께 읽는 흐름을 정리합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">무가당 그릭요거트 기준 3가지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {rules.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">비교 체크표</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">기준</th>
                    <th className="px-3 py-3 font-semibold">메모</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

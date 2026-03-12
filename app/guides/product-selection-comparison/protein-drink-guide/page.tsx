import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 음료 선택 가이드 | ProteinLab",
  description:
    "단백질 음료를 고를 때 단백질 함량, 당류, 칼로리, 단백질 밀도를 어떤 순서로 봐야 하는지 정리합니다.",
};

const checklist = [
  ["단백질 함량", "한 병당 20g 전후인지 먼저 확인"],
  ["당류", "간식형인지 회복용인지에 따라 허용 범위 구분"],
  ["칼로리", "식사 보완용인지 가벼운 보충용인지 판단"],
  ["단백질 밀도", "열량 대비 단백질 효율이 좋은지 확인"],
];

const drinkTypes = [
  {
    title: "밀크형 RTD",
    body: "포만감이 높고 식사 보완 용도로 쓰기 좋지만, 당류와 칼로리는 함께 확인해야 합니다.",
  },
  {
    title: "워터형 RTD",
    body: "운동 후 가볍게 마시기 좋고, 당류와 칼로리가 비교적 낮은 제품이 많습니다.",
  },
  {
    title: "고단백 보강형",
    body: "40g 전후 제품은 회복과 단백질 보충에 유리하지만 용도에 비해 과하지 않은지 봐야 합니다.",
  },
];

export default function ProteinDrinkGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 · 비교</Link>
            <span>/</span>
            <span>단백질 음료 선택 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료는 숫자를 보는 순서가 중요합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 단백질 음료라도 용도에 따라 봐야 할 숫자가 다릅니다.
            <br />
            단백질 함량, 당류, 칼로리, 단백질 밀도를 어떤 순서로 읽어야 하는지 먼저 정리해두면 비교가 훨씬 빨라집니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 봐야 하는 4가지</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">체크 포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {checklist.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">음료 유형별로 보는 법</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {drinkTypes.map((item) => (
                <article key={item.title} className="rounded-xl border border-[#e8eef3] bg-[#f9fbfd] p-4">
                  <h3 className="text-sm font-semibold text-[#3f556d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <blockquote className="rounded-xl border border-[#eef1f3] bg-[#fbfcfd] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              제품 비교에서 중요한 것은 숫자 하나가 아니라 조합입니다. 단백질 함량이 높아도 당류와 칼로리가 함께 높다면 용도가 달라질 수 있습니다.
            </blockquote>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/guides/product-selection-comparison/nutrition-comparison" className="inline-flex items-center justify-center rounded-lg border border-[#d8e2eb] px-5 py-3 text-sm font-semibold text-[#3f556d] transition-colors hover:bg-[#eef4f9]">
                영양성분 비교 읽는 법 →
              </Link>
              <Link href="/" className="inline-flex items-center justify-center rounded-lg border border-[#4a6178] bg-[#4a6178] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3c5065]">
                단백질 음료 비교하기 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}


import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "봄 야외활동 단백질 간식 가이드 | 피크닉·등산·러닝 간식 기준 | ProteinLab",
  description:
    "봄철 피크닉, 가벼운 등산, 야외활동에서 챙기기 좋은 단백질 간식 기준을 휴대성, 당류, 포만감 중심으로 정리합니다.",
};

const activityCards = [
  {
    title: "휴대성 우선",
    body: "봄철 야외활동은 상온 보관과 휴대성이 중요합니다. 그래서 바, RTD, 드링킹 요거트처럼 바로 먹을 수 있는 형태가 유리합니다.",
  },
  {
    title: "당류는 과하지 않게",
    body: "야외활동 간식은 달콤한 제품으로 기울기 쉽습니다. 단백질 간식이라도 당류가 과한지 꼭 확인해야 합니다.",
  },
  {
    title: "포만감은 목적에 맞게",
    body: "가벼운 산책용인지 반나절 활동용인지에 따라 필요한 포만감이 다릅니다. 간식형과 식사보완형을 구분해야 합니다.",
  },
];

const itemRows = [
  ["가벼운 피크닉", "드링킹 요거트 / RTD", "휴대성과 가벼운 포만감"],
  ["반나절 외출", "단백질 바", "상온 휴대와 포만감"],
  ["러닝/등산 후", "RTD + 이후 식사", "즉시 회복과 다음 끼니 연결"],
];

export default function SpringOutdoorProteinSnackGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle">운동 · 라이프스타일</Link>
            <span>/</span>
            <span>봄 야외활동 단백질 간식 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">
              TRACK D
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            봄 야외활동에는
            <br />
            휴대성과 가벼운 포만감이 중요합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            피크닉, 가벼운 등산, 야외 러닝처럼 봄철 활동이 늘어날수록 단백질 간식은 휴대성과 부담 없는 구성이 중요해집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">야외활동 간식 기준 3가지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {activityCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#eaded7] bg-white p-4 shadow-[0_12px_30px_rgba(111,61,38,0.06)]">
                  <p className="text-sm font-semibold text-[#6b3f28]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">활동별 제품 기준</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 후보</th>
                    <th className="px-3 py-3 font-semibold">포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {itemRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
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

import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "봄 러닝 시작 단백질 가이드 | 입문 러너 회복 전략",
  description:
    "봄에 러닝을 다시 시작하는 사람에게 필요한 단백질 기준, 회복 타이밍, 가벼운 제품 선택 포인트를 정리한 입문 가이드입니다.",
};

const restartCards = [
  {
    title: "운동량보다 회복 루틴",
    body: "봄 러닝은 거리보다 회복 루틴을 먼저 만드는 편이 좋습니다. 운동 후 단백질과 다음 식사 연결이 핵심입니다.",
  },
  {
    title: "가벼운 제품 선택",
    body: "러닝 재개 초반에는 속이 부담되지 않는 유제품, RTD, 가벼운 그릭요거트형 제품이 더 잘 맞는 경우가 많습니다.",
  },
  {
    title: "주간 총량 유지",
    body: "운동 직후만 챙기기보다 주간 기준으로 단백질 총량을 일정하게 맞추는 편이 회복과 적응에 더 유리합니다.",
  },
];

const timingRows = [
  ["운동 직후", "20~30g", "가벼운 회복 시작"],
  ["다음 식사", "탄수화물 + 단백질", "회복과 다음 운동 준비"],
  ["운동 없는 날", "총량 유지", "주간 루틴 안정화"],
];

export default function SpringRunningStartGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동·라이프스타일</Link>
            <span>/</span>
            <span>봄 러닝 시작 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            봄에 러닝을 다시 시작한다면
            <br />
            회복 루틴부터 다시 잡아야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            겨울 뒤에 러닝을 다시 시작하는 사람이 많아지는 시기입니다.
            <br />
            거리보다 먼저 운동 후 단백질, 다음 식사, 주간 총량을 연결하는 회복 루틴을 만드는 것이 중요합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">봄 러닝 입문자가 먼저 볼 기준</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {restartCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#eaded7] bg-white p-4 shadow-[0_12px_30px_rgba(111,61,38,0.06)]">
                  <p className="text-sm font-semibold text-[#6b3f28]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">러닝 재개 타이밍 체크표</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">구간</th>
                    <th className="px-3 py-3 font-semibold">권장량</th>
                    <th className="px-3 py-3 font-semibold">목적</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/guides/intake-strategy-health/post-workout-protein" className="rounded-full border border-[#eaded7] bg-white px-3 py-1 text-xs font-semibold text-[#8a4b2f]">관련: 운동 후 단백질</Link>
              <Link href="/guides/fitness-lifestyle/running-protein-guide" className="rounded-full border border-[#eaded7] bg-white px-3 py-1 text-xs font-semibold text-[#8a4b2f]">관련: 러닝 단백질 가이드</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

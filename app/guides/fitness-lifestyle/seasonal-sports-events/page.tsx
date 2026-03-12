import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "시즌 스포츠 이벤트 | Track D 초안 | ProteinLab",
  description:
    "마라톤 시즌, 러닝 이벤트, 행사성 운동 전후 영양 포인트를 정리할 Track D 초안 페이지입니다.",
};

const seasonRows = [
  ["러닝 시즌 오픈", "훈련량 점검 + 수분·탄수화물 적응"],
  ["대회 직전 주간", "카보 로딩, 휴식, 소화 쉬운 식사"],
  ["이벤트 직후", "탄수화물+단백질 회복식, 수분·전해질 보충"],
];

export default function SeasonalSportsEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동 · 라이프스타일</Link>
            <span>/</span>
            <span>시즌 스포츠 이벤트</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">시즌 스포츠 이벤트 영양 가이드</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            이 페이지는 초안입니다.
            <br />
            러닝 시즌과 이벤트 전후의 식사, 회복, 제품 준비 흐름을 정리하는 방향으로 확장합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">초안 시즌 흐름</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">시점</th>
                    <th className="px-3 py-3 font-semibold">중점</th>
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/fitness-lifestyle/marathon-protein-guide" className="inline-flex items-center justify-center rounded-xl border border-[#eaded7] bg-white px-5 py-3 text-sm font-semibold text-[#6b3f28] transition-colors hover:bg-[#fcf1ea]">마라톤 전략 보기</Link>
              <Link href="/official-events" className="inline-flex items-center justify-center rounded-xl border border-[#8a4b2f] bg-[#8a4b2f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6f3d26]">공식 이벤트 보기</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

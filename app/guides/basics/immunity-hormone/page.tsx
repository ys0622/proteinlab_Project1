import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";

export const metadata = {
  title: "단백질과 면역·호르몬 | 항체·효소·인슐린까지 | ProteinLab",
  description:
    "단백질이 근육뿐 아니라 항체, 호르몬, 효소 합성에 어떻게 관여하는지 면역과 대사 관점에서 정리합니다.",
};

const functionRows = [
  ["단백질성 호르몬", "인슐린, 성장호르몬 일부", "혈당 조절, 성장, 에너지 대사 조절"],
  ["소화 효소", "펩신, 아밀레이스, 리파아제", "음식물 분해와 흡수"],
  ["면역 단백질", "항체, 사이토카인", "병원체 방어와 면역 신호 전달"],
];

const focusPoints = [
  {
    title: "항체와 사이토카인",
    body: "면역 반응을 움직이는 직접 재료가 단백질입니다. 부족하면 방어와 회복 속도가 동시에 떨어질 수 있습니다.",
  },
  {
    title: "호르몬의 구조",
    body: "인슐린과 여러 성장 관련 호르몬은 단백질 구조를 기반으로 작동합니다. 대사 조절에도 단백질이 중요합니다.",
  },
  {
    title: "효소의 역할",
    body: "소화 효소 역시 단백질입니다. 섭취가 부족하면 소화와 흡수 효율에도 간접적 영향을 줄 수 있습니다.",
  },
];

function InsightChip({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]">
      <p className="text-sm font-semibold text-[#24543d]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-4 rounded-2xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

export default function ImmunityHormonePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/basics" className="hover:text-[var(--accent)]">
              단백질 기초
            </Link>
            <span>/</span>
            <span>면역·호르몬과 단백질</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK A</span>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">단백질이 면역과 호르몬에 미치는 영향</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              단백질은 근육만을 위한 영양소가 아닙니다.
              <br />
              항체, 사이토카인, 인슐린, 소화 효소까지 몸의 조절 시스템 전반에 관여합니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">핵심 포인트</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">면역과 대사에 단백질이 중요한 이유</h2>
              </div>
              <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">면역·호르몬 가이드</span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {focusPoints.map((point) => (
                <InsightChip key={point.title} title={point.title} body={point.body} />
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">항체와 면역세포의 재료</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              항체와 사이토카인처럼 병원체를 인식하고 면역 반응을 조절하는 물질은 단백질 기반입니다. 단백질이 부족하면 면역세포 증식과 회복 속도도 영향을 받을 수 있습니다.
            </p>

            <div className="mt-5 rounded-[28px] border border-[#dce8df] bg-[linear-gradient(135deg,#f7fbf8_0%,#eef6f1_100%)] p-6 shadow-[0_16px_36px_rgba(45,106,79,0.08)]">
              <div className="mx-auto max-w-2xl">
                <GuideVisual track="protein-basics" title="항체·면역" accentColor="#2d6a4f" accentBg="#eaf4ee" variant="topic" />
              </div>
            </div>

            <Callout>
              단백질 결핍이 심해지면 면역세포 수와 항체 생성이 줄고, 감염 이후 회복이 늦어질 수 있습니다.
            </Callout>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">호르몬과 효소도 단백질이다</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              인슐린, 성장호르몬 일부, 각종 소화 효소는 모두 단백질 구조를 기반으로 작동합니다. 그래서 단백질 부족은 근육을 넘어 전신 조절에도 영향을 줍니다.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">종류</th>
                    <th className="px-3 py-3 font-semibold">대표 예시</th>
                    <th className="px-3 py-3 font-semibold">주요 기능</th>
                  </tr>
                </thead>
                <tbody>
                  {functionRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
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

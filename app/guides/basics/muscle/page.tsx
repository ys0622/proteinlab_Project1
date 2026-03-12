import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";

export const metadata = {
  title: "근육 성장에 단백질이 필요한 진짜 이유 | ProteinLab",
  description:
    "근단백질 합성(MPS), 섭취 타이밍, 하루 권장량까지. 운동과 단백질의 관계를 데이터 기준으로 정리했습니다.",
};

const timingRows = [
  ["운동 후 30~45분", "20~40g", "근손실 방지와 회복 자극"],
  ["취침 전", "20~30g", "야간 근합성 유지에 도움"],
  ["일반 식사", "20~30g씩 분산", "하루 총량을 고르게 채우기"],
];

const intakeRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["중등도 운동", "1.2~1.6 g/kg", "72~96g", "84~112g", "96~128g"],
  ["고강도 운동·근성장", "1.6~2.0 g/kg", "96~120g", "112~140g", "128~160g"],
];

const keyPoints = [
  {
    title: "근단백질 합성",
    body: "운동 후 아미노산이 공급되면 근섬유 합성이 활성화되고 손상된 조직 회복이 빨라집니다.",
  },
  {
    title: "운동 후 20~40g",
    body: "단백질을 너무 적게 먹으면 자극이 약하고, 지나치게 많이 먹어도 추가 효과는 제한적입니다.",
  },
  {
    title: "하루 총량과 분산",
    body: "한 번에 몰아서 먹기보다 하루 3~4회로 나눠 섭취하는 편이 회복과 유지에 더 유리합니다.",
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

export default function MuscleGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
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
            <span>근육과 단백질</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
                근육 성장에 단백질이 필요한 진짜 이유
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
                운동만으로는 근육이 자라지 않습니다.
                <br />
                단백질이 있어야 손상된 근섬유가 회복되고, 다음 훈련을 버틸 수 있는 몸이 만들어집니다.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#dce8df] bg-[linear-gradient(135deg,#f7fbf8_0%,#eef6f1_100%)] p-4 shadow-[0_18px_40px_rgba(45,106,79,0.08)]">
              <GuideVisual
                track="protein-basics"
                title="근육과 단백질"
                accentColor="#2d6a4f"
                accentBg="#eaf4ee"
                variant="topic"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">핵심 포인트</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">운동 후 회복을 이해하는 3가지 기준</h2>
              </div>
              <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">
                운동 후 회복 가이드
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {keyPoints.map((point) => (
                <InsightChip key={point.title} title={point.title} body={point.body} />
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">근단백질 합성(MPS)이란?</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              운동 후 단백질이 아미노산으로 분해되면, 류신 같은 필수아미노산이 근육 내 신호 경로를 자극합니다.
              이 과정이 근섬유 단백질 합성을 촉진해 회복과 성장을 돕습니다.
            </p>

            <div className="mt-5 rounded-[28px] border border-[#dce8df] bg-[linear-gradient(135deg,#f7fbf8_0%,#eef6f1_100%)] p-4 shadow-[0_16px_36px_rgba(45,106,79,0.08)]">
              <GuideVisual
                track="protein-basics"
                title="MPS"
                accentColor="#2d6a4f"
                accentBg="#eaf4ee"
                variant="topic"
              />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InsightChip title="류신과 필수아미노산" body="류신은 근육 합성 스위치를 켜는 대표 아미노산입니다." />
                <InsightChip title="자극 후 바로 회복" body="운동 후 단백질 공급이 늦어질수록 회복 체감이 떨어질 수 있습니다." />
              </div>
            </div>

            <Callout>
              단백질 20~40g 섭취 시 근합성 자극이 크게 올라가며, 그 이상에서는 추가 효과가 완만해집니다.
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: ISSN Position Stand (2007)</p>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">언제 먹어야 효과적일까?</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              운동 직후, 취침 전, 일반 식사로 나누어 단백질을 배치하면 하루 총량을 더 안정적으로 채울 수 있습니다.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">섭취 타이밍</th>
                    <th className="px-3 py-3 font-semibold">권장량</th>
                    <th className="px-3 py-3 font-semibold">기대 효과</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
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

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: ISSN Position Stand</p>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 권장 섭취량</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              운동 강도와 체중에 따라 권장량은 달라집니다. 체중 기준으로 계산하면 필요한 총량을 더 쉽게 가늠할 수 있습니다.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">활동 수준</th>
                    <th className="px-3 py-3 font-semibold">권장량</th>
                    <th className="px-3 py-3 font-semibold">60kg</th>
                    <th className="px-3 py-3 font-semibold">70kg</th>
                    <th className="px-3 py-3 font-semibold">80kg</th>
                  </tr>
                </thead>
                <tbody>
                  {intakeRows.map((row) => (
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

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: WHO·한국영양학회(2015), ISSN Position Stand</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/guides/how-to-choose/checklist"
                className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                단백질 음료 고르는 법 보기
              </Link>
              <Link
                href="/picks/high-protein-20"
                className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                고단백 20g+ 제품 바로 보기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

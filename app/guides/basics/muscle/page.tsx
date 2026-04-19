import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "근육 성장에 단백질이 필요한 이유";
const _pageDesc = "근단백질 합성, 운동 후 회복, 하루 권장량까지. 근육과 단백질의 관계를 기초 기준으로 정리합니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/basics/muscle" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/basics/muscle",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const timingRows = [
  ["운동 후 30~45분", "20~40g", "근육 회복과 합성 신호 자극"],
  ["취침 전", "20~30g", "야간 근육 유지와 포만감 보완"],
  ["일반 식사", "20~30g씩 분산", "하루 총량을 고르게 채우기"],
];

const intakeRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["중강도 이상 운동", "1.2~1.6 g/kg", "72~96g", "84~112g", "96~128g"],
  ["고강도 운동·근육 증가", "1.6~2.0 g/kg", "96~120g", "112~140g", "128~160g"],
];

const keyPoints = [
  {
    title: "근단백질 합성의 출발점",
    body: "운동 후 단백질이 아미노산으로 분해되면 류신 같은 필수 아미노산이 근육 합성 신호를 자극합니다.",
  },
  {
    title: "운동 후 20~40g이 실전적인 이유",
    body: "너무 적으면 회복 자극이 약하고, 과도하게 많아도 추가 효율은 제한적일 수 있습니다. 20~40g 범위가 가장 실전적입니다.",
  },
  {
    title: "하루 총량과 분산 섭취",
    body: "한 번에 몰아 먹기보다 하루 3~4회로 나눠 먹는 편이 근육 유지와 회복 흐름에 더 유리합니다.",
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
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/basics/muscle' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
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

          <div className="mt-4">
            <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
              근육 성장에 단백질이 필요한 진짜 이유
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              운동만으로는 근육이 그대로 커지지 않습니다.
              <br />
              단백질이 있어야 손상된 근섬유를 회복하고 다음 적응을 위한 재료를 공급할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">핵심 사인</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">운동 후 회복을 결정하는 3가지 기준</h2>
              </div>
              <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">
                운동 회복 가이드
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
              운동 후 단백질이 아미노산으로 분해되면 류신 같은 필수 아미노산이 근육 합성 신호를 자극합니다.
              이 과정을 근단백질 합성(MPS)이라고 부릅니다.
            </p>

            <div className="mt-5 rounded-[28px] border border-[#dce8df] bg-[linear-gradient(135deg,#f7fbf8_0%,#eef6f1_100%)] p-6 shadow-[0_16px_36px_rgba(45,106,79,0.08)]">
              <div className="mx-auto max-w-2xl">
                <GuideVisual
                  track="protein-basics"
                  title="MPS"
                  accentColor="#2d6a4f"
                  accentBg="#eaf4ee"
                  variant="topic"
                />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InsightChip
                  title="류신과 필수 아미노산"
                  body="류신은 근육 합성 스위치를 켜는 대표 아미노산입니다. 단백질의 질이 중요한 이유도 여기에 있습니다."
                />
                <InsightChip
                  title="운동 직후 회복 구간"
                  body="운동 후 단백질을 보충하면 체감 회복과 다음 훈련 준비가 더 안정적으로 이어질 수 있습니다."
                />
              </div>
            </div>

            <Callout>
              단백질 20~40g 전후면 근단백질 합성 자극이 충분한 경우가 많습니다. 그 이상은 추가 효율이
              제한적일 수 있어 총량과 분산 섭취가 더 중요합니다.
            </Callout>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">언제 먹어야 효과적일까?</h2>
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

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 권장 섭취량</h2>
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

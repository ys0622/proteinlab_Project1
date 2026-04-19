import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "러너를 위한 단백질 가이드 | 필요량·타이밍·종류",
  description:
    "러닝·마라톤 훈련 중 단백질 필요량, 섭취 타이밍, 단백질 종류별 활용법을 과학적 근거로 정리했습니다.",
};

const intakeRows = [
  ["일반 훈련", "1.6 g/kg", "96g", "112g", "128g"],
  ["고강도 훈련", "1.8~2.0 g/kg", "108~120g", "126~140g", "144~160g"],
  ["일반 성인(비교)", "0.8 g/kg", "48g", "56g", "64g"],
];

const timingRows = [
  ["운동 후 30~45분 이내", "20~30g", "근손실 방지·회복 극대화 (골든 타임)"],
  ["취침 전", "20~30g", "야간 근합성 촉진"],
  ["하루 4회 균등 분배", "총량 ÷ 4", "근합성률 극대화"],
];

const proteinTypeRows = [
  ["유청(Whey) / 분리유청(WPI)", "빠름", "운동 직후", "류신 함량 높아 근합성 효과 뛰어남"],
  ["카제인", "느림", "취침 전·식사 간 간식", "포만감 지속, 야간 회복 적합"],
  ["식물성 (대두·완두)", "중간", "평시·식사 대용", "비건·유제품 민감자 적합"],
];

function ImageSlot({ alt }: { alt: string }) {
  return (
    <div
      className="mt-4 rounded-2xl border border-dashed border-[#d9d4cd] bg-white px-5 py-8 text-center"
      role="img"
      aria-label={alt}
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">IMAGE SLOT</p>
      <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{alt}</p>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

export default function RunningBasicsPage() {
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
            <Link href="/guides/running" className="hover:text-[var(--accent)]">
              💪 운동 &amp; 라이프스타일
            </Link>
            <span>/</span>
            <span>러닝 &amp; 마라톤</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK D
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            러너를 위한 단백질 가이드
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            러닝은 근육을 소모하는 운동입니다. 단백질을 얼마나, 언제, 어떤 종류로 먹느냐에 따라
            회복 속도와 훈련 효과가 달라집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">러너의 하루 단백질 권장량</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              장거리 러닝 훈련 중 권장 단백질 섭취량은 체중 1kg당 1.6~2.0g/day로, 일반 성인
              (0.8g/kg)의 약 2배 수준입니다. 고강도 훈련기나 탄수화물 제한 시에는 2.0g/kg 이상이
              필요할 수 있습니다.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">훈련 강도</th>
                    <th className="px-3 py-3 font-semibold">권장량 (g/kg/day)</th>
                    <th className="px-3 py-3 font-semibold">60kg 기준</th>
                    <th className="px-3 py-3 font-semibold">70kg 기준</th>
                    <th className="px-3 py-3 font-semibold">80kg 기준</th>
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

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: Witard et al., Sports Med (2025) / ISSN Position Stand (2007)
            </p>

            <Callout>
              한 끼 목표: 체중(kg) × 0.4~0.5g
              <br />
              예) 체중 70kg → 한 끼 28~35g
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: Moore et al., Sports Science Exchange (2021)
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">언제 먹어야 효과적일까?</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">섭취 타이밍</th>
                    <th className="px-3 py-3 font-semibold">권장량</th>
                    <th className="px-3 py-3 font-semibold">추천 이유</th>
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

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: ACSM &quot;Nutrition and Athletic Performance&quot; (2009)
            </p>

            <ImageSlot alt="러너의 하루 단백질 섭취 타이밍 | 아침/운동 후/저녁/취침 전" />
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">어떤 단백질을 골라야 할까?</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">종류</th>
                    <th className="px-3 py-3 font-semibold">흡수 속도</th>
                    <th className="px-3 py-3 font-semibold">추천 타이밍</th>
                    <th className="px-3 py-3 font-semibold">특징</th>
                  </tr>
                </thead>
                <tbody>
                  {proteinTypeRows.map((row) => (
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

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: ISSN Position Stand (2007)
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/running/race-week"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                레이스 주간 영양 전략 보기
              </Link>
              <Link
                href="/picks/high-protein-20"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                러너 추천 제품 보기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

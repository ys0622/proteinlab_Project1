import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";

export const metadata = {
  title: "단백질이 부족하면 몸에 어떤 신호가 올까? | ProteinLab",
  description:
    "근육 감소, 피로, 면역 저하, 부종까지. 단백질 결핍 시 자주 나타나는 신호를 데이터 기준으로 정리했습니다.",
};

const summaryRows = [
  ["근육 감소·무력감", "근섬유 합성 감소와 분해 증가"],
  ["피로·집중력 저하", "에너지 대사와 신경전달물질 합성 저하"],
  ["상처 회복 지연", "콜라겐과 조직 재생 속도 저하"],
  ["면역력 저하", "항체와 면역세포 생성 감소"],
  ["모발·손톱 변화", "케라틴 공급 부족"],
  ["부종", "알부민 감소로 삼투압 저하"],
];

const riskRows = [
  ["다이어트·식이조절 중", "칼로리 제한으로 단백질 총량 부족", "식사마다 단백질 식품 우선 섭취"],
  ["고령층", "흡수율과 식욕 저하, 근감소 위험", "체중당 1.2g/kg 이상 검토"],
  ["채식·비건 식단", "필수아미노산 섭취 불균형 가능", "다양한 식물성 단백질 조합"],
  ["불규칙한 식사", "단백질 공급 중단과 끼니 편중", "하루 3회 이상 분산 섭취"],
];

const warningPoints = [
  {
    title: "근육과 체력 저하",
    body: "예전보다 계단이 힘들고 쉽게 지친다면, 총 단백질 섭취량부터 먼저 점검할 필요가 있습니다.",
  },
  {
    title: "회복 속도 둔화",
    body: "상처 회복이나 운동 후 회복이 늦다면 조직 재생 재료가 부족한 상황일 수 있습니다.",
  },
  {
    title: "면역과 부종 신호",
    body: "자주 붓거나 감염에 취약해졌다면 알부민과 면역단백질 부족 가능성을 함께 봐야 합니다.",
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

export default function DeficiencySymptomsPage() {
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
            <span>단백질 부족 신호</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
                단백질이 부족하면 몸에 어떤 신호가 올까?
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
                피로, 근육 감소, 잦은 감기, 붓기.
                <br />
                단백질 부족은 천천히 나타나기 때문에 자주 반복되는 작은 신호를 먼저 읽는 것이 중요합니다.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#dce8df] bg-[linear-gradient(135deg,#f7fbf8_0%,#eef6f1_100%)] p-4 shadow-[0_18px_40px_rgba(45,106,79,0.08)]">
              <GuideVisual
                track="protein-basics"
                title="부족 신호"
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
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">체크 포인트</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">단백질 부족에서 자주 보이는 신호</h2>
              </div>
              <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">
                결핍 신호 가이드
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {warningPoints.map((point) => (
                <InsightChip key={point.title} title={point.title} body={point.body} />
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 결핍의 주요 증상 6가지</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              근육 감소부터 면역 저하, 부종까지 결핍 신호는 여러 기관에서 동시에 나타날 수 있습니다.
            </p>

            <div className="mt-5 rounded-[28px] border border-[#dce8df] bg-[linear-gradient(135deg,#f7fbf8_0%,#eef6f1_100%)] p-4 shadow-[0_16px_36px_rgba(45,106,79,0.08)]">
              <GuideVisual
                track="protein-basics"
                title="결핍 신호"
                accentColor="#2d6a4f"
                accentBg="#eaf4ee"
                variant="topic"
              />
            </div>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">증상</th>
                    <th className="px-3 py-3 font-semibold">원인</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">나는 단백질이 부족할까?</h2>
            <Callout>
              하루 단백질 섭취량이 체중(kg) × 0.8g 이하라면 결핍 위험 구간으로 볼 수 있습니다.
            </Callout>

            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              식단에서 육류, 생선, 달걀, 두부, 유제품이 부족하거나 칼로리를 과도하게 제한하는 경우 결핍이 쉽게 발생합니다.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">위험군</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                    <th className="px-3 py-3 font-semibold">대응 포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {riskRows.map((row) => (
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

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2015)
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/guides/basics/daily-requirement"
                className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                내 하루 단백질 권장량 계산하기
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                단백질 음료로 보충하기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

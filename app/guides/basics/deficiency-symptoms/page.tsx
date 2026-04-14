import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

export const metadata = {
  title: "단백질이 부족하면 몸에 어떤 신호가 올까",
  description:
    "근력 감소, 피로, 면역 저하, 상처 회복 지연까지. 단백질 결핍 때 자주 보이는 신호를 정리합니다.",
};

const summaryRows = [
  ["근력 감소·무력감", "근단백질 합성 저하와 분해 증가"],
  ["피로·집중력 저하", "에너지 대사와 신호 전달 구성 영향"],
  ["상처 회복 지연", "콜라겐과 조직 재생 속도 저하"],
  ["면역 저하", "항체와 면역세포 생성 감소"],
  ["부종", "알부민 감소로 체액 조절 불안정"],
  ["모발·손톱 약화", "케라틴 합성 재료 부족"],
];

const riskRows = [
  ["다이어트·식사 조절 중", "칼로리 제한으로 단백질 총량이 부족해지기 쉬움", "끼니마다 단백질 식품을 우선 배치"],
  ["고령층", "흡수 효율과 합성 반응 저하로 결핍 위험이 높음", "체중당 1.2g/kg 이상 목표 확인"],
  ["채식·비건 식단", "필수 아미노산 균형이 무너지기 쉬움", "콩류와 곡류를 함께 구성"],
  ["불규칙한 식사", "공급 간격이 길어 총 섭취량이 줄기 쉬움", "하루 3회 이상 분산 섭취"],
];

const warningPoints = [
  {
    title: "근력과 체력 저하",
    body: "예전보다 계단이 힘들고 자주 지친다면 하루 단백질 총량부터 먼저 확인할 필요가 있습니다.",
  },
  {
    title: "회복 속도 저하",
    body: "운동 후 근육통이나 상처 회복이 오래 간다면 조직 재생 재료가 부족한 상태일 수 있습니다.",
  },
  {
    title: "면역과 컨디션 저하",
    body: "감기, 피로, 붓기가 반복된다면 단백질과 전체 식사 구성을 같이 점검해야 합니다.",
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
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/basics/deficiency-symptoms' });
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
            <span>단백질 부족 신호</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
              단백질이 부족하면 몸에 어떤 신호가 올까?
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
              피로, 근력 감소, 잦은 감기, 붓기.
              <br />
              단백질 부족은 갑자기 심해지기보다 작은 신호가 반복되는 형태로 먼저 드러나는 경우가 많습니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">체크 사인</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">단백질 부족 때 자주 보이는 신호</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">대표 증상 6가지</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              근력 감소부터 면역 저하, 상처 회복 지연까지 결핍 신호는 여러 기관에서 동시에 나타날 수 있습니다.
            </p>

            <div className="mt-5 rounded-[28px] border border-[#dce8df] bg-[linear-gradient(135deg,#f7fbf8_0%,#eef6f1_100%)] p-6 shadow-[0_16px_36px_rgba(45,106,79,0.08)]">
              <div className="mx-auto max-w-2xl">
                <GuideVisual
                  track="protein-basics"
                  title="결핍 신호"
                  accentColor="#2d6a4f"
                  accentBg="#eaf4ee"
                  variant="topic"
                />
              </div>
            </div>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">증상</th>
                    <th className="px-3 py-3 font-semibold">배경</th>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">누가 단백질이 부족해지기 쉬울까?</h2>
            <Callout>
              하루 단백질 섭취량이 체중(kg) x 0.8g 이하로 오래 유지되면 결핍 위험 구간으로 볼 수 있습니다.
            </Callout>

            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              식단에서 육류, 생선, 달걀, 유제품, 콩류가 줄어들거나 칼로리 제한이 강해지면 결핍 위험은 커집니다.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">위험군</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                    <th className="px-3 py-3 font-semibold">먼저 체크할 것</th>
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

            <div className="mt-5">
              <Link
                href="/guides/basics/daily-requirement"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                내 권장량 먼저 계산하기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

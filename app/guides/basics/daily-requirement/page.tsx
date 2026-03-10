import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "하루 단백질 권장량 | 목적·체중·연령별 완전 정리 | ProteinLab",
  description:
    "일반 성인부터 운동인·고령자까지, 목적별 하루 단백질 권장량과 섭취 원칙을 데이터 기반으로 정리했습니다.",
};

const requirementRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["체중 조절·일상", "1.0~1.2 g/kg", "60~72g", "70~84g", "80~96g"],
  ["운동·근성장", "1.2~1.7 g/kg", "72~102g", "84~119g", "96~136g"],
  ["고령자 (60세 이상)", "1.2 g/kg 이상", "72g 이상", "84g 이상", "96g 이상"],
];

const principleCards = [
  {
    icon: "📌",
    title: "하루 3끼에 나눠서",
    body: "한 끼 40g 이상을 넘으면 추가 효과는 크지 않습니다. 15~30g씩 균등하게 분배하세요.",
  },
  {
    icon: "📌",
    title: "완전 단백질을 선택",
    body: "필수 아미노산이 모두 포함된 유청·육류·달걀·두부 등을 우선합니다.",
  },
  {
    icon: "📌",
    title: "2g/kg 이상은 신중하게",
    body: "과도한 단백질은 신장 부담과 체지방 증가로 이어질 수 있습니다.",
  },
];

const faqs = [
  {
    question: "단백질 부족 시 어떤 징후를 먼저 확인해야 하나요?",
    answer:
      "근육 약화, 피로, 잦은 감기, 탈모, 부종이 대표 증상입니다. 특히 이유 없이 피로가 심해진다면 단백질 섭취를 점검해보세요.",
    linkLabel: "단백질 부족 증상 자세히 보기",
    href: "/guides/basics/deficiency-symptoms",
  },
  {
    question: "운동을 많이 안 해도 단백질을 많이 먹어야 하나요?",
    answer:
      "운동을 하지 않으면 0.8g/kg(RDA)으로 충분합니다. 다만 중장년층은 근감소증 예방을 위해 1.0~1.2g/kg 섭취를 권장합니다.",
  },
  {
    question: "단백질 과잉 섭취는 문제가 없나요?",
    answer:
      "일반 식사로는 과잉 섭취가 어렵지만, 보충제 과용 시 신장 부담과 체지방 증가가 우려됩니다. 2g/kg 이상은 신중하게 접근하세요.",
  },
  {
    question: "단백질이 부족할 때 가장 빠르게 보완하는 방법은?",
    answer:
      "생선·달걀·콩·유제품 등 고단백 식품을 매 끼니에 포함하세요. 부족할 경우 단백질 음료로 간편하게 보충할 수 있습니다.",
  },
];

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

export default function DailyRequirementPage() {
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
              🧬 단백질 기초
            </Link>
            <span>/</span>
            <span>하루 단백질 권장량</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            나는 단백질이 얼마나 필요할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 권장량은 체중, 나이, 활동 수준에 따라 달라집니다. 내 상황에 맞는 하루 목표량을
            확인해보세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">목적별 하루 단백질 권장량</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">목적</th>
                    <th className="px-3 py-3 font-semibold">권장량 (g/kg 체중)</th>
                    <th className="px-3 py-3 font-semibold">60kg 기준</th>
                    <th className="px-3 py-3 font-semibold">70kg 기준</th>
                    <th className="px-3 py-3 font-semibold">80kg 기준</th>
                  </tr>
                </thead>
                <tbody>
                  {requirementRows.map((row) => (
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
              출처: WHO / 한국영양학회·보건복지부 「한국인 영양소 섭취기준」(2015) / 대한노인의학회
            </p>

            <Callout>
              단백질은 한 끼에 몰아서 먹기보다 아침·점심·저녁 15~30g씩 나눠 섭취하는 것이 효과적입니다.
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 한국영양학회(2015)</p>

            <div className="mt-5">
              <Link
                href="/tools/calculator"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                단백질 계산기로 직접 계산해보기
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 섭취 3가지 원칙</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {principleCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#e8e6e3] bg-white px-4 py-4">
                  <p className="text-lg">{card.icon}</p>
                  <h3 className="mt-3 text-base font-semibold text-[var(--foreground)]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: WHO</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>

            <div className="mt-5 space-y-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-[#e8e6e3] bg-white px-4 py-4">
                  <h3 className="text-base font-semibold text-[var(--foreground)]">Q. {faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {faq.answer}</p>
                  {faq.href ? (
                    <div className="mt-3">
                      <Link href={faq.href} className="text-sm font-semibold text-[var(--accent)] hover:underline">
                        {faq.linkLabel}
                      </Link>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/basics/deficiency-symptoms"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                단백질 부족 증상 확인하기
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                내 목적에 맞는 제품 찾기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

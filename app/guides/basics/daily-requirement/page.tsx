import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import TrackedLink from "@/app/components/TrackedLink";

export const metadata = {
  title: "하루 단백질 권장량 | 목적·체중·연령별 정리",
  description:
    "일반 성인부터 운동 중인 사람, 고령층까지 하루 단백질 권장량과 분산 섭취 원칙을 정리합니다.",
};

const requirementRows = [
  ["일반 성인", "0.8 g/kg", "48g", "56g", "64g"],
  ["체중 관리·가벼운 운동", "1.0~1.2 g/kg", "60~72g", "70~84g", "80~96g"],
  ["운동·근력 증가", "1.2~1.7 g/kg", "72~102g", "84~119g", "96~136g"],
  ["고령층", "1.2 g/kg 이상", "72g 이상", "84g 이상", "96g 이상"],
];

const principleCards = [
  {
    icon: "1",
    title: "하루 3회 이상 나눠 먹기",
    body: "한 번에 몰아 먹기보다 한 끼마다 15~30g 전후로 나눠 먹는 편이 실제 생활에서 적용하기 쉽습니다.",
  },
  {
    icon: "2",
    title: "완전 단백질을 우선 선택",
    body: "계란, 유제품, 육류, 생선, 두부처럼 필수 아미노산 구성이 좋은 식품을 기본으로 두는 편이 안정적입니다.",
  },
  {
    icon: "3",
    title: "고강도 운동이 아니라면 과잉은 피하기",
    body: "운동 강도가 높지 않다면 지나치게 높은 섭취는 효율이 떨어질 수 있습니다. 목적에 맞는 적정량이 중요합니다.",
  },
];

const faqs = [
  {
    question: "단백질 부족은 어떤 신호로 먼저 드러날까?",
    answer:
      "근력 저하, 피로, 회복 지연 같은 신호가 반복된다면 하루 단백질 총량부터 먼저 확인할 필요가 있습니다.",
    linkLabel: "단백질 부족 증상 자세히 보기",
    href: "/guides/basics/deficiency-symptoms",
  },
  {
    question: "운동을 많이 하지 않아도 단백질을 신경 써야 할까?",
    answer:
      "그렇습니다. 활동량이 적어도 기본 권장량은 필요합니다. 체중 조절, 고령, 회복기라면 일반 권장량보다 조금 높은 섭취가 필요한 경우도 있습니다.",
  },
  {
    question: "단백질을 많이 먹으면 무조건 좋을까?",
    answer:
      "그렇지 않습니다. 총량보다 중요한 건 체중과 목표에 맞는 적정량을 꾸준히 채우는 것입니다. 과도한 보충은 실전 효율이 떨어질 수 있습니다.",
  },
  {
    question: "식사만으로 부족하면 어떻게 보완할까?",
    answer:
      "계란, 유제품, 두부, 그릭요거트 같은 식품으로 먼저 보완하고, 식사 구성이 어렵거나 일정이 빡빡할 때만 단백질 음료나 바를 보조적으로 더하는 편이 자연스럽습니다.",
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
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
            단백질 권장량은 체중, 연령, 활동량, 목표에 따라 달라집니다. 먼저 내 상황에 맞는 하루
            목표치를 잡는 것이 출발점입니다.
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
                    <th className="px-3 py-3 font-semibold">권장량(g/kg)</th>
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
              출처: WHO / 대한영양사협회 / 보건복지부 식품구성자전거 / 대한노년학회
            </p>

            <Callout>
              단백질은 하루 한 번에 몰아 먹기보다 아침, 점심, 저녁, 간식처럼 나눠서 섭취하는 편이
              실제 식사 구조에 더 잘 맞습니다.
            </Callout>

            <div className="mt-5 rounded-2xl border border-[#d7e6da] bg-[#f5fbf6] px-4 py-4">
              <p className="text-sm font-semibold text-[#24543d]">체중 기준으로 내 목표량을 바로 계산해보려면</p>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                표로 대략 감을 잡은 뒤에는 계산기에서 체중과 활동량을 넣어 개인 기준치를 바로 확인하는 편이
                더 정확합니다.
              </p>
              <TrackedLink
                href="/guides/tools#daily-protein-calculator"
                trackingLabel="하루 단백질 계산기"
                trackingSection="daily_requirement_calculator_cta"
                trackingPageType="guide"
                className="mt-3 inline-flex items-center rounded-xl bg-[#24543d] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1d4532]"
              >
                하루 단백질 계산기 열기
              </TrackedLink>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 섭취 3가지 원칙</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {principleCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#e8e6e3] bg-white px-4 py-4">
                  <p className="text-lg font-semibold text-[#24543d]">{card.icon}</p>
                  <h3 className="mt-3 text-base font-semibold text-[var(--foreground)]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

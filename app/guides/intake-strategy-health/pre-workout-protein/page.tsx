import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "운동 전 단백질 가이드 | 먹어야 할 때와 굳이 안 먹어도 될 때";
const _pageDesc = "운동 전에 단백질을 꼭 먹어야 하는지, 식사 간격과 소화 부담, 운동 강도에 따라 어떻게 판단하면 되는지 실전 기준으로 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/pre-workout-protein" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/pre-workout-protein",
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

const beforeWorkoutRows = [
  ["직전에 식사를 한 경우", "추가 보충보다 식사 상태 확인", "운동 2~3시간 안에 식사를 했다면 운동 전 단백질을 억지로 더 챙길 필요는 없는 경우가 많습니다."],
  ["공복 운동", "가벼운 보충 가능", "공복이 길다면 RTD나 소화가 편한 형태로 가볍게 보충하는 쪽이 부담이 덜합니다."],
  ["고강도 운동 일정", "단백질보다 에너지 우선", "운동 전에는 단백질 자체보다 탄수화물과 전체 에너지 상태가 더 중요한 경우가 많습니다."],
];

const quickRules = [
  {
    title: "먼저 최근 식사 간격 보기",
    body: "마지막 식사와 운동 사이가 짧다면 굳이 별도 보충을 하지 않아도 됩니다. 운동 전 보충은 공복이 길거나 식사량이 부족할 때 의미가 큽니다.",
  },
  {
    title: "소화가 편한 제품부터 고르기",
    body: "운동 직전에는 무거운 식감보다 RTD나 가벼운 쉐이크가 더 잘 맞는 경우가 많습니다. 위에 오래 남는 제품은 피하는 편이 낫습니다.",
  },
  {
    title: "운동 강도와 목적을 같이 보기",
    body: "가벼운 유산소와 근력 운동은 기준이 다릅니다. 운동 전은 단백질 숫자보다 컨디션 유지가 더 중요할 때가 많습니다.",
  },
];

const avoidList = [
  "직전 식사를 했는데도 불안해서 운동 전에 또 마시는 경우",
  "운동 전 보충을 무조건 필수처럼 생각하는 경우",
  "속이 불편한 제품을 반복해서 고르는 경우",
];

const relatedGuides = [
  {
    href: "/guides/intake-strategy-health/post-workout-protein",
    title: "운동 후 단백질 가이드",
    body: "운동 전보다 운동 후 보충이 더 중요한지 함께 판단하고 싶다면 이 페이지가 바로 이어집니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-timing",
    title: "단백질 섭취 타이밍",
    body: "운동 전후뿐 아니라 하루 전체 루틴 안에서 단백질을 어떻게 나눠 먹는지 같이 보면 판단이 더 쉬워집니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "단백질 음료 입문 가이드",
    body: "운동 전에도 부담이 적은 제품을 고르고 싶다면 입문자용 선택 기준부터 같이 보는 편이 좋습니다.",
  },
];

export default function PreWorkoutProteinPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/intake-strategy-health/pre-workout-protein' });
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
              Guides
            </Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">
              섭취 전략·건강
            </Link>
            <span>/</span>
            <span>운동 전 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 전 단백질은
            <br />
            무조건이 아니라 상황 판단이 먼저입니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동 전에 단백질을 챙길지보다 식사 간격, 소화 부담, 운동 강도를 먼저 보는 편이 더 실전적입니다.
            숫자보다 컨디션과 루틴이 먼저 맞아야 오래 갑니다.
          </p>
        </div>
      </section>

      <main className="guide-article-page guide-article-page--track-c mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">운동 전 판단 기준</h2>
          <div className="mt-4 rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">PRE-WORKOUT CHECK</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              최근 식사 여부, 공복 시간, 운동 강도를 순서대로 확인하면 운동 전 보충이 필요한지 훨씬 빠르게 판단할 수 있습니다.
            </p>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">상황</th>
                  <th className="px-3 py-3 font-semibold">추천</th>
                  <th className="px-3 py-3 font-semibold">이유</th>
                </tr>
              </thead>
              <tbody>
                {beforeWorkoutRows.map((row) => (
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
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {quickRules.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">운동 전 자주 하는 실수</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            {avoidList.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">PRE-WORKOUT NOTE</p>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            운동 전 단백질은 필수 항목이 아니라 선택지입니다. 이미 식사를 했거나 위장 부담이 크다면 굳이 추가하지 않는 편이 더 나을 수 있습니다.
            운동 전 보충은 불안해서 챙기는 습관보다 실제 컨디션을 기준으로 판단하는 쪽이 오래 갑니다.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h2 className="text-xl font-bold text-[var(--foreground)]">관련 가이드</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {relatedGuides.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white"
              >
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

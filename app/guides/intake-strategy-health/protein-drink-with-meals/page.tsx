import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 음료와 식사 같이 먹어도 될까 | 채소·탄수화물 조합";
const pageDescription =
  "단백질 음료를 식사와 같이 먹을 때 채소·탄수화물·지방·식이섬유를 어떻게 조합할지, 아침·간식·운동 후 상황별로 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-with-meals";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: pageTitle }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: pageTitle,
    description: pageDescription,
    images: ["https://proteinlab.kr/opengraph-image"],
  },
};

const mealPatterns = [
  {
    title: "바쁜 아침",
    drink: "20g 안팎 단백질 음료",
    add: "바나나·통곡물빵처럼 간단한 탄수화물",
    reason: "음료 한 병만 마시는 것보다 오전 활동에 필요한 에너지와 포만감을 보완하기 쉽습니다.",
  },
  {
    title: "점심 식사 보완",
    drink: "저당 단백질 음료",
    add: "샐러드·채소 반찬과 밥 또는 고구마",
    reason: "단백질만 추가하기보다 식이섬유와 탄수화물을 함께 구성해야 일반 식사에 가까워집니다.",
  },
  {
    title: "오후 간식",
    drink: "가벼운 20g 이하 제품",
    add: "필요하면 과일이나 견과류 소량",
    reason: "기존 과자나 달콤한 음료를 대체하는 용도로 써야 총칼로리 관리에 도움이 됩니다.",
  },
  {
    title: "운동 후",
    drink: "단백질 20~30g 제품",
    add: "다음 식사가 멀다면 바나나·빵·밥 같은 탄수화물",
    reason: "단백질 음료는 빠른 보충에 편하지만 이후 일반 식사까지의 간격도 함께 고려해야 합니다.",
  },
];

const nutrientRoles = [
  ["단백질 음료", "단백질 보완", "한 병의 단백질·칼로리·당류 확인"],
  ["채소", "식이섬유와 식사 부피 보완", "샐러드나 채소 반찬으로 추가"],
  ["탄수화물", "활동에 필요한 에너지 보완", "밥·고구마·통곡물빵·과일 중 상황에 맞게 선택"],
  ["지방", "포만감과 식사 균형 보완", "견과류·달걀 등 기존 식사 안에서 과하지 않게 구성"],
];

const mistakes = [
  "식사를 충분히 한 뒤 단백질 음료를 습관적으로 추가해 총칼로리가 늘어나는 경우",
  "단백질 20g만 채우면 채소와 탄수화물이 없어도 완전한 한 끼라고 생각하는 경우",
  "간식 대체라고 해놓고 기존 간식과 단백질 음료를 함께 먹는 경우",
  "운동 후 음료만 마시고 이후 식사를 지나치게 오래 미루는 경우",
];

const links = [
  {
    href: "/guides/intake-strategy-health/protein-drink-meal-replacement",
    title: "단백질 음료 식사대용",
    body: "한 병이 식사를 대신할 수 있는지 제품 유형부터 구분합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-daily",
    title: "단백질 음료 매일 마셔도 될까",
    body: "매일 섭취할 때 당류·칼로리·소화 부담을 확인합니다.",
  },
  {
    href: "/guides/intake-strategy-health/diet-protein-drink-strategy",
    title: "다이어트 중 단백질 음료",
    body: "간식 대체와 식사 보완을 체중 관리 관점에서 구분합니다.",
  },
  {
    href: "/guides/intake-strategy-health/post-workout-protein",
    title: "운동 후 단백질 섭취",
    body: "운동 전후 식사 간격과 하루 단백질 총량을 함께 봅니다.",
  },
];

const faq = [
  {
    question: "단백질 음료를 밥과 같이 먹어도 되나요?",
    answer: "가능합니다. 반찬의 단백질이 부족한 식사라면 보완이 될 수 있습니다. 다만 이미 고기·생선·달걀·두부가 충분한 식사라면 음료가 불필요한 추가 섭취가 될 수 있습니다.",
  },
  {
    question: "단백질 음료와 채소만 먹으면 한 끼가 되나요?",
    answer: "상황에 따라 너무 가벼울 수 있습니다. 활동량과 다음 식사까지의 시간을 고려해 밥·고구마·통곡물빵·과일 같은 탄수화물을 적당히 조합하세요.",
  },
  {
    question: "단백질 음료를 간식으로 마셔도 되나요?",
    answer: "기존 과자나 달콤한 음료를 대체한다면 활용할 수 있습니다. 원래 먹던 간식에 추가하면 총칼로리가 늘 수 있으므로 대체 여부가 중요합니다.",
  },
  {
    question: "운동 후 단백질 음료만 마시면 충분한가요?",
    answer: "하루 전체 식사와 운동 전후 식사 간격에 따라 다릅니다. 다음 식사가 멀다면 탄수화물을 곁들이고, 이후 일반 식사에서 채소와 다른 영양소를 함께 보완하는 편이 좋습니다.",
  },
];

export default function ProteinDrinkWithMealsPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-10-04",
    dateModified: "2026-10-04",
    faq,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>단백질 음료와 식사 조합</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 음료와 식사를 같이 먹어도 됩니다.
            <br />
            중요한 건 빠진 영양을 무엇으로 채우는지입니다.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료는 단백질을 편하게 보완하지만 채소, 탄수화물, 지방과 식이섬유까지 자동으로 채워주지는 않습니다. 아침·간식·운동 후처럼 상황별로 어떤 음식을 곁들일지 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] p-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별 단백질 음료 식사 조합</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {mealPatterns.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <h3 className="text-base font-semibold text-[#24543d]">{item.title}</h3>
                  <dl className="mt-3 space-y-2 text-sm leading-6">
                    <div><dt className="inline font-semibold text-[var(--foreground)]">음료: </dt><dd className="inline text-[var(--foreground-muted)]">{item.drink}</dd></div>
                    <div><dt className="inline font-semibold text-[var(--foreground)]">같이 먹기: </dt><dd className="inline text-[var(--foreground-muted)]">{item.add}</dd></div>
                  </dl>
                  <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{item.reason}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 음료에 무엇을 더해야 하나</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#dce8df]">
                    <th className="px-3 py-3 font-semibold">구성</th>
                    <th className="px-3 py-3 font-semibold">역할</th>
                    <th className="px-3 py-3 font-semibold">확인 방법</th>
                  </tr>
                </thead>
                <tbody>
                  {nutrientRoles.map((row) => (
                    <tr key={row[0]} className="border-b border-[#edf1ee] last:border-0">
                      {row.map((cell) => <td key={cell} className="px-3 py-3 leading-6 text-[var(--foreground-muted)]">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 생기는 조합 실수</h2>
            <ul className="mt-4 space-y-3">
              {mistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] p-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-5 space-y-3">
              {faq.map((item) => (
                <article key={item.question} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">Q. {item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">같이 보면 좋은 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {links.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <GuideBuySection topic="general" />
      <Footer />
    </div>
  );
}

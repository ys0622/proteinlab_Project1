import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 성분 · 원료 해설 | 알룰로스·BCAA·감미료 완전 정리 | ProteinLab",
  description:
    "단백질 음료와 바에 들어가는 성분과 원료를 해설합니다. 당류 0g의 뜻, 알룰로스·스테비아·에리스리톨 차이, BCAA 역할, WPI vs WPC까지 성분 데이터로 직접 확인하세요.",
  alternates: {
    canonical: "https://proteinlab.kr/guides/ingredients",
  },
};

const articles = [
  {
    title: "당류 0g인데 왜 달까 — 알룰로스·스테비아·에리스리톨",
    href: "/guides/ingredients/zero-sugar-allulose",
    description: "단백질 음료에 당류 0g이라고 써 있는데 단맛이 나는 이유. 알룰로스·스테비아·에리스리톨이 영양성분표에서 당류로 집계되지 않는 이유와 다이어트에 미치는 영향을 정리합니다.",
    question: "당류 0g 단백질 음료는 진짜 당이 없는 걸까?",
    related: ["알룰로스", "스테비아", "에리스리톨", "당류 0g"],
    badge: "감미료",
  },
  {
    title: "BCAA란 무엇인가 — 단백질 음료에서 BCAA의 의미",
    href: "/guides/ingredients/bcaa-guide",
    description: "류신·이소류신·발린 세 가지 필수 아미노산의 역할과 단백질 음료·쉐이크에서 BCAA를 따로 봐야 할 필요가 있는지 정리합니다.",
    question: "단백질 음료에 BCAA가 따로 표기되어 있으면 더 좋은 제품일까?",
    related: ["BCAA", "류신", "근육 합성", "유청단백질"],
    badge: "아미노산",
  },
];

export default function IngredientsIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <span>성분 · 원료</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#fdf3e7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#a05c1a]">
              TRACK G
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            성분 · 원료 해설
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료와 바에 들어가는 감미료, 아미노산, 단백질 원료를 성분 데이터와 함께 정리합니다.
            성분표를 제대로 읽으면 제품 선택이 더 쉬워집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group block rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)] transition-colors hover:border-[#c8ddd0]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#fdf3e7] px-2.5 py-0.5 text-[10px] font-semibold text-[#a05c1a]">
                      {article.badge}
                    </span>
                  </div>
                  <h2 className="mt-2 text-base font-bold text-[var(--foreground)] group-hover:text-[#24543d]">
                    {article.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">{article.description}</p>
                  <p className="mt-3 text-xs italic text-[var(--foreground-subtle)]">Q. {article.question}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {article.related.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#dce8df] bg-[#f6fbf7] px-2.5 py-0.5 text-[11px] text-[var(--foreground-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

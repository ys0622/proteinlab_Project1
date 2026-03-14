import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 요거트 순위 읽는 법 | 랭킹·등급 기준 해석 | ProteinLab",
  description:
    "단백질 요거트 순위와 랭킹에서 단백질 밀도, 다이어트, 퍼포먼스 점수를 어떻게 읽어야 하는지 정리합니다.",
};

const rows = [
  ["단백질 밀도", "같은 중량에서 단백질이 얼마나 효율적으로 들어 있는지 볼 때 유용합니다."],
  ["다이어트", "칼로리와 당류 부담을 같이 줄이고 싶은 경우 먼저 보기 좋습니다."],
  ["퍼포먼스", "운동 후 보강이나 단백질 보충 효율을 중심으로 볼 때 유용합니다."],
];

const relatedLinks = [
  {
    href: "/ranking",
    title: "단백질 요거트 랭킹",
    description: "실제 요거트 랭킹 화면에서 단백질 밀도, 다이어트, 퍼포먼스를 바로 확인할 수 있습니다.",
  },
  {
    href: "/grade-criteria",
    title: "등급 기준",
    description: "점수와 등급이 어떤 기준으로 계산되는지 상세 기준을 이어서 볼 수 있습니다.",
  },
  {
    href: "/recommend",
    title: "단백질 요거트 추천",
    description: "랭킹을 본 뒤엔 개인 조건 기반 추천으로 바로 넘어갈 수 있습니다.",
  },
];

export default function ProteinYogurtRankingGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>단백질 요거트 순위 읽는 법</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">TRACK B</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 요거트 순위는 점수 기준까지 같이 읽어야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            요거트 랭킹은 단순 인기순이 아니라 단백질 밀도, 다이어트, 퍼포먼스 기준으로 나뉩니다.
            <br />
            같은 제품도 어떤 지표에서 상위인지에 따라 용도가 달라질 수 있어 점수 기준을 같이 보는 편이 좋습니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">지표별 해석</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {rows.map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/ranking" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                단백질 요거트 랭킹 보기
              </Link>
              <Link href="/grade-criteria" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                등급 기준 보기
              </Link>
            </div>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 보기 좋은 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-white p-4 transition-colors hover:bg-[#eef7f1]">
                  <p className="text-sm font-semibold text-[#24543d]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

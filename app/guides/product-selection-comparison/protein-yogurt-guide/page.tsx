import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 요거트 고르는 법 | ProteinLab",
  description:
    "단백질 요거트를 고를 때 그릭요거트, 드링킹 요거트, 대용량 제품을 어떻게 나눠 보고 단백질, 당류, 칼로리를 함께 비교해야 하는지 정리합니다.",
};

const sections = [
  {
    title: "그릭요거트",
    body: "꾸덕한 식감과 높은 단백질 밀도가 장점입니다. 대신 지방과 총열량이 높아질 수 있어 당류와 칼로리를 같이 봐야 합니다.",
  },
  {
    title: "드링킹 요거트",
    body: "마시기 편하고 휴대성이 좋습니다. 컵형보다 간편하지만 제품마다 단백질 함량 차이가 커서 용량과 밀도를 같이 봐야 합니다.",
  },
  {
    title: "대용량 요거트",
    body: "여러 번 나눠 먹는 용도에 잘 맞습니다. 총 단백질 양이 커 보일 수 있으니 100g 기준과 1회 섭취량 기준을 같이 확인하는 편이 좋습니다.",
  },
];

const checks = [
  "단백질 g만 보지 말고 100g당 단백질 밀도도 같이 보기",
  "저당 목적이면 당류 5g 이하 여부 먼저 좁히기",
  "대용량 제품은 1회 기준과 전체 기준이 섞이지 않았는지 확인하기",
];

const relatedLinks = [
  {
    href: "/guides/product-selection-comparison/greek-yogurt-guide",
    title: "그릭요거트 추천 기준",
    description: "그릭 타입을 따로 볼 때 무엇을 먼저 봐야 하는지 정리했습니다.",
  },
  {
    href: "/guides/product-selection-comparison/low-sugar-yogurt-guide",
    title: "저당 단백질 요거트 기준",
    description: "당류를 먼저 좁히고 비교하는 흐름을 정리했습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-yogurt-ranking-guide",
    title: "단백질 요거트 순위 읽는 법",
    description: "랭킹과 점수를 어떻게 해석해야 하는지 바로 이어서 볼 수 있습니다.",
  },
];

export default function ProteinYogurtGuidePage() {
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
            <span>단백질 요거트 고르는 법</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 요거트는 유형부터 나누고 비교해야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            그릭요거트, 드링킹 요거트, 대용량 요거트는 같은 단백질 요거트여도 보는 기준이 조금씩 다릅니다.
            <br />
            먼저 유형을 나누고, 그 다음 단백질 함량, 당류, 칼로리, 단백질 밀도를 비교하면 선택이 쉬워집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 나눠서 보는 3가지 유형</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {sections.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">비교할 때 체크할 핵심</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {checks.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/yogurt" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                단백질 요거트 비교하기
              </Link>
              <Link href="/curation/yogurt-greek" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                그릭 요거트 큐레이션 보기
              </Link>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">함께 보면 좋은 페이지</h2>
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

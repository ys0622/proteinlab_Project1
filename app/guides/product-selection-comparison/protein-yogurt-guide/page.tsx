import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 요거트 추천 기준 | 그릭·드링킹·대용량 비교 | ProteinLab",
  description:
    "단백질 요거트를 고를 때 그릭, 드링킹, 대용량 제품을 어떻게 나눠 보고 단백질 함량, 당류, 칼로리를 어떤 기준으로 비교해야 하는지 정리합니다.",
};

const sections = [
  {
    title: "그릭 요거트",
    body: "꾸덕한 질감과 높은 단백질 밀도가 강점입니다. 다만 지방과 총열량이 함께 높아질 수 있어 당류와 칼로리도 같이 체크해야 합니다.",
  },
  {
    title: "드링킹 요거트",
    body: "마시기 편하고 휴대성이 좋습니다. 제품별 단백질 함량 차이가 커서 용량 대비 단백질과 당류를 함께 보는 편이 좋습니다.",
  },
  {
    title: "대용량 요거트",
    body: "여러 번 나눠 먹기 좋지만 총단백질만 커 보이기 쉽습니다. 100g 기준과 1회 섭취 기준을 분리해서 봐야 비교가 정확합니다.",
  },
];

const checks = [
  "단백질 g만 보지 말고 100g당 단백질 밀도까지 함께 보기",
  "다이어트 목적이면 당류 5g 이하 여부를 먼저 좁혀 보기",
  "대용량 제품은 1회 기준과 총용량 기준이 섞이지 않는지 확인하기",
  "그릭과 드링킹을 같은 기준으로 두지 말고 유형부터 나눠 비교하기",
];

const comparisonMatrix = [
  ["그릭", "꾸덕한 식감과 밀도", "단백질 밀도", "당류, 칼로리"],
  ["드링킹", "마시기 편한가", "용량 대비 단백질", "당류, 1회 섭취량"],
  ["대용량", "여러 번 먹는 전제", "100g 기준", "총용량 착시"],
];

const relatedLinks = [
  {
    href: "/guides/product-selection-comparison/greek-yogurt-guide",
    title: "그릭요거트 추천 기준",
    description: "그릭요거트 안에서 무엇을 먼저 비교해야 하는지 더 자세히 정리한 페이지입니다.",
  },
  {
    href: "/guides/product-selection-comparison/low-sugar-yogurt-guide",
    title: "저당 단백질 요거트 기준",
    description: "당류를 우선으로 볼 때도 단백질을 놓치지 않는 비교 흐름을 정리합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-yogurt-ranking-guide",
    title: "단백질 요거트 순위 보는 법",
    description: "왜 순위와 점수가 그렇게 나오는지 등급 기준과 함께 읽을 수 있습니다.",
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
            <span>단백질 요거트 추천 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 요거트는 유형부터 나눠서 비교해야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            그릭, 드링킹, 대용량 요거트는 같은 단백질 요거트라도 비교 기준이 다릅니다.
            <br />
            먼저 유형을 나누고 그다음 단백질 함량, 당류, 칼로리, 단백질 밀도를 보는 편이 더 정확합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 나눠 보는 3가지 유형</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {sections.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">유형별 체크 매트릭스</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">유형</th>
                    <th className="px-3 py-3 font-semibold">먼저 볼 것</th>
                    <th className="px-3 py-3 font-semibold">주요 수치</th>
                    <th className="px-3 py-3 font-semibold">주의점</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMatrix.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">비교 전에 체크할 기준</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {checks.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">같이 보면 좋은 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[#dce8df] bg-white p-4 transition-colors hover:bg-[#eef7f1]"
                >
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

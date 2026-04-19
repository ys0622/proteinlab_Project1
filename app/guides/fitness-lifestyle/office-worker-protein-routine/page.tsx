import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const _pageTitle = "직장인 단백질 루틴 제품 선택법 | 아침·사무실·야근 기준 정리";
const _pageDesc = "직장인이 아침 공복, 오전 간식, 점심 공백, 퇴근 후 운동, 야근까지 하루 루틴에서 어떤 단백질 제품을 고르면 좋은지 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/fitness-lifestyle/office-worker-protein-routine" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/fitness-lifestyle/office-worker-protein-routine",
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

const routineRows = [
  ["출근 전 아침이 부족할 때", "쉐이크 또는 식사보완형 제품", "한 끼를 어느 정도 대체해야 하므로 포만감이 있는 쪽이 더 맞습니다."],
  ["오전 간식 대체", "가벼운 RTD 또는 요거트", "업무 중 부담 없이 먹기 좋고 칼로리 과잉을 막기 쉽습니다."],
  ["점심이 밀릴 때", "단백질 바", "이동성과 보관성이 좋아 직장 환경에서 가장 무난합니다."],
  ["퇴근 후 운동 직후", "20g대 RTD", "운동 후 바로 보충하고 그다음 식사로 이어가기 좋습니다."],
  ["야근 중 허기 방어", "저당 RTD 또는 바", "당류가 높은 간식 대체용으로 쓰기 좋습니다."],
];

const decisionCards = [
  {
    title: "식사 대체가 필요한가",
    body: "직장인 루틴에서는 아침 공백과 늦은 점심처럼 식사 비는 구간이 많아서, 포만감이 있는지 먼저 봐야 할 때가 많습니다.",
  },
  {
    title: "업무 중 조용하게 먹어야 하는가",
    body: "회의 전후나 자리에서 먹어야 한다면 소리, 냄새, 속도까지 같이 봐야 합니다. 바와 RTD가 가장 무난합니다.",
  },
  {
    title: "퇴근 후 운동까지 이어지는가",
    body: "운동까지 이어진다면 저녁 간식이 아니라 회복용 보충이 필요해질 수 있습니다. 이때는 20g대 RTD가 실용적입니다.",
  },
];

const commonMistakes = [
  "아침 대용인데 포만감이 부족한 RTD만 계속 고르는 경우",
  "업무 중 간식인데 너무 무겁거나 향이 강한 제품을 고르는 경우",
  "퇴근 후 운동하는데도 회복용 제품 없이 일반 간식으로 버티는 경우",
];

const dailyFlow = [
  {
    title: "아침을 자주 비우는 직장인",
    body: "아침은 쉐이크나 식사보완형으로 채우고, 오전 간식은 가벼운 RTD나 요거트로 분리하는 편이 가장 안정적입니다.",
  },
  {
    title: "점심이 자주 늦어지는 직장인",
    body: "서랍에는 바를 두고, 점심 공백이 길어질 때만 꺼내 쓰는 흐름이 가장 실용적입니다.",
  },
  {
    title: "퇴근 후 운동하는 직장인",
    body: "운동 전에는 가볍게, 운동 후에는 20g대 RTD로 회복을 붙이는 루틴이 가장 무난합니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/fitness-lifestyle/commute-protein-guide",
    title: "이동 중 먹기 좋은 제품 따로 보기",
    body: "지하철, 차 안, 회사 도착 직후처럼 이동 상황 중심으로 보고 싶다면 출근길 가이드가 더 직접적입니다.",
  },
  {
    href: "/guides/fitness-lifestyle/convenience-store-workout-protein",
    title: "운동 후 편의점 제품 보기",
    body: "헬스장 가는 길이나 운동 직후 바로 살 수 있는 제품군만 따로 비교했습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-yogurt-top5",
    title: "오전 간식용 요거트 보기",
    body: "업무 중 부담 없는 간식이 필요하다면 단백질 요거트 상위 후보를 먼저 보는 편이 빠릅니다.",
  },
];

export default function OfficeWorkerProteinRoutinePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/fitness-lifestyle/office-worker-protein-routine' });
  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동·라이프스타일</Link>
            <span>/</span>
            <span>직장인 단백질 루틴 제품 선택법</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            직장인 단백질 제품은
            <br />
            출근길보다 하루 루틴 전체를 기준으로 보는 편이 더 맞습니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            출근길 가이드는 이동 중 무엇을 먹기 좋은지에 집중하고, 이 페이지는 아침 공백, 오전 간식, 점심 지연, 퇴근 후 운동, 야근까지 하루 루틴 전체를 어떻게 나눌지에 집중합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">직장인 루틴별 우선 제품</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 후보</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {routineRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">결국 이 3가지를 먼저 봐야 합니다</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">직장인 루틴별 추천 흐름</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {dailyFlow.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">직장인들이 많이 하는 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {commonMistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 다음으로 바로 보기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
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

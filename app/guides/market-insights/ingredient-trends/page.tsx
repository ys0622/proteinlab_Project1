import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 성분 트렌드 | ProteinLab",
  description: "저당, 워터형, 식물성, 고단백 키워드가 왜 중요해졌는지 소비자 관점에서 정리했습니다.",
};

const trendCards = [
  {
    title: "저당",
    tag: "체중 관리",
    body: "체중 관리와 일상 간식 수요가 커지면서 단순 고단백보다 저당 조건이 더 중요해졌습니다. 같은 단백질 양이라도 당류 차이가 제품 선택을 가릅니다.",
  },
  {
    title: "워터형",
    tag: "가벼운 보충",
    body: "가볍게 마시고 싶어 하는 수요가 늘며 워터형 RTD가 독립 카테고리로 자리잡았습니다. 저칼로리·저당 조합이 기본 스펙이 됐습니다.",
  },
  {
    title: "식물성",
    tag: "라이프스타일",
    body: "유당 불내증, 비건, 환경 관심 등 다양한 이유로 식물성 단백질 수요가 꾸준히 늘고 있습니다. 완두·대두 기반 제품이 주류입니다.",
  },
  {
    title: "고단백·고BCAA",
    tag: "운동 보충",
    body: "운동 후 회복 목적 소비자는 단백질 40g 이상, BCAA·류신 함량까지 확인하는 방향으로 선택 기준이 높아지고 있습니다.",
  },
  {
    title: "락토프리",
    tag: "소화 편의",
    body: "유당 소화 불편을 겪는 소비자층을 위한 락토프리 제품이 빠르게 늘고 있습니다. 고령층과 소화 민감 소비자에게 강합니다.",
  },
  {
    title: "식사대용형",
    tag: "간편 식사",
    body: "바쁜 일상에서 한 끼를 대신할 수 있는 제품 수요가 증가했습니다. 단백질 외 칼로리·포만감·지방 구성도 함께 봐야 합니다.",
  },
];

const trendRows = [
  ["저당", "당류 5g 이하", "체중 관리·일상 간식", "제품 수 빠르게 증가 중"],
  ["워터형", "칼로리 100kcal 이하", "운동 후 가벼운 회복", "독립 카테고리로 성장"],
  ["식물성", "완두·대두 단백", "비건·유당 불내증", "온라인 중심 확장"],
  ["고단백", "단백질 30g 이상", "고강도 운동·보충", "프리미엄 포지션"],
  ["락토프리", "유당 제거", "고령층·소화 민감", "의료·복지 채널 강점"],
];

const readingPoints = [
  "트렌드 키워드가 마케팅 문구로만 사용되는 경우가 많습니다. 실제 수치를 직접 확인해야 합니다.",
  "저당이라고 표시돼도 기준이 제품마다 다를 수 있습니다. 당류 절대값을 봐야 합니다.",
  "식물성 제품은 단백질 흡수율이 동물성보다 낮을 수 있어 섭취량 기준을 조금 높게 잡는 편이 좋습니다.",
  "여러 트렌드를 동시에 만족하는 제품일수록 가격이 높아지는 경향이 있습니다.",
];

export default function IngredientTrendsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">시장 인사이트</Link>
            <span>/</span>
            <span>성분 트렌드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            요즘 단백질 제품은 어떤 성분 키워드로 바뀌고 있을까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            고단백 하나만으로는 설명이 부족해졌습니다.
            <br />
            저당·워터형·식물성·락토프리 같은 키워드가 제품 선택 기준을 바꾸고 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">6가지 핵심 트렌드 키워드</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              소비자 선택 기준이 바뀌면서 제품 기획도 함께 달라지고 있습니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {trendCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#24543d]">{item.title}</p>
                    <span className="rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">{item.tag}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">트렌드별 기준과 주요 타겟</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">키워드</th>
                    <th className="px-3 py-3 font-semibold">일반 기준</th>
                    <th className="px-3 py-3 font-semibold">주요 타겟</th>
                    <th className="px-3 py-3 font-semibold">시장 흐름</th>
                  </tr>
                </thead>
                <tbody>
                  {trendRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, i) => (
                        <td key={cell} className={`px-3 py-3 ${i === 0 ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">트렌드 키워드를 볼 때 주의할 점</h2>
            <ul className="mt-4 space-y-3">
              {readingPoints.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/market-insights/protein-market-history"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                시장 히스토리 보기 →
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                제품 비교하기 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

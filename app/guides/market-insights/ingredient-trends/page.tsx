import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 성분 트렌드 | ProteinLab",
  description: "저당, 워터형, 식물성, 고단백 등 주요 성분 트렌드가 왜 중요해졌는지 정리했습니다.",
};

const trendCards = [
  {
    title: "저당",
    tag: "체중 관리",
    body: "체중 관리와 일상 간식 수요가 커지면서 단순 고단백보다 저당 조건이 더 중요해졌습니다.",
  },
  {
    title: "워터형",
    tag: "가벼운 보완",
    body: "운동 후나 가볍게 마시는 수요가 늘면서 저칼로리·저당 워터형 RTD가 빠르게 성장하고 있습니다.",
  },
  {
    title: "식물성",
    tag: "라이프스타일",
    body: "비건, 유당 부담, 환경 관심과 연결되며 식물성 단백질 수요가 꾸준히 확장되고 있습니다.",
  },
  {
    title: "고단백",
    tag: "운동 보완",
    body: "운동 회복을 중시하는 소비자는 여전히 30g 이상 고단백 제품을 적극적으로 찾습니다.",
  },
  {
    title: "락토프리",
    tag: "소화 편의",
    body: "소화 부담을 줄이고 싶어 하는 수요가 커지면서 별도 선택 포인트로 자리 잡았습니다.",
  },
  {
    title: "식사대용형",
    tag: "간편 식사",
    body: "단백질뿐 아니라 포만감과 한 끼 대체 맥락을 함께 보는 제품이 늘고 있습니다.",
  },
];

const trendRows = [
  ["저당", "당류 5g 이하", "체중 관리·일상 간식", "제품 수가 빠르게 늘고 있습니다."],
  ["워터형", "100kcal 안팎", "운동 후 가벼운 회복", "독립 카테고리로 자리잡는 중입니다."],
  ["식물성", "식물성 원료 기반", "비건·유당 부담", "라이프스타일형 수요가 커지고 있습니다."],
  ["고단백", "단백질 30g 이상", "고강도 운동·보충", "프리미엄 RTD 쪽에서 강합니다."],
  ["락토프리", "유당 관련 제거", "소화 민감층", "중장년과 위장 민감 수요를 동시에 받습니다."],
];

const readingPoints = [
  "트렌드 키워드는 마케팅 문구로만 쓰이는 경우도 많아서 실제 수치를 직접 확인해야 합니다.",
  "저당이라고 해도 제품마다 단백질과 포만감 수준이 다르므로 함께 해석해야 합니다.",
  "식물성 제품은 흡수감과 맛 만족도가 달라서 섭취 목적에 맞는지 따로 판단해야 합니다.",
  "여러 트렌드를 동시에 만족하는 제품일수록 가격이 올라가는 경향이 있습니다.",
];

export default function IngredientTrendsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
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
            고단백 하나만으로는 설명이 부족합니다.
            <br />
            저당, 워터형, 식물성, 락토프리 같은 키워드가 제품 선택 기준을 바꾸고 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">6가지 핵심 트렌드 키워드</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              소비자 선택 기준이 바뀌면서 제품 기획 방향도 함께 이동하고 있습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">트렌드별 기준과 주요 타깃</h2>
            <div className="mt-4 rounded-2xl border border-[#dce8df] bg-white px-4 py-4">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">TREND MAP</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                하나의 제품이 여러 키워드를 동시에 만족할수록 고가화되는 경향이 있습니다.
              </p>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">키워드</th>
                    <th className="px-3 py-3 font-semibold">일반 기준</th>
                    <th className="px-3 py-3 font-semibold">주요 타깃</th>
                    <th className="px-3 py-3 font-semibold">시장 해석</th>
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
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              트렌드 키워드는 검색에는 강하지만, 실제 선택에서는 단백질·당류·칼로리·포만감 네 축으로 다시 해석해야 합니다.
            </blockquote>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 초보 가이드 | ProteinLab",
  description:
    "운동을 막 시작한 사람을 위한 단백질 섭취 가이드입니다. 식사, 간식, 제품 선택을 쉽게 연결해서 정리했습니다.",
};

const starterCards = [
  {
    title: "총량부터 맞추기",
    body: "운동 직후만 챙기기 전에, 하루 총 단백질 섭취량이 부족하지 않은지 먼저 보는 것이 우선입니다.",
  },
  {
    title: "익숙한 음식부터",
    body: "계란, 우유, 그릭요거트 같은 익숙한 식품으로 시작하면 부담 없이 루틴을 만들기 쉽습니다.",
  },
  {
    title: "제품은 보완용",
    body: "단백질 음료와 바는 식사를 완전히 대체하기보다 부족한 구간을 채우는 보조 도구로 보는 편이 좋습니다.",
  },
];

const sampleRows = [
  ["아침", "계란 + 토스트 + 우유", "가장 간단하게 단백질 섭취 시작"],
  ["점심", "일반 식사 + 고기/두부 반찬", "식사에서 단백질 식품 우선 배치"],
  ["운동 후 간식", "RTD 단백질 음료 또는 요거트", "가볍게 회복 루틴 연결"],
  ["저녁", "생선·닭고기·밥", "하루 총량 마무리"],
];

const checklist = [
  "운동 주 2~3회라면 식사마다 단백질 식품 하나씩 넣기",
  "제품 선택 시 단백질 g, 당류, 칼로리를 같이 보기",
  "처음부터 고단백 제품만 찾기보다 지속 가능한 루틴 만들기",
  "배가 불편하면 쉐이크보다 액상형이나 요거트형부터 시도하기",
];

const beginnerFaq = [
  {
    title: "운동을 시작하면 단백질 음료가 꼭 필요할까?",
    body: "필수는 아닙니다. 식사만으로 충분히 채울 수 있다면 제품은 보조 수단입니다. 다만 운동 후 식사를 놓치기 쉬운 일정이라면 RTD 음료가 편한 선택지가 될 수 있습니다.",
  },
  {
    title: "처음부터 고단백 제품을 고르는 게 좋을까?",
    body: "무조건 높은 수치보다 부담 없이 꾸준히 먹을 수 있는 제품이 먼저입니다. 초보자는 단백질 함량, 당류, 칼로리의 균형을 같이 보는 편이 좋습니다.",
  },
  {
    title: "운동하지 않는 날에도 단백질을 챙겨야 할까?",
    body: "네. 근육 회복은 휴식일에도 계속되기 때문에 운동일만 챙기고 쉬는 날에 비우면 총량이 부족해질 수 있습니다.",
  },
];

const starterFlow = [
  ["1단계", "하루 식사 3끼 체크", "매 끼니에 단백질 식품 1개씩 넣기"],
  ["2단계", "간식 한 번 보완", "요거트나 우유, RTD 중 가장 쉬운 것 선택"],
  ["3단계", "운동 후 루틴 고정", "운동 후 1시간 안에 회복식 연결"],
];

function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-[#eaded7] bg-white p-4 shadow-[0_12px_30px_rgba(111,61,38,0.06)]">
      <p className="text-sm font-semibold text-[#6b3f28]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
    </article>
  );
}

export default function BeginnerWorkoutGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동 & 라이프스타일</Link>
            <span>/</span>
            <span>운동 초보 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 초보는 무엇부터 챙겨야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            운동을 막 시작한 사람에게는 복잡한 보충제 루틴보다,
            <br />
            식사와 간식 안에 단백질을 자연스럽게 넣는 습관부터 만드는 편이 훨씬 실전적입니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#8a4b2f]">START HERE</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">운동 초보가 먼저 체크해야 하는 기준</h2>
              </div>
              <span className="rounded-full bg-[#fcf1ea] px-3 py-1 text-xs font-semibold text-[#8a4b2f]">가장 쉬운 시작점</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {starterCards.map((card) => (
                <InsightCard key={card.title} title={card.title} body={card.body} />
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">하루 식사 흐름 예시</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              제품을 억지로 넣기보다 일상 식사에 단백질 식품을 먼저 배치하고, 부족한 구간만 가벼운 제품으로 보완하는 흐름이 좋습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">타이밍</th>
                    <th className="px-3 py-3 font-semibold">예시</th>
                    <th className="px-3 py-3 font-semibold">포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 초보 루틴 만들기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              처음부터 완벽한 계획을 세우기보다 가장 쉬운 루틴을 고정하는 것이 오래 갑니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">단계</th>
                    <th className="px-3 py-3 font-semibold">무엇을 할까</th>
                    <th className="px-3 py-3 font-semibold">실전 포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {starterFlow.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">초보자가 자주 묻는 질문</h2>
            <div className="mt-5 grid gap-3">
              {beginnerFaq.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#eaded7] bg-white p-4 shadow-[0_12px_30px_rgba(111,61,38,0.06)]">
                  <p className="text-sm font-semibold text-[#6b3f28]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">초보자 체크리스트</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {checklist.map((item) => (
                <label key={item} className="flex items-start gap-3 rounded-2xl border border-[#eaded7] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] shadow-[0_10px_26px_rgba(111,61,38,0.05)]">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#d9c8bf] bg-[#fcf1ea] text-[11px] font-bold text-[#8a4b2f]">✓</span>
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/basics" className="inline-flex items-center justify-center rounded-xl border border-[#eaded7] bg-white px-5 py-3 text-sm font-semibold text-[#6b3f28] transition-colors hover:bg-[#fcf1ea]">
                단백질 기초 보기
              </Link>
              <Link href="/guides/product-selection-comparison/protein-drink-guide" className="inline-flex items-center justify-center rounded-xl border border-[#8a4b2f] bg-[#8a4b2f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6f3d26]">
                단백질 음료 선택 가이드
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

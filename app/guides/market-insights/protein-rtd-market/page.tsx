import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 RTD 시장 | ProteinLab",
  description: "RTD 단백질 음료 시장의 성장 배경, 유형별 구조, 브랜드 경쟁 포인트를 정리했습니다.",
};

const growthRows = [
  ["편의성", "즉시 섭취 가능", "운동 직후·출근길·간식 상황에 강함"],
  ["유통 확장", "편의점·대형마트 입점 급증", "반복 구매 진입 장벽이 낮음"],
  ["세분화", "워터형·밀크형·식물성", "같은 RTD 안에서도 목적별 경쟁 심화"],
  ["건강 관심 증가", "단백질 = 건강 관리 공식화", "운동 안 해도 마시는 소비자층 확장"],
];

const typeCards = [
  {
    title: "워터형 RTD",
    body: "저칼로리·저당 중심. 운동 후 가볍게 마시는 용도로 최적. 흡수 속도가 빠르고 위장 부담이 적습니다.",
    tag: "회복·보충",
  },
  {
    title: "밀크형 RTD",
    body: "포만감이 높고 칼로리도 상대적으로 높음. 식사 보완이나 간식 대용으로 활용하기 좋습니다.",
    tag: "식사 보완",
  },
  {
    title: "식물성 RTD",
    body: "유당 불내증이나 식물성 선호 소비자층 대상. 완두·대두 단백 기반 제품이 빠르게 늘고 있습니다.",
    tag: "식물성",
  },
];

const brandRows = [
  ["셀렉스", "매일유업", "노년·중장년 건강 관리", "락토프리·고단백 포지션"],
  ["더단백", "빙그레", "운동·다이어트", "고단백·저당 강조"],
  ["하이뮨", "일동후디스", "면역·건강 관리", "프리미엄 이미지"],
  ["닥터유", "오리온", "편의점 간식 시장", "접근성·가성비"],
];

const readingPoints = [
  "운동 보충용인지 식사 보완형인지 먼저 구분해야 합니다.",
  "같은 RTD라도 워터형과 밀크형은 포만감과 활용 상황이 다릅니다.",
  "브랜드 메시지가 강해 보여도 실제 성분 숫자가 맞는지 확인해야 합니다.",
  "편의점 제품은 유통 전략상 가격과 용량이 온라인과 다를 수 있습니다.",
];

export default function ProteinRTDMarketPage() {
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
            <span>단백질 RTD 시장</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            RTD 단백질 시장은 왜 이렇게 커졌을까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            파우더보다 빠르게 커진 이유는 편의성, 유통, 목적별 세분화에 있습니다.
            <br />
            시장 구조를 이해하면 브랜드와 제품을 읽는 눈이 달라집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">RTD 시장을 키운 4가지 요인</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단순히 편해서 팔리는 게 아닙니다. 유통, 세분화, 소비자 인식 변화가 동시에 맞물렸습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">요인</th>
                    <th className="px-3 py-3 font-semibold">주요 변화</th>
                    <th className="px-3 py-3 font-semibold">시장 의미</th>
                  </tr>
                </thead>
                <tbody>
                  {growthRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">RTD 유형별 특징</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 RTD라도 워터형·밀크형·식물성은 목적과 활용 상황이 완전히 다릅니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {typeCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                    <span className="rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">{card.tag}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">주요 브랜드 포지션 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 단백질 음료라도 브랜드마다 타겟과 메시지가 다릅니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">브랜드</th>
                    <th className="px-3 py-3 font-semibold">운영사</th>
                    <th className="px-3 py-3 font-semibold">타겟</th>
                    <th className="px-3 py-3 font-semibold">포지션</th>
                  </tr>
                </thead>
                <tbody>
                  {brandRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">RTD를 볼 때 놓치지 말아야 할 포인트</h2>
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
                href="/guides/market-insights/brand-analysis"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                브랜드 분석 보기 →
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

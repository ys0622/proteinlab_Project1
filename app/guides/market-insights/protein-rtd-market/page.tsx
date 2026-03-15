import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 RTD 시장 분석 | ProteinLab",
  description: "RTD 단백질 음료 시장의 성장 배경, 유형별 구조, 브랜드 경쟁 포인트를 정리했습니다.",
};

const growthRows = [
  ["편의성", "즉시 섭취 가능", "운동 직후와 출근길 같은 상황에서 수요가 커졌습니다."],
  ["유통 확장", "편의점과 대형 채널 입점", "반복 구매 진입 장벽이 낮아졌습니다."],
  ["세분화", "워터형, 바나나형, 식물성", "같은 RTD 안에서도 목적별 분화가 진행됐습니다."],
  ["건강 관리 수요", "단백질 관리 식품 인식", "운동하지 않는 소비자층까지 넓어졌습니다."],
];

const typeCards = [
  {
    title: "워터형 RTD",
    body: "저칼로리 중심입니다. 운동 후 가볍게 마시거나 간단한 보완 용도에 적합합니다.",
    tag: "회복·보완",
  },
  {
    title: "밀크·라떼형 RTD",
    body: "포만감과 칼로리가 상대적으로 높아 식사 보완이나 간식 대용으로 쓰기 좋습니다.",
    tag: "식사 보완",
  },
  {
    title: "식물성 RTD",
    body: "비건, 유당 부담, 라이프스타일 키워드와 연결되며 별도 카테고리로 성장 중입니다.",
    tag: "식물성",
  },
];

const brandRows = [
  ["더단백", "빙그레", "운동·다이어트", "고단백과 저당 메시지를 강하게 전면에 둡니다."],
  ["마이밀", "롯데웰푸드", "간편 식사 보완", "식사대용과 포만감 맥락을 중심으로 구성합니다."],
  ["뉴케어 올프로틴", "대상웰라이프", "회복·영양관리", "시니어와 영양관리 수요까지 넓게 포괄합니다."],
  ["하이뮨", "일동후디스", "중장년 건강 관리", "면역·건강 관리 메시지와 프리미엄 이미지를 결합합니다."],
  ["셀렉스", "매일유업", "일상 단백질 보충", "유통 확장성과 가성비가 강점입니다."],
];

const readingPoints = [
  "운동 보완형인지 식사 보완형인지 먼저 구분해야 합니다.",
  "같은 RTD라도 워터형과 밀크형은 포만감과 사용 상황이 다릅니다.",
  "브랜드 메시지가 강해 보여도 실제 영양 수치는 별도로 확인해야 합니다.",
  "편의점 전용 상품은 접근성이 강점이지만 용량과 가격 구성이 다를 수 있습니다.",
];

export default function ProteinRTDMarketPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">
              시장 인사이트
            </Link>
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
            파우더보다 빠르게 커진 이유는 편의성, 유통 확장, 목적별 세분화에 있습니다.
            <br />
            시장 구조를 이해하면 브랜드와 제품을 읽는 기준도 더 선명해집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">RTD 시장이 커진 4가지 요인</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단순히 단백질 인식이 높아진 것만으로 설명되지는 않습니다. 유통과 소비 장면의 변화가 함께 맞물렸습니다.
            </p>
            <div className="mt-4 rounded-2xl border border-[#dce8df] bg-white px-4 py-4">
              <div className="grid gap-3 md:grid-cols-4">
                {["편의성", "유통", "세분화", "건강 관리"].map((label) => (
                  <div key={label} className="rounded-xl bg-[#f6fbf7] px-3 py-3 text-center">
                    <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">MARKET DRIVER</p>
                    <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">요인</th>
                    <th className="px-3 py-3 font-semibold">주요 변화</th>
                    <th className="px-3 py-3 font-semibold">시장 해석</th>
                  </tr>
                </thead>
                <tbody>
                  {growthRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">RTD 유형별 접근</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 RTD라도 워터형, 밀크형, 식물성은 목적과 사용 장면이 다릅니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">주요 브랜드의 경쟁 구도</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 RTD 음료라도 브랜드마다 대표 메시지와 쓰임새가 다릅니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">브랜드</th>
                    <th className="px-3 py-3 font-semibold">운영사</th>
                    <th className="px-3 py-3 font-semibold">대표 포지션</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {brandRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">RTD를 볼 때 놓치지 말아야 할 포인트</h2>
            <ul className="mt-4 space-y-3">
              {readingPoints.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              RTD 시장은 이제 하나의 카테고리가 아닙니다. 회복형, 식사보완형, 저당형, 식물성형으로 더 세분화되고 있습니다.
            </blockquote>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

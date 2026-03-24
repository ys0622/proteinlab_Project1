import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "2026 단백질 음료 시장 트렌드 | ProteinLab",
  description: "초고단백 경쟁, 저당 설계 확대, 시니어 타깃 강화 등 2026년 단백질 음료 시장 변화를 자료 기반으로 정리합니다.",
};

const trendCards = [
  {
    title: "40g 이상 초고단백 경쟁",
    body: "2025년부터 테이크핏 몬스터 43g, 닥터유 40g, 뉴케어 올프로틴 41g 같은 350mL 초고단백 RTD가 한 카테고리처럼 묶이기 시작했습니다.",
    tag: "고단백",
  },
  {
    title: "제로슈가·저당 설계 확대",
    body: "단백질 총량만이 아니라 당류 0g, 저당 설계가 구매 기준으로 자리 잡았습니다. RTD 경쟁도 이제는 함량과 당류를 함께 봐야 합니다.",
    tag: "저당",
  },
  {
    title: "시니어·건강관리형 확대",
    body: "하이뮨, 뉴케어처럼 건강관리형 브랜드가 계속 존재감을 유지하고, 일반 RTD도 중장년 건강관리 언어를 적극적으로 끌어오고 있습니다.",
    tag: "시니어",
  },
];

const changeRows = [
  ["남양유업 테이크핏", "2025-05-02", "테이크핏 몬스터 43g 출시", "40g 이상 초고단백 시장을 본격적으로 열어젖힌 제품군입니다."],
  ["오리온 닥터유", "2025년", "프로 단백질 드링크 40g 라인업 확장", "초코 중심에서 딸기 SKU까지 늘리며 맛 진입 장벽을 낮췄습니다."],
  ["대상웰라이프 뉴케어", "2025년", "올프로틴 41g 출시", "균형영양식 브랜드가 초고단백 RTD로 확장한 상징적인 사례입니다."],
  ["매일유업 셀렉스", "2021~2025 누적", "웨이프로핏·WPI RTD 강화", "WPI와 워터형 경험을 먼저 밀어온 브랜드라 저당·가벼운 음용감 트렌드와 연결됩니다."],
  ["일동후디스 하이뮨", "2024-05-27", "하이뮨 액티브 다크초코 31g 출시", "중간 함량대와 중장년 건강관리 포지션을 동시에 강화했습니다."],
];

const insightPoints = [
  "2026년에는 '단백질 몇 g인가'만으로는 차별화가 어렵고, 당류와 음용감까지 함께 설계한 제품이 유리합니다.",
  "초고단백 40g대 제품은 운동 보충형으로 세분화되고, 20g 전후 제품은 입문형·일상형으로 더 뚜렷하게 갈립니다.",
  "워터형과 락토프리 키워드는 취향 문제가 아니라 소화 부담과 생활 맥락을 해결하는 포지션으로 읽히고 있습니다.",
  "중장년 타깃은 여전히 중요합니다. 단순 고단백보다 균형 영양, 저당, 소화 부담 완화 메시지가 함께 붙는 흐름이 이어집니다.",
];

const retailRows = [
  ["GS25", "2026-01-05", "단백질 음료 매출 10.9% 증가", "건강관리 식품과 함께 편의점 건강 카테고리 안에서 성장 흐름이 이어지고 있음을 보여줍니다."],
  ["편의점·온라인 공통", "2025~2026", "박스 구매와 단품 테스트의 병행", "입문자는 단품, 정착한 사용자는 박스 구매로 이동하는 패턴이 더 분명해졌습니다."],
  ["브랜드 공통", "2025~2026", "맛 SKU 다변화", "초코 일변도에서 복숭아, 커피, 바나나, 고소한맛으로 선택지가 넓어지고 있습니다."],
];

const sourceLinks = [
  {
    label: "남양유업 테이크핏 몬스터 43g 출시 기사",
    href: "https://www.fntimes.com/html/view.php?ud=2025050208361824676febc6baa6_18",
  },
  {
    label: "일동후디스 하이뮨 액티브 다크초코 31g 출시 기사",
    href: "https://www.newsis.com/view/NISX20240527_0002749042",
  },
  {
    label: "GS25 건강 식품 매출 증가 기사",
    href: "https://www.g-enews.com/article/Distribution/2026/01/202601051543363997056c162803_1",
  },
  {
    label: "셀렉스 웨이프로틴 드링크 복숭아 출시 기사",
    href: "https://www.thefirstmedia.net/news/articleView.html?idxno=71929",
  },
];

export default function ProteinDrinkTrend2026Page() {
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
            <span>2026 단백질 음료 시장 트렌드</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span>
            <span className="rounded-md bg-[#f8f4fb] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">연간 트렌드</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">6분 읽기</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-03-24</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            2026 단백질 음료 시장 트렌드
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            2026년 국내 단백질 음료 시장은 초고단백 경쟁, 저당 설계 확대, 중장년 건강관리형 강화라는 세 축으로 읽는 것이 가장 정확합니다.
            <br />
            최근 출시 흐름과 유통 현장 데이터를 함께 보면 브랜드별 다음 움직임도 훨씬 선명해집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#eadff1] bg-[#faf7fc] px-5 py-5 shadow-[0_18px_50px_rgba(44,23,58,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">2026 핵심 트렌드 요약</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {trendCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#e5d8ee] bg-white p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#6b4d7c]">{card.title}</p>
                    <span className="rounded-full bg-[#f3edf8] px-2 py-0.5 text-[10px] font-semibold text-[#6b4d7c]">{card.tag}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#eadff1] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(44,23,58,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">브랜드별 2025~2026 주요 변화</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              최근 신제품 흐름을 보면 브랜드마다 어디에 힘을 주고 있는지가 분명합니다. 2025년 이후 흐름은 2026년 경쟁 구도를 읽는 데 거의 그대로 이어집니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#eee6f4] bg-[#faf7fc]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8deef] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">브랜드</th>
                    <th className="px-3 py-3 font-semibold">시점</th>
                    <th className="px-3 py-3 font-semibold">주요 변화</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {changeRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f1ebf5] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#eadff1] bg-[#faf7fc] px-5 py-5 shadow-[0_18px_50px_rgba(44,23,58,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">유통 현장에서 읽히는 신호</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료 자체만의 공식 시장 규모 수치는 공개 범위가 제한적이지만, 유통 채널 매출과 SKU 움직임은 소비 흐름을 읽기에 충분한 단서가 됩니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#eee6f4] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8deef] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">채널·축</th>
                    <th className="px-3 py-3 font-semibold">시점</th>
                    <th className="px-3 py-3 font-semibold">관측값</th>
                    <th className="px-3 py-3 font-semibold">의미</th>
                  </tr>
                </thead>
                <tbody>
                  {retailRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f1ebf5] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#eadff1] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(44,23,58,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">지금 주목할 키워드</h2>
            <ul className="mt-4 space-y-3">
              {insightPoints.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#e5d8ee] bg-[#faf7fc] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6b4d7c]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#eadff1] bg-[#faf7fc] px-5 py-5 shadow-[0_18px_50px_rgba(44,23,58,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이어 읽기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Link href="/guides/product-selection-comparison/high-protein-40g-comparison" className="rounded-2xl border border-[#e5d8ee] bg-white p-4 transition-colors hover:bg-[#f6f1fa]">
                <p className="text-sm font-semibold text-[#6b4d7c]">40g 이상 3종 비교</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">초고단백 경쟁이 실제 제품 비교에서 어떻게 보이는지 바로 확인합니다.</p>
              </Link>
              <Link href="/guides/product-selection-comparison/protein-density-ranking" className="rounded-2xl border border-[#e5d8ee] bg-white p-4 transition-colors hover:bg-[#f6f1fa]">
                <p className="text-sm font-semibold text-[#6b4d7c]">100mL당 단백질 순위</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">브랜드 트렌드가 실제 단백질 밀도 순위에서 어떻게 드러나는지 봅니다.</p>
              </Link>
              <Link href="/guides/product-selection-comparison/selexs-lineup" className="rounded-2xl border border-[#e5d8ee] bg-white p-4 transition-colors hover:bg-[#f6f1fa]">
                <p className="text-sm font-semibold text-[#6b4d7c]">셀렉스 제품 종류 전체 정리</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">브랜드 라인업 차원에서 셀렉스가 어떻게 분화되는지 이어서 확인합니다.</p>
              </Link>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#eadff1] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(44,23,58,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자료 출처</h2>
            <div className="mt-4 space-y-3">
              {sourceLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block rounded-xl border border-[#e5d8ee] bg-[#faf7fc] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#f6f1fa]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 브랜드 분석 | ProteinLab",
  description: "더단백, 랩노쉬, 하이뮨, 닥터유 등 주요 브랜드의 포지셔닝과 소비자 인식을 비교합니다.",
};

const brandRows = [
  ["더단백", "빙그레", "운동·다이어트 중심", "저당·고단백 메시지가 강하고 접근성이 좋습니다."],
  ["랩노쉬", "이그니스", "식사 보완·간편식", "식사대용형 서사와 제품 라인업 구성이 명확합니다."],
  ["하이뮨", "일동후디스", "중장년 건강 관리", "프리미엄 이미지와 건강 관리 맥락이 강합니다."],
  ["닥터유", "오리온", "편의점·일상 보충", "유통 접근성과 가성비 강점이 있습니다."],
  ["하이뮨 프로틴 밸런스", "일동후디스", "시니어·건강 관리", "복합 영양과 균형 서사를 강화합니다."],
  ["요프로", "빙그레", "MZ·다이어트", "저칼로리·가벼운 섭취 맥락이 강합니다."],
];

const positionCards = [
  {
    title: "편의점 중심 브랜드",
    brands: "더단백, 닥터유",
    body: "접근성이 높아 반복 구매 진입 장벽이 낮고, 일상형 RTD 이미지를 빠르게 형성합니다.",
  },
  {
    title: "건강 관리 중심 브랜드",
    brands: "하이뮨, 하이뮨 프로틴 밸런스",
    body: "면역, 회복, 중장년 건강 같은 메시지로 프리미엄 포지셔닝을 구축합니다.",
  },
  {
    title: "식사대용·루틴형 브랜드",
    brands: "랩노쉬",
    body: "포만감과 한 끼 대체 서사를 전면에 두고 식사보완 맥락을 강화합니다.",
  },
  {
    title: "가벼운 다이어트형 브랜드",
    brands: "요프로, 더단백 일부",
    body: "낮은 칼로리와 가벼운 섭취 경험을 강조해 체중 관리 수요를 공략합니다.",
  },
];

const readingPoints = [
  "브랜드 이미지와 실제 성분 수치는 다를 수 있으므로 제품별 숫자를 따로 확인해야 합니다.",
  "같은 브랜드라도 라인별로 용도와 포만감, 칼로리가 다르므로 SKU 기준으로 비교해야 합니다.",
  "편의점 채널 중심 브랜드는 접근성이 강점이지만 가격과 용량 전략이 온라인 상품과 다를 수 있습니다.",
  "건강 관리 중심 브랜드는 회복·균형 메시지가 강해 중장년층과 건강 관심층에 더 맞을 수 있습니다.",
];

export default function BrandAnalysisPage() {
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
            <span>브랜드 분석</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            브랜드는 어떤 차이로 선택 기준을 만들까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 단백질 카테고리 안에서도 브랜드는 유통, 타깃, 메시지, 제품 구성으로 다른 인식을 만듭니다.
            <br />
            브랜드 포지셔닝을 읽으면 제품 선택과 시장 흐름 해석이 더 빨라집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">주요 브랜드 포지셔닝 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드별 운영사, 대표 타깃, 핵심 메시지를 나눠서 보면 시장 구도가 선명해집니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">브랜드</th>
                    <th className="px-3 py-3 font-semibold">운영사</th>
                    <th className="px-3 py-3 font-semibold">대표 타깃</th>
                    <th className="px-3 py-3 font-semibold">포지셔닝</th>
                  </tr>
                </thead>
                <tbody>
                  {brandRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">포지셔닝 유형으로 묶어 보기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드를 개별로 보기보다 포지셔닝 그룹으로 보면 시장 구조가 더 명확하게 보입니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {positionCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <p className="mt-1 text-xs text-[#2d6a4f]">{card.brands}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">브랜드를 볼 때 주의할 점</h2>
            <ul className="mt-4 space-y-3">
              {readingPoints.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드 분석의 목적은 브랜드 선호를 고르는 것이 아니라, 제품 비교 전에 어떤 서사와 타깃으로 구성돼 있는지 이해하는 데 있습니다.
            </blockquote>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

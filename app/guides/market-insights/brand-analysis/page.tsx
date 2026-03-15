import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 브랜드 분석 | ProteinLab",
  description: "셀렉스, 더단백, 하이뮨, 닥터유, 뉴케어, 랩노쉬 등 주요 브랜드 포지션과 소비자 인식을 비교합니다.",
};

const brandRows = [
  ["셀렉스", "매일유업", "운동·다이어트 대중", "저당·균형형. 라인업이 넓고 편의점 접근성이 높음"],
  ["더단백", "빙그레", "일상 단백질 보충", "편의점 중심 유통. 간편 구매·일상형 RTD 포지션"],
  ["하이뮨", "일동후디스", "중장년·건강 관리", "면역·건강 메시지 강조. 프리미엄 이미지"],
  ["닥터유", "오리온", "운동·식사 보완", "고단백 이미지와 다양한 SKU. 편의점 간식 시장 공략"],
  ["뉴케어 올프로틴", "대상 웰라이프", "고령·환자·건강 관리", "락토프리·고단백. 의료·복지 채널 강점"],
  ["랩노쉬", "랩노쉬", "MZ·다이어트", "저당·저칼로리 강조. 식사대용 포지션. 온라인 중심"],
  ["테이크핏", "빅썸", "고강도 운동·보충", "43g 고단백. 운동 후 회복 특화. 헬스인 타겟"],
];

const positionCards = [
  {
    title: "편의점 중심 브랜드",
    brands: "셀렉스, 더단백, 닥터유",
    body: "유통 접근성이 가장 높아요. 반복 구매 진입 장벽이 낮고 인지도가 빠르게 형성됩니다.",
  },
  {
    title: "건강·고령 특화 브랜드",
    brands: "하이뮨, 뉴케어 올프로틴",
    body: "면역·회복·노년 건강 메시지가 강해요. 의료·복지 채널과 프리미엄 포지션을 함께 가져갑니다.",
  },
  {
    title: "다이어트·MZ 타겟 브랜드",
    brands: "랩노쉬, 셀렉스 일부",
    body: "저당·저칼로리·식사대용 포지션. 온라인과 SNS 중심으로 인지도를 쌓고 있습니다.",
  },
  {
    title: "운동 특화 고단백 브랜드",
    brands: "테이크핏, 닥터유 프로",
    body: "40g 이상 고단백 제품 중심. 헬스인·운동 후 회복 타겟. 성분 밀도가 높아요.",
  },
];

const readingPoints = [
  "브랜드 이미지와 실제 성분 수치가 다를 수 있습니다. 단백질 g, 당류, 칼로리는 직접 확인해야 합니다.",
  "같은 브랜드라도 제품 라인별로 포지션이 다릅니다. 브랜드 전체가 아니라 개별 SKU를 봐야 합니다.",
  "편의점 전용 제품은 온라인 판매 제품과 용량·가격이 다른 경우가 많습니다.",
  "뉴케어처럼 의료·복지 채널 강점이 있는 브랜드는 일반 소비자보다 고령층 타겟이 더 맞을 수 있습니다.",
];

export default function BrandAnalysisPage() {
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
            <span>브랜드 분석</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            브랜드는 어떤 차이로 선택을 만들까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 단백질 카테고리 안에서도 브랜드는 유통, 타겟, 메시지, 제품 구성으로 전혀 다른 인식을 만듭니다.
            <br />
            브랜드 포지션을 알면 제품 선택과 시장 흐름을 더 빠르게 읽을 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">주요 브랜드 포지션 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드별 운영사, 타겟, 포지션을 한눈에 비교합니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">브랜드</th>
                    <th className="px-3 py-3 font-semibold">운영사</th>
                    <th className="px-3 py-3 font-semibold">주요 타겟</th>
                    <th className="px-3 py-3 font-semibold">포지션 특징</th>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">포지션 유형으로 묶어보기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드를 개별로 보기보다 포지션 유형으로 묶으면 시장 구조가 더 잘 보입니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">브랜드를 볼 때 놓치지 말아야 할 점</h2>
            <ul className="mt-4 space-y-3">
              {readingPoints.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/market-insights/ingredient-trends"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                성분 트렌드 보기 →
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

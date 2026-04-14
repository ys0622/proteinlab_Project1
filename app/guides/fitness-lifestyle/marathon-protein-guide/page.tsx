import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "마라톤 레이스 주간 영양 전략 가이드 | 카보 로딩·회복 루틴 정리";
const _pageDesc = "마라톤 레이스 주간에는 평소 훈련보다 탄수화물 로딩, 수분, 단백질 회복 전략이 더 중요합니다. 거리별 훈련법이 아니라 대회 전후 체크리스트를 실전 관점에서 정리합니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/fitness-lifestyle/marathon-protein-guide" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/fitness-lifestyle/marathon-protein-guide",
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

const checklistItems = [
  "탄수화물 로딩은 레이스 1~2일 전부터 8~10g/kg/day 범위를 검토하기",
  "출발 시간과 식사 시간을 함께 계획하기",
  "섬유질이 많은 음식은 줄이고 소화가 쉬운 메뉴로 구성하기",
  "지방과 자극적인 음식은 경기 직전에는 피하기",
  "에너지젤과 스포츠음료를 사용할 계획이면 미리 테스트하기",
  "경기 후 회복은 단백질과 수분 보충 루틴으로 바로 연결하기",
];

const timelineRows = [
  ["1주 전", "일반 훈련 유지", "균형 식단과 충분한 수분, 단백질 총량 유지"],
  ["3일 전", "로딩 시작", "탄수화물 비중을 높이고 위장 부담을 줄이기"],
  ["전날", "컨디션 조절", "소화가 쉬운 식사, 과식 금지, 수분 관리"],
  ["당일", "레이스 데이", "출발 전 탄수화물, 경기 후 빠른 회복 루틴 연결"],
];

const macroCards = [
  { title: "훈련기", value: "탄수 55~60%", note: "단백질과 수분을 충분히 챙기면서 탄수화물 기반 식단을 유지하는 구간입니다." },
  { title: "카보 로딩기", value: "탄수 60% 이상", note: "글리코겐 저장량을 우선 확보해야 하는 시기입니다." },
  { title: "레이스 직후", value: "탄수+단백질", note: "회복과 글리코겐 보충을 동시에 시작하는 식사가 중요합니다." },
];

function MacroCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]">
      <p className="text-sm font-semibold text-[#24543d]">{title}</p>
      <p className="mt-2 text-xl font-bold text-[var(--foreground)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{note}</p>
    </article>
  );
}

export default function MarathonProteinGuidePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/fitness-lifestyle/marathon-protein-guide' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동 & 라이프스타일</Link>
            <span>/</span>
            <span>마라톤 레이스 주간 영양 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            마라톤은 레이스 주간 영양 전략이
            <br />
            완주 경험을 좌우합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            일반적인 러닝 훈련과 마라톤 대회 전후 영양 전략은 다르게 설계해야 합니다.
            <br />
            이 페이지는 5km, 하프, 풀 같은 거리별 훈련법이 아니라 레이스 주간 카보 로딩과 회복 체크리스트에 집중합니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">RACE WEEK</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">레이스 주간 매크로 전략</h2>
              </div>
              <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">훈련기와 분리해서 보기</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {macroCards.map((card) => (
                <MacroCard key={card.title} title={card.title} value={card.value} note={card.note} />
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">주간 타임라인</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              마라톤 주간은 훈련 강도보다 영양 집중도가 더 중요합니다. 아래 흐름으로 보면 전체 구조를 빠르게 이해할 수 있습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">시점</th>
                    <th className="px-3 py-3 font-semibold">훈련</th>
                    <th className="px-3 py-3 font-semibold">영양 집중 포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">레이스 주간 체크리스트</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {checklistItems.map((item) => (
                <label key={item} className="flex items-start gap-3 rounded-2xl border border-[#dce8df] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] shadow-[0_10px_26px_rgba(20,32,24,0.05)]">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#c8dfd0] bg-[#eef7f1] text-[11px] font-bold text-[#2d6a4f]">OK</span>
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: ACSM et al. (2009), On Running 코리아 칼럼(2024)</p>
          </section>
          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/fitness-lifestyle/marathon-distance-strategy" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">거리별 전략 보기</Link>
              <Link href="/guides/fitness-lifestyle/sports-nutrition-guide" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">스포츠 영양 가이드 보기</Link>
              <Link href="/guides/intake-strategy-health/post-workout-protein" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">운동 후 회복 기준 보기</Link>
              <Link href="/curation/running" className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">러닝 큐레이션 보기</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

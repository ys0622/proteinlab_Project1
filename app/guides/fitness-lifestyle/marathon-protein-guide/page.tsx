import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "마라톤 레이스 주간 단백질·탄수화물 전략 | ProteinLab",
  description:
    "훈련기와 레이스 주간의 영양 전략은 다릅니다. 카보 로딩, 회복, 레이스 직후 체크리스트를 러닝 관점에서 정리했습니다.",
};

const checklistItems = [
  "탄수화물 로딩 시작 (대회 1~2일 전 8~10g/kg/day 검토)",
  "대회 시간과 식사 시간을 함께 계획하기",
  "섬유질이 낮은 음식 위주로 식사 구성하기",
  "지방과 자극적인 음식은 과하지 않게 줄이기",
  "에너지젤, 스포츠음료, 수분 계획을 미리 점검하기",
  "경기 후 단백질과 회복식을 바로 연결할 준비하기",
];

const timelineRows = [
  ["일주일 전", "일반 훈련 유지", "균형 식단 + 충분한 수분 + 단백질 총량 유지"],
  ["3일 전", "로딩 시작", "탄수화물 비중 확대, 단백질은 유지하고 소화 부담 낮추기"],
  ["전날", "저섬유·컨디션 조절", "소화 쉬운 식사, 과식 금지, 수분 관리"],
  ["당일", "레이스 데이", "출발 전 탄수화물, 경기 후 빠른 회복식 연결"],
];

const macroCards = [
  { title: "훈련기", value: "탄수 55~60%", note: "단백질과 함께 충분한 탄수화물 확보가 기본입니다." },
  { title: "카보 로딩기", value: "탄수 60%+", note: "글리코겐 저장을 우선하는 구간입니다." },
  { title: "레이스 직후", value: "탄수+단백질", note: "회복과 글리코겐 보충을 동시에 시작합니다." },
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
            <span>마라톤 영양 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            훈련기와 레이스 데이 영양은 다르게 가야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            러너에게 훈련기와 마라톤 대회 직전, 직후의 영양 전략은 분리해서 봐야 합니다.
            <br />
            레이스 주간에는 탄수화물 로딩이 중심이고, 레이스 후에는 회복식 구성이 핵심입니다.
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
              마라톤 주간은 훈련 강도와 영양 중심이 함께 바뀝니다. 아래 흐름으로 보면 전체 구조를 빠르게 읽을 수 있습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">시점</th>
                    <th className="px-3 py-3 font-semibold">훈련</th>
                    <th className="px-3 py-3 font-semibold">영양 중심</th>
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
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#c8dfd0] bg-[#eef7f1] text-[11px] font-bold text-[#2d6a4f]">✓</span>
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: ACSM et al. (2009), On Running 코리아 칼럼(2024)
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/fitness-lifestyle/marathon-distance-strategy" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                거리별 전략 보기
              </Link>
              <Link href="/guides/fitness-lifestyle/sports-nutrition-guide" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                스포츠 영양 가이드 보기
              </Link>
              <Link href="/curation/running" className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                러닝 큐레이션 보기
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

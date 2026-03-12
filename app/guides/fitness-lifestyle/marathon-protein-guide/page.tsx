import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "마라톤 레이스 주간 단백질·탄수화물 전략 | ProteinLab",
  description:
    "훈련일과 레이스 주간은 영양 전략이 다릅니다. 카보 로딩, 회복식, 체크리스트를 러너 관점에서 정리했습니다.",
};

const checklistItems = [
  "탄수화물 로딩 시작 (대회 1~2일 전 8~10g/kg/day)",
  "휴식과 수면 시간 확보",
  "익숙한 음식 위주로 식사 구성",
  "지방·섬유질 과다 섭취 피하기",
  "에너지젤·스포츠 음료·수분 계획 점검",
  "경기 후 단백질 쉐이크 또는 회복식 준비",
];

const timelineRows = [
  ["월~수", "일반 훈련일", "균형 식단 + 충분한 탄수화물 + 평소 단백질 유지"],
  ["목~금", "로딩 시작", "탄수화물 비중 증가, 단백질은 평소 수준 유지"],
  ["토", "휴식·컨디션 조절", "소화 쉬운 식사, 과식 금지, 수분 관리"],
  ["일", "레이스 데이", "출발 전 탄수화물, 경기 후 30~60분 내 탄수화물+단백질"],
];

const macroCards = [
  { title: "훈련일", value: "탄수 55~60%", note: "단백질과 함께 충분한 탄수화물 확보" },
  { title: "카보 로딩일", value: "탄수 60%+", note: "글리코겐 저장을 우선" },
  { title: "레이스 직후", value: "탄수+단백질", note: "회복과 글리코겐 보충 동시 시작" },
];

function MacroCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <article className="rounded-2xl border border-[#eaded7] bg-white p-4 shadow-[0_12px_30px_rgba(111,61,38,0.06)]">
      <p className="text-sm font-semibold text-[#6b3f28]">{title}</p>
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
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">
              운동 · 라이프스타일
            </Link>
            <span>/</span>
            <span>마라톤 영양 전략</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">
              TRACK D
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            훈련일과 레이스 데이 영양은 다르게 가야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            러너는 평소 훈련일과 마라톤 대회 직전, 직후의 영양 전략을 분리해서 봐야 합니다.
            <br />
            레이스 주간에는 탄수화물 로딩이 우선이고, 레이스 후에는 회복식 구성이 핵심입니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#8a4b2f]">RACE WEEK</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">레이스 주간 매크로 전략</h2>
              </div>
              <span className="rounded-full bg-[#fcf1ea] px-3 py-1 text-xs font-semibold text-[#8a4b2f]">
                훈련일과 분리해서 보기
              </span>
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
              마라톤 주간은 훈련 강도와 영양 중점이 함께 바뀝니다. 아래 흐름으로 보면 전체 구조를 빠르게 잡을 수 있습니다.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">시점</th>
                    <th className="px-3 py-3 font-semibold">훈련</th>
                    <th className="px-3 py-3 font-semibold">영양 중점</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
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
                <label
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#eaded7] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] shadow-[0_10px_26px_rgba(111,61,38,0.05)]"
                >
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#d9c8bf] bg-[#fcf1ea] text-[11px] font-bold text-[#8a4b2f]">
                    ✓
                  </span>
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: ACSM et al. (2009), On Running 코리아, 런톡(2024)
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/fitness-lifestyle/sports-nutrition-guide"
                className="inline-flex items-center justify-center rounded-xl border border-[#eaded7] bg-white px-5 py-3 text-sm font-semibold text-[#6b3f28] transition-colors hover:bg-[#fcf1ea]"
              >
                제품 비교와 선택 기준 보기
              </Link>
              <Link
                href="/curation/running"
                className="inline-flex items-center justify-center rounded-xl border border-[#8a4b2f] bg-[#8a4b2f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6f3d26]"
              >
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

import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "마라톤 거리별 영양과 훈련 전략 | 5km·10km·하프·풀 차이 정리",
  description:
    "5km, 10km, 하프, 풀 마라톤까지 거리별 특성에 맞는 훈련 포인트와 단백질 회복 전략을 정리합니다. 레이스 주간 체크리스트는 별도 가이드로 분리해 봅니다.",
};

const distanceRows = [
  ["5km", "고강도와 인터벌 적응", "낮음", "기록 향상과 스피드 유지가 핵심"],
  ["10km", "지구력과 페이스 유지", "중간", "스피드와 지구력을 함께 끌어올리는 구간"],
  ["하프", "롱런과 페이스 적응 비중 증가", "높음", "장거리 적응이 본격적으로 시작되는 단계"],
  ["풀", "지속적 에너지 관리와 회복 최적화", "매우 높음", "장거리 적응과 기록 관리가 모두 중요한 구간"],
];

const distanceCards = [
  { title: "5km 전략", training: ["짧은 인터벌", "강도 훈련", "5km 페이스 적응"], nutritionBefore: "가벼운 탄수화물 보충", nutritionAfter: "운동 후 단백질 20g 전후" },
  { title: "10km 전략", training: ["지구력 러닝", "템포런", "10km 페이스 훈련"], nutritionBefore: "러닝 전 소량 탄수화물 보강", nutritionAfter: "단백질과 탄수화물 조합" },
  { title: "하프 마라톤 전략", training: ["롱런", "레이스 페이스 훈련", "글리코겐 관리"], nutritionBefore: "훈련 전 스포츠음료나 간단한 탄수화물", nutritionAfter: "운동 후 단백질 20~25g" },
  { title: "풀 마라톤 전략", training: ["장거리 롱런", "30km 전후 적응", "주간 회복 관리"], nutritionBefore: "장거리 전 탄수화물 로딩", nutritionAfter: "운동 후 단백질 25~30g" },
];

const proteinReasons = [
  "거리 훈련이 길어질수록 근육 회복 속도가 다음 훈련 적응에 중요해집니다.",
  "장거리 러닝 후에는 전체 피로가 커서 회복 루틴을 빠르게 챙기는 편이 좋습니다.",
  "운동 후 20~30g 단백질 섭취는 회복 루틴을 만들기 위한 가장 실전적인 출발점입니다.",
];

export default function MarathonDistanceStrategyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동 & 라이프스타일</Link>
            <span>/</span>
            <span>마라톤 거리별 영양과 훈련 전략</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">마라톤 거리별 영양과 훈련 전략</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            5km, 10km, 하프, 풀 마라톤은 훈련 목적과 에너지 전략이 서로 다릅니다.
            <br />
            이 페이지는 거리별 훈련과 회복 기준을 나누는 기본편이고, 레이스 주간 카보 로딩과 체크리스트는 별도 페이지에서 보는 흐름에 맞춰 구성했습니다.
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">거리별 적응 특성</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">거리</th>
                    <th className="px-3 py-3 font-semibold">훈련 포인트</th>
                    <th className="px-3 py-3 font-semibold">에너지 부담</th>
                    <th className="px-3 py-3 font-semibold">추천 러너</th>
                  </tr>
                </thead>
                <tbody>
                  {distanceRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, index) => (
                        <td key={cell} className={`px-3 py-3 ${index === 0 ? "whitespace-nowrap font-medium text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">거리별 전략을 한 번에 보기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {distanceCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-base font-semibold text-[#24543d]">{item.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {item.training.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4c9a72]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 rounded-xl border border-[#dce8df] bg-white px-3 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                    <p><span className="font-semibold text-[var(--foreground)]">운동 전</span>{" : "}{item.nutritionBefore}</p>
                    <p className="mt-1"><span className="font-semibold text-[var(--foreground)]">운동 후</span>{" : "}{item.nutritionAfter}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 후 단백질이 중요한 이유</h2>
            <blockquote className="mt-4 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              러닝 후 20~30g 단백질 섭취는 회복, 피로 관리, 다음 훈련 적응을 동시에 챙기기 위한 가장 실전적인 출발점입니다.
            </blockquote>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {proteinReasons.map((item) => (
                <article key={item} className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] p-4 text-sm leading-6 text-[var(--foreground-muted)]">{item}</article>
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">관련 가이드</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/curation/running" className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">러닝용 단백질 제품 보기</Link>
              <Link href="/guides/fitness-lifestyle/marathon-protein-guide" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">레이스 주간 전략 보기</Link>
              <Link href="/guides/product-selection-comparison/protein-drink-guide" className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">단백질 음료 비교 가이드</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

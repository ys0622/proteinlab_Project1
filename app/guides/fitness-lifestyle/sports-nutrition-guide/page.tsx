import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "러너용 단백질 제품 비교와 선택 기준 | ProteinLab",
  description:
    "유청, 식물성, 저당, 고단백 제품까지. 러너가 실제로 제품을 고를 때 보는 기준과 대표 제품 비교를 정리했습니다.",
};

const productRows = [
  ["테이크핏 몬스터", "혼합 (유청+카제인)", "43g", "8.5g", "1.3g", "186kcal", "회복·근육보충"],
  ["뉴케어 올프로틴 41g", "혼합 (락토프리)", "41g", "7.2g", "4g", "210kcal", "회복·근력 증가"],
  ["닥터유 프로 단백질 드링크", "혼합", "40g", "7.5g", "9.8g", "258kcal", "식사대용·회복"],
  ["셀렉스 프로핏", "혼합", "20g", "4.2g", "3g", "125kcal", "저당·가벼운 회복 간식"],
  ["올프로틴 식물성", "식물성", "20g", "-", "5g", "130kcal", "식물성 보충·회복"],
];

const flowCards = [
  {
    title: "회복/근육 증가",
    body: "훈련 후 빠른 회복과 근육 유지가 목표라면 고단백·고BCAA 제품을 우선 봅니다.",
    product: "예: 테이크핏 몬스터",
  },
  {
    title: "저당/체중 관리",
    body: "목표 체중 관리가 필요하다면 저당·적정 단백 제품이 더 부담이 적습니다.",
    product: "예: 셀렉스 프로핏",
  },
  {
    title: "식물성 선호",
    body: "유당 부담이나 식물성 선호가 있다면 식물성 단백질과 저칼로리 조합을 우선 확인합니다.",
    product: "예: 올프로틴 식물성",
  },
];

export default function SportsNutritionGuidePage() {
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
            <span>운동 영양 & 제품 비교</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">
              TRACK D
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            러너는 어떤 단백질 제품을 골라야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            제품 선택은 단순히 단백질 g 수치만 보는 문제가 아닙니다.
            <br />
            단백질 종류, BCAA/류신, 탄수화물, 칼로리, 용도를 함께 봐야 실전에서 실패가 적습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#2d6a4f]">SELECTION FLOW</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">용도별로 고르면 제품 선택이 빨라집니다</h2>
              </div>
              <span className="rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">
                제품 선택 플로우
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {flowCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]"
                >
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                  <p className="mt-3 rounded-full bg-[#eff7f1] px-3 py-1 text-[11px] font-semibold text-[#2d6a4f] inline-flex">
                    {card.product}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">러너용 주요 제품 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 종류, 단백질 g 수치, BCAA/류신, 탄수화물, 칼로리를 함께 보면 용도 구분이 훨씬 명확해집니다.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">제품</th>
                    <th className="px-3 py-3 font-semibold">단백질 종류</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">BCAA/류신</th>
                    <th className="px-3 py-3 font-semibold">탄수</th>
                    <th className="px-3 py-3 font-semibold">열량</th>
                    <th className="px-3 py-3 font-semibold">추천 용도</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row) => (
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

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: ProteinLab 제품 페이지, Witard et al. (2025), ISSN Position Stand (2007)
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">실전 선택 팁</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]">
                <p className="text-sm font-semibold text-[#24543d]">회복이 우선이면</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  고단백·고BCAA 제품이 유리합니다. 훈련 직후 바로 마실 수 있는 RTD 음료가 가장 실전적입니다.
                </p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 shadow-[0_12px_30px_rgba(45,106,79,0.06)]">
                <p className="text-sm font-semibold text-[#24543d]">체중 관리가 우선이면</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  저당·저칼로리 제품을 먼저 보고, 단백질 밀도와 당류를 함께 체크하는 편이 효율적입니다.
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/curation/running"
                className="inline-flex items-center justify-center rounded-xl border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                러닝 큐레이션 보기
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-[#d9e7dc] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                제품 비교 바로 가기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

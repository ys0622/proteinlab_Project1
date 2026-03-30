import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "올리브영 단백질 쉐이크 추천 | 입점 브랜드 비교 | ProteinLab",
  description: "올리브영에서 살 수 있는 단백질 쉐이크를 브랜드별로 정리했습니다. 플라이밀·단백하니·딜라이트 프로젝트 등 성분 기준으로 비교해보세요.",
};

const brandCards = [
  {
    title: "플라이밀",
    tag: "카테고리 1위",
    body: "3년 연속 단백질 쉐이크 1위 브랜드. 피넛버터·초코 등 다양한 맛 라인업. 단백질 24g·당류 1.2g 수준으로 고단백·저당 기준을 충족합니다.",
    specs: "단백질 24g / 당류 1.2g / 칼로리 179kcal",
  },
  {
    title: "단백하니",
    tag: "올영픽",
    body: "2025년 올리브영 올영픽 선정. CJ제일제당·정희원 박사 협업 브랜드. 말차·초코·시그니처 등 맛 선택 폭이 넓습니다.",
    specs: "단백질 22g / 당류 2g / 칼로리 140~155kcal",
  },
  {
    title: "딜라이트 프로젝트",
    tag: "2030 타겟",
    body: "올리브영 입점 브랜드로 2030 여성 타겟. 다이어트·저당 포지션으로 빠르게 인지도를 높이고 있습니다.",
    specs: "성분표 직접 확인 권장",
  },
  {
    title: "빼르빼르",
    tag: "뷰티 브랜드 협업",
    body: "뷰티 브랜드 티르티르의 단백질 쉐이크 라인. 2030 여성 타겟으로 올리브영 중심 유통. 패키징과 브랜드 이미지가 강점입니다.",
    specs: "성분표 직접 확인 권장",
  },
];

const buyingTips = [
  "올리브영 앱에서 단백질 쉐이크로 검색하면 입점 제품을 한번에 볼 수 있습니다.",
  "올리브영 가격은 온라인 단독 구매보다 높을 수 있습니다. 구매 전 쿠팡·공식몰과 비교해보세요.",
  "올영픽 선정 제품은 올리브영 자체 큐레이션 기준을 통과한 제품이지만, 성분 수치는 직접 확인하는 것이 정확합니다.",
  "오프라인 매장에서 직접 보고 사고 싶다면 대형 매장 기준으로 입점 여부를 먼저 확인하세요.",
];

export default function OliveyoungProteinShakePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison" className="hover:text-[var(--accent)]">제품 선택 & 비교</Link>
            <span>/</span>
            <span>올리브영 단백질 쉐이크</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK B</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            올리브영 단백질 쉐이크 추천
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            올리브영에서 구매할 수 있는 단백질 쉐이크 브랜드를 정리했습니다.
            <br />
            브랜드 포지션과 성분 기준을 같이 확인하고 목적에 맞는 제품을 고르세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">올리브영 입점 브랜드</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              입점 현황은 변동될 수 있으니 구매 전 올리브영 앱에서 직접 확인하세요.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {brandCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                    <span className="rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">{card.tag}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                  <p className="mt-2 text-xs font-medium text-[#2d6a4f]">{card.specs}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">올리브영에서 쉐이크 살 때 알아두면 좋은 것</h2>
            <ul className="mt-4 space-y-3">
              {buyingTips.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/product-selection-comparison/flymill-vs-danbaekhani" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                플라이밀 vs 단백하니 비교 →
              </Link>
              <Link href="/guides/product-selection-comparison/protein-shake-guide" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                단백질 쉐이크 추천 가이드 →
              </Link>
              <Link href="/shake" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                쉐이크 전체 비교 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

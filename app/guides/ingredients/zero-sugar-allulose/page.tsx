import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 음료 당류 0g의 뜻 | 알룰로스·스테비아·에리스리톨 해설 | ProteinLab",
  description:
    "단백질 음료에 당류 0g이라고 써 있는데 왜 달까? 알룰로스, 스테비아, 에리스리톨이 영양성분표에서 당류로 집계되지 않는 이유와 다이어트에 미치는 영향을 정리합니다.",
  alternates: {
    canonical: "https://proteinlab.kr/guides/ingredients/zero-sugar-allulose",
  },
};

const sweeteners = [
  {
    title: "알룰로스 (Allulose)",
    tag: "당류 미집계",
    body: "설탕과 구조가 비슷하지만 칼로리가 거의 없고(0~0.4 kcal/g), 국내 식품 표준에서는 당류 함량 집계에서 제외됩니다. 단맛은 설탕의 70% 수준으로 가장 자연스럽고, 단백질 음료에 가장 많이 쓰이는 감미료입니다.",
  },
  {
    title: "에리스리톨 (Erythritol)",
    tag: "당류 미집계",
    body: "당알코올의 일종으로 칼로리가 0에 가깝고(0.2 kcal/g), 혈당을 거의 올리지 않습니다. 국내 기준에서 당류로 집계되지 않으며, 단백질 바나 쉐이크에서 자주 사용됩니다.",
  },
  {
    title: "스테비아 (Stevia)",
    tag: "당류 0",
    body: "스테비아 잎에서 추출한 천연 감미료로 설탕보다 200~300배 달지만 칼로리가 없습니다. 소량만 사용해도 충분한 단맛을 내기 때문에 당류 0g 제품에 많이 쓰입니다.",
  },
  {
    title: "수크랄로스 (Sucralose)",
    tag: "인공 감미료",
    body: "설탕에서 유래한 인공 감미료로 설탕보다 600배 달고 칼로리가 없습니다. 열에 안정적이어서 다양한 가공식품에 사용되며, 당류로 집계되지 않습니다.",
  },
];

const labelReadingPoints = [
  {
    title: "영양성분표 당류 항목을 먼저 확인",
    body: "당류 0g 또는 1g 이하라면 위 감미료를 쓴 제품일 가능성이 높습니다. 성분란 하단의 원재료명에서 알룰로스, 에리스리톨, 스테비아 등의 표기를 확인하면 어떤 감미료를 썼는지 알 수 있습니다.",
  },
  {
    title: "칼로리도 같이 확인",
    body: "당류가 0이어도 단백질·지방에서 칼로리가 나옵니다. 다이어트 목적이라면 당류뿐 아니라 총 칼로리를 함께 봐야 실제 섭취량을 정확하게 파악할 수 있습니다.",
  },
  {
    title: "단맛의 강도는 감미료 종류에 따라 다름",
    body: "같은 당류 0g이어도 알룰로스를 쓴 제품과 수크랄로스를 쓴 제품은 단맛 느낌이 다릅니다. 단맛이 부담스럽다면 원재료명에서 감미료 종류를 확인하고 선택하는 것이 실용적입니다.",
  },
];

const commonQuestions = [
  {
    q: "당류 0g이면 혈당에 영향이 없나요?",
    a: "알룰로스와 에리스리톨은 혈당을 거의 올리지 않는 것으로 알려져 있습니다. 다만 개인차가 있고 다른 성분(단백질, 지방)도 혈당에 영향을 줄 수 있어 절대적인 기준으로 보기는 어렵습니다.",
  },
  {
    q: "알룰로스가 들어간 제품은 안전한가요?",
    a: "알룰로스는 미국 FDA와 국내 식품의약품안전처에서 식품 원료로 허가된 성분입니다. 다량 섭취 시 소화 불편이 생길 수 있다는 보고가 있어 과다 섭취는 주의가 필요합니다.",
  },
  {
    q: "당류 0g 제품이 일반 제품보다 무조건 더 좋은가요?",
    a: "다이어트나 혈당 관리가 목적이라면 유리한 선택일 수 있습니다. 단, 맛이나 식감이 차이날 수 있어 개인 취향과 목적에 맞게 선택하는 것이 맞습니다.",
  },
];

export default function ZeroSugarAllulosePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/ingredients">성분 · 원료</Link>
            <span>/</span>
            <span>당류 0g과 알룰로스</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#fdf3e7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#a05c1a]">
              성분 해설
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료에 당류 0g인데 왜 달까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료 성분표에 당류 0g이라고 써 있는데도 달콤한 이유가 있습니다.
            알룰로스·스테비아·에리스리톨 같은 감미료가 당류로 집계되지 않기 때문입니다.
            어떤 감미료가 쓰이는지, 다이어트에 어떤 의미인지 정리합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">

          {/* 빠른 이동 */}
          <section className="grid gap-3 md:grid-cols-3">
            <Link
              href="/?curation=zero-sugar"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">당류 0g 단백질 음료 비교</p>
              <p className="mt-1">당류가 낮은 단백질 음료를 성분 기준으로 바로 비교합니다.</p>
            </Link>
            <Link
              href="/guides/product-selection-comparison/low-sugar-protein-drink-guide"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">저당 단백질 음료 선택 가이드</p>
              <p className="mt-1">당류 낮은 제품을 고를 때 함께 봐야 할 기준을 정리합니다.</p>
            </Link>
            <Link
              href="/guides/product-selection-comparison/diet-protein-drink-guide"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">다이어트 단백질 음료 기준</p>
              <p className="mt-1">체중 관리 목적에서 칼로리·당류·단백질 밀도를 보는 순서를 정리합니다.</p>
            </Link>
          </section>

          {/* 핵심 요약 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">핵심 요약</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {[
                "단백질 음료의 당류 0g은 일반 설탕 대신 알룰로스·에리스리톨·스테비아 같은 감미료를 사용했기 때문입니다.",
                "이 감미료들은 국내 식품 표준에서 당류 집계에서 제외되거나 0으로 처리됩니다.",
                "혈당 영향이 거의 없는 것으로 알려져 있어 다이어트·혈당 관리 목적 제품에 많이 쓰입니다.",
                "당류가 0이어도 칼로리는 단백질·지방에서 발생하므로, 칼로리도 함께 확인해야 합니다.",
              ].map((item) => (
                <li key={item} className="rounded-xl border border-[#dce8df] bg-white px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 감미료 종류 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 음료에 쓰이는 감미료 종류</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              원재료명 칸에서 직접 확인할 수 있습니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {sweeteners.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                    <span className="rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* 성분표 읽는 법 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 음료 성분표에서 확인하는 법</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {labelReadingPoints.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-5 space-y-3">
              {commonQuestions.map((item) => (
                <article key={item.q} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">Q. {item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.a}</p>
                </article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f4faf6] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">당류 0g 단백질 음료 성분 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab에서 당류가 낮은 단백질 음료를 단백질 함량, 칼로리, 단백질 밀도 기준으로 바로 비교해보세요.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/?curation=zero-sugar"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-[#24543d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e4735]"
              >
                당류 0g 단백질 음료 비교
              </Link>
              <Link
                href="/guides/product-selection-comparison/low-sugar-protein-drink-guide"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                저당 단백질 음료 선택 가이드
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "BCAA란 무엇인가 | 단백질 음료·쉐이크에서 BCAA의 역할 | ProteinLab",
  description:
    "BCAA(류신·이소류신·발린)가 근육 합성과 회복에 어떻게 작용하는지, 단백질 음료와 쉐이크에서 BCAA를 따로 볼 필요가 있는지 정리합니다.",
  alternates: {
    canonical: "https://proteinlab.kr/guides/ingredients/bcaa-guide",
  },
};

const bcaaTypes = [
  {
    title: "류신 (Leucine)",
    role: "근육 합성 신호 핵심",
    body: "세 가지 BCAA 중 근육 단백질 합성을 자극하는 효과가 가장 강합니다. 운동 후 근육 회복에서 류신 섭취가 특히 중요하게 다뤄집니다. 유청 단백질에 풍부하게 함유되어 있습니다.",
  },
  {
    title: "이소류신 (Isoleucine)",
    role: "에너지 대사·혈당 조절 보조",
    body: "포도당 흡수와 에너지 대사를 돕는 역할을 합니다. 근육 내 글리코겐 회복에 관여하며, 지구력 운동 후 에너지 보충에도 작용합니다.",
  },
  {
    title: "발린 (Valine)",
    role: "피로 억제·조직 회복",
    body: "운동 중 피로를 줄이는 데 관여하는 것으로 알려져 있습니다. 근육 조직 회복에 류신·이소류신과 함께 작용하며 세 BCAA 중 섭취 비중이 가장 낮습니다.",
  },
];

const inProductPoints = [
  {
    title: "유청단백질(WPI·WPC)에 이미 포함",
    body: "단백질 음료에 사용되는 유청단백질(WPI·WPC)은 자연적으로 BCAA 함량이 높습니다. 별도로 BCAA를 추가하지 않아도 20~25g의 유청단백질이면 충분한 BCAA를 섭취할 수 있습니다.",
  },
  {
    title: "추가 BCAA 표기 제품",
    body: "일부 단백질 음료·쉐이크는 원재료명에 '분지사슬아미노산' 또는 'BCAA'를 별도 표기합니다. 마케팅 목적인 경우가 많으며, 단백질 함량이 충분하다면 추가 BCAA의 효과 차이는 크지 않습니다.",
  },
  {
    title: "콜라겐 단백질과의 차이",
    body: "콜라겐 단백질은 BCAA 함량이 매우 낮습니다. 피부·관절에는 도움이 될 수 있지만 근육 합성 목적이라면 유청단백질을 우선으로 봐야 합니다.",
  },
];

const intakeGuide = [
  {
    step: "운동 전",
    title: "에너지 공급 보조",
    body: "운동 전 BCAA 섭취는 근육 분해(카타볼리즘)를 억제하는 데 도움이 될 수 있습니다. 공복 운동 시 효과가 더 두드러집니다.",
  },
  {
    step: "운동 중",
    title: "피로 억제",
    body: "장시간 운동 중 BCAA를 보충하면 중추 피로를 억제하는 효과가 있다는 연구가 있습니다. 주로 마라톤·사이클 등 지구력 운동에서 언급됩니다.",
  },
  {
    step: "운동 후",
    title: "근육 합성 자극",
    body: "운동 후 30분~1시간 내 단백질과 함께 BCAA를 섭취하면 근육 단백질 합성(MPS)이 효과적으로 자극됩니다. 유청단백질 제품을 섭취하면 BCAA를 별도로 추가하지 않아도 됩니다.",
  },
];

export default function BcaaGuidePage() {
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
            <span>BCAA란 무엇인가</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#fdf3e7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#a05c1a]">
              성분 해설
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            BCAA란 무엇이고 단백질 음료에서 어떤 의미일까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            BCAA는 류신·이소류신·발린 세 가지 필수 아미노산의 총칭입니다.
            근육 합성과 회복에 중요한 역할을 하지만, 단백질 음료에서 BCAA를 따로 봐야 할 필요가 있는지는
            제품의 단백질 원료에 달려 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">

          {/* 빠른 이동 */}
          <section className="grid gap-3 md:grid-cols-3">
            <Link
              href="/?curation=high-protein"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">고단백 단백질 음료 비교</p>
              <p className="mt-1">BCAA 함량이 높은 고단백 제품을 성분 기준으로 바로 비교합니다.</p>
            </Link>
            <Link
              href="/shake?curation=shake-high-protein"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">고단백 단백질 쉐이크 비교</p>
              <p className="mt-1">단백질 20g 이상 쉐이크를 성분 기준으로 한 번에 비교합니다.</p>
            </Link>
            <Link
              href="/guides/intake-strategy-health/post-workout-protein"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">운동 후 단백질 섭취 전략</p>
              <p className="mt-1">운동 후 언제, 얼마나 먹는지 섭취 타이밍 기준을 정리합니다.</p>
            </Link>
          </section>

          {/* 핵심 요약 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">핵심 요약</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {[
                "BCAA = 류신 + 이소류신 + 발린. 체내에서 합성되지 않는 필수 아미노산입니다.",
                "근육 단백질 합성(MPS) 자극, 근육 분해 억제, 운동 피로 억제에 관여합니다.",
                "유청단백질(WPI·WPC)을 원료로 한 단백질 음료에는 BCAA가 이미 충분히 포함되어 있습니다.",
                "BCAA를 별도로 강조한 제품이라도, 단백질 총량이 충분하면 추가 효과 차이는 크지 않습니다.",
                "콜라겐 단백질은 BCAA가 부족해 근육 합성 목적으로는 유청단백질보다 효율이 낮습니다.",
              ].map((item) => (
                <li key={item} className="rounded-xl border border-[#dce8df] bg-white px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* BCAA 세 가지 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">BCAA 세 가지 아미노산의 역할</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {bcaaTypes.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <span className="mt-1 inline-block rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">
                    {item.role}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* 단백질 음료에서 BCAA */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 음료·쉐이크에서 BCAA를 어떻게 볼까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {inProductPoints.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <blockquote className="mt-4 rounded-xl border border-[#dce8df] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              실용적인 기준: 유청단백질 기반 제품에서 단백질 20g 이상이 확보되어 있다면, BCAA 별도 표기 여부보다 단백질 총량과 당류·칼로리를 먼저 보는 것이 더 합리적인 비교입니다.
            </blockquote>
          </section>

          {/* 섭취 타이밍 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 타이밍별 BCAA의 역할</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {intakeGuide.map((item) => (
                <article key={item.step} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#2d6a4f]">{item.step}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* 관련 가이드 + CTA */}
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f4faf6] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">BCAA가 풍부한 단백질 제품 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              유청단백질 기반 고단백 제품에서 단백질 함량, 당류, 칼로리를 성분 기준으로 직접 비교해보세요.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/?curation=high-protein"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-[#24543d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e4735]"
              >
                고단백 단백질 음료 비교
              </Link>
              <Link
                href="/shake?curation=shake-high-protein"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                고단백 쉐이크 비교
              </Link>
              <Link
                href="/guides/intake-strategy-health/post-workout-protein"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                운동 후 섭취 전략
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

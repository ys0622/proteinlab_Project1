import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import drinkProductsData from "@/app/data/drinkProductsData.json";
import type { ProductDetailProps } from "@/app/data/products";

const pageTitle = "단백질 음료 50g 이상 추천 비교 | 52g 초고함량 제품까지";
const pageDescription =
  "ProteinLab DB 기준 단백질 50g 이상 RTD 제품과 49g·45g 고함량 제품을 함께 비교하고, 60g대 제품은 스펙 확인 전까지 어떻게 봐야 하는지 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/high-protein-50g-comparison";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: pageTitle,
    description: pageDescription,
  },
};

const drinks = drinkProductsData as ProductDetailProps[];

function density(product: ProductDetailProps) {
  const volume = Number(String(product.capacity ?? "").replace(/[^0-9.]/g, ""));
  if (!volume || !product.proteinPerServing) return "-";
  return `${((product.proteinPerServing / volume) * 100).toFixed(1)}g/100mL`;
}

const mainProducts = drinks
  .filter((product) => (product.proteinPerServing ?? 0) >= 50)
  .sort((a, b) => (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0));

const nearProducts = drinks
  .filter((product) => (product.proteinPerServing ?? 0) >= 45 && (product.proteinPerServing ?? 0) < 50)
  .sort((a, b) => (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0));

const rows = [...mainProducts, ...nearProducts].map((product) => ({
  slug: product.slug,
  brand: product.brand,
  name: product.name,
  protein: `${product.proteinPerServing ?? "-"}g`,
  capacity: product.capacity ?? "-",
  calories: product.calories != null ? `${product.calories}kcal` : "-",
  sugar: product.sugar != null ? `${product.sugar}g` : "-",
  density: density(product),
}));

const checkpoints = [
  {
    title: "50g 이상은 매일용보다 목적형에 가깝습니다",
    body: "한 병으로 단백질을 크게 채우는 장점이 있지만, 운동량·하루 총량·식사 구성까지 같이 봐야 과잉 보충을 피할 수 있습니다.",
  },
  {
    title: "52g은 총량이 강하지만 밀도와 칼로리도 같이 봐야 합니다",
    body: "랩노쉬 프로틴 드링크 맥스는 현재 DB 기준 50g 이상 구간의 핵심 제품입니다. 다만 40g대 제품보다 무조건 낫다고 보기보다 섭취 목적을 먼저 정해야 합니다.",
  },
  {
    title: "60g 제품은 스펙 확인 전까지 추천 목록에 넣지 않습니다",
    body: "60g대 제품 흐름은 확인되지만, 영양성분표와 용량이 확정되지 않으면 칼로리·당류·단백질 밀도를 계산할 수 없어 등록을 보류하는 편이 안전합니다.",
  },
];

const useCases = [
  ["근력 운동 직후", "50g 이상 후보 검토 가능", "운동량이 크고 하루 단백질 목표가 높은 경우라면 한 병 보충 효율이 의미 있습니다."],
  ["일반적인 아침 대용", "20~30g대 우선", "공복에 50g 이상을 매일 마시면 소화감과 칼로리 부담이 커질 수 있습니다."],
  ["체중 관리 중", "저당·저칼로리 우선", "총량보다 지속 가능성이 중요합니다. 50g 이상은 목적이 분명할 때만 보는 편이 낫습니다."],
  ["하루 단백질 부족분 보완", "부족분 계산 후 선택", "식사에서 이미 충분히 먹었다면 50g 제품은 과잉이 될 수 있습니다."],
];

const sourceLinks = [
  {
    label: "랩노쉬 52g 프로틴 드링크 맥스 출시 보도",
    href: "https://v.daum.net/v/uwPGmpkLjN",
  },
  {
    label: "단백질 음료 50g대 고함량 경쟁 보도",
    href: "https://www.inews24.com/view/1963255",
  },
];

export default function HighProtein50gComparisonPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison" className="hover:text-[var(--accent)]">제품 선택 & 비교</Link>
            <span>/</span>
            <span>50g 이상 단백질 음료</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">TRACK B</span>
            <span className="rounded-md bg-[#f2f6fa] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">초고함량 비교</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-05-29</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료 50g 이상,
            <br />
            이제 40g대와 따로 봐야 합니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            2026년에는 40g대 고단백 RTD를 넘어 52g 제품까지 등장하면서 검색 의도가 50g대 초고함량으로 넓어졌습니다.
            현재 ProteinLab DB에서는 랩노쉬 프로틴 드링크 맥스 52g이 50g 이상 구간의 대표 제품이고, 49g·45g 제품은 비교 기준선으로 함께 보는 편이 정확합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#d9e4f0] bg-[#f7f9fc] px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">핵심 판단</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {checkpoints.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#d9e4f0] bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#314f68]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">50g 이상 및 45g 이상 비교표</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              50g 이상 제품만 보면 후보가 좁기 때문에, 실제 선택에서는 바로 아래 구간인 49g·45g 제품까지 같이 보는 편이 좋습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e8edf3] bg-[#f7f9fc]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#dce5ef] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">제품</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">용량</th>
                    <th className="px-3 py-3 font-semibold">밀도</th>
                    <th className="px-3 py-3 font-semibold">칼로리</th>
                    <th className="px-3 py-3 font-semibold">당류</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.slug} className="border-b border-[#eef2f6] last:border-b-0">
                      <td className="px-3 py-3">
                        <Link href={`/product/${row.slug}`} className="font-medium text-[#314f68] hover:underline">
                          {row.brand} {row.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.protein}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.capacity}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.density}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.calories}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.sugar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">누가 50g 이상을 보면 좋을까</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e8edf3] bg-[#f7f9fc]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#dce5ef] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">판단</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {useCases.map((row) => (
                    <tr key={row[0]} className="border-b border-[#eef2f6] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-[#fdfaf5] px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">60g 제품은 왜 아직 등록하지 않았나</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              60g대 제품이 시장에 보이더라도 영양성분표, 용량, 칼로리, 당류, 지방, 나트륨이 확인되지 않으면 DB에 넣지 않는 편이 맞습니다.
              ProteinLab의 비교표는 단백질 총량만 보여주는 것이 아니라 100mL당 단백질 밀도와 칼로리 부담까지 같이 계산하기 때문입니다.
              스펙 이미지가 확보되면 60g 제품은 이 페이지의 최상단 후보군으로 별도 반영할 수 있습니다.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이어 읽기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Link href="/guides/product-selection-comparison/high-protein-40g-comparison" className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#314f68]">40g 이상 제품과 비교</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">50g 이상이 부담스럽다면 40~49g 구간까지 같이 보는 편이 현실적입니다.</p>
              </Link>
              <Link href="/guides/intake-strategy-health/protein-50g-at-once" className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#314f68]">50g 한 번에 먹어도 될까</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">제품 비교 전에 섭취량 자체가 내 상황에 맞는지 먼저 확인합니다.</p>
              </Link>
              <Link href="/picks/high-protein" className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#314f68]">초고단백 Picks</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">30g 이상 제품을 한 번에 모아보고 싶다면 Picks 목록이 빠릅니다.</p>
              </Link>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자료 출처</h2>
            <div className="mt-4 space-y-3">
              {sourceLinks.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer noopener" className="block rounded-xl border border-[#d9e4f0] bg-[#f7f9fc] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-white">
                  {item.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <GuideBuySection />
      <Footer />
    </div>
  );
}

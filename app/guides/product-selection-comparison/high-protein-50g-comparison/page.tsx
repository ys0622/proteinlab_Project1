import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import TrackedLink from "@/app/components/TrackedLink";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import drinkProductsData from "@/app/data/drinkProductsData.json";
import type { ProductDetailProps } from "@/app/data/products";

const pageTitle = "단백질 음료 50g 이상 비교 | 52g 초고함량 제품까지";
const pageDescription =
  "ProteinLab DB 기준 단백질 50g 이상 RTD 제품과 45g 이상 고함량 후보를 함께 비교합니다. 단백질 총량, 칼로리, 당류, 용량 기준으로 초고함량 제품을 고를 때의 판단 기준을 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/high-protein-50g-comparison";
const contentId = "guide:high-protein-50g-comparison";

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

const focusProducts = [
  {
    href: "/product/takefit-extreme-450",
    productId: "takefit-extreme-450",
    title: "테이크핏 익스트림",
    body: "ProteinLab DB 기준 단백질 60g 구간 후보입니다. 총량은 높지만 칼로리와 섭취 목적을 함께 확인해야 합니다.",
  },
  {
    href: "/product/labnosh-protein-max-choco-400",
    productId: "labnosh-protein-max-choco-400",
    title: "랩노쉬 프로틴 맥스 초코",
    body: "단백질 52g 제품군으로, 초고함량 RTD를 찾는 사용자가 먼저 비교하는 대표 후보입니다.",
  },
  {
    href: "/product/hymune-ultra-400",
    productId: "hymune-ultra-400",
    title: "하이뮨 울트라",
    body: "50g에 가까운 고함량 후보로, 50g 이상 제품이 과한지 판단할 때 함께 비교하기 좋습니다.",
  },
];

const checkpoints = [
  {
    title: "50g 이상은 매일용보다 목적형에 가깝습니다",
    body: "한 병으로 단백질을 크게 채우는 장점은 있지만, 운동량·하루 총량·식사 구성을 같이 봐야 과한 보충을 피할 수 있습니다.",
  },
  {
    title: "총량이 높을수록 칼로리와 당류도 같이 봐야 합니다",
    body: "단백질 숫자만 보면 좋아 보일 수 있지만 밤 시간대나 체중 관리 중에는 열량, 당류, 용량 부담이 선택을 바꿀 수 있습니다.",
  },
  {
    title: "40g대 제품도 실제 대안이 될 수 있습니다",
    body: "50g 이상 제품이 부담스럽다면 45~49g 제품이나 40g대 제품까지 함께 비교하는 편이 선택 폭을 넓힙니다.",
  },
];

const useCases = [
  ["근력 운동 직후", "50g 이상 후보 검토 가능", "운동량이 크고 하루 단백질 목표가 높다면 한 병 보충 효율이 의미 있을 수 있습니다."],
  ["일반적인 아침 대용", "20~30g대 우선", "공복에 50g 이상을 매일 마시면 소화감과 칼로리 부담이 커질 수 있습니다."],
  ["체중 관리 중", "저당·칼로리 우선", "초고함량보다 지속 가능성이 중요합니다. 총량은 목적이 분명할 때만 높이는 편이 좋습니다."],
  ["하루 단백질 부족분 보완", "부족분 계산 후 선택", "식사에서 이미 충분히 먹었다면 50g 이상 제품은 과한 선택이 될 수 있습니다."],
];

const sourceLinks = [
  {
    label: "랩노쉬 52g 프로틴 드링크 맥스 출시 보도",
    href: "https://v.daum.net/v/uwPGmpkLjN",
  },
  {
    label: "단백질 음료 고함량 경쟁 관련 보도",
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
            <Link href="/guides/product-selection-comparison" className="hover:text-[var(--accent)]">제품 선택·비교</Link>
            <span>/</span>
            <span>50g 이상 단백질 음료</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">TRACK B</span>
            <span className="rounded-md bg-[#f2f6fa] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">초고함량 비교</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-07-20</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료 50g 이상,
            <br />
            단백질 숫자보다 목적을 먼저 봐야 합니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            초고함량 제품은 한 번에 단백질을 많이 채울 수 있지만 누구에게나 정답은 아닙니다. 운동량, 하루 총 단백질 목표, 당류와 칼로리 부담을 함께 확인해야 실제 구매 실패를 줄일 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="border-y border-[#d9e4f0] py-5">
            <h2 className="text-lg font-bold text-[var(--foreground)]">핵심 결론</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              50g 이상 제품은 고강도 운동 후 보충이나 하루 단백질 부족분이 큰 경우에 우선 검토하세요. 일상용이라면 20~40g대 제품이 더 맞을 수 있습니다.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TrackedLink href="/guides/product-selection-comparison/high-protein-40g-comparison" trackingLabel="40g 이상 제품 비교" trackingSection="high_protein_50g_hero" trackingPageType="guide" contentId={contentId} linkPosition="hero" ctaType="compare" className="rounded-full border border-[#d9e4f0] px-4 py-2 text-sm font-semibold text-[#314f68] hover:bg-[#f7f9fc]">
                40g 이상 제품도 비교
              </TrackedLink>
              <TrackedLink href="/drinks" trackingLabel="단백질 음료 전체 보기" trackingSection="high_protein_50g_hero" trackingPageType="guide" contentId={contentId} linkPosition="hero" ctaType="all_products" className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                단백질 음료 전체 보기
              </TrackedLink>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#d9e4f0] bg-[#f7f9fc] px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">먼저 확인할 초고함량 후보</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {focusProducts.map((item) => (
                <TrackedLink key={item.href} href={item.href} trackingLabel={`${item.title} 상세 보기`} trackingSection="high_protein_50g_focus_products" trackingPageType="guide" contentId={contentId} productId={item.productId} linkPosition="mid_content" ctaType="product_detail" className="rounded-2xl border border-[#d9e4f0] bg-white p-4 transition-colors hover:bg-[#fbfdff]">
                  <h3 className="text-sm font-semibold text-[#314f68]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                  <span className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)]">제품 상세 보기</span>
                </TrackedLink>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">판단 기준</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {checkpoints.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4">
                  <h3 className="text-sm font-semibold text-[#314f68]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">50g 이상과 45g 이상 제품 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              50g 이상 제품만 보면 후보가 좁습니다. 실제 선택에서는 45~49g 제품까지 함께 보면 총량과 부담 사이의 균형을 잡기 쉽습니다.
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

          <section className="rounded-[28px] border border-[#d9e4f0] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(32,46,68,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이어 읽기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <TrackedLink href="/guides/product-selection-comparison/high-protein-40g-comparison" trackingLabel="40g 이상 제품 비교" trackingSection="high_protein_50g_related" trackingPageType="guide" contentId={contentId} linkPosition="bottom_cta" ctaType="compare" className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#314f68]">40g 이상 제품과 비교</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">50g 이상이 부담스럽다면 40~49g 구간까지 같이 보는 편이 현실적입니다.</p>
              </TrackedLink>
              <TrackedLink href="/guides/intake-strategy-health/protein-50g-at-once" trackingLabel="50g 한번에 먹어도 될까" trackingSection="high_protein_50g_related" trackingPageType="guide" contentId={contentId} linkPosition="bottom_cta" ctaType="related_products" className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#314f68]">50g을 한 번에 먹어도 될까</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">제품 비교 전에 섭취량 자체가 내 상황에 맞는지 먼저 확인합니다.</p>
              </TrackedLink>
              <TrackedLink href="/picks/high-protein" trackingLabel="고단백 Picks 보기" trackingSection="high_protein_50g_related" trackingPageType="guide" contentId={contentId} linkPosition="bottom_cta" ctaType="ranking" className="rounded-2xl border border-[#d9e4f0] bg-[#f7f9fc] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#314f68]">고단백 Picks</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">30g 이상 제품을 빠르게 모아 보고 싶을 때 이어서 확인합니다.</p>
              </TrackedLink>
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

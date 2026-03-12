import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { barProductsWithGrades, mockProducts } from "../../data/products";

export const metadata = {
  title: "러닝 후 단백질 음료 추천 | ProteinLab",
  description:
    "러닝과 마라톤 후 회복에 적합한 단백질 음료와 단백질 바를 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 비교합니다.",
};

function getDensityValue(density: string): number {
  const match = density.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

function isDensityBOrBetter(gradeTags?: string[]) {
  return gradeTags?.some((tag) => tag.startsWith("밀도 A") || tag.startsWith("밀도 B")) ?? false;
}

const runningDrinks = mockProducts.filter(
  (product) =>
    product.productType !== "bar" &&
    product.proteinPerServing >= 15 &&
    product.proteinPerServing <= 25 &&
    (product.sugar ?? 999) <= 10 &&
    isDensityBOrBetter(product.gradeTags),
);

const runningBars = barProductsWithGrades.filter(
  (product) =>
    product.productType === "bar" &&
    product.proteinPerServing >= 10 &&
    product.proteinPerServing <= 20 &&
    (product.sugar ?? 999) <= 10,
);

const recommendedRunningDrinks = [...runningDrinks]
  .sort((a, b) => {
    const waterBonusA = a.drinkType === "워터형" ? 1 : 0;
    const waterBonusB = b.drinkType === "워터형" ? 1 : 0;
    if (waterBonusA !== waterBonusB) return waterBonusB - waterBonusA;

    const densityDelta = getDensityValue(b.density) - getDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = b.proteinPerServing - a.proteinPerServing;
    if (proteinDelta !== 0) return proteinDelta;

    return (a.sugar ?? 999) - (b.sugar ?? 999);
  })
  .slice(0, 6);

const recommendedRunningBars = [...runningBars]
  .sort((a, b) => {
    const sugarDelta = (a.sugar ?? 999) - (b.sugar ?? 999);
    if (sugarDelta !== 0) return sugarDelta;

    const densityDelta = getDensityValue(b.density) - getDensityValue(a.density);
    if (densityDelta !== 0) return densityDelta;

    const proteinDelta = b.proteinPerServing - a.proteinPerServing;
    if (proteinDelta !== 0) return proteinDelta;

    return (a.calories ?? 999) - (b.calories ?? 999);
  })
  .slice(0, 6);

const recommendationBullets = [
  "러닝과 같은 유산소 운동 후에는 근육 회복과 에너지 보충이 필요합니다.",
  "적절한 단백질 섭취는 운동 후 근육 손상 회복에 도움이 될 수 있습니다.",
  "러너가 단백질 제품을 선택할 때는 단백질 함량, 당류, 칼로리, 단백질 밀도가 중요합니다.",
  "ProteinLab에서는 이 데이터를 기준으로 러닝에 적합한 제품을 큐레이션합니다.",
];

const criteriaBullets = [
  "단백질 음료: 단백질 15g 이상, 25g 이하, 당류 10g 이하, 단백질 밀도 B 이상",
  "단백질 바: 단백질 10g 이상, 20g 이하, 당류가 낮은 제품",
  "우선 추천 제품 유형: 워터형 단백질 음료, 가벼운 RTD 단백질 음료, 소화 부담이 낮은 단백질 바",
  "정렬 기준: 단백질 밀도, 단백질 함량, 당류",
];

const guideLinks = [
  {
    href: "/guides/running/basics",
    title: "러너에게 좋은 단백질 선택 기준",
    description: "러닝 후 회복과 일상 보충에 맞는 단백질 기준을 정리한 가이드입니다.",
  },
  {
    href: "/guides/running/race-week",
    title: "러닝 후 단백질 섭취 타이밍",
    description: "훈련 직후와 레이스 전후에 어떤 방식으로 단백질을 보충할지 확인하세요.",
  },
];

export default function RunningCurationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="relative w-full border-b border-t"
        style={{
          background: "var(--hero-bg)",
          borderColor: "var(--hero-border)",
          paddingTop: "16px",
          paddingBottom: "20px",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <nav className="mb-3 text-sm text-[var(--foreground-muted)]">
            <Link href="/" className="hover:text-[var(--accent)]">
              단백질 음료
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">러닝 큐레이션</span>
          </nav>

          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            러닝 후 단백질 음료 추천
          </h1>

          <div className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
            <p>
              러닝이나 마라톤 후에는
              <br />
              근육 회복과 에너지 보충이 중요합니다.
            </p>
            <p>
              ProteinLab에서는
              <br />
              단백질 함량, 당류, 칼로리, 단백질 밀도 데이터를 기준으로
              <br />
              러닝 후 회복에 적합한 단백질 음료와 단백질 바를 비교할 수 있습니다.
            </p>
            <p className="font-medium text-[var(--foreground)]">
              러너에게 적합한 단백질 제품을 데이터 기준으로 확인하세요.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-2 pt-3 md:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div
            className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="text-xs font-semibold text-[var(--foreground)]">러닝 설명</h2>
            <ul className="mt-1.5 space-y-1">
              {recommendationBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 text-xs leading-snug text-[var(--foreground-muted)]"
                >
                  <span className="mt-px shrink-0 text-[var(--accent)]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="text-xs font-semibold text-[var(--foreground)]">제품 큐레이션 기준</h2>
            <ul className="mt-1.5 space-y-1">
              {criteriaBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 text-xs leading-snug text-[var(--foreground-muted)]"
                >
                  <span className="mt-px shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">
            러너에게 추천하는 단백질 음료
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
            {recommendedRunningDrinks.map((product) => (
              <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">
            러너에게 추천하는 단백질 바
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
            {recommendedRunningBars.map((product) => (
              <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-2 text-lg font-bold text-[var(--foreground)]">
            러닝에 적합한 단백질 음료 비교
          </h2>
          <p className="mb-4 text-sm text-[var(--foreground-muted)]">
            총 <span className="font-semibold text-[var(--foreground)]">{runningDrinks.length}</span>개 제품
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3" aria-label="러닝 단백질 음료 목록">
            {runningDrinks.map((product) => (
              <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-2 text-lg font-bold text-[var(--foreground)]">
            러닝에 적합한 단백질 바 비교
          </h2>
          <p className="mb-4 text-sm text-[var(--foreground-muted)]">
            총 <span className="font-semibold text-[var(--foreground)]">{runningBars.length}</span>개 제품
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3" aria-label="러닝 단백질 바 목록">
            {runningBars.map((product) => (
              <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
            ))}
          </div>
        </section>

        <section
          className="mt-10 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3"
          style={{ borderRadius: "12px" }}
        >
          <h2 className="text-xs font-semibold text-[var(--foreground)]">러닝 가이드</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {guideLinks.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-xl border border-[#e8e6e3] bg-white px-4 py-3 transition-colors hover:bg-[var(--accent-light)]"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{guide.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--foreground-muted)]">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg border border-[var(--accent)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-light)]"
          >
            단백질 음료 전체 보기
          </Link>
          <Link
            href="/bars"
            className="rounded-lg border border-[#e2e2e2] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-light)]"
          >
            단백질 바 전체 보기
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

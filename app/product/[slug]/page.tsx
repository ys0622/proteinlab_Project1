import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminQuickEdit from "../../components/AdminQuickEdit";
import BackButton from "../../components/BackButton";
import CompareButton from "../../components/CompareButton";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NutritionDetailSection from "../../components/NutritionDetailSection";
import ProductReviewSection from "../../components/ProductReviewSection";
import PurchaseLinkRow from "../../components/PurchaseLinkRow";
import { getNutritionDetail, getProductBySlug } from "../../data/products";
import { getProductImageUrl } from "../../lib/productImage";
import {
  getOfficialMallUrl,
  getNaverSearchUrl,
  getPreferredCoupangUrl,
} from "../../lib/purchaseLinks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "제품을 찾을 수 없음 | ProteinLab" };
  }

  const kind = product.productType === "bar" ? "단백질바" : "단백질 음료";

  return {
    title: `${product.brand} ${product.name} | ProteinLab`,
    description: `${product.brand} ${product.name} ${kind} 상세 정보`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const gradeLabels = product.gradeTags ?? ["단백질 A", "다이어트 B", "퍼포먼스 B"];
  const gradeDescs = product.gradeDescriptions ?? ["-", "-", "-"];
  const isBar = product.productType === "bar";
  const productImageUrl = getProductImageUrl(product.slug);
  const metaParts = [
    product.manufacturer,
    product.capacity,
    product.variant && product.variant !== "일반" ? product.variant : null,
  ].filter(Boolean);
  const metaLine = metaParts.join(" ");

  const coupangHref = getPreferredCoupangUrl(product.brand, product.name, product.productUrl);
  const naverHref = getNaverSearchUrl(product.brand, product.name);
  const officialMallHref = getOfficialMallUrl(product.brand);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-b border-t bg-[#EFEDE6]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <div className="flex items-center justify-between">
            <BackButton />
            <AdminQuickEdit slug={slug} />
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
            <div className="w-full flex-shrink-0 lg:max-w-[300px]">
              <div
                className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-[#e8e6e3] bg-white min-h-[260px] sm:min-h-[280px] lg:min-h-0 lg:h-full"
                style={{ borderRadius: "16px" }}
              >
                {productImageUrl ? (
                  <Image
                    src={productImageUrl}
                    alt={`${product.brand} ${product.name}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 300px"
                    unoptimized
                  />
                ) : (
                  <div className="h-[200px] w-[200px]" style={{ maxHeight: "200px" }} />
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div>
                <p className="text-xs tracking-wide" style={{ color: "#7a7a7a" }}>
                  {product.brand}
                </p>
                <h1
                  className="mt-1 line-clamp-2 font-semibold leading-snug"
                  style={{ fontSize: "20px", fontWeight: 600, color: "#1a1a1a" }}
                >
                  {product.name}
                </h1>
                <p className="mt-1 text-[13px]" style={{ color: "#6b6b6b" }}>
                  {metaLine}
                </p>
              </div>

              <div className="grid flex-1 grid-cols-3 content-start gap-2" style={{ gap: "8px" }}>
                {(isBar
                  ? [
                      { label: "단백질", value: `${product.proteinPerServing}g` },
                      { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "?" },
                      { label: "당류", value: product.sugar !== undefined ? `${product.sugar}g` : "?" },
                      { label: "단백질밀도", value: product.density ?? "?" },
                      { label: "중량", value: product.capacity ?? "?" },
                      { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "?" },
                      { label: "나트륨", value: product.sodium !== undefined ? `${product.sodium}mg` : "?" },
                    ]
                  : [
                      { label: "단백질", value: `${product.proteinPerServing}g` },
                      { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "?" },
                      { label: "당류", value: product.sugar !== undefined ? `${product.sugar}g` : "?" },
                      { label: "단백질밀도", value: product.density ?? "?" },
                      { label: "용량", value: product.capacity ?? "?" },
                      { label: "락토프리", value: product.variant === "락토프리" ? "O" : "?" },
                      { label: "BCAA", value: product.bcaa ?? "?" },
                      { label: "단백질원", value: product.proteinSource ?? "?" },
                      { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "?" },
                      { label: "나트륨", value: product.sodium !== undefined ? `${product.sodium}mg` : "?" },
                      { label: "칼로리밀도", value: product.calorieDensity ?? "?" },
                      { label: "음료 타입", value: product.drinkType ?? "?" },
                    ]
                ).map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col justify-center rounded-lg border border-[#e8e8e8] bg-white px-2.5 py-2 text-left"
                    style={{ borderRadius: "10px" }}
                  >
                    <span style={{ fontSize: "11px", color: "#6b6b6b" }}>{label}</span>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#3d3d3d" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">등급 요약</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {gradeLabels.map((label, index) => {
                const letter = label.split(" ").pop();
                const style =
                  letter === "A"
                    ? { bg: "#E7F3EC", border: "#1B7F5B", color: "#1B7F5B" }
                    : letter === "B"
                      ? { bg: "#EAF2FF", border: "#4C7BD9", color: "#4C7BD9" }
                      : letter === "C"
                        ? { bg: "#FFF1E6", border: "#F08A24", color: "#F08A24" }
                        : { bg: "#f3f3f3", border: "#bbb", color: "#999" };

                return (
                  <div
                    key={`${label}-${index}`}
                    className="rounded-xl border border-[#e8e6e3] p-4"
                    style={{ borderRadius: "12px", background: "#FFFDF8" }}
                  >
                    <span
                      className="inline-flex items-center justify-center rounded-full font-semibold"
                      style={{
                        height: "26px",
                        padding: "0 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        background: style.bg,
                        border: `1px solid ${style.border}`,
                        color: style.color,
                      }}
                    >
                      {label}
                    </span>
                    <p className="mt-3 text-sm text-[var(--foreground-muted)]">
                      {gradeDescs[index] ?? "-"}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="mt-8">
            <NutritionDetailSection
              rows={getNutritionDetail(product)}
              capacity={product.capacity}
              unit={isBar ? "개" : "병"}
            />
          </div>

          <div className="mt-6">
            <ProductReviewSection />
          </div>

          <div
            className="mt-6 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] p-4"
            style={{ borderRadius: "12px" }}
          >
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">구매 링크</h2>
            <PurchaseLinkRow
              coupangHref={coupangHref}
              naverHref={naverHref}
              officialMallHref={officialMallHref}
              size="md"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <CompareButton slug={slug} detailHref={`/product/${slug}`} />
            <Link
              href={isBar ? "/bars" : "/"}
              className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
            >
              제품 목록으로
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

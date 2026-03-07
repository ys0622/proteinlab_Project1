import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import NutritionDetailSection from "../../components/NutritionDetailSection";
import ProductReviewSection from "../../components/ProductReviewSection";
import { getNutritionDetail, getProductBySlug } from "../../data/products";
import { getProductImageUrl } from "../../lib/productImage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "제품을 찾을 수 없음 | ProteinLab" };
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

  const gradeLabels = product.gradeTags ?? ["밀도 —", "다이어트 —", "퍼포먼스 —"];
  const gradeDescs = product.gradeDescriptions ?? ["—", "—", "—"];
  const isBar = product.productType === "bar";
  const productImageUrl = getProductImageUrl(product.slug);
  // 메타 한 줄: 제조사 용량/중량 [락토프리 등] 맛
  const metaParts = [
    product.manufacturer,
    product.capacity,
    product.variant && product.variant !== "일반" ? product.variant : null,
    product.flavor || null,
  ].filter(Boolean);
  const metaLine = metaParts.join(" ");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* 히어로 영역: 메뉴 바로 아래 ~ 제품 이미지 끝까지 #EFEDE6 */}
      <section className="bg-[#EFEDE6]">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <div className="mx-auto max-w-[1000px]">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]"
            >
              ← 뒤로
            </Link>

            {/* 상단: 이미지 좌측, 브랜드·제품명·메타 우측(성분 박스 위). 좌·우 높이 일치 */}
            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
              {/* 왼쪽: 제품 이미지 (우측 컬럼과 높이 일치) */}
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

              {/* 오른쪽: 브랜드·제품명·메타 → 그 아래 성분 박스 (전체 높이가 이미지와 맞음) */}
              <div className="flex flex-1 flex-col gap-4">
                <div>
                  <p className="text-xs tracking-wide" style={{ color: "#7a7a7a" }}>
                    {product.brand}
                  </p>
                  <h1 className="mt-1 line-clamp-2 font-semibold leading-snug" style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a" }}>
                    {product.name}
                  </h1>
                  <p className="mt-1 text-[13px]" style={{ color: "#6b6b6b" }}>
                    {metaLine}
                  </p>
                </div>
                <div className="grid flex-1 grid-cols-3 gap-2 content-start" style={{ gap: "8px" }}>
                  {(isBar
                    ? [
                        { label: "단백질", value: `${product.proteinPerServing}g` },
                        { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "—" },
                        { label: "당류", value: product.sugar !== undefined ? `${product.sugar}g` : "—" },
                        { label: "단백질 밀도", value: product.density ?? "—" },
                        { label: "중량", value: product.capacity ?? "—" },
                        { label: "BCAA", value: product.bcaa ?? "—" },
                        { label: "단백질 급원", value: product.proteinSource ?? "—" },
                        { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "—" },
                        { label: "나트륨", value: product.sodium !== undefined ? `${product.sodium}mg` : "—" },
                        { label: "칼로리 밀도", value: product.calorieDensity ?? "—" },
                      ]
                    : [
                        { label: "단백질", value: `${product.proteinPerServing}g` },
                        { label: "칼로리", value: product.calories != null ? `${product.calories}kcal` : "—" },
                        { label: "당류", value: product.sugar !== undefined ? `${product.sugar}g` : "—" },
                        { label: "단백질 밀도", value: product.density ?? "—" },
                        { label: "용량", value: product.capacity ?? "—" },
                        { label: "락토프리", value: product.variant === "락토프리" ? "O" : "—" },
                        { label: "BCAA", value: product.bcaa ?? "—" },
                        { label: "단백질 급원", value: product.proteinSource ?? "—" },
                        { label: "지방", value: product.fat !== undefined ? `${product.fat}g` : "—" },
                        { label: "나트륨", value: product.sodium !== undefined ? `${product.sodium}mg` : "—" },
                        { label: "칼로리 밀도", value: product.calorieDensity ?? "—" },
                        { label: "음료 타입", value: product.drinkType ?? "—" },
                      ]
                  ).map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col justify-center rounded-lg border border-[#e8e8e8] bg-white px-2.5 py-2 text-left"
                      style={{ borderRadius: "10px" }}
                    >
                      <span style={{ fontSize: "11px", color: "#6b6b6b" }}>{label}</span>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: "#3d3d3d" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 그 아래: 흰색 배경, 박스는 #FFFDF8 */}
      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
          <div className="mx-auto max-w-[1000px]">
        {/* 등급 평가 · 카드 배경 #FFFDF8 */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">등급 평가</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {gradeLabels.map((label, i) => {
              const isDensity = label.startsWith("밀도");
              const isDiet = label.startsWith("다이어트");
              const isPerf = label.startsWith("퍼포먼스");
              const s = isDensity
                ? { bg: "#E7F3EC", border: "#1B7F5B", color: "#1B7F5B" }
                : isDiet
                  ? { bg: "#EAF2FF", border: "#4C7BD9", color: "#4C7BD9" }
                  : isPerf
                    ? { bg: "#FFF1E6", border: "#F08A24", color: "#F08A24" }
                    : { bg: "#f3f3f3", border: "#ccc", color: "#555" };
              return (
                <div
                  key={i}
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
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      color: s.color,
                    }}
                  >
                    {label}
                  </span>
                  <p className="mt-3 text-sm text-[var(--foreground-muted)]">{gradeDescs[i] ?? "—"}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 영양성분 상세 (1병/1개 기준) */}
        <div className="mt-8">
          <NutritionDetailSection rows={getNutritionDetail(product)} capacity={product.capacity} unit={isBar ? "개" : "병"} />
        </div>

        {/* 이 제품 어땠나요? - 세로폭 축소, 익명 글쓰기 바로 노출 */}
        <div className="mt-6">
          <ProductReviewSection />
        </div>

        {/* 비교에 추가 */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="rounded-lg border border-[var(--accent)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-light)]">
            비교에 추가
          </button>
          <Link
            href="/"
            className="rounded-lg border border-[#e2e2e2] bg-white px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-light)]"
          >
            제품 목록으로
          </Link>
        </div>

        </div>
        </div>
      </main>
      <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--foreground-muted)] md:px-6">
          <p>© ProteinLab. 단백질 제품 비교 정보는 참고용이며, 구매 전 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}

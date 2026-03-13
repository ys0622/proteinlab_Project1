import Link from "next/link";
import drinksData from "@/app/data/drinkProductsData.json";
import barsData from "@/app/data/barProductsData.json";
import yogurtsData from "@/app/data/yogurtProductsData.json";
import slugToImageData from "@/app/data/slugToImage.json";
import slugToBarImageData from "@/app/data/slugToBarImage.json";
import slugToYogurtImageData from "@/app/data/slugToYogurtImage.json";

function getDashboardStats() {
  const drinks = drinksData as Record<string, unknown>[];
  const bars = barsData as Record<string, unknown>[];
  const yogurts = yogurtsData as Record<string, unknown>[];
  const slugToImage = slugToImageData as Record<string, string>;
  const slugToBarImage = slugToBarImageData as Record<string, string>;
  const slugToYogurtImage = slugToYogurtImageData as Record<string, string>;

  const drinksNoImage = drinks.filter((product) => !slugToImage[product.slug as string]);
  const barsNoImage = bars.filter((product) => !slugToBarImage[product.slug as string]);
  const yogurtsNoImage = yogurts.filter((product) => !slugToYogurtImage[product.slug as string]);

  const drinksNeedingReview = drinks.filter((product) => {
    const nutrition = product.nutritionPerBottle as Record<string, unknown> | undefined;
    return nutrition?.sodiumMg === undefined || nutrition?.fatG === undefined || nutrition?.carbsG === undefined;
  });

  const yogurtsNeedingReview = yogurts.filter(
    (product) =>
      product.proteinPer100g === undefined ||
      product.yogurtType === undefined ||
      product.storageType === undefined,
  );

  const recentProducts = [...drinks, ...yogurts].slice(-5).reverse();

  return {
    totalDrinks: drinks.length,
    totalBars: bars.length,
    totalYogurts: yogurts.length,
    total: drinks.length + bars.length + yogurts.length,
    missingImage: drinksNoImage.length + barsNoImage.length + yogurtsNoImage.length,
    needingReview: drinksNeedingReview.length + yogurtsNeedingReview.length,
    recentProducts,
  };
}

export default async function AdminDashboard() {
  const stats = getDashboardStats();

  const statCards = [
    {
      label: "전체 제품",
      value: stats.total,
      sub: `음료 ${stats.totalDrinks}개 · 바 ${stats.totalBars}개 · 요거트 ${stats.totalYogurts}개`,
      href: "/admin/products",
      color: "text-[var(--accent)]",
    },
    {
      label: "이미지 없음",
      value: stats.missingImage,
      sub: "이미지 작업 필요",
      href: "/admin/images",
      color: stats.missingImage > 0 ? "text-orange-500" : "text-green-600",
    },
    {
      label: "검토 필요",
      value: stats.needingReview,
      sub: "영양 정보 누락 검토",
      href: "/admin/products?filter=review",
      color: stats.needingReview > 0 ? "text-red-500" : "text-green-600",
    },
    {
      label: "가이드",
      value: "CMS",
      sub: "가이드 관리",
      href: "/admin/guides",
      color: "text-[var(--foreground-muted)]",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">대시보드</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">ProteinLab 관리자 화면</p>
      </div>

      <div className="dashboard-cards mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="dashboard-card rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4 transition-shadow hover:shadow-sm"
          >
            <p className="dashboard-card__label text-xs text-[var(--foreground-muted)]">{card.label}</p>
            <p className={`mt-1 text-3xl font-bold ${card.color}`}>{card.value}</p>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">{card.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-[var(--foreground)]">빠른 작업</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/products/new"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            + 제품 추가
          </Link>
          <Link
            href="/admin/images"
            className="rounded-full border border-[var(--border)] bg-[var(--background-card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--beige-warm)]"
          >
            이미지 작업
          </Link>
          <Link
            href="/admin/guides/static"
            className="rounded-full border border-[var(--border)] bg-[var(--background-card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--beige-warm)]"
          >
            가이드 CMS
          </Link>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-[var(--foreground)]">최근 등록 제품</h2>
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--beige-warm)]">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--foreground-muted)]">제품명</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--foreground-muted)]">브랜드</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--foreground-muted)]">단백질</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {stats.recentProducts.map((product) => (
                <tr
                  key={product.slug as string}
                  className="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--beige-warm)]"
                >
                  <td className="px-4 py-2.5 text-[var(--foreground)]">{product.name as string}</td>
                  <td className="px-4 py-2.5 text-[var(--foreground-muted)]">{product.brand as string}</td>
                  <td className="px-4 py-2.5 text-[var(--foreground-muted)]">
                    {product.proteinPerServing as number}g
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <Link
                      href={`/admin/products/${product.slug as string}/edit`}
                      className="text-xs text-[var(--accent)] hover:underline"
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

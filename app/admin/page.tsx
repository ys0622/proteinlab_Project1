import Link from "next/link";
import fs from "fs/promises";
import path from "path";

async function getDashboardStats() {
  const [drinksRaw, barsRaw, slugToImageRaw, slugToBarImageRaw] =
    await Promise.all([
      fs.readFile(path.join(process.cwd(), "app/data/drinkProductsData.json"), "utf8"),
      fs.readFile(path.join(process.cwd(), "app/data/barProductsData.json"), "utf8"),
      fs.readFile(path.join(process.cwd(), "app/data/slugToImage.json"), "utf8"),
      fs.readFile(path.join(process.cwd(), "app/data/slugToBarImage.json"), "utf8"),
    ]);

  const drinks: Record<string, unknown>[] = JSON.parse(drinksRaw);
  const bars: Record<string, unknown>[] = JSON.parse(barsRaw);
  const slugToImage: Record<string, string> = JSON.parse(slugToImageRaw);
  const slugToBarImage: Record<string, string> = JSON.parse(slugToBarImageRaw);

  const drinksNoImage = drinks.filter((p) => !slugToImage[p.slug as string]);
  const barsNoImage = bars.filter((p) => !slugToBarImage[p.slug as string]);

  // Products with missing critical nutrition fields
  const drinksNeedingReview = drinks.filter((p) => {
    const n = p.nutritionPerBottle as Record<string, unknown> | undefined;
    return (
      n?.sodiumMg === undefined ||
      n?.fatG === undefined ||
      n?.carbsG === undefined
    );
  });

  // Recently "updated" — we don't track timestamps in JSON, so show last 5 drinks as proxy
  const recentProducts = [...drinks].slice(-5).reverse();

  return {
    totalDrinks: drinks.length,
    totalBars: bars.length,
    total: drinks.length + bars.length,
    missingImage: drinksNoImage.length + barsNoImage.length,
    needingReview: drinksNeedingReview.length,
    recentProducts,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: "전체 제품",
      value: stats.total,
      sub: `음료 ${stats.totalDrinks}개 · 바 ${stats.totalBars}개`,
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
      sub: "영양 정보 미입력",
      href: "/admin/products?filter=review",
      color: stats.needingReview > 0 ? "text-red-500" : "text-green-600",
    },
    {
      label: "가이드",
      value: "—",
      sub: "가이드 관리",
      href: "/admin/guides",
      color: "text-[var(--foreground-muted)]",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">대시보드</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          ProteinLab 관리자 패널
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4 hover:shadow-sm transition-shadow"
          >
            <p className="text-xs text-[var(--foreground-muted)]">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.color}`}>{card.value}</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">빠른 작업</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/products/new"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            + 제품 추가
          </Link>
          <Link
            href="/admin/images"
            className="rounded-full border border-[var(--border)] bg-[var(--background-card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--beige-warm)] transition-colors"
          >
            이미지 작업
          </Link>
          <Link
            href="/admin/guides/new"
            className="rounded-full border border-[var(--border)] bg-[var(--background-card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--beige-warm)] transition-colors"
          >
            + 가이드 작성
          </Link>
        </div>
      </div>

      {/* Tasks */}
      {(stats.missingImage > 0 || stats.needingReview > 0) && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">처리 필요</h2>
          <div className="space-y-2">
            {stats.missingImage > 0 && (
              <Link
                href="/admin/images"
                className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 hover:bg-orange-100 transition-colors"
              >
                <span className="text-sm text-orange-800">
                  이미지 없는 제품 <strong>{stats.missingImage}개</strong> — 이미지 업로드 필요
                </span>
                <span className="text-orange-400 text-sm">→</span>
              </Link>
            )}
            {stats.needingReview > 0 && (
              <Link
                href="/admin/products?filter=review"
                className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 hover:bg-red-100 transition-colors"
              >
                <span className="text-sm text-red-800">
                  영양 정보 미입력 제품 <strong>{stats.needingReview}개</strong> — 검토 필요
                </span>
                <span className="text-red-400 text-sm">→</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Recent Products */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">최근 등록 제품</h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--beige-warm)]">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[var(--foreground-muted)]">제품명</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[var(--foreground-muted)]">브랜드</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[var(--foreground-muted)]">단백질</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {stats.recentProducts.map((p) => (
                <tr key={p.slug as string} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--beige-warm)] transition-colors">
                  <td className="px-4 py-2.5 text-[var(--foreground)]">{p.name as string}</td>
                  <td className="px-4 py-2.5 text-[var(--foreground-muted)]">{p.brand as string}</td>
                  <td className="px-4 py-2.5 text-[var(--foreground-muted)]">{p.proteinPerServing as number}g</td>
                  <td className="px-4 py-2.5 text-right">
                    <Link
                      href={`/admin/products/${p.slug as string}/edit`}
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

import Link from "next/link";
import { getStaticProductsByCategory } from "@/app/lib/productDataStatic";
import { getCoupangRedirectHref, getOfficialMallUrl } from "@/app/lib/purchaseLinks";
import PurchaseLinkRow from "./PurchaseLinkRow";

export default function GuideBuySection() {
  const drinks = getStaticProductsByCategory("drink")
    .filter((p) => p.coupangUrl && p.coupangUrl !== "#" && p.coupangUrl !== "")
    .sort((a, b) => b.proteinPerServing - a.proteinPerServing)
    .slice(0, 4);

  if (drinks.length === 0) return null;

  return (
    <section className="border-t border-[#e8e6e3] bg-[#F7F4EE]">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--accent)]">
              ProteinLab 추천
            </p>
            <h2 className="mt-0.5 text-base font-bold text-[var(--foreground)]">
              지금 바로 비교해볼 제품
            </h2>
          </div>
          <Link
            href="/drinks"
            className="text-xs font-medium text-[var(--accent)] hover:underline"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {drinks.map((product) => {
            const coupangHref = getCoupangRedirectHref(
              product.coupangUrl,
              "guide",
              product.slug,
            );
            const naverHref =
              product.naverUrl && product.naverUrl !== "#" && product.naverUrl !== ""
                ? product.naverUrl
                : null;
            const officialMallHref = getOfficialMallUrl(product.brand);

            return (
              <div
                key={product.slug}
                className="flex flex-col rounded-xl border border-[#e8e6e3] bg-white p-3"
              >
                <p className="text-[11px] text-[var(--foreground-muted)]">{product.brand}</p>
                <Link
                  href={`/product/${product.slug}`}
                  className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-tight text-[var(--foreground)] hover:text-[var(--accent)]"
                >
                  {product.name}
                </Link>
                <p className="mt-1.5 text-xs font-bold text-[var(--accent)]">
                  단백질 {product.proteinPerServing}g
                  {product.sugar != null ? ` · 당류 ${product.sugar}g` : ""}
                </p>
                <div className="mt-auto pt-2">
                  <PurchaseLinkRow
                    coupangHref={coupangHref}
                    naverHref={naverHref}
                    officialMallHref={officialMallHref}
                    coupangOnly={true}
                    size="sm"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-[10px] text-[var(--foreground-muted)]">
          이 섹션은 쿠팡파트너스 활동의 일환으로 수수료를 받을 수 있습니다.
        </p>
      </div>
    </section>
  );
}

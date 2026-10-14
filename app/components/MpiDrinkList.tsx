import Image from "next/image";
import Link from "next/link";
import mpiDrinks from "../data/mpiDrinks.json";
import { getProductBySlug } from "../data/products";
import { getCoupangRedirectHref, hasNoPurchasableCoupangLink } from "../lib/purchaseLinks";
import { formatProductLabel } from "../lib/productLabel";
import { getProductImageUrl } from "../lib/productImage";
import AffiliateDisclosure from "./AffiliateDisclosure";
import TrackedCoupangLink from "./TrackedCoupangLink";

type Group = {
  brand: string;
  line: string;
  items: { slug: string; flavor: string }[];
  makers: string[];
  reportDate: string;
};

// 식약처 품목제조보고(원재료)에서 분리유단백(분리우유단백, MPI)이 확인된 음료. 신고 기준이라 포장 표시와 다를 수 있다.
export default function MpiDrinkList() {
  const groups = (mpiDrinks.groups as Group[]).filter((group) => group.items.length > 0);
  if (groups.length === 0) return null;
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const stats = mpiDrinks.stats;
  const purchasable = (slug: string) => {
    const product = getProductBySlug(slug);
    return product && !hasNoPurchasableCoupangLink(product.coupangUrl, product.slug) ? product : null;
  };
  // 표의 '구매' 칸: 제품군에서 구매 링크가 있는 첫 맛
  const buyByGroup = groups.map((group) => group.items.map((item) => purchasable(item.slug)).find(Boolean) ?? null);
  // MPI 표기 제품 중 100mL당 단백질이 높은 순 TOP 3(제품군당 1개)
  const density = (p: NonNullable<ReturnType<typeof purchasable>>) => p.proteinPerServing / (Number(p.capacity.match(/\d+/)?.[0]) || Infinity) * 100;
  const topPicks = groups
    .map((group) => group.items.map((item) => purchasable(item.slug)).filter((p): p is NonNullable<typeof p> => p != null).sort((a, b) => density(b) - density(a))[0])
    .filter((p): p is NonNullable<typeof p> => p != null)
    .sort((a, b) => density(b) - density(a))
    .slice(0, 3);

  return (
    <section className="rounded-2xl border border-[#e2ebe4] bg-white px-5 py-5" aria-labelledby="mpi-drinks-title">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#1F5A3D]">ProteinLab 조사</p>
      <h2 id="mpi-drinks-title" className="mt-0.5 text-xl font-bold text-[var(--foreground)]">
        원재료에 MPI(분리유단백)가 표기된 단백질 음료
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
        {mpiDrinks.source}에서 제조원이 신고한 원재료명에 &quot;분리유단백&quot;(분리우유단백, MPI)이 적힌 ProteinLab 등록 음료 {total}종을
        제품군별로 모았습니다. {mpiDrinks.checkedAt} 기준으로 확인했습니다.
      </p>
      <div className="mt-4 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3">
        <h3 className="text-sm font-bold text-[var(--foreground)]">조사 기준</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-[var(--foreground-muted)]">
          <li>
            <span className="font-semibold text-[var(--foreground)]">대상:</span> ProteinLab에 등록된 단백질 음료 {stats.studied}종입니다. 시중에 판매되는 모든 제품이 아니라, 이 사이트에 정보가 있는 제품만 조사했습니다.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">자료:</span> 식약처 품목제조보고(원재료)에서 제품의 브랜드와 맛이 품목명과 일치하는 신고를 찾았습니다.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">포함 기준:</span> 일치한 신고의 원재료명에 &quot;분리유단백&quot;(분리우유단백)이 적혀 있고, 제조원이 여럿이면 모든 신고에서 같을 때만 넣었습니다. 이 표의 {stats.included}종입니다.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">제외:</span> 신고는 확인됐지만 MPI 표기가 없는 제품 {stats.notMpiConfirmed}종, 제조원마다 원재료가 달랐던 제품 {stats.mixedMakers}종, 제품명이 일부만 일치한 제품 {stats.partialName}종, 신고에서 찾지 못한 제품 {stats.unmatched}종은 표에서 뺐습니다. 찾지 못했거나 일부만 일치한 제품은 MPI 여부를 알 수 없는 상태입니다.
          </li>
        </ul>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e8e6e3] text-xs text-[var(--foreground-muted)]">
              <th className="px-3 py-2 font-medium">제품군</th>
              <th className="px-3 py-2 font-medium">확인된 맛</th>
              <th className="px-3 py-2 font-medium">제조원(신고)</th>
              <th className="px-3 py-2 font-medium">최근 신고일</th>
              <th className="px-3 py-2 font-medium">구매</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, groupIndex) => (
              <tr key={`${group.brand}-${group.line}`} className="border-b border-[#f0eeeb] align-top last:border-b-0">
                <td className="px-3 py-2 font-medium text-[var(--foreground)]">
                  {group.line.startsWith(group.brand) ? group.line : `${group.brand} ${group.line}`}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/product/${item.slug}`}
                        className="text-[var(--accent)] underline-offset-2 hover:underline"
                      >
                        {item.flavor || "기본"}
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2 text-[var(--foreground-muted)]">{group.makers.join(", ")}</td>
                <td className="px-3 py-2 text-[var(--foreground-muted)]">{group.reportDate}</td>
                <td className="px-3 py-2">
                  {buyByGroup[groupIndex] ? (
                    <TrackedCoupangLink
                      href={getCoupangRedirectHref(buyByGroup[groupIndex]!.coupangUrl, "guide", buyByGroup[groupIndex]!.slug)}
                      productId={buyByGroup[groupIndex]!.slug}
                      productName={formatProductLabel(buyByGroup[groupIndex]!.brand, buyByGroup[groupIndex]!.name)}
                      productBrand={buyByGroup[groupIndex]!.brand}
                      productCategory={buyByGroup[groupIndex]!.productType}
                      linkPosition="spec_table"
                      className="inline-flex whitespace-nowrap rounded-full border border-[#1F5A3D] px-2.5 py-1 text-[11px] font-semibold text-[#1F5A3D] hover:bg-[#eef7f1]"
                    >
                      쿠팡 가격 확인
                    </TrackedCoupangLink>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-[var(--foreground-muted)]">
        <li>제조원이 식약처에 신고한 원재료 기준이라, 현재 판매 중인 포장과 다를 수 있습니다. 구매 전 제품 뒷면의 원재료명을 확인하세요.</li>
        <li>표에 없는 제품은 &quot;MPI가 없다&quot;는 뜻이 아니라, 신고 정보에서 같은 이름으로 확인하지 못했거나 MPI 표기가 아니었다는 뜻입니다.</li>
        <li>같은 제품을 여러 공장이 만드는 경우 공장별 원재료가 다를 수 있어, 공장별로 달랐던 제품은 이 표에서 뺐습니다.</li>
        <li>MPI는 유당이 완전히 없는 원료가 아닙니다. 유당에 민감하다면 완제품의 영양·원재료 표시를 함께 확인하세요.</li>
      </ul>
      {topPicks.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-[#dce8df] bg-[#f7fbf8] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-[var(--foreground)]">MPI 표기 제품, 어떤 걸 고를까?</h3>
            <AffiliateDisclosure className="mb-0" />
          </div>
          <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">
            원재료에 MPI(분리유단백)가 표기된 제품 중 100mL당 단백질이 높은 순서입니다(제품군당 1개).
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {topPicks.map((product) => {
              const imageUrl = getProductImageUrl(product.slug);
              return (
                <TrackedCoupangLink
                  key={product.slug}
                  href={getCoupangRedirectHref(product.coupangUrl, "guide", product.slug)}
                  productId={product.slug}
                  productName={formatProductLabel(product.brand, product.name)}
                  productBrand={product.brand}
                  productCategory={product.productType}
                  linkPosition="mid_content"
                  className="flex flex-col rounded-2xl border border-[#e8e6e3] bg-white p-3 transition-colors hover:bg-[#fffdf8]"
                >
                  {imageUrl ? (
                    <span className="relative block h-24 w-full">
                      <Image src={imageUrl} alt="" fill className="object-contain" sizes="160px" />
                    </span>
                  ) : null}
                  <span className="mt-2 text-[11px] text-[var(--foreground-muted)]">{product.brand}</span>
                  <span className="text-sm font-semibold leading-5 text-[var(--foreground)]">{product.name}</span>
                  <span className="text-[11px] text-[var(--foreground-muted)]">{product.capacity}</span>
                  <span className="mt-2 text-xs text-[var(--foreground-muted)]">
                    단백질 {product.proteinPerServing}g · 당류 {product.sugar}g · {product.calories}kcal · 100mL당 {(Math.round(density(product) * 10) / 10).toString()}g
                  </span>
                  <span className="mt-3 rounded-full bg-[#1F5A3D] py-2 text-center text-xs font-bold text-white">쿠팡에서 가격 확인 →</span>
                </TrackedCoupangLink>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}

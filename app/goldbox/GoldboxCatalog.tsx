"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TrackedCoupangLink from "@/app/components/TrackedCoupangLink";
import GoldboxIcon from "@/app/components/GoldboxIcon";

export type GoldboxCard = { id: string; slug: string; name: string; brand: string; category: string; image: string; offerName: string; price: number; href: string | null; protein?: number; sugarLabel?: string; calories?: number; capacity?: string };
const categoryLabel: Record<string, string> = { drink: "단백질 음료", bar: "단백질 바", yogurt: "요거트", shake: "쉐이크", soymilk: "두유" };
const categories = [{ id: "all", name: "전체" }, { id: "drink", name: "음료" }, { id: "bar", name: "바" }, { id: "yogurt", name: "요거트" }, { id: "shake", name: "쉐이크" }, { id: "soymilk", name: "두유" }];

export default function GoldboxCatalog({ cards, status, checkedAt, preview }: { cards: GoldboxCard[]; status: "ready" | "unavailable"; checkedAt: string | null; preview: boolean }) {
  const [active, setActive] = useState("all");
  const filtered = cards.filter(card => active === "all" || card.category === active);
  return <>
    {preview && <p className="mb-2 text-[11px] text-[#8a6328]">미리보기 · 예시 가격 / 구매 불가</p>}
    <header className="mb-4" data-goldbox-status={status}>
      <Link href="/" className="inline-flex min-h-9 items-center text-xs text-[#627368]">‹ 프로틴랩 홈</Link>
      <div className="mt-1 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#bc362f]"><GoldboxIcon className="h-6 w-6" /></span>
        <h1 className="text-[23px] font-extrabold text-[#193c2b]">오늘의 골드박스</h1>
      </div>
      <p className="mt-2 text-[13px] leading-5 text-[#626b62]">프로틴랩에 등록된 제품의 특가를 모았어요.</p>
    </header>
    {cards.length > 0 && status === "ready" ? <>
      <nav aria-label="특가 카테고리" className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map(category => { const count = category.id === "all" ? cards.length : cards.filter(card => card.category === category.id).length;
          return <button type="button" key={category.id} disabled={!count} aria-pressed={active === category.id} onClick={() => setActive(category.id)} className={`min-h-11 shrink-0 rounded-full border px-3 text-sm font-semibold disabled:cursor-default disabled:opacity-40 ${active === category.id ? "border-[#16412d] bg-[#16412d] text-white" : "border-[#dddcd3] bg-white text-[#526155]"}`}>{category.name} <span className="ml-1 text-xs">{count}</span></button>;
        })}
      </nav>
      {/* 케어맵처럼 제품 하나를 크게(2026-10-30 Scott): 사진·이름은 쿠팡 특가, 수치 칸, 큰 버튼 */}
      <div className="grid gap-4">
        {filtered.map((card, index) => {
          const deal = card.href && !preview;
          const dealLink = (children: React.ReactNode, className: string) => deal
            ? <TrackedCoupangLink href={card.href} productId={card.slug} productName={card.name} productBrand={card.brand} productCategory={card.category} linkPosition="goldbox_deal" className={className}>{children}</TrackedCoupangLink>
            : <Link href={`/product/${card.slug}`} className={className}>{children}</Link>;
          const stats = [
            card.calories != null && { value: card.calories, unit: "", label: "kcal" },
            card.protein != null && { value: card.protein, unit: "g", label: "단백질" },
            card.capacity && { value: card.capacity.replace(/(\d)\s*(mL|ml|g)$/i, "$1"), unit: card.capacity.match(/(mL|ml|g)$/i)?.[1] ?? "", label: "용량" },
            card.sugarLabel && { value: card.sugarLabel.replace(/g$/, ""), unit: card.sugarLabel.endsWith("g") ? "g" : "", label: "당류" },
          ].filter(Boolean) as { value: string | number; unit: string; label: string }[];
          return <article key={card.id} className="flex flex-col overflow-hidden rounded-3xl border border-[#e5e1d6] bg-white sm:flex-row">
            <div className="relative flex h-56 shrink-0 items-center justify-center bg-white p-5 sm:h-auto sm:min-h-[260px] sm:w-[38%] md:w-[300px]">
              <span className="absolute left-3 top-3 z-10 rounded-full border border-[#f2c7c2] bg-[#fff1ef] px-2.5 py-1 text-[11px] font-bold text-[#bc362f]">{preview ? "예시" : "오늘 특가"}</span>
              {card.image && dealLink(<Image src={card.image} alt={card.name} width={260} height={260} priority={index < 2} className="h-full max-h-[220px] w-full object-contain" />, "flex h-full w-full items-center justify-center")}
            </div>
            <div className="flex flex-1 flex-col border-t border-[#efece4] p-4 sm:border-l sm:border-t-0 md:p-6">
              <span className="w-fit rounded-full bg-[#eef4ef] px-2.5 py-1 text-[11px] font-semibold text-[#2f5c43]">{categoryLabel[card.category] ?? card.category}</span>
              <p className="mt-3 text-xs text-[#6b756c]">{card.brand}</p>
              <h2 className="mt-0.5 text-lg font-extrabold leading-7 text-[#193c2b] md:text-xl">{dealLink(card.name, "hover:underline")}</h2>
              {stats.length > 0 && <dl className="mt-3 grid grid-cols-4 overflow-hidden rounded-xl bg-[#f6f3ec]">
                {stats.map((stat, index) => <div key={stat.label} className={`px-1 py-2.5 text-center ${index > 0 ? "border-l border-[#e8e3d8]" : ""}`}>
                  <dd className="text-base font-extrabold text-[#193c2b] md:text-lg">{stat.value}<span className="ml-0.5 text-xs font-bold">{stat.unit}</span></dd>
                  <dt className="mt-0.5 text-[11px] text-[#6b756c]">{stat.label}</dt>
                </div>)}
              </dl>}
              <p className="mt-3 text-xs leading-5 text-[#6b756c]">{card.offerName}</p>
              {card.price > 0 && <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#9a5b08]">{card.price.toLocaleString("ko-KR")}<span className="ml-0.5 text-sm">원</span></p>}
              <div className="mt-4 md:mt-auto md:pt-4">
                <TrackedCoupangLink href={card.href} productId={card.slug} productName={card.name} productBrand={card.brand} productCategory={card.category} linkPosition="goldbox_deal" className="flex min-h-12 items-center justify-center rounded-full bg-[#16412d] px-4 text-sm font-bold text-white aria-disabled:opacity-50">{preview ? "구매 버튼 예시" : "쿠팡 특가 확인하기 ↗"}</TrackedCoupangLink>
                <Link href={`/product/${card.slug}`} className="mt-1 flex min-h-10 items-center justify-center text-xs text-[#5c7060] underline underline-offset-2">제품 성분 자세히 보기</Link>
              </div>
            </div>
          </article>;
        })}
      </div>
      <p className="mt-4 text-xs leading-5 text-[#747b71]">가격·판매 구성·행사 여부는 변경될 수 있습니다. 쿠팡에서 최종 확인해 주세요.</p>
    </> : <section className="rounded-2xl border border-[#e7ddbf] bg-[#fff9e9] px-5 py-7">
      <span aria-hidden="true" className="text-3xl">☀</span>
      <h2 className="mt-3 text-lg font-bold leading-7 text-[#35432f]">{status === "unavailable" ? "특가 정보를 확인하고 있어요" : "오늘은 등록 제품의 특가가 없어요"}</h2>
      <p className="mt-2 text-sm leading-6 text-[#6c705f]">{status === "unavailable" ? "지금은 골드박스 정보를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요." : <>쿠팡 골드박스에 프로틴랩 등록 제품이 없습니다.<br />다른 제품을 먼저 둘러보세요.</>}</p>
      <Link href="/drinks" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-[#16412d] px-4 text-sm font-semibold text-white">제품 둘러보기 →</Link>
    </section>}
    {checkedAt && <p className="mt-4 text-[11px] text-[#788078]">기준 시간 : {(() => {
      const parts = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23" }).formatToParts(new Date(checkedAt));
      const value = (type: string) => parts.find(part => part.type === type)?.value;
      return `${value("month")}월${value("day")}일 ${value("hour")}시`;
    })()} (한국시간)</p>}
    <p className="mt-5 text-[11px] leading-5 text-[#7a8076]">쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
  </>;
}

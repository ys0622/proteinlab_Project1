"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TrackedCoupangLink from "@/app/components/TrackedCoupangLink";
import GoldboxIcon from "@/app/components/GoldboxIcon";

export type GoldboxCard = { id: string; slug: string; name: string; brand: string; category: string; image: string; offerName: string; price: number; href: string | null };
const categories = [{ id: "all", name: "전체" }, { id: "drink", name: "음료" }, { id: "bar", name: "바" }, { id: "yogurt", name: "요거트" }, { id: "shake", name: "쉐이크" }];

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
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {filtered.map(card => <article key={card.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e5ddc9] bg-white">
          <div className="relative flex h-32 items-center justify-center bg-white p-4 md:h-44">
            <span className="absolute left-2 top-2 rounded bg-[#fff0bd] px-2 py-1 text-[10px] font-bold text-[#71501a]">{preview ? "예시" : "골드박스"}</span>
            {card.image && <Image src={card.image} alt={card.name} width={140} height={140} className="h-full w-full object-contain" />}
          </div>
          <div className="flex flex-1 flex-col p-3">
            <p className="text-[11px] text-[#6b756c]">{card.brand}</p>
            <h2 className="mt-1 min-h-10 text-sm font-bold leading-5 text-[#193c2b]">{card.name}</h2>
            <p className="mt-2 text-[11px] leading-4 text-[#6b756c]">{card.offerName}</p>
            {card.price > 0
              ? <p className="mb-3 mt-3 text-xl font-extrabold tracking-tight text-[#9a5b08]">{card.price.toLocaleString("ko-KR")}<span className="ml-0.5 text-sm">원</span></p>
              : <div className="mb-3 mt-3" />}
            <div className="mt-auto"><TrackedCoupangLink href={card.href} productId={card.slug} productName={card.name} productBrand={card.brand} productCategory={card.category} linkPosition="goldbox_deal" className="flex min-h-11 items-center justify-center rounded-lg bg-[#16412d] px-2 text-xs font-bold text-white aria-disabled:opacity-50">{preview ? "구매 버튼 예시" : "쿠팡에서 특가 보기 ↗"}</TrackedCoupangLink>
              <Link href={`/product/${card.slug}`} className="mt-1 flex min-h-9 items-center justify-center text-xs text-[#5c7060] underline underline-offset-2">제품 정보</Link>
            </div>
          </div>
        </article>)}
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

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeTrackedLink from "./HomeTrackedLink";

export default function HomeHeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_58px] items-center gap-1.5 md:flex md:gap-2">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex h-9 min-w-0 items-center gap-1.5 rounded-[8px] border bg-white pl-2.5 pr-1 shadow-sm md:h-14 md:flex-1 md:gap-2 md:rounded-[12px] md:pl-5 md:pr-1.5"
        style={{ borderColor: "#E2DFD8" }}
      >
        <svg className="h-3.5 w-3.5 shrink-0 md:h-5 md:w-5" style={{ color: "#8A968F" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제품명·브랜드 검색"
          aria-label="제품 검색"
          className="w-full min-w-0 border-0 bg-transparent text-[12px] text-[#1A2B1E] placeholder:text-[#9AA39C] focus:outline-none md:text-[15px]"
        />
        <button
          type="submit"
          aria-label="검색"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] text-white transition-colors hover:opacity-90 md:h-11 md:w-11 md:rounded-[8px]"
          style={{ background: "#1F5A3D" }}
        >
          <svg className="h-3 w-3 md:h-[18px] md:w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
      <HomeTrackedLink
        href="/compare"
        eventName="home_hero_compare_click"
        eventParams={{ category: "compare" }}
        className="flex h-8 w-[58px] shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] border text-[11px] font-extrabold shadow-[0_1px_2px_rgba(31,90,61,0.08)] transition-colors hover:bg-[#E3EFE6] md:h-14 md:w-auto md:rounded-[12px] md:px-6 md:text-[14px]"
        style={{ borderColor: "#1F5A3D", color: "#17472F", background: "#EDF5EF" }}
      >
        <span className="md:hidden">제품비교</span>
        <span className="hidden md:inline">제품 비교</span>
      </HomeTrackedLink>
    </div>
  );
}

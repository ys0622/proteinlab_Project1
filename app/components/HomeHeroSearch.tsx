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
    <div className="flex flex-row items-center gap-2">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex h-[42px] min-w-0 flex-1 items-center gap-1.5 rounded-[10px] border bg-white pl-3.5 pr-1 shadow-sm md:h-14 md:gap-2 md:rounded-[12px] md:pl-5 md:pr-1.5"
        style={{ borderColor: "#E2DFD8" }}
      >
        <svg className="h-4 w-4 shrink-0 md:h-5 md:w-5" style={{ color: "#8A968F" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제품명·브랜드 검색"
          aria-label="제품 검색"
          className="w-full min-w-0 border-0 bg-transparent text-[14px] text-[#1A2B1E] placeholder:text-[#9AA39C] focus:outline-none md:text-[15px]"
        />
        <button
          type="submit"
          aria-label="검색"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] text-white transition-colors hover:opacity-90 md:h-11 md:w-11 md:rounded-[8px]"
          style={{ background: "#1F5A3D" }}
        >
          <svg className="h-4 w-4 md:h-[18px] md:w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
      <HomeTrackedLink
        href="/compare"
        eventName="home_hero_compare_click"
        eventParams={{ category: "compare" }}
        className="flex h-[42px] shrink-0 items-center justify-center rounded-[10px] border px-3.5 text-[13px] font-bold whitespace-nowrap transition-colors hover:bg-[#EBF3ED] md:h-14 md:rounded-[12px] md:px-6 md:text-[14px]"
        style={{ borderColor: "#1F5A3D", color: "#1F5A3D" }}
      >
        제품 비교
      </HomeTrackedLink>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeHeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex h-[52px] w-full items-center gap-2 rounded-[12px] border bg-white pl-5 pr-1.5 shadow-sm md:h-14"
      style={{ borderColor: "#E2DFD8" }}
    >
      <svg className="h-5 w-5 shrink-0" style={{ color: "#8A968F" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="제품명·브랜드 검색"
        aria-label="제품 검색"
        className="w-full border-0 bg-transparent text-[14px] text-[#1A2B1E] placeholder:text-[#9AA39C] focus:outline-none md:text-[15px]"
      />
      <button
        type="submit"
        className="shrink-0 rounded-[8px] px-6 text-[13px] font-bold text-white transition-colors hover:opacity-90 md:h-11"
        style={{ background: "#1F5A3D", height: "40px" }}
      >
        제품 비교하기
      </button>
    </form>
  );
}

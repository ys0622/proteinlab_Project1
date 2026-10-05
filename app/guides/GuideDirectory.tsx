"use client";

import Link from "next/link";
import { useState } from "react";

type Article = { href: string; title: string; description: string; tags: string[] };
type Section = { id: string; title: string; href: string; articles: Article[] };
const labels: Record<string, string> = { "track-a": "기초·성분", "track-b": "제품 고르기", "track-c": "섭취법·건강", "track-d": "운동", "track-e": "시장 이야기", "track-f": "계산기" };
const featuredSlugs = ["protein-drink-guide", "protein-shake-guide", "daily-requirement"];
const normalize = (value: string) => value.toLocaleLowerCase().replace(/\s+/g, "");

function ArticleRow({ article, label }: { article: Article; label: string }) {
  return (
    <Link href={article.href} className="group flex min-w-0 items-center gap-3 rounded-lg px-3 py-3.5 transition-colors hover:bg-[#f3f7f3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#216044] md:px-4">
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[11px] font-medium text-[#627368]">{label}</p>
        <h3 className="line-clamp-2 text-[16px] font-semibold leading-[1.45] tracking-tight text-[#193c2b] group-hover:underline">{article.title}</h3>
        <p className="mt-1 truncate text-[13px] leading-5 text-[#626c65]">{article.description}</p>
      </div>
      <span aria-hidden="true" className="shrink-0 text-lg text-[#829087]">›</span>
    </Link>
  );
}

export default function GuideDirectory({ sections }: { sections: Section[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const all = sections.flatMap((section) => section.articles.map((article) => ({ article, section })));
  const featured = featuredSlugs.flatMap((slug) => all.filter(({ article }) => article.href.endsWith(`/${slug}`)).slice(0, 1));
  const searching = Boolean(query.trim());
  const browsing = !searching && active === "all";
  const results = all.filter(({ article, section }) => (active === "all" || section.id === active) && normalize(`${article.title} ${article.description} ${article.tags.join(" ")}`).includes(normalize(query)));
  const listed = browsing ? results.filter(({ article }) => !featured.some((item) => item.article.href === article.href)) : results;
  const selected = sections.find((section) => section.id === active);
  const reset = () => { setQuery(""); setActive("all"); };

  return (
    <>
      <div role="search">
        <label htmlFor="guide-search" className="sr-only">가이드 검색</label>
        <div className="flex items-center gap-2 rounded-xl border border-[#cbd9ce] bg-white px-3 focus-within:ring-2 focus-within:ring-[#216044]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5 shrink-0 text-[#627368]"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
          <input id="guide-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="제품명이나 궁금한 내용을 검색" className="h-11 w-full min-w-0 bg-transparent text-base text-[#193c2b] outline-none placeholder:text-sm placeholder:text-[#778279]" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="검색어 지우기" className="h-11 px-2 text-sm text-[#52695b]">지우기</button>}
        </div>
      </div>
      <nav aria-label="가이드 주제" className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {[{ id: "all", title: "전체" }, ...sections].map((section) => (
          <button key={section.id} type="button" aria-pressed={active === section.id} onClick={() => setActive(section.id)} className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#216044] ${active === section.id ? "border-[#1d563b] bg-[#1d563b] text-white" : "border-[#d8e2da] bg-white text-[#4c6053] hover:bg-[#eef4ef]"}`}>{labels[section.id] ?? section.title}</button>
        ))}
      </nav>

      {browsing && featured.length > 0 && (
        <section aria-labelledby="guide-featured" className="mt-4">
          <h2 id="guide-featured" className="mb-2 text-[17px] font-bold text-[#193c2b]">처음이라면 이 글부터</h2>
          <div className="divide-y divide-[#e4eae4] rounded-xl border border-[#d8e2da] bg-white md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
            {featured.map(({ article, section }) => <ArticleRow key={article.href} article={article} label={labels[section.id] ?? section.title} />)}
          </div>
        </section>
      )}

      <section aria-labelledby="guide-results" className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 id="guide-results" className="text-[17px] font-bold text-[#193c2b]">{searching ? "검색 결과" : selected ? labels[selected.id] ?? selected.title : "더 알아보기"}</h2>
          <span role="status" aria-live="polite" className="text-xs text-[#627368]">{listed.length}개 가이드</span>
        </div>
        {listed.length ? (
          <div className="rounded-xl border border-[#d8e2da] bg-white">
            <div className="grid divide-y divide-[#e8ede8] md:grid-cols-2">
              {listed.slice(0, 8).map(({ article, section }) => <ArticleRow key={article.href} article={article} label={labels[section.id] ?? section.title} />)}
            </div>
            {listed.length > 8 && (
              <details key={`${active}-${query}`} className="group border-t border-[#e8ede8]">
                <summary className="cursor-pointer px-4 py-3 text-center text-sm font-semibold text-[#216044] focus-visible:outline-2 focus-visible:outline-[#216044]"><span className="group-open:hidden">가이드 {listed.length - 8}개 더 보기</span><span className="hidden group-open:inline">목록 접기</span></summary>
                <div className="grid divide-y divide-[#e8ede8] md:grid-cols-2">{listed.slice(8).map(({ article, section }) => <ArticleRow key={article.href} article={article} label={labels[section.id] ?? section.title} />)}</div>
              </details>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-[#d8e2da] bg-white px-4 py-8 text-center">
            <p className="text-sm text-[#59665f]">일치하는 가이드가 없습니다. 짧은 단어나 다른 주제로 찾아보세요.</p>
            <button type="button" onClick={reset} className="mt-3 min-h-11 rounded-lg bg-[#1d563b] px-4 text-sm font-semibold text-white">전체 가이드 보기</button>
          </div>
        )}
        {selected && <Link href={selected.href} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#216044]">{selected.title} 모아보기 →</Link>}
      </section>

      <aside className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#edf4ee] px-4 py-4">
        <div><h2 className="text-sm font-bold text-[#193c2b]">선택 기준을 알았다면, 제품을 비교해보세요</h2><p className="mt-1 text-xs text-[#59665f]">단백질·당류·칼로리를 한눈에 확인하세요.</p></div>
        <Link href="/drinks" className="inline-flex min-h-11 items-center rounded-lg border border-[#b9ccbe] bg-white px-4 text-sm font-semibold text-[#216044]">제품 찾아보기 →</Link>
      </aside>
    </>
  );
}

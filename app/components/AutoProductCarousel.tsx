"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function AutoProductCarousel({ children, label }: { children: ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const interacting = useRef(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const move = (direction: number, automatic = false) => {
    const element = track.current;
    if (!element) return;
    const step = (element.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? element.clientWidth;
    const max = element.scrollWidth - element.clientWidth;
    const next = direction > 0
      ? element.scrollLeft >= max - 2 ? 0 : Math.min(max, element.scrollLeft + step + 12)
      : element.scrollLeft <= 2 ? max : Math.max(0, element.scrollLeft - step - 12);
    element.scrollTo({ left: next, behavior: reducedMotion || (automatic && next === 0) ? "auto" : "smooth" });
  };
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => {
      const element = track.current;
      if (!element || paused || reducedMotion || interacting.current || document.hidden || !window.matchMedia("(min-width: 768px)").matches) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight || element.scrollWidth <= element.clientWidth) return;
      const step = (element.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? element.clientWidth;
      const max = element.scrollWidth - element.clientWidth;
      const reset = element.scrollLeft >= max - 2;
      element.scrollTo({ left: reset ? 0 : Math.min(max, element.scrollLeft + step + 12), behavior: reset ? "auto" : "smooth" });
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);
  return <div role="region" aria-label={label}>
    <div ref={track} tabIndex={0} aria-label={`${label} 제품 목록`}
      onMouseEnter={() => { interacting.current = true; }} onMouseLeave={() => { interacting.current = false; }}
      onFocusCapture={() => { interacting.current = true; }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) interacting.current = false; }}
      className="flex gap-3 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollSnapType: "x mandatory" }}>
      {children}
    </div>
    <div className="mt-2 hidden items-center justify-end gap-2 md:flex">
      <button type="button" onClick={() => move(-1)} aria-label={`${label} 이전 제품`} className="h-9 rounded-lg border border-[#d8e2da] bg-white px-3 text-sm text-[#16412d]">←</button>
      <button type="button" disabled={reducedMotion} onClick={() => setPaused(value => !value)} className="h-9 rounded-lg border border-[#d8e2da] bg-white px-3 text-xs text-[#16412d] disabled:opacity-50">{reducedMotion ? "자동 이동 꺼짐" : paused ? "자동 이동 재생" : "자동 이동 정지"}</button>
      <button type="button" onClick={() => move(1)} aria-label={`${label} 다음 제품`} className="h-9 rounded-lg border border-[#d8e2da] bg-white px-3 text-sm text-[#16412d]">→</button>
    </div>
  </div>;
}

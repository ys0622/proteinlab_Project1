"use client";

import { useState } from "react";

const brandOptions = ["그린비아", "뉴케어", "닥터유", "더단백랩", "노쉬", "마이밀", "서울우유", "세븐일레븐", "셀렉스", "솔브앤고", "얼티브", "연세유업", "오늘단백", "오트몬트", "칼로바이", "테이크핏", "파스퇴르", "하이뮨", "함소아제약"];
const proteinOptions = ["초고함량(30g 이상)", "고함량(20g 이상)", "저함량(20g 미만)"];
const sourceOptions = ["식물성", "우유", "혼합"];
const tasteOptions = ["곡물/견과", "과일맛", "밀크/바닐라", "초콜릿/카카오", "커피", "기타"];
const volumeOptions = ["200ml 이하", "200~300ml", "300~400ml", "400ml 이상"];
const quickCurationItems = [
  { label: "당류 0g", href: "/picks/zero-sugar" },
  { label: "라이트 20g 미만", href: "/picks/light-protein-under-20" },
  { label: "고단백 20g+", href: "/picks/high-protein-20" },
  { label: "초고단백 30g+", href: "/picks/high-protein" },
  { label: "워터형", href: "/picks/protein-water" },
  { label: "락토프리", href: "/picks/lactose-free" },
  { label: "단백질 밀도 A", href: "/picks/value-a" },
  { label: "다이어트 A", href: "/picks/diet-a" },
  { label: "퍼포먼스 A", href: "/picks/fitness-a" },
  { label: "식물성", href: "/picks/vegan" },
];

const chipClass =
  "rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-1.5 text-[14px] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]";
const chipClassLink =
  "shrink-0 rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-1.5 text-[14px] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]";

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-[var(--foreground-muted)]">{title}</p>
      <div className="flex flex-wrap gap-2" style={{ gap: "var(--chip-gap)" }}>
        {children}
      </div>
    </div>
  );
}

export default function FilterSection() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filterContent = (
    <div className="flex flex-col gap-3" style={{ gap: "var(--filter-gap)" }}>
      <FilterGroup title="브랜드">
        {brandOptions.map((b) => (
          <button key={b} type="button" className={chipClass}>
            {b}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="단백질 함량">
        {proteinOptions.map((p) => (
          <button key={p} type="button" className={chipClass}>
            {p}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="단백질 급원">
        {sourceOptions.map((s) => (
          <button key={s} type="button" className={chipClass}>
            {s}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="맛">
        {tasteOptions.map((t) => (
          <button key={t} type="button" className={chipClass}>
            {t}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="용량">
        {volumeOptions.map((v) => (
          <button key={v} type="button" className={chipClass}>
            {v}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="빠른 큐레이션">
        {quickCurationItems.map((item) => (
          <a key={item.label} href={item.href} className={chipClassLink}>
            {item.label}
          </a>
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="border-b border-[var(--border)] pb-4">
      {/* 모바일: 상세 필터 펼치기 버튼만 표시, 클릭 시 필터 영역 expand. PC: 버튼 숨김 */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex items-center gap-1 py-2 text-[14px] font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          aria-expanded={mobileFilterOpen}
        >
          상세 필터
          <span className={`inline-block transition-transform ${mobileFilterOpen ? "rotate-180" : ""}`}>펼치기 ▼</span>
        </button>
        {mobileFilterOpen && <div className="pt-2">{filterContent}</div>}
      </div>
      {/* PC: 필터 영역 항상 펼침 */}
      <div className="hidden md:block">{filterContent}</div>
    </div>
  );
}

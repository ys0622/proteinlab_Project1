"use client";

import { useState } from "react";
import type { DrinkFilters, BarFilters } from "../lib/productFilters";

/** 단백질 음료 브랜드 (proteinlab.kr 기준) */
const drinkBrandOptions = ["그린비아", "뉴케어", "닥터유", "더단백", "랩노쉬", "마이밀", "서울우유", "세븐일레븐", "셀렉스", "솔브앤고", "얼티브", "연세유업", "오늘단백", "오트몬트", "칼로바이", "테이크핏", "파스퇴르", "하이뮨", "함소아제약"];
/** 단백질 바 브랜드 (proteinlab.kr/bars 59개 기준) */
const barBrandOptions = ["닥터유", "커클랜드", "베노프", "비에스엔", "퀘스트 뉴트리션", "포스트", "프로틴방앗간", "온단백", "힘내고", "노브랜드", "더단백", "셀렉스", "하이뮨", "마이밀", "마이프로틴", "단백하니", "랩노쉬", "하루단백바", "씨알로", "크라운", "칼로바이", "올가니카", "켈로그", "롯데웰푸드"];

const drinkProteinOptions = ["초고함량(30g 이상)", "고함량(20g 이상)", "저함량(20g 미만)"];
const drinkSourceOptions = ["식물성", "우유", "혼합"];
const drinkTasteOptions = ["곡물/견과", "과일맛", "밀크/바닐라", "초콜릿/카카오", "커피", "기타"];
const drinkVolumeOptions = ["200ml 이하", "200~300ml", "300~400ml", "400ml 이상"];

const barProteinOptions = ["고함량(20g 이상)", "고함량(15g 이상)", "저함량(15g 미만)"];
const barSugarOptions = ["당류 0g", "저당 5g 미만", "보통 5~10g", "당 10g 이상"];
const barWeightOptions = ["50g 이하", "50~60g", "60g 이상"];

/** 단백질 음료 빠른 큐레이션 */
const drinkQuickCurationItems = [
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

/** 단백질 바 빠른 큐레이션 */
const barQuickCurationItems = [
  { label: "고단백 20g+", href: "/picks/bar-high-protein-20" },
  { label: "고단백 15g+", href: "/picks/bar-high-protein-15" },
  { label: "저당", href: "/picks/bar-low-sugar" },
  { label: "저칼로리", href: "/picks/bar-low-calorie" },
  { label: "초코", href: "/picks/bar-choco" },
  { label: "견과", href: "/picks/bar-nut" },
  { label: "무견과", href: "/picks/bar-no-nut" },
  { label: "대용량", href: "/picks/bar-large" },
  { label: "소용량", href: "/picks/bar-small" },
  { label: "고밀도", href: "/picks/bar-high-density" },
];

const labelMinWidth = "5rem";
const chipBase = "inline-flex items-center justify-center rounded-full border px-2 text-[10px] sm:text-[11px] leading-none transition-colors";
const chipUnselected = "border-[var(--border)] bg-white text-[#454545] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]";
const chipSelected = "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] font-medium";

function FilterRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start">
      <div className="flex shrink-0 items-center" style={{ minWidth: labelMinWidth, height: "26px" }}>
        <p className="text-[11px] font-bold leading-none text-[var(--foreground-muted)]" style={{ margin: 0 }}>{title}</p>
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-1.5" style={{ minHeight: "26px" }}>
        {children}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  selected,
  onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${chipBase} ${selected ? chipSelected : chipUnselected}`}
      style={{ height: "26px", borderRadius: "13px", alignItems: "center", justifyContent: "center" }}
    >
      {label}
    </button>
  );
}

type FilterSectionProps =
  | { productType: "drink"; filters: DrinkFilters; onFilterToggle: (key: keyof DrinkFilters, value: string) => void }
  | { productType: "bar"; filters: BarFilters; onFilterToggle: (key: keyof BarFilters, value: string) => void };

export default function FilterSection(props: FilterSectionProps) {
  const { productType, filters, onFilterToggle } = props;
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filterContent =
    productType === "drink" ? (
      <>
        <div className="flex flex-col" style={{ gap: "4px" }}>
          <FilterRow title="브랜드">
            {drinkBrandOptions.map((b) => (
              <FilterChip key={b} label={b} selected={filters.brand.includes(b)} onClick={() => onFilterToggle("brand", b)} />
            ))}
          </FilterRow>
          <FilterRow title="단백질 함량">
            {drinkProteinOptions.map((p) => (
              <FilterChip key={p} label={p} selected={filters.protein.includes(p)} onClick={() => onFilterToggle("protein", p)} />
            ))}
          </FilterRow>
          <FilterRow title="단백질 급원">
            {drinkSourceOptions.map((s) => (
              <FilterChip key={s} label={s} selected={filters.source.includes(s)} onClick={() => onFilterToggle("source", s)} />
            ))}
          </FilterRow>
          <FilterRow title="맛">
            {drinkTasteOptions.map((t) => (
              <FilterChip key={t} label={t} selected={filters.taste.includes(t)} onClick={() => onFilterToggle("taste", t)} />
            ))}
          </FilterRow>
          <FilterRow title="용량">
            {drinkVolumeOptions.map((v) => (
              <FilterChip key={v} label={v} selected={filters.volume.includes(v)} onClick={() => onFilterToggle("volume", v)} />
            ))}
          </FilterRow>
        </div>
        <div className="mt-1.5 border-t border-[var(--border)] pt-1.5">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center">
            <div className="flex h-6 shrink-0 items-center" style={{ minWidth: labelMinWidth }}>
              <p className="text-[11px] font-bold leading-none text-[var(--foreground-muted)]" style={{ margin: 0 }}>빠른 큐레이션</p>
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-1.5">
              {drinkQuickCurationItems.map((item) => (
                <a key={item.label} href={item.href} className="shrink-0 inline-flex items-center justify-center rounded-full border border-[var(--curation-chip-bg)] bg-[var(--curation-chip-bg)] px-2 text-[10px] font-medium leading-none text-[var(--curation-chip-text)] hover:opacity-90 transition-opacity sm:text-[11px]" style={{ height: "26px", borderRadius: "13px" }}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="flex flex-col" style={{ gap: "4px" }}>
          <FilterRow title="브랜드">
            {barBrandOptions.map((b) => (
              <FilterChip key={b} label={b} selected={filters.brand.includes(b)} onClick={() => onFilterToggle("brand", b)} />
            ))}
          </FilterRow>
          <FilterRow title="단백질 함량">
            {barProteinOptions.map((p) => (
              <FilterChip key={p} label={p} selected={filters.protein.includes(p)} onClick={() => onFilterToggle("protein", p)} />
            ))}
          </FilterRow>
          <FilterRow title="당류">
            {barSugarOptions.map((s) => (
              <FilterChip key={s} label={s} selected={filters.sugar.includes(s)} onClick={() => onFilterToggle("sugar", s)} />
            ))}
          </FilterRow>
          <FilterRow title="용량(중량)">
            {barWeightOptions.map((w) => (
              <FilterChip key={w} label={w} selected={filters.weight.includes(w)} onClick={() => onFilterToggle("weight", w)} />
            ))}
          </FilterRow>
        </div>
        <div className="mt-1.5 border-t border-[var(--border)] pt-1.5">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center">
            <div className="flex h-6 shrink-0 items-center" style={{ minWidth: labelMinWidth }}>
              <p className="text-[11px] font-bold leading-none text-[var(--foreground-muted)]" style={{ margin: 0 }}>빠른 큐레이션</p>
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-1.5">
              {barQuickCurationItems.map((item) => (
                <a key={item.label} href={item.href} className="shrink-0 inline-flex items-center justify-center rounded-full border border-[var(--curation-chip-bg)] bg-[var(--curation-chip-bg)] px-2 text-[10px] font-medium leading-none text-[var(--curation-chip-text)] hover:opacity-90 transition-opacity sm:text-[11px]" style={{ height: "26px", borderRadius: "13px" }}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div className="pt-0">
      <div className="md:hidden">
        <button type="button" onClick={() => setMobileFilterOpen(!mobileFilterOpen)} className="flex items-center gap-1 py-1 text-xs font-bold text-[#454545] hover:text-[var(--foreground)]" aria-expanded={mobileFilterOpen}>
          상세 필터
          <span className={`inline-block transition-transform duration-200 ${mobileFilterOpen ? "rotate-180" : ""}`}>▼</span>
        </button>
        {mobileFilterOpen && <div className="pt-1">{filterContent}</div>}
      </div>
      <div className="hidden md:block">{filterContent}</div>
    </div>
  );
}

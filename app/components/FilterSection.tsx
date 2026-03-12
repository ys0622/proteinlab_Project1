"use client";

import { useMemo, useState } from "react";
import type { BarFilters, DrinkFilters } from "../lib/productFilters";

const drinkBrandOptions = [
  "그린비아",
  "뉴케어",
  "닥터유",
  "더단백",
  "랩노쉬",
  "마이밀",
  "서울우유",
  "세븐일레븐",
  "셀렉스",
  "솔브앤고",
  "얼티브",
  "연세유업",
  "오늘단백",
  "오트몬트",
  "칼로바이",
  "테이크핏",
  "파스퇴르",
  "하이뮨",
  "함소아제약",
];

const barBrandOptions = [
  "곰곰",
  "닥터유",
  "커클랜드",
  "베노프",
  "비에스엔",
  "퀘스트 뉴트리션",
  "포스트",
  "프로틴방앗간",
  "온단백",
  "힘내고",
  "노브랜드",
  "더단백",
  "셀렉스",
  "하이뮨",
  "마이밀",
  "마이프로틴",
  "단백하니",
  "랩노쉬",
  "씨알로",
  "크라운",
  "칼로바이",
  "올가니카",
  "켈로그",
  "롯데웰푸드",
];

const drinkProteinOptions = ["초고함량(30g 이상)", "고함량(20g 이상)", "저함량(20g 미만)"];
const drinkSourceOptions = ["식물성", "우유", "혼합"];
const drinkTasteOptions = ["곡물/견과", "과일맛", "바나나/바닐라", "초콜릿/케이크", "커피", "기타"];
const drinkVolumeOptions = ["200ml 이하", "200~300ml", "300~400ml", "400ml 이상"];

const barProteinOptions = ["고함량(20g 이상)", "고함량(15g 이상)", "저함량(15g 미만)"];
const barSugarOptions = ["당류 0g", "저당 5g 미만", "보통 5~10g", "당 10g 이상"];
const barWeightOptions = ["50g 이하", "50~60g", "60g 이상"];

const labelMinWidth = "5rem";
const chipBase =
  "inline-flex items-center justify-center rounded-full border px-2 text-[10px] leading-none transition-colors sm:text-[11px]";
const chipUnselected =
  "border-[var(--border)] bg-white text-[#454545] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]";
const chipSelected =
  "border-[var(--accent)] bg-[var(--accent-light)] font-medium text-[var(--accent)]";

function FilterRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start">
      <div
        className="flex shrink-0 items-center"
        style={{ minWidth: labelMinWidth, height: "26px" }}
      >
        <p
          className="text-[11px] font-bold leading-none text-[var(--foreground-muted)]"
          style={{ margin: 0 }}
        >
          {title}
        </p>
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
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${chipBase} ${selected ? chipSelected : chipUnselected}`}
      style={{
        height: "26px",
        borderRadius: "13px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </button>
  );
}

type FilterSectionProps =
  | {
      productType: "drink";
      filters: DrinkFilters;
      onFilterToggle: (key: keyof DrinkFilters, value: string) => void;
      onResetFilters: () => void;
      mobileToolbarSlot?: React.ReactNode;
      desktopFooterSlot?: React.ReactNode;
    }
  | {
      productType: "bar";
      filters: BarFilters;
      onFilterToggle: (key: keyof BarFilters, value: string) => void;
      onResetFilters: () => void;
      mobileToolbarSlot?: React.ReactNode;
      desktopFooterSlot?: React.ReactNode;
    };

export default function FilterSection(props: FilterSectionProps) {
  const { productType, filters, onFilterToggle, onResetFilters, mobileToolbarSlot, desktopFooterSlot } = props;
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sortedDrinkBrandOptions = useMemo(
    () => [...drinkBrandOptions].sort((a, b) => a.localeCompare(b, "ko")),
    [],
  );
  const sortedBarBrandOptions = useMemo(
    () => [...barBrandOptions].sort((a, b) => a.localeCompare(b, "ko")),
    [],
  );

  const filterRows =
    productType === "drink" ? (
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <FilterRow title="브랜드">
          {sortedDrinkBrandOptions.map((brand) => (
            <FilterChip
              key={brand}
              label={brand}
              selected={filters.brand.includes(brand)}
              onClick={() => onFilterToggle("brand", brand)}
            />
          ))}
        </FilterRow>
        <FilterRow title="단백질 함량">
          {drinkProteinOptions.map((protein) => (
            <FilterChip
              key={protein}
              label={protein}
              selected={filters.protein.includes(protein)}
              onClick={() => onFilterToggle("protein", protein)}
            />
          ))}
        </FilterRow>
        <FilterRow title="단백질 원천">
          {drinkSourceOptions.map((source) => (
            <FilterChip
              key={source}
              label={source}
              selected={filters.source.includes(source)}
              onClick={() => onFilterToggle("source", source)}
            />
          ))}
        </FilterRow>
        <FilterRow title="맛">
          {drinkTasteOptions.map((taste) => (
            <FilterChip
              key={taste}
              label={taste}
              selected={filters.taste.includes(taste)}
              onClick={() => onFilterToggle("taste", taste)}
            />
          ))}
        </FilterRow>
        <FilterRow title="용량">
          {drinkVolumeOptions.map((volume) => (
            <FilterChip
              key={volume}
              label={volume}
              selected={filters.volume.includes(volume)}
              onClick={() => onFilterToggle("volume", volume)}
            />
          ))}
        </FilterRow>
      </div>
    ) : (
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <FilterRow title="브랜드">
          {sortedBarBrandOptions.map((brand) => (
            <FilterChip
              key={brand}
              label={brand}
              selected={filters.brand.includes(brand)}
              onClick={() => onFilterToggle("brand", brand)}
            />
          ))}
        </FilterRow>
        <FilterRow title="단백질 함량">
          {barProteinOptions.map((protein) => (
            <FilterChip
              key={protein}
              label={protein}
              selected={filters.protein.includes(protein)}
              onClick={() => onFilterToggle("protein", protein)}
            />
          ))}
        </FilterRow>
        <FilterRow title="당류">
          {barSugarOptions.map((sugar) => (
            <FilterChip
              key={sugar}
              label={sugar}
              selected={filters.sugar.includes(sugar)}
              onClick={() => onFilterToggle("sugar", sugar)}
            />
          ))}
        </FilterRow>
        <FilterRow title="중량">
          {barWeightOptions.map((weight) => (
            <FilterChip
              key={weight}
              label={weight}
              selected={filters.weight.includes(weight)}
              onClick={() => onFilterToggle("weight", weight)}
            />
          ))}
        </FilterRow>
      </div>
    );

  return (
    <div className="pt-0">
      <div className="md:hidden">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen((current) => !current)}
            className="flex items-center gap-1 py-1 text-xs font-bold text-[#454545] hover:text-[var(--foreground)]"
            aria-expanded={mobileFilterOpen}
          >
            상세 필터
            <span
              className={`inline-block transition-transform duration-200 ${
                mobileFilterOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>
          {mobileToolbarSlot}
        </div>

        {mobileFilterOpen ? (
          <div className="filter-drawer pt-1">
            <div className="filter-drawer__handle" />
            {filterRows}
            <div className="filter-drawer__apply mt-3 flex items-center justify-between gap-3">
              <button type="button" onClick={onResetFilters} className="btn-reset">
                초기화
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="btn-apply inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                필터 적용
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="hidden md:block">
        {filterRows}
        {desktopFooterSlot ? (
          <div className="mt-1.5 border-t border-[var(--border)] pt-1.5">
            {desktopFooterSlot}
          </div>
        ) : null}
      </div>
    </div>
  );
}

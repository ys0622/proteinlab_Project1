"use client";

import { useState } from "react";
import TrackedLink from "@/app/components/TrackedLink";

export type CalcLevel = { key: string; label: string; perKg: number; note: string };
export type CalcCategory = { key: string; label: string; href: string; proteins: number[] };

/**
 * 하루 섭취량 가이드 안의 계산기(2026-11-18). 빙 '단백질 하루 섭취량' 1~10위가 모두 계산기 페이지라
 * 글 안에서 바로 계산되게 했다. 배수는 본문 표와 같은 값(2020 KDRI 0.91, PROT-AGE 1.2, ISSN 1.6·2.0),
 * 한 끼 목표는 ISSN의 체중 1kg당 0.25g. 제품 수는 등록 제품 성분표의 1개 단백질로 센다.
 */
export default function DailyProteinCalc({ levels, categories }: { levels: CalcLevel[]; categories: CalcCategory[] }) {
  const [weight, setWeight] = useState("60");
  const [levelKey, setLevelKey] = useState(levels[0]?.key ?? "");
  const level = levels.find((l) => l.key === levelKey) ?? levels[0];
  const w = Number.parseFloat(weight);
  const valid = Number.isFinite(w) && w >= 20 && w <= 250;
  const daily = valid ? Math.round(w * level.perKg) : 0;
  const perMeal = valid ? Math.round(w * 0.25) : 0;

  return (
    <div id="daily-protein-calculator" className="rounded-2xl border border-[#d7e6da] bg-[#f5fbf6] px-4 py-4">
      <p className="text-sm font-semibold text-[#24543d]">내 하루 단백질 섭취량 계산</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-[var(--foreground)]">체중</span>
          <div className="mt-1 flex items-center rounded-xl border border-[#c5dcc9] bg-white px-3 py-2.5 focus-within:border-[#24543d]">
            <input
              type="number"
              min="20"
              max="250"
              step="0.1"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              aria-label="체중(kg)"
              className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none"
            />
            <span className="ml-2 shrink-0 text-sm text-[var(--foreground-muted)]">kg</span>
          </div>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-[var(--foreground)]">기준</span>
          <select
            value={levelKey}
            onChange={(e) => setLevelKey(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#c5dcc9] bg-white px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[#24543d]"
          >
            {levels.map((l) => (
              <option key={l.key} value={l.key}>
                {l.label} ({l.perKg}g/kg)
              </option>
            ))}
          </select>
        </label>
      </div>

      {valid ? (
        <div className="mt-4 rounded-xl border border-[#d7e6da] bg-white px-4 py-4">
          <p className="text-sm text-[var(--foreground-muted)]">
            하루 <strong className="text-2xl font-bold text-[#24543d]">{daily}g</strong>
            <span className="ml-2 text-xs">
              {w}kg × {level.perKg}g · {level.note}
            </span>
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            한 끼 목표는 약 <strong className="text-[var(--foreground)]">{perMeal}g</strong>(체중 1kg당 0.25g, ISSN 2017)입니다. 등록 제품
            중 1개로 한 끼 {perMeal}g을 채우는 제품:
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => {
              const n = c.proteins.filter((p) => p >= perMeal).length;
              return (
                <li key={c.key}>
                  <TrackedLink
                    href={c.href}
                    trackingLabel={`계산기 ${c.label}`}
                    trackingSection="daily_requirement_calc_category"
                    trackingPageType="guide"
                    className="inline-flex rounded-full border border-[#d7e6da] bg-white px-3 py-1.5 text-sm font-semibold text-[#24543d] hover:border-[#24543d]"
                  >
                    {c.label} {n}/{c.proteins.length}종
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-sm text-[var(--foreground-muted)]">체중을 20~250kg 사이로 입력하세요.</p>
      )}

      <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
        건강한 성인 기준입니다. 신장·간 질환이 있으면 맞지 않습니다.{" "}
        <TrackedLink
          href="/guides/tools#daily-protein-calculator"
          trackingLabel="하루 단백질 계산기"
          trackingSection="daily_requirement_calculator_cta"
          trackingPageType="guide"
          className="font-semibold text-[var(--accent)] hover:underline"
        >
          목표·활동량별 계산기
        </TrackedLink>
      </p>
    </div>
  );
}

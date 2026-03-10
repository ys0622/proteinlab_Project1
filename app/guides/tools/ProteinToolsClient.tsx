"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ActivityLevel = "none" | "light" | "moderate" | "intense";
type Goal = "wellness" | "diet" | "muscle";

const activityOptions: { value: ActivityLevel; label: string; factor: number }[] = [
  { value: "none", label: "운동 없음", factor: 0.8 },
  { value: "light", label: "주 1~2회 가벼운 운동", factor: 1.2 },
  { value: "moderate", label: "주 3~4회 운동", factor: 1.6 },
  { value: "intense", label: "고강도 운동 / 근력 운동", factor: 2.0 },
];

const goalOptions: { value: Goal; label: string }[] = [
  { value: "wellness", label: "건강 관리" },
  { value: "diet", label: "다이어트" },
  { value: "muscle", label: "근육 증가" },
];

function roundServings(value: number, base: number) {
  const exact = value / base;
  const min = Math.max(1, Math.floor(exact));
  const max = Math.max(min, Math.ceil(exact));

  return min === max ? `${min}개` : `${min}~${max}개`;
}

export default function ProteinToolsClient() {
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("wellness");
  const [submitted, setSubmitted] = useState(false);

  const calculation = useMemo(() => {
    const numericWeight = Number.parseFloat(weight);
    const factor = activityOptions.find((option) => option.value === activity)?.factor ?? 1.6;
    const recommendedProtein =
      Number.isFinite(numericWeight) && numericWeight > 0 ? Math.round(numericWeight * factor) : 0;

    return {
      recommendedProtein,
      drink25gCount: recommendedProtein ? roundServings(recommendedProtein, 25) : "0개",
      drink20gCount: recommendedProtein ? roundServings(recommendedProtein, 20) : "0개",
      factor,
      goalLabel: goalOptions.find((option) => option.value === goal)?.label ?? "건강 관리",
    };
  }, [activity, goal, weight]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mt-6 space-y-6">
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <form
          id="daily-protein-calculator"
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">CALCULATOR</p>
              <h2 className="mt-2 text-lg font-bold text-[var(--foreground)]">
                하루 단백질 섭취량 계산기
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-[var(--foreground)]">체중</span>
              <div className="mt-2 flex items-center rounded-xl border border-[#e8e6e3] bg-white px-4 py-3">
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  inputMode="decimal"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder="70"
                  className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none"
                />
                <span className="ml-3 shrink-0 text-sm text-[var(--foreground-muted)]">kg</span>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[var(--foreground)]">운동량</span>
              <select
                value={activity}
                onChange={(event) => setActivity(event.target.value as ActivityLevel)}
                className="mt-2 w-full rounded-xl border border-[#e8e6e3] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              >
                {activityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[var(--foreground)]">목표</span>
              <select
                value={goal}
                onChange={(event) => setGoal(event.target.value as Goal)}
                className="mt-2 w-full rounded-xl border border-[#e8e6e3] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              >
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center rounded-lg border border-[#e8e6e3] py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          >
            계산하기
          </button>
        </form>

        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">RESULT</p>
          <h2 className="mt-2 text-lg font-bold text-[var(--foreground)]">
            당신의 하루 권장 단백질 섭취량
          </h2>

          <div className="mt-5 rounded-2xl border border-[#eef1f3] bg-[#fafbfc] px-4 py-5">
            <p className="text-xs text-[var(--foreground-muted)]">
              {submitted ? `${calculation.goalLabel} 기준 계산 결과` : "입력 후 계산 결과가 표시됩니다"}
            </p>
            <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
              {calculation.recommendedProtein > 0 ? `${calculation.recommendedProtein}g / day` : "0g / day"}
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              이는 일반적인 권장 범위를 기반으로 계산된 값입니다. 개인의 건강 상태와 식사
              패턴에 따라 달라질 수 있습니다.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              계산 기준: {calculation.factor.toFixed(1)} g/kg
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              체중과 운동량 조합을 바꾸면 결과도 함께 달라집니다. 목표는 해석 참고용으로
              함께 표시됩니다.
            </p>
          </div>
        </section>
      </section>

      <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
        <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">PRODUCT LINK</p>
        <h2 className="mt-2 text-lg font-bold text-[var(--foreground)]">
          이 섭취량을 채우기 위한 단백질 음료 예시
        </h2>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#eef1f3] bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">단백질 25g 제품 기준</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              하루 약 {calculation.drink25gCount}
            </p>
          </div>

          <div className="rounded-xl border border-[#eef1f3] bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">단백질 20g 제품 기준</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              하루 약 {calculation.drink20gCount}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
          실제 섭취는 일반 식사와 단백질 음료를 함께 조합해 나누어 채우는 방식이 더
          현실적입니다.
        </p>

        <Link
          href="/products"
          className="mt-5 inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-4 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
        >
          단백질 음료 비교 보기
        </Link>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h3 className="text-base font-bold text-[var(--foreground)]">단백질은 왜 중요할까</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            단백질은 근육, 면역, 호르몬 생성 등에 중요한 역할을 하는 필수 영양소입니다.
          </p>
        </article>

        <article className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h3 className="text-base font-bold text-[var(--foreground)]">
            운동량에 따라 단백질 필요량이 달라지는 이유
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            운동량이 증가하면 근육 회복과 합성을 위해 더 많은 단백질이 필요합니다.
          </p>
        </article>

        <article className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <h3 className="text-base font-bold text-[var(--foreground)]">
            계산 결과는 어떻게 활용하면 좋을까
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            하루 단백질 섭취량은 일반 식사와 단백질 제품을 적절히 조합하여 채우는 것이
            좋습니다.
          </p>
        </article>
      </section>
    </div>
  );
}

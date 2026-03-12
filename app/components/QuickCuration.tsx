"use client";

type QuickCurationItem = {
  label: string;
  href: string;
  icon: string;
};

const drinkQuickCurationItems: QuickCurationItem[] = [
  { label: "당류 0g", href: "/picks/zero-sugar", icon: "🍬" },
  { label: "라이트 20g 미만", href: "/picks/light-protein-under-20", icon: "🪶" },
  { label: "고단백 20g+", href: "/picks/high-protein-20", icon: "💪" },
  { label: "초고단백 30g+", href: "/picks/high-protein", icon: "🏋" },
  { label: "워터형", href: "/picks/protein-water", icon: "💧" },
  { label: "락토프리", href: "/picks/lactose-free", icon: "🥛" },
  { label: "단백질 밀도 A", href: "/picks/value-a", icon: "📈" },
  { label: "다이어트 A", href: "/picks/diet-a", icon: "⚖" },
  { label: "퍼포먼스 A", href: "/picks/fitness-a", icon: "⚡" },
  { label: "러닝", href: "/curation/running/drink", icon: "🏃" },
  { label: "식물성", href: "/picks/vegan", icon: "🌿" },
];

const barQuickCurationItems: QuickCurationItem[] = [
  { label: "고단백 20g+", href: "/picks/bar-high-protein-20", icon: "💪" },
  { label: "고단백 15g+", href: "/picks/bar-high-protein-15", icon: "🏋" },
  { label: "저당", href: "/picks/bar-low-sugar", icon: "🍬" },
  { label: "저칼로리", href: "/picks/bar-low-calorie", icon: "⚖" },
  { label: "초코", href: "/picks/bar-choco", icon: "🍫" },
  { label: "견과", href: "/picks/bar-nut", icon: "🥜" },
  { label: "무견과", href: "/picks/bar-no-nut", icon: "🌾" },
  { label: "대용량", href: "/picks/bar-large", icon: "📦" },
  { label: "소용량", href: "/picks/bar-small", icon: "🧃" },
  { label: "고밀도", href: "/picks/bar-high-density", icon: "📈" },
  { label: "러닝", href: "/curation/running/bar", icon: "🏃" },
];

interface QuickCurationProps {
  productType: "drink" | "bar";
  className?: string;
  variant?: "card" | "inline";
}

function QuickCurationChip({
  item,
  compact = false,
}: {
  item: QuickCurationItem;
  compact?: boolean;
}) {
  return (
    <a
      href={item.href}
      className={`shrink-0 inline-flex items-center justify-center rounded-full border border-[var(--curation-chip-bg)] bg-[var(--curation-chip-bg)] font-medium leading-none text-[var(--curation-chip-text)] transition-opacity hover:opacity-90 ${
        compact ? "h-[26px] px-2 text-[10px] sm:text-[11px]" : "px-2.5 py-1 text-[11px]"
      }`}
    >
      <span
        className="inline-flex items-center justify-center"
        aria-hidden
        style={{ fontSize: compact ? "16px" : "17px", marginRight: "6px", lineHeight: 1 }}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </a>
  );
}

export default function QuickCuration({
  productType,
  className = "",
  variant = "card",
}: QuickCurationProps) {
  const items = productType === "bar" ? barQuickCurationItems : drinkQuickCurationItems;

  if (variant === "inline") {
    return (
      <div
        className={`rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-3 py-3 ${className}`.trim()}
      >
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center">
          <div className="flex h-6 shrink-0 items-center" style={{ minWidth: "5rem" }}>
            <p
              className="text-[11px] font-bold leading-none text-[var(--foreground-muted)]"
              style={{ margin: 0 }}
            >
              빠른 큐레이션
            </p>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-1.5">
            {items.map((item) => (
              <QuickCurationChip key={item.label} item={item} compact />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-3 py-3 ${className}`.trim()}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[var(--foreground)]">빠른 큐레이션</p>
        <span className="text-[11px] text-[var(--foreground-muted)]">좌우로 넘겨보기</span>
      </div>
      <div className="-mx-3 -mb-1 mt-1 overflow-x-auto px-3 pb-2">
        <div className="flex min-w-max" style={{ gap: "6px" }}>
          {items.map((item) => (
            <QuickCurationChip key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

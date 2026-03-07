/* proteinlab.kr 빠른 큐레이션 (chip: padding 6px 12px, font-size 14px, border-radius 8px, gap 8px) */
const items = [
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
  "shrink-0 rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-1.5 text-[14px] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]";

export default function QuickCuration() {
  return (
    <div className="border-b border-[var(--border)] py-4">
      <p className="mb-3 text-[14px] font-medium text-[var(--foreground)]">빠른 큐레이션</p>
      <div className="flex overflow-x-auto pb-1" style={{ gap: "var(--chip-gap)" }}>
        {items.map((item) => (
          <a key={item.label} href={item.href} className={chipClass}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

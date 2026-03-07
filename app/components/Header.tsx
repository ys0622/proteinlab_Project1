import Link from "next/link";

const navItems = [
  { label: "단백질 음료", href: "/" },
  { label: "단백질 바", href: "/bars" },
  { label: "제품 추천", href: "/recommend" },
  { label: "등급 랭킹", href: "/ranking" },
  { label: "등급 기준", href: "/grade-criteria" },
  { label: "브랜드 이벤트 & 혜택", href: "/official-events" },
  { label: "단백질 가이드", href: "/guides" },
  { label: "문의", href: "/contact" },
  { label: "관리", href: "/admin", adminOnly: true },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-[#ffffff]">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="shrink-0 text-lg font-bold text-[var(--accent)]">
          ProteinLab
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 md:gap-2" aria-label="메인 메뉴">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-2 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] ${
                item.adminOnly ? "text-[var(--foreground-muted)]" : ""
              }`}
              title={item.adminOnly ? "관리자 전용" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
  { label: "블로그", href: "https://blog.naver.com/proteinlab2026", external: true },
];

// 모든 페이지에서 주요 허브로 가는 링크(2026-10-23). 구글이 홈 1개만 색인한 상태라 허브까지 가는 길을 서버 HTML에 고정해 둔다.
const SITE_SECTIONS = [
  {
    title: "제품 비교",
    links: [
      { label: "단백질 음료", href: "/drinks" },
      { label: "단백질 바", href: "/bars" },
      { label: "단백질 쉐이크", href: "/shake" },
      { label: "단백질 요거트", href: "/yogurt" },
      { label: "고단백 두유", href: "/soymilk" },
      { label: "전체 제품", href: "/products" },
    ],
  },
  {
    title: "고르는 법",
    links: [
      { label: "가이드", href: "/guides" },
      { label: "제품끼리 비교", href: "/compare" },
      { label: "브랜드별", href: "/brands" },
      { label: "랭킹", href: "/ranking" },
      { label: "골드박스 특가", href: "/goldbox" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-10">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        {/* 사이트 주요 메뉴 */}
        <nav className="mb-8 grid grid-cols-2 gap-6 sm:mx-auto sm:max-w-[560px]" aria-label="사이트 주요 메뉴">
          {SITE_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="mb-2 text-sm font-semibold text-[var(--foreground)]">{section.title}</p>
              <ul className="space-y-1.5 text-sm">
                {section.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* 링크 */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm" aria-label="푸터 메뉴">
          {FOOTER_LINKS.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:underline"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* 안내 문구 */}
        <div className="mt-6 text-center text-[13px] leading-relaxed text-[var(--foreground-muted)]">
          <p>프로틴 비교 — 단백질 음료 스펙 데이터는 공개 정보를 기반으로 작성되었습니다.</p>
          <p className="mt-1">가격 정보는 변동될 수 있으니 구매 전 확인하세요.</p>
          <p className="mt-1">
            ProteinLab은 개인이 운영하는 단백질 음료 정보 사이트이며, 특정 기업 또는 브랜드와 공식적인 관계가 없습니다.
          </p>
          <p className="mt-6 text-center text-[11px] text-[#9ca3af]">
            본 사이트는 쿠팡 파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있습니다.
          </p>
          <p className="mt-3 text-xs">
            © 2026 프로틴 비교. 본 사이트의 정보는 참고용이며 의학적 조언을 대체하지 않습니다.
          </p>
        </div>

        {/* 쿠키 설정 */}
        <div className="mt-6 text-center">
          <Link
            href="/cookie-settings"
            className="inline-block rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--foreground-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            쿠키 설정
          </Link>
        </div>
      </div>
    </footer>
  );
}

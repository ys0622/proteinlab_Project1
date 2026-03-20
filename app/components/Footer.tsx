import Link from "next/link";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-10">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        {/* 링크 */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm" aria-label="푸터 메뉴">
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 안내 문구 */}
        <div className="mt-6 text-center text-[13px] leading-relaxed text-[var(--foreground-muted)]">
          <p>프로틴 비교 — 단백질 음료 스펙 데이터는 공개 정보를 기반으로 작성되었습니다.</p>
          <p className="mt-1">가격 정보는 변동될 수 있으니 구매 전 확인하세요.</p>
          <p className="mt-1">
            ProteinLab은 개인이 운영하는 단백질 음료 정보 사이트이며, 특정 기업 또는 브랜드와 공식적인 관계가 없습니다.
          </p>
          <p className="mt-2 text-xs">
            이 사이트의 일부 쿠팡 구매 링크는 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
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

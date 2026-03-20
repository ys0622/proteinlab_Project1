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
        {/* ë§í¬ */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm" aria-label="?¸í„° ë©”ë‰´">
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

        {/* ?ˆë‚´ ë¬¸êµ¬ */}
        <div className="mt-6 text-center text-[13px] leading-relaxed text-[var(--foreground-muted)]">
          <p>?„ë¡œ??ë¹„êµ ???¨ë°±ì§??Œë£Œ ?¤íŽ™ ?°ì´?°ëŠ” ê³µê°œ ?•ë³´ë¥?ê¸°ë°˜?¼ë¡œ ?‘ì„±?˜ì—ˆ?µë‹ˆ??</p>
          <p className="mt-1">ê°€ê²??•ë³´??ë³€?™ë  ???ˆìœ¼??êµ¬ë§¤ ???•ì¸?˜ì„¸??</p>
          <p className="mt-1">
            ProteinLab?€ ê°œì¸???´ì˜?˜ëŠ” ?¨ë°±ì§??Œë£Œ ?•ë³´ ?¬ì´?¸ì´ë©? ?¹ì • ê¸°ì—… ?ëŠ” ë¸Œëžœ?œì? ê³µì‹?ì¸ ê´€ê³„ê? ?†ìŠµ?ˆë‹¤.
          </p>
          <p className="mt-6 text-center text-[11px] text-[#9ca3af]">
            º» »çÀÌÆ®´Â ÄíÆÎ ÆÄÆ®³Ê½º È°µ¿À» ÅëÇØ ÀÏÁ¤¾×ÀÇ ¼ö¼ö·á¸¦ Á¦°ø¹ÞÀ» ¼ö ÀÖ½À´Ï´Ù.
          </p>
          <p className="mt-3 text-xs">
            Â© 2026 ?„ë¡œ??ë¹„êµ. ë³??¬ì´?¸ì˜ ?•ë³´??ì°¸ê³ ?©ì´ë©??˜í•™??ì¡°ì–¸???€ì²´í•˜ì§€ ?ŠìŠµ?ˆë‹¤.
          </p>
        </div>

        {/* ì¿ í‚¤ ?¤ì • */}
        <div className="mt-6 text-center">
          <Link
            href="/cookie-settings"
            className="inline-block rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--foreground-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ì¿ í‚¤ ?¤ì •
          </Link>
        </div>
      </div>
    </footer>
  );
}

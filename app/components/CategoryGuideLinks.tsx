import Link from "next/link";

// 카테고리 목록 아래 '고르는 가이드' 칸(파우더 페이지와 같은 모양). 첫 링크만 진하게 보여 준다.
export default function CategoryGuideLinks({
  id,
  title,
  links,
}: {
  id: string;
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className="mt-6 rounded-2xl border border-[#dfe8df] bg-[#f7fbf7] p-4 md:p-5" aria-labelledby={id}>
      <h2 id={id} className="text-[15px] font-bold text-[#1E2A22] md:text-base">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              index === 0
                ? "rounded-full bg-[#24543d] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1d4633]"
                : "rounded-full border border-[#cadbcd] bg-white px-4 py-2 text-xs font-semibold text-[#24543d] hover:bg-[#eef7f1]"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

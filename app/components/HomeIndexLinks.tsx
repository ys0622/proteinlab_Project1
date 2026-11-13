import Link from "next/link";
import homeIndexLinks from "../data/homeIndexLinks.json";

// 홈(구글이 색인한 유일한 페이지)에서 구글 색인 대상 페이지로 바로 가는 링크 묶음(2026-11-13).
// 목록은 app/data/googleIndexKeep.json 중 홈에 링크가 없던 페이지, 네이버 30일 클릭순.
type LinkItem = { href: string; label: string };

const GROUPS: { key: "compare" | "pick" | "intake" | "brand"; title: string }[] = [
  { key: "compare", title: "많이 찾는 비교" },
  { key: "pick", title: "추천·순위 가이드" },
  { key: "intake", title: "섭취 궁금증" },
  { key: "brand", title: "브랜드 성분표" },
];

const VISIBLE = 8;

function LinkList({ items }: { items: LinkItem[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.href} className="min-w-0 break-keep leading-snug">
          <Link href={item.href} className="text-[13px] text-[#2B3A30] hover:text-[#1F5A3D] hover:underline">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function HomeIndexLinks() {
  const data = homeIndexLinks as Record<string, LinkItem[]>;
  return (
    <section className="mx-auto max-w-[1180px] px-4 pt-4 md:px-5 md:pt-6" aria-labelledby="home-index-links">
      <div
        className="rounded-[16px] border p-4 md:p-6"
        style={{ background: "#FFFDF8", borderColor: "#E8E6E3" }}
      >
        <h2
          id="home-index-links"
          className="mb-3 font-extrabold text-[17px] md:mb-4 md:text-[20px]"
          style={{ color: "#1A2B1E", letterSpacing: "-0.02em" }}
        >
          자주 찾는 비교·가이드
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((group) => {
            const items = data[group.key] ?? [];
            if (!items.length) return null;
            const cut = items.length - VISIBLE <= 2 ? items.length : VISIBLE;
            const head = items.slice(0, cut);
            const rest = items.slice(cut);
            return (
              <div key={group.key} className="min-w-0">
                <h3 className="mb-2 text-[13px] font-bold" style={{ color: "#1F5A3D" }}>
                  {group.title}
                </h3>
                <LinkList items={head} />
                {rest.length ? (
                  <details className="mt-1.5">
                    <summary className="cursor-pointer text-[12px] font-semibold text-[#6b7a70] hover:text-[#1F5A3D]">
                      더 보기 ({rest.length})
                    </summary>
                    <div className="mt-1.5">
                      <LinkList items={rest} />
                    </div>
                  </details>
                ) : null}
              </div>
            );
          })}
        </div>
        {data.etc?.length ? (
          <p className="mt-4 text-[12px] text-[#6b7a70]">
            {data.etc.map((item, i) => (
              <span key={item.href}>
                {i > 0 ? " · " : null}
                <Link href={item.href} className="hover:text-[#1F5A3D] hover:underline">
                  {item.label}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  );
}

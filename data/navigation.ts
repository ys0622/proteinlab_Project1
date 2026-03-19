import { ORDERED_CATEGORY_IDS, getCategoryHref, getCategoryLabel } from "@/app/lib/categories";

export type NavigationChildItem = {
  label: string;
  href: string;
};

export type NavigationItem = {
  label: string;
  href?: string;
  children?: NavigationChildItem[];
  adminOnly?: boolean;
};

export const navigationItems: NavigationItem[] = [
  {
    label: "제품 목록",
    children: ORDERED_CATEGORY_IDS.map((category) => ({
      label: getCategoryLabel(category),
      href: getCategoryHref(category),
    })),
  },
  { label: "제품 추천", href: "/recommend" },
  {
    label: "랭킹 & 등급기준",
    children: [
      { label: "제품 랭킹", href: "/ranking" },
      { label: "등급 기준", href: "/grade-criteria" },
    ],
  },
  { label: "🔥 이벤트/핫딜", href: "/official-events" },
  { label: "단백질 가이드", href: "/guides" },
  { label: "문의", href: "/contact" },
];

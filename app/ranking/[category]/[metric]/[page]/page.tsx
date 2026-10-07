import { notFound } from "next/navigation";
import { renderRankingPage } from "../../../RankingContent";
import type { ProductCategory } from "../../../../lib/categories";

type GradeMetric = "density" | "diet" | "performance";
interface PageProps {
  params: Promise<{ category: string; metric: string; page: string }>;
}

export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps) {
  const { category, metric, page } = await params;
  return {
    title: "단백질 랭킹 2026 — 밀도·다이어트·퍼포먼스 기준 순위",
    description: "단백질 음료, 바, 요거트, 쉐이크를 영양성분 기준으로 계산한 순위입니다.",
    alternates: { canonical: `https://proteinlab.kr/ranking/${category}/${metric}/${page}` },
  };
}

export default async function RankingDetailPage({ params }: PageProps) {
  const { category, metric, page } = await params;
  const pageNumber = Number(page);
  if (!["drink", "bar", "yogurt", "shake"].includes(category)
    || !["density", "diet", "performance"].includes(metric)
    || !Number.isSafeInteger(pageNumber) || pageNumber < 1) notFound();

  return renderRankingPage(category as ProductCategory, metric as GradeMetric, pageNumber);
}

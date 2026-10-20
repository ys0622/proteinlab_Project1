import { renderSitemapGroup } from "@/app/lib/sitemapSplit";

export const revalidate = 3600;

export function GET() {
  return renderSitemapGroup("guides");
}

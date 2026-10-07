import { NextResponse } from "next/server";
import { getRecentPopularity } from "../../lib/recentPopularity";

export async function GET() {
  const result = await getRecentPopularity(true);
  return NextResponse.json(result, {
    status: result.available ? 200 : 503,
    headers: result.available ? { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" } : {},
  });
}

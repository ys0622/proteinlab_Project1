import { NextRequest, NextResponse } from "next/server";
import {
  getCoupangDestinationUrl,
  type CoupangLinkCategory,
  isValidExternalUrl,
} from "@/app/lib/purchaseLinks";

function toCategory(value: string | null): CoupangLinkCategory | null {
  if (
    value === "drink" ||
    value === "bar" ||
    value === "yogurt" ||
    value === "shake" ||
    value === "guide" ||
    value === "ranking"
  ) {
    return value;
  }
  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const slug = searchParams.get("slug");
  const category = toCategory(searchParams.get("category"));

  const destination = getCoupangDestinationUrl(url, category, slug);
  if (!destination || !isValidExternalUrl(destination)) {
    return NextResponse.json({ error: "invalid_coupang_url" }, { status: 400 });
  }

  return NextResponse.redirect(destination, 307);
}

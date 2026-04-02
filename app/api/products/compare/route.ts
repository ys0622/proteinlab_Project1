import { NextResponse } from "next/server";
import { getProductBySlugAsync } from "@/app/lib/productData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slugsParam = searchParams.get("slugs");
    const slugs = slugsParam ? slugsParam.split(",").map((s) => s.trim()).filter(Boolean) : [];

    if (slugs.length === 0) {
      return NextResponse.json({ products: [] });
    }

    const results = await Promise.all(slugs.map((slug) => getProductBySlugAsync(slug)));
    const products = results.filter(
      (product): product is NonNullable<(typeof results)[number]> => product != null,
    );

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "제품을 불러올 수 없습니다." }, { status: 400 });
  }
}

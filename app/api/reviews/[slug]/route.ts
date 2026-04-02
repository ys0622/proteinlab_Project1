import { NextResponse } from "next/server";
import { getReviews, saveReview, type ProductReview as Review } from "@/app/lib/reviewData";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reviews = await getReviews(slug);
  return NextResponse.json({ reviews });
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let body: { rating?: unknown; tags?: unknown; comment?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { rating, tags, comment } = body;

  if (!rating || !["up", "mid", "down"].includes(rating as string)) {
    return NextResponse.json({ error: "rating is required (up/mid/down)" }, { status: 400 });
  }

  const review: Review = {
    id: crypto.randomUUID(),
    rating: rating as "up" | "mid" | "down",
    tags: Array.isArray(tags) ? (tags as string[]).slice(0, 10) : [],
    comment: typeof comment === "string" ? comment.trim().slice(0, 500) : "",
    createdAt: new Date().toISOString(),
  };

  const result = await saveReview(slug, review);
  return NextResponse.json(result);
}

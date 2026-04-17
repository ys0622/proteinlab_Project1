const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";

function getAdsTxtPublisherId() {
  if (!ADSENSE_CLIENT_ID) return "";

  return ADSENSE_CLIENT_ID.replace(/^ca-/, "");
}

export function GET() {
  const publisherId = getAdsTxtPublisherId();

  if (!publisherId) {
    return new Response("AdSense publisher id is not configured.\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

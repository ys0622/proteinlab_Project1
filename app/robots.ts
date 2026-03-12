import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://proteinlab.kr/sitemap.xml",
    host: "https://proteinlab.kr",
  };
}

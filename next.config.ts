import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    cpus: 1,
  },
  images: {
    unoptimized: true, // Cloudflare Images 바인딩 없이 배포 (Windows 호환)
  },
  async redirects() {
    return [
      {
        source: "/feed",
        destination: "/rss.xml",
        permanent: true,
      },
      {
        source: "/insights/history",
        destination: "/guides/market-insights/protein-market-history",
        permanent: true,
      },
      {
        source: "/guides/insights/history",
        destination: "/guides/market-insights/protein-market-history",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
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
      {
        source: "/guides/protein-basics/protein-absorption",
        destination: "/guides/basics/digestion",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-intake-amount",
        destination: "/guides/basics/daily-requirement",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-health-impact",
        destination: "/guides/basics/immunity-hormone",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-types",
        destination: "/guides/basics/protein-drink-vs-powder",
        permanent: true,
      },
      {
        source: "/guides/protein-basics/protein-basics-overview",
        destination: "/guides/basics/role-overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}

import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import AnalyticsPageViewTracker from "./components/AnalyticsPageViewTracker";
import CompareBar from "./components/CompareBar";
import CompareBarSpacer from "./components/CompareBarSpacer";
import { CompareProvider } from "./context/CompareContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://proteinlab.kr"),
  title: "단백질 제품 비교·추천 | 음료·바·요거트·쉐이크 성분 기준 | ProteinLab",
  description:
    "단백질 음료, 단백질 바, 단백질 요거트, 단백질 쉐이크 290개 이상을 단백질·당류·칼로리 성분 기준으로 비교합니다. 목적별 추천과 등급 순위까지 한 번에 확인하세요.",
  openGraph: {
    title: "단백질 제품 비교·추천 | 음료·바·요거트·쉐이크 성분 기준 | ProteinLab",
    description:
      "단백질 음료, 단백질 바, 단백질 요거트, 단백질 쉐이크 290개 이상을 단백질·당류·칼로리 성분 기준으로 비교합니다. 목적별 추천과 등급 순위까지 한 번에 확인하세요.",
    url: "https://proteinlab.kr",
    siteName: "ProteinLab",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/proteinlab-logo.png",
        alt: "ProteinLab — 단백질 제품 성분 비교 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "단백질 제품 비교·추천 | 음료·바·요거트·쉐이크 성분 기준 | ProteinLab",
    description:
      "단백질 음료, 단백질 바, 단백질 요거트, 단백질 쉐이크 290개 이상을 단백질·당류·칼로리 성분 기준으로 비교합니다. 목적별 추천과 등급 순위까지 한 번에 확인하세요.",
    images: ["/proteinlab-logo.png"],
  },
  verification: {
    other: {
      "naver-site-verification": "4ef87ce2265895dced0d44ac8ed5921f0cef0064",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  send_page_view: false,
                });
              `}
            </Script>
          </>
        ) : null}
        <FavoritesProvider>
          <CompareProvider>
            <Suspense fallback={null}>
              <AnalyticsPageViewTracker />
            </Suspense>
            {children}
            <CompareBarSpacer />
            <CompareBar />
          </CompareProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}

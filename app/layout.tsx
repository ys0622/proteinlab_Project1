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
const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://proteinlab.kr"),
  title: "ProteinLab | 단백질 제품 비교",
  description: "322개 단백질 음료·바·요거트를 단백질·당류·칼로리 기준으로 바로 비교합니다.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💪</text></svg>",
  },
  openGraph: {
    title: "ProteinLab | 단백질 제품 비교",
    description: "322개 단백질 제품을 성분 기준으로 정리해 바로 비교할 수 있습니다.",
    url: "https://proteinlab.kr",
    siteName: "ProteinLab",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ProteinLab | 단백질 제품 비교",
    description: "단백질·당류·칼로리로 322개 제품을 비교합니다.",
  },
  verification: {
    other: {
      "naver-site-verification": "4ef87ce2265895dced0d44ac8ed5921f0cef0064",
    },
  },
  robots: isProd
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
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

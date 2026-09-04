import type { Metadata, Viewport } from "next";
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
// robots는 NODE_ENV에 기대지 않는다: 엣지/워커 런타임에서 NODE_ENV가 기대와 다르게 평가되면
// 사이트 전체가 noindex로 나가는 사고로 이어질 수 있다(실제로 겪음). 명시적으로 "true"를 켤 때만
// 색인을 막고, 그 외에는 항상 색인 허용으로 안전하게 기본값을 둔다.
const shouldIndex = process.env.NEXT_PUBLIC_DISABLE_INDEXING !== "true";

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#16412D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://proteinlab.kr"),
  other: {
    "color-scheme": "light",
    "supported-color-schemes": "light",
  },
  title: "단백질 제품 비교 — ProteinLab",
  description: "단백질 음료·바·요거트·쉐이크를 단백질 함량, 당류, 칼로리 기준으로 바로 비교합니다.",
  icons: {
    icon: "/proteinlab-logo.png",
    apple: "/proteinlab-logo.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ProteinLab",
  },
  openGraph: {
    title: "단백질 제품 비교 — ProteinLab",
    description: "단백질 음료·바·요거트·쉐이크를 단백질 함량, 당류, 칼로리 기준으로 바로 비교합니다.",
    url: "https://proteinlab.kr",
    siteName: "ProteinLab",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "단백질 제품 비교 — ProteinLab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "단백질 제품 비교 — ProteinLab",
    description: "단백질 음료·바·요거트·쉐이크를 단백질 함량, 당류, 칼로리 기준으로 바로 비교합니다.",
    images: ["/opengraph-image"],
  },
  verification: {
    other: {
      "naver-site-verification": "4ef87ce2265895dced0d44ac8ed5921f0cef0064",
    },
  },
  robots: shouldIndex
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
        {isProd && GA_ID ? (
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
        <Script
          id="prevent-dark-mode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.colorScheme='only light';document.documentElement.style.backgroundColor='#ffffff';`,
          }}
        />
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

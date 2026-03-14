import type { Metadata } from "next";
import Script from "next/script";
import CompareBar from "./components/CompareBar";
import CompareBarSpacer from "./components/CompareBarSpacer";
import { CompareProvider } from "./context/CompareContext";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://proteinlab.kr"),
  title: "단백질 제품 비교 플랫폼 | ProteinLab",
  description:
    "단백질 음료, 단백질 바, 단백질 요거트를 성분 데이터로 비교하고 추천, 랭킹, 등급 기준까지 한곳에서 확인하는 ProteinLab입니다.",
  openGraph: {
    title: "단백질 제품 비교 플랫폼 | ProteinLab",
    description:
      "단백질 음료, 단백질 바, 단백질 요거트를 성분 데이터로 비교하고 추천, 랭킹, 등급 기준까지 한곳에서 확인하는 ProteinLab입니다.",
    url: "https://proteinlab.kr",
    siteName: "ProteinLab",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "단백질 제품 비교 플랫폼 | ProteinLab",
    description:
      "단백질 음료, 단백질 바, 단백질 요거트를 성분 데이터로 비교하고 추천, 랭킹, 등급 기준까지 한곳에서 확인하는 ProteinLab입니다.",
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
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        ) : null}
        <CompareProvider>
          {children}
          <CompareBarSpacer />
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}

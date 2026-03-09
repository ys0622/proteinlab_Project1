import type { Metadata } from "next";
import Script from "next/script";
import CompareBar from "./components/CompareBar";
import CompareBarSpacer from "./components/CompareBarSpacer";
import { CompareProvider } from "./context/CompareContext";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "단백질 음료 비교등급 정리 | ProteinLab",
  description:
    "셀렉스, 하이뮨, 더단백 등 국내 단백질 음료를 성분 데이터로 비교합니다. 목적별 추천등급 랭킹가이드까지 한 곳에서 확인하세요.",
  openGraph: {
    title: "단백질 음료 비교등급 정리 | ProteinLab",
    description:
      "셀렉스, 하이뮨, 더단백 등 국내 단백질 음료를 성분 데이터로 비교합니다. 목적별 추천등급 랭킹가이드까지 한 곳에서 확인하세요.",
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

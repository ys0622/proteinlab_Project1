import type { Metadata } from "next";
import Script from "next/script";
import CompareBar from "./components/CompareBar";
import CompareBarSpacer from "./components/CompareBarSpacer";
import { CompareProvider } from "./context/CompareContext";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "ProteinLab | 단백질 음료 비교 플랫폼",
  description: "국내 단백질 제품의 성분과 영양 정보를 비교·정리하는 플랫폼입니다.",
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

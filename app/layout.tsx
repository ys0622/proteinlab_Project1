import type { Metadata } from "next";
import CompareBar from "./components/CompareBar";
import CompareBarSpacer from "./components/CompareBarSpacer";
import { CompareProvider } from "./context/CompareContext";
import "./globals.css";

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
        <CompareProvider>
          {children}
          <CompareBarSpacer />
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}

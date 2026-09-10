import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "쿠키 설정 — ProteinLab",
  robots: { index: false, follow: true },
};

export default function CookieSettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

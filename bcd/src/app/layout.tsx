import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 방금 만든 네비바 불러오기

export const metadata: Metadata = {
  title: "BCD Blog",
  description: "Identity based blog service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased bg-gray-50">
        <Navbar /> {/* 모든 페이지 최상단에 고정됨 */}
        <main>{children}</main>
      </body>
    </html>
  );
}
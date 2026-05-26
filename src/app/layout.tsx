import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "NurseCoder — 간호사가 만든 일상의 작은 도구들",
  description:
    "의료 현장에서 일하는 개발자가 만든 도구들을 모아둔 곳. 누구나 다운로드해서 바로 쓸 수 있어요.",
  icons: { icon: "/logo-64.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink-soft">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

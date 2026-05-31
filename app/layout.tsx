import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "타로 노트",
  description: "매일 뽑은 타로 카드를 이미지와 함께 기록하고 되돌아보는 나만의 디지털 타로 일지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
          <Nav />
          <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</div>
        </body>
    </html>
  );
}

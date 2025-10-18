// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import BodyLayout from "@/components/BodyLayout";

export const metadata: Metadata = {
  title: "フリマ - トップ",
  description: "商品一覧",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <BodyLayout>{children}</BodyLayout>
      </body>
    </html>
  );
}
"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function BodyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const logoOnly = pathname === "/login"|| pathname === "/register"; // 必要に応じて条件拡張

    return (
    <>
      <Header logoOnly={logoOnly} />
      <main className="mw-full px-4 py-6">{children}</main>
    </>
  );
}
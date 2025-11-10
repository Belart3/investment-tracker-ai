"use client";

import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FixedSideBar from "../components/ui/fixedSideBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


// export const metadata: Metadata = {
//   title: "Investment Tracker AI",
//   description: "Track your investments with AI",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // define the routes where you DON'T want the components to appear
  const hideSideBarRoutes = ["/login", "/signup"];

  const showSideBar = !hideSideBarRoutes.includes(pathname);
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body
        className={`antialiased bg-[#0D1117]`}
      >
        {
          showSideBar && <FixedSideBar />
        }
        {children}
      </body>
    </html>
  );
}

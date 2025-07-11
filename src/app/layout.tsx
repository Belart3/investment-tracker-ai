import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FixedSideBar from "./components/fixedSideBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Investment Tracker AI",
  description: "Track your investments with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body
        className={`antialiased bg-[#0D1117]`}
      >
        <FixedSideBar />
        {children}
      </body>
    </html>
  );
}

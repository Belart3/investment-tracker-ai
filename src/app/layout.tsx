"use client";

import { usePathname } from "next/navigation";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import FixedSideBar from "../components/ui/fixedSideBar";
import MobileNavbar from "@/components/ui/MobileNavbar";
import LiveMarketData from "@/components/ui/liveMarketData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // define the routes where you DON'T want the components to appear
  const hideSideBarRoutes = ["/signin", "/signup", "/onboarding"];

  const showSideBar = !hideSideBarRoutes.includes(pathname);
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="antialiased">
        {
          showSideBar && <FixedSideBar />
        }
        {
          showSideBar && <MobileNavbar />
        }
        {
          showSideBar && <LiveMarketData />
        }
        {children}
      </body>
    </html>
  );
}

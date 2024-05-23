import "./style/globals.scss";
import "./global.scss";
import type { Metadata } from "next";
import { LenisScroller } from "./components/lenis-scroller";
import { Client } from "./components/client";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900", "800", "700", "600", "500", "400", "200"],
});

export const metadata: Metadata = {
  title: "ROJO ARQ",
  description: "Arquitectura, diseño y construcción.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Client />
        {children}
        <SpeedInsights />
        <Analytics/>
      </body>
      {/* <LenisScroller /> */}
    </html>
  );
}

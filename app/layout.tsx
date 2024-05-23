import "./style/globals.scss";
import "./global.scss";
import type { Metadata } from "next";
import { LenisScroller } from "./components/lenis-scroller";
import { Client } from "./components/client";
import { Montserrat, Radio_Canada } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { primaryFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";


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
    <html lang="en" className={cn(primaryFont.variable)}>
      <body>
        <Client />
        {children}
        <SpeedInsights />
        <Analytics/>
      </body>
    </html>
  );
}

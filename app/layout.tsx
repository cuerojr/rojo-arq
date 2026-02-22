
import "./global.css";

import { Client } from "./components/client";
import { Funnel_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { primaryFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Cursor from "./components/custom-cursor/custom-cursor";
import Navbar from "./components/navbar";
import Footer from "./components/footer-new";

const funnel = Funnel_Display({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(funnel.className)}>
      <body>
        <Client />
        {/*<Cursor />*/}
        <Navbar />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics/>
      </body>
    </html>
  );
}

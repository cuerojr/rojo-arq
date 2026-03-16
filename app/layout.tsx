import "./global.css";

import { Client } from "./components/client";
import { Funnel_Display, Geist } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@/lib/utils";

import Navbar from "./components/navbar";
import Footer from "./components/footer-new";
import Cotizador from "./components/asesoria/asesoria";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const funnel = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(funnel.className, "font-sans", geist.variable)}>
      <body className="text-rojoarq-black bg-rojoarq-white selection:text-rojoarq-pink">
        <Client />
        <Cotizador />
        <Navbar />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

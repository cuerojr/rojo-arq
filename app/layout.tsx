import "./style/globals.scss";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import SmoothScroll from "./components/smooth-scroll";

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
        {/*<SmoothScroll> */}
          {children}
        {/*</SmoothScroll> */}
      </body>
    </html>
  );
}

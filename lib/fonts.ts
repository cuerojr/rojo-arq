import localFont from "next/font/local";

const primaryFont = localFont({
  variable: "--font-secondary",
  preload: true,
  display: "swap",
  src: [
    {
      path: "../assets/fonts/DidotRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/DidotMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/DidotLTStdItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/DidotLTStdBold.woff2",
      weight: "900",
      style: "bold",
    },
  ],
});

export { primaryFont };

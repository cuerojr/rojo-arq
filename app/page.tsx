import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { cms } from "@/prismicio";
import { components } from "@/slices";
import Navbar from "./components/navbar";
import Cotizador from "./components/asesoria/asesoria";
import Footer from "./components/footer-new";

export default async function Page() {
  const page = await cms.getSingle("home").catch(() => notFound());

  return (
    <>
      <Cotizador />
      <Navbar />
      <SliceZone slices={page.data.slices} components={components} />;
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await cms.getSingle("home").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

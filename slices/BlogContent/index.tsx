"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useNavbarSection } from "@/hooks/use-navbar-section";

/**
 * Props for `BlogContent`.
 */
export type BlogContentProps = SliceComponentProps<Content.BlogContentSlice>;

/**
 * Component for "BlogContent" Slices.
 */
const BlogContent: FC<BlogContentProps> = ({ slice }) => {
  const ref = useNavbarSection("dark");
  const ref2 = useNavbarSection("light");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-[1440px] mx-auto"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-screen overflow-hidden"
      >
        <div className="absolute inset-0 bg-rojoarq-black opacity-50 w-full h-full object-cover z-10" />
        <PrismicNextImage
          field={slice.primary.portada}
          width={slice.primary.portada.dimensions?.width}
          height={slice.primary.portada.dimensions?.height}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div
        ref={ref2 as React.RefObject<HTMLDivElement>}
        className="min-h-screen p-10 md:px-44 md:pt-20 flex flex-col gap-10 mb-10"
      >
        <div className="text-5xl font-bold text-black">
          <PrismicRichText field={slice.primary.titulo} />
        </div>
        <div className="text-2xl">
          <PrismicRichText field={slice.primary.bajada} />
        </div>
        <div className="space-y-4">
          <PrismicRichText field={slice.primary.cuerpo_de_la_noticia} />
        </div>
        <div className="">
          <h4 className="text-2xl">Otros posts</h4>
          <div className="flex gap-4 items-center border-y">
            {slice.primary.otros_blogs.map((item: any, i: number) => (
              <div key={item.blog.id} className="py-4">
                <PrismicNextLink href={item.blog.uid} className="underline decoration-1 underline-offset-4">
                  {item.blog.uid as string}
                </PrismicNextLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogContent;

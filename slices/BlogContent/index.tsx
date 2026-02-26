import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `BlogContent`.
 */
export type BlogContentProps = SliceComponentProps<Content.BlogContentSlice>;

/**
 * Component for "BlogContent" Slices.
 */
const BlogContent: FC<BlogContentProps> = ({ slice }) => {
  console.log("🚀 ~ BlogContent ~ slice:", slice.primary);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen px-44 pt-20"
    >
      <div className="max-h-screen aspect-[9/16]">
        <PrismicNextImage field={slice.primary.portada} />
      </div>
      <div className="text-5xl font-bold text-black">
        <PrismicRichText field={slice.primary.titulo} />
      </div>
      <div className="text-2xl mb-10">
        <PrismicRichText field={slice.primary.bajada} />
      </div>
      <div className="space-y-4">
        <PrismicRichText field={slice.primary.cuerpo_de_la_noticia} />
      </div>
      <div className="  mt-10">
        <h4 className="text-2xl">Otros posts</h4>
        <div className="flex gap-4 items-center border-y">
          {slice.primary.otros_blogs.map((item: any, i: number) => (
            <div key={item.blog.id} className="py-4">
              <PrismicNextLink href={item.blog.uid}>
                {item.blog.uid as string}
              </PrismicNextLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogContent;

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { cn } from "@/lib/utils";

/**
 * Props for `GridFeatureCollection`.
 */
export type GridFeatureCollectionProps =
  SliceComponentProps<Content.GridFeatureCollectionSlice>;

/**
 * Component for "GridFeatureCollection" Slices.
 */

const GridFeatureCollection: FC<GridFeatureCollectionProps> = ({ slice }) => {
  const data = [
    "col-span-2 row-span-7 col-start-3 row-start-2",
    "col-span-2 row-span-5 col-start-1 row-start-4",
    "col-start-5 col-span-2 row-start-6 row-span-3",
    "row-span-3 col-start-5 row-start-3",
    "row-span-2 col-start-2 row-start-2",
  ];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 px-10"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-[66vw] max-h-[90vh] mx-auto  grid grid-cols-6 grid-rows-8 gap-4">
          {slice.primary.items.map((item, index) => (
            <div key={index} className={cn("bg-rojoarq-white", data[index])}>
              <PrismicNextImage
                field={item.image}
                width={item.image.dimensions?.width}
                height={item.image.dimensions?.height}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <div className="row-start-1 row-span-2 col-start-5 h-full text-lg underline underline-offset-8 decoration-1 flex flex-col justify-end">
            <PrismicRichText field={slice.primary.title} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridFeatureCollection;

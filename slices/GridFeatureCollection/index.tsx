import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `GridFeatureCollection`.
 */
export type GridFeatureCollectionProps =
  SliceComponentProps<Content.GridFeatureCollectionSlice>;

/**
 * Component for "GridFeatureCollection" Slices.
 */
const GridFeatureCollection: FC<GridFeatureCollectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-screen border"
    >
      <div className="container">
        <div className="text-4xl font-bold">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="flex gap-4">
          {slice.primary.items.map((item, index) => (
            <div key={index}>
              <PrismicNextImage
                field={item.image}
                width={item.image.dimensions?.width}
                height={item.image.dimensions?.height}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridFeatureCollection;

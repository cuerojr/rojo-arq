import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `LogoList`.
 */
export type LogoListProps = SliceComponentProps<Content.LogoListSlice>;

/**
 * Component for "LogoList" Slices.
 */
const LogoList: FC<LogoListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 px-10"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-lg py-10 underline underline-offset-8 decoration-1">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="flex gap-4">
          {slice.primary.logos.map((item, index) => (
            <div key={index}>
              <PrismicNextImage 
                field={item.logo_image}
                width={item.logo_image.dimensions?.width}
                height={item.logo_image.dimensions?.height}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoList;

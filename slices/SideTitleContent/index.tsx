import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SideTitleContent`.
 */
export type SideTitleContentProps =
  SliceComponentProps<Content.SideTitleContentSlice>;

/**
 * Component for "SideTitleContent" Slices.
 */
const SideTitleContent: FC<SideTitleContentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 px-10 flex items-center"
    >
      <div className="max-w-[1440px] mx-auto flex items-center">
        <div className="w-full lg:w-3/3">
          <div className="text-4xl font-bold text-gray-300">            
            <PrismicRichText field={slice.primary.section_title} />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="text-lg text-gray-300">
            <PrismicRichText field={slice.primary.main_content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideTitleContent;

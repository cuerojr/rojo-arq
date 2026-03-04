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
      <div className="max-w-[1440px] mx-auto">
        <div className="w-full">
          <div className="text-lg py-10 text-rojoarq-black underline underline-offset-8 decoration-1">            
            <PrismicRichText field={slice.primary.section_title} />
          </div>
        </div>
        <div className="w-full ">
          <div className="indent-56 text-2xl md:text-5xl text-rojoarq-black text-justify leading-[1.1]">
            <PrismicRichText field={slice.primary.main_content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideTitleContent;

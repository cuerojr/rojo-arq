"use client"

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useNavbarSection } from "@/hooks/use-navbar-section";

/**
 * Props for `SideTitleContent`.
 */
export type SideTitleContentProps =
  SliceComponentProps<Content.SideTitleContentSlice>;

/**
 * Component for "SideTitleContent" Slices.
 */
const SideTitleContent: FC<SideTitleContentProps> = ({ slice }) => {
  const ref = useNavbarSection("light");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={ref as React.RefObject<HTMLElement>}
      className="p-4 md:py-16 md:px-10 flex items-center md:min-h-screen"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="w-full">
          <div className="text-lg py-10 text-rojoarq-black underline underline-offset-8 decoration-1">            
            <PrismicRichText field={slice.primary.section_title} />
          </div>
        </div>
        <div className="w-full ">
          <div className="selection:text-rojoarq-pink indent-10 md:indent-[20vw] text-2xl md:text-5xl font-semibold text-rojoarq-black text-justify leading-[1.24]">
            <PrismicRichText field={slice.primary.main_content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideTitleContent;

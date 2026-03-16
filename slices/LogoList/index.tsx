"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { useMediaQuery } from "@mantine/hooks";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
/**
 * Props for `LogoList`.
 */
export type LogoListProps = SliceComponentProps<Content.LogoListSlice>;

/**
 * Component for "LogoList" Slices.
 */
const LogoList: FC<LogoListProps> = ({ slice }) => {
  const isSmallSize = useMediaQuery("(max-width: 768px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-4 md:py-16 md:px-10 bg-rojoarq-black "
    >
      <div className="max-w-[1440px] min-h-[300px] mx-auto text-rojoarq-white pb-10">
        <div className="text-lg py-10 underline underline-offset-8 decoration-1">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="">
          {mounted && (
            <Swiper
              spaceBetween={20}
              slidesPerView={isSmallSize ? 1 : 4.2}
              //onSlideChange={() => console.log("slide change")}
              //onSwiper={(swiper) => console.log(swiper)}
              className="w-full"
            >
              {slice.primary.logos.map((item, index) => (
                <SwiperSlide key={index}>
                  <div key={index} className="aspect-video p-4 ">
                    <PrismicNextImage
                      field={item.logo_image}
                      width={item.logo_image.dimensions?.width}
                      height={item.logo_image.dimensions?.height}
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default LogoList;

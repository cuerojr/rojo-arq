"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useNavbarSection } from "@/hooks/use-navbar-section";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { useMediaQuery } from "@mantine/hooks";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

/**
 * Props for `CardCarousel`.
 */
export type CardCarouselProps = SliceComponentProps<Content.CardCarouselSlice>;

/**
 * Component for "CardCarousel" Slices.
 */
const CardCarousel: FC<CardCarouselProps> = ({ slice }) => {
  const ref = useNavbarSection("light");
  const isSmallSize = useMediaQuery("(max-width: 768px)");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={ref as React.RefObject<HTMLElement>}
      className="p-4 md:py-16 md:px-10 "
    >
      <div className="max-w-[1440px] min-h-[450px] mx-auto border-b border-rojoarq-stone pb-10">
        <div className="text-lg text-rojoarq-black py-10 underline underline-rojoarq-stone underline-offset-8 decoration-1">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="w-full">
          {mounted && (
            <Swiper
              spaceBetween={20}
              slidesPerView={isSmallSize ? 1 :2.7}
              //onSlideChange={() => console.log("slide change")}
              //onSwiper={(swiper) => console.log(swiper)}
              className="w-full"
            >
              {slice.primary.cards.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="min-h-[330px] md:aspect-square cursor-pointer bg-rojoarq-white border border-rojoarq-stone"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="text-[clamp(1.2rem,1.5rem,3rem)] p-6 md:p-10 selectable-none cursor-pointer text-rojoarq-black text-pretty">                      <PrismicRichText field={item.content} />
                    </div>
                    <div className="p-4 md:p-7">
                      <div className="">
                        <PrismicRichText field={item.reviewer} />
                      </div>
                      <div className="text-rojoarq-stone">
                        <PrismicRichText field={item.profesion} />
                      </div>
                    </div>
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

export default CardCarousel;

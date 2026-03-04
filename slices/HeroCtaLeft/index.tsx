"use client";

import { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroCtaLeft`.
 */
export type HeroCtaLeftProps = SliceComponentProps<Content.HeroCtaLeftSlice>;

/**
 * Component for "HeroCtaLeft" Slices.
 */

interface HeroVideoProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
}

const HeroCtaLeft: FC<HeroCtaLeftProps> = ({ slice }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const data: HeroVideoProps = {
    videoSrc: "/fondo.mp4",
    title: "Tu Título Aquí",
    subtitle: "Una descripción memorable que invite a la acción.",
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay bloqueado por el navegador — silencioso
    });
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen flex items-end pt-16 pb-8 px-10"
    >
      <div className="max-w-[1440px] h-full mx-auto z-20 border-t border-rojoarq-stone">
        <div className="h-full">
          <div className="mt-4 text-lg text-rojoarq-white leading-[1]">
            <PrismicRichText field={slice.primary.subtitle} />
          </div>
          <div className="mt-4 text-lg text-rojoarq-arena font-light max-w-[33vw] ml-auto py-6 text-justify flex flex-col gap-4 leading-[1.2] indent-10">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <div className="text-[clamp(2rem,8rem,6.5vw)] leading-[1] text-pretty text-rojoarq-arena indent-69 text-justify">
            <PrismicRichText field={slice.primary.title} />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-rojoarq-black opacity-50 w-full h-full object-cover z-10"></div>
      <video
        ref={videoRef}
        src={data.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroCtaLeft;

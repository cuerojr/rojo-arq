import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroCtaLeft`.
 */
export type HeroCtaLeftProps = SliceComponentProps<Content.HeroCtaLeftSlice>;

/**
 * Component for "HeroCtaLeft" Slices.
 */
const HeroCtaLeft: FC<HeroCtaLeftProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-screen bg-black flex items-center"
    >
      <div className="container flex items-center">
        <div className="w-full lg:w-1/2">
          <div className="text-4xl font-bold text-gray-300">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="mt-4 text-lg text-gray-300">
            <PrismicRichText field={slice.primary.subtitle} />
          </div>
          <div className="mt-4 text-lg text-gray-300">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          {/* Aquí podrías agregar una imagen o cualquier otro contenido que quieras mostrar a la derecha */}
        </div>
      </div>
    </section>
  );
};

export default HeroCtaLeft;

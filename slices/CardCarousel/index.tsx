import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CardCarousel`.
 */
export type CardCarouselProps = SliceComponentProps<Content.CardCarouselSlice>;

/**
 * Component for "CardCarousel" Slices.
 */
const CardCarousel: FC<CardCarouselProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 px-10 bg-gray-100"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-4xl font-bold">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="flex gap-4">
          {slice.primary.cards.map((item, index) => (
            <div key={index}>
              <PrismicRichText field={item.content} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardCarousel;

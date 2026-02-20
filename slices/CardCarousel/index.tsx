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
      className="h-screen border"
    >
      <div className="container">
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

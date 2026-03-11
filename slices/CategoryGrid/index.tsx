import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { cn } from "@/lib/utils";

/**
 * Props for `CategoryGrid`.
 */
export type CategoryGridProps = SliceComponentProps<Content.CategoryGridSlice>;

/**
 * Component for "CategoryGrid" Slices.
 */
const CategoryGrid: FC<CategoryGridProps> = ({ slice }) => {
  
  const dinamicStyle = {
    textCont: [
      "order-1 ", //0,2,4,6... 2n
      "order-1 sm:order-3 ", //1,3,5,7... 2n+1
    ],
    picCont: ["order-2", "order-2"],
    thumbnailsCont: ["order-3", "order-3 md:order-1"],
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-4 md:p-10"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-lg flex flex-col py-10 underline underline-offset-8 decoration-1">
          <PrismicRichText field={slice.primary.section_title} />
        </div>

        <div className="overflow-hidden">
          {slice.primary.items.map((item: any, index: number) => (
            <div
              key={index}
              className="category-item grid grid-col-1 md:grid-cols-12 gap-10 items-center py-12 md:py-28 border-b border-rojoarq-stone"
            >
              <div
                className={cn(
                  dinamicStyle.textCont[index % 2],
                  "col-span-1 md:col-span-6 space-y-5 flex flex-col justify-between h-full pt-4",
                )}
              >
                <h2 className="px-4 md:px-10 text-2xl md:text-4xl leading-[1.24] font-semibold text-pretty">
                  {item.title}
                </h2>

                <div className="px-4 md:px-10 text-sm md:text-lg leading-6 text-pretty flex flex-col gap-4">
                  <PrismicRichText field={item.description} />
                </div>

                <div
                  className={cn(
                    dinamicStyle.thumbnailsCont[index % 2],
                    "grid grid-cols-4 grid-rows-1 gap-2 items-start",
                  )}
                >
                  <div className="col-span-1 sm:col-span-1 row-span-1 aspect-square overflow-hidden ">
                    <PrismicNextImage
                      field={item.thumbnail1}
                      width={item.thumbnail1.dimensions?.width}
                      height={item.thumbnail1.dimensions?.height}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1 row-span-1 aspect-square overflow-hidden ">
                    <PrismicNextImage
                      field={item.thumbnail2}
                      width={item.thumbnail2.dimensions?.width}
                      height={item.thumbnail2.dimensions?.height}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1 row-span-1 aspect-square overflow-hidden">
                    <PrismicNextImage
                      field={item.thumbnail3}
                      width={item.thumbnail3.dimensions?.width}
                      height={item.thumbnail3.dimensions?.height}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1 row-span-1 aspect-square overflow-hidden">
                    <PrismicNextImage
                      field={item.thumbnail4}
                      width={item.thumbnail4.dimensions?.width}
                      height={item.thumbnail4.dimensions?.height}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  dinamicStyle.picCont[index % 2],
                  "col-span-1 md:col-span-6 aspect-square overflow-hidden",
                )}
              >
                <PrismicNextImage
                  field={item.image}
                  width={item.image.dimensions.width}
                  height={item.image.dimensions.height}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

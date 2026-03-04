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
      "order-1 border-r border-rojoarq-stone pr-4",
      "order-3 border-l border-rojoarq-stone pl-6",
    ],
    picCont: ["order-2", "order-2"],
    thumbnailsCont: ["order-3", "order-1"],
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-10"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-lg flex flex-col items-center py-10 underline underline-offset-8 decoration-1 decoration-1">
          <PrismicRichText field={slice.primary.section_title} />
        </div>
        {/* Aquí puedes mapear los items de la categoría y mostrarlos en una cuadrícula */}
        <div className="">
          {slice.primary.items.map((item: any, index: number) => (
            <div
              key={index}
              className="category-item grid grid-cols-3 gap-4 mb-28 pb-5 border-b border-rojoarq-stone"
            >
              {/* Renderiza el contenido de cada item aquí */}
              <div
                className={cn(
                  dinamicStyle.textCont[index % 2],
                  "col-span-3 md:col-span-1 space-y-5 flex flex-col justify-end  pb-4",
                )}
              >
                <h2 className="text-2xl md:text-3xl leading-[1] text-balance">
                  {item.title}
                </h2>
                <div className="indent-5 text-sm md:text-lg leading-6 text-pretty flex flex-col gap-4">
                  <PrismicRichText field={item.description} />
                </div>
              </div>
              <div
                className={cn(
                  dinamicStyle.picCont[index % 2],
                  "col-span-3 md:col-span-1 aspect-square overflow-hidden",
                )}
              >
                <PrismicNextImage
                  field={item.image}
                  width={item.image.dimensions.width}
                  height={item.image.dimensions.height}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={cn(
                  dinamicStyle.thumbnailsCont[index % 2],
                  "col-span-3 md:col-span-1 grid grid-cols-2 gap-5",
                )}
              >
                <div className="col-span-1 row-span-1 aspect-square overflow-hidden">
                  <PrismicNextImage
                    field={item.image}
                    width={item.image.dimensions.width}
                    height={item.image.dimensions.height}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-1 row-span-1 aspect-square overflow-hidden">
                  <PrismicNextImage
                    field={item.image}
                    width={item.image.dimensions.width}
                    height={item.image.dimensions.height}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-1 row-span-1 aspect-square overflow-hidden">
                  <PrismicNextImage
                    field={item.image}
                    width={item.image.dimensions.width}
                    height={item.image.dimensions.height}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-1 row-span-1 aspect-square overflow-hidden">
                  <PrismicNextImage
                    field={item.image}
                    width={item.image.dimensions.width}
                    height={item.image.dimensions.height}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Puedes agregar más campos según tu modelo de datos */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

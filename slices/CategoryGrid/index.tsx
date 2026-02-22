import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `CategoryGrid`.
 */
export type CategoryGridProps = SliceComponentProps<Content.CategoryGridSlice>;

/**
 * Component for "CategoryGrid" Slices.
 */
const CategoryGrid: FC<CategoryGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-10 bg-white"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-4xl font-bold mb-10">
          <PrismicRichText field={slice.primary.section_title} />
        </div>
        {/* Aquí puedes mapear los items de la categoría y mostrarlos en una cuadrícula */}
        <div className="grid grid-cols-12 gap-4">
          {slice.primary.items.map((item: any, index: number) => (
            <div key={index} className="category-item col-span-12 md:col-span-4">
              {/* Renderiza el contenido de cada item aquí */}
              <div className="aspect-square overflow-hidden">
                <PrismicNextImage
                  field={item.image}
                  width={item.image.dimensions.width}
                  height={item.image.dimensions.height}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2>{item.title}</h2>
              {/* Puedes agregar más campos según tu modelo de datos */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

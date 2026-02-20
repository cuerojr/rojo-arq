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
      className="h-screen"
    >
      <div className="container">
        <div className="text-4xl font-bold text-gray-300">
          <PrismicRichText field={slice.primary.section_title} />
        </div>
        {/* Aquí puedes mapear los items de la categoría y mostrarlos en una cuadrícula */}
        <div className="flex gap-4">
          {slice.primary.items.map((item: any, index: number) => (
            <div key={index} className="category-item">
              {/* Renderiza el contenido de cada item aquí */}
              <PrismicNextImage
                field={item.image}
                width={item.image.dimensions.width}
                height={item.image.dimensions.height}
              />
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

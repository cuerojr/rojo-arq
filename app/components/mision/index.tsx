"use client";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { MisionType } from "@/app/types/types";
import s from "./style.module.scss";
import PlusIconComponent from "../plus-icon-component";
import MisionButtonComponent from "../common/mision-button";

export default function MisionComponent(): any {
  const misionData: MisionType[] = [
    {
      id: "mision",
      title: "Misión",
      description: `Somos un equipo de profesionales creativos en continuo crecimiento, trabajamos con un fuerte
    énfasis en el diseño y la planificación para construir espacios eficientes, de estética única que
    estimulen el sentido de pertenencia y confort físico-mental.`,
    },
    {
      id: "vision",
      title: "Visión",
      description: `Brindar obras que trasciendan en el tiempo capaces de adaptarse a los cambios y
    necesidades de la vida; materializar espacios que inspiren y resuelvan los deseos y las necesidades
    de las personas. Trabajamos diariamente para ser una empresa referente de excelencia a nivel local
    y nos proyectamos a ser pioneros en la aplicación y el desarrollo del uso de la tecnología avanzada
    en la arquitectura y el espacio.`,
    },
    {
      id: "valores",
      title: "Valores",
      description: `La comunicación y la transparencia, la responsabilidad y el rigor técnico; la
    capacidad creativa y resolutiva.`,
    },
  ];

  const text = useRef(null);

  return (
    <section className={s.mision_container}>
      { misionData.map((element, index) => (
        <div key={index} className={s.mision_article_container}>
          <MisionButtonComponent>
            <div className={s.mision_title_container}>
              <h2 className={s.mision_title}>{element.title}</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </div>
          </MisionButtonComponent>
          <p ref={text} className={s.mision_description}>
            {element.description}
          </p>
        </div>
      )) }
    </section>
  );
}

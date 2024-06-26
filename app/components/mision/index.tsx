"use client";

import { useEffect, useRef, useState } from "react";
import { MisionType } from "@/app/types/types";
import s from "./style.module.scss";
import MisionButtonComponent from "@/app/components/common/mision-button";
import SectionTitle from "@/app/components/section-title";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function MisionComponent(): any {
  const misionData: MisionType[] = [
    {
      id: "somos",
      title: "Somos",
      subTitle: `Historia`,
      description: `ROJO arq es una empresa familiar que tuvo sus inicios en el año 2003. En ese entonces se desarrollaba particularmente realizando instalaciones de telecomunicaciones,eléctricas y protección contra incendios en industrias, comercios y viviendas.\n
      Nuestra pasión por la técnica y el crecimiento continúo nos abrió camino para brindar soluciones de arquitectura abarcando obras completas, desde el diseño y la planificación hasta la gestión y construcción. Actualmente formamos un equipo de profesionales creativos en continuo crecimiento.`,
    },
    {
      id: "mision",
      title: "Misión",
      subTitle: `Creatividad espacial`,
      description: `Trabajamos con un fuerte énfasis en el diseño y la planificación para construir espacios eficientes, de estética única que estimulen el sentido de pertenencia y confort físicomental.`,
    },
    {
      id: "vision",
      title: "Visión",
      subTitle: `Arquitectura trascendente`,
      description: `Brindar obras que trasciendan en el tiempo capaces de adaptarse a los cambios y necesidades de la vida; materializar espacios que inspiren y resuelvan los deseos y las necesidades de las personas.
      Trabajamos diariamente para ser una empresa referente de excelencia a nivel local y nos proyectamos a ser pioneros en la aplicación y el desarrollo del uso de la tecnología avanzada en la arquitectura y el espacio.`,
    },
    {
      id: "valores",
      title: "Valores",
      subTitle: `Conexión en diseño`,
      description: `La comunicación y la transparencia, la responsabilidad y el rigor técnico; la capacidad creativa y resolutiva.`,
    },
    {
      id: "politicas",
      title: "Política",
      subTitle: `Construimos con compromiso`,
      description: `
        1. Ética y Conducta Profesional\n        
        Nos comprometemos a mantener los más altos estándares éticos y de conducta profesional en todas sus interacciones. 
        Los empleados deben actuar con integridad, honestidad y respeto hacia nuestros clientes, colegas y otras partes interesadas.\n

        2. Calidad del Trabajo\n
        Nuestra empresa se esfuerza por ofrecer diseños arquitectónicos de la más alta calidad. Todos los proyectos y documentos deben cumplir con los estándares profesionales y las regulaciones locales aplicables.\n

        3. Sostenibilidad\n
        La sostenibilidad es un principio fundamental en nuestra empresa. Promovemos prácticas de diseño y construcción respetuosas con el medio ambiente, así como el uso de materiales sostenibles en nuestros proyectos.\n

        4. Confidencialidad\n
        Proteger la información confidencial es esencial. Todos los empleados deben seguir políticas claras de gestión de datos y privacidad para garantizar la confidencialidad de la información de nuestros clientes y de la empresa.\n

        5. Gestión de Proyectos\n
        Nuestra empresa se compromete a gestionar proyectos de manera eficiente. Esto incluye la asignación de recursos, programación adecuada y una comunicación efectiva con nuestros clientes para garantizar la satisfacción y el éxito de los proyectos.\n

        6.Responsabilidad Social\n        
        Contribuimos a la comunidad local y practicamos la responsabilidad social corporativa.
        Participamos en proyectos de beneficio público y trabajamos para mejorar nuestra comunidad.\n
        
        7.Comunicación y Colaboración\n
        Fomentamos una comunicación efectiva y la colaboración entre nuestros empleados y con nuestros clientes. Creemos que un flujo de trabajo colaborativo y una comunicación clara son esenciales para el éxito de nuestros proyectos.\n
        Estas políticas son fundamentales para nuestra empresa y guían nuestras acciones y decisiones. Todos los empleados son responsables de conocer y cumplir con estas políticas en todo momento`,
    },
  ];
  const [selectedMision, setSelectedMision] = useState(null);
  const toggleDescription = (id: any) => {
    setSelectedMision((prevSelected) => (prevSelected === id ? null : id));
  };

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".gsap-title", {
        opacity: 0,
        scale: 0,
      });

      const showImages = gsap.timeline({ paused: true }).to(".gsap-title", {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "sine.inOut",
        stagger: 0.05,
      });

      ScrollTrigger.create({
        animation: showImages,
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom bottom",
        markers: false,
        scrub: false,
      });
    });

    return () => ctx.kill();
  }, []);

  return (
    <section ref={sectionRef} className={s.mision_container}>
      <SectionTitle
        props={{
          preTitle: `Principios & Fundamentos`,
          title: `Soluciones de alta calidad`,
        }}
      />

      {misionData.map((element) => (
        <div
          key={element.id}
          className={`${s.mision_article_container} bg-white z-10 relative gsap-title`}
        >
          <MisionButtonComponent onClick={() => toggleDescription(element.id)}>
            <div className={`${s.mision_title_container}  `}>
              <h2 className={`${s.mision_title} `}>
                {element.title}{" "}
                <span className=""
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    fontStyle: "italic",
                    marginLeft: "2rem",
                  }}
                >
                  {element.subTitle}
                </span>
              </h2>
              {selectedMision === element.id ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              )}
            </div>
          </MisionButtonComponent>

          {selectedMision === element.id && (
            <p className={s.mision_description}>{element.description}</p>
          )}
        </div>
      ))}
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { ServiceType } from "@/app/types/types";
import Service from "@/app/components/service/index";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./service.module.scss";

const services: ServiceType[] = [
  {
    id: "servicio-1",
    title: "Eficiente",
    short: `Nos encargamos del diseño y la CONSTRUCCION, lo que nos permite que tengas más
      OPTIMIZACIÓN DEL USO DEL ESPACIO y AMBIENTES MÁS FUNCIONALES.        
      En OBRA NUEVA o REFORMA realizamos los planos y “visual 3d espacial” para que veas PRE-
      OBRA como va a quedar terminado tu proyecto.`,
    description: `Nuestro servicio de construcción incluye la dirección de obra y planificación para gestionar mejor
      los recursos y el tiempo. Entregamos “INFORMES SEMANALES” en etapa de arquitectura y de
      obra para que sepas el estado de AVANCE de tu OBRA.
      Podes contratar la mano de obra y materiales por tu cuenta o acceder a nuestro SISTEMA
      CONSTRUCTIVO.`,
    images: [
      {
        src: "/components/services/construccion/servicio-cocina.webp",
        alt: "Mano de obra",
      },
    ],
  },
  {
    id: "servicio-2",
    title: "Personalizado",
    short: `Querés convertir tu casa en comercio?. Necesitas una TRANSFORMACIÓN ESPACIAL.
      Estudiamos de forma personalizada cada inmueble para proveer la mejor solución. Nuestros diseños
      son FLEXIBLES y ADAPTABLES, porque entendemos que los usos y necesidades cambian a lo
      largo del tiempo.`,
    description: `Si en tu caso debe seguir conviniendo CASA+COMERCIO u OFICINA, creamos los espacios
      necesarios para que sigas teniendo la intimidad de tu hogar y potenciar tu negocio a la vez.
      Diseñamos tu fachada para darle IDENTIDAD COMERCIAL y que tengas una arquitectura
      ÚNICA y hermosa que te INSPIRE.`,
    images: [
      {
        src: "/components/services/asesoramiento/servicio-bano.webp",
        alt: "Acesoramiento personalizado",
      },
    ],
  },
  {
    id: "servicio-3",
    title: "Exclusivo",
    short: `Te damos CREATIVIDAD en la FORMA y los DETALLES arquitectónicos para dar lugar a
      espacios que te ENRIQUEZCAN la VIDA. Hay lugares que necesitan una atención especial para
      aprovechar al máximo su uso.`,
    description: `A través de nuestra línea pensada especialmente para cocinas, INNEN ®, proveemos
      amoblamientos de cocina y muebles diseñados a medida. Proyectamos con vos al detalle cada parte
      de la cocina y su funcionamiento; con nuestra “visual 3d espacial” podes ir viendo como queda
      terminada. Con nosotros tenes la posibilidad de contratar el proyecto solo o contratar el MUEBLE
      TERMINADO que incluye diseño y colocación.
      Trabajamos con materia prima de primera calidad en melamina mdf de 18 mm marca Faplac con
      variedad de colores y texturas; y mano de obra especializada.`,
    images: [
      {
        src: "/components/services/diseño/servicio-estar.webp",
        alt: "Diseños exclusivos",
      },
    ],
  },
  {
    id: "servicio-4",
    title: "Sostenible",
    short: `Entendemos que la construcción es un gran esfuerzo para muchas familias e individuos, por eso
      brindamos diseño y construcción inteligentes para que la casa puede adaptarse a las cambiantes
      necesidades en el tiempo.`,
    description: `Teniendo como premisa que la construcción total del proyecto se va a dar en el tiempo, para
      admistrar mejor los recursos, diseñamos tu proyecto integralmente y pensamos el crecimiento y la
      adaptación del mismo para realizarlo en diferentes ETAPAS. Para encarar una construcción de este
      tipo, sabiendo que va a sufrir modificaciones en el tiempo, contamos con un EQUIPO
      ESPECIALIZADO de profesionales para resolver el proyecto y la obra.`,
    images: [
      {
        src: "/components/services/etapabilidad/planta.webp",
        alt: "Etapabilidad",
      },
    ],
  },
  {
    id: "servicio-5",
    title: "Calidad",
    short: `Tomamos el compromiso de que cada espacio que diseñamos y construimos sean ambientes
      saludables, bien iluminados con ventilación adecuada, creamos espacios que promuevan el
      bienestar fisico y mental.`,
    description: `Trabajamos para lograr espacios que generen sentimientos de pertenencia, seguridad y comodidad.
      Por eso nuestros proyectos cumplen con las ordenanzas municipales para la construcción de
      arquitectura más eficiente, ORDENANZAS n°7210/01 y 8757/11 de Los Locales y de Aspectos
      Higrotérmicos y Demanda Energeética de las Construcciones.
      Utilizamos estrategias de diseño que aprovechen el clima y las condiciones ambientales locales para
      mejorar la eficiencia energética y confort: como la orientación de la estructura, ventilación natural
      y selección de materiales adecuados.
      Tenemos una línea pensada exclusivamente de ARQUITECTURA BIOCLIMATICA RedSmart®,
      implementamos tecnologías innovadoras: sistemas de automatizacion para la gestión de la
      iluminación, climatizaci+on y seguridad. La incorporacion de sistemas inteligentes de control,
      puede mejorar la comodidad y la eficiencia de un espacio.`,
    images: [
      {
        src: "/components/services/comercial/garita.webp",
        alt: "Arquitectura comercial",
      },
    ],
  },
];

export default function ServicesList() {
  const [swiper, setSwiper] = useState<any | null>(null);
  const sectionContainer = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(title.current, {
        y: 20,
      });

      const titleAnimation = gsap
        .timeline({ paused: false })
        .to(title.current, {
          opacity: 1,
          y: 0,
        });

      // scroll trigger titulo imagen pineada
      ScrollTrigger.create({
        trigger: sectionContainer.current,
        start: "top +=300px",
        end: `bottom bottom`,
        animation: titleAnimation,
        markers: false,
        scrub: false,
      });
    });
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={sectionContainer} className={s.services_container}>
      <div ref={title} className={`${s.swiper_container} opacity-0`}>
        <div className={s.section_title_container}>
          <h2 className={`text-4xl font-semibold`}>
            Nuestros servicios
          </h2>
        </div>
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          loop={true}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
            //clickable: true
          }}
          // autoplay={{
          //   delay: 10000,
          //   pauseOnMouseEnter: true,
          // }}
        >
          {services.map((service: ServiceType) => (
            <SwiperSlide key={service.id}>
              <Service props={service} />
            </SwiperSlide>
          ))}
          <div className="flex justify-between ml-4">
            <button
              className={`${s.swiper_button} prev-btn`}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              Anterior
            </button>
            <button
              className={`${s.swiper_button} next-btn`}
              aria-label="Next slide"
            >
              Siguiente
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

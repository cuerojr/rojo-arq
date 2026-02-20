"use client";
import { useEffect, useRef, useState } from "react";
import { ServiceType } from "@/app/types/types";
import Service from "@/app/components/service/index";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import s from "./service.module.scss";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const servicesConstruccion: ServiceType[] = [
  {
    id: "servicio-1",
    title: "Ampliación de vivienda",
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
    title: "Remodelación de cocina/baño",
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
    title: "Permisos de obra",
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
    title: "Diseño de interiores",
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
    title: "Empresas de construcción",
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
  {
    id: "servicio-6",
    title: "Reforma de casa/departamento",
    short: `Ofrecemos un servicio integral de arquitectura y construcción, abarcando todas las etapas del
      proceso, desde el diseño inicial hasta la finalización de la obra.`,
    description: `Nos encargamos de cada detalle, asegurando una experiencia fluida y sin complicaciones para
      nuestros clientes. Coordinamos todos los aspectos del proyecto, incluyendo la gestión de permisos,
      la selección de materiales y la supervisión de la construcción.`,
    images: [
      {
        src: "/components/services/comercial/garita.webp",
        alt: "Arquitectura comercial",
      },
    ],
  },
];

const servicesMobiliario: ServiceType[] = [
  {
    id: "servicio-1",
    title: "Diseño de mobiliario",
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
    title: "Muebles de cocina",
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
    title: "Muebles a medida",
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
];

export default function ServicesList() {
  const [swiper, setSwiper] = useState<any | null>(null);
  const sectionContainer = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);

  const [isServicesConstruccion, setIsServicesConstruccion] = useState(true);

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
    <section ref={sectionContainer} className={cn("py-[30vh]")}>
      <div>
        <Button
          variant="link"
          disabled={isServicesConstruccion}
          onClick={() => setIsServicesConstruccion(true)}
        >
          <span className="text-2xl font-semibold">Construcciones</span>
        </Button>
        <Button
          variant="link"
          disabled={!isServicesConstruccion}
          onClick={() => setIsServicesConstruccion(false)}
        >
          <span className="text-2xl font-semibold">Mobiliario</span>
        </Button>
      </div>
      <div ref={title} className="mx-[2.5vw]">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isServicesConstruccion
            ? servicesConstruccion?.map(
                (service: ServiceType, index: number) => (
                  <li key={service.id} className="w-full col-span-1">
                    <span className="font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Service props={service} />
                  </li>
                )
              )
            : servicesMobiliario?.map((service: ServiceType, index: number) => (
                <li key={service.id} className="w-full col-span-1">
                  <span className="font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Service props={service} />
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}

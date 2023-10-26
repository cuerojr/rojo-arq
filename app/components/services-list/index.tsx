'use client'
import { ServiceType } from '@/app/types/types'
import Service from '@/app/components/service/index'
import s from './service.module.scss'

export default function ServicesList(): any {
    const services: ServiceType[] = [{
        id: "servicio-1",
        title: "Construcción",
        description: `Comenzar una obra nueva o de completamiento sabiendo como queda terminada, es posible.\n Desde el comienzo del proyecto vas a poder visualizar con nuestro servicio “VISUAL 3D ESPACIAL” opciones de colores, materialidad y espacio.\n El desafío de esta casa, actualmente en obra, fue continuar un proyecto que habia quedado parado por mucho tiempo. Partiendo de lo existente, se realizaron cambios para mejorar la distribución de la casa y crear los lugares que la familia deseaba.\n Los planos y cómputos es el “LEGAJO DE OBRA” que nos permiten ser rigurosos para llegar al resultado que se desea. Nuestro servicio de construcción incluye la dirección de obra y planificación para gestionar mejor los recursos y el tiempo. Entregamos “INFORMES SEMANALES” en etapa de arquitectura y de obra para que sepas el estado de avance de tu proyecto. Podes contratar la mano de obra y materiales por tu cuenta o acceder a nuestro “SISTEMA CONSTRUCTIVO”.`,
        images: [{
            src: '/components/services/construccion/construccion.jpeg',
            alt: 'Mano de obra'
        }]
    },
    {
        id: "servicio-2",
        title: "Asesoramiento personalizado",
        description: `Querés convertir tu casa en comercio? Vas a necesitar el servicio de “TRANSFORMACIONES ESPACIALES”. 
        Te contamos cómo puede ser una realidad.
        Estudiamos de forma personalizada cada inmueble para proveer la mejor solución en casos como estos. Esta obra pasó de ser una casa en ruinas a un local comercial de lubricentro. Se adaptaron los ingresos y las áreas para el uso que demandaba. Se demolió y construyó a nuevo lo obsoleto.
        Si en tu caso debe seguir conviniendo CASA+COMERCIO u OFICINA, creamos los espacios necesarios para que sigas teniendo la intimidad de tu hogar y potenciar tu negocio a la vez.
        Diseñamos tu fachada para darle “IDENTIDAD COMERCIAL” y a través de nuestro PACK “VISUAL 3D ESPACIAL” podes ver antes de empezar la obra, cómo va a quedar terminado; y
        elegir colores, materialidad y combinaciones posibles.`,
        images: [{
            src: '/components/services/asesoramiento/asesoramiento.webp',
            alt: 'Acesoramiento personalizado'
        }]
    },
    {
        id: "servicio-3",
        title: "Diseños exclusivos",
        description: `Podemos hacer realidad tus ideas y que vivas los espacios que soñas.
        Hacemos del lugar más cálido de la casa: la cocina, un lugar funcional.
        Lugares de la casa como este, necesitan una atención especial para aprovechar al máximo su uso. A
        través de nuestra línea pensada especialmente para cocinas, INNEN ® diseño interior, proveemos
        amoblamientos de cocina y muebles diseñados a medida. Proyectamos con cada cliente al detalle
        cada parte de la cocina; con nuestro PACK “VISUAL 3D ESPACIAL” podes ir visualizando como
        se usa y queda terminada. Con INNEN ® diseño interior tenes la posibilidad de contratar el
        proyecto solo o contratar el mueble terminado que incluye diseño y colocación. Trabajamos con
        materia prima de primera calidad en melamina mdf de 18 mm marca Faplac con variedad de colores
        y texturas; y mano de obra especializada.`,
        images: [{
            src: '/components/services/diseño/diseno.jpeg',
            alt: 'Diseños exclusivos'
        }]
    },
    {
        id: "servicio-4",
        title: "Etapabilidad",
        description: `Entendemos que la construcción es un gran esfuerzo para muchas familias e individuos, por eso ofrecemos el servicio de “ETAPABILIDAD” previa a obra. Teniendo como premisa que la construcción total del proyecto se va a dar en el tiempo para admistrar mejor los recursos, en ETAPA DE ANTEPROYECTO, lo diseñamos integralmente y pensamos el crecimiento y la adaptación del mismo para realizarlo en diferentes etapas. Este es un trabajo minucioso que realizamos ya que requiere de un ida y vuelta en el estado actual y el resultado terminado, en todos los rubros. Para encarar una construcción de este tipo, sabiendo que va a sufrir modificaciones en el tiempo, contamos con un EQUIPO ESPECIALIZADO de profesionales para resolver cada necesidad.
            Como en estos proyectos, el CRECIMIENTO puede ser en dos plantas o en una sola planta, siempre
            se tienen en cuenta qué es lo que conviene y se ofrece un comparativo en cuánto a costos y
            decisiones para que sepas con certeza lo necesario para tu proyecto de ETAPABILIDAD. Este
            servicio resulta muy útil en pequeños proyectos en los que se comienza con reducidos metros
            cuadrados pero que tienen proyección de agrandarse.`,
        images: [{
            src: '/components/services/etapabilidad/planta.webp',
            alt: 'Etapabilidad'
        }]
    },
    {
        id: "servicio-5",
        title: "Arquitectura comercial",
        description: `Arquitectura planificada equivale a negocio más rentable.
        En la ARQUITECTURA COMERCIAL de un negocio de venta al público, una oficina o un equipamiento urbano, el énfasis debe estar principalmente en la IMAGEN. Por eso contamos con un EQUIPO de DISEÑO, capacitado para asorarte desde el PROYECTO DE ARQUITECTURA y CONSTRUCCIÓN, DISEÑO GRÁFICO y DISEÑO WEB.
        En el proyecto de tu negocio, es importante definir TU MARCA, y el uso de colores y formas construyen esa identidad que queres proyectar, abarcando la ARQUITECTURA y el DISEÑO en todos los aspectos (funcionales, constructivos y estéticos) te ayudamos a proyectar una imágen de profesionalismo y calidad acorde a tu rubro. Eso lo pudimos lograr mostrado en estos proyectos.`,
        images: [{
            src: '/components/services/comercial/garita.webp',
            alt: 'Arquitectura comercial'
        }]
    }];

    return (
        <section className={ `${s.services_container}`}>
            { services.map(( service: ServiceType ) => <Service key={ service.id } props={ service }/>) }
        </section>
    )
}

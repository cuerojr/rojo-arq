'use client'
import { ServiceType } from '@/app/types/types'
import Service from '@/app/components/service/index'
import s from './service.module.scss'

export default function ServicesList(): any {
    const services: ServiceType[] = [{
        id: "servicio-1",
        title: "Acesoramiento personalizado",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe cumque quisquam doloremque rem molestiae, beatae totam dolores deserunt!",
        images: [{
            src: '',
            alt: 'Acesoramiento personalizado'
        }]
    },
   {
        id: "servicio-2",
        title: "Diseños y proyectos exclusivos",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe.",
        images: [{
            src: '',
            alt: 'Diseños y proyectos exclusivos'
        }]
    },{
        id: "servicio-3",
        title: "Etapabilidad",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe cumque quisquam doloremque rem molestiae, beatae totam dolores deserunt!",
        images: [{
            src: '',
            alt: 'Etapabilidad'
        }]
    },
   {
        id: "servicio-4",
        title: "Informes semanales y seguimiento de obra",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe.",
        images: [{
            src: '',
            alt: 'Informes semanales y seguimiento de obra'
        }]
    },{
        id: "servicio-5",
        title: "Mano de obra",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe cumque quisquam doloremque rem molestiae, beatae totam dolores deserunt!",
        images: [{
            src: '',
            alt: 'Mano de obra'
        }]
    }];

    return (
        <section className={ s.services_container }>
            {
                services.map(( service: ServiceType ) => (
                    <Service key={ service.id } props={ service }/>
                ))
            }
        </section>
    )
}

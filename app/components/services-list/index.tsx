'use client'
import { ServiceType } from '@/app/types/types'
import Service from '@/app/components/service/index'
import s from './service.module.scss'

export default function ServicesList(): any {
    const services: ServiceType[] = [{
        id: "servicio-1",
        title: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe cumque quisquam doloremque rem molestiae, beatae totam dolores deserunt!",
        images: []
    },
   {
        id: "servicio-2",
        title: "Lorem ipsum dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe.",
        images: []
    },{
        id: "servicio-3",
        title: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe cumque quisquam doloremque rem molestiae, beatae totam dolores deserunt!",
        images: []
    },
   {
        id: "servicio-4",
        title: "Lorem ipsum dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe.",
        images: []
    },{
        id: "servicio-5",
        title: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum facilis fugit ipsa accusantium ducimus, cum ab impedit consectetur officia saepe cumque quisquam doloremque rem molestiae, beatae totam dolores deserunt!",
        images: []
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

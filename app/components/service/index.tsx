'use client'
import { ServiceType } from '@/app/types/types'
import s from './service.module.scss'

export default function Service({ props }: { props: ServiceType}): any {
    const { id, title, description, images } = props;
    return (
        <article className={s.service_container}>
            <h2 className={`text-3xl font-bold `}>{ title }</h2>
            <p>{ description }</p>
        </article>
    )
}
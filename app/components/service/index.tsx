'use client'
import Image from 'next/image'
import { ServiceType } from '@/app/types/types'
import s from './service.module.scss'

export default function Service({ props }: { props: ServiceType}): any {
    const { id, title, description, images } = props;
    return (
        <article className={ s.service_container }>
            <div className={ s.column }>
                <div className={ s.box }>
                    <Image 
                        className={s.image}
                        src={'/header-lg.webp'} 
                        alt={'asdasd'} 
                        fill
                        loading='lazy'
                        />
                </div>
            </div>
            <div className={ s.column }>
                <h2 className={`text-3xl font-bold`}>{ title }</h2>
                <p>{ description }</p>
            </div>
        </article>
    )
}
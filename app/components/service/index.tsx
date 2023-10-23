'use client'
import Image from 'next/image'
import { ServiceType } from '@/app/types/types'
import s from './service.module.scss'
import { useRef } from 'react'

export default function Service({ props }: { props: ServiceType}): any {    
    const { id, title, description, images } = props;

    return (
        <article className={ s.service_container }>
            <div className={ s.column }>
                <div className={ s.box }>
                    <Image 
                        className={ s.image }
                        src={ images[0].src } 
                        alt={ title } 
                        fill
                        loading='lazy'
                        />
                </div>
            </div>
            <div className={ s.column }>
                <h2 className={`text-3xl font-bold`}>{ title }</h2>
                <p className='text-justify'>{ description }</p>
                
                <dialog id="modal">
                    <h1>This is a modal.</h1>
                    <button id="closeModal">Close modal</button>
                </dialog>
                <a 
                    id="openModal"
                    className=''>Más</a>
            </div>
        </article>
    )
}
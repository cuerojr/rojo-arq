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
                <button 
                    type='button' 
                    id="openModal"
                    className='bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded'>Más</button>
            </div>
        </article>
    )
}
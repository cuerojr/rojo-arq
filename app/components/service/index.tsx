'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ServiceType } from '@/app/types/types'
import s from './service.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from '../dialog-modal'

export default function Service({ props }: { props: ServiceType}): any {    
    const { id, title, description, images } = props;    
    const [openModal, setOpenModal] = useState(false);

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
                <h2 className='text-3xl font-bold'>{ title }</h2>
                <p className='text-animation text-justify'>{ description }</p>
                <a onClick={() => setOpenModal(true)}>Más</a>
                <Modal
                    open={ openModal }
                    onClose={() => {
                        setOpenModal(false);
                    }}
                >
                    <div className='flex justify-end'>
                        <a onClick={() => setOpenModal(false)}>X</a>
                    </div>
                    <h2 className='text-3xl font-bold mt-6'>{ title }</h2>
                    <p>{ description }</p>
                </Modal>
            </div>
        </article>
    )
}
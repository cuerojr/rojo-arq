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
                <div className={s.divider}><span></span></div>
                <p className='text-animation'>{ description }</p>
                <a onClick={() => setOpenModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                    </svg>
                </a>
                <Modal
                    open={ openModal }
                    onClose={() => {
                        setOpenModal(false);
                    }}
                >
                    <div className='flex justify-end'>
                        <a onClick={() => setOpenModal(false)}
                            style={{
                                padding: '.5rem'
                            }}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                height="1em" 
                                viewBox="0 0 448 512">
                                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                            </svg>
                        </a>
                    </div>
                    <h2 className='text-3xl font-bold mt-6'>{ title }</h2>
                    <p>{ description }</p>
                </Modal>
            </div>
        </article>
    )
}
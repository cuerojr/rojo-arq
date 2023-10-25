'use client'
import { motion } from 'framer-motion';
import { socialBtnVariants } from '@/app/utils/bottomOpacityAnimation';
import s from './style.module.scss'

export default function Footer() {
    return (
        <footer className="p-8 md:py-16 md:px-24 flex min-h-screen items-center justify-center h-full w-full lg:flex"
            style={{
                textAlign: 'center',
            }}>            
            <div style={{
                width: '100%',
            }}>
                <h2 style={{
                    fontWeight: '600',
                    fontSize: '2.5rem'
                }}>Web en construcción</h2>
                <ul>
                    <li>
                        <p>Contactate con nosotros para empezar a diseñar tu proyecto!</p>
                    </li>
                    <li>
                        <p>Cel./WhatsApp:  
                            <a target="_blank" aria-label="Chat on WhatsApp" href="https://wa.me/549341153830273">0341-153830273</a>
                        </p>
                    </li>
                    <li>
                        <p>E-mail: 
                            <a href="mailto:rojoarqdiseno@gmail.com">rojoarqdiseno@gmail.com</a>
                        </p>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
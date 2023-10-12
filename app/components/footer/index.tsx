'use client'
import { motion } from 'framer-motion';
import { socialBtnVariants } from '@/app/utils/bottomOpacityAnimation';

export default function Footer() {
    return (
        <footer className={`p-8 md:py-16 md:px-24 flex min-h-screen items-center justify-center h-full w-full lg:flex`}
            style={{
                textAlign: 'center',
            }}>            
            <h2>Web en construcción</h2>
        </footer>
    )
}
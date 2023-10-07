'use client'
import { motion } from 'framer-motion';
import { socialBtnVariants } from '@/app/utils/bottomOpacityAnimation';

export default function Footer() {
    return (
        <motion.footer 
            variants={socialBtnVariants}
            initial="hidden"
            animate="visible"
            style={{
                textAlign: 'center',
            }}>
            <i>{`"diseñando arquitectura, construyendo espacios."`}</i>
            <p>Web en construcción</p>
        </motion.footer>
    )
}
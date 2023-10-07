'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { socialBtnVariants } from '@/app/utils/bottomOpacityAnimation';

export default function Navbar() {
  return (
    <nav>
        <motion.ul 
            style={{
                display: 'flex',
                alignItems: 'center',
                listStyle: 'none',
                padding: 15,
                justifyContent: 'end'
            }}>
            <motion.li 
                variants={socialBtnVariants}
                initial="hidden"
                animate="visible"
                style={{
                marginRight: '1rem'
                }}>
                <Link 
                    href="https://www.linkedin.com/in/julietarojoarq/" 
                    target="_blank"
                    style={{
                        fontWeight: '600',
                    }}>Linkedin</Link>
            </motion.li>
            <motion.li
                variants={socialBtnVariants}
                initial="hidden"
                animate="visible">
                <Link 
                    href="https://www.instagram.com/rojoarqdiseno/" 
                    target="_blank"
                    style={{
                        fontWeight: '600',
                    }}>Instagram</Link>
            </motion.li>
        </motion.ul>
    </nav>
  )
}

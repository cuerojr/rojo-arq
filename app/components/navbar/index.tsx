'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { socialBtnVariants } from '@/app/utils/bottomOpacityAnimation';

export default function Navbar() {
  return (
    <nav>
        <motion.ul 
            className="flex justify-end gap-2 p-2">
            <motion.li 
            className=""
                variants={socialBtnVariants}
                initial="hidden"
                animate="visible">
                <Link 
                    href="https://www.linkedin.com/in/julietarojoarq/" 
                    target="_blank"
                    className="font-bold">Linkedin</Link>
            </motion.li>
            <motion.li
                className=""
                variants={socialBtnVariants}
                initial="hidden"
                animate="visible">
                <Link 
                    href="https://www.instagram.com/rojoarqdiseno/" 
                    target="_blank"
                    className="font-bold">Instagram</Link>
            </motion.li>
        </motion.ul>
    </nav>
  )
}

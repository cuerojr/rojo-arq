'use client'
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { socialBtnVariants } from '@/app/utils/bottomOpacityAnimation';

export default function Navbar() {
  return (
    <nav 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'fixed',
        zIndex: 9999,
        //backgroundColor: '#ffffff85',
      }}
      className="">
        <Link href={'/'}
          style={{
            maxWidth: '100px'
          }}>
            <Image
              src={'/logo.png'}
              width={100}
              height={50}
              alt="rojoarq"/>
            </Link>
        <ul 
            className="flex justify-end gap-2 p-2">
            <li 
              className="">
                <Link 
                    href="https://www.linkedin.com/in/julietarojoarq/" 
                    target="_blank"
                    className=""
                    style={{
                      mixBlendMode: 'difference',
                    }}>Linkedin</Link>
            </li>
            <li>
                <Link 
                    href="https://www.instagram.com/rojoarqdiseno/" 
                    target="_blank"
                    className="">Instagram</Link>
            </li>
        </ul>
    </nav>
  )
}

'use client'
import Link from 'next/link';
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
        //backgroundColor: '#ffffff85',
      }}
      className="">
        <Link href={'/'}
          style={{
            maxWidth: '50px'
          }}>
          <svg 
            id="Capa_1" 
            data-name="Capa 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 216.23 256.64"
            overflow="visible"
            style={{
              width: '50px',
              padding: 10
            }}>
              <path style={{
                  fill:'#1d1d1b',                  
                }} 
                d="M216.23,33.1V33a3.11,3.11,0,0,0-.06-.44.36.36,0,0,0,0-.11A1.7,1.7,0,0,0,216,32a.37.37,0,0,0-.05-.11,3.24,3.24,0,0,0-.2-.36l-.05-.07a3.47,3.47,0,0,0-.3-.37l-.09-.08a2.78,2.78,0,0,0-.32-.26l-.07-.05,0,0L167.27.45c-.12-.07-.24-.14-.37-.2l-.14,0-.32-.1-.2,0a2.65,2.65,0,0,0-.38,0h-.14L2.88.48h0c-.11,0-.22,0-.33,0a1.6,1.6,0,0,0-.23,0L2.07.61,1.78.7,1.59.81C1.5.86,1.4.9,1.31,1l-.18.15-.23.2c-.05.05-.09.11-.14.17a2.65,2.65,0,0,0-.21.26s0,0,0,0a.6.6,0,0,0-.08.16,1.68,1.68,0,0,0-.15.3c0,.08,0,.17-.08.25s0,.18-.07.27,0,.21,0,.31,0,.13,0,.19L0,223.48v.06a.43.43,0,0,0,0,.05,2.22,2.22,0,0,0,0,.45s0,.07,0,.11a4,4,0,0,0,.15.45l.05.11a4,4,0,0,0,.2.35.56.56,0,0,0,.05.08,3.57,3.57,0,0,0,.31.37l.08.07a3,3,0,0,0,.33.27l.06,0,0,0L49,256.19c.12.07.24.14.37.2l.09,0a2.22,2.22,0,0,0,.39.12l.15,0,.42.05h.14L212,255.29h0a3.94,3.94,0,0,0,.6-.08l.12,0a2.6,2.6,0,0,0,.55-.21l.1-.06a2.87,2.87,0,0,0,.5-.36h0a2.59,2.59,0,0,0,.42-.51l0-.05s0,0,0,0a2.89,2.89,0,0,0,.22-.43v0a.36.36,0,0,0,0-.11c0-.12.07-.25.1-.37s0-.12,0-.17,0-.23,0-.35v-.15a2.65,2.65,0,0,0-.07-.48.14.14,0,0,0,0-.06,2.8,2.8,0,0,0-.13-.41l-.07-.14a3.07,3.07,0,0,0-.17-.31l-.09-.14a2.51,2.51,0,0,0-.31-.35l0,0-70.77-68.11,70.28-.21h0A3.38,3.38,0,0,0,214,182l.16-.06a2.32,2.32,0,0,0,.44-.16l.18-.1a2.47,2.47,0,0,0,.38-.28l.13-.1a3.31,3.31,0,0,0,.41-.5l0,0a1.19,1.19,0,0,0,.08-.16,1.68,1.68,0,0,0,.15-.3c0-.08.05-.17.08-.25s0-.18.07-.27,0-.21,0-.31,0-.13,0-.19l.06-146.17v0ZM168.54,147.47l.05-111.4,42-.12-.06,138.19Zm-80.11-1.08h-.17l-.35,0-.17,0-.32.11-.15.06a2.38,2.38,0,0,0-.41.23s0,0-.06.05a2.16,2.16,0,0,0-.33.27l-.1.11a2.34,2.34,0,0,0-.24.31l-.06.07v0a2.49,2.49,0,0,0-.22.43v0l0,.12a2.24,2.24,0,0,0-.1.37,1,1,0,0,0,0,.17,1.94,1.94,0,0,0,0,.34.85.85,0,0,0,0,.16,3.93,3.93,0,0,0,.06.48.14.14,0,0,1,0,.06,3.31,3.31,0,0,0,.14.41l.07.14a1.46,1.46,0,0,0,.17.3l.09.14a3.07,3.07,0,0,0,.29.34l0,0,72.12,69-105.35.31L53.4,36.41l109.52-.32,0,110.08ZM5.77,8.44l42,26.67-.09,185.46-42,.12ZM168.61,8,203.74,30.3l-35.14.1Zm-5.68,22.45-111.59.32L12.6,6.12l150.34-.44ZM47.64,226.23v22.44L12.5,226.34Zm5.67,0,111.58-.33,37.45,23.81-149,1.24ZM189.78,235l-22.37-14.22L111,166.87l23.37,14.86Zm-52.89-58.38L98.15,152l66.77-.19,38.75,24.62Z"/></svg>
        </Link>
        <ul 
            className="flex justify-end gap-2 p-2">
            <li 
              className="">
                <Link 
                    href="https://www.linkedin.com/in/julietarojoarq/" 
                    target="_blank"
                    className="">Linkedin</Link>
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

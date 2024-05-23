import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import s from './style.module.scss'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function HeroImage() {
  
  return (
    <div className={ s.hero_container }>
        <Image
          className={`${s.image }`}
          src={"/header-bg-n.webp"}
          alt={"Rojoarq contrucciones, planeamiento y desarrollo de obras"}
          fill={true}
        />
    </div>
  )
}

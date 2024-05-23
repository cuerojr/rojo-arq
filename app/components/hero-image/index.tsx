import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import s from './style.module.scss'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function HeroImage() {
  const sectionContainer = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(imageRef.current, {
        y: 20
      });

      const titleAnimation = gsap
        .timeline({ paused: false })
        .to(imageRef.current, {
          opacity: 1,
          y: 0
        });

      // scroll trigger titulo imagen pineada
      ScrollTrigger.create({
        trigger: sectionContainer.current,
        start: "top center",
        end: `bottom bottom`,
        animation: titleAnimation,
        markers: false,
        scrub: false,
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={sectionContainer} className={`${s.hero_container}`}>
      <div ref={imageRef} className={'opacity-0'}>
        <Image          
          className={`${s.image }`}
          src={"/header-bg-n.webp"}
          alt={"Rojoarq contrucciones, planeamiento y desarrollo de obras"}
          fill={true}
        />
      </div>
    </div>
  )
}

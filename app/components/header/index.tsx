"use client";

import s from "./page.module.scss";
import { useEffect, useRef } from "react";
import AnimatedText from "@/app/components/animated-text";
import StripesContainer from "@/app/components/common/stripes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Header() {
  const sectionContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".text-reveal", {
        y: 20,
      });

      const titleAnimation = gsap
        .timeline({ paused: false })
        .to(".text-reveal", {
          opacity: 1,
          y: 0,
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
    <section ref={sectionContainer} className={s.header_section}>
      <StripesContainer />
      <div className={`${s.header_title_container}`}>
        <h1 className={`${s.header_title} text-lg opacity-0 text-reveal`}>
          Es posible <AnimatedText />
        </h1>
        <p className={`${s.header_subtitle} opacity-0 text-reveal`}>
          ROJO arq es una nueva forma de proyectar y construir: casas, negocios
          y equipamientos para vivir, alquilar o invertir.
        </p>
      </div>
    </section>
  );
}

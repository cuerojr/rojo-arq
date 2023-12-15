'use client';

import s from "./page.module.scss";
import { useRef } from "react";
import AnimatedText from "../animated-text";
import StripesContainer from "../common/stripes";

export default function Header() {
  
  const container = useRef(null);

  /*useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: `top`,
        end: `+=200px`,
        markers: true,
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
    });
  };*/

  return (
    <section
      className={ s.header_section }>
      <StripesContainer></StripesContainer>
      <div className={ s.header_title_container }>
        <h1 className={`${ s.header_title } text-lg`}>Es posible <AnimatedText /></h1>                
        <p className={ s.header_subtitle }>ROJO arq es una nueva forma de proyectar y construir: casas, negocios y equipamientos para vivir, alquilar o invertir.</p>
      </div>      
    </section>
  );
}

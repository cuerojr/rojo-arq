'use client';

import s from "./page.module.scss";
import { useRef } from "react";
import AnimatedText from "@/app/components/animated-text";
import StripesContainer from "@/app/components/common/stripes";

export default function Header() {
  
  const container = useRef(null);

  return (
    <section
      className={ s.header_section }>
      <StripesContainer />
      <div className={ s.header_title_container }>
        <h1 className={`${ s.header_title } text-lg`}>Es posible <AnimatedText/></h1>                
        <p className={ s.header_subtitle }>ROJO arq es una nueva forma de proyectar y construir: casas, negocios y equipamientos para vivir, alquilar o invertir.</p>
      </div>      
    </section>
  );
}

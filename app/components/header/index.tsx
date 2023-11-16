"use client";
import Image from "next/image";
import s from "./page.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      <div
        style={{
          width: "50%",
        }}>
        <h1 className={`${ s.header_title } text-lg`}>Es posible</h1>
        <p className={ s.header_subtitle }>Estás llegando</p>
      </div>
      <div className={ s.header_box }>
        <Image
          className={ s.image }
          src={"/header-bg-n.webp"}
          alt={"ad"}
          fill={true}
        />
      </div>
    </section>
  );
}

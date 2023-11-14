"use client";
import Image from "next/image";
import s from "./page.module.scss";
import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Header() {
  
  const titleRef: any = useRef(null);
  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);
  }, [])
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to('span', {
        y: 0,
        stagger: 0.05,
        delay: 0,
        duration: .1,
      });

    })
    return () => ctx.revert();
  }, [])
 

  /*useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(titleRef.children, {
        y: 0,
        stagger: 0.05,
        delay: 0,
        duration: .1,
      });

    })
    return () => ctx.revert();
  }, []);*/

  return (
    <section
      className={`${s.header_section} flex min-h-screen items-center h-full w-full lg:flex`} data-scroll-section>
      <div
        style={{
          width: "50%",
        }}>
        <h1 ref={ titleRef } data-scroll data-scroll-speed="3" data-scroll-position="top"     
          className={`${s.header_title} text-lg`}>
          <span>E</span>
          <span>s</span>

          <span>p</span>
          <span>o</span>
          <span>s</span>
          <span>i</span>
          <span>b</span>
          <span>l</span>
          <span>e</span>
        </h1>
        <p  className={`${s.header_subtitle}`} data-scroll data-scroll-speed="3" data-scroll-position="top">Estás llegando</p>
      </div>
      <div className={s.header_box}>
        <Image
          className={s.image}
          src={"/header-bg-n.webp"}
          alt={"ad"}
          fill={true}
        />
      </div>
    </section>
  );
}

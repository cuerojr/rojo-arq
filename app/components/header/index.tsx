"use client";
import Image from "next/image";
import s from "./page.module.scss";
import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Header() {
  
  const titleRef: any = useRef(null);
  
  return (
    <section
      className={`${s.header_section} flex min-h-screen items-center h-full w-full lg:flex`}>
      <div
        style={{
          width: "50%",
        }}>
        <h1 ref={ titleRef }     
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
        <p  className={`${s.header_subtitle}`}>Estás llegando</p>
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

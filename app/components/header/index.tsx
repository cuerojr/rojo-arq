"use client";
import Image from "next/image";
import s from "./page.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Header() {
    
  let refs = useRef([]);
  const container = useRef(null);

  useEffect( () => {
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
          markers: true
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1
  })
}

const splitWords = (phrase: string) => {
  let body: any[] = [];
  phrase.split(" ").forEach( (word, i) => {
    const letters = splitLetters(word);
    body.push(<p key={word + "_" + i}>{letters}</p>)
  })
  return body
}

const splitLetters = (word: string) => {
  let letters: any[] = []
  word.split("").forEach( (letter, i) => {
    letters.push(<span key={letter + "_" + i} ref={(el) => { 
      if (el !== null) {
        refs.current.push(el as never);
      }
    }}>{letter}</span>)
  })
  return letters;
}

  return (
    <section ref={container}
      className={`${s.header_section} flex min-h-screen items-center h-full w-full lg:flex`}>
      <div
        style={{
          width: "50%",
        }}>
        <h1  
          className={`${s.header_title} text-lg`}>{ splitWords('Es posible')}</h1>
        <p className={`${s.header_subtitle}`}>Estás llegando</p>
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

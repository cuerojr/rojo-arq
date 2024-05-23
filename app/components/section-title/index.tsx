"use client";
import React, { useEffect, useRef } from "react";
import s from "./style.module.scss";
import { Title } from "@/app/types/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import StripesContainer from "../common/stripes";

export default function SectionTitle({ props }: { props: Title }) {
  const { title, preTitle, titleColor = "#1e1e1c" } = props;
  const sectionContainer = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const preTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set([titleRef.current, preTitleRef.current], {
        y: 20,
      });

      const titleAnimation = gsap
        .timeline({ paused: false })
        .to([titleRef.current, preTitleRef.current], {
          opacity: 1,
          y: 0,
        });

      // scroll trigger titulo imagen pineada
      ScrollTrigger.create({
        trigger: sectionContainer.current,
        start: "top +=300px",
        end: `bottom bottom`,
        animation: titleAnimation,
        markers: false,
        scrub: false,
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <>
      <StripesContainer />
      <div ref={sectionContainer} className={`${s.title_container} bg-white`}>
        <div className="text-center ">
          <div ref={preTitleRef} className={`${s.s2} opacity-0`}>
            {preTitle}
          </div>
          <h2
            ref={titleRef}
            className={`${s.text_size_h2} relative z-10 text-[${titleColor}] opacity-0`}
          >
            {title}
          </h2>
        </div>
      </div>
    </>
  );
}

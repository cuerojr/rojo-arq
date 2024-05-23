"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function TextReveal() {
  const triggerRef = useRef(null);
  const titleContainer = useRef<HTMLDivElement>(null);
  const animatedTitleRef = useRef<HTMLHeadingElement>(null);

   gsap.registerPlugin(ScrollTrigger);
  const text =
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.";

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".text-reveal", {
        opacity: 0,
        y: -20,
      });

      const titleAnimation = gsap
        .timeline({ paused: false })
        .to(".text-reveal", {
          opacity: 1,
          y: animatedTitleRef.current?.offsetHeight! * -1,
        });

      // scroll trigger titulo imagen pineada
      ScrollTrigger.create({
        trigger: ".title-container",
        start: "top center",
        end: `bottom bottom`,
        animation: titleAnimation,
        markers: false,
        scrub: true,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={titleContainer} className="h-screen p-20 title-container">
        <h1
          className={`text-reveal absolute -z-100 text-2xl font-serif font-medium text-balance `}
          ref={animatedTitleRef}
        >
          {text}
        </h1>
      </div>
    </>
  );
}

export default TextReveal;

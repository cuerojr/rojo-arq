'use client'
import React, { useEffect, useRef } from "react";
import s from "./style.module.scss";
import gsap from "gsap";

export default function MisionButtonComponent({
  children,
  backgroundColor = "black",
  ...attributes
}: any) {
  const circle: any = useRef(null);
  const timeline: any = useRef(null);
  let timeoutId: any = null;
  let exitTime = 0;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { 
          top: "-100rem",
          right: "-100rem",
          width: "400rem", 
          height: "400rem",
          duration: 0.7, 
          ease: "power3.in" },
        "enter"
      )
      .addPause()
      exitTime = timeline.current.duration()
      timeline.current.to(
        circle.current,
        { 
          top: "-2rem",
          right: "-2rem",
          height: "2rem",
          width: "2rem", 
          duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = (e: any) => {
    if (timeoutId) {
      clearInterval(timeoutId);
    }
    
    timeline.current.play();
  };

  const manageMouseLeave = (e: any) => {
    timeline.current.reverse();
  };

  return (
      <div
        className={s.roundedButton}
        style={{ overflow: "hidden" }}
        {...attributes}
        onMouseEnter={(e) => {
          manageMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          manageMouseLeave(e);
        }}
      >
        { children }
        <div
          ref={circle}
          className={s.circle}
          style={{ backgroundColor }}
        ></div>
      </div>
  );
}

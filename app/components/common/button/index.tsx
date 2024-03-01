import React, { useEffect, useRef } from "react";
import s from "./style.module.scss";
import gsap from "gsap";
import Magnetic from "../magnetic";
import { Props } from "@/app/types/types";

export default function ButtonComponent({
  children,
  backgroundColor = "black",
  ...attributes
}: Props) {
  const circle: any = useRef(null);
  const timeline: any = useRef(null);
  let timeoutId: any = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = (e: any) => {
    if (timeoutId) {
      clearInterval(timeoutId);
      timeoutId = null;
    }
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = (e: any) => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
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
      {children}
      <div ref={circle} className={s.circle} style={{ backgroundColor }}></div>
    </div>
  );
}

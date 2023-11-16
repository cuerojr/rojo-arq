import React, { useEffect, useRef } from "react";
import s from "./style.module.scss";
import gsap from "gsap";
import Magnetic from "../magnetic";

export default function MisionButtonComponent({
  children,
  backgroundColor = "black",
  ...attributes
}: any) {
  const circle: any = useRef(null);
  const timeline: any = useRef(null);
  let timeoutId: any = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-125%", width: "250%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-250%", width: "225%", duration: 0.25 },
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
        { children }
        <div
          ref={circle}
          className={s.circle}
          style={{ backgroundColor }}
        ></div>
      </div>
  );
}

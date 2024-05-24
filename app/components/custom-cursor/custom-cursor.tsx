"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cursor = document.querySelector<HTMLDivElement>("#custom-cursor");
      const cursorText = document.querySelector<HTMLDivElement>(".cursor-text")!;
      const links = document.querySelectorAll<HTMLAnchorElement>("a");
      const buttons = document.querySelectorAll<HTMLButtonElement>("button");
      const mission = document.querySelectorAll<HTMLDivElement>(".gsap-title");

      const onMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        gsap.to(cursor, { x: clientX, y: clientY });
      };

      const onMouseEnterLink = (event: any) => {
        const link = event.target;
        if (link?.classList.contains("gsap-title")) {
          gsap.to(cursor, { scale: 4 });
          cursorText.style.display = "block";
        } else {
          gsap.to(cursor, { scale: 4 });
        }
      };

      const onMouseLeaveLink = (event: any) => {
        gsap.to(cursor, { scale: 1 });
        cursorText.style.display = "none";
      };

      document.addEventListener("mousemove", onMouseMove);
      links.forEach((link: HTMLAnchorElement) => {
        link.addEventListener("mouseenter", onMouseEnterLink);
        link.addEventListener("mouseleave", onMouseLeaveLink);
      });

      buttons.forEach((button: HTMLButtonElement) => {
        button.addEventListener("mouseenter", onMouseEnterLink);
        button.addEventListener("mouseleave", onMouseLeaveLink);
      });

      mission.forEach((mission: HTMLDivElement) => {
        mission.addEventListener("mouseenter", onMouseEnterLink);
        mission.addEventListener("mouseleave", onMouseLeaveLink);
      });
    });

    return () => ctx.kill();
  }, []);

  return (
    <div id="custom-cursor" className="custom-cursor">
      <span className="cursor-text">Ver</span>
    </div>
  );
}

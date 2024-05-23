"use client"
import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  useEffect(() => {
    const ctx = gsap.context(() => {
    const cursor = document.querySelector("#custom-cursor");
    const cursorText: any = document.querySelector(".cursor-text");
    const links = document.querySelectorAll("a");
    
    const onMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        gsap.to(cursor, { x: clientX, y: clientY });
    }

    const onMouseEnterLink = (event: any) => { 
        const link = event.target;
        if(link?.classList.contains("view")) {
            gsap.to(cursor, { scale: 4}); 
            cursorText.style.display = "block";
        } else {
            gsap.to(cursor, { scale: 4});
        }
    }

    const onMouseLeaveLink = (event: any) => { 
        gsap.to(cursor, {scale: 1})
        cursorText.style.display = "none";
    }

    document.addEventListener("mousemove", onMouseMove);
    links.forEach((link:any) => {
        link.addEventListener("mouseenter", onMouseEnterLink);
        link.addEventListener("mouseleave", onMouseLeaveLink);
    })
    });

    return () => ctx.kill();
  }, []);

  return (
    <div id="custom-cursor" className="custom-cursor">
      <span className="cursor-text">View</span>
    </div>
  );
}

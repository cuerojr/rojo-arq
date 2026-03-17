// hooks/use-navbar-section.ts
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGlobal } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

export function useNavbarSection(theme: "light" | "dark") {
  const ref = useRef<HTMLElement>(null);
  const setLight = useGlobal((s) => s.setLight);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 5%",
      end: "bottom 5%",
      onEnter: () => setLight(theme === "light"),
      onEnterBack: () => setLight(theme === "light"),
    });

    return () => trigger.kill();
  }, [theme, setLight]);

  return ref;
}
import LocomotiveScroll from "locomotive-scroll";
import 'locomotive-scroll/src/locomotive-scroll.scss';
import { useEffect } from "react";

export default function useLocoScroll(start: any) {
  useEffect(() => {
    if (!start) return;

    const scrollEl = document.querySelector('#main-container');
    const locoScroll = new LocomotiveScroll({
        el: scrollEl as HTMLElement,
        smooth: true,
        multiplier: 1,
        class: 'is-reveal'
    })
  }, [start])
}

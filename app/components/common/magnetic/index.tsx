'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Props } from '@/app/types/types';

export default function Index({ children }: Props | any) {
    const magnetic: any = useRef(null);

    useEffect( () => {
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

        magnetic.current.addEventListener("mousemove", (e: any) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width/2)
            const y = clientY - (top + height/2)
            xTo(x * 0.35);
            yTo(y * 0.35)
        })
        magnetic.current.addEventListener("mouseleave", (e: any) => {
            xTo(0);
            yTo(0)
        })
    }, [])

    return (
        React.cloneElement(children, { ref: magnetic })
    )
}
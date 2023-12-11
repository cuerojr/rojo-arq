'use client'
import React from 'react'
import {ReactLenis, useLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({children}: any) {

  return (
    <ReactLenis root options={{
        smoothWheel: true
    }}>{ children }</ReactLenis>
  )
}
'use client'

import React from 'react'
import { Props } from '@/app/types/types'
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: Props) {

  return (
    <ReactLenis root options={{
        smoothWheel: true
    }}>{ children }</ReactLenis>
  )
}
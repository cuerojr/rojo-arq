'use client'

import { useGsapPlugins } from '@/hooks/use-gsap-plugin'
import { usePageTransition } from '@/hooks/use-page-transitions'
import { intro, outro } from '@/lib/transitions'

export function Client() {
  useGsapPlugins()
  usePageTransition({ intro, outro })

  return null
}
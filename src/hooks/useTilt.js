// Target path: src/hooks/useTilt.js
// Reusable 3D tilt-on-hover effect for cards. Tracks pointer position
// within the element bounds and converts it into a spring-smoothed
// rotateX/rotateY pair. Used by Projects, Certificates, and ArtDesign cards.

import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

const SPRING = { stiffness: 300, damping: 22, mass: 0.6 }
const MAX_TILT_DEG = 8

export function useTilt() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]), SPRING)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]), SPRING)

  const handleMouseMove = (event) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    x.set((event.clientX - bounds.left) / bounds.width - 0.5)
    y.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

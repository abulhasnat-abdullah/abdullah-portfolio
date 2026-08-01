// Target path: src/components/effects/CursorGlow.jsx
// A soft blurred light that trails the pointer (mouse) or the active touch
// point, layered above the static .grid-bg / .layout__bg-image and behind
// all real content. Purely decorative — pointer-events are disabled and it
// hides itself entirely for prefers-reduced-motion.
import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const SIZE = 560
const SPRING = { stiffness: 45, damping: 16, mass: 0.7 }

export default function CursorGlow() {
  // Starts centered off the top of the viewport so the very first move
  // eases the glow gently downward instead of flying in from a corner.
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const y = useMotionValue(-SIZE)

  const springX = useSpring(x, SPRING)
  const springY = useSpring(y, SPRING)
  const glowX = useTransform(springX, (v) => v - SIZE / 2)
  const glowY = useTransform(springY, (v) => v - SIZE / 2)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const setFromPoint = (clientX, clientY) => {
      x.set(clientX)
      y.set(clientY)
    }

    const handlePointerMove = (event) => setFromPoint(event.clientX, event.clientY)
    const handleTouchMove = (event) => {
      const touch = event.touches[0]
      if (touch) setFromPoint(touch.clientX, touch.clientY)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [x, y])

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      style={{ width: SIZE, height: SIZE, x: glowX, y: glowY }}
    />
  )
}

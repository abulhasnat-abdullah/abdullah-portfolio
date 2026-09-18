// Target path: src/components/motion/Magnetic.jsx
// Pulls its child toward the pointer while the pointer is over it, and
// springs back when it leaves. Mouse only, and off for reduced motion.
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 }

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  const onPointerMove = (event) => {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Measure from the element's resting centre, not where the pull has
    // already moved it, so the effect doesn't feed back on itself.
    const cx = rect.left + rect.width / 2 - sx.get()
    const cy = rect.top + rect.height / 2 - sy.get()
    x.set((event.clientX - cx) * strength)
    y.set((event.clientY - cy) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className}`.trim()}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}

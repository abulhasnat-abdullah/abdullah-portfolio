// Target path: src/components/effects/WaveArt.jsx
// The hand-drawn wave artwork from the original site, laid behind a section
// as a faint band that fades upward and drifts sideways as it scrolls past.
// Purely decorative; still for reduced motion.
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function WaveArt({ src, className = '', drift = 4 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [`${-drift}%`, `${drift}%`])

  return (
    <div ref={ref} className={`wave-art ${className}`.trim()} aria-hidden="true">
      <motion.div
        className="wave-art__img"
        style={{ backgroundImage: `url(${src})`, ...(reduced ? {} : { x }) }}
      />
    </div>
  )
}

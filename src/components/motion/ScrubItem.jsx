// Target path: src/components/motion/ScrubItem.jsx
// An entrance with a character: slide, flip, rise, skew or tilt in as the
// element first scrolls into view, then stay put.
//
// It used to be scroll-scrubbed (recomputed on every scroll frame, in both
// directions). With a dozen of these on the page that kept the main thread
// busy for the whole scroll and stuttered on slower machines, so it now
// plays once, on the compositor, like Reveal. Transform and opacity only.
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { EASE } from '../../lib/motion'

// Where each preset starts; every one ends at rest.
const PRESETS = {
  'slide-left': { x: -70 },
  'slide-right': { x: 70 },
  flip: { rotateX: 35, y: 50 },
  rise: { y: 60, scale: 0.94 },
  skew: { y: 50, skewY: 5 },
  tilt: { y: 50, rotate: -3 },
}

const REST = { x: 0, y: 0, rotate: 0, rotateX: 0, skewY: 0, scale: 1, opacity: 1 }

export default function ScrubItem({ preset = 'rise', className = '', as = 'div', children, ...rest }) {
  const reduced = useReducedMotion()
  const from = PRESETS[preset] ?? PRESETS.rise
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={`scrub-item ${className}`.trim()}
      initial={reduced ? { opacity: 0 } : { ...from, opacity: 0 }}
      whileInView={REST}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE }}
      style={{ transformPerspective: 1000 }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

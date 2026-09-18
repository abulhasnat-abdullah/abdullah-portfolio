// Target path: src/components/motion/ScrubItem.jsx
// A scroll-scrubbed entrance. The element's transform and opacity are tied
// directly to its own position in the viewport, so it animates in as you
// scroll down and back out as you scroll up, rather than firing once.
//
// Presets give each section its own motion. All of them use transform and
// opacity only. Progress runs from the element's top entering the bottom of
// the viewport to its top reaching 70% of the way up, so anything you can
// comfortably read has already settled.
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const PRESETS = {
  'slide-left': { x: [-90, 0] },
  'slide-right': { x: [90, 0] },
  flip: { rotateX: [42, 0], y: [70, 0] },
  rise: { y: [90, 0], scale: [0.9, 1] },
  skew: { y: [70, 0], skewY: [6, 0] },
  tilt: { y: [70, 0], rotate: [-4, 0] },
}

const STILL = [0, 0]
const UNIT = [1, 1]

export default function ScrubItem({ preset = 'rise', className = '', as = 'div', children, ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.7'] })
  const p = PRESETS[preset] ?? PRESETS.rise

  // Every transform is created every render (hooks can't be conditional);
  // presets that don't use one map it to a constant.
  const x = useTransform(scrollYProgress, [0, 1], p.x ?? STILL)
  const y = useTransform(scrollYProgress, [0, 1], p.y ?? STILL)
  const rotate = useTransform(scrollYProgress, [0, 1], p.rotate ?? STILL)
  const rotateX = useTransform(scrollYProgress, [0, 1], p.rotateX ?? STILL)
  const skewY = useTransform(scrollYProgress, [0, 1], p.skewY ?? STILL)
  const scale = useTransform(scrollYProgress, [0, 1], p.scale ?? UNIT)
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      ref={ref}
      className={`scrub-item ${className}`.trim()}
      style={
        reduced
          ? undefined
          : { x, y, rotate, rotateX, skewY, scale, opacity, transformPerspective: 1000 }
      }
      {...rest}
    >
      {children}
    </Tag>
  )
}

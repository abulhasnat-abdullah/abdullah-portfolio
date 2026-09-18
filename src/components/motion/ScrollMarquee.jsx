// Target path: src/components/motion/ScrollMarquee.jsx
// A band of oversized words that drifts on its own and reacts to scrolling:
// scroll faster and it speeds up and leans into the motion; scroll back up
// and it reverses. Two rows run in opposite directions, one solid and one
// outlined.
//
// Each row holds two identical tracks and wraps its position at -50%, so
// the loop is seamless. The per-frame update stops while the band is off
// screen, and reduced motion leaves it still.
import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const wrap = (min, max, value) => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

function Sparkle() {
  return (
    <svg className="scroll-marquee__star" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0c.7 6.6 4.9 10.9 12 12-7.1 1.1-11.3 5.4-12 12-.7-6.6-4.9-10.9-12-12C7.1 10.9 11.3 6.6 12 0Z"
      />
    </svg>
  )
}

function Row({ words, baseVelocity, outline, active, reduced }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 })
  const speedFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [10, -10])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  const direction = useRef(1)
  const activeRef = useRef(active)
  activeRef.current = active

  useAnimationFrame((_, delta) => {
    if (reduced || !activeRef.current) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const factor = speedFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    moveBy += direction.current * moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  // Enough copies that one track is always wider than the viewport.
  const copy = [...words, ...words]

  return (
    <motion.div
      className={`scroll-marquee__row${outline ? ' scroll-marquee__row--outline' : ''}`}
      style={reduced ? undefined : { x, skewX }}
    >
      {[0, 1].map((n) => (
        <div className="scroll-marquee__track" key={n}>
          {copy.map((word, i) => (
            <span className="scroll-marquee__item" key={i}>
              <span className="scroll-marquee__word">{word}</span>
              <Sparkle />
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  )
}

export default function ScrollMarquee({ words, reverse = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '200px 0px 200px 0px' })
  const reduced = useReducedMotion()
  const speed = reverse ? -2.5 : 2.5

  // Decorative: the words repeat content found elsewhere on the page.
  return (
    <div className="scroll-marquee" ref={ref} aria-hidden="true">
      <Row words={words} baseVelocity={speed} active={inView} reduced={reduced} />
      <Row
        words={[...words].reverse()}
        baseVelocity={-speed * 0.8}
        outline
        active={inView}
        reduced={reduced}
      />
    </div>
  )
}

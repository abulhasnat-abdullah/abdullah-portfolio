// Target path: src/components/effects/ScrollProgress.jsx
// Hairline progress bar pinned to the very top of the viewport. Uses a
// spring so it eases behind the scroll instead of tracking it rigidly.
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

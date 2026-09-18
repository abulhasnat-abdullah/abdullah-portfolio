// Target path: src/components/motion/ScrubText.jsx
// A paragraph that reads itself in: each word brightens from dim to full as
// the paragraph scrolls through the viewport, and dims again on the way
// back up. Opacity only, so the words stay inline and the text wraps as
// normal prose. Screen readers get the plain text, since opacity hides
// nothing from them.
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Each word's fade overlaps the next few, so the highlight reads as a soft
// sweep rather than words switching on one at a time.
const OVERLAP = 4

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export default function ScrubText({ text, className, as: Tag = 'p' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })

  if (reduced) {
    return (
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    )
  }

  const words = text.split(' ')
  const step = 1 / words.length

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <Word progress={scrollYProgress} range={[i * step, Math.min(1, (i + OVERLAP) * step)]}>
            {word}
          </Word>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

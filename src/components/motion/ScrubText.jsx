// Target path: src/components/motion/ScrubText.jsx
// A paragraph that reads itself in: each word brightens from dim to full as
// the paragraph scrolls through the viewport, and dims again on the way
// back up. Opacity only, so the words stay inline and the text wraps as
// normal prose. Screen readers get the plain text, since opacity hides
// nothing from them.
import { useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Each word's fade overlaps the next few, so the highlight reads as a soft
// sweep rather than words switching on one at a time.
const OVERLAP = 4
const DIM = 0.16

// One scroll value drives every word: it is written to a CSS variable (--p)
// on the paragraph, and each word's opacity is a CSS clamp() of it. No
// per-word JavaScript runs while scrolling, so a long paragraph costs the
// same as a short one.
export default function ScrubText({ text, className, as: Tag = 'p' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    ref.current?.style.setProperty('--p', v.toFixed(4))
  })

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
    <Tag ref={ref} className={className} style={{ '--p': 0 }}>
      {words.map((word, i) => {
        const start = i * step
        const span = Math.min(1, (i + OVERLAP) * step) - start
        const opacity = `clamp(${DIM}, calc(${DIM} + ${1 - DIM} * (var(--p) - ${start.toFixed(4)}) / ${span.toFixed(4)}), 1)`
        return (
          <span key={i}>
            <span style={{ opacity }}>{word}</span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </Tag>
  )
}

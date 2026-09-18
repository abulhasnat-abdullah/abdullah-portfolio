// Target path: src/components/SectionHeading.jsx
// Editorial section header: an index number, a kicker, the title, and a
// rule that draws itself in as the header scrolls into view. The title also
// drifts sideways as the header passes through the viewport, alternating
// direction from one section to the next.
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE, EASE_OUT, viewport } from '../lib/motion'

// NOTE: the whileInView trigger sits on the MASK, not on the title itself.
// IntersectionObserver clips a target's rect by every `overflow: hidden`
// ancestor, so a title parked 105% below its own mask has zero visible
// area — it would never trigger the reveal that brings it into view. The
// mask is unclipped, so it observes correctly and drives the title through
// variants.
// The mask needs its own `variants` prop (even an empty one) for Framer to
// propagate the "show" label down to the title.
const maskVariants = {
  hidden: {},
  show: {},
}

const titleVariants = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 0.85, delay: 0.05, ease: EASE_OUT } },
}

// Small enough to stay inside the page gutter on a phone.
const DRIFT = 4

// The title's last word is drawn in outline, for contrast with the solid
// capitals: "Selected Projects" → SELECTED *PROJECTS*.
// A one-word title stays solid throughout.
function splitTitle(title) {
  const cut = title.lastIndexOf(' ')
  if (cut === -1) return [title, null]
  return [title.slice(0, cut), title.slice(cut + 1)]
}

export default function SectionHeading({ section, index }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const number = String(index + 1).padStart(2, '0')
  const [lead, last] = splitTitle(section.title)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const direction = index % 2 === 0 ? 1 : -1
  // The drift is applied to the mask, not the title inside it: the mask
  // clips, so moving the title would cut off its first letters.
  const driftX = useTransform(
    scrollYProgress,
    [0, 1],
    [`${DRIFT * direction}%`, `${-DRIFT * direction}%`],
  )

  return (
    <header className="section-heading" ref={ref}>
      <motion.div
        className="section-heading__meta"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="section-heading__index">{number}</span>
        {section.kicker && <span className="section-heading__kicker">{section.kicker}</span>}
        {section.note && (
          <span className="section-heading__note" aria-hidden="true">
            {section.note}
          </span>
        )}
      </motion.div>

      <motion.div
        className="section-heading__title-mask"
        variants={maskVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        style={reduced ? undefined : { x: driftX }}
      >
        <motion.h2 className="section-heading__title" variants={titleVariants}>
          {lead}
          {last && (
            <>
              {' '}
              <em>{last}</em>
            </>
          )}
        </motion.h2>
      </motion.div>

      <motion.span
        className="section-heading__rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      />
    </header>
  )
}

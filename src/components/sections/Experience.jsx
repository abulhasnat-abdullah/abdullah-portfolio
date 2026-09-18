// Target path: src/components/sections/Experience.jsx
// One ruled row per organisation: logo, name and total time, then the
// latest role. Organisations with more roles expand on click. Rows slide in
// from alternating sides, scrubbed by scroll.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experience } from '../../data/portfolio'
import ScrubItem from '../motion/ScrubItem'
import { EASE } from '../../lib/motion'

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export default function Experience() {
  return (
    <div className="xp-list">
      {experience.map((org, i) => (
        <ScrubItem key={org.org} preset={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
          <OrgRow org={org} />
        </ScrubItem>
      ))}
    </div>
  )
}

function OrgRow({ org }) {
  const [open, setOpen] = useState(false)
  const [latest, ...earlier] = org.roles
  const hasMore = earlier.length > 0
  const Head = hasMore ? 'button' : 'div'
  const headProps = hasMore
    ? { type: 'button', onClick: () => setOpen((v) => !v), 'aria-expanded': open }
    : {}

  return (
    <article className={`xp-row${open ? ' xp-row--open' : ''}`}>
      <Head className="xp-row__head" {...headProps}>
        <img className="xp-row__logo" src={org.logo} alt="" loading="lazy" />
        <span className="xp-row__org">
          <strong>{org.org}</strong>
          <small>{org.totalDuration}</small>
        </span>
        <span className="xp-row__role">
          <em>{latest.title}</em>
          <small>{latest.period}</small>
        </span>
        <span className="xp-row__more">
          {hasMore && (
            <>
              +{earlier.length}
              <Chevron />
            </>
          )}
        </span>
      </Head>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="earlier"
            className="xp-row__earlier"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {earlier.map((role) => (
              <div className="xp-role" key={`${role.title}-${role.period}`}>
                <span className="xp-role__period">{role.period}</span>
                <span className="xp-role__title">{role.title}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

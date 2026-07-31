// Target path: src/components/sections/Experience.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experience } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

export default function Experience({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="org-list" variants={container} initial="hidden" animate="show">
        {experience.map((org) => (
          <OrgCard key={org.org} org={org} />
        ))}
      </motion.div>
    </div>
  )
}

function OrgCard({ org }) {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [latest, ...earlier] = org.roles
  const hasMore = earlier.length > 0
  const expanded = hasMore && (pinned || hovered)

  return (
    <motion.article
      className="org-card"
      variants={item}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <header className="org-card__header">
        <div className="org-card__logo">
          <img src={org.logo} alt={`${org.org} logo`} loading="lazy" />
        </div>
        <div className="org-card__title">
          <h3>{org.org}</h3>
          <p className="org-card__duration">{org.totalDuration} total</p>
        </div>
      </header>

      <div className="org-card__roles">
        <RoleRow role={latest} />

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="earlier-roles"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              {earlier.map((role) => (
                <RoleRow key={`${role.title}-${role.period}`} role={role} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasMore && (
        <button
          type="button"
          className="org-card__toggle"
          onClick={() => setPinned((v) => !v)}
        >
          {expanded ? 'Show less' : `+${earlier.length} earlier role${earlier.length > 1 ? 's' : ''}`}
        </button>
      )}
    </motion.article>
  )
}

function RoleRow({ role }) {
  return (
    <div className="org-role">
      <div className="org-role__top">
        <h4>{role.title}</h4>
        <time>{role.period}</time>
      </div>
      <p className="org-role__meta">
        {[role.type, role.location, role.duration].filter(Boolean).join(' · ')}
      </p>
      {role.tags?.length > 0 && <p className="org-role__tags">{role.tags.join(' · ')}</p>}
    </div>
  )
}
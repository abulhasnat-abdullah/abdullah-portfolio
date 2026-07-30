// Target path: src/components/sections/Extracurricular.jsx
import { motion } from 'framer-motion'
import { extracurricular } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

export default function Extracurricular({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="org-list" variants={container} initial="hidden" animate="show">
        {extracurricular.map((org) => (
          <motion.article key={org.org} className="org-card" variants={item}>
            <header className="org-card__header">
              <div>
                <h3>{org.org}</h3>
                <p className="org-card__duration">{org.totalDuration} total</p>
              </div>
            </header>

            <div className="org-card__roles">
              {org.roles.map((role) => (
                <div key={`${role.title}-${role.period}`} className="org-role">
                  <div className="org-role__head">
                    <div>
                      <h4>{role.title}</h4>
                      <p className="org-role__meta">
                        {[role.type, role.location].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <div className="org-role__dates">
                      <time>{role.period}</time>
                      {role.duration && <span>{role.duration}</span>}
                    </div>
                  </div>
                  {role.tags?.length > 0 && (
                    <ul className="tag-list">
                      {role.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}

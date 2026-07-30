// Target path: src/components/sections/Experience.jsx
import { motion } from 'framer-motion'
import { experience, achievements } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

export default function Experience({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="timeline" variants={container} initial="hidden" animate="show">
        {experience.map((exp) => (
          <motion.article key={`${exp.role}-${exp.period}`} className="timeline__item" variants={item}>
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__content">
              <div className="timeline__head">
                <div>
                  <h3>{exp.role}</h3>
                  <p className="timeline__org">{exp.org}</p>
                </div>
                <time>{exp.period}</time>
              </div>
              <p>{exp.description}</p>
              <ul className="tag-list">
                {exp.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div className="achievement-grid" variants={container} initial="hidden" animate="show">
        {achievements.map((achievement) => (
          <motion.article key={achievement.title} className="achievement-card" variants={item}>
            <h3>{achievement.title}</h3>
            <p className="achievement-card__context">{achievement.context}</p>
            <p>{achievement.detail}</p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}

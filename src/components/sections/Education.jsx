// Target path: src/components/sections/Education.jsx
import { motion } from 'framer-motion'
import { education } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

export default function Education({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="education-list" variants={container} initial="hidden" animate="show">
        {education.map((entry) => (
          <motion.article key={entry.id} className="education-card" variants={item}>
            <div className="education-card__logo">
              <img src={entry.logo} alt={entry.institution} loading="lazy" />
            </div>
            <div className="education-card__body">
              <div className="education-card__head">
                <div>
                  <h3>{entry.institution}</h3>
                  <p className="education-card__degree">{entry.degree}</p>
                </div>
                {entry.period && <time className="education-card__period">{entry.period}</time>}
              </div>

              {entry.grade && <p className="education-card__grade">Grade: {entry.grade}</p>}
              {entry.note && <p className="education-card__note">{entry.note}</p>}
              {entry.activities && (
                <p className="education-card__activities">
                  <span>Activities and societies:</span> {entry.activities}
                </p>
              )}

              {entry.skills?.length > 0 && (
                <ul className="tag-list education-card__skills">
                  {entry.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                  {entry.moreSkillsCount > 0 && (
                    <li className="education-card__skills-more">+{entry.moreSkillsCount} skills</li>
                  )}
                </ul>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
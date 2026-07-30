// Target path: src/components/sections/Skills.jsx
import { motion } from 'framer-motion'
import { skillGroups } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

export default function Skills({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="skills-grid" variants={container} initial="hidden" animate="show">
        {skillGroups.map((group) => (
          <motion.article key={group.category} className="skills-card" variants={item}>
            <h3>{group.category}</h3>
            <ul className="tag-list tag-list--wrap">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}

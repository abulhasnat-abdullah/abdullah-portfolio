// Target path: src/components/sections/Skills.jsx
import { motion } from 'framer-motion'
import { skillGroups } from '../../data/portfolio'
import { skillIcons } from '../../data/skillIcons'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

function SkillBadge({ skill }) {
  const entry = skillIcons[skill]
  const Icon = entry?.icon
  const color = entry?.color ?? '#ff6b35'

  return (
    <motion.div className="skill-badge" variants={item} whileHover={{ y: -4 }}>
      <span className="skill-badge__ring" style={{ '--skill-color': color }}>
        {Icon ? <Icon className="skill-badge__icon" style={{ color }} /> : skill.slice(0, 2)}
      </span>
      <span className="skill-badge__label">{skill}</span>
    </motion.div>
  )
}

export default function Skills({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="skills-grid" variants={container} initial="hidden" animate="show">
        {skillGroups.map((group) => (
          <motion.article key={group.category} className="skills-card" variants={item}>
            <h3>{group.category}</h3>
            <div className="skills-card__badges">
              {group.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
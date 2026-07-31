// Target path: src/components/sections/Skills.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillGroups } from '../../data/portfolio'
import { skillIcons } from '../../data/skillIcons'
import { skillLevels } from '../../data/skillLevels'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

const RING_SIZE = 84
const RING_STROKE = 4
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function SkillBadge({ skill }) {
  const file = skillIcons[skill]
  const percent = skillLevels[skill] ?? 0
  const [broken, setBroken] = useState(false)
  const showImage = file && !broken
  const offset = RING_CIRCUMFERENCE * (1 - percent / 100)

  return (
    <motion.div className="skill-badge" variants={item} whileHover={{ y: -4 }}>
      <div className="skill-badge__ring-wrap" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg className="skill-badge__progress" viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
          <circle
            className="skill-badge__track"
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            strokeWidth={RING_STROKE}
          />
          <circle
            className="skill-badge__bar"
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            strokeWidth={RING_STROKE}
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="skill-badge__logo">
          {showImage ? (
            <img
              src={`/images/skills/${file}`}
              alt={`${skill} logo`}
              loading="lazy"
              onError={() => setBroken(true)}
            />
          ) : (
            <span className="skill-badge__fallback">{skill.slice(0, 2)}</span>
          )}
        </span>
      </div>
      <span className="skill-badge__label">{skill}</span>
      <span className="skill-badge__percent">{percent}%</span>
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
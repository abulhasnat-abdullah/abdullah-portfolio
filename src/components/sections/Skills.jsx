// Target path: src/components/sections/Skills.jsx
// One ruled row per group: a numbered label, then compact chips. Each chip
// carries its level as a hairline along its base that fills on scroll-in.
import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillGroups } from '../../data/portfolio'
import { skillIcons } from '../../data/skillIcons'
import { skillLevels } from '../../data/skillLevels'
import ScrubItem from '../motion/ScrubItem'
import { EASE, viewport } from '../../lib/motion'

const pad = (n) => String(n).padStart(2, '0')

function SkillChip({ skill, index }) {
  const file = skillIcons[skill]
  const level = skillLevels[skill] ?? 0
  const [broken, setBroken] = useState(false)

  return (
    <li className="skill-chip" title={`${skill} — ${level}%`}>
      <span className="skill-chip__logo">
        {file && !broken ? (
          <img src={`/images/skills/${file}`} alt="" loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <span>{skill.slice(0, 2)}</span>
        )}
      </span>
      <span className="skill-chip__name">{skill}</span>
      <span className="skill-chip__bar" aria-hidden="true">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={viewport}
          transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: EASE }}
        />
      </span>
    </li>
  )
}

export default function Skills() {
  return (
    <div className="skill-rows">
      {skillGroups.map((group, gi) => (
        <ScrubItem key={group.category} preset={gi % 2 === 0 ? 'slide-left' : 'slide-right'}>
          <div className="skill-row">
            <h3 className="skill-row__label">
              <span>{pad(gi + 1)}</span>
              {group.category}
            </h3>
            <ul className="skill-row__chips">
              {group.skills.map((skill, i) => (
                <SkillChip key={skill} skill={skill} index={i} />
              ))}
            </ul>
          </div>
        </ScrubItem>
      ))}
    </div>
  )
}

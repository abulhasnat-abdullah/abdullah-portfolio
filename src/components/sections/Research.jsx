// Target path: src/components/sections/Research.jsx
import { motion } from 'framer-motion'
import { researchInterests } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

export default function Research({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="research-grid" variants={container} initial="hidden" animate="show">
        {researchInterests.map((research) => (
          <motion.article key={research.title} className="research-card" variants={item}>
            <h3>{research.title}</h3>
            <p>{research.description}</p>
            <ul className="tag-list">
              {research.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}

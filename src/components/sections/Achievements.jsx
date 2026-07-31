// Target path: src/components/sections/Achievements.jsx
import { motion } from 'framer-motion'
import { achievements } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item, cardHover } from '../../lib/motion'
import { useTilt } from '../../hooks/useTilt'

function AchievementCard({ achievement }) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <motion.article
      ref={ref}
      className="achievement-card"
      variants={item}
      whileHover={cardHover}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {achievement.image && (
        <div className="achievement-card__image-wrap">
          <img src={achievement.image} alt={`${achievement.title} certificate`} loading="lazy" />
        </div>
      )}
      <div className="achievement-card__body">
        <h3>{achievement.title}</h3>
        <p className="achievement-card__context">{achievement.context}</p>
        <p>{achievement.detail}</p>
      </div>
    </motion.article>
  )
}

export default function Achievements({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="achievement-grid" variants={container} initial="hidden" animate="show">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.title} achievement={achievement} />
        ))}
      </motion.div>
    </div>
  )
}

// Target path: src/components/sections/ArtDesign.jsx
import { motion } from 'framer-motion'
import { creativePortfolios } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item, cardHover } from '../../lib/motion'
import { useTilt } from '../../hooks/useTilt'
import CreativeGallery from './CreativeGallery'

function CreativeCard({ portfolio }) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <motion.a
      ref={ref}
      className={`creative-card creative-card--${portfolio.theme}`}
      href={portfolio.href}
      target="_blank"
      rel="noreferrer"
      variants={item}
      whileHover={cardHover}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="creative-card__top">
        <span className="creative-card__platform">{portfolio.platform}</span>
        <span className="creative-card__role">{portfolio.role}</span>
      </div>
      <h3>{portfolio.title}</h3>
      <p className="creative-card__handle">{portfolio.handle}</p>
      <p>{portfolio.description}</p>
      <ul className="tag-list">
        {portfolio.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <span className="creative-card__link">View on {portfolio.platform} →</span>
    </motion.a>
  )
}

export default function ArtDesign({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <p className="section-lead">
        Creative work beyond robotics — watercolour art and graphic design portfolios.
      </p>
      <motion.div className="creative-grid" variants={container} initial="hidden" animate="show">
        {creativePortfolios.map((portfolio) => (
          <CreativeCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </motion.div>
      <CreativeGallery />
    </div>
  )
}

// Target path: src/components/sections/ArtDesign.jsx
import { motion } from 'framer-motion'
import { creativePortfolios } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item, cardHover } from '../../lib/motion'
import { useTilt } from '../../hooks/useTilt'
import CreativeGallery from './CreativeGallery'

function PlatformLogo({ platform }) {
  if (platform === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.48-2.9a1.24 1.24 0 1 1 0 2.48 1.24 1.24 0 0 1 0-2.48Z" />
      </svg>
    )
  }
  if (platform === 'Behance') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M9.4 8.6c.53 0 1.02.05 1.46.15.44.09.82.25 1.13.46.31.22.55.51.72.87.17.36.25.81.25 1.34 0 .58-.13 1.06-.4 1.44-.26.39-.65.7-1.17.95.71.2 1.24.56 1.59 1.06.35.51.53 1.12.53 1.83 0 .58-.11 1.08-.34 1.5-.22.42-.53.77-.91 1.03-.39.27-.83.47-1.32.59-.49.12-.99.18-1.51.18H3V8.6h6.4Zm-.38 4.05c.43 0 .79-.1 1.07-.31.28-.2.42-.54.42-1 0-.26-.05-.47-.14-.63a1 1 0 0 0-.38-.38 1.6 1.6 0 0 0-.54-.19c-.2-.03-.42-.05-.64-.05H5.65v2.56h3.37Zm.15 4.25c.24 0 .47-.02.68-.07.21-.05.4-.13.56-.24.16-.11.29-.27.38-.46.09-.2.14-.45.14-.75 0-.6-.17-1.02-.5-1.28-.34-.25-.79-.38-1.34-.38h-3.4v3.18h3.48ZM16.4 16.9c.36.35.88.53 1.56.53.49 0 .91-.12 1.26-.37.35-.24.57-.5.65-.77h2.02c-.32 1-.82 1.72-1.49 2.15-.67.43-1.48.65-2.43.65-.66 0-1.26-.11-1.79-.32a3.73 3.73 0 0 1-1.35-.9 4.02 4.02 0 0 1-.85-1.4 5.2 5.2 0 0 1-.3-1.79c0-.63.1-1.22.31-1.76.2-.55.5-1.02.87-1.42.38-.4.83-.71 1.35-.94a4.5 4.5 0 0 1 1.76-.34c.72 0 1.35.14 1.89.42.54.28.98.65 1.32 1.12.34.47.59 1 .74 1.6.15.6.2 1.22.16 1.88h-6.09c0 .69.24 1.03.61 1.37ZM19.32 12.61c-.29-.32-.77-.49-1.36-.49-.39 0-.71.07-.96.2-.26.13-.46.29-.62.48-.15.19-.26.39-.32.6-.06.21-.1.4-.11.56h3.78c-.06-.59-.24-.99-.41-1.35ZM15.11 9.02h4.72v1.15h-4.72V9.02Z" />
      </svg>
    )
  }
  return null
}

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

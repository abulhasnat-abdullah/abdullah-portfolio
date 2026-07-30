// Target path: src/components/sections/Certificates.jsx
import { motion } from 'framer-motion'
import { certificates } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item, cardHover } from '../../lib/motion'
import { useTilt } from '../../hooks/useTilt'

function CertificateCard({ cert }) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt()
  const CardTag = cert.href ? motion.a : motion.article
  const cardProps = cert.href
    ? { href: cert.href, target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <CardTag
      ref={ref}
      className="certificate-card"
      variants={item}
      whileHover={cardHover}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...cardProps}
    >
      <div className="certificate-card__image-wrap">
        <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" />
      </div>
      <div className="certificate-card__body">
        <p className="certificate-card__issuer">{cert.issuer}</p>
        <h3>{cert.title}</h3>
        <div className="certificate-card__meta">
          <span>{cert.date}</span>
          {cert.hours && <span>{cert.hours}</span>}
        </div>
        <p className="certificate-card__id">ID: {cert.credentialId}</p>
        <ul className="tag-list">
          {cert.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {cert.href && <span className="certificate-card__link">View credential →</span>}
      </div>
    </CardTag>
  )
}

export default function Certificates({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="certificate-grid" variants={container} initial="hidden" animate="show">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </motion.div>
    </div>
  )
}

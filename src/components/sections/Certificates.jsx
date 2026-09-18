// Target path: src/components/sections/Certificates.jsx
// One ruled row per certificate, flipping up from a 3D tilt on scroll.
import { certificates } from '../../data/portfolio'
import ScrubItem from '../motion/ScrubItem'

export default function Certificates() {
  return (
    <div className="cert-list">
      {certificates.map((cert) => {
        const Row = cert.href ? 'a' : 'article'
        const rowProps = cert.href ? { href: cert.href, target: '_blank', rel: 'noreferrer' } : {}
        return (
          <ScrubItem key={cert.id} preset="flip">
            <Row className="cert-row" {...rowProps}>
              <span className="cert-row__thumb">
                <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" />
              </span>
              <span className="cert-row__main">
                <small>{cert.issuer}</small>
                <strong>{cert.title}</strong>
              </span>
              <span className="cert-row__meta">
                {[cert.date, cert.hours].filter(Boolean).join(' · ')}
              </span>
              <span className="cert-row__go">{cert.href ? 'View ↗' : 'Credential'}</span>
            </Row>
          </ScrubItem>
        )
      })}
    </div>
  )
}

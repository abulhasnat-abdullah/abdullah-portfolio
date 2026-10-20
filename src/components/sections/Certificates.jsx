// Target path: src/components/sections/Certificates.jsx
// One ruled row per certificate, flipping up from a 3D tilt on scroll.
// Clicking a row opens the certificate full size (Lightbox.jsx, arrow keys
// browse the rest); a certificate with a verification URL also gets a
// "Verify" link of its own, in the row and in the viewer.
import { useCallback, useState } from 'react'
import { certificates } from '../../data/portfolio'
import ScrubItem from '../motion/ScrubItem'
import Lightbox from '../Lightbox'

const items = certificates.map((cert) => ({
  src: cert.image,
  alt: `${cert.title} certificate`,
  title: cert.title,
  detail: [cert.issuer, cert.date, cert.credentialId && `ID ${cert.credentialId}`].filter(Boolean).join(' · '),
  link: cert.href ? { href: cert.href, label: 'Verify' } : null,
}))

export default function Certificates() {
  const [openIndex, setOpenIndex] = useState(null)
  const navigate = useCallback(
    (dir) => setOpenIndex((prev) => (prev === null ? prev : (prev + dir + items.length) % items.length)),
    [],
  )

  return (
    <>
      <div className="cert-list">
        {certificates.map((cert, i) => (
          <ScrubItem key={cert.id} preset="flip">
            <article className="cert-row" onClick={() => setOpenIndex(i)}>
              <button type="button" className="cert-row__thumb" aria-label={`View ${cert.title} certificate`}>
                <img src={cert.image} alt="" loading="lazy" />
              </button>
              <span className="cert-row__main">
                <small>{cert.issuer}</small>
                <strong>{cert.title}</strong>
              </span>
              <span className="cert-row__meta">{[cert.date, cert.hours].filter(Boolean).join(' · ')}</span>
              {cert.href ? (
                <a
                  className="cert-row__go"
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Verify ↗
                </a>
              ) : (
                <span className="cert-row__go">View</span>
              )}
            </article>
          </ScrubItem>
        ))}
      </div>

      <Lightbox
        items={items}
        index={openIndex}
        label="Certificate"
        onClose={() => setOpenIndex(null)}
        onNavigate={navigate}
      />
    </>
  )
}

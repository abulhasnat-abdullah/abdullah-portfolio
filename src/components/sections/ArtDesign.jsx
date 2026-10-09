// Target path: src/components/sections/ArtDesign.jsx
// Two portfolio cards (Instagram art, Behance design) above the gallery.
import { creativePortfolios } from '../../data/portfolio'
import Reveal from '../motion/Reveal'
import ScrubItem from '../motion/ScrubItem'
import CreativeGallery from './CreativeGallery'

// Platform marks for the two portfolio cards.
const ICONS = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Behance: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.2 11.3c.9-.4 1.5-1.2 1.5-2.4C9.7 6.7 8.1 6 6.1 6H1v12h5.3c2.1 0 4-1 4-3.4 0-1.5-.8-2.7-2.1-3.3ZM3.5 8.1h2.3c.9 0 1.6.3 1.6 1.2 0 .9-.6 1.3-1.5 1.3H3.5V8.1Zm2.5 7.8H3.5v-3.2h2.6c1 0 1.7.4 1.7 1.6 0 1.2-.8 1.6-1.8 1.6ZM15.3 7.1h5.4V8.4h-5.4zM18.1 9.6c-2.6 0-4.4 1.9-4.4 4.4 0 2.6 1.6 4.4 4.4 4.4 2.1 0 3.5-1 4.1-3h-2.1c-.2.7-1.1 1.1-1.9 1.1-1.4 0-2.1-.8-2.1-2.1h6.3c.1-2.7-1.4-4.8-4.3-4.8Zm-2.1 3.5c.1-1.1.8-1.8 2-1.8 1.1 0 1.7.7 1.8 1.8H16Z" />
    </svg>
  ),
}

// The words on each card's button.
const CTA = { Instagram: 'Open Instagram', Behance: 'View on Behance' }

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function ArtDesign() {
  return (
    <>
      <Reveal className="section-lead" as="p">
        Creative work beyond robotics — watercolour art and graphic design portfolios.
      </Reveal>

      {/* Two cards that read as buttons: logo, what's there, and an explicit
        call to action. */}
      <div className="creative-links">
        {creativePortfolios.map((portfolio, i) => (
          <ScrubItem key={portfolio.id} preset={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
            <a className="portal" href={portfolio.href} target="_blank" rel="noreferrer">
              <span className="portal__icon">{ICONS[portfolio.platform]}</span>
              <span className="portal__body">
                <span className="portal__platform">
                  {portfolio.platform} · {portfolio.handle}
                </span>
                <strong className="portal__title">{portfolio.title}</strong>
                <span className="portal__desc">{portfolio.description}</span>
              </span>
              <span className="portal__cta">
                {CTA[portfolio.platform] ?? 'Open'}
                <ArrowUpRight />
              </span>
            </a>
          </ScrubItem>
        ))}
      </div>

      <CreativeGallery />
    </>
  )
}

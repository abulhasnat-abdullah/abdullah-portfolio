// Target path: src/components/sections/ArtDesign.jsx
// Two large link rows (Instagram art, Behance design) above the gallery.
import { creativePortfolios } from '../../data/portfolio'
import Reveal from '../motion/Reveal'
import ScrubItem from '../motion/ScrubItem'
import CreativeGallery from './CreativeGallery'
import WaveArt from '../effects/WaveArt'

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

      <div className="creative-links">
        <WaveArt src="/images/decorative/wave-pattern.webp" className="wave-art--band" />
        {creativePortfolios.map((portfolio, i) => (
          <ScrubItem key={portfolio.id} preset={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
            <a className="creative-link" href={portfolio.href} target="_blank" rel="noreferrer">
              <span className="creative-link__platform">{portfolio.platform}</span>
              <strong className="creative-link__title">{portfolio.title}</strong>
              <span className="creative-link__handle">{portfolio.handle}</span>
              <span className="creative-link__arrow">
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

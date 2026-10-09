// Target path: src/components/sections/FeaturedProjects.jsx
// Highlighted projects as compact case studies (data: data/featured.js) —
// the key ideas only; the full write-up lives behind the project's link.
//
// Each reads top to bottom: an intro with the vehicle on the same orange
// glow as the portrait in the hero, a row of headline figures, the film
// beside the two missions, a row of key ideas, and a strip of photos.
// Every block is optional — leave its data out and it's skipped.
//
// The film is a click-to-load YouTube embed: until it's clicked the page
// loads one thumbnail, not YouTube's player, and nothing is sent to YouTube.
import { useState } from 'react'
import { featuredProjects } from '../../data/featured'
import Reveal, { Stagger, StaggerItem } from '../motion/Reveal'

function Film({ id, title }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="case__film">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`${title} — project film`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="case__film-poster" onClick={() => setPlaying(true)}>
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" decoding="async" />
          <span className="case__film-play" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span className="case__film-label">Watch the film</span>
        </button>
      )}
    </div>
  )
}

function CaseStudy({ project }) {
  return (
    <article className="case" id={`case-${project.id}`}>
      {/* ------------------------------------------------ intro */}
      <div className="case__intro">
        <div className="case__intro-text">
          <Reveal as="h3" className="case__name">
            {project.name}
          </Reveal>
          <Reveal as="p" className="case__title" delay={0.05}>
            {project.title}
          </Reveal>
          <Reveal as="p" className="case__summary" delay={0.1}>
            {project.summary}
          </Reveal>

          {project.meta && (
            <Reveal as="dl" className="case__meta" delay={0.15}>
              {project.meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </Reveal>
          )}

          <Reveal className="case__links" delay={0.2}>
            {project.links?.map((link) => (
              <a key={link.href} className="case__link" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            ))}
          </Reveal>
          {project.tags && (
            <Reveal as="ul" className="case__tags" delay={0.25}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </Reveal>
          )}
        </div>

        {project.cutout && (
          <Reveal className="case__hero" direction="left" delay={0.1}>
            <img src={project.cutout} alt={project.cutoutAlt ?? project.name} loading="lazy" decoding="async" />
          </Reveal>
        )}
      </div>

      {/* ------------------------------------------------ headline figures */}
      {project.metrics && (
        <Stagger className="case__metrics">
          {project.metrics.map((m) => (
            <StaggerItem className="case__metric" key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {/* ------------------------------------------------ film + missions */}
      <div className="case__body">
        {project.youtube && (
          <Reveal className="case__body-film">
            <Film id={project.youtube} title={project.name} />
          </Reveal>
        )}
        {project.missions && (
          <div className="case__missions">
            {project.missions.map((m, i) => (
              <Reveal className="case__mission" key={m.name} delay={i * 0.08}>
                <img src={m.image} alt={m.imageAlt ?? ''} loading="lazy" decoding="async" />
                <div>
                  <p className="case__mission-tag">Mission 0{i + 1}</p>
                  <h5>{m.name}</h5>
                  <p>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------ key ideas */}
      {project.keyIdeas && (
        <Stagger className="case__ideas">
          {project.keyIdeas.map((idea, i) => (
            <StaggerItem className="case__idea" key={idea.title}>
              <span className="case__idea-num">0{i + 1}</span>
              <h5>{idea.title}</h5>
              <p>{idea.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {/* ------------------------------------------------ photos */}
      {project.gallery && (
        <Stagger className="case__strip">
          {project.gallery.map((img) => (
            <StaggerItem as="figure" className="case__shot" key={img.src}>
              <img src={img.src} alt={img.caption} loading="lazy" decoding="async" />
              <figcaption>{img.caption}</figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </article>
  )
}

export default function FeaturedProjects() {
  return (
    <div className="featured">
      {featuredProjects.map((project) => (
        <CaseStudy key={project.id} project={project} />
      ))}
    </div>
  )
}

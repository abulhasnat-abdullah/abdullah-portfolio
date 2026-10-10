// Target path: src/components/sections/Teamwork.jsx
// Teamwork: my work in Team Interplanetar (data: data/teamwork.js).
//
// Compact: an intro (role, competitions, focus areas) beside a photo of the
// rover, then one row of team projects. "View more" opens the role
// timeline, a row of four photos and every team project (a project's
// extra images show as thumbnails on its card). The timeline is read from
// `experience` and the projects from `projects` (team: 'interplanetar'), so
// they never drift.
import { useRef, useState } from 'react'
import { experience, projects } from '../../data/portfolio'
import { teamwork } from '../../data/teamwork'
import Reveal, { Stagger, StaggerItem } from '../motion/Reveal'
import MoreButton from '../MoreButton'

const STATUS = { live: 'Live', 'in-progress': 'In progress', completed: 'Completed' }

const org = experience.find((e) => e.org.includes('Interplanetar'))
// Oldest first, so the timeline reads as a climb.
const roles = org ? [...org.roles].reverse() : []
const teamProjects = projects.filter((p) => p.team === 'interplanetar')
// Collapsed, the section shows one row of projects; "View more" opens the
// role timeline, the photo row and the rest of the projects.
const INITIAL_PROJECTS = 4

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function Teamwork() {
  const t = teamwork
  const [expanded, setExpanded] = useState(false)
  const rootRef = useRef(null)
  const shownProjects = expanded ? teamProjects : teamProjects.slice(0, INITIAL_PROJECTS)

  return (
    <div className="team" ref={rootRef}>
      {/* ------------------------------------------------ intro */}
      <div className="team__intro">
        <div className="team__intro-text">
          <Reveal className="team__head">
            {org?.logo && <img className="team__logo" src={org.logo} alt="" loading="lazy" />}
            <div>
              <h3 className="team__name">{t.team}</h3>
              <p className="team__tagline">{t.tagline}</p>
            </div>
          </Reveal>

          <Reveal className="team__role-row" delay={0.05}>
            <span className="team__role">{t.role}</span>
            {t.website && (
              <a className="team__site" href={t.website} target="_blank" rel="noreferrer">
                Team website
                <ArrowUpRight />
              </a>
            )}
          </Reveal>

          <Reveal as="p" className="team__summary" delay={0.1}>
            {t.summary}
          </Reveal>

          <Reveal className="team__chips" delay={0.15}>
            <span className="team__label">Competitions</span>
            <ul className="team__chips-list team__chips-list--strong">
              {t.competitions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="team__chips" delay={0.2}>
            <span className="team__label">What I work on</span>
            <ul className="team__chips-list">
              {t.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>

          {expanded && roles.length > 0 && (
            <Reveal as="ol" className="team__timeline" delay={0.25}>
              {roles.map((r) => (
                <li key={r.title}>
                  <span className="team__timeline-period">{r.period}</span>
                  <span className="team__timeline-title">{r.title}</span>
                </li>
              ))}
            </Reveal>
          )}
        </div>

        <Reveal className="team__photo" direction="left" delay={0.1}>
          <img src={t.photo.src} alt={t.photo.alt} loading="lazy" decoding="async" />
        </Reveal>
      </div>

      {/* ------------------------------------------------ photos: one row */}
      {expanded && (
        <Stagger className="team__row">
          {t.gallery.map((img) => (
            <StaggerItem as="figure" className="team__shot" key={img.src}>
              <img src={img.src} alt={img.caption} loading="lazy" decoding="async" />
              <figcaption>{img.caption}</figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {/* ------------------------------------------------ team projects: one row */}
      {teamProjects.length > 0 && (
        <div className="team__projects-block">
          <Reveal as="p" className="team__label">
            Team projects
          </Reveal>
          {/* Keyed on `expanded`: the reveal runs once, so cards added to an
            already-revealed grid would stay hidden. A fresh grid reveals all. */}
          <Stagger className="team__projects" key={expanded ? 'all' : 'some'}>
            {shownProjects.map((p) => {
              const Tag = p.href ? 'a' : 'div'
              const linkProps = p.href ? { href: p.href, target: '_blank', rel: 'noreferrer' } : {}
              return (
                <StaggerItem key={p.id}>
                  <Tag className={`team__project${p.href ? ' team__project--link' : ''}`} {...linkProps}>
                    <span className="team__project-media">
                      {p.video ? (
                        // Plays only while hovered, so its few MB load only for
                        // visitors who look; touch screens keep the poster.
                        <video
                          src={p.video}
                          poster={p.image}
                          muted
                          loop
                          playsInline
                          preload="none"
                          onPointerEnter={(e) => e.pointerType === 'mouse' && e.currentTarget.play().catch(() => {})}
                          onPointerLeave={(e) => e.currentTarget.pause()}
                        />
                      ) : (
                        <img src={p.image} alt="" loading="lazy" decoding="async" />
                      )}
                      {p.gallery && (
                        <span className="team__project-thumbs">
                          {p.gallery.slice(0, 3).map((src) => (
                            <img key={src} src={src} alt="" loading="lazy" decoding="async" />
                          ))}
                        </span>
                      )}
                    </span>
                    <span className="team__project-body">
                      <span className={`team__status team__status--${p.status}`}>{STATUS[p.status]}</span>
                      <strong>
                        {p.title}
                        {p.href && <ArrowUpRight />}
                      </strong>
                      <span className="team__project-desc">{p.description}</span>
                    </span>
                  </Tag>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      )}

      <MoreButton
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        label={`View all ${teamProjects.length} projects & photos`}
        targetRef={rootRef}
      />
    </div>
  )
}

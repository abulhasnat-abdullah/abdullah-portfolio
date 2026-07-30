// Target path: src/components/sections/About.jsx
import { motion } from 'framer-motion'
import { profile, highlights } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

export default function About({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <div className="about about--tab">
        <motion.div
          className="about__hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img className="about__photo" src={profile.photo} alt={profile.name} />
          <div>
            <p className="hero__eyebrow">{profile.subtitle}</p>
            <h2 className="about__name">{profile.name}</h2>
            <p className="hero__role">{profile.title}</p>
            <p className="hero__tagline">{profile.tagline}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={profile.links.github} target="_blank" rel="noreferrer">
                View GitHub
              </a>
              <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn btn--ghost" href={profile.links.instagram} target="_blank" rel="noreferrer">
                Art · Instagram
              </a>
              <a className="btn btn--ghost" href={profile.links.behance} target="_blank" rel="noreferrer">
                Design · Behance
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="about__grid"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about__text">
            <p>{profile.bio}</p>
            <blockquote className="about__quote">{profile.quote}</blockquote>
          </div>
          <aside className="about__meta">
            <dl>
              <div>
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>BSc Mechanical Engineering, BUET</dd>
              </div>
              <div>
                <dt>Credentials</dt>
                <dd>{profile.credentials.join(' · ')}</dd>
              </div>
            </dl>
          </aside>
        </motion.div>

        <motion.ul className="hero__stats" variants={container} initial="hidden" animate="show">
          {highlights.map((highlight) => (
            <motion.li key={highlight.label} variants={item}>
              <span>{highlight.label}</span>
              <strong>{highlight.value}</strong>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}

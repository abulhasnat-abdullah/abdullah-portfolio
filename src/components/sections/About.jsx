// Target path: src/components/sections/About.jsx
// The hero is intentionally bare now, so everything that used to sit up
// there — bio, location, links, credentials — lands here instead, revealed
// as you scroll into it.
import { profile, highlights } from '../../data/portfolio'
import Reveal, { Stagger, StaggerItem } from '../motion/Reveal'
import ScrubText from '../motion/ScrubText'
import { useNavigation } from '../../context/NavigationContext'

export default function About() {
  const { scrollToSection } = useNavigation()

  return (
    <div className="about">
      <div className="about__grid">
        <div className="about__main">
          <Reveal className="about__lead" as="p">
            Mechanical Engineering at BUET — building autonomous systems by day,
            painting watercolour and designing by night.
          </Reveal>

          <ScrubText className="about__bio" text={profile.bio} />

          <Reveal className="about__actions" delay={0.1}>
            <a className="btn btn--ghost" href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn btn--ghost" href={profile.links.email}>
              Email
            </a>
            <button type="button" className="btn btn--primary" onClick={() => scrollToSection('projects')}>
              See Projects
            </button>
          </Reveal>
        </div>

        <aside className="about__aside">
          <Reveal className="about__meta" direction="left" delay={0.08}>
            <dl>
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Studying</dt>
                <dd>{profile.eduLine2}</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>{profile.eduLine1}</dd>
              </div>
            </dl>
          </Reveal>

          <Stagger className="about__highlights">
            {highlights.map((highlight) => (
              <StaggerItem className="highlight" key={highlight.label}>
                <span className="highlight__label">{highlight.label}</span>
                <strong className="highlight__value">{highlight.value}</strong>
              </StaggerItem>
            ))}
          </Stagger>
        </aside>
      </div>

      <Reveal className="about__quote" as="blockquote" direction="none">
        <span aria-hidden="true">&ldquo;</span>
        {profile.quote}
      </Reveal>
    </div>
  )
}

// Target path: src/components/sections/About.jsx
import { motion } from 'framer-motion'
import { profile, researchInterests } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'
import { useNavigation } from '../../context/NavigationContext'

export default function About({ section }) {
  const { navigateToSection } = useNavigation()

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
          <div className="about__hero-info">
            <h2 className="about__name">{profile.name}</h2>
            <p className="hero__role">{profile.subtitle}</p>
            <p className="hero__location">📍 {profile.location}</p>
            <p className="hero__tagline">{profile.tagline}</p>
            <p className="hero__bio">{profile.bio}</p>
            <div className="hero__actions">
              <a className="btn btn--ghost" href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn btn--ghost" href={profile.links.email}>
                Email
              </a>
              <button type="button" className="btn btn--primary" onClick={() => navigateToSection('projects')}>
                Projects
              </button>
            </div>
          </div>
        </motion.div>

        <div className="about__research">
          <h3 className="about__subheading">Research Interests</h3>
          <motion.div className="research-grid" variants={container} initial="hidden" animate="show">
            {researchInterests.map((research) => (
              <motion.article key={research.title} className="research-card" variants={item}>
                <h3>{research.title}</h3>
                <p>{research.description}</p>
                <ul className="tag-list">
                  {research.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
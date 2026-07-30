// Target path: src/components/nav/Sidebar.jsx
import { motion } from 'framer-motion'
import { profile, sections } from '../../data/portfolio'
import { useNavigation } from '../../context/NavigationContext'

export default function Sidebar() {
  const { activeSectionId, navigateToSection } = useNavigation()

  return (
    <aside className="sidebar">
      <div className="sidebar__card">
        <motion.div
          className="sidebar__profile"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img className="sidebar__avatar" src={profile.photo} alt={profile.name} />
          <div className="sidebar__info">
            <h1>{profile.shortName}</h1>
            <p className="sidebar__role">{profile.title}</p>
            <p className="sidebar__subtitle">{profile.subtitle}</p>
          </div>
        </motion.div>

        <nav className="sidebar__nav" aria-label="Sections">
          {sections.map((section) => {
            const isActive = activeSectionId === section.id
            return (
              <button
                key={section.id}
                type="button"
                className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                onClick={() => navigateToSection(section.id)}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-indicator"
                    className="sidebar__link-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="sidebar__link-label">{section.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar__links">
          <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.links.instagram} target="_blank" rel="noreferrer">Art</a>
          <a href={profile.links.behance} target="_blank" rel="noreferrer">Behance</a>
          <a href={profile.links.email}>Email</a>
        </div>
      </div>
    </aside>
  )
}

// Target path: src/components/nav/SideRail.jsx
// Desktop-only vertical dot rail showing where you are in the scroll. The
// label slides out on hover; the active dot grows into a bar.
import { motion } from 'framer-motion'
import { useNavigation } from '../../context/NavigationContext'

export default function SideRail() {
  const { sections, activeSectionId, atTop, scrollToSection } = useNavigation()

  return (
    <nav className={`side-rail ${atTop ? 'side-rail--hidden' : ''}`} aria-label="Section progress">
      <ul>
        {sections.map((section) => {
          const isActive = !atTop && activeSectionId === section.id
          return (
            <li key={section.id}>
              <button
                type="button"
                className={`side-rail__dot ${isActive ? 'side-rail__dot--active' : ''}`}
                onClick={() => scrollToSection(section.id)}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="side-rail__mark" />
                <span className="side-rail__label">{section.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

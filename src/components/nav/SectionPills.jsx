// Target path: src/components/nav/SectionPills.jsx
import { motion } from 'framer-motion'
import { useNavigation } from '../../context/NavigationContext'

export default function SectionPills({ links }) {
  const { activeSectionId, navigateToSection } = useNavigation()

  return (
    <nav className="section-pills" aria-label="Section tabs">
      {links.map((section) => {
        const isActive = activeSectionId === section.id
        return (
          <button
            key={section.id}
            type="button"
            className={`section-pills__item ${isActive ? 'section-pills__item--active' : ''}`}
            onClick={() => navigateToSection(section.id)}
          >
            {isActive && (
              <motion.span
                layoutId="section-pills-indicator"
                className="section-pills__item-bg"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="section-pills__item-label">{section.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

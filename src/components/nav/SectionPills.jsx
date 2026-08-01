// Target path: src/components/nav/SectionPills.jsx
import { motion } from 'framer-motion'
import { useNavigation } from '../../context/NavigationContext'

export default function SectionPills({ links }) {
  const { activeSectionId, navigateToSection } = useNavigation()

  return (
    <motion.nav
      className="section-pills"
      aria-label="Section tabs"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {links.map((section) => {
        const isActive = activeSectionId === section.id
        return (
          <motion.button
            key={section.id}
            type="button"
            className={`section-pills__item ${isActive ? 'section-pills__item--active' : ''}`}
            onClick={() => navigateToSection(section.id)}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.span
                layoutId="section-pills-indicator"
                className="section-pills__item-bg"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="section-pills__item-label">{section.label}</span>
          </motion.button>
        )
      })}
    </motion.nav>
  )
}

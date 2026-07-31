// Target path: src/components/nav/TopNav.jsx
import { motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import { useNavigation } from '../../context/NavigationContext'

export default function TopNav() {
  const { categories, activeCategoryId, navigateToCategory, navigateToSection } = useNavigation()

  return (
    <header className="topnav">
      <button type="button" className="topnav__brand" onClick={() => navigateToSection('about')}>
        <img className="topnav__avatar" src={profile.photo} alt={profile.name} />
        <span className="topnav__brand-text">{profile.shortName}</span>
      </button>

      <nav className="topnav__pills" aria-label="Categories">
        {categories.map((category) => {
          const isActive = activeCategoryId === category.id
          return (
            <button
              key={category.id}
              type="button"
              className={`topnav__pill ${isActive ? 'topnav__pill--active' : ''}`}
              onClick={() => navigateToCategory(category.id)}
            >
              {isActive && (
                <motion.span
                  layoutId="topnav-indicator"
                  className="topnav__pill-bg"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="topnav__pill-label">{category.label}</span>
            </button>
          )
        })}
      </nav>

      <a className="topnav__cta" href={profile.links.email}>
        Let&rsquo;s Talk
      </a>
    </header>
  )
}
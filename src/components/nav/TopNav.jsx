// Target path: src/components/nav/TopNav.jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import { useNavigation } from '../../context/NavigationContext'
import { useTheme } from '../../context/ThemeContext'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

export default function TopNav() {
  const { categories, activeCategoryId, navigateToCategory, navigateToSection } = useNavigation()
  const { theme, toggleTheme } = useTheme()
  const pillsRef = useRef(null)
  const activePillRef = useRef(null)

  // Whenever the active category changes (via clicking a pill, edge-scroll
  // navigation, or the URL hash on load), make sure its pill is fully
  // visible inside the horizontally-scrollable pill strip instead of
  // sitting clipped at the edge.
  useEffect(() => {
    const pillEl = activePillRef.current
    const containerEl = pillsRef.current
    if (!pillEl || !containerEl) return

    const containerRect = containerEl.getBoundingClientRect()
    const pillRect = pillEl.getBoundingClientRect()
    const isFullyVisible =
      pillRect.left >= containerRect.left && pillRect.right <= containerRect.right

    if (!isFullyVisible) {
      pillEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeCategoryId])

  return (
    <header className="topnav">
      <button type="button" className="topnav__brand" onClick={() => navigateToSection('about')}>
        <img className="topnav__avatar" src={profile.photo} alt={profile.name} />
        <span className="topnav__brand-text">{profile.shortName}</span>
      </button>

      <nav className="topnav__pills" aria-label="Categories" ref={pillsRef}>
        {categories.map((category) => {
          const isActive = activeCategoryId === category.id
          return (
            <button
              key={category.id}
              type="button"
              ref={isActive ? activePillRef : null}
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

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <a className="topnav__cta" href={profile.links.email}>
        Let&rsquo;s Talk
      </a>
    </header>
  )
}